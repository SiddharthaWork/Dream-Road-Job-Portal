'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  BarChart3,
  Users,
  Building2,
  BriefcaseIcon,
  MessageSquare,
  Settings,
  X,
  ChevronRight,
  Home,
  UserCheck,
  FileText,
  Shield
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: Home,
    description: 'Overview & Analytics'
  },
  {
    name: 'Companies',
    href: '/admin/companies',
    icon: Building2,
    description: 'Company Management'
    // submenu: [
    //   { name: 'All Companies', href: '/admin/companies' },
    //   { name: 'Pending Review', href: '/admin/companies/pending' },
    //   { name: 'Verified', href: '/admin/companies/verified' }
    // ]
  },
  {
    name: 'Jobseekers',
    href: '/admin/jobseekers',
    icon: Users,
    description: 'User Management',
    // submenu: [
    //   { name: 'All Users', href: '/admin/jobseekers' },
    //   // { name: 'Verification', href: '/admin/jobseekers/verification' },
    //   // { name: 'Reports', href: '/admin/jobseekers/reports' }
    // ]
  },
  {
    name: 'Jobs',
    href: '/admin/jobs',
    icon: BriefcaseIcon,
    description: 'Job Management',
    // submenu: [
    //   { name: 'All Jobs', href: '/admin/jobs' },
    //   // { name: 'Pending Approval', href: '/admin/jobs/pending' },
    //   // { name: 'Categories', href: '/admin/jobs/categories' }
    // ]
  },
  // {
  //   name: 'Complaints',
  //   href: '/admin/complaints',
  //   icon: MessageSquare,
  //   description: 'Support & Issues',
  //   submenu: [
  //     { name: 'Open Tickets', href: '/admin/complaints' },
  //     { name: 'Resolved', href: '/admin/complaints/resolved' },
  //     { name: 'High Priority', href: '/admin/complaints/priority' }
  //   ]
  // }
];

// const bottomNavigation = [
//   {
//     name: 'Settings',
//     href: '/admin/settings',
//     icon: Settings,
//     description: 'System Configuration'
//   }
// ];

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const isActive = (href: string) => {
    if (!pathname) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isExpanded = (name: string) => expandedItems.includes(name);

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg w-10 h-10">
                <img src="/dreamroad.svg" alt="" className="w-full h-full object-contain" />
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">DreamRoad</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {/* {item.submenu ? (
                    <>
                      <Button
                        variant="ghost"
                        className={cn(
                          'w-full justify-between h-auto p-3 text-left',
                          isActive(item.href) && 'bg-blue-50 text-blue-700'
                        )}
                        onClick={() => toggleExpanded(item.name)}
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-3 h-5 w-5 shrink-0" />
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </div>
                        <ChevronRight 
                          className={cn(
                            'h-4 w-4 transition-transform',
                            isExpanded(item.name) && 'rotate-90'
                          )} 
                        />
                      </Button>
                      
                      {isExpanded(item.name) && (
                        <div className="ml-8 mt-1 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={onClose}
                              className={cn(
                                'block px-3 py-2 text-sm rounded-md transition-colors',
                                isActive(subItem.href)
                                  ? 'bg-blue-100 text-blue-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              )}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : ( */}
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center p-3 rounded-lg transition-colors',
                        isActive(item.href)
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5 shrink-0" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </Link>
                </div>
              ))}
            </nav>

            {/* <Separator className="my-4" /> */}
{/* 
            <nav className="space-y-1">
              {bottomNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center p-3 rounded-lg transition-colors',
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5 shrink-0" />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              ))}
            </nav> */}
          </ScrollArea>
        </div>
      </div>
    </>
  );
}