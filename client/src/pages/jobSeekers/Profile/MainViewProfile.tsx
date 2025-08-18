"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ProfileData {
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  sectors: string[];
  designation: string;
  aboutMe: string;
  city: string;
  currentAddress: string;
  postalCode: string;
  education: Array<{
    collegeType: string;
    degree: string;
    city: string;
    startDate: string;
    graduationDate: string;
    currentlyStudying: boolean;
  }>;
  skills: string[];
  achievements: Array<{
    title: string;
    description: string;
  }>;
  certificates: Array<{
    title: string;
    issuedBy: string;
    issueDate: string;
    expirationDate: string;
  }>;
  experiences: Array<{
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    location: string;
    description: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    projectLink: string;
  }>;
  profilePicture?: string;
  resume?: string;
}

const MainViewProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const fullname = localStorage.getItem('fullname');
    const profileComplete = localStorage.getItem('profile');
    
    if(userId){
      setProfileId(userId);
    }
    
    // Check if profile is complete
    setIsProfileComplete(profileComplete === 'true');
    
    if (!userId) {
      console.error("User ID not found in localStorage");
      setLoading(false);
      return;
    }
    
    setUsername(fullname || '');
    
    // Only fetch profile if it's complete
    if (profileComplete === 'true') {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/user/getuser/${userId}`);
          const data = await response.json();
          
          if (data.success && data.data?.profile) {
            setProfile(data.data.profile);
            setEmail(data.data.email);
          }
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show profile completion prompt if profile is not complete
  if (!isProfileComplete) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Profile</h2>
            <p className="text-gray-600 mb-6">
              Please complete your profile to access all features and get personalized job recommendations.
            </p>
          </div>
          <Button 
            onClick={() => router.push('/profile')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Complete Profile Now
          </Button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Profile not found</h2>
        <p className="text-gray-500 mt-2">We couldn't load your profile information</p>
      </div>
    );
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  // Helper to render section with fallback
  const renderSection = (title: string, content: React.ReactNode, fallbackText = 'No information available') => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-blue-600 border-b pb-2">{title}</h2>
      {content || <p className="text-gray-500 italic">{fallbackText}</p>}
    </div>
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
            <div className="flex items-center justify-between">
          <div className="flex items-center">
            {profile.profilePicture ? (
              <img 
                src={profile.profilePicture} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              /> 
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 flex items-center justify-center">
                <span className="text-gray-500 text-2xl">👤</span>
              </div>
            )}
            <div className="ml-6">
              <h1 className="text-3xl font-bold">{username}</h1>
              <h1 className="text-lg ">{email}</h1>
              <p className="text-blue-100 mt-1">{profile.designation || 'Professional'}</p>
              <div className="flex flex-wrap mt-2">
                {profile.sectors?.map((sector, index) => (
                  <span key={index} className="bg-blue-400 bg-opacity-50 px-3 py-1 rounded-full text-sm mr-2 mt-2">
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Button 
            onClick={() => router.push(`/profile/edit/${profileId}`)}
            variant={'default'}
            size={'custom'}
            className='bg-white text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white'
          >     
            Edit Profile
          </Button>
          </div>
        </div>

        <div className="p-6">
          {/* About Section */}
          {renderSection('About', (
            <div className="space-y-4">
              <p className="text-gray-700">{profile.aboutMe || 'No about information provided'}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">Contact Information</h3>
                  <p className="text-gray-600">{profile.phoneNumber || 'Not provided'}</p>
                  <p className="text-gray-600">{profile.city}, {profile.postalCode}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">Personal Details</h3>
                  <p className="text-gray-600">Gender: {profile.gender || 'Not specified'}</p>
                  <p className="text-gray-600">Date of Birth: {profile.dateOfBirth ? formatDate(profile.dateOfBirth) : 'Not specified'}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Skills Section */}
          {renderSection('Skills', profile.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          ), 'No skills added yet')}

          {/* Education Section */}
          {renderSection('Education', profile.education?.length > 0 && (
            <div className="space-y-4">
              {profile.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-1">
                  <h3 className="font-semibold text-lg">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.collegeType} • {edu.city}</p>
                  <p className="text-gray-500 text-sm">
                    {formatDate(edu.startDate)} - {edu.currentlyStudying ? 'Present' : formatDate(edu.graduationDate)}
                  </p>
                </div>
              ))}
            </div>
          ), 'No education information added')}

          {/* Experience Section */}
          {renderSection('Experience', profile.experiences?.length > 0 && (
            <div className="space-y-6">
              {profile.experiences.map((exp, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4 py-1">
                  <h3 className="font-semibold text-lg">{exp.jobTitle}</h3>
                  <p className="text-gray-600">{exp.company} • {exp.location}</p>
                  <p className="text-gray-500 text-sm">
                    {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                  </p>
                  <p className="text-gray-700 mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          ), 'No work experience added')}

          {/* Projects Section */}
          {renderSection('Projects', profile.projects?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.projects.map((project, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </p>
                  <p className="text-gray-700 mt-2">{project.description}</p>
                  {project.projectLink && (
                    <a 
                      href={project.projectLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-block mt-2"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          ), 'No projects added')}

          {/* Achievements & Certificates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Achievements */}
            <div>
              {renderSection('Achievements', profile.achievements?.length > 0 && (
                <ul className="list-disc pl-5 space-y-2">
                  {profile.achievements.map((achievement, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-medium">{achievement.title}:</span> {achievement.description}
                    </li>
                  ))}
                </ul>
              ), 'No achievements added')}
            </div>
            
            {/* Certificates */}
            <div>
              {renderSection('Certificates', profile.certificates?.length > 0 && (
                <ul className="space-y-3">
                  {profile.certificates.map((cert, index) => (
                    <li key={index} className="text-gray-700">
                      <div className="font-medium">{cert.title}</div>
                      <div className="text-sm text-gray-600">Issued by: {cert.issuedBy}</div>
                      <div className="text-xs text-gray-500">
                        {formatDate(cert.issueDate)} - {formatDate(cert.expirationDate)}
                      </div>
                    </li>
                  ))}
                </ul>
              ), 'No certificates added')}
            </div>
          </div>

          {/* Resume */}
          {profile.resume && (
            <div className="mt-8 text-center">
              <a 
                href={profile.resume} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainViewProfile;