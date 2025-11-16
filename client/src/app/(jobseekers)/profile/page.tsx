"use client"
import CompleteProfilePage from '@/pages/jobSeekers/Profile/CompleteProfilePage'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()

  useEffect(() => {
    const profile = localStorage.getItem('profile')
    console.log('Profile status:', profile)
    
    if (profile === "true") {
      router.push("/")
    }
  }, [router])

  return (
    <div>
        <CompleteProfilePage/>
    </div>
  )
}

export default page