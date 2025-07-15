"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Experience } from "@/types/resume";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExperienceEditorProps {
  experience: Experience[];
  onUpdate: (experience: Experience[]) => void;
}

export default function ExperienceEditor({ experience, onUpdate }: ExperienceEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, watch, setValue } = useForm<Experience>();
  const isCurrentJob = watch("current");

  const addExperience = (data: Experience) => {
    const newExperience: Experience = {
      ...data,
      id: Date.now().toString(),
    };
    
    if (editingIndex !== null) {
      const updated = [...experience];
      updated[editingIndex] = newExperience;
      onUpdate(updated);
      setEditingIndex(null);
    } else {
      onUpdate([...experience, newExperience]);
    }
    
    reset();
    toast({
      title: editingIndex !== null ? "Experience Updated" : "Experience Added",
      description: "Your work experience has been saved.",
    });
  };

  const deleteExperience = (index: number) => {
    const updated = experience.filter((_, i) => i !== index);
    onUpdate(updated);
    toast({
      title: "Experience Deleted",
      description: "Work experience has been removed.",
    });
  };

  const editExperience = (index: number) => {
    const exp = experience[index];
    Object.keys(exp).forEach((key) => {
      setValue(key as keyof Experience, exp[key as keyof Experience]);
    });
    setEditingIndex(index);
  };

  const cancelEdit = () => {
    reset();
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-resume-heading">
            <Briefcase className="h-5 w-5" />
            Work Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(addExperience)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input 
                  id="jobTitle"
                  {...register("jobTitle", { required: true })}
                  placeholder="Senior Software Engineer"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="company">Company *</Label>
                <Input 
                  id="company"
                  {...register("company", { required: true })}
                  placeholder="TechCorp Inc."
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location"
                {...register("location")}
                placeholder="Kathmandu, Nepal"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input 
                  id="startDate"
                  type="month"
                  {...register("startDate", { required: true })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input 
                  id="endDate"
                  type="month"
                  {...register("endDate")}
                  disabled={isCurrentJob}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="current"
                checked={isCurrentJob}
                onCheckedChange={(checked) => setValue("current", checked as boolean)}
              />
              <Label htmlFor="current">I currently work here</Label>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea 
                id="description"
                {...register("description", { required: true })}
                placeholder="Describe your responsibilities, achievements, and impact..."
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="gap-2">
                <Plus className="h-4 w-4" />
                {editingIndex !== null ? "Update Experience" : "Add Experience"}
              </Button>
              {editingIndex !== null && (
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {experience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Added Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={exp.id} className="border border-resume-border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-resume-heading">{exp.jobTitle}</h4>
                      <p className="text-resume-subtext">{exp.company}</p>
                      <p className="text-sm text-resume-subtext">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                      <p className="text-sm mt-2">{exp.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => editExperience(index)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => deleteExperience(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export const getStaticProps = async () => {
  return {
    notFound: true,
  };
};