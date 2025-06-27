"use client"

import type React from "react"

import { Clock, MapPin, Users, DollarSign, Bookmark, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"

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

interface JobCardProps {
  job: Job
  onJobClick?: (jobId: number) => void
  onApply?: (jobId: number) => void
  onSave?: (jobId: number) => void
}

export default function ShortlistTable({ job, onJobClick, onApply, onSave }: JobCardProps) {
  if (!job) {
    return <h1 className="text-2xl font-bold">Shortlist Section</h1>;
  }
  const [isSaved, setIsSaved] = useState(false)

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
      className="hover:shadow-lg transition-all duration-200 cursor-pointer "
      onClick={() => onJobClick?.(job.id)}
    >
      <CardContent className="px-6">
        <div className="flex items-start gap-4 mb-2">
        <div
            className={`w-12 h-12 bg-gradient-to-br ${job.logoColors} rounded-md overflow-hidden flex items-center justify-center shadow-sm`}
          >
            <img src={job.companyLogo} alt="" className="w-full h-full object-cover"/>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1 text-lg hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 font-medium">{job.company}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
              <Badge variant="secondary" className={`${job.typeColor} font-medium`}>
                {job.type}
              </Badge>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {job.dueDate}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {job.applicants} applicants
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-[#255cf4] font-bold text-lg">
              <span>{job.salary}</span>
            </div>
            {/* <p className="text-xs text-gray-500 mt-1">{job.salaryType}</p> */}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-400">Posted 2 days ago</div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleApply}
              className="bg-green-600 hover:bg-blue-700 text-white px-4 py-2 font-medium"
            >
              {/* <Send className="w-4 h-4 mr-2" /> */}
              Shortlist
            </Button>
          
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
