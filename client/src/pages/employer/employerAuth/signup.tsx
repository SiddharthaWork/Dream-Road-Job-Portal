'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Mail, Lock, Phone, Building, MapPin, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    location: '',
    website: '',
    industry: '',
    companySize: '',
    services: '',
    employees: '',
    companyDescription: '',
    benefits: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Mock signup
    setTimeout(() => {
      localStorage.setItem('recruiter_auth', 'true');
      localStorage.setItem('recruiter_email', formData.email);
      localStorage.setItem('recruiter_name', `${formData.firstName} ${formData.lastName}`);
      localStorage.setItem('company_data', JSON.stringify({
        companyName: formData.companyName,
        location: formData.location,
        website: formData.website,
        industry: formData.industry,
        companySize: formData.companySize,
        services: formData.services,
        employees: formData.employees,
        companyDescription: formData.companyDescription,
        benefits: formData.benefits,
      }));
      toast({
        title: "Account created successfully",
        description: "Welcome to Dream Road!",
      });
        router.push('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Header */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DR</span>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Sign up</h1>
              <p className="text-gray-600">Create your account to get started!</p>
            </div>
          </div>

          {/* Signup Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <ScrollArea className="h-[40rem]">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="h-12 border-gray-200 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="h-12 border-gray-200 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Company Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-gray-700 font-medium">Company Name</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="companyName"
                        name="companyName"
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-700 font-medium">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="location"
                        name="location"
                        placeholder="Company Location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-gray-700 font-medium">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="website"
                        name="website"
                        placeholder="Company Website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-gray-700 font-medium">Industry</Label>
                    <Select value={formData.industry} onValueChange={(value) => handleSelectChange('industry', value)}>
                      <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500">
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companySize" className="text-gray-700 font-medium">Company Size</Label>
                    <Select value={formData.companySize} onValueChange={(value) => handleSelectChange('companySize', value)}>
                      <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500">
                        <SelectValue placeholder="Select Company Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="501-1000">501-1000 employees</SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="services" className="text-gray-700 font-medium">Services</Label>
                    <Input
                      id="services"
                      name="services"
                      placeholder="Main services/products offered"
                      value={formData.services}
                      onChange={handleInputChange}
                      className="h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employees" className="text-gray-700 font-medium">Number of Employees</Label>
                    <Input
                      id="employees"
                      name="employees"
                      type="number"
                      placeholder="Total number of employees"
                      value={formData.employees}
                      onChange={handleInputChange}
                      className="h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyDescription" className="text-gray-700 font-medium">Company Description</Label>
                    <Textarea
                      id="companyDescription"
                      name="companyDescription"
                      placeholder="Brief description of your company"
                      value={formData.companyDescription}
                      onChange={handleInputChange}
                      className="border-gray-200 focus:border-blue-500"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="benefits" className="text-gray-700 font-medium">Benefits</Label>
                    <Textarea
                      id="benefits"
                      name="benefits"
                      placeholder="Employee benefits and perks"
                      value={formData.benefits}
                      onChange={handleInputChange}
                      className="border-gray-200 focus:border-blue-500"
                      rows={3}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>

                <div className="text-center text-sm text-gray-600 mt-4">
                  Already have an account?{' '}
                    <Link href="/employer/login" className="text-blue-600 hover:underline font-medium">
                    Log in
                  </Link>
                </div>
              </ScrollArea>
            </form>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-purple-300 rounded-full"></div>
          <div className="absolute top-1/3 right-10 w-12 h-12 bg-orange-300 rounded-full"></div>
        </div>

        {/* Main illustration area */}
        <div className="relative z-10 text-center space-y-8 max-w-lg">
          {/* Illustration placeholder - you can replace with actual illustration */}
          <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-white rounded-xl mx-auto flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl">👥</span>
                </div>
              </div>
              <div className="text-white">
                <div className="space-y-2">
                  <div className="h-2 bg-white/30 rounded w-20 mx-auto"></div>
                  <div className="h-2 bg-white/30 rounded w-16 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Find the job made for you.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Browse over 1000+ jobs at top companies and fast-growing startups.
            </p>
          </div>
        </div>

        {/* Bottom illustration element */}
        <div className="absolute bottom-8 right-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl transform rotate-12 opacity-80"></div>
      </div>
    </div>
  );
};

export default Signup;
