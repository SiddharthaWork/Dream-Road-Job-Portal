export interface JobFormData {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string;
  benefits: string;
  hasDeadline: boolean;
  deadline?: Date;
  skills: string[];
}

export interface Job {
  id: string;
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string;
  benefits: string;
  hasDeadline: boolean;
  deadline?: string;
  skills: string[];
  company: {
    _id: string;
    name: string;
    logo: string;
    industry?: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  createdBy: {
    _id: string;
    name: string;
    logo: string;
    industry?: string;
  };
}
