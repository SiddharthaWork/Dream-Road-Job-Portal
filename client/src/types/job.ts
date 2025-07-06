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
