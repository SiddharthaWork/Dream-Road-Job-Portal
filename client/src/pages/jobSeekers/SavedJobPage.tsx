"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect } from 'react';  
import JobCard from './JobCard';

const SavedJobPage = () => {
    const [savedJobs, setSavedJobs] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();
    const userId = localStorage.getItem('userId');
    const onJobClick = (jobId: string) => {
        router.push(`/job/${jobId}`);
    };
    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:4000/api/job/getsavedjob/${userId}`);
                if (response.data.success) {
                    setSavedJobs(response.data.data);
                } else {
                    setError('Failed to fetch saved jobs');
                }
            } catch (err) {
                setError('An error occurred while fetching saved jobs');
            } finally {
                setLoading(false);
            }
        };
        fetchSavedJobs();
    }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-42">
        <div className="mb-12">
          <h1 className="text-xl font-bold text-gray-900 sm:text-xl">Saved Jobs</h1>
          <p className="mt-3 text-lg text-gray-500">Your curated list of saved opportunities</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : savedJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">You haven't saved any jobs yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {savedJobs.map((job: any) => (
              <JobCard
                key={job._id}
                job={job}
                onJobClick={() => onJobClick(job._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedJobPage