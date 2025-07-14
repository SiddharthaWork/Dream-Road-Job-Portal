"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skill, Language } from "@/types/resume";
import { Plus, Trash2, Code, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SkillsEditorProps {
  skills: Skill[];
  languages: Language[];
  onUpdate: (updates: {
    skills?: Skill[];
    languages?: Language[];
  }) => void;
}

export const SkillsEditor = ({ skills, languages, onUpdate }: SkillsEditorProps) => {
  const { toast } = useToast();
  
  const skillForm = useForm<Skill>();
  const languageForm = useForm<Language>();

  const addSkill = (data: Skill) => {
    const newSkill: Skill = {
      ...data,
      id: Date.now().toString(),
    };
    
    onUpdate({ skills: [...skills, newSkill] });
    skillForm.reset();
    toast({
      title: "Skill Added",
      description: "Your skill has been added successfully.",
    });
  };

  const addLanguage = (data: Language) => {
    const newLanguage: Language = {
      ...data,
      id: Date.now().toString(),
    };
    
    onUpdate({ languages: [...languages, newLanguage] });
    languageForm.reset();
    toast({
      title: "Language Added",
      description: "Your language has been added successfully.",
    });
  };

  const skillCategories = [
    "Programming Languages",
    "Frontend",
    "Backend", 
    "Database",
    "Cloud",
    "DevOps",
    "Tools",
    "Soft Skills",
    "Other"
  ];

  const skillLevels: Array<Skill['level']> = [
    "Beginner",
    "Intermediate", 
    "Advanced",
    "Expert"
  ];

  const languageProficiencies: Array<Language['proficiency']> = [
    "Basic",
    "Conversational",
    "Fluent", 
    "Native"
  ];

  return (
    <Tabs defaultValue="skills" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="skills" className="gap-2">
          <Code className="h-4 w-4" />
          Skills
        </TabsTrigger>
        <TabsTrigger value="languages" className="gap-2">
          <Globe className="h-4 w-4" />
          Languages
        </TabsTrigger>
      </TabsList>

      <TabsContent value="skills" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-resume-heading">
              <Code className="h-5 w-5" />
              Skills & Technologies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={skillForm.handleSubmit(addSkill)} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2"  >
                  <Label htmlFor="skillName">Skill Name *</Label>
                  <Input 
                    id="skillName"
                    {...skillForm.register("name", { required: true })}
                    placeholder="JavaScript"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="skillCategory">Category *</Label>
                  <Select onValueChange={(value) => skillForm.setValue("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="skillLevel">Proficiency Level *</Label>
                  <Select onValueChange={(value) => skillForm.setValue("level", value as Skill['level'])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Skill
              </Button>
            </form>

            {skills.length > 0 && (
              <div className="mt-6 space-y-4">
                <h4 className="font-semibold">Added Skills</h4>
                <div className="space-y-3">
                  {Object.entries(
                    skills.reduce((acc, skill) => {
                      if (!acc[skill.category]) {
                        acc[skill.category] = [];
                      }
                      acc[skill.category].push(skill);
                      return acc;
                    }, {} as Record<string, Skill[]>)
                  ).map(([category, categorySkills]) => (
                    <div key={category} className="border border-resume-border rounded-lg p-4">
                      <h5 className="font-semibold text-resume-heading mb-2">{category}</h5>
                      <div className="space-y-2">
                        {categorySkills.map((skill, index) => (
                          <div key={skill.id} className="flex justify-between items-center bg-muted p-2 rounded">
                            <div className="flex items-center gap-3">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-sm text-resume-subtext">({skill.level})</span>
                            </div>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => {
                                const updated = skills.filter(s => s.id !== skill.id);
                                onUpdate({ skills: updated });
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="languages" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-resume-heading">
              <Globe className="h-5 w-5" />
              Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={languageForm.handleSubmit(addLanguage)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="languageName">Language *</Label>
                  <Input 
                    id="languageName"
                    {...languageForm.register("language", { required: true })}
                    placeholder="English"
                  />
                </div>
                <div>
                  <Label htmlFor="proficiency">Proficiency Level *</Label>
                  <Select onValueChange={(value) => languageForm.setValue("proficiency", value as Language['proficiency'])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select proficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageProficiencies.map((proficiency) => (
                        <SelectItem key={proficiency} value={proficiency}>
                          {proficiency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Language
              </Button>
            </form>

            {languages.length > 0 && (
              <div className="mt-6 space-y-4">
                <h4 className="font-semibold">Added Languages</h4>
                <div className="space-y-2">
                  {languages.map((language) => (
                    <div key={language.id} className="flex justify-between items-center border border-resume-border rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{language.language}</span>
                        <span className="text-sm text-resume-subtext">({language.proficiency})</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => {
                          const updated = languages.filter(l => l.id !== language.id);
                          onUpdate({ languages: updated });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};