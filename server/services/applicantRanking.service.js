// Weighted scoring algorithm for ranking job applicants
// This service helps companies find the best-fit candidates for specific jobs

const APPLICANT_SCORING_WEIGHTS = {
  skillsMatch: 0.40,        // Most critical for job fit
  experienceMatch: 0.25,    // Very important
  educationMatch: 0.15,     // Important for certain roles
  locationMatch: 0.10,      // Moderate (remote work considerations)
  projectsMatch: 0.05,      // Nice to have
  certificationsMatch: 0.05 // Additional value
};

// Calculate skills match between applicant and job requirements
function calculateApplicantSkillsScore(applicantSkills, jobSkills) {
  if (!applicantSkills || !applicantSkills.length || !jobSkills || !jobSkills.length) {
    return 0;
  }
  
  const applicantSkillsLower = applicantSkills.map(s => s.toLowerCase().trim());
  const jobSkillsLower = jobSkills.map(s => s.toLowerCase().trim());
  
  const matchedSkills = applicantSkillsLower.filter(skill => 
    jobSkillsLower.some(jobSkill => 
      jobSkill.includes(skill) || skill.includes(jobSkill)
    )
  ).length;
  
  // Score based on percentage of job requirements met
  const requirementsCoverage = matchedSkills / jobSkillsLower.length;
  
  // Bonus for having additional relevant skills
  const skillsBonus = Math.min(applicantSkillsLower.length / jobSkillsLower.length, 1.5);
  
  return Math.min(requirementsCoverage * skillsBonus, 1);
}

// Extract years of experience from experience string
function extractExperienceYears(experienceString) {
  if (!experienceString) return 0;
  
  const match = experienceString.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

// Calculate total years of experience from user's experience array
function calculateTotalExperience(experiences) {
  if (!experiences || !experiences.length) return 0;
  
  let totalMonths = 0;
  
  experiences.forEach(exp => {
    if (exp.startDate) {
      const startDate = new Date(exp.startDate);
      const endDate = exp.currentlyWorking ? new Date() : new Date(exp.endDate || Date.now());
      
      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                      (endDate.getMonth() - startDate.getMonth());
        totalMonths += Math.max(months, 0);
      }
    }
  });
  
  return Math.round(totalMonths / 12 * 10) / 10; // Round to 1 decimal place
}

// Calculate experience match score
function calculateApplicantExperienceScore(applicantExperiences, jobExperience, jobTitle) {
  if (!applicantExperiences || !applicantExperiences.length) {
    return jobExperience ? 0 : 0.5; // If no experience required, give moderate score
  }
  
  const totalYears = calculateTotalExperience(applicantExperiences);
  const requiredYears = extractExperienceYears(jobExperience);
  
  // Check for relevant job titles
  const relevantExperience = applicantExperiences.filter(exp => {
    if (!exp.jobTitle || !jobTitle) return false;
    
    const expTitle = exp.jobTitle.toLowerCase();
    const reqTitle = jobTitle.toLowerCase();
    
    return expTitle.includes(reqTitle) || 
           reqTitle.includes(expTitle) ||
           expTitle.includes('developer') && reqTitle.includes('developer') ||
           expTitle.includes('engineer') && reqTitle.includes('engineer') ||
           expTitle.includes('manager') && reqTitle.includes('manager');
  });
  
  let experienceScore = 0;
  
  // Base score from years of experience
  if (totalYears >= requiredYears) {
    experienceScore += 0.7;
  } else if (totalYears >= requiredYears * 0.8) {
    experienceScore += 0.5;
  } else if (totalYears >= requiredYears * 0.6) {
    experienceScore += 0.3;
  } else if (totalYears > 0) {
    experienceScore += 0.1;
  }
  
  // Bonus for relevant experience
  if (relevantExperience.length > 0) {
    experienceScore += 0.3;
  }
  
  return Math.min(experienceScore, 1);
}

// Calculate education match score
function calculateEducationScore(applicantEducation, jobRequirements) {
  if (!applicantEducation || !applicantEducation.length) {
    return 0.3; // Some score for experience-based roles
  }
  
  if (!jobRequirements) return 0.5;
  
  const requirements = jobRequirements.toLowerCase();
  
  // Check for relevant degrees
  const relevantEducation = applicantEducation.filter(edu => {
    if (!edu.degree) return false;
    
    const degree = edu.degree.toLowerCase();
    
    // Check for specific degree matches
    if (requirements.includes(degree) || degree.includes('computer') || 
        degree.includes('engineering') || degree.includes('science') ||
        degree.includes('technology') || degree.includes('business') ||
        degree.includes('management')) {
      return true;
    }
    
    return false;
  });
  
  return relevantEducation.length > 0 ? 1 : 0.5;
}

