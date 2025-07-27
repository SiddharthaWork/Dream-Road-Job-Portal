import React from 'react'
import Footer from '@/components/shared/Footer';
import DashboardLayout from '@/components/DashboardLayout';
import { AppProvider } from '@/contexts/AppContext';
import { Toaster } from 'react-hot-toast';
import AdminBlockWrapper from '@/components/shared/AdminBlockWrapper';

export default function EmployerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AdminBlockWrapper>
            <AppProvider>
                <Toaster position="top-center" />
                <DashboardLayout>
                    {children}
                </DashboardLayout>
            </AppProvider>
        </AdminBlockWrapper>
    );
}