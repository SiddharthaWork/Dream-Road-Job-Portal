import React from 'react'
import SearchJob from './SearchJob'
import { div } from 'motion/react-client'

const JobSearchPage = () => {
  return (
    <div className='bg-[#f8f9fa]'>
    <div className='w-full h-full overflow-hidden max-w-7xl mx-auto py-6'>
      <SearchJob/>
    </div>
    </div>
  )
}

export default JobSearchPage