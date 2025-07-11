'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Mail, Phone, MapPin, Download, ExternalLink, CheckCircle, Github, Linkedin, Globe, Eye, Award, Briefcase, GraduationCap, User, Star } from 'lucide-react';
import { AppProvider, useApp } from '@/contexts/AppContext';
import { format } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
interface UserProfile {
  firstName: string;
  lastName: string;
  profilePicture: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  sectors: (string | { title: string })[];
  designation: string;
  aboutMe: string;
  city: string;
  currentAddress: string;
  postalCode: string;
  province: string;
  education: any[];
  projects: any[];
  skills: string[];
  achievements: (any | { title: any; description: any })[];
  certificates: Array<{ name: any, issuer: any, date: any }>;
  experiences: any[];
  isShortlisted: boolean;
  coverLetter: string;
}

interface UserData {
  profile: UserProfile;
  _id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profileCompleted: boolean;
}


const ApplicantProfile = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams?.get('jobid') as string;
  const { getApplicant, toggleShortlist } = useApp();

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState('');
  const [applicationId, setApplicationId] = useState<any>([]);
  const [shortlist, setShortlist] = useState<any>('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [actionCompleted, setActionCompleted] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [backupResume, setBackupResume] = useState('');
  console.log(applicationId);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id || !jobId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/api/user/getuserappliedjobs/${id}?jobId=${jobId}`);
        if (response.data.success) {
          setUser(response.data.data);
          console.log("here is some data",response.data.data)
          const mapResume = response.data.data?.appliedJobs?.map((job: any) => job.resume);
          const applicationId = response.data.data?.appliedJobs?.map((job: any) => job._id);
          const shortlist = response.data.data?.appliedJobs?.map((job: any) => job.status);
          const coverLetter = response.data.data?.appliedJobs?.map((job: any) => job.coverLetter);
          const backupResume = response.data.data?.profile?.resume;

          console.log(shortlist)
          console.log(applicationId)
          setResume(mapResume);
          setApplicationId(applicationId[0]);
          setShortlist(shortlist[0]);
          setCoverLetter(coverLetter[0]);
          setBackupResume(backupResume);
          }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("Failed to fetch applicant data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, jobId]);
  console.log(resume,"resume")
  console.log(backupResume,"klsahdlkashdlsaj")

  const handleShortlist = async () => {
    if (!user || !applicationId) return;
    
    setUpdatingStatus(true);
    
    try {
      const response = await axios.put(`http://localhost:4000/api/application/updateStatus/${applicationId}`, {
        status: "shortlisted",
      });
      
      console.log(response.data);
      toggleShortlist(applicationId);
      toast.success(`${user.fullname} has been added to your shortlist.`);
      setActionCompleted(true);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error("Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleReject = async () => {
    if (!user || !applicationId) return;
    
    setUpdatingStatus(true);
    
    try {
      const response = await axios.put(`http://localhost:4000/api/application/updateStatus/${applicationId}`, {
        status: "rejected",
      });
      
      console.log(response.data);
      toggleShortlist(applicationId);
      toast.success(`${user.fullname} has been rejected.`);
      setActionCompleted(true);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error("Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDownload = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const displayResume = resume[0] === null ? backupResume : resume;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Applicant not found</h3>
            <p className="text-gray-500 mb-4">
              The applicant profile you're looking for doesn't exist.
            </p>
            <Button onClick={() => router.push('/employer/dashboard/applicants')}>
              Back to Applicants
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Applicants
        </Button>
      <div>
          <h2 className="text-3xl font-bold tracking-tight">Applicant Profile</h2>
          <p className="text-muted-foreground">Review candidate details and make hiring decisions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-4">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage 
                    src={user.profile.profilePicture || "/placeholder-user.jpg"} 
                    alt={user.fullname} 
                  />
                  <AvatarFallback>
                    {user.fullname.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4">
                  <div className="text-xl font-bold">{user.fullname}</div>
                  <div className="text-muted-foreground">{user.profile.designation}</div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-2 w-full">
                  {/* <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Message
                  </Button> */}
                  <Button 
                    variant={actionCompleted ? "default" : "outline"}
                    size="sm" 
                    className="flex-1"
                    onClick={handleShortlist}
                    disabled={updatingStatus || actionCompleted || shortlist === "shortlisted"}
                  >
                    <Star className="h-4 w-4 mr-2" /> 
                    {actionCompleted ? "Shortlisted" : (shortlist === "shortlisted" ? "Shortlisted" : "Shortlist")}
                  </Button>
                  <Button 
                    variant={actionCompleted ? "default" : "outline"}
                    size="sm" 
                    className="flex-1"
                    onClick={handleReject}
                    disabled={updatingStatus || actionCompleted || shortlist === "rejected"}
                  >
                    <Star className="h-4 w-4 mr-2" /> 
                    {actionCompleted ? "Rejected" : (shortlist === "rejected" ? "Rejected" : "Reject")}
                  </Button> 
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div>
                  <div className="font-medium">Contact Information</div>
                  <div className="text-sm text-muted-foreground">
                    <div>{user.email}</div>
                    <div>{user.phoneNumber}</div>
                  </div>
                </div>
                
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-muted-foreground">
                    {user.profile.city}, {user.profile.province}
                  </div>
                </div>
                
                <div>
                  <div className="font-medium">Sectors</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.profile.sectors.map((sector, index) => (
                      <Badge key={index} variant="secondary">
                        {typeof sector === 'string' ? sector : sector.title}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent className="h-full w-full overflow-auto ">
              <p className="text-sm break-words whitespace-pre-wrap">
                {user.profile.aboutMe || "No bio provided"}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Detailed Info */}
        <div className="lg:col-span-2 space-y-6">
     
          {/* Skills */}
          {user.profile.skills && user.profile.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="max-h-[200px] overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {user.profile.skills.map((skill: string, techIndex: number) => (
                    <Badge key={techIndex} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resume */}
          <Card>
            <CardHeader>
              <CardTitle>Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="space-y-4">
                  <div className="bg-red-100 p-4 rounded-lg mx-auto w-16 h-16 flex items-center justify-center">
                    <Download className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Resume_{user.fullname.replace(' ', '_')}.pdf</h4>
                    <p className="text-sm text-gray-500">Submitted with application</p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    {/* <Button variant="outline" size="sm" onClick={() => router.push(`/employer/dashboard/applicants/viewer?url=${encodeURIComponent(resume)}`)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button> */}
                    <Button variant="outline" size="sm" onClick={() => {
                      const downloadUrl = displayResume + (displayResume.includes('?') ? '&' : '?') + 'fl_attachment';
                      handleDownload(downloadUrl, 'resume.pdf');
                    }}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    {displayResume && (
                      <Button variant="outline" size="sm" onClick={() => window.open(displayResume, '_blank')}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Resume
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          {user.profile.education && user.profile.education.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.profile.education.map((edu, index) => (
                  <div key={index}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="space-y-2">
                      <h4 className="font-medium">{edu.degree}</h4>
                      <p className="text-sm text-gray-600">
                        {edu.collegeType} in {edu.city}
                      </p>
                      <p className="text-sm text-gray-500">
                        {edu.currentlyStudying ? 'Currently studying' : `Graduated: ${edu.graduationDate}`}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Work Experience */}
          {user.profile.experiences && user.profile.experiences.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {user.profile.experiences.map((exp, index) => (
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
          {user.profile.projects && user.profile.projects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {user.profile.projects?.map((project, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-medium">{project.title}</h4>
                    <p className="text-sm text-gray-700 mt-2">{project.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Achievements */}
          {user.profile.achievements && user.profile.achievements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.profile.achievements?.map((achievement, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-gray-700">{achievement.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Certificates */}
          {user.profile.certificates && user.profile.certificates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Certificates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.profile.certificates.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{cert.name}</h4>
                      <p className="text-sm text-gray-500">{cert.issuer} | {cert.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

        {/* so here if there is coverletter then on ly show this card */}
            {coverLetter && (
            <Card>
              <CardHeader>
                <CardTitle>Cover Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {coverLetter} 
                </p>
              </CardContent>
            </Card>
            )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfile;

export const ApplicantsProflePreview = () => {
  return (
    <AppProvider>
      <ApplicantProfile/>
    </AppProvider>
  )
}
