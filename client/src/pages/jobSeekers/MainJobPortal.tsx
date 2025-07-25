"use client";
import React from 'react'
import WelcomeBanner from './WelcomeBanner'
import StatsCards from './StatsCard'
import { categoriesData, jobsData, statsData, recentActivityData, sampleJobPosts, reommendedjobsData } from '@/data/mockData'
import BrowseOpportunities from './BrowseOpportunities'
import HowItWorks from './HowItWorks'
import RecommendedJobs from './JobSection';
import RecentJobPosts from './Recent';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';

const JobPortal = () => {

  const router = useRouter();
  const isProfileComplete = true; // Set to true when the user completes their profile

  return (
    <div className='w-full h-full max-w-7xl mx-auto py-8 overflow-hidden'>
      <div className='w-full h-full grid grid-cols-3 gap-6'>
        <div className='col-span-2 space-y-6'>
          <WelcomeBanner userName={localStorage.getItem('fullname')} platformName="Dreamroad" />
          <StatsCards stats={statsData} />

          <BrowseOpportunities 
            onJobClick={(jobId) => router.push(`/job/${jobId}`)}
          />

          <div className="relative ">
            <div className={isProfileComplete ? "" : "pointer-events-none rounded-xl filter blur-sm select-none"}>
              <RecommendedJobs
              onJobClick={(jobId : any) => router.push(`/job/${jobId}`)}
              />
            </div>

            {!isProfileComplete && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-10">
                <div className="text-lg font-semibold mb-2">Complete your profile to view recommended jobs</div>
                <Button variant={'custom'}>
                <Icon icon="game-icons:pointing" />
                  Complete Profile
                </Button>
              </div>
            )}
          </div>



        </div>
        <div className="space-y-6">
          {/* How It Works */}
          <HowItWorks />

          {/* Recent Earners */}
          <RecentJobPosts jobPosts={sampleJobPosts} />

          {/* Recent Activity */}
          {/* <RecentActivity activities={recentActivityData} /> */}
        </div>
      </div>
    </div>
  )
}

export default JobPortal