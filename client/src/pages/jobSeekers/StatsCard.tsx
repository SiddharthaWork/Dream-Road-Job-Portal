import { Building, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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

export default function StatsCards({ stats }: StatsCardsProps) {
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

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat) => {
        const IconComponent = getIcon(stat.icon)
        return (
          <Card key={stat.id} className="py-4">
            <CardContent className="px-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <IconComponent className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
