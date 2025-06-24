"use client"

import JobApplicationModal from "@/components/modal/job-application-modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MapPin,
  Clock,
  Star,
  Bookmark,
  Share2,
  Building2,
  DollarSign,
  Award,
  TrendingUp,
  Heart,
  Briefcase,
} from "lucide-react"
import { useState } from "react"

const similarJobs = [
  {
    id: 1,
    title: "Walk-in-Drive For SPE - RTR - 23rd-June - 25",
    company: "Cognizant",
    location: "Hyderabad",
    experience: "0-2 Yrs",
    postedDays: "4 days ago",
  },
  {
    id: 2,
    title: "PE-Retail & Comm Banking",
    company: "Cognizant",
    location: "Pune",
    experience: "0-2 Yrs",
    postedDays: "12 days ago",
  },
  {
    id: 3,
    title: "Datacenter Support Engineer",
    company: "Cognizant",
    location: "Bengaluru",
    experience: "0-3 Yrs",
    postedDays: "12 days ago",
  },
  {
    id: 4,
    title: "Software Developer - Java",
    company: "Cognizant",
    location: "Chennai",
    experience: "1-3 Yrs",
    postedDays: "5 days ago",
  },
  {
    id: 5,
    title: "Business Analyst",
    company: "Cognizant",
    location: "Mumbai",
    experience: "2-4 Yrs",
    postedDays: "8 days ago",
  },
]

const jobHighlights = [
  "Fresher with strong attention to detail and ability to work independently",
  "Verify and match content with the website, rate content for safety",
  "Work in rotational shifts including weekends",
  "Opportunity to work with global clients",
]

const keySkills = [
  "Content Moderation",
  "Digital Marketing",
  "BPO",
  "Non Voice Process",
  "International Non Voice",
  "Content Review",
  "Sensitive Content",
]

export default function JobOverviewPage() {
  const [applying, setApplying] = useState(false)
  const handleApply = () => {
    setApplying(true);
  }

  return (
    <div className="w-full h-full bg-[#f8f9fa]">
      {applying && <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <JobApplicationModal />
      </div>}
      <div className="min-h-screen bg-gray-50 w-full max-w-7xl mx-auto py-6">
        {/* Banner */}
        <div className="relative w-full h-48 overflow-hidden rounded-xl">
          <div className="w-full h-full">
            <img src="https://static.vecteezy.com/system/resources/previews/001/349/479/non_2x/dark-black-and-blue-angled-shape-banner-free-vector.jpg" alt="Join our talent community" className=" w-full h-full " />
          </div>
        </div>

        <div className="container mx-auto py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Similar Jobs */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Cognizant roles you might be interested in</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[80vh]">
                    <div className="space-y-4 p-4">
                      {similarJobs.map((job) => (
                        <div key={job.id} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-sm mb-2 line-clamp-2">{job.title}</h3>
                              <div className="space-y-1 text-xs text-gray-600">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Briefcase className="w-3 h-3" />
                                  <span>{job.experience}</span>
                                </div>
                                <div className="text-gray-500">Posted {job.postedDays}</div>
                              </div>
                              <Button size="sm" className="mt-2 h-7 text-xs">
                                Apply
                              </Button>
                            </div>
                            <div className="ml-2">
                              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                <Building2 className="w-4 h-4 text-blue-600" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">

              {/* Job Header */}
              <Card>
                <CardContent className="">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold mb-2">Cognizant Hiring Freshers - Hyderabad (Work from home)</h1>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <div className="w-8 h-4 rounded-full overflow-hidden">
                            <img src="https://images.dwncdn.net/images/t_app-icon-l/p/970eaf73-8be8-40e3-b609-12ee85488fb7/2523988353/2057_4-76804690-logo" alt="" className="w-full h-full object-cover" />

                          </div>
                          <span className="font-medium">Cognizant</span>
                        </div>

                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>0 years</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span>Not Disclosed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>Hiring office located in Hyderabad</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Bookmark className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button onClick={handleApply} size="sm">Apply</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <span>Posted: 1 day ago</span>
                      <span>Openings: 100</span>
                      <span>Applicants: 100+</span>
                    </div>
                    <Button variant="link" className="text-blue-600 p-0">
                      Send me jobs like this
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Job Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Job Highlights</h3>
                    <ul className="space-y-2 mb-6">
                      {jobHighlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Schedule:</h3>
                    <p className="text-sm text-gray-700">24/7 (Rotational Shifts and week off)</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Days off:</h3>
                    <p className="text-sm text-gray-700">
                      Typically, 2 consecutive days in a week, but on one week each month (on average) they can be
                      separated to align schedules.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Location:</h3>
                    <p className="text-sm text-gray-700">Hyderabad</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Roles & Responsibilities</h3>
                    <Button variant="link" className="text-blue-600 p-0 text-sm">
                      read more
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Key Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Skills</CardTitle>
                  <p className="text-sm text-gray-600">Skills highlighted with '*' are preferred keyskills</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {keySkills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>


              {/* Social Share */}
              <Card className="py-2">
                <CardContent >
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                    <Button variant="link" className="text-red-600 px-0">
                      Report this job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
