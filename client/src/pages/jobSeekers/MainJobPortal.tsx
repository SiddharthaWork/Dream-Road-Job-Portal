"use client";
import React from 'react'
import WelcomeBanner from './WelcomeBanner'
import StatsCards from './StatsCard'
import { categoriesData, grantCategoriesData, grantsData, jobsData, statsData,recentActivityData, recentEarnersData } from '@/data/mockData'
import BrowseOpportunities from './BrowseOpportunities'
import JobSection from './JobSection'
import HowItWorks from './HowItWorks'
import RecentEarners from './Recent'
import RecentActivity from './RecentActivity'
import JobCard from './JobCard';
import JobListingsDemo from '../landing/JobFetch';
import RecommendedJobs from './JobSection';

const JobPortal = () => {
  const handleCategoryChange = (categoryId: number) => {
    console.log("Category changed:", categoryId)
    // Implement category filtering logic
  }

  const handleJobClick = (jobId: number) => {
    console.log("Job clicked:", jobId)
    // Navigate to job details or open modal
  }

  const handleGrantClick = (grantId: number) => {
    console.log("Grant clicked:", grantId)
    // Navigate to grant details or open modal
  }

  const handleViewAll = () => {
    console.log("View all jobs clicked")
    // Navigate to jobs listing page
  }

  const handleViewLeaderboard = () => {
    console.log("View leaderboard clicked")
    // Navigate to leaderboard page
  }

  const handleViewAllActivity = () => {
    console.log("View all activity clicked")
    // Navigate to activity feed page
  }

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
            <RecentEarners earners={recentEarnersData} onViewLeaderboard={handleViewLeaderboard}  />

            {/* Recent Activity */}
            <RecentActivity activities={recentActivityData} />
          </div>
      </div>
    </div>
  )
}

export default JobPortal