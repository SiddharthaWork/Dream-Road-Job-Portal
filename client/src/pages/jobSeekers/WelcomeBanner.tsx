import { Briefcase } from "lucide-react"

interface WelcomeBannerProps {
  userName: string
  platformName: string
}

export default function WelcomeBanner({ userName, platformName }: WelcomeBannerProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-6 text-white">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Briefcase className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {userName}</h1>
          <p className="text-blue-100">We're so glad to have you on {platformName}</p>
        </div>
      </div>
    </div>
  )
}
