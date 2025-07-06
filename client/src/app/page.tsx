"use client";

import Landing from "@/pages/landing/Landing";
import JobSeekers from "./(jobseekers)/page";
import { useEffect, useState } from "react";
import Loading from "../components/shared/loading";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This code runs only on the client
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedRole = localStorage.getItem('role') || '';
    setIsLoggedIn(storedIsLoggedIn);
    setRole(storedRole);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div><Loading /></div>;
  }

  return (
    <>
      {isLoggedIn && role === 'user' ? <JobSeekers /> : <Landing />}
    </>
  );
}