import { ResumeData } from "@/types/resume";
import { UserApiResponse, EducationItem, ProjectItem, ExperienceItem, CertificateItem } from "../types/user";

export function transformUserData(userData: UserApiResponse): ResumeData {
  const { data } = userData;
  
  return {
    personalInfo: {
      fullName: data.fullname || '',
      jobTitle: data.profile?.designation || '',
      email: data.email || '',
      phone: data.profile?.phoneNumber || data.phoneNumber || '',
      address: `${data.profile?.currentAddress || ''}, ${data.profile?.city || ''}`.trim(),
      profilePicture: data.profile?.profilePicture,
      summary: data.profile?.aboutMe || '',
    },
    experience: data.profile?.experiences?.map((exp: ExperienceItem) => ({
      id: exp._id || exp.id,
      jobTitle: exp.jobTitle || '',
      company: exp.company || '',
      location: exp.location || '',
      startDate: exp.startDate || '',
      endDate: exp.currentlyWorking ? '' : exp.endDate || '',
      current: exp.currentlyWorking || false,
      description: exp.description || '',
    })) || [],
    education: data.profile?.education?.map((edu: EducationItem) => ({
      id: edu._id || edu.id,
      degree: edu.degree || '',
      school: edu.city || '', // Note: This might need adjustment
      location: edu.city || '',
      startDate: edu.startDate || '',
      endDate: edu.graduationDate || '',
      description: edu.collegeType || '',
    })) || [],
    projects: data.profile?.projects?.map((proj: ProjectItem) => ({
      id: proj._id || proj.id,
      title: proj.title || '',
      description: proj.description || '',
      technologies: [], // Not available in API
      startDate: '', // Not available
      endDate: '', // Not available
    })) || [],
    skills: data.profile?.skills?.map((skill: string, index: number) => ({
      id: `skill-${index}`,
      name: skill,
      level: 'Intermediate', // Default value
      category: 'Skills', // Default value
    })) || [],
    certifications: data.profile?.certificates?.map((cert: CertificateItem) => ({
      id: cert._id || cert.id,
      name: cert.title || '',
      issuer: '', // Not available
      date: '', // Not available
    })) || [],
    languages: [], // Not available in API
  };
}
