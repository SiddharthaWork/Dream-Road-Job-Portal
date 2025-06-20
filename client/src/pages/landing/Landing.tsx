import React from 'react'
import Hero from './Hero'
import Job from './Job'
import JobPortalSection from './Job-Portal-About'
import Gloat from './Gloat'
import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
const Landing = () => {
  return (
    <>
    <Navbar/>
    <div className='overflow-hidden'>
    <Hero/>
    <Job/>
    <JobPortalSection/>
    <Gloat/>
    <Footer/>
    </div>
    </>
  )
}

export default Landing