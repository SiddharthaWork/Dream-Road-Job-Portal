'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Mail, Phone, MapPin, Download, ExternalLink, CheckCircle, Github, Linkedin, Globe, Eye, Award, Briefcase, GraduationCap, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AppProvider, useApp } from '@/contexts/AppContext';
import { format } from 'date-fns';

const ApplicantProfile = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { toast } = useToast();
  const { getApplicant, toggleShortlist } = useApp();

  const applicant = id ? getApplicant(id) : null;

  if (!applicant) {
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

  const handleShortlist = () => {
    if (!applicant.isShortlisted) {
      toggleShortlist(applicant.id);
      toast({
        title: "Applicant Shortlisted",
        description: `${applicant.name} has been added to your shortlist.`,
      });
    } else {
      toast({
        title: "Already Shortlisted",
        description: `${applicant.name} is already in your shortlist.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => router.push('/employer/dashboard/applicants')}
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
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src="https://images.unsplash.com/photo-1628563694622-5a76957fd09c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" />
                  <AvatarFallback className="text-lg">
                    {applicant.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{applicant.name}</h3>
                  <p className="text-muted-foreground">Applied on {format(applicant.appliedDate, 'MMM d, yyyy')}</p>
                  <Badge className={applicant.isShortlisted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                    {applicant.isShortlisted ? 'Shortlisted' : applicant.status}
                  </Badge>
                </div>
                <Button 
                  onClick={handleShortlist}
                  className={applicant.isShortlisted ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-600 hover:bg-green-700'}
                  disabled={applicant.isShortlisted}
                >
                  {applicant.isShortlisted ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Already Shortlisted
                    </>
                  ) : (
                    'Shortlist Applicant'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{applicant.email}</span>
              </div>
              {applicant.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{applicant.phone}</span>
                </div>
              )}
              {applicant.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{applicant.address}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Links */}
          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {applicant.linkedin && (
                <div className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4 text-blue-600" />
                  <a href={applicant.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                    LinkedIn Profile
                  </a>
                  <ExternalLink className="h-3 w-3" />
                </div>
              )}
              {applicant.github && (
                <div className="flex items-center gap-3">
                  <Github className="h-4 w-4 text-gray-800" />
                  <a href={applicant.github} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-800 hover:underline">
                    GitHub Profile
                  </a>
                  <ExternalLink className="h-3 w-3" />
                </div>
              )}
              {applicant.portfolio && (
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-green-600" />
                  <a href={applicant.portfolio} target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 hover:underline">
                    Portfolio Website
                  </a>
                  <ExternalLink className="h-3 w-3" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Detailed Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          {applicant.about && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{applicant.about}</p>
              </CardContent>
            </Card>
          )}

          {/* Skills */}
          {applicant.skills && applicant.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {applicant.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
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
                    <h4 className="font-medium">Resume_{applicant.name.replace(' ', '_')}.pdf</h4>
                    <p className="text-sm text-gray-500">Submitted with application</p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        // Minimal PDF file with 'Placeholder Resume' text
                        const pdfData = '/Resume-Siddhartha_Shrestha.pdf';
                        const link = document.createElement('a');
                        link.href = pdfData;
                        link.download = `Resume_${applicant.name.replace(' ', '_')}.pdf`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    > 
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          {applicant.education && applicant.education.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {applicant.education.map((edu, index) => (
                  <div key={index}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="space-y-2">
                      <h4 className="font-medium">{edu.degree}</h4>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">
                        Graduated: {edu.year}
                        {edu.gpa && ` | GPA: ${edu.gpa}`}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Work Experience */}
          {applicant.experience && applicant.experience.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {applicant.experience.map((exp, index) => (
                  <div key={index}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="space-y-2">
                      <h4 className="font-medium">{exp.role}</h4>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Projects */}
          {applicant.projects && applicant.projects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {applicant.projects.map((project, index) => (
                  <div key={index}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{project.title}</h4>
                        {project.link && (
                          <Button variant="outline" size="sm" onClick={() => window.open(project.link, '_blank')}>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-gray-700">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Achievements */}
          {applicant.achievements && applicant.achievements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {applicant.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Certificates */}
          {applicant.certificates && applicant.certificates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Certificates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {applicant.certificates.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{cert.name}</h4>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                      <p className="text-sm text-gray-500">{cert.date}</p>
                    </div>
                    {cert.link && (
                      <Button variant="outline" size="sm" onClick={() => window.open(cert.link, '_blank')}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Cover Letter */}
          {applicant.coverLetter && (
            <Card>
              <CardHeader>
                <CardTitle>Cover Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{applicant.coverLetter}</p>
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
