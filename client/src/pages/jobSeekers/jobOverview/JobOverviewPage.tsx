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
    title: "Full Stack Developer",
    company: "NCCS Software",
    companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvOZcN0BOWXgH_caHKVbdiRAGsZQsr2FLMew&s",
    logoColors: "from-gray-800 to-gray-900",
    // type: "Freelance",
    type: "Full-time",
    typeColor: "bg-purple-100 text-purple-700",
    dueDate: "",
    location: "Remote",
    applicants: 1,
    salary: "NPR 2,980–10,640",
    salaryType: "range",
  },
  {
    id: 2,
    title: "Software Developer",
    company: "Info Developers",
    companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73484JT07cWw9hTnLlm4QKer_fkpE3t3eTw&s",
    logoColors: "from-green-500 to-teal-600",
    type: "Full-time",
    typeColor: "bg-blue-100 text-blue-700",
    dueDate: "",
    // location: "Remote",
    location: "Kathmandu, Bāgmatī, Nepal ",
    applicants: 3,
    salary: "NPR 55,960–10,950",
    salaryType: "range",
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Cloco Nepal",
    companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdxDFw67ruCx2iIthYOGW-5zWY7-BC6M2naQ&s",
    logoColors: "from-purple-500 to-pink-600",
    // type: "Bounty",
    type: "Full-time",
    typeColor: "bg-orange-100 text-orange-700",
    dueDate: "",
    location: "Remote",
    applicants: 1,
    salary: "NPR 15,960–19,950",
    salaryType: "range",
  },

]

const jobHighlights = [
  "Opportunity to work on both frontend and backend technologies",
  "Collaborate with cross-functional teams to define, design, and ship new features",
  "Implement responsive and user-friendly web interfaces",
  "Write clean, maintainable, and efficient code",
  "Participate in code reviews and contribute to best practices",
]

const keySkills = [
  "JavaScript",
  "TypeScript",
  "React.js",
  "Node.js",
  "Express.js",
  "REST APIs",
  "SQL Databases",
  "Version Control",
  "Git",
  "Problem Solving",
]

export default function JobOverviewPage() {
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)
  const handleApply = () => {
    setApplying(true);
  }
  const handleApplied = () => {
    setApplied(true);
    setApplying(false);
  }

  return (
    <div className="w-full h-full bg-[#f8f9fa]">
      {applying && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <JobApplicationModal onApplied={handleApplied} />
        </div>
      )}
      <div className="min-h-screen bg-gray-50 w-full max-w-7xl mx-auto py-6">
        {/* Banner */}
        <div className="relative w-full h-48 overflow-hidden rounded-xl">
          <div className="w-full h-full">
            <img src="https://png.pngtree.com/thumb_back/fh260/background/20201023/pngtree-abstract-geometric-green-background-with-fresh-gradient-banner-image_432556.jpg" alt="Join our talent community" className=" w-full h-full " />
          </div>
        </div>

        <div className="container mx-auto py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Similar Jobs */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-0 mb-0">
                  <CardTitle className="text-lg font-semibold">Similar roles you might be interested in</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-fit">
                    <div className="space-y-4 p-4">
                      {similarJobs.map((job) => (
                        <div key={job.id} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-sm mb-2 line-clamp-2">{job.title}</h3>
                              <div className="space-y-1 text-xs text-gray-600">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>Kathmandu, Bāgmatī, Nepal</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span></span>
                                </div>
                                <div className="text-gray-500"></div>
                              </div>
                              <Button size="sm" className="mt-2 h-7 text-xs">
                                Apply
                              </Button>
                            </div>
                            <div className="ml-2">
                              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                {/* <Building2 className="w-4 h-4 text-blue-600" /> */}
                                <img src={job.companyLogo} alt="" />
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
                      <h1 className="text-2xl font-bold mb-2">Full Stack Developer </h1>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <div className="w-8 h-8 overflow-hidden">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvknAULMIa1Lu9QgyPv7XdWIJ3hklDeskMig&s" alt="" className="w-full h-full object-cover" />

                          </div>
                          <span className="font-medium">LeapFrog</span>
                        </div>

                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        {/* <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>0 years</span>
                        </div> */}
                        <div className="flex items-center gap-2">
                          <span>NPR 11,305-15,960</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>Kathmandu, Bāgmatī, Nepal</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Bookmark className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button onClick={handleApply} size="sm" disabled={applied}>
                        {applied ? 'Applied' : 'Apply'}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <span>Posted: 2 day ago</span>
                      <span>Applicants: 2</span>
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
                    <p className="text-sm text-gray-700">Kathmandu, Bāgmatī, Nepal </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Roles & Responsibilities</h3>
                    <ul className="space-y-2 mb-6">
                      {jobHighlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
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
