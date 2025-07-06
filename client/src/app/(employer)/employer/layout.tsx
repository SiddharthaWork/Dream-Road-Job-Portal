import React from 'react'
import { AppProvider } from '@/contexts/AppContext';
import { Toaster } from 'react-hot-toast';

export default function EmployerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AppProvider>
              <Toaster position="top-center"   />
          {children}
        </AppProvider>
    );
}