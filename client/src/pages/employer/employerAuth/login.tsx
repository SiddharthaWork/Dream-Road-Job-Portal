'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/company/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if(data.company.adminApproved === false){
        router.push('/employer/review');   
      }

      if(data.company.adminApproved === true){
      // Save company data to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('companyId', data.company._id);
      localStorage.setItem('role', data.company.role);
      localStorage.setItem('isLoggedIn', data.isLoggedIn.toString());
      localStorage.setItem('companyName', data.company.name);

      // save cookies to match middleware expectations
      document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
      document.cookie = `userId=${data.company._id}; path=/; max-age=${7 * 24 * 60 * 60}`;
      document.cookie = `role=company; path=/; max-age=${7 * 24 * 60 * 60}`;


      toast.success("Login successful");
      router.push('/employer/dashboard');         
      }
    
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Header */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => router.push('/employer')}>
                <span className="text-white font-bold text-xl">DR</span>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Login</h1>
              <p className="text-gray-600">Find the job made for you!</p>
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div className="">
              <p className="text-gray-600"></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="text-center">
                <Link href="/company-forget-password" className="text-blue-600 hover:underline text-sm">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Not registered?{' '}
                <Link href="/employer/onboarding" className="text-blue-600 hover:underline font-medium">
                  Create an Account
                </Link>
              </div>
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
              Find the right candidate.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Browse over 1000+ talented candidates at top companies and fast-growing startups.
            </p>
          </div>
        </div>

        {/* Bottom illustration element */}
        <div className="absolute bottom-8 right-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl transform rotate-12 opacity-80"></div>
      </div>
    </div>
  );
};

export default Login;
