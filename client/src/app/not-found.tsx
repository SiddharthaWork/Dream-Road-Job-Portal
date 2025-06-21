"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Search, Briefcase, Users, TrendingUp } from "lucide-react"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Elements */}
      

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number with Job Icons */}
          <div className="relative mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Briefcase className="w-12 h-12 text-blue-500 animate-bounce" />
              <Search className="w-10 h-10 text-indigo-500 animate-bounce delay-200" />
              <Users className="w-12 h-12 text-purple-500 animate-bounce delay-400" />
            </div>

            <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-sky-400 via-[#4775f3] to-sky-200 bg-clip-text text-transparent leading-none mb-4">
              404
            </h1>

            <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-ping" />
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-500 rounded-full animate-ping delay-300" />
          </div>

          {/* Main Content */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">
              Oops! This Career Path Doesn't Exist
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Looks like you've wandered off the career map. Don't worry – the best opportunities are often found when
              exploring new paths!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={() => router.back()}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>

            <Button
              onClick={() => router.push("/")}
              variant="outline"
              size="lg"
              className="border-2 text-black border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 gap-2"
            >
              <Home className="w-5 h-5" />
              Back to DreamRoad
            </Button>
          </div>

          {/* Quick Links */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl px-6 py-2  shadow-xl border border-gray-400 dark:border-slate-700/20">

            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Popular Destinations</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                onClick={() => router.push("/job")}
                variant="ghost"
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Search className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Browse Jobs</span>
              </Button>

              <Button
                onClick={() => router.push("/company")}
                variant="ghost"
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Briefcase className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Companies</span>
              </Button>

              <Button
                onClick={() => router.push("/")}
                variant="ghost"
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
              >
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium">Explore</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
