"use client"
import { Building, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState, useEffect } from "react"

interface StatItem {
  id: number
  icon: string
  value: string
  label: string
  bgColor: string
  iconColor: string
}

interface StatsCardsProps {
  stats: StatItem[]
}

export default function StatsCards({ stats = [] }: StatsCardsProps) {

  const [appliedJobCount, setAppliedJobCount] = useState(0);
  const [shortlistedJobCount, setShortlistedJobCount] = useState(0);
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "building":
        return Building
      case "briefcase":
        return Briefcase
      default:
        return Briefcase
    }
  }
  // api for value
  const getAppliedJobCount = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/application/getAppliedJobCount/${localStorage.getItem('userId')}`);
      
      // Ensure we always have a valid number
      const count = response.data?.success ? response.data.application : 0;
      setAppliedJobCount(count || 0);
      
      console.log("Applied job count:", count);
    } catch (err) {
      console.error(err);
      setAppliedJobCount(0);
    }
  }

  const getShortlistedJobCount = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/application/getShortlistedJobCount/${localStorage.getItem('userId')}`);
      
      // Ensure we always have a valid number
      const count = response.data?.success ? response.data.application : 0;
      setShortlistedJobCount(count || 0);
      
      console.log("Shortlisted job count:", count);
    } catch (err) {
      console.error(err);
      setShortlistedJobCount(0);
    }
  }

  useEffect(() => {
    getAppliedJobCount()
    getShortlistedJobCount()
  }, [])

  const router = useRouter()

  return (
    <div className="grid grid-cols-2 gap-4">
      {(stats || []).map((stat) => {
        const IconComponent = getIcon(stat.icon)
        return (
          <Card key={stat.id} className="py-4">
            <CardContent className="px-4 cursor-pointer" onClick={() => router.push("/job/applied")}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <IconComponent className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.id === 1 ? appliedJobCount || 0 : stat.id === 2 ? shortlistedJobCount || 0 : stat.value || 0}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
