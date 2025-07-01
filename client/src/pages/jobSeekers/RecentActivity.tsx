"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Activity {
  id: number
  name: string
  username: string
  action: string
  time: string
  avatar: string
  avatarColor: string
}

interface RecentActivityProps {
  activities: Activity[]
  onViewAll?: () => void
}

export default function RecentActivity({ activities, onViewAll }: RecentActivityProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">RECENT ACTIVITY</h3>
          <Button variant="ghost" size="sm" className="text-blue-600" onClick={onViewAll}>
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-3">
          {(activities || []).map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className={activity.avatarColor}>{activity.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.name}</span>
                  <span className="text-gray-600">
                    {" "}
                    {activity.username} • {activity.time}
                  </span>
                </p>
                <p className="text-sm text-gray-600">{activity.action}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
