'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState('');
  // wrap inside the useEffect
  useEffect(() => {
    const companyName = localStorage.getItem('companyName') || 'Company';
    setCompanyName(companyName);
    // const companyEmail = localStorage.getItem('companyEmail') || '';
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('company_auth');
    localStorage.removeItem('company_email');
    localStorage.removeItem('companyName');
    localStorage.removeItem('company_data');
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    router.push('/employer/login');
  };

  const getPageTitle = () => {
        const path = pathname;
    switch (path) {
      case '/employer/dashboard':
        return 'Dashboard';
      case '/employer/dashboard/jobs':
        return 'Job Posts';
      case '/employer/dashboard/post-job':
        return 'Post a Job';
      case '/employer/dashboard/applicants':
        return 'Applicants';
      case '/employer/dashboard/company':
        return 'Company Profile';
      default:
        return 'Dashboard';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-semibold text-gray-900">{getPageTitle()}</h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {companyName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">{companyName}</p>
                    {/* <p className="text-xs text-gray-500">{companyEmail}</p> */}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
