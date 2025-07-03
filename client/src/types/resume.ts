export interface PersonalInfo {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    profilePicture?: string;
    summary: string;
    linkedin?: string;
    website?: string;
  }
  
  export interface Experience {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }
  
  export interface Education {
    id: string;
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    description?: string;
  }
  
  export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    startDate: string;
    endDate: string;
  }
  
  export interface Skill {
    id: string;
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    category: string;
  }
  
  export interface Language {
    id: string;
    language: string;
    proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
  }
  
  export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }
  
  export interface ResumeData {
    personalInfo: PersonalInfo;
    experience: Experience[];
    education: Education[];
    projects: Project[];
    skills: Skill[];
    languages: Language[];
    certifications: Certification[];
  }
  
  export type ResumeTheme = 'modern' | 'classic' | 'minimalist';
  
  export interface ResumeThemeConfig {
    name: string;
    colors: {
      primary: string;
      secondary: string;
      text: string;
      background: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
  }