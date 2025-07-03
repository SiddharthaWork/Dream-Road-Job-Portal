"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Education, Project, Certification } from "@/types/resume";
import { Plus, Trash2, GraduationCap, FolderOpen, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EducationEditorProps {
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  onUpdate: (updates: {
    education?: Education[];
    projects?: Project[];
    certifications?: Certification[];
  }) => void;
}

export const EducationEditor = ({ education, projects, certifications, onUpdate }: EducationEditorProps) => {
  const [editingEducation, setEditingEducation] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [editingCertification, setEditingCertification] = useState<number | null>(null);
  const { toast } = useToast();

  const educationForm = useForm<Education>();
  const projectForm = useForm<Project>();
  const certificationForm = useForm<Certification>();

  const addEducation = (data: Education) => {
    const newEducation: Education = {
      ...data,
      id: Date.now().toString(),
    };
    
    if (editingEducation !== null) {
      const updated = [...education];
      updated[editingEducation] = newEducation;
      onUpdate({ education: updated });
      setEditingEducation(null);
    } else {
      onUpdate({ education: [...education, newEducation] });
    }
    
    educationForm.reset();
    toast({
      title: editingEducation !== null ? "Education Updated" : "Education Added",
    });
  };

  const addProject = (data: Project) => {
    const newProject: Project = {
      ...data,
      id: Date.now().toString(),
      technologies: data.technologies.toString().split(',').map(t => t.trim()),
    };
    
    if (editingProject !== null) {
      const updated = [...projects];
      updated[editingProject] = newProject;
      onUpdate({ projects: updated });
      setEditingProject(null);
    } else {
      onUpdate({ projects: [...projects, newProject] });
    }
    
    projectForm.reset();
    toast({
      title: editingProject !== null ? "Project Updated" : "Project Added",
    });
  };

  const addCertification = (data: Certification) => {
    const newCertification: Certification = {
      ...data,
      id: Date.now().toString(),
    };
    
    if (editingCertification !== null) {
      const updated = [...certifications];
      updated[editingCertification] = newCertification;
      onUpdate({ certifications: updated });
      setEditingCertification(null);
    } else {
      onUpdate({ certifications: [...certifications, newCertification] });
    }
    
    certificationForm.reset();
    toast({
      title: editingCertification !== null ? "Certification Updated" : "Certification Added",
    });
  };

  return (
    <Tabs defaultValue="education" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="education" className="gap-2">
          <GraduationCap className="h-4 w-4" />
          Education
        </TabsTrigger>
        <TabsTrigger value="projects" className="gap-2">
          <FolderOpen className="h-4 w-4" />
          Projects
        </TabsTrigger>
        <TabsTrigger value="certifications" className="gap-2">
          <Award className="h-4 w-4" />
          Certifications
        </TabsTrigger>
      </TabsList>

      <TabsContent value="education" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-resume-heading">
              <GraduationCap className="h-5 w-5" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={educationForm.handleSubmit(addEducation)} className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="degree">Degree *</Label>
                <Input 
                  id="degree"
                  {...educationForm.register("degree", { required: true })}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="school">School/Institution *</Label>
                  <Input 
                    id="school"
                    {...educationForm.register("school", { required: true })}
                    placeholder="Stanford University"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="eduLocation">Location</Label>
                  <Input 
                    id="eduLocation"
                    {...educationForm.register("location")}
                    placeholder="Stanford, CA"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="eduStartDate">Start Date *</Label>
                  <Input 
                    id="eduStartDate"
                    type="month"
                    {...educationForm.register("startDate", { required: true })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="eduEndDate">End Date *</Label>
                  <Input 
                    id="eduEndDate"
                    type="month"
                    {...educationForm.register("endDate", { required: true })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="gpa">GPA</Label>
                  <Input 
                    id="gpa"
                    {...educationForm.register("gpa")}
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2"  >
                <Label htmlFor="eduDescription">Description</Label>
                <Textarea 
                  id="eduDescription"
                  {...educationForm.register("description")}
                  placeholder="Relevant coursework, achievements, etc."
                  rows={2}
                />
              </div>

              <Button type="submit" className="gap-2">
                <Plus className="h-4 w-4" />
                {editingEducation !== null ? "Update Education" : "Add Education"}
              </Button>
            </form>

            {education.length > 0 && (
              <div className="mt-6 space-y-4">
                <h4 className="font-semibold">Added Education</h4>
                {education.map((edu, index) => (
                  <div key={edu.id} className="border border-resume-border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold text-resume-heading">{edu.degree}</h5>
                        <p className="text-resume-subtext">{edu.school}</p>
                        <p className="text-sm text-resume-subtext">
                          {edu.startDate} - {edu.endDate}
                        </p>
                        {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                      </div>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => {
                          const updated = education.filter((_, i) => i !== index);
                          onUpdate({ education: updated });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="projects" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-resume-heading">
              <FolderOpen className="h-5 w-5" />
              Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={projectForm.handleSubmit(addProject)} className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="projectTitle">Project Title *</Label>
                <Input 
                  id="projectTitle"
                  {...projectForm.register("title", { required: true })}
                  placeholder="E-commerce Platform"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="projectDescription">Description *</Label>
                <Textarea 
                  id="projectDescription"
                  {...projectForm.register("description", { required: true })}
                  placeholder="Describe your project, its features, and your role..."
                  rows={3}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="technologies">Technologies *</Label>
                <Input 
                  id="technologies"
                  {...projectForm.register("technologies", { required: true })}
                  placeholder="React, Node.js, PostgreSQL, AWS (comma-separated)"
                />
              </div>

              <div className="grid grid-cols-3 gap-4  ">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="projectLink">Project Link</Label>
                  <Input 
                    id="projectLink"
                    {...projectForm.register("link")}
                    placeholder="https://github.com/username/project"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="projectStartDate">Start Date</Label>
                  <Input 
                    id="projectStartDate"
                    type="month"
                    {...projectForm.register("startDate")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="projectEndDate">End Date</Label>
                  <Input 
                    id="projectEndDate"
                    type="month"
                    {...projectForm.register("endDate")}
                  />
                </div>
              </div>

              <Button type="submit" className="gap-2">
                <Plus className="h-4 w-4" />
                {editingProject !== null ? "Update Project" : "Add Project"}
              </Button>
            </form>

            {projects.length > 0 && (
              <div className="mt-6 space-y-4">
                <h4 className="font-semibold">Added Projects</h4>
                {projects.map((project, index) => (
                  <div key={project.id} className="border border-resume-border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold text-resume-heading">{project.title}</h5>
                        <p className="text-sm mt-1">{project.description}</p>
                        <p className="text-sm text-resume-subtext mt-1">
                          Tech: {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => {
                          const updated = projects.filter((_, i) => i !== index);
                          onUpdate({ projects: updated });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="certifications" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-resume-heading">
              <Award className="h-5 w-5" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={certificationForm.handleSubmit(addCertification)} className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="certName">Certification Name *</Label>
                <Input 
                  id="certName"
                  {...certificationForm.register("name", { required: true })}
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="issuer">Issuing Organization *</Label>
                  <Input 
                    id="issuer"
                    {...certificationForm.register("issuer", { required: true })}
                    placeholder="Amazon Web Services"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="certDate">Date Obtained *</Label>
                  <Input 
                    id="certDate"
                    type="month"
                    {...certificationForm.register("date", { required: true })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="certLink">Verification Link</Label>
                <Input 
                  id="certLink"
                  {...certificationForm.register("link")}
                  placeholder="https://certification-verification-url.com"
                />
              </div>

              <Button type="submit" className="gap-2">
                <Plus className="h-4 w-4" />
                {editingCertification !== null ? "Update Certification" : "Add Certification"}
              </Button>
            </form>

            {certifications.length > 0 && (
              <div className="mt-6 space-y-4">
                <h4 className="font-semibold">Added Certifications</h4>
                {certifications.map((cert, index) => (
                  <div key={cert.id} className="border border-resume-border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold text-resume-heading">{cert.name}</h5>
                        <p className="text-resume-subtext">{cert.issuer}</p>
                        <p className="text-sm text-resume-subtext">{cert.date}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => {
                          const updated = certifications.filter((_, i) => i !== index);
                          onUpdate({ certifications: updated });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};