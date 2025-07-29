"use client";

import Landing from "@/pages/landing/Landing";
import JobSeekers from "./(jobseekers)/page";
import { useEffect, useState } from "react";
import Loading from "../components/shared/loading";
import MainDashboardPage from "./(employer)/employer/(dashboard)/dashboard/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    // This code runs only on the client
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // so here lets validate if the role is user than redirect to jobseekers page else redirect to employer page
    const storedRole = localStorage.getItem('role') || '';
    setIsLoggedIn(storedIsLoggedIn);
    setRole(storedRole);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    
    if (isLoggedIn && role === 'company') {
      router.push('/employer/dashboard');
    }
    if (isLoggedIn && role === 'admin') {
      router.push('/admin/dashboard');
    }
  }, [isLoggedIn, role, isLoading, router]);
  
  if (isLoading) {
    return <div><Loading /></div>;
  }
  console.log(role)

  return (
    <>
      {isLoggedIn && role === 'user' ? <JobSeekers /> : !isLoggedIn ? <Landing /> : null}
    </>
  );
}