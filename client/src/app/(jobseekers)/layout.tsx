import React from 'react'
import JobSeekersNavbar from '@/components/shared/JobSeekersNavbar';
import { Toaster } from 'react-hot-toast'; // assuming Toaster is imported correctly
import { AppProvider } from '@/contexts/AppContext';
import UserBlockWrapper from '@/components/shared/UserBlockWrapper';
import { requireUser } from '@/components/auth/ServerSideAuth';

export default async function JobSeekersLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await requireUser();
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