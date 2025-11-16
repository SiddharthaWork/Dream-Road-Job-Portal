import { pipeline } from '@xenova/transformers';
import { Job } from '../models/job.model.js';
import { User } from '../models/user.model.js';
import { Application } from '../models/application.model.js';

// Initialize the embedding pipeline (lazy loading)
let embedder = null;

const getEmbedder = async () => {
  if (!embedder) {
    console.log('Loading embedding model...');
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    console.log('Embedding model loaded successfully');
  }
  return embedder;
};

// Calculate cosine similarity between two vectors
const cosineSimilarity = (vecA, vecB) => {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have the same length');
  }
  
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
};

// Generate embedding for text
const generateEmbedding = async (text) => {
  try {
    const model = await getEmbedder();
    const output = await model(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data);
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
};

// Create a text representation of user profile
const createUserProfileText = (user) => {
  const parts = [];
  
  if (user.profile?.skills?.length) {
    parts.push(`Skills: ${user.profile.skills.join(', ')}`);
  }
  
  if (user.profile?.designation) {
    parts.push(`Designation: ${user.profile.designation}`);
  }
  
  if (user.profile?.sectors?.length) {
    parts.push(`Sectors: ${user.profile.sectors.join(', ')}`);
  }
  
  if (user.profile?.city) {
    parts.push(`Location: ${user.profile.city}`);
  }
  
  // Add experience information
  if (user.profile?.experiences?.length) {
    const expTitles = user.profile.experiences
      .map(exp => exp.title)
      .filter(Boolean)
      .join(', ');
    if (expTitles) {
      parts.push(`Experience: ${expTitles}`);
    }
  }
  
  // Add education information
  if (user.profile?.educations?.length) {
    const degrees = user.profile.educations
      .map(edu => edu.degree)
      .filter(Boolean)
      .join(', ');
    if (degrees) {
      parts.push(`Education: ${degrees}`);
    }
  }
  
  return parts.join('. ');
};

// Create a text representation of job posting
const createJobText = (job) => {
  const parts = [];
  
  if (job.title) {
    parts.push(`Title: ${job.title}`);
  }
  
  if (job.skills?.length) {
    parts.push(`Skills: ${job.skills.join(', ')}`);
  }
  
  if (job.department) {
    parts.push(`Department: ${job.department}`);
  }
  
  if (job.description) {
    // Limit description length to avoid token limits
    const desc = job.description.substring(0, 500);
    parts.push(`Description: ${desc}`);
  }
  
  if (job.location) {
    parts.push(`Location: ${job.location}`);
  }
  
  if (job.type) {
    parts.push(`Type: ${job.type}`);
  }
  
  if (job.experience) {
    parts.push(`Experience: ${job.experience}`);
  }
  
  return parts.join('. ');
};

// Main semantic recommendation function
export const getSemanticJobRecommendations = async (userId) => {
  try {
    // Fetch user profile
    const user = await User.findById(userId);
    
    // Check if user exists and has completed profile
    if (!user || !user.profileCompleted || !user.profile?.skills?.length) {
      return [];
    }
    
    // Get applied job IDs for this user
    const appliedApplications = await Application.find({ user: userId });
    const appliedJobIds = appliedApplications.map(app => app.job);
    
    // Fetch active jobs excluding applied ones
    const jobs = await Job.find({ 
      _id: { $nin: appliedJobIds },
      status: { $ne: 'closed' }
    }).populate('company');
    
    if (!jobs.length) {
      return [];
    }
    
    // Create user profile text
    const userProfileText = createUserProfileText(user);
    
    if (!userProfileText) {
      console.log('User profile text is empty');
      return [];
    }
    
    console.log(`Generating embedding for user ${userId}...`);
    
    // Generate user profile embedding
    const userEmbedding = await generateEmbedding(userProfileText);
    
    console.log(`Processing ${jobs.length} jobs...`);
    
    // Calculate similarity for each job
    const jobsWithSimilarity = await Promise.all(
      jobs.map(async (job) => {
        try {
          const jobText = createJobText(job);
          const jobEmbedding = await generateEmbedding(jobText);
          const similarity = cosineSimilarity(userEmbedding, jobEmbedding);
          
          return {
            ...job.toObject(),
            similarity: parseFloat(similarity.toFixed(4)),
            matchScore: parseFloat((similarity * 100).toFixed(2))
          };
        } catch (error) {
          console.error(`Error processing job ${job._id}:`, error);
          return {
            ...job.toObject(),
            similarity: 0,
            matchScore: 0
          };
        }
      })
    );
    
    // Filter jobs with similarity above threshold (0.5 = 50% match)
    const filteredJobs = jobsWithSimilarity.filter(job => job.similarity >= 0.6);
    
    // Sort by similarity in descending order
    filteredJobs.sort((a, b) => b.similarity - a.similarity);
    
    // Return top 50 recommendations
    return filteredJobs.slice(0, 50);
    
  } catch (error) {
    console.error('Error in semantic recommendation engine:', error);
    throw error;
  }
};