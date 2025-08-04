import mongoose from 'mongoose';
import { Job } from '../models/job.model.js';
import { User } from '../models/user.model.js';
import { Application } from '../models/application.model.js';

/**
 * Enhanced Recommendation Engine with Multi-Layer Scoring
 * Features:
 * - Skill-based matching with fuzzy logic
 * - Experience range matching
 * - Location preference scoring
 * - Industry/sector alignment
 * - Job type preference
 * - Multi-stage filtering for relevance
 */

// Utility Functions
const cosineSimilarity = (vecA, vecB) => {
  if (vecA.length !== vecB.length) return 0;
  
  const dotProduct = vecA.reduce((sum, a, i) => sum + (a * vecB[i]), 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + (a * a), 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + (b * b), 0));
  
  return (magnitudeA && magnitudeB) ? dotProduct / (magnitudeA * magnitudeB) : 0;
};

// Fuzzy string matching for partial skill matches
const fuzzyMatch = (str1, str2) => {
  if (!str1 || !str2) return 0;
  
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  
  if (s1 === s2) return 1;
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;
  
  // Calculate edit distance similarity
  const maxLen = Math.max(s1.length, s2.length);
  if (maxLen === 0) return 0;
  
  const distance = levenshteinDistance(s1, s2);
  return Math.max(0, 1 - (distance / maxLen));
};

// Levenshtein distance calculation
const levenshteinDistance = (str1, str2) => {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
};

// Calculate user's total experience in years
const calculateUserExperience = (experiences) => {
  if (!experiences || !experiences.length) return 0;
  
  return experiences.reduce((total, exp) => {
    if (!exp.startDate) return total;
    
    const start = new Date(exp.startDate);
    const end = exp.currentlyWorking ? new Date() : new Date(exp.endDate || new Date());
    
    if (isNaN(start) || isNaN(end) || end < start) return total;
    
    const diffYears = (end - start) / (1000 * 60 * 60 * 24 * 365.25);
    return total + Math.max(0, diffYears);
  }, 0);
};

// Enhanced experience matching with ranges
const getExperienceScore = (userExp, jobExpReq) => {
  const experienceRanges = {
    'entry': { min: 0, max: 2, optimal: 1 },
    'junior': { min: 1, max: 4, optimal: 2.5 },
    'mid': { min: 3, max: 7, optimal: 5 },
    'senior': { min: 5, max: 12, optimal: 8 },
    'executive': { min: 8, max: 20, optimal: 12 }
  };
  
  const jobRange = experienceRanges[jobExpReq?.toLowerCase()] || experienceRanges['entry'];
  
  if (userExp >= jobRange.min && userExp <= jobRange.max) {
    // Perfect match if within range
    const distanceFromOptimal = Math.abs(userExp - jobRange.optimal);
    const maxDistance = Math.max(jobRange.optimal - jobRange.min, jobRange.max - jobRange.optimal);
    return Math.max(0.7, 1 - (distanceFromOptimal / maxDistance));
  } else if (userExp < jobRange.min) {
    // Underqualified
    const deficit = jobRange.min - userExp;
    return Math.max(0, 0.5 - (deficit * 0.1));
  } else {
    // Overqualified
    const excess = userExp - jobRange.max;
    return Math.max(0.3, 0.8 - (excess * 0.05));
  }
};

// Calculate skill match score with weights and fuzzy matching
const calculateSkillScore = (userSkills, jobSkills) => {
  if (!userSkills?.length || !jobSkills?.length) return 0.1; // Minimum baseline
  
  // Create a combined set of all skills
  const allSkills = [...new Set([...userSkills, ...jobSkills])];
  
  // Create vectors for user and job
  const userVector = allSkills.map(skill => 
    userSkills.includes(skill) ? 1 : 0
  );
  
  const jobVector = allSkills.map(skill => 
    jobSkills.includes(skill) ? 1 : 0
  );
  
  // Calculate cosine similarity
  const similarity = cosineSimilarity(userVector, jobVector);
  
  // Apply fuzzy matching as a bonus to the base similarity
  let fuzzyBonus = 0;
  jobSkills.forEach(jobSkill => {
    userSkills.forEach(userSkill => {
      const matchScore = fuzzyMatch(userSkill, jobSkill);
      fuzzyBonus = Math.max(fuzzyBonus, matchScore * 0.3); // Increased bonus
    });
  });
  
  return Math.min(1, Math.max(0.1, similarity + fuzzyBonus)); // Ensure minimum score
};