// Calculate location match score
function calculateLocationScore(applicantCity, jobLocation) {
  if (!applicantCity || !jobLocation) return 0.5; // Neutral if location not specified
  
  const applicantLoc = applicantCity.toLowerCase().trim();
  const jobLoc = jobLocation.toLowerCase().trim();
  
  if (applicantLoc === jobLoc) return 1;
  if (applicantLoc.includes(jobLoc) || jobLoc.includes(applicantLoc)) return 0.8;
  
  return 0.2; // Low score for different locations
}

// Calculate projects relevance score
function calculateProjectsScore(applicantProjects, jobSkills) {
  if (!applicantProjects || !applicantProjects.length || !jobSkills || !jobSkills.length) {
    return 0;
  }
  
  const projectDescriptions = applicantProjects
    .map(p => (p.description || '').toLowerCase())
    .join(' ');
  
  const relevantProjects = jobSkills.filter(skill => 
    projectDescriptions.includes(skill.toLowerCase())
  ).length;
  
  return Math.min(relevantProjects / jobSkills.length, 1);
}

// Calculate certifications relevance score
function calculateCertificationsScore(applicantCertificates, jobSkills) {
  if (!applicantCertificates || !applicantCertificates.length || !jobSkills || !jobSkills.length) {
    return 0;
  }
  
  const certificateText = applicantCertificates
    .map(cert => `${cert.title || ''} ${cert.issuer || ''}`.toLowerCase())
    .join(' ');
  
  const relevantCerts = jobSkills.filter(skill => 
    certificateText.includes(skill.toLowerCase())
  ).length;
  
  return Math.min(relevantCerts / jobSkills.length, 1);
}

// Main function to calculate weighted score for an applicant
export function calculateApplicantScore(applicant, job) {
  const user = applicant.user; // From populated application
  
  if (!user || !user.profile) {
    return {
      totalScore: 0,
      breakdown: {},
      weights: APPLICANT_SCORING_WEIGHTS
    };
  }
  
  const scores = {
    skillsMatch: calculateApplicantSkillsScore(
      user.profile.skills, 
      job.skills
    ),
    experienceMatch: calculateApplicantExperienceScore(
      user.profile.experiences, 
      job.experience, 
      job.title
    ),
    educationMatch: calculateEducationScore(
      user.profile.education, 
      job.requirements
    ),
    locationMatch: calculateLocationScore(
      user.profile.city, 
      job.location
    ),
    projectsMatch: calculateProjectsScore(
      user.profile.projects, 
      job.skills
    ),
    certificationsMatch: calculateCertificationsScore(
      user.profile.certificates, 
      job.skills
    )
  };
  
  // Calculate weighted total
  let weightedScore = 0;
  for (const [criterion, score] of Object.entries(scores)) {
    weightedScore += score * APPLICANT_SCORING_WEIGHTS[criterion];
  }
  
  return {
    totalScore: Math.round(weightedScore * 100) / 100, // Round to 2 decimal places
    breakdown: scores,
    weights: APPLICANT_SCORING_WEIGHTS
  };
}

// Generate applicant summary with strengths and concerns
export function generateApplicantSummary(user, scoring) {
  const strengths = [];
  const concerns = [];
  
  if (scoring.breakdown.skillsMatch > 0.8) {
    strengths.push("Excellent skills match");
  } else if (scoring.breakdown.skillsMatch < 0.3) {
    concerns.push("Limited relevant skills");
  }
  
  if (scoring.breakdown.experienceMatch > 0.7) {
    strengths.push("Strong relevant experience");
  } else if (scoring.breakdown.experienceMatch < 0.3) {
    concerns.push("Limited experience");
  }
  
  if (scoring.breakdown.educationMatch > 0.8) {
    strengths.push("Strong educational background");
  }
  
  if (scoring.breakdown.locationMatch > 0.8) {
    strengths.push("Location match");
  } else if (scoring.breakdown.locationMatch < 0.3) {
    concerns.push("Location mismatch");
  }
  
  if (scoring.breakdown.projectsMatch > 0.6) {
    strengths.push("Relevant project experience");
  }
  
  if (scoring.breakdown.certificationsMatch > 0.6) {
    strengths.push("Relevant certifications");
  }
  
  return {
    strengths,
    concerns,
    totalExperience: `${calculateTotalExperience(user.profile.experiences)} years`,
    keySkills: user.profile.skills ? user.profile.skills.slice(0, 5) : [], // Top 5 skills
    currentRole: user.profile.designation || 'Not specified'
  };
}

// Export utility functions for external use
export { 
  calculateTotalExperience, 
  extractExperienceYears,
  APPLICANT_SCORING_WEIGHTS 
};
