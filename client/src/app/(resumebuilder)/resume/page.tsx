import React from 'react'
import ResumeBuilder from '@/pages/resume/ResumeBuilder'
import JobSeekersNavbar from '@/components/shared/JobSeekersNavbar'

const page = () => {
  return (
    <div>
        <JobSeekersNavbar/>
        <ResumeBuilder />
    </div>
  )
}

export default page