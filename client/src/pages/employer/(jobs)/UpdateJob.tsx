"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import JobDetailsForm from '@/components/forms/JobDetailsForm';
import JobRequirementsForm from '@/components/forms/JobRequirementsForm';
import { JobFormData } from '@/types/job';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

type JobData = JobFormData & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  applications: any[];
};

const UpdateJob = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [location, setLocation] = useState<string>('');
  const [hasDeadline, setHasDeadline] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);

  const {   
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<JobFormData>();

  // Fetch job data
  useEffect(() => {
    if (!id) return;
    
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/job/getjobbyid/${id}`);
        if (response.data.success) {
          const jobData = response.data.data;
          setJob(jobData);
          
          // Initialize form control states
          setLocation(jobData.location || '');
          setHasDeadline(jobData.hasDeadline || false);
          setDeadline(jobData.deadline ? new Date(jobData.deadline) : undefined);
          
          // Set form values
          Object.keys(jobData).forEach(key => {
            if (key in jobData) {
              setValue(key as keyof JobFormData, jobData[key as keyof JobFormData]);
            }
          });
        }
      } catch (err) {
        setError('Failed to fetch job details');
        if (process.env.NODE_ENV === 'development') {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, setValue]);

  const onSubmit = async (data: JobFormData) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/job/updatejob/${id}`,
        data
      );
  
      // This only runs if status is 200-299
      if (response.data.success) {
        toast.success("Job updated successfully");
        router.push("/employer/dashboard/jobs");
      }
    } catch (error: any) {
      // Extract status code and message
      const status = error.response?.status;
      const message = error.response?.data?.message;
  
      // Handle different error codes
      if (status === 400) {
        toast.error(message || "Validation Error: Could not update job");
      } else if (status === 500) {
        toast.error("Internal Server Error. Please try again later.");
      } else {
        toast.error("Failed to update job");
      }
  
      // Optional: Log detailed error only in dev
      if (process.env.NODE_ENV === "development") {
        console.error("Error updating job:", error);
      }
    }
  };
  

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/job/deletejob/${id}`);
      if (response.data.success) {
        toast.success('Job deleted successfully');
        router.push('/employer/dashboard/jobs');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete job');
      if (process.env.NODE_ENV === 'development') {
        console.error('Error deleting job:', error);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading job details...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!job) {
    return <div className="flex justify-center items-center h-screen">Job not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8 flex justify-between">
        <div>
        <h1 className="text-3xl font-bold mb-2">Update Job Posting</h1>
        <p className="text-gray-600">Edit the details of your job posting below</p>
        </div>
        <Button onClick={() => handleDelete()} className='gap-2'>
          <Trash className="mr-2 h-4 w-4" />
          Delete Job</Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <JobDetailsForm 
          register={register} 
          errors={errors} 
          setValue={setValue}
          watch={watch}
          control={control}
          location={location}
          setLocation={setLocation}
          hasDeadline={hasDeadline}
          setHasDeadline={setHasDeadline}
          deadline={deadline}
          setDeadline={setDeadline}
          department={job?.department}
          type={job?.type}
          experience={job?.experience}
          salaryMin={job?.salaryMin}
          salaryMax={job?.salaryMax}
        />
        
        <JobRequirementsForm 
          register={register} 
          errors={errors} 
          setValue={setValue}
          watch={watch}
        />
        
        <div className="flex justify-end gap-4 pt-6">
          <button 
            type="button" 
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateJob;