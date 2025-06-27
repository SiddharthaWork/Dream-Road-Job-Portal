"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, Briefcase, Building2, ChevronDown, Filter, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import JobSearch from "@/components/shared/Jobsearch"
import { jobsData } from "@/data/mockData"
import JobCardTable from "@/components/shared/JobCard"
import { div } from "motion/react-client"
import { Job } from "@/types/_type-Job"

// Map jobsData to match the jobListings structure
const jobListings = jobsData.map((job) => ({
  id: job.id,
  title: job.title,
  company: job.company,
  location: job.location,
  type: job.type,
  industry: "Technology", // Default or map if available
  experienceLevel: "Mid-level", // Default or map if available
  salaryMin: parseInt(job.salary.replace(/[^\d]/g, "").split("–")[0]) || 0,
  salaryMax: parseInt(job.salary.replace(/[^\d]/g, "").split("–")[1]) || 0,
  description: `${job.title} at ${job.company} in ${job.location}`,
  postedDate: job.dueDate || "1 day ago",
  rating: 4.2, // Default or map if available
  logo: job.company[0], // Use first letter of company as logo fallback
  featured: false, // Default or map if available
  skills: [job.title], // Use job title as a skill, or map if available
  benefits: [], // Default empty array
  companyLogo: job.companyLogo, // Add for use in JobCardTable if needed
  applicants: job.applicants, // Default or map if available
}))

const locations = [
  "All Locations",
  "San Francisco, CA",
  "New York, NY",
  "Remote",
  "Austin, TX",
  "Los Angeles, CA",
  "Seattle, WA",
]
const employmentTypes = ["All Types", "Full-time", "Part-time", "Contract", "Internship"]
const industries = ["All Industries", "Technology", "Design", "Marketing", "Finance", "Healthcare", "Education"]
const experienceLevels = ["All Levels", "Entry-level", "Mid-level", "Senior", "Executive"]

export default function SearchJob() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState("All Levels")
  const [salaryRange, setSalaryRange] = useState([0, 200000])
  const [showRemoteOnly, setShowRemoteOnly] = useState(false)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [showRecentOnly, setShowRecentOnly] = useState(false)

  const itemsPerPage = 4
  const totalPages = Math.ceil(jobListings.length / itemsPerPage)

  // Filter jobs based on search and filters
  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesLocation = selectedLocation === "All Locations" || job.location === selectedLocation
    const matchesType = selectedType === "All Types" || job.type === selectedType
    const matchesIndustry = selectedIndustry === "All Industries" || job.industry === selectedIndustry
    const matchesExperience = selectedExperience === "All Levels" || job.experienceLevel === selectedExperience
    const matchesSalary = job.salaryMin >= salaryRange[0] && job.salaryMax <= salaryRange[1]
    const matchesRemote = !showRemoteOnly || job.location.toLowerCase().includes("remote")
    const matchesFeatured = !showFeaturedOnly || job.featured
    const matchesRecent = !showRecentOnly || job.postedDate.includes("day") || job.postedDate.includes("1 week")

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesIndustry &&
      matchesExperience &&
      matchesSalary &&
      matchesRemote &&
      matchesFeatured &&
      matchesRecent
    )
  })

  // Paginate filtered results
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // Reset to first page when searching
  }

  return (
    <div className="min-h-[100vh] bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg  text-white py-4 ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 ">Find Your Dream Job</h1>
            <p className="text-lg opacity-90">Find opportunities that match your skills and aspirations</p>

            {/* Search Bar */}
            <JobSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedExperience={selectedExperience}
              setSelectedExperience={setSelectedExperience}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="lg:hidden mb-4">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown className="h-4 w-4 ml-auto" />
              </Button>
            </div>

            <Card className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <CardHeader>
                <h3 className="text-lg font-semibold">Filter Jobs</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Location
                  </label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Employment Type Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <Briefcase className="h-4 w-4 inline mr-1" />
                    Employment Type
                  </label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {employmentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Industry Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <Building2 className="h-4 w-4 inline mr-1" />
                    Industry
                  </label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience Level Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <Briefcase className="h-4 w-4 inline mr-1" />
                    Experience Level
                  </label>
                  <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Salary Range Filter */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Salary Range</label>
                  <div className="px-2">
                    <Slider
                      value={salaryRange}
                      onValueChange={setSalaryRange}
                      max={200000}
                      min={0}
                      step={5000}
                      className="mb-3"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{salaryRange[0].toLocaleString()}</span>
                      <span>{salaryRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Quick Filters */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Quick Filters</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remote" checked={showRemoteOnly}  />
                      <label htmlFor="remote" className="text-sm">
                        Remote Only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="featured" checked={showFeaturedOnly}  />
                      <label htmlFor="featured" className="text-sm">
                        Featured Jobs
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="recent" checked={showRecentOnly} />
                      <label htmlFor="recent" className="text-sm">
                        Posted This Week
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="flex-1 ">
            <div className="flex justify-between items-center mb-6">
              <div>
                {/* <h2 className="text-2xl font-bold text-gray-900">{filteredJobs.length} Jobs Found</h2> */}
                <h2 className="text-2xl font-bold text-gray-900">16 Jobs Found</h2>
                <p className="text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
                  {Math.min(currentPage * itemsPerPage, filteredJobs.length)} of 16 results
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Sort by: Relevance
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Relevance</DropdownMenuItem>
                  <DropdownMenuItem>Date Posted</DropdownMenuItem>
                  <DropdownMenuItem>Salary (High to Low)</DropdownMenuItem>
                  <DropdownMenuItem>Company Rating</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Job Cards */}
            <div className="flex flex-col gap-4">
              {paginatedJobs.map((job) => (
                <JobCardTable key={job.id} job={job as unknown as Job} />
              ))}
            </div>
           
            {/* Pagination */}
            {/* {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                >
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  )
}
