import JobPortal from '@/pages/jobSeekers/MainJobPortal'
import JobSeekersNavbar from '@/components/shared/JobSeekersNavbar'
import React from 'react'
import Footer from '@/components/shared/Footer'

const JobSeekers = () => {
  return (
    <>
    <JobSeekersNavbar/>
    <div className='bg-[#f8f9fa]'>
    <JobPortal/>
    </div>
    </>
)
}

export default JobSeekers