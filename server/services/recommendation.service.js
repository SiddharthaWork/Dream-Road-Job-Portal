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
      // Get numerical value for job's experience requirement
      const jobExpLevel = experienceLevels[job.experience.toLowerCase()] || 0;
      
      // Experience match score (1 if user has >= required experience, else 0)
      const expMatch = userExperience >= jobExpLevel ? 1 : 0;
      
      const jobVector = allFeatures.map(feature => {
        if (job.skills?.includes(feature)) return 1;
        if (job.department === feature) return 1;
        if (job.title === feature) return 0.8;
        if (job.location === feature) return 0.6;
        if (job.type === feature) return 0.4;
        return 0;
      });
      
      // Count common features (non-zero in both vectors)
      // let commonCount = 0;
      // for (let i = 0; i < userVector.length; i++) {
      //   if (userVector[i] > 0 && jobVector[i] > 0) {
      //     commonCount++;
      //   }
      // }
      
      // Skip jobs with too few common features
      // if (commonCount < 3) {
      //   return { ...job.toObject(), similarity: 0 };
      // }
      
      // Combine cosine similarity with experience match
      const similarity = (cosineSimilarity(userVector, jobVector) * 0.7) + (expMatch * 0.3);
      return { ...job.toObject(), similarity };
    });
    
    jobsWithSimilarity.sort((a, b) => b.similarity - a.similarity);
    return jobsWithSimilarity;
  } catch (error) {
    console.error('Error in recommendation engine:', error);
    return [];
  }
};
