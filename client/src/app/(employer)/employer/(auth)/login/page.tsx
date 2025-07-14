"use client";

import Loading from '@/components/shared/loading';
import Login from '@/pages/employer/employerAuth/login';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
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

  return <Login />;
};

export default Page;
