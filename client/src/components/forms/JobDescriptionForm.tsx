import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { JobFormData } from '@/types/job';

interface JobDescriptionFormProps {
  register: UseFormRegister<JobFormData>;
  errors: FieldErrors<JobFormData>;
}

const JobDescriptionForm = ({ register, errors }: JobDescriptionFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Description</CardTitle>
        <CardDescription>Detailed information about the role</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Job Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe the role, responsibilities, and what the candidate will be working on..."
            rows={6}
            {...register('description', { required: 'Job description is required' })}
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="requirements">Requirements *</Label>
          <Textarea
            id="requirements"
            placeholder="List the required skills, experience, and qualifications..."
            rows={4}
            {...register('requirements', { required: 'Requirements are required' })}
          />
          {errors.requirements && (
            <p className="text-sm text-red-600">{errors.requirements.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="benefits">Benefits & Perks *</Label>
          <Textarea
            id="benefits"
            placeholder="Describe the benefits, perks, and what makes your company great..."
            rows={4}
            {...register('benefits', { required: 'Benefits are required' })}
          />
          {errors.benefits && (
            <p className="text-sm text-red-600">{errors.benefits.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDescriptionForm;