// Calculate location preference score
const calculateLocationScore = (userCity, jobLocation) => {
  if (!userCity || !jobLocation) return 0.5; // Neutral if no location data
  
  const userLoc = userCity.toLowerCase().trim();
  const jobLoc = jobLocation.toLowerCase().trim();
  
  if (userLoc === jobLoc) return 1;
  if (userLoc.includes(jobLoc) || jobLoc.includes(userLoc)) return 0.8;
  
  // Check for remote work indicators
  if (jobLoc.includes('remote') || jobLoc.includes('anywhere')) return 0.9;
  
  return 0.2; // Different locations
};

// Calculate sector/industry alignment
const calculateSectorScore = (userSectors, jobDepartment, jobTitle) => {
  if (!userSectors?.length) return 0.5;
  
  let score = 0;
  const searchTerms = [jobDepartment, jobTitle].filter(Boolean).map(term => term.toLowerCase());
  
  userSectors.forEach(sector => {
    const sectorLower = sector.toLowerCase();
    searchTerms.forEach(term => {
      if (term.includes(sectorLower) || sectorLower.includes(term)) {
        score = Math.max(score, 0.8);
      }
    });
  });
  
  return Math.min(1, score);
};

// Main recommendation function
export const getJobRecommendations = async (userId) => {
  try {
    // Validate user and profile completeness
    const user = await User.findById(userId);
    
    if (!user || !user.profileCompleted) {
      return [];
    }
    
    // Ensure minimum profile requirements
    const profile = user.profile;
    if (!profile?.skills?.length || !profile?.designation) {
      return [];
    }
    
    // Get applied job IDs to exclude
    const appliedApplications = await Application.find({ user: userId }).select('job');
    const appliedJobIds = appliedApplications.map(app => app.job.toString());
    
    // Fetch available jobs with company data
    const jobs = await Job.find({ 
      _id: { $nin: appliedJobIds },
      isActive: { $ne: false } // Only active jobs
    }).populate('company');
    
    if (!jobs.length) return [];
    
    // Calculate user experience
    const userExperience = calculateUserExperience(profile.experiences);
    
    // Score each job
    const jobsWithScores = jobs.map(job => {
      const jobObj = job.toObject();
      
      // Individual scoring components
      const skillScore = calculateSkillScore(profile.skills, job.skills);
      const experienceScore = getExperienceScore(userExperience, job.experience);
      const locationScore = calculateLocationScore(profile.city, job.location);
      const sectorScore = calculateSectorScore(profile.sectors, job.department, job.title);
      const designationMatch = profile.designation && job.title ? 
        fuzzyMatch(profile.designation, job.title) : 0;
      
      // Weighted composite score
      const weights = { skills: 0.35, experience: 0.25, designation: 0.2, location: 0.1, sector: 0.1 };
      const compositeScore = (
        (skillScore * weights.skills) +
        (experienceScore * weights.experience) +
        (designationMatch * weights.designation) +
        (locationScore * weights.location) +
        (sectorScore * weights.sector)
      );
      
      // Apply minimum threshold filter
      const minThreshold = 0.1;
      const finalScore = compositeScore >= minThreshold ? compositeScore : 0;

      // DEBUG: Log scoring details for each job
      console.debug(`[Recommendation] Job: ${job.title} | Score: ${finalScore.toFixed(2)}`);
      console.debug(`  Skills: ${skillScore.toFixed(2)} (User: ${profile.skills.join(', ')}, Job: ${job.skills.join(', ')})`);
      console.debug(`  Experience: ${experienceScore.toFixed(2)} (User: ${userExperience.toFixed(1)}y, Job: ${job.experience})`);
      console.debug(`  Designation: ${designationMatch.toFixed(2)} ("${profile.designation}" vs "${job.title}")`);
      console.debug(`  Location: ${locationScore.toFixed(2)} (User: ${profile.city}, Job: ${job.location})`);
      console.debug(`  Sector: ${sectorScore.toFixed(2)} (User sectors: ${profile.sectors?.join(', ')}, Job dept: ${job.department})`);
      console.debug(`  Composite: ${compositeScore.toFixed(2)}`);
      
      return {
        ...jobObj,
        similarity: finalScore,
        scoreBreakdown: {
          skills: skillScore,
          experience: experienceScore,
          designation: designationMatch,
          location: locationScore,
          sector: sectorScore,
          composite: compositeScore
        }
      };
    });
    
    // Filter out low-scoring jobs and sort by similarity
    const filteredJobs = jobsWithScores
      .filter(job => job.similarity > 0)
      .sort((a, b) => b.similarity - a.similarity);
    
    // Return top recommendations (limit to prevent overwhelming)
    return filteredJobs.slice(0, 50);
    
  } catch (error) {
    console.error('Error in enhanced recommendation engine:', error);
    return [];
  }
};
