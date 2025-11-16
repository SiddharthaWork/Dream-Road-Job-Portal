'use client'

import { ArrowLeft, CheckCircle2, Clock, Mail, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CompanyUnderReview() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState('~10-24 hrs')

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(`~${Math.floor(Math.random() * 15) + 10}-${Math.floor(Math.random() * 24) + 15} hrs`)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4 md:p-8">
      <button className="absolute top-4 left-4 cursor-pointer flex items-center gap-2 text-foreground hover:text-blue-600 transition-colors" onClick={() => router.back()}>
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-600/10 mb-6 mx-auto">
            <Clock className="w-10 h-10 text-blue-600" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">
            Your Profile is <span className="bg-blue-600 bg-clip-text text-transparent">Under Review</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 text-balance max-w-4xl mx-auto leading-relaxed">
            Thank you for submitting your company profile to DreamRoad. Our team is carefully reviewing your information to ensure quality standards.
          </p>
        </div>

        {/* Main Status Card */}
        <div className="bg-card border border-border rounded-xl p-8 md:p-10 mb-8 shadow-sm hover:shadow-md transition-shadow">
          {/* Status Timeline */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-1 bg-gradient-to-r from-blue-600 to-blue-600/30 rounded-full"></div>
            <div className="text-center px-4">
              <p className="text-sm text-muted-foreground font-medium mb-1">Estimated Approval Time</p>
              <p className="text-3xl md:text-4xl font-bold text-blue-600">{timeLeft}</p>
            </div>
            <div className="flex-1 h-1 bg-gradient-to-l from-blue-600 to-blue-600/30 rounded-full"></div>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {[
              {
                icon: Mail,
                title: 'Profile Submitted',
                description: 'We received your company information and documentation',
                completed: true,
              },
              {
                icon: Zap,
                title: 'Under Review',
                description: 'Our team is verifying details and assessing company eligibility',
                completed: false,
              },
              {
                icon: CheckCircle2,
                title: 'Ready to Launch',
                description: 'Once approved, you\'ll receive confirmation and access to your dashboard',
                completed: false,
              },
            ].map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all ${
                      step.completed
                        ? 'bg-blue-600/20'
                        : index === 1
                          ? 'bg-blue-600/10 border-2 border-blue-600'
                          : 'bg-muted'
                    }`}
                  >
                    <step.icon
                      className={`w-5 h-5 ${
                        step.completed ? 'text-blue-600' : index === 1 ? 'text-blue-600 animate-pulse' : 'text-muted-foreground'
                      }`}
                    />
                  </div>
                  {index < 2 && <div className="w-0.5 h-8 bg-border"></div>}
                </div>

                <div className="pt-1 pb-4">
                  <h3 className="font-semibold text-foreground mb-1 text-lg">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6 hover:border-blue-600/50 transition-colors">
            <h4 className="font-semibold text-foreground mb-2">What We're Checking</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Company information </li>
              <li>✓ Company documents</li>
              <li>✓ Company compliance</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:border-blue-600/50 transition-colors">
            <h4 className="font-semibold text-foreground mb-2">What Happens Next</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ You'll receive an email confirmation</li>
              <li>✓ Dashboard access will be activated</li>
              <li>✓ Start posting job opportunities</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Questions? Reach out to our team at <span className="font-medium">support@dreamroad.com</span>
        </p>
      </div>
    </div>
  )
}
