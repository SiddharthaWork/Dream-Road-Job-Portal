'use client';
import { useEffect, useState } from 'react';
import Block from './Block';

export default function AdminBlockWrapper({ children }: { children: React.ReactNode }) {
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);

  useEffect(() => {
    const checkBlockStatus = async () => {
      if (typeof window === 'undefined') {
        setIsBlocked(false);
        return;
      }
      const companyId = localStorage.getItem('companyId');
      if (!companyId) {
        setIsBlocked(false);
        return;
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/checkBlockCompany/${companyId}`);
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
  }, []);

  if (isBlocked === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isBlocked) {
    return <Block />;
  }

  return <>{children}</>;
}
