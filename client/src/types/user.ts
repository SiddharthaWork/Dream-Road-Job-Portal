export interface EducationItem {
  id: string;
  collegeType: string;
  degree: string;
  city: string;
  startDate: string;
  graduationDate: string;
  currentlyStudying: boolean;
  _id: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  _id: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  _id: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  _id: string;
}

export interface ExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
  _id: string;
}

export interface UserProfile {
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  sectors: string[];
  designation: string;
  aboutMe: string;
  city: string;
  currentAddress: string;
  postalCode: string;
  province: string;
  education: EducationItem[];
  projects: ProjectItem[];
  skills: string[];
  achievements: AchievementItem[];
  certificates: CertificateItem[];
  experiences: ExperienceItem[];
  firstName: string;
  lastName: string;
  profilePicture: string;
  resume: string;
}

export interface UserApiResponse {
  message: string;
  success: boolean;
  data: {
    profile: UserProfile;
    savedJobs: any[];
    _id: string;
    fullname: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    profileCompleted: boolean;
    appliedJobs: string[];
    block: boolean;
  };
}
