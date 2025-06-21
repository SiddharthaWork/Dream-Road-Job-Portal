import React from 'react'
import JobSeekersNavbar from '@/components/shared/JobSeekersNavbar';
export default function JobSeekersLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
    <JobSeekersNavbar/>
            {children}
        </div>
    );
}