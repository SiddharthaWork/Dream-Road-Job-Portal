'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Bell, Mail, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from 'axios';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from '@/components/ui/dropdown-menu';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [deletedJobs, setDeletedJobs] = useState<string[]>([]);

  useEffect(() => {
    const companyName = localStorage.getItem('companyName') || 'Company';
    setCompanyName(companyName);
  }, []);

  useEffect(() => {
    
  const fetchDeletedJobs = async () => {
    const companyId = localStorage.getItem('companyId');
    if (!companyId) return;
    try {
      const response = await axios.get(`http://localhost:4000/api/company/getdeletedjobs/${companyId}`);
      if (response.data.success) {
        setDeletedJobs(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching deleted jobs:', error);
    }
  };
  fetchDeletedJobs(); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('company_auth');
    localStorage.removeItem('company_email');
    localStorage.removeItem('companyName');
    localStorage.removeItem('company_data');
    localStorage.removeItem('companyId');
    localStorage.removeItem('role');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    // remove cookies too
    document.cookie.split(";").forEach(function (cookie) {
      document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
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
                <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <Badge 
                        variant="destructive"
                        className="absolute -top-1 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
                      >
                        {deletedJobs.length}
                      </Badge>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Notifications</h3>
                      {deletedJobs.length === 0 ? (
                        <p className="text-sm">No notifications yet.</p>
                      ) : (
                        <div className="space-y-2">
                          {deletedJobs.map((job, index) => (
                            <div key={index} className="text-sm p-2 bg-red-100 rounded">
                              <p className="font-medium">{job}</p>
                              <p className="text-xs text-gray-600">This job has been deleted by Dream Road due to some violation. <br /> <span className="text-blue-600 cursor-pointer">Contact Support <Mail className="h-4 w-4" />dreamroad@dr.com</span></p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-3 cursor-pointer">
                      <div className="hidden md:block">
                        <p className="text-sm font-medium">{companyName}</p>
                      </div>
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {companyName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48" align="end">
                  <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-1 mt-1">
                  <Shield className="h-3 w-3" />
                  <Badge variant="secondary" className="text-xs">
                    Company
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      <span className="text-red-400">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
