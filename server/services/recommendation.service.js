import mongoose from 'mongoose';
import { Job } from '../models/job.model.js';
import { User } from '../models/user.model.js';
import { Application } from '../models/application.model.js';

const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
};

export const getJobRecommendations = async (userId) => {
  try {
    const user = await User.findById(userId);
    
    // Check if user exists and profile has essential data
    if (!user || !user.profileCompleted || 
        !user.profile?.skills?.length 
        // || !user.profile?.sectors?.length || 
        // !user.profile?.designation || 
        // !user.profile?.city || 
        // !user.profile?.experiences?.length
      ) 
        {
      return [];
    }
    
    // Get applied job IDs for this user
    const appliedApplications = await Application.find({ user: userId });
    const appliedJobIds = appliedApplications.map(app => app.job);
    
    // Fetch jobs excluding applied ones
    const jobs = await Job.find({ _id: { $nin: appliedJobIds } }).populate('company');
    
    if (!jobs.length) return [];
    
    // Fetch saved jobs for this user
    let savedJobs = [];
    if (user.savedJobs && user.savedJobs.length > 0) {
      savedJobs = await Job.find({ _id: { $in: user.savedJobs } });
    }
    
    // Enhanced feature set
    const allFeatures = [...new Set([
      // User features
      ...(user.profile?.skills || []),
      ...(user.profile?.sectors || []),
      user.profile?.designation || '',
      user.profile?.city || '',
      
      // Job features
      ...jobs.flatMap(job => [
        ...(job.skills || []),
        job.department || '',
        job.title || '',
        job.location || '',
        job.type || '',
        job.experience || ''
      ])
    ])].filter(Boolean);
    
    // Calculate user's total experience
    const userExperience = user.profile?.experiences?.reduce((total, exp) => {
      if (!exp.startDate) return total;
      
      const start = new Date(exp.startDate);
      const end = exp.currentlyWorking ? new Date() : new Date(exp.endDate);
      
      if (isNaN(start) || isNaN(end)) return total;
      
      const diffYears = (end - start) / (1000 * 60 * 60 * 24 * 365.25);
      return total + diffYears;
    }, 0) || 0;
    
    // Map job experience levels to numerical values
    const experienceLevels = {
      'entry': 0,
      'junior': 1,
      'mid': 3,
      'senior': 5,
      'executive': 10
    };
    
    const userVector = allFeatures.map(feature => {
      if (user.profile?.skills?.includes(feature)) return 1;
      if (user.profile?.sectors?.includes(feature)) return 1;
      if (user.profile?.designation === feature) return 1;
      if (user.profile?.city === feature) return 0.7; 
      return 0;
    });
    
    const jobsWithSimilarity = jobs.map(job => {
      // Check for at least one common skill
      const userSkills = user.profile.skills || [];
      const jobSkills = job.skills || [];
      const hasCommonSkill = userSkills.some(skill => jobSkills.includes(skill));
      if (!hasCommonSkill) {
        return { ...job.toObject(), similarity: 0.3 };
      }

      // Get numerical value for job's experience requirement
      const jobExpLevel = experienceLevels[job.experience.toLowerCase()] || 0;
      
      // Experience match score (1 if user has >= required experience, else 0)
      const expMatch = userExperience >= jobExpLevel ? 1 : 0;
      
      const jobVector = allFeatures.map(feature => {
        if (job.skills?.includes(feature)) return 1.5;
        if (job.department === feature) return 1;
        if (job.title === feature) return 0.5;
        if (job.location === feature) return 0.3;
        if (job.type === feature) return 0.2;
        return 0;
      });
      
      // Saved jobs boost calculation
      let savedBoost = 0;
      if (savedJobs.length > 0) {
        const hasDepartmentMatch = savedJobs.some(
          savedJob => job.department && savedJob.department && 
          job.department === savedJob.department
        );
        const hasTitleMatch = savedJobs.some(
          savedJob => job.title && savedJob.title && 
          job.title === savedJob.title
        );

        if (hasDepartmentMatch) savedBoost += 0.1;
        if (hasTitleMatch) savedBoost += 0.1;
      }

      // Combine cosine similarity with experience match and saved jobs boost
      const totalSimilarity = (cosineSimilarity(userVector, jobVector) * 0.7) + (expMatch * 0.3);
      const similarity = Math.min(1, totalSimilarity + savedBoost);
      return { ...job.toObject(), similarity };
    });
    
    const filteredJobs = jobsWithSimilarity.filter(job => job.similarity >= 0.15);
    filteredJobs.sort((a, b) => b.similarity - a.similarity);
    return filteredJobs;
  } catch (error) {
    console.error('Error in recommendation engine:', error);
    return [];
  }
};