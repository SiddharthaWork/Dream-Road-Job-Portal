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

// Mock data arrays for easy backend integration
const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    industry: "Technology",
    experienceLevel: "Senior",
    salaryMin: 120000,
    salaryMax: 150000,
    description:
      "Join our dynamic team to build cutting-edge web applications using React, TypeScript, and modern development practices.",
    postedDate: "2 days ago",
    rating: 4.5,
    logo: "TC",
    featured: true,
    skills: ["React", "TypeScript", "Node.js"],
    benefits: ["Health Insurance", "401k", "Remote Work"],
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLabs",
    location: "New York, NY",
    type: "Full-time",
    industry: "Technology",
    experienceLevel: "Mid-level",
    salaryMin: 100000,
    salaryMax: 130000,
    description:
      "Lead product strategy and development for our flagship SaaS platform. Work closely with engineering and design teams.",
    postedDate: "1 day ago",
    rating: 4.2,
    logo: "IL",
    featured: false,
    skills: ["Product Strategy", "Agile", "Analytics"],
    benefits: ["Health Insurance", "Stock Options", "Flexible Hours"],
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignStudio Pro",
    location: "Remote",
    type: "Contract",
    industry: "Design",
    experienceLevel: "Mid-level",
    salaryMin: 80000,
    salaryMax: 100000,
    description:
      "Create intuitive and beautiful user experiences for mobile and web applications. Strong portfolio required.",
    postedDate: "3 days ago",
    rating: 4.7,
    logo: "DS",
    featured: true,
    skills: ["Figma", "Sketch", "Prototyping"],
    benefits: ["Flexible Schedule", "Creative Freedom"],
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Analytics Plus",
    location: "Austin, TX",
    type: "Full-time",
    industry: "Technology",
    experienceLevel: "Senior",
    salaryMin: 110000,
    salaryMax: 140000,
    description:
      "Analyze complex datasets and build machine learning models to drive business insights and decision-making.",
    postedDate: "1 week ago",
    rating: 4.3,
    logo: "AP",
    featured: false,
    skills: ["Python", "Machine Learning", "SQL"],
    benefits: ["Health Insurance", "Learning Budget", "Gym Membership"],
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "BrandBoost Agency",
    location: "Los Angeles, CA",
    type: "Part-time",
    industry: "Marketing",
    experienceLevel: "Entry-level",
    salaryMin: 50000,
    salaryMax: 65000,
    description:
      "Develop and execute marketing campaigns across digital channels. Experience with social media and content marketing preferred.",
    postedDate: "4 days ago",
    rating: 4.0,
    logo: "BB",
    featured: false,
    skills: ["Social Media", "Content Marketing", "Analytics"],
    benefits: ["Flexible Hours", "Creative Environment"],
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "CloudTech Systems",
    location: "Seattle, WA",
    type: "Full-time",
    industry: "Technology",
    experienceLevel: "Senior",
    salaryMin: 130000,
    salaryMax: 160000,
    description:
      "Manage cloud infrastructure and CI/CD pipelines. Experience with AWS, Docker, and Kubernetes required.",
    postedDate: "5 days ago",
    rating: 4.6,
    logo: "CT",
    featured: true,
    skills: ["AWS", "Docker", "Kubernetes"],
    benefits: ["Health Insurance", "Stock Options", "Remote Work"],
  },
  {
    id: 7,
    title: "Junior Software Developer",
    company: "StartupTech Inc",
    location: "Boston, MA",
    type: "Full-time",
    industry: "Technology",
    experienceLevel: "Entry-level",
    salaryMin: 70000,
    salaryMax: 85000,
    description:
      "Join our growing team to develop innovative software solutions. Great opportunity for recent graduates to learn and grow.",
    postedDate: "6 days ago",
    rating: 4.1,
    logo: "ST",
    featured: false,
    skills: ["JavaScript", "Python", "Git"],
    benefits: ["Mentorship Program", "Learning Budget", "Health Insurance"],
  },
  {
    id: 8,
    title: "Sales Manager",
    company: "SalesForce Pro",
    location: "Chicago, IL",
    type: "Full-time",
    industry: "Sales",
    experienceLevel: "Senior",
    salaryMin: 90000,
    salaryMax: 120000,
    description:
      "Lead and manage a team of sales representatives. Drive revenue growth and develop strategic partnerships.",
    postedDate: "1 week ago",
    rating: 4.4,
    logo: "SF",
    featured: false,
    skills: ["Team Leadership", "CRM", "Negotiation"],
    benefits: ["Commission", "Car Allowance", "Health Insurance"],
  },
]

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
                      <span>${salaryRange[0].toLocaleString()}</span>
                      <span>${salaryRange[1].toLocaleString()}</span>
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
                <h2 className="text-2xl font-bold text-gray-900">{filteredJobs.length} Jobs Found</h2>
                <p className="text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
                  {Math.min(currentPage * itemsPerPage, filteredJobs.length)} of {filteredJobs.length} results
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
