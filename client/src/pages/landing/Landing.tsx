import React from 'react'
import Navbar from '@/components/shared/Navbar'
import Hero from './Hero'
import Job from './Job'
import JobPortalSection from './Job-Portal-About'
import Gloat from './Gloat'
import Footer from '@/components/shared/Footer'
const Landing = () => {
  return (
    <div className='overflow-hidden'>
    <Hero/>
    <Job/>
    <JobPortalSection/>
    <Gloat/>
    </div>
  )
}

export default Landing