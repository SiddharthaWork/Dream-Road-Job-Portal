"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import CategoryFilter from "./CategoryFilter"
import JobCard from "./JobCard"

interface Job {
  id: number
  title: string
  company: string
  companyLogo: string
  logoColors: string
  type: string
  typeColor: string
  dueDate: string
  location: string
  applicants: number
  salary: string
  salaryType: string
}

interface Category {
  id: number
  name: string
  active: boolean
}

interface BrowseOpportunitiesProps {
  jobs: Job[]
  categories: Category[]
  onCategoryChange?: (categoryId: number) => void
  onJobClick?: (jobId: number) => void
  onViewAll?: () => void
}

export default function BrowseOpportunities({
  jobs,
  categories,
  onCategoryChange,
  onJobClick,
  onViewAll,
}: BrowseOpportunitiesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Browse Opportunities</h2>
        <CategoryFilter categories={categories} onCategoryChange={onCategoryChange} />
      </div>

      <div className="space-y-3">
        {(jobs || []).map((job) => (
          <JobCard key={job.id} job={job} onJobClick={onJobClick} />
        ))}
      </div>

      <Button variant="outline" className="w-full bg-white text-black" onClick={onViewAll}>
        View All
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
