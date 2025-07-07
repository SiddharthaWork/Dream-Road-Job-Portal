"use client"

import type React from "react"
import { startOfWeek, isWithinInterval } from 'date-fns';

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
import JobCard from '@/pages/jobSeekers/JobCard';
import { div } from "motion/react-client"
import { Job } from "@/types/job"
import axios from "axios"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Loading from "@/components/shared/loading"



const employmentTypes = ["All Types", "Full-Time", "Part-Time", "Contract", "Internship"]
const industries = ["All Industries", "Technology", "Design", "Marketing", "Finance", "Healthcare", "Education"]
const experienceLevels = ["All Levels", "Entry", "Mid", "Senior", "Lead"]

export default function SearchJob() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")  
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState("All Levels")
  const [salaryRange, setSalaryRange] = useState<number[]>([0, 1000000]);
  const [showRemoteOnly, setShowRemoteOnly] = useState(false)
  const [showHighSalaryOnly, setShowHighSalaryOnly] = useState(false)
  const [showRecentOnly, setShowRecentOnly] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [sortOption, setSortOption] = useState('relevance');

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/job/getalljobs');
        if (response.data.success) {
          setJobs(response.data.data);
          console.log("here is the jobs", response.data.data)
        } else {
          setError('Failed to fetch jobs');
        }
      } catch (err) {
        setError('Failed to connect to server');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading/>
  }

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
  };

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    if (!job) return false;
    
    // Check if any filter has been changed from default
    const isFilterActive = 
      searchQuery !== "" ||
      (selectedLocation !== "" && selectedLocation !== "All Locations") ||
      selectedType !== "All Types" ||
      selectedIndustry !== "All Industries" ||
      selectedExperience !== "All Levels" ||
      selectedDepartment !== "All Departments" ||
      !(salaryRange[0] === 0 && salaryRange[1] === 1000000) ||
      showRemoteOnly ||
      showHighSalaryOnly ||
      showRecentOnly;

    // If no filters are active, show all jobs
    if (!isFilterActive) return true;
    
    const matchesSearch =
      searchQuery === "" ||
      (job.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) ?? false) ||
      (job.createdBy?.name.toLowerCase()?.includes(searchQuery.toLowerCase()) ?? false) ||
      (job.description?.toLowerCase()?.includes(searchQuery.toLowerCase()) ?? false) ||
      (job.skills?.some(skill => 
        skill?.toLowerCase()?.includes(searchQuery.toLowerCase())
      ) ?? false);

    const matchesLocation = selectedLocation === "" || selectedLocation === "All Locations" || (job.location?.toLowerCase() || "").includes(selectedLocation.toLowerCase());
    const matchesType = selectedType === "All Types" || job.type.toLowerCase() === selectedType.toLowerCase();
    const matchesIndustry = selectedIndustry === "All Industries" || job.createdBy?.industry?.toLowerCase() === selectedIndustry.toLowerCase();
    const matchesExperience = selectedExperience === "All Levels" || job.experience?.toLowerCase() === selectedExperience.toLowerCase()
    const matchesDepartment = selectedDepartment === "All Departments" || (job.department && job.department.toLowerCase() === selectedDepartment.toLowerCase());

    console.log("matchtype", matchesType)


    const matchesSalary = 
      job.salaryMin != null && 
      job.salaryMax != null &&
      job.salaryMin >= salaryRange[0] && 
      job.salaryMax <= salaryRange[1];
      
    const matchesRemote = !showRemoteOnly || 
      (job.location?.toLowerCase()?.includes("remote") ?? false);
      
    const matchesHighSalary = !showHighSalaryOnly || (job.salaryMax && job.salaryMax > 500000);
    
    const matchesRecent = !showRecentOnly || (job.createdAt && isWithinInterval(new Date(job.createdAt), { start: startOfWeek(new Date()), end: new Date() }));

    // if (!matchesSearch) console.log(`Job ${job.title} (${job._id}) filtered by search`);
    // if (!matchesLocation) console.log(`Job ${job.title} (${job._id}) filtered by location: job location '${job.location}' vs selected '${selectedLocation}'`);
    // if (!matchesType) console.log(`Job ${job.title} (${job._id}) filtered by type: job type '${job.type}' vs selected '${selectedType}'`);
    // if (!matchesIndustry) console.log(`Job ${job.title} (${job._id}) filtered by industry: job industry '${job.createdBy?.industry}' vs selected '${selectedIndustry}'`);
    // if (!matchesExperience) console.log(`Job ${job.title} (${job._id}) filtered by experience: job experience '${job.experience}' vs selected '${selectedExperience}'`);
    // if (!matchesDepartment) console.log(`Job ${job.title} (${job._id}) filtered by department: job department '${job.department}' vs selected '${selectedDepartment}'`);
    // if (!matchesSalary) console.log(`Job ${job.title} (${job._id}) filtered by salary: job salary '${job.salaryMin}-${job.salaryMax}' vs selected '${salaryRange[0]}-${salaryRange[1]}'`);
    // if (!matchesRemote) console.log(`Job ${job.title} (${job._id}) filtered by remote: job location '${job.location}' vs selected 'remote'`);
    // if (!matchesHighSalary) console.log(`Job ${job.title} (${job._id}) filtered by high salary: job salary '${job.salaryMax}' vs selected 'high salary'`);
    // if (!matchesRecent) console.log(`Job ${job.title} (${job._id}) filtered by recent: job created at '${job.createdAt}' vs selected 'recent'`);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesIndustry &&
      matchesExperience &&
      matchesDepartment &&
      matchesSalary &&
      matchesRemote &&
      matchesHighSalary &&
      matchesRecent
    );
  });

  let sortedJobs = [...filteredJobs];
  if (sortOption === 'date') {
    sortedJobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortOption === 'salary') {
    sortedJobs.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleRemoteOnlyChange = (checked: boolean) => {
    setShowRemoteOnly(checked);
  };

  const handleHighSalaryOnlyChange = (checked: boolean) => {
    setShowHighSalaryOnly(checked);
  };

  const handleRecentOnlyChange = (checked: boolean) => {
    setShowRecentOnly(checked);
  };

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

                {/* Department Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <Building2 className="h-4 w-4 inline mr-1" />
                    Department
                  </label>
                   <Select onValueChange={setSelectedDepartment}
                               value={selectedDepartment}
                               required
                               >
                               <SelectTrigger>
                                 <SelectValue placeholder="Select department" />
                               </SelectTrigger>
                               <SelectContent >
                                <SelectItem value="All Departments">All Departments</SelectItem>
                                 <SelectItem value="engineering">Engineering</SelectItem>
                                 <SelectItem value="product">Product</SelectItem>
                                 <SelectItem value="design">Design</SelectItem>
                                 <SelectItem value="marketing">Marketing</SelectItem>
                                 <SelectItem value="sales">Sales</SelectItem>
                                 <SelectItem value="hr">Human Resources</SelectItem>
                                 <SelectItem value="finance">Finance</SelectItem>
                                 <SelectItem value="operations">Operations</SelectItem>
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
                      max={1000000}
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
                      <Checkbox id="remote" checked={showRemoteOnly} onCheckedChange={(checked) => setShowRemoteOnly(Boolean(checked))} />
                      <label htmlFor="remote" className="text-sm">
                        Remote Only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="highSalary" checked={showHighSalaryOnly} onCheckedChange={(checked) => setShowHighSalaryOnly(Boolean(checked))} />
                      <label htmlFor="highSalary" className="text-sm">
                        High Salary (500k+)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="recent" checked={showRecentOnly} onCheckedChange={(checked) => setShowRecentOnly(Boolean(checked))} />
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
                <h2 className="text-2xl font-bold text-gray-900">{sortedJobs.length} Jobs Found</h2>
                <p className="text-gray-600">
                  Showing all {sortedJobs.length} results
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Sort by: {sortOption === 'relevance' ? 'Relevance' : sortOption === 'date' ? 'Date Posted' : 'Salary (High to Low)'}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortOption('relevance')}>Relevance</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption('date')}>Date Posted</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption('salary')}>Salary (High to Low)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Job Cards */}
            <div className="flex flex-col gap-4">
              {sortedJobs.map((job: Job) => (
                <JobCard 
                  key={job._id}
                  job={job}
                  onJobClick={(jobId) => router.push(`/job/${jobId}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
