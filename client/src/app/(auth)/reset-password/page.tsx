"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, CheckCircle, XCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [isTokenValid, setIsTokenValid] = useState(true)
  const [successMessage, setSuccessMessage] = useState("")
  
  const router = useRouter()
  const searchParams = useSearchParams()

  const validatePassword = (pwd: string): string[] => {
    const validationErrors: string[] = []

    if (pwd.length < 6) {
      validationErrors.push("Password must be at least 6 characters long")
    }
    if (!/[A-Z]/.test(pwd)) {
      validationErrors.push("Password must contain at least one uppercase letter")
    }
    if (!/[a-z]/.test(pwd)) {
      validationErrors.push("Password must contain at least one lowercase letter")
    }
    if (!/\d/.test(pwd)) {
      validationErrors.push("Password must contain at least one number")
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      validationErrors.push("Password must contain at least one special character")
    }

    return validationErrors
  }

  useEffect(() => {
    const tokenFromUrl = searchParams?.get('token')
    const roleFromUrl = searchParams?.get('role')
    
    if (tokenFromUrl && roleFromUrl) {
      setToken(tokenFromUrl)
      setRole(roleFromUrl)
    } else {
      setIsTokenValid(false)
      setErrors(["Invalid or missing reset token/role. Please request a new password reset."])
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])
    setSuccessMessage("")

    if (!token || !role) {
      setErrors(["Invalid reset token or role"])
      return
    }

    const passwordErrors = validatePassword(password)
    const allErrors = [...passwordErrors]

    if (password !== confirmPassword) {
      allErrors.push("Passwords do not match")
    }

    if (allErrors.length > 0) {
      setErrors(allErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password, role }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccessMessage("Password reset successfully! Redirecting to login...")
        setPassword("")
        setConfirmPassword("")
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        setErrors([data.message || "Failed to reset password. Please try again."])
      }
    } catch (error) {
      setErrors(["Failed to reset password. Please try again."])
    } finally {
      setIsSubmitting(false)
    }
  }

  const passwordStrength = password.length > 0 ? validatePassword(password) : []
  const isPasswordValid = passwordStrength.length === 0 && password.length > 0
  const isConfirmPasswordValid = confirmPassword.length > 0 && password === confirmPassword

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/dreamroad.svg" alt="" className="w-10 h-10 rounded-lg" />
            <h1 className="text-2xl font-bold text-foreground">Dream Road</h1>
          </div>
          <p className="text-sm text-muted-foreground">Your gateway to professional opportunities</p>
        </div>

        {/* Reset Password Form */}
        <Card className="shadow-lg border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center text-foreground">Reset Your Password</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Create a new secure password for your account (User, Admin, or Company)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className="pr-10 bg-input border-border focus:ring-ring"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  {password.length > 0 && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                      {isPasswordValid ? (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className="pr-10 bg-input border-border focus:ring-ring"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  {confirmPassword.length > 0 && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                      {isConfirmPasswordValid ? (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Password Requirements */}
              {password.length > 0 && passwordStrength.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Password Requirements:</p>
                  <ul className="space-y-1">
                    {passwordStrength.map((error, index) => (
                      <li key={index} className="flex items-center space-x-2 text-xs text-destructive">
                        <XCircle className="h-3 w-3" />
                        <span>{error}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    {successMessage}
                  </AlertDescription>
                </Alert>
              )}

              {/* Error Messages */}
              {errors.length > 0 && (
                <Alert className="border-destructive/20 bg-destructive/5">
                  <AlertDescription className="text-destructive">
                    <ul className="space-y-1">
                      {errors.map((error, index) => (
                        <li key={index} className="text-sm">
                          • {error}
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#255cf4] hover:bg-[#255cf4]/90 text-primary-foreground font-medium"
                disabled={isSubmitting || passwordStrength.length > 0 || password !== confirmPassword || !isTokenValid || successMessage !== ""}
              >
                {isSubmitting ? "Resetting Password..." : "Reset Password"}
              </Button>

              {!isTokenValid && (
                <div className="text-center mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/forget-password')}
                    className="text-sm"
                  >
                    Request New Password Reset
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Security Note */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your password should be unique and not used on other websites. We recommend using a password manager for
            better security.
          </p>
        </div>

       
      </div>
    </div>
  )
}
