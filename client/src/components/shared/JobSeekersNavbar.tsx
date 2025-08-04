"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { NavDropdown } from './NavDropDown'
import { User, Settings, LogOut, Save, Bookmark } from "lucide-react"
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Badge } from '../ui/badge'

const JobSeekersNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const activePath = (path: string) => pathname === path;

  const [initials, setInitials] = useState("");
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    const fullname = localStorage.getItem("fullname");
    if (fullname) {
      setInitials(fullname.charAt(0).toUpperCase());
      setFullname(fullname);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('fullname');
    localStorage.removeItem('profile');
    router.push('/login');
  };

  const menuItems = [
    {
      label: "Profile",
      href: "/profile/5555555555",
      icon: <User className="h-4 w-4" />,
      onClick: () => router.push("/profile/" + localStorage.getItem('userId'))
    },
    {
      label: "Edit Profile",
      href: "/profile",
      icon: <Settings className="h-4 w-4" />,
      onClick: () => router.push("/profile/edit/" + localStorage.getItem('userId')),
    },
    {
      label: "Saved Jobs",
      href: "/savedjob",
      icon: <Bookmark className="h-4 w-4" />,
      onClick: () => router.push("/savedjob"),
    },
    {
      label: "Logout",
      variant: "destructive" as const,
      icon: <LogOut className="h-4 w-4" />,
      separator: true,
      onClick: () => logout(),
    },
  ];

  return (
    <div className='sticky top-0 z-50 bg-white w-full h-fit overflow-hidden'>
      <div className='w-full h-16 max-w-7xl mx-auto py-8'>
        <div className='w-full h-full flex justify-between text-white gap-10 '>
          <div className='flex items-center gap-2 w-fit'>
            <div className='w-10 h-10 rounded-lg bg-[#255cf4] overflow-hidden'>
              <Link href={"/"}>
                <img src="/dreamroad.svg" alt="" className='w-full h-full object-cover' />
              </Link>
            </div>
            <h1 className='text-2xl text-[#255cf4] uppercase font-bold'>DREAMROAD</h1>
          </div>
          <div className='flex items-center gap-4'>
            <Link href="/">
              <Button variant={'link'} className={`hover:text-[#255cf4] text-[#121224] px-0 text-[17px] tracking-tight ${activePath("/") ? "text-[#255cf4]" : ""}`}>
                Explore
              </Button>
            </Link>
            <Link href="/job">
              <Button variant={'link'} className={`hover:text-[#255cf4] text-[#121224] px-0 text-[17px] tracking-tight ${activePath("/job") ? "text-[#255cf4]" : ""}`}>
                Find Jobs
              </Button>
            </Link>
            <Link href="/company">
              <Button variant={'link'} className={`hover:text-[#255cf4] text-[#121224] px-0 text-[17px] tracking-tight ${activePath("/company") ? "text-[#255cf4]" : ""}`}>
                Companies
              </Button>
            </Link>
            <Link href="/resume">
              <Button variant={'link'} className={`relative hover:text-[#255cf4] text-[#121224] px-0 text-[17px] tracking-tight ${activePath("/resume") ? "text-[#255cf4]" : ""}`}>
                Resume
                <Badge variant="default" className="bg-[#255cf4] h-5 w-8 p-0 text-xs flex items-center justify-center ">
                  Beta
                </Badge>
              </Button>
            </Link>
          </div>

          <div className='flex items-center '>
            {/* <Bell className="w-6 h-6" color='#121224' /> */}
            <NavDropdown
              user={{
                name: fullname,
                initials: initials,
              }}
              items={menuItems}
              className='border-0 ring-0 focus:ring-0'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobSeekersNavbar;
