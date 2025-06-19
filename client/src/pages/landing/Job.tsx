import React from 'react'
import JobSearch from './Jobsearch'
import JobListingsDemo from './JobFetch'

const Job = () => {
  return (
    <div className='relative w-full h-screen overflow-hidden'>
        <JobSearch/>
        <JobListingsDemo/>
    </div>
  )
}

export default Job