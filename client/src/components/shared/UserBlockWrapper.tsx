'use client';
import { useEffect, useState } from 'react';
import UserBlock from './UserBlock';
import { usePathname } from 'next/navigation';

export default function UserBlockWrapper({ children }: { children: React.ReactNode }) {
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);
  const pathname = usePathname();
  const publicRoutes = ['/login', '/register', '/employer/login'];

  useEffect(() => {
    const checkBlockStatus = async () => {
      if (typeof window === 'undefined') {
        setIsBlocked(false);
        return;
      }
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setIsBlocked(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:4000/api/admin/checkBlockUser/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch block status');
        }
        const data = await response.json();
        if (data.success) {
          setIsBlocked(data.data);
        } else {
          setIsBlocked(false);
        }
      } catch (error) {
        console.error('Error checking block status:', error);
        setIsBlocked(false);
      }
    };
    
    checkBlockStatus();
    setIsBlocked(false);
  }, []);

  if (isBlocked === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isBlocked && pathname && !publicRoutes.includes(pathname)) {
    return <UserBlock />;
  }

  return <>{children}</>;
}
