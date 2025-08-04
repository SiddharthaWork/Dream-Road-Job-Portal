"use client"

import { ChevronRight, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { FormProvider } from "@/contexts/form-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface JobPost {
  id: string | number
  companyName: string
  latestJobTitle: string
  companyInitials: string
  avatarColor: string
  jobCount: number
  image: string
}

interface RecentJobPostsProps {
  jobPosts?: JobPost[]
  onViewAllJobs?: () => void
}

export default function RecentJobPosts({ jobPosts = [], onViewAllJobs }: RecentJobPostsProps) {
  const router = useRouter()
  const [posts, setPosts] = useState<JobPost[]>(jobPosts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/job/getalljobscountbycompany');
        const data = await response.json();
        if (data.success) {
          const mappedData = data.data.map((company: any) => ({
            id: company._id,
            companyName: company.name,
            latestJobTitle: "Software Engineer",
            companyInitials: company.name.split(' ').map((word: string) => word[0]).join('').slice(0, 2).toUpperCase(),
            avatarColor: '#007bff',
            jobCount: company.jobCount,
            image: company.logo
          }));
          setPosts(mappedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const duplicatedPosts = [...posts, ...posts]

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
            <Button onClick={() => router.push('/job')} variant="link" size="sm" className="text-sm relative gap-0 -right-4 w-fit px-0 text-blue-600 flex items-center">
              View All Jobs
              <ChevronRight className="w-4 h-4 " />
            </Button>
          </motion.div>
        </div>
      
        <div className="relative h-[26rem] overflow-hidden cursor-pointer">
          <motion.div
            className="space-y-3"
            animate={{
              y: [0, -(posts.length * 60 + posts.length * 12)],
            }}
            transition={{
              duration: posts.length * 3,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {(duplicatedPosts || []).map((post, index) => (
              <motion.div
                key={`${post.id}-${index}`}
                className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (index % posts.length) * 0.1,
                }}
                whileHover={{
                  backgroundColor: "rgba(59, 130, 246, 0.05)",
                  borderColor: "#3b82f6",
                }}
                onClick={() => router.push(`/company/${post.id}`)}
              >
                <Avatar className="w-12 h-12">
                  {post.image ? (
                    <img src={post.image} alt={post.companyName} className="w-full h-full object-cover" />
                  ) : (
                    <AvatarFallback className="text-white" style={{ backgroundColor: post.avatarColor }}>
                      {post.companyInitials}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{post.companyName}</h4>
                  <p className="text-sm text-gray-500 truncate">{post.latestJobTitle}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="text-[#255cf4] w-4 h-4" />
                  <span className="text-sm font-medium text-[#255cf4]">{post.jobCount}</span>
                </div>
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
