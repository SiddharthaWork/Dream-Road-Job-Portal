'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/admin/header';
import { ThemeProvider } from 'next-themes';
import { Sidebar } from '@/components/admin/adminsidebar';
import { useRouter } from 'next/navigation';
// Mock user data
const mockUser = {
  id: '1',
  email: 'admin@dreamroad.com',
  name: 'Admin User',
  role: 'super_admin' as const
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    console.log('Logout clicked');
    router.push('/adminlogin');
    // Mock logout - just log to console
  };

  // Don't show admin layout for login page
  if (pathname === '/admin/login') {
    return <ThemeProvider attribute="class" defaultTheme="light">{children}</ThemeProvider>;
  }

  return (
      <div className="min-h-screen bg-gray-50/50 flex ">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="w-full">
          <Header 
            user={mockUser} 
            onMenuClick={() => setSidebarOpen(true)}
            onLogout={handleLogout}
          />
          
          <main className="p-6">
            <div className="w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
  );
}