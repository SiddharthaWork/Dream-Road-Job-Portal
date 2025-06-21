import Navbar from '@/components/shared/Navbar'
import JobPortal from '@/pages/jobSeekers/MainJobPortal'
import React from 'react'

const JobSeekers = () => {
  return (
    <>
    <Navbar/>
    <div className='bg-[#f8f9fa]'>
    <JobPortal/>
    </div>
    </>
)
}

export default JobSeekers