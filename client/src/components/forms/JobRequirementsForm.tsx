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
  const [skillsError, setSkillsError] = useState<string | null>(null);

  const handleAddSkill = useCallback(() => {
    const currentSkills = watch('skills') || [];
    
    if (currentSkills.length >= 30) {
      setSkillsError('Maximum 30 skills allowed');
      return;
    }
    
    if (newSkill.trim() !== '') {
      const trimmedSkill = newSkill.trim();
      // Check if skill already exists to prevent duplicates
      if (!currentSkills.includes(trimmedSkill)) {
        setValue('skills', [...currentSkills, trimmedSkill]);
        setNewSkill('');
        setSkillsError(null);
      }
    }
  }, [newSkill, setValue, watch]);

  const handleRemoveSkill = useCallback((skillToRemove: string, index: number) => {
    const currentSkills = watch('skills') || [];
    setValue('skills', currentSkills.filter((_, i) => i !== index));
    setSkillsError(null);
  }, [setValue, watch]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  }, [handleAddSkill]);

  return (
    <div className="space-y-6">
      <input 
        type="hidden" 
        {...register('skills', { 
          validate: value => (value && value.length > 0) || 'At least one skill is required' 
        })}
      />
      <div>
        <h2 className="text-xl font-semibold">Job Requirements</h2>
        <p className="text-gray-600">Specify the skills, qualifications, and benefits for this job</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Required Skills</h3>
            <span className="text-sm text-muted-foreground">
              {(watch('skills') || []).length}/30 skills
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
                disabled={(watch('skills') || []).length >= 30}
              />
              <Button 
                type="button" 
                onClick={handleAddSkill}
                className="bg-primary hover:bg-primary/90 text-white"
                disabled={(watch('skills') || []).length >= 30}
              >
                +
              </Button>
            </div>
            {errors.skills && (
              <p className="text-sm text-red-600">{errors.skills.message}</p>
            )}
            {skillsError && (
              <p className="text-sm text-red-600">{skillsError}</p>
            )}
            <div className="flex flex-wrap gap-2 p-2 border rounded-lg min-h-[40px] bg-muted mt-2">
              {(watch('skills') || []).length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Add skills required for the job
                </p>
              ) : (
                (watch('skills') || []).map((skill, index) => (
                  <span 
                    key={`skill-${index}`} 
                    className="bg-primary text-primary-foreground px-3 py-1 rounded-lg flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill, index)}
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
          <Label htmlFor="description">Description *</Label>
          <Textarea
            maxLength={600}
            id="description"
            placeholder="Describe the qualifications, experience, and other requirements"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="requirements">Requirements *</Label>
          <Textarea
            maxLength={600}
            id="requirements"
            placeholder="Describe the qualifications, experience, and other requirements"
            {...register('requirements', { required: 'Requirements are required' })}
            className="min-h-[120px]"
          />
          {errors.requirements && (
            <p className="text-red-500">{errors.requirements.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="benefits">Benefits & Perks *</Label>
          <Textarea
            maxLength={600}
            id="benefits"
            placeholder="Describe the benefits, perks, and what makes your company great..."
            {...register('benefits', { required: 'Benefits are required' })}
          />
          {errors.benefits && (
            <p className="text-sm text-red-600">{errors.benefits.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobRequirementsForm;
