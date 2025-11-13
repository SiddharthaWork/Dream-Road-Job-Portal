'use client';
import JobPortal from '@/pages/jobSeekers/MainJobPortal';
import JobSeekersNavbar from '@/components/shared/JobSeekersNavbar';
import React from 'react';
import UserBlockWrapper from '@/components/shared/UserBlockWrapper';
import { useUserProtection } from '@/components/auth/ClientSideAuth';

const JobSeekers = () => {
  const { loading } = useUserProtection();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <>
    <UserBlockWrapper>
      <JobSeekersNavbar/>
      <div className='bg-[#f8f9fa]'>
        <JobPortal/>
      </div>
    </UserBlockWrapper>
    </>
  );
};

export default JobSeekers;