"use client"

import { DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Grant {
  id: number
  title: string
  company: string
  companyLogo: string
  logoColors: string
  verified: boolean
  avgGrant: string
  maxAmount: string
  type: string
  typeColor: string
}

interface GrantCardProps {
  grant: Grant
  onGrantClick?: (grantId: number) => void
}

export default function FancyCard({ grant = {} as Grant, onGrantClick }: GrantCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onGrantClick?.(grant.id)}>
      <CardContent className="px-4">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 bg-gradient-to-br ${grant.logoColors} rounded-lg flex items-center justify-center`}
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">{grant.companyLogo}</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{grant.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {grant.company} {grant.verified && "✓"}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Badge variant="secondary" className={grant.typeColor}>
                {grant.type}
              </Badge>
              <span>{grant.avgGrant} Avg. Grant</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-[#255cf4] font-semibold">
              <span>{grant.maxAmount}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
