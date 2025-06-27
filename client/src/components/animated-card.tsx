"use client"

import { cn } from "@/lib/utils"
import { AnimatedList } from "@/components/magicui/animated-list"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building2, Clock, Sparkles } from "lucide-react"

interface JobItem {
  title: string
  company: string
  location: string
  salary: string
  type: string
  isNew: boolean
  postedTime: string
  companyLogo: string
  gradient: string
}

let jobPostings: JobItem[] = [

  {
    title: "Product Designer",
    company: "Design Studio",
    location: "Kathmandu, Nepal",
    salary: "NPR 90k - NPR 130k",
    type: "Full-time",
    isNew: true,
    postedTime: "4h ago",
    companyLogo: "🎨",
    gradient: "from-blue-400 to-blue-500",
  },
  {
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Kathmandu, Nepal",
    salary: "NPR 110k - NPR 150k",
    type: "Full-time",
    isNew: false,
    postedTime: "1d ago",
    companyLogo: "☁️",
    gradient: "from-blue-600 to-blue-700",
  },
  {
    title: "Data Scientist",
    company: "AI Innovations",
    location: "Kathmandu, Nepal",
    salary: "NPR 130k - NPR 170k",
    type: "Full-time",
    isNew: true,
    postedTime: "6h ago",
    companyLogo: "🤖",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Marketing Manager",
    company: "Growth Co.",
    location: "Kathmandu, Nepal",
    salary: "NPR 80k - NPR 110k",
    type: "Full-time",
    isNew: false,
    postedTime: "2d ago",
    companyLogo: "📈",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Kathmandu, Nepal",
    salary: "NPR 100k - NPR 140k",
    type: "Remote",
    isNew: true,
    postedTime: "3h ago",
    companyLogo: "💻",
    gradient: "from-blue-600 to-blue-800",
  },
]

// Duplicate the array to have more items for the animation
jobPostings = Array.from({ length: 3 }, () => jobPostings).flat()

const JobCard = ({ title, company, location, salary, type, isNew, postedTime, companyLogo, gradient }: JobItem) => {
  return (
    <div
      className={cn(
        "group relative mx-auto w-full max-w-[420px] cursor-pointer overflow-hidden rounded-2xl",
        "transition-all duration-300 ease-out hover:scale-[103%] hover:shadow-2xl",
        "bg-white/80 backdrop-blur-sm border border-white/20",
        "dark:bg-gray-900/80 dark:border-gray-800/50",
        "shadow-lg hover:shadow-xl",
      )}
    >
      {/* Gradient Background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity",
          gradient,
        )}
      />

      {/* New Badge */}
      {isNew && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className={cn("bg-gradient-to-r text-white text-xs font-semibold px-3 py-1 shadow-lg", gradient)}>
            <Sparkles className="w-3 h-3 mr-1" />
            NEW
          </Badge>
        </div>
      )}

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-4">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
              gradient,
            )}
          >
            <span className="text-2xl">{companyLogo}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate mb-1">{title}</h3>
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
              <Building2 className="h-4 w-4" />
              <span className="font-medium truncate">{company}</span>
            </div>
          </div>
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
              <MapPin className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-300 truncate">{location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
              <Clock className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-300">{postedTime}</span>
          </div>
        </div>

        {/* Salary and Type */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900 dark:text-white">{salary}</div>
          <Badge variant="outline" className="font-medium border-gray-300 dark:border-gray-600">
            {type}
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default function AnimatedJobList({
  className,
}: {
  className?: string
}) {
  return (
    <div className="w-full">
      {/* Hero Header */}
     
      {/* Animated Job Cards */}
      <div className={cn("relative flex h-full w-full flex-col overflow-hidden", className)}>
        <AnimatedList delay={2500}>
          {jobPostings.map((job, idx) => (
            <JobCard {...job} key={`${job.title}-${job.company}-${idx}`} />
          ))}
        </AnimatedList>

        {/* Enhanced Gradient Fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-950 dark:via-gray-950/80"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white via-white/10 to-transparent dark:from-gray-950 dark:via-gray-950/50"></div>
      </div>
    </div>
  )
}
