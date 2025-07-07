"use client"

import { Briefcase, MapPin, Search, Users } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 z-50">
      <div className="text-center space-y-8 max-w-md w-full">
        {/* Logo and Brand */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <img src="/dreamroad.svg" alt="dreamroad" className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              DreamRoad
            </h1>
          </div>
          <p className="text-gray-600 text-sm">Your path to the perfect career</p>
        </div>

        {/* Loading Animation */}
        <div className="space-y-6">
          <div className="relative">
            {/* Main loading circle */}
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              <div
                className="absolute inset-2 border-2 border-indigo-400 rounded-full border-b-transparent animate-spin animate-reverse"
                style={{ animationDuration: "1.5s" }}
              ></div>
            </div>
          </div>

          {/* Loading text with typewriter effect */}
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2 text-gray-700">
              <span className="text-sm font-medium">Finding your dream opportunities</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></div>
                <div
                  className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Icons */}
        {/* <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="flex flex-col items-center space-y-2 opacity-60 animate-pulse">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs text-gray-500">Search Jobs</span>
          </div>
          <div
            className="flex flex-col items-center space-y-2 opacity-60 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          >
          </div>
          <div
            className="flex flex-col items-center space-y-2 opacity-60 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs text-gray-500">Explore</span>
          </div>
        </div> */}

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xs text-gray-500">Preparing your personalized experience...</p>
        </div>

        {/* Motivational Quote */}
        <div className="pt-4 border-t border-gray-100">
          <blockquote className="text-sm text-gray-600 italic">
            "Every expert was once a beginner. Every pro was once an amateur."
          </blockquote>
        </div>
      </div>

      {/* Background decoration */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-[#255cf4] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div> */}

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  )
}
