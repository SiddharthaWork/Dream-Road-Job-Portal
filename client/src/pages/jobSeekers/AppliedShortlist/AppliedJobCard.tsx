"use client"

import type React from "react"

import { Clock, MapPin, Users, DollarSign, Bookmark, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Job } from "@/types/job"
import { format, formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job
  onJobClick?: (jobId: string) => void
  onApply?: (jobId: string) => void
  onSave?: (jobId: string) => void
  status?: string
  appliedDate?: string
}

export default function AppliedJobCard({ job, onJobClick, onApply, onSave, status, appliedDate }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  if (!job) return null;


  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation()
    onApply?.(job.id)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSaved(!isSaved)
    onSave?.(job.id)
  }

  let formattedDate = "recently";
  if (appliedDate) {
    try {
      formattedDate = formatDistanceToNow(new Date(appliedDate), { addSuffix: true }).replace("about ", "");
    }
    catch (e) {
      console.error("Failed to parse date:", appliedDate, e);
    }
  }

  return (
    <Card
      className="hover:shadow-lg transition-all duration-200 cursor-pointer py-4 "
      onClick={() => onJobClick?.(job.id)}
    >
      <CardContent className="px-6">
        <div className="flex items-start gap-4 mb-2">
          <div
            className={`w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-400 rounded-md overflow-hidden flex items-center justify-center`}
          >
            <img src={job.company.logo} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1 text-lg hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 font-medium">{job.company.name}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
              <Badge variant="secondary" className={`bg-[#255cf4] text-white font-medium`}>
                {job.type}
              </Badge>
              {job.deadline && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {format(new Date(job.deadline), 'MMM d, yyyy')}
                </span>
              )}
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {job.experience} level
              </span>
              {status && (
                <Badge variant="outline" className="ml-2">
                  {status}
                </Badge>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-[#255cf4] font-bold text-lg">
              <span>Rs {job.salaryMin}</span> - <span>{job.salaryMax}</span>
            </div>
            {/* <p className="text-xs text-gray-500 mt-1">{job.salaryType}</p> */}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="text-xs text-gray-400">
            Applied {formattedDate}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleApply}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-medium"
            >
              {/* making this uppercase */}
              {status?.toUpperCase()}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
