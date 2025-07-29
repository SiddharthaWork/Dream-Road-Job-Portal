'use client';
import JobPortal from '@/pages/jobSeekers/MainJobPortal';
import JobSeekersNavbar from '@/components/shared/JobSeekersNavbar';
import React from 'react';
import UserBlockWrapper from '@/components/shared/UserBlockWrapper';

const JobSeekers = () => {
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