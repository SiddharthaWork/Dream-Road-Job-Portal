"use client"

import { ChevronRight, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

interface JobPost {
  id: number
  companyName: string
  latestJobTitle: string
  companyInitials: string
  avatarColor: string
  jobCount: number
}

interface RecentJobPostsProps {
  jobPosts: JobPost[]
  onViewAllJobs?: () => void
}

export default function RecentJobPosts({ jobPosts, onViewAllJobs }: RecentJobPostsProps) {
  // Duplicate the job posts for seamless looping
  const duplicatedPosts = [...jobPosts, ...jobPosts]

  return (
    <Card className="py-4">
      <CardContent className="px-6">
        <div className="flex items-center justify-between mb-4 ">
          <motion.h3
            className="font-bold text-gray-900"
          >
            RECENT JOB POSTS
          </motion.h3>
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="link" size="sm" className="text-sm relative gap-0 -right-4 w-fit px-0 text-blue-600 flex items-center" onClick={onViewAllJobs}>
              View All Jobs
              <ChevronRight className="w-4 h-4 " />
            </Button>
          </motion.div>
        </div>

        <div className="relative h-[25rem] overflow-hidden cursor-pointer">
          <motion.div
            className="space-y-3"
            animate={{
              y: [0, -(jobPosts.length * 60 + jobPosts.length * 12)], // 60px height + 12px gap per item
            }}
            transition={{
              duration: jobPosts.length * 3, // Adjust speed based on number of items
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {duplicatedPosts.map((post, index) => (
              <motion.div
                key={`${post.id}-${index}`}
                className="flex items-center justify-between py-2"
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (index % jobPosts.length) * 0.1,
                }}
                whileHover={{
                  backgroundColor: "rgba(59, 130, 246, 0.05)",
                  borderRadius: "8px",
                  transition: { duration: 0.2 },
                }}
              >
                <div className="flex items-center gap-3">
                  <motion.div  transition={{ duration: 0.2 }}>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={post.avatarColor}>{post.companyInitials}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div>
                    <p className="font-medium text-gray-900">{post.companyName}</p>
                    <p className="text-xs text-gray-500">{post.latestJobTitle}</p>
                  </div>
                </div>
                <motion.div
                  className="flex items-center gap-1 text-blue-600 font-semibold"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>
                    {post.jobCount} {post.jobCount === 1 ? "job" : "jobs"}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
        </div>
      </CardContent>
    </Card>
  )
}
