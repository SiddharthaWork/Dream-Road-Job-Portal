'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salaryMin: string;
  salaryMax: string;
  description: string;
  requirements: string;
  benefits: string;
  hasDeadline: boolean;
  deadline?: Date;
  postedDate: Date;
  status: 'active' | 'closed' | 'draft';
  applicants: Applicant[];
  skills?: string[];
}

export interface Applicant {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  resumeLink: string;
  coverLetter: string;
  appliedDate: Date;
  isShortlisted: boolean;
  status: 'new' | 'reviewed' | 'shortlisted' | 'interviewed' | 'hired' | 'rejected';
  about?: string;
  skills?: string[];
  education?: {
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }[];
  experience?: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  projects?: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  achievements?: string[];
  certificates?: {
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }[];
  portfolio?: string;
  linkedin?: string;
  github?: string;
}

interface AppContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'postedDate' | 'applicants'>) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  getJob: (id: string) => Job | undefined;
  addApplicant: (applicant: Omit<Applicant, 'id' | 'appliedDate'>) => void;
  updateApplicant: (id: string, updates: Partial<Applicant>) => void;
  getApplicant: (id: string) => Applicant | undefined;
  getApplicantsForJob: (jobId: string) => Applicant[];
  toggleShortlist: (applicantId: string) => void;
  getAllApplicants: () => Applicant[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedJobs = localStorage.getItem('dreamroad_jobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      // Convert date strings back to Date objects
      const jobsWithDates = parsedJobs.map((job: any) => ({
        ...job,
        postedDate: new Date(job.postedDate),
        deadline: job.deadline ? new Date(job.deadline) : undefined,
        applicants: job.applicants?.map((applicant: any) => ({
          ...applicant,
          appliedDate: new Date(applicant.appliedDate)
        })) || []
      }));
      setJobs(jobsWithDates);
    }
  }, []);

  // Save to localStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem('dreamroad_jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (jobData: Omit<Job, 'id' | 'postedDate' | 'applicants'>) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      postedDate: new Date(),
      applicants: []
    };
    setJobs(prev => [...prev, newJob]);
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, ...updates } : job
    ));
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const getJob = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  const addApplicant = (applicantData: Omit<Applicant, 'id' | 'appliedDate'>) => {
    const newApplicant: Applicant = {
      ...applicantData,
      id: Date.now().toString(),
      appliedDate: new Date(),
      isShortlisted: false,
      status: 'new'
    };

    setJobs(prev => prev.map(job => 
      job.id === applicantData.jobId 
        ? { ...job, applicants: [...(job.applicants || []), newApplicant] }
        : job
    ));
  };

  const updateApplicant = (id: string, updates: Partial<Applicant>) => {
    setJobs(prev => prev.map(job => ({
      ...job,
      applicants: job.applicants?.map(applicant =>
        applicant.id === id ? { ...applicant, ...updates } : applicant
      ) || []
    })));
  };

  const getApplicant = (id: string) => {
    for (const job of jobs) {
      const applicant = job.applicants?.find(app => app.id === id);
      if (applicant) return applicant;
    }
    return undefined;
  };

  const getApplicantsForJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    return job?.applicants || [];
  };

  const toggleShortlist = (applicantId: string) => {
    setJobs(prev => prev.map(job => ({
      ...job,
      applicants: job.applicants?.map(applicant =>
        applicant.id === applicantId 
          ? { 
              ...applicant, 
              isShortlisted: !applicant.isShortlisted,
              status: !applicant.isShortlisted ? 'shortlisted' : 'new'
            }
          : applicant
      ) || []
    })));
  };

  const getAllApplicants = () => {
    return jobs.flatMap(job => job.applicants || []);
  };

  return (
    <AppContext.Provider value={{
      jobs,
      addJob,
      updateJob,
      deleteJob,
      getJob,
      addApplicant,
      updateApplicant,
      getApplicant,
      getApplicantsForJob,
      toggleShortlist,
      getAllApplicants
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
