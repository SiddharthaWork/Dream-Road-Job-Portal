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
}

export default function JobCard({ job, onJobClick, onApply, onSave }: JobCardProps) {
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
            <img src={job?.createdBy?.logo} alt="" className="w-full h-full object-cover"/>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1 text-lg hover:text-blue-600 transition-colors">
              {job?.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 font-medium">{job?.createdBy?.name}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
              <Badge variant="secondary" className={`bg-[#255cf4] text-white font-medium`}>
                {job?.type}
              </Badge>
              {job?.deadline && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {format(new Date(job?.deadline), 'MMM d, yyyy')}
                </span>
              )}
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job?.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                  {job?.experience} level
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-[#255cf4] font-bold text-lg">
              <span>Rs {job?.salaryMin}</span> - <span>{job?.salaryMax}</span>
            </div>
            {/* <p className="text-xs text-gray-500 mt-1">{job.salaryType}</p> */}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-400">
              Posted {formatDistanceToNow(new Date(job?.createdAt), { addSuffix: true }).replace("about ", "")}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleApply}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-medium"
            >
              <Send className="w-4 h-4 mr-2" />
              Apply Now
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleSave}
              className={`px-3 py-2 border-2 transition-all ${
                isSaved
                  ? "bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
