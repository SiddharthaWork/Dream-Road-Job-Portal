"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import toast from "react-hot-toast"

export default function CompanySendMailPage() {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("company")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setStatus("error")
      setMessage("Please enter an email address")
      return
    }

    if (!validateEmail(email)) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setStatus("idle")
    setMessage("")

    try {
      // Make API call to forgot password endpoint
      const response = await fetch("http://localhost:4000/api/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setMessage("Password reset email sent successfully! Please check your inbox.")
        setEmail("")
        toast.success("Password reset email sent successfully! Please check your inbox.")
      } else {
        setStatus("error")
        setMessage(data.message || "Failed to send email. Please try again.")
        toast.error(data.message || "Failed to send email. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Failed to send email. Please try again.")
      toast.error("Failed to send email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Forgot Password</h1>
          <p className="text-muted-foreground">Enter your email address to reset your password</p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Dream Road</CardTitle>
            <CardDescription className="text-center">Company Password Recovery</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {status !== "success" && (
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your company email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                    disabled={isLoading}
                  />
                </div>
              )}

              {status !== "idle" && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-md text-sm ${
                    status === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {status === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {message}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-[#255cf4] hover:bg-[#255cf4]/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2 ">
                    <Send className="w-4 h-4" />
                    Send Email
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

      
      </div>
    </div>
  )
}
