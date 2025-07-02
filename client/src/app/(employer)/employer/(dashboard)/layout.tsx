import React from 'react'
import Footer from '@/components/shared/Footer';
import DashboardLayout from '@/components/DashboardLayout';
import { AppProvider } from '@/contexts/AppContext';

export default function EmployerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AppProvider>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </AppProvider>
    );
}