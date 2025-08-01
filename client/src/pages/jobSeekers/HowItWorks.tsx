import { Award, CheckCircle, Clock, DollarSign, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { profile } from "console"
import { div } from "motion/react-client"

export default function HowItWorks() {

  interface ProfileStep {
    id: string
    name: string
    description: string
    isCompleted: boolean
    icon: React.ReactNode
    estimatedTime: string
  }

  const steps = [
    {
      id: 1,
      icon: "✓",
      title: "Build Your Profile",
      description: "Showcase your skills and experience",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      id: 2,
      icon: <Award className="w-4 h-4" />,
      title: "Explore & Apply to Jobs",
      description: "Find opportunities that match your goals",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      id: 3,
      icon: "Rs",
      title: "Get Shortlisted & Hired",
      description: "Get hired and grow professionally",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
  ];


  const profileSteps: ProfileStep[] = [
    {
      id: "basic-info",
      name: "Basic Information",
      description: "Add your name, email, phone, and location",
      isCompleted: true,
      icon: <User className="w-4 h-4" />,
      estimatedTime: "2 min",
    },
    {
      id: "professional-summary",
      name: "Professional Summary",
      description: "Write a compelling summary of your experience",
      // isCompleted: true,
      isCompleted: true,
      icon: <Award className="w-4 h-4" />,
      estimatedTime: "5 min",
    },
    {
      id: "skills-experience",
      name: "Skills & Experience",
      description: "List your technical skills and work experience",
      isCompleted: true,
      icon: <CheckCircle className="w-4 h-4" />,
      estimatedTime: "10 min",
    },
    {
      id: "portfolio",
      name: "Portfolio & Projects",
      description: "Showcase your best work and projects",
      isCompleted: true,
      icon: <DollarSign className="w-4 h-4" />,
      estimatedTime: "15 min",
    },
    {
      id: "certifications",
      name: "Certifications",
      description: "Add your professional certifications and achievements",
      isCompleted: true,
      icon: <Award className="w-4 h-4" />,
      estimatedTime: "5 min",
    },
    {
      id: "preferences",
      name: "Job Preferences",
      description: "Set your availability, rates, and job preferences",
      isCompleted: true,
      icon: <Clock className="w-4 h-4" />,
      estimatedTime: "3 min",
    },
  ]

  const completedSteps = profileSteps.filter((step) => step.isCompleted).length
  const totalSteps = profileSteps.length
  const completionPercentage = Math.round((completedSteps / totalSteps) * 100)
  const router = useRouter();
  // wrap inside the useEffect


  // Get next incomplete step
  const nextStep = profileSteps.find((step) => !step.isCompleted)



  const getProgressTextColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-blue-600"
    if (percentage >= 40) return "text-yellow-600"
    return "text-red-600"
  }


  const [profile, setProfile] = useState(false);
  const [userId, setUserId] = useState('');


  useEffect(() => {
    const profileInfo = localStorage.getItem('profile') || 'false'
    const profile = JSON.parse(profileInfo)
    const userId = localStorage.getItem('userId') || ''
    setProfile(profile);
    setUserId(userId);
    console.log('Profile status:', profileInfo);
  }, []);

  return (
    <Card className="py-6">
      <CardContent className="px-6">
        {profile}

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {completedSteps} of {totalSteps} steps completed
            </span>
            <span className={`font-semibold text-[#255cf4]`}>
              {completionPercentage}%
            </span>
          </div>
          <div className="relative flex flex-col gap-2">
            <Progress value={profile ? 100 : 0} className="h-3 bg-gray-200" />
            {/* <div
                className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor(completionPercentage)}`}
                style={{ width: `${completionPercentage}%` }}
              /> */}
            {profile ? (
              <div className="flex items-center gap-2 w-full">
                <Button
                  onClick={() => router.push('/savedjob')}
                  variant={'default'}
                  size={'custom'}
                  className='text-black bg-gray-200 hover:bg-gray-300 cursor-pointer w-1/2'
                >
                  Saved Jobs
                </Button>
                <Button
                  onClick={() => router.push(`/profile/${userId}`)}
                  variant={'default'}
                  size={'custom'}
                  className='bg-[#255cf4] cursor-pointer w-1/2'
                >
                  View Profile
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => router.push('/profile')}
                variant={'default'}
                size={'custom'}
                className='bg-[#255cf4] cursor-pointer'
              >
                Complete Profile
              </Button>
            )}
          </div>
        </div>


        <h3 className="font-bold text-gray-900 mb-4 mt-4">HOW IT WORKS</h3>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="flex items-start gap-3">
              <div className={`w-8 h-8 ${step.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                {typeof step.icon === "string" ? (
                  <span className={`text-sm font-bold ${step.textColor}`}>{step.icon}</span>
                ) : (
                  <div className={step.textColor}>{step.icon}</div>
                )}
              </div>
              <div>
                <h4 className={`font-semibold ${step.textColor}`}>{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
