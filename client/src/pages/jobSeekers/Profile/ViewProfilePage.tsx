"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Loading from '@/components/shared/loading';
import { useRouter } from 'next/navigation';
import { Separator } from '@radix-ui/react-select';
import { format } from 'date-fns';
import { Briefcase } from 'lucide-react';

export default function ViewProfilePage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;
  const [profileData, setProfileData] = useState<any>(null);
  const [email, setEmail] = useState<any>('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUsername] = useState<string>('');

  useEffect(() => {
    const userName = localStorage.getItem('fullname');
    if (userName) {
      setUsername(userName);
    }
  }, []);



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/user/getuser/${userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const result = await response.json();

        if (!result.success || !result.data?.profile) {
          throw new Error('Profile data not found in response');
        }

        setProfileData(result.data.profile);
        setEmail(result.data.email);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>Profile not found</div>;
  }

  // const {  } = profileData;

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold mb-8">Profile Overview</h1>
        <Button variant={"default"} size={"lg"} onClick={() => router.push("/profile")}>Update Profile</Button>
      </div>

      {/* About Yourself */}
      <div className='grid grid-cols-2 gap-4'>
        <Card className="mb-6 p-6">
          <div>
            <img
              src="https://example.com/avatar.jpg"
              alt="Avatar"
              className="w-24 h-24 rounded-full mb-4"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">About Yourself</h2>
          <div className="space-y-1">
            <div><b>Name:</b> {userName}</div>
            <div><b>Email:</b> {email}</div>
            <div><b>Gender:</b> {profileData.gender}</div>
            <div><b>Date of Birth:</b> {profileData.dateOfBirth}</div>
            <div><b>Phone Number:</b> {profileData.phoneNumber}</div>
            <div><b>Designation:</b> {profileData.designation}</div>
            <div><b>Sectors:</b> {profileData.sectors.map((sector: string) => <Badge key={sector} className="ml-1">{sector}</Badge>)}</div>
            <div><b>About Me:</b> <span className="text-gray-700">{profileData.aboutMe}</span></div>
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <div className="space-y-1">
              <div><b>Current Address:</b> {profileData.currentAddress}</div>
            </div>
          </div>
        </Card>

        {/* Address */}
        <Card className="mb-6 p-6">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          {profileData.education.map((edu: any) => (
            <div key={edu.id} className="mb-4">
              <div><b>Type:</b> {edu.collegeType}</div>
              <div><b>Degree:</b> {edu.degree}</div>
              <div><b>City:</b> {edu.city}</div>
              <div><b>Start Date:</b> {edu.startDate}</div>
              <div><b>Graduation Date:</b> {edu.currentlyStudying ? 'Present' : edu.graduationDate}</div>
            </div>
          ))}
        </Card>

      </div>

      {/* Education */}
      <div className='grid grid-cols-2 gap-4 mb-6'>
     
        {/* Work Experience */}
        {profileData.experiences && profileData.experiences.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {profileData.experiences.map((exp: any, index: any) => (
                <div key={index}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="space-y-2">
                    <h4 className="font-medium">{exp.jobTitle}</h4>
                    <p className="text-sm text-gray-600">
                      {exp.company} - {exp.location}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(exp.startDate), 'MMM yyyy')} to{' '}
                      {exp.currentlyWorking ? 'Present' : format(new Date(exp.endDate), 'MMM yyyy')}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        {/* Projects */}
        <Card className="mb-6 p-6 h-full min-h-[100px]">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          {profileData.projects.map((project: any) => (
            <div key={project.id} className="mb-4">
              <div><b>Title:</b> {project.title}</div>
              <div><b>Description:</b> {project.description}</div>
              <div><b>Start Date:</b> {project.startDate}</div>
              <div><b>End Date:</b> {project.endDate}</div>
              {project.projectLink && (
                <div><b>Link:</b> <a href={project.projectLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{project.projectLink}</a></div>
              )}
            </div>
          ))}
        </Card>
      </div>


      {/* Skills */}
      <Card className="mb-6 p-6">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {profileData.skills.map((skill: any) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="mb-6 p-6">
        <h2 className="text-xl font-semibold mb-2">Achievements</h2>
        {profileData.achievements.length === 0 ? <div>No achievements listed.</div> : profileData.achievements.map((a: any) => (
          <div key={a.id} className="mb-2">
            <div><b>{a.title}</b></div>
            <div className="text-gray-700 text-sm">{a.description}</div>
          </div>
        ))}
      </Card>

      {/* Certificates */}
      <Card className="mb-6 p-6">
        <h2 className="text-xl font-semibold mb-2">Certificates</h2>
        {profileData.certificates.length === 0 ? <div>No certificates listed.</div> : profileData.certificates.map((c: any) => (
          <div key={c.id} className="mb-2">
            <div><b>{c.title}</b></div>
            <div className="text-gray-700 text-sm">{c.description}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}