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
import { UseFormRegister, UseFormSetValue, FieldErrors, UseFormWatch, Control, Controller } from 'react-hook-form';
import LocationInput from '../LocationInput';
import { JobFormData } from '@/types/job';
import { Textarea } from '@/components/ui/textarea'; 
import { z } from 'zod'; 

const jobDetailsSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  department: z.string().min(1, 'Department is required'),
  location: z.string()
    .min(5, 'Location must be at least 5 characters')
    .max(40, 'Location must be at most 40 characters'),
  type: z.string().min(1, 'Employment type is required'),
  experience: z.string().min(1, 'Experience level is required'),
  salaryMin: z.number().min(0, 'Salary must be positive').refine(val => val >= 0, {
    message: 'Salary must be positive',
  }),
  salaryMax: z.number().min(0, 'Salary must be positive').refine(val => val >= 0, {
    message: 'Salary must be positive',
  }),
});

interface JobDetailsFormProps {
  register: UseFormRegister<JobFormData>;
  setValue: UseFormSetValue<JobFormData>;
  errors: FieldErrors<JobFormData>;
  control?: Control<JobFormData>;
  location: string;
  setLocation: (value: string) => void;
  hasDeadline: boolean;
  setHasDeadline: (value: boolean) => void;
  deadline?: any;
  setDeadline: (date?: any) => void;
  watch: UseFormWatch<JobFormData>;
  department?: string;
  type?: any;
  experience?: any;
  salaryMin?: any;
  salaryMax?: any;
}

const JobDetailsForm = ({
  register,
  setValue,
  errors,
  control,
  location,
  setLocation,
  hasDeadline,
  setHasDeadline,
  deadline,
  setDeadline,
  watch,
  department,
  type,
  experience,
  salaryMin,
  salaryMax,
}: JobDetailsFormProps) => {
  const [salaryError, setSalaryError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const min = watch('salaryMin');
    const max = watch('salaryMax');
    if (min !== undefined && max !== undefined && min !== null && max !== null) {
      if (max < min) {
        setSalaryError('Maximum salary must be greater than minimum salary');
      } else {
        setSalaryError(null);
      }
    } else {
      setSalaryError(null);
    }
  }, [watch('salaryMin'), watch('salaryMax')]);

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
            maxLength={30}
            id="title"
            placeholder="e.g. Senior React Developer"
            {...register('title', { 
              required: 'Job title is required',
              minLength: {
                value: 5,
                message: 'Job title must be at least 5 characters'
              }
            })}
          />
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Department *</Label>
            <Controller
              name="department"
              control={control}
              rules={{ required: 'Department is required' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
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
              )}
            />
            {errors.department && (
              <p className="text-sm text-red-600">{errors.department.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <LocationInput
              id="location"
              value={location}
              onChange={handleLocationChange}
              placeholder="e.g. Kathmandu, Nepal"
              minLength={5}
              maxLength={40}
            />
            {errors.location && (
              <p className="text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Employment Type *</Label>
            <Controller
              name="type"
              control={control}
              rules={{ required: 'Employment type is required' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
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
              )}
            />
            {errors.type && (
              <p className="text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Experience Level *</Label>
            <Controller
              name="experience"
              control={control}
              rules={{ required: 'Experience level is required' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
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
              )}
            />
            {errors.experience && (
              <p className="text-sm text-red-600">{errors.experience.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salaryMin">Minimum Salary Per Month*</Label>
            <Input
              id="salaryMin"
              type="number"
              placeholder="Minimum"
              min="1000"
              {...register('salaryMin', { 
                required: 'Minimum salary is required',
                valueAsNumber: true,
                validate: value => !isNaN(value) && value >= 0 || 'Salary must be positive'
              })}
            />
            {errors.salaryMin && (
              <p className="text-sm text-red-600">{errors.salaryMin.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="salaryMax">Maximum Salary Per Month*</Label>
            <Input
              id="salaryMax"
              type="number"
              placeholder="Maximum"
              min="1000"
              {...register('salaryMax', {
                required: 'Maximum salary is required',
                valueAsNumber: true,
                validate: value => !isNaN(value) && value >= 0 || 'Salary must be positive'
              })}
            />
            {errors.salaryMax && (
              <p className="text-sm text-red-600">{errors.salaryMax.message}</p>
            )}
          </div>
        </div>
        {salaryError && (
          <p className="text-sm text-red-600">{salaryError}</p>
        )}

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
                      "w-full justify-start text-left font-normal bg-white text-black",
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
