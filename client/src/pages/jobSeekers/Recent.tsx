"use client"

import { ChevronRight, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Earner {
  id: number
  name: string
  description: string
  avatar: string
  avatarColor: string
  amount: string
}

interface RecentEarnersProps {
  earners: Earner[]
  onViewLeaderboard?: () => void
}

export default function RecentEarners({ earners, onViewLeaderboard }: RecentEarnersProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">RECENT EARNERS</h3>
          <Button variant="ghost" size="sm" className="text-blue-600" onClick={onViewLeaderboard}>
            Leaderboard
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-3">
          {earners.map((earner) => (
            <div key={earner.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={earner.avatarColor}>{earner.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{earner.name}</p>
                  {earner.description && <p className="text-xs text-gray-500">{earner.description}</p>}
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <DollarSign className="w-4 h-4" />
                <span>{earner.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
