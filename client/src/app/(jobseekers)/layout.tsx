import React from 'react'
import JobSeekersNavbar from '@/components/shared/JobSeekersNavbar';
import { Toaster } from 'react-hot-toast'; // assuming Toaster is imported correctly
import { AppProvider } from '@/contexts/AppContext';
import UserBlockWrapper from '@/components/shared/UserBlockWrapper';

export default function JobSeekersLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AppProvider>
            <Toaster position="top-center" />
            <UserBlockWrapper>
                <div>
                    <JobSeekersNavbar/>
                    {children}
                </div>
            </UserBlockWrapper>
        </AppProvider>
    );
}