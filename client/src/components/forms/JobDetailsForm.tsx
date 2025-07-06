
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
import LocationInput from '../LocationInput';
  
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

interface JobDetailsFormProps {
  register: UseFormRegister<JobFormData>;
  setValue: UseFormSetValue<JobFormData>;
  errors: FieldErrors<JobFormData>;
  location: string;
  setLocation: (value: string) => void;
  hasDeadline: boolean;
  setHasDeadline: (value: boolean) => void;
  deadline?: Date;
  setDeadline: (date?: Date) => void;
}

const JobDetailsForm = ({
  register,
  setValue,
  errors,
  location,
  setLocation,
  hasDeadline,
  setHasDeadline,
  deadline,
  setDeadline,
  skills,
}: JobDetailsFormProps) => {
  const handleLocationChange = (value: string) => {
    setLocation(value);
    setValue('location', value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
        <CardDescription>Basic information about the position</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            placeholder="e.g. Senior React Developer"
            {...register('title', { required: 'Job title is required' })}
          />
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Department *</Label>
            <Select onValueChange={(value) => setValue('department', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <LocationInput
              id="location"
              value={location}
              onChange={handleLocationChange}
              placeholder="e.g. Kathmandu, CA or Remote"
            />
            {errors.location && (
              <p className="text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Employment Type *</Label>
            <Select onValueChange={(value) => setValue('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Experience Level *</Label>
            <Select onValueChange={(value) => setValue('experience', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                <SelectItem value="senior">Senior Level (6+ years)</SelectItem>
                <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Salary Range</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Min (e.g. 80000)"
              {...register('salaryMin')}
            />
            <Input
              placeholder="Max (e.g. 120000)"
              {...register('salaryMax')}
            />
          </div>
        </div>

        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasDeadline"
              checked={hasDeadline}
              onCheckedChange={(checked) => {
                setHasDeadline(checked as boolean);
                setValue('hasDeadline', checked as boolean);
                if (!checked) {
                  setDeadline(undefined);
                  setValue('deadline', undefined);
                }
              }}
            />
            <Label htmlFor="hasDeadline">Set Application Deadline</Label>
          </div>

          {hasDeadline && (
            <div className="space-y-2">
              <Label>Application Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !deadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP") : <span>Pick a deadline</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={(date) => {
                      setDeadline(date);
                      setValue('deadline', date);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDetailsForm;
