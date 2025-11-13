'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';
import JobDetailsForm from '@/components/forms/JobDetailsForm';
import JobDescriptionForm from '@/components/forms/JobDescriptionForm';
import { toast } from 'react-hot-toast';
import { JobFormData } from '@/types/job';
import { Card } from '@/components/ui/card';
import { set } from 'date-fns';

const PostJob = () => {
  const { register, handleSubmit, formState: { errors }, control, setValue, watch } = useForm<JobFormData>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState('');
  const [hasDeadline, setHasDeadline] = useState(false);
  const [deadline, setDeadline] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [error, setError] = useState<any>(null);
  const [skillsError, setSkillsError] = useState<string | null>(null);

  const handleAddSkill = () => {
    if (skills.length >= 30) {
      setSkillsError('Maximum 30 skills allowed');
      return;
    }
    
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setValue('skills', updatedSkills);
      setNewSkill('');
      setSkillsError(null);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    setValue('skills', updatedSkills);
    setSkillsError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const onSubmit = async (data: JobFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (skills.length === 0) {
      setSkillsError('At least one skill is required');
      setIsSubmitting(false);
      return;
    }
    try {
      const companyId = localStorage.getItem('companyId');
      
      const response = await axios.post('http://localhost:4000/api/job/createJob', {
        ...data,
        location: location,
        deadline: hasDeadline ? deadline : undefined,
        skills: skills,
        createdBy: companyId,
      }); 
      if(response.status === 201){
        toast.success('Job Posted');
        router.push('/employer/dashboard/jobs');
      }
    } catch (error: any) {
      console.error('Error creating job:', error.message);
      setError(error.message);
      toast.error('Failed to post job. Please try again.',error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Post a New Job</h1>
        <p className="text-muted-foreground">Fill out the form below to post a new job listing.</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6">
          <JobDetailsForm
            register={register}
            setValue={setValue}
            errors={errors}
            control={control}
            location={location}
            setLocation={setLocation}
            hasDeadline={hasDeadline}
            setHasDeadline={setHasDeadline}
            deadline={deadline}
            setDeadline={setDeadline}
            watch={watch}
          />
          
          
          <Card className="space-y-4 bg-white p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Required Skills</h3>
              <span className="text-sm text-muted-foreground">
                {skills.length}/30 skills
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newSkill">Add Skills</Label>
              <div className="flex gap-2 items-end">
                <Input
                  id="newSkill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter a skill (e.g., JavaScript, Communication)"
                  disabled={skills.length >= 30}
                />
                <Button 
                  type="button" 
                  onClick={handleAddSkill}
                  className="bg-primary hover:bg-primary/90 text-white"
                  disabled={skills.length >= 30}
                >
                  +
                </Button>
              </div>
              {skillsError && (
                <p className="text-sm text-red-600">{skillsError}</p>
              )}
              <div className="flex flex-wrap gap-2 p-2 border rounded-lg min-h-[40px] bg-muted mt-2">
                {skills.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No skills added yet. Add your first skill above.
                  </p>
                ) : (
                  skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="bg-primary text-primary-foreground px-3 py-1 rounded-lg flex items-center"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 hover:text-destructive"
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          </Card>
          <JobDescriptionForm register={register} errors={errors}  />

          
       
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button 
            type="submit" 
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : 'Submit Job'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
