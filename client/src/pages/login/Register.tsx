"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle2, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast"

interface FormErrors {
  email?: string
  number?: string
  password?: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
}

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState({
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  const validateNumber = (number: string) => /^[0-9]+$/.test(number)
  const validatePassword = (password: string) => password.length >= 8

  const validateForm = () => {
    const newErrors: FormErrors = {}
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.number) {
      newErrors.number = "Number is required"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long"
    }
    if (!formData.firstName) {
      newErrors.firstName = "First name is required"
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required"
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    toast.success("Registration successful!")
    setTimeout(() => router.push("/"), 2200)
  }

  return (
    <div className="min-h-screen flex">
      <Toaster position="top-center" />
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-18 h-18 rounded-lg overflow-hidden ">
                <Link href={"/"}>
                  <img src="/dreamroad.svg" alt="" />
                </Link>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Sign up</h2>
            <p className="text-gray-600">Create your account to get started!</p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Sign up with Email</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className={cn(
                      "pl-10 h-12 border-gray-300 focus:border-[#255cf4] focus:ring-[#255cf4] transition-all duration-200",
                      errors.firstName && "border-red-500 focus:border-red-500 focus:ring-red-500",
                    )}
                    placeholder="First name"
                    disabled={isLoading}
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  />
                  {errors.firstName && <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" />}
                </div>
                {errors.firstName && (
                  <p id="firstName-error" className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={cn(
                      "pl-10 h-12 border-gray-300 focus:border-[#255cf4] focus:ring-[#255cf4] transition-all duration-200",
                      errors.lastName && "border-red-500 focus:border-red-500 focus:ring-red-500",
                    )}
                    placeholder="Last name"
                    disabled={isLoading}
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  />
                  {errors.lastName && <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" />}
                </div>
                {errors.lastName && (
                  <p id="lastName-error" className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={cn(
                    "pl-10 h-12 border-gray-300 focus:border-[#255cf4] focus:ring-[#255cf4] transition-all duration-200",
                    errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500",
                    formData.email && !errors.email && validateEmail(formData.email) && "border-green-500",
                  )}
                  placeholder="Email"
                  disabled={isLoading}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email ? (
                  <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" />
                ) : formData.email && validateEmail(formData.email) ? (
                  <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                ) : null}
              </div>
              {errors.email && (
                <p id="email-error" className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="number" className="text-sm font-medium text-gray-700">Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                <Input
                  id="number"
                  type="number"
                  value={formData.number}
                  onChange={(e) => handleInputChange("number", e.target.value)}
                  className={cn(
                    "pl-10 h-12 border-gray-300 focus:border-[#255cf4] focus:ring-[#255cf4] transition-all duration-200",
                    errors.number && "border-red-500 focus:border-red-500 focus:ring-red-500",
                    formData.number && !errors.number && validateNumber(formData.number) && "border-green-500",
                  )}
                  placeholder="Phone Number"
                  disabled={isLoading}
                  aria-invalid={!!errors.number}
                  aria-describedby={errors.number ? "number-error" : undefined}
                />
                {errors.number ? (
                  <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" />
                ) : formData.number && validateNumber(formData.number) ? (
                  <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                ) : null}
              </div>
              {errors.number && (
                <p id="number-error" className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.number}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={cn(
                    "pl-10 pr-10 h-12 border-gray-300 focus:border-[#255cf4] focus:ring-[#255cf4] transition-all duration-200",
                    errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500",
                    formData.password && !errors.password && validatePassword(formData.password) && "border-green-500",
                  )}
                  placeholder="Password"
                  disabled={isLoading}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={cn(
                    "pl-10 pr-10 h-12 border-gray-300 focus:border-[#255cf4] focus:ring-[#255cf4] transition-all duration-200",
                    errors.confirmPassword && "border-red-500 focus:border-red-500 focus:ring-red-500",
                    formData.confirmPassword && formData.password === formData.confirmPassword && "border-green-500",
                  )}
                  placeholder="Confirm password"
                  disabled={isLoading}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-[#255cf4] hover:underline font-medium transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:flex flex-1 bg-gradient-to-br items-center justify-center p-8 ">
        <div className="absolute bottom-0 right-0  w-[14rem] h-[10rem] overflow-hidden">
          <img src="/laptop.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-lg text-center space-y-8">
          <div className="relative">
            <img
              src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?semt=ais_hybrid&w=740"
              alt="Job portal illustration with colorful geometric shapes and diverse professionals"
              className="w-full h-auto"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">Find the job made for you.</h2>
            <p className="text-lg text-gray-600">Browse over 1000+ jobs at top companies and fast-growing startups.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

