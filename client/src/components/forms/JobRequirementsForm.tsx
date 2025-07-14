import React, { useState, useCallback } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from 'react-hook-form';
import { JobFormData } from '@/types/job';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface JobRequirementsFormProps {
  register: UseFormRegister<JobFormData>;
  errors: FieldErrors<JobFormData>;
  setValue: UseFormSetValue<JobFormData>;
  watch: UseFormWatch<JobFormData>;
}

const JobRequirementsForm = ({ register, errors, setValue, watch }: JobRequirementsFormProps) => {
  const [newSkill, setNewSkill] = useState<string>('');

  const handleAddSkill = useCallback(() => {
    if (newSkill.trim() !== '') {
      const currentSkills = watch('skills') || [];
      setValue('skills', [...currentSkills, newSkill.trim()]);
      setNewSkill('');
    }
  }, [newSkill, setValue, watch]);

  const handleRemoveSkill = useCallback((skillToRemove: string) => {
    const currentSkills = watch('skills') || [];
    setValue('skills', currentSkills.filter(skill => skill !== skillToRemove));
  }, [setValue, watch]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  }, [handleAddSkill]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Job Requirements</h2>
        <p className="text-gray-600">Specify the skills, qualifications, and benefits for this job</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Required Skills</h3>
          <div className="space-y-2">
            <Label htmlFor="newSkill">Add Skills</Label>
            <div className="flex gap-2 items-end">
              <Input
                id="newSkill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter a skill (e.g., JavaScript, Communication)"
              />
              <Button 
                type="button" 
                onClick={handleAddSkill}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                +
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 p-2 border rounded-lg min-h-[40px] bg-muted mt-2">
              {(watch('skills') || []).length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Add skills required for the job
                </p>
              ) : (
                (watch('skills') || []).map((skill) => (
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
        </div>
        
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the qualifications, experience, and other requirements"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="requirements">Requirements</Label>
          <Textarea
            id="requirements"
            placeholder="Describe the qualifications, experience, and other requirements"
            {...register('requirements')}
            className="min-h-[120px]"
          />
          {errors.requirements && (
            <p className="text-red-500">{errors.requirements.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="benefits">Benefits & Perks</Label>
          <Textarea
            id="benefits"
            placeholder="List the benefits and perks offered (e.g. Health insurance, Remote work)"
            {...register('benefits')}
            className="min-h-[100px]"
          />
          {errors.benefits && (
            <p className="text-red-500">{errors.benefits.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobRequirementsForm;
