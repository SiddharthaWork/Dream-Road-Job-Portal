"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MapPin, Building2, Clock, DollarSign, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface JobListing {
  id: string
  title: string
  company: string
  location: string
  jobType: "Full-time" | "Part-time" | "Contract" | "Remote" | "Hybrid"
  salary ?: number;
  postedDate: string
  isUrgent?: boolean
  companyLogo?: string
}

interface JobCardProps {
  job: JobListing
  onApply?: (jobId: string) => void
  onSave?: (jobId: string) => void
  className?: string
}

export default function JobCard({ job, onApply, onSave, className = "" }: JobCardProps) {
  const formatSalary = (salary: JobListing["salary"]) => {
    if (!salary) return null
    return `${salary}`
  }

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Part-time":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "Contract":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "Remote":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "Hybrid":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const formatPostedDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300  ${className}`}
    >
      <CardHeader className="">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#255cf4] transition-colors duration-200 truncate">
                {job.title}
              </h3>
              {job.isUrgent && (
                <Badge variant="destructive" className="text-xs">
                  Urgent
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Building2 className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium truncate">{job.company}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSave?.(job.id)}
            className="flex-shrink-0 ml-2 hover:bg-gray-100"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge className={`text-xs ${getJobTypeColor(job.jobType)}`}>
            <Clock className="h-3 w-3 mr-1" />
            {job.jobType}
          </Badge>

          {job.salary && (
            <Badge variant="outline" className="text-xs">
             NPR {formatSalary(job.salary)}/month
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Posted {formatPostedDate(job.postedDate)}</span>

          <Button
            onClick={() => onApply?.(job.id)}
            className="bg-[#255cf4] hover:bg-[#1e4bd1] text-white px-6 py-2 text-sm font-medium transition-colors duration-200"
          >
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
