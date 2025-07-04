import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Dummy profile data
const profileData = {
  about: {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    dateOfBirth: '1990-01-01',
    phoneNumber: '123-456-7890',
    sectors: ['Technology', 'Finance'],
    designation: 'Software Engineer',
    aboutMe: 'Passionate developer with 5+ years of experience.',
  },
  address: {
    city: 'Metropolis',
    province: 'Bagmati',
    postalCode: '12345',
    currentAddress: '123 Main St, Metropolis',
  },
  education: [
    {
      id: 1,
      collegeType: 'University',
      degree: 'BSc Computer Science',
      city: 'Metropolis',
      startDate: '2010-08-01',
      graduationDate: '2014-06-01',
      currentlyStudying: false,
    },
  ],
  projects: [
    {
      id: 1,
      title: 'Project X',
      description: 'A web app for X.',
      startDate: '2022-01-01',
      endDate: '2022-06-01',
      projectLink: 'https://example.com',
    },
  ],
  skills: ['JavaScript', 'React', 'Node.js'],
  achievements: [
    { id: 1, title: 'Best Developer Award', description: 'Awarded for outstanding performance.' },
  ],
  certificates: [
    { id: 1, title: 'Certified React Developer', description: 'React certification.' },
  ],
};

const ViewProfilePage = () => {
  const { about, address, education, projects, skills, achievements, certificates } = profileData;

  return (
    <div className='max-w-7xl mx-auto py-8'>
        <div className='flex justify-between'>
      <h1 className="text-3xl font-bold mb-8">Profile Overview</h1>
      <Button variant={"default"} size={"lg"}>Update Profile</Button>
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
          <div><b>Name:</b> {about.firstName} {about.lastName}</div>
          <div><b>Gender:</b> {about.gender}</div>
          <div><b>Date of Birth:</b> {about.dateOfBirth}</div>
          <div><b>Phone Number:</b> {about.phoneNumber}</div>
          <div><b>Designation:</b> {about.designation}</div>
          <div><b>Sectors:</b> {about.sectors.map(sector => <Badge key={sector} className="ml-1">{sector}</Badge>)}</div>
          <div><b>About Me:</b> <span className="text-gray-700">{about.aboutMe}</span></div>
        </div>
      </Card>

      {/* Address */}
      <Card className="mb-6 p-6">
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        {education.map(edu => (
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
      
      <Card className="mb-6 p-6">
        <h2 className="text-xl font-semibold mb-2">Address</h2>
        <div className="space-y-1">
          <div><b>City:</b> {address.city}</div>
          <div><b>Province:</b> {address.province}</div>
          <div><b>Postal Code:</b> {address.postalCode}</div>
          <div><b>Current Address:</b> {address.currentAddress}</div>
        </div>
      </Card>

      {/* Projects */}
      <Card className="mb-6 p-6">
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        {projects.map(project => (
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

      {/* Skills */}
      <Card className="mb-6 p-6">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="mb-6 p-6">
        <h2 className="text-xl font-semibold mb-2">Achievements</h2>
        {achievements.length === 0 ? <div>No achievements listed.</div> : achievements.map(a => (
          <div key={a.id} className="mb-2">
            <div><b>{a.title}</b></div>
            <div className="text-gray-700 text-sm">{a.description}</div>
          </div>
        ))}
      </Card>

      {/* Certificates */}
      <Card className="mb-6 p-6">
        <h2 className="text-xl font-semibold mb-2">Certificates</h2>
        {certificates.length === 0 ? <div>No certificates listed.</div> : certificates.map(c => (
          <div key={c.id} className="mb-2">
            <div><b>{c.title}</b></div>
            <div className="text-gray-700 text-sm">{c.description}</div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ViewProfilePage; 