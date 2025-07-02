'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/AppContext';
import JobDetailsForm from '@/components/forms/JobDetailsForm';
import JobDescriptionForm from '@/components/forms/JobDescriptionForm';
import JobPreviewCard from '@/components/forms/JobPreviewCard';
import PublishingOptionsCard from '@/components/forms/PublishingOptionsCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
interface JobFormData {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salaryMin: string;
  salaryMax: string;
  description: string;
  requirements: string;
  benefits: string;
  hasDeadline: boolean;
  deadline?: Date;
}

const PostJob = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasDeadline, setHasDeadline] = useState(false);
  const [deadline, setDeadline] = useState<Date>();
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<JobFormData>();
  const { toast } = useToast();
  const router = useRouter();
  const { addJob } = useApp();

  const onSubmit = async (data: JobFormData) => {
    setIsLoading(true);
    
    try {
      addJob({
        ...data,
        location: location,
        status: 'active',
        deadline: hasDeadline ? deadline : undefined,
        skills,
      });
      
      toast({
        title: "Job posted successfully!",
        description: `${data.title} has been posted and is now live.`,
      });
      
    router.push('/employer/dashboard/jobs');
    } catch (error) {
      toast({
        title: "Error posting job",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSkill = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Post a New Job</h2>
        <p className="text-muted-foreground">Create a new job posting to attract top talent</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <JobDetailsForm
              register={register}
              setValue={setValue}
              errors={errors}
              location={location}
              setLocation={setLocation}
              hasDeadline={hasDeadline}
              setHasDeadline={setHasDeadline}
              deadline={deadline}
              setDeadline={setDeadline}
            />

            <JobDescriptionForm
              register={register}
              errors={errors}
            />

            {/* Skills Section */}
            <div className="space-y-2">
              <label htmlFor="newSkill" className="block font-medium">Add Skills</label>
              <div className="flex gap-2 justify-center items-end">
                <input
                  id="newSkill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter a skill (e.g., JavaScript, Communication)"
                  className="rounded-lg mt-4 flex-1 border px-3 py-2"
                />
                <Button onClick={handleAddSkill} className="bg-black hover:bg-[#255cf4]/80 text-white">
                  +
                </Button>
              </div>
              <div className="flex flex-wrap  gap-2 px-4 py-0 border rounded-lg min-h-[40px] bg-gray-50 mt-2">
                {skills.length === 0 ? (
                  <p className="text-gray-500 text-sm">No skills added yet. Add your first skill above.</p>
                ) : (
                  skills.map((skill, index) => (
                    <span key={skill} className="bg-black text-white px-3 py-0 rounded-lg flex items-center">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 hover:text-[#255cf4] text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
            {/* End Skills Section */}
          </div>

          <div className="space-y-6">
            <JobPreviewCard
              hasDeadline={hasDeadline}
              deadline={deadline}
            />

            <PublishingOptionsCard
              isLoading={isLoading}
              hasDeadline={hasDeadline}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
