'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Briefcase, PlusCircle, Users, User } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/employer/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Job Posts',
    url: '/employer/dashboard/jobs',
    icon: Briefcase,
  },
  {
    title: 'Post a Job',
    url: '/employer/dashboard/post-job',
    icon: PlusCircle,
  },
  {
    title: 'Applicants',
    url: '/employer/dashboard/applicants',
    icon: Users,
  },
  {
    title: 'Company Profile',
    url: '/employer/dashboard/company',
    icon: User,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => {
    if (path === '/employer/dashboard') {
      return pathname === '/employer/dashboard';
    }
    return pathname?.startsWith(path) || false;
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className='w-4 h-2 md:w-10 md:h-10 rounded-lg bg-[#255cf4] overflow-hidden'>
            <img src="/dreamroad.svg" alt="Dream Road" className="w-full h-full object-cover" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 ">DreamRoad</h2>
              <p className="text-sm text-gray-500">Recruiter Portal</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className="w-full"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
