"use client"
import Register from '@/pages/login/Register'
import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@/components/shared/loading'

const page = () => {
  const router = useRouter();
     const [isChecking, setIsChecking] = useState(true); // to prevent early render
   
     useEffect(() => {
       // Only runs on client
       const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
       
       if (isLoggedIn) {
         router.push('/');
       } else {
         setIsChecking(false); // only show login if not logged in
       }
     }, [router]);
   
     if (isChecking) return <Loading/>; 
  return (
    <div>
        <Register/>
    </div>
  )
}

export default page