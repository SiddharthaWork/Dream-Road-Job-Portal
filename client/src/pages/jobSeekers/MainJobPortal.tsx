"use client";
import React from 'react'
import WelcomeBanner from './WelcomeBanner'
import StatsCards from './StatsCard'
import { categoriesData,  jobsData, statsData,recentActivityData, sampleJobPosts } from '@/data/mockData'
import BrowseOpportunities from './BrowseOpportunities'
import HowItWorks from './HowItWorks'
import RecentActivity from './RecentActivity'
import RecommendedJobs from './JobSection';
import RecentJobPosts from './Recent';

const JobPortal = () => {

  return (
    <div className='w-full h-full max-w-7xl mx-auto py-8 overflow-hidden'>
      <div className='w-full h-full grid grid-cols-3 gap-6'>
        <div className='col-span-2 space-y-6'>
          <WelcomeBanner userName="Siddhartha Shrestha" platformName="Dreamroad" />
          <StatsCards stats={statsData} />          

          <BrowseOpportunities
            jobs={jobsData}
            categories={categoriesData}
          />
          <RecommendedJobs
            jobs={jobsData}
            categories={categoriesData}
          />     


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