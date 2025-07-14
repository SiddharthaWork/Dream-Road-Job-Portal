'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, Briefcase, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import Footer from '@/components/shared/Footer';
import { useRouter } from 'next/navigation';

export const LandingPageEmployer = () => {
    const router = useRouter();

  const features = [
    {
      icon: Briefcase,
      title: 'Smart Job Posting',
      description: 'Create compelling job posts with our intuitive builder and reach qualified candidates faster.',
    },
    {
      icon: Users,
      title: 'Applicant Management',
      description: 'Streamline your hiring process with powerful tools to review, track, and manage candidates.',
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Insights',
      description: 'Get detailed insights into your hiring performance and optimize your recruitment strategy.',
    },
    {
      icon: Building2,
      title: 'Company Branding',
      description: 'Showcase your company culture and values to attract the right talent to your organization.',
    },
  ];

  const benefits = [
    'Post unlimited job openings',
    'Advanced candidate filtering',
    'Real-time application tracking',
    'Company profile verification',
    'Resume database access',
    'Interview scheduling tools',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className='w-full h-fit border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50'>
      <header className=" w-full max-w-7xl mx-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <div className="bg-blue-600 p-2 rounded-lg"> */}
              <div className='w-10 h-10 rounded-lg bg-[#255cf4] overflow-hidden'>
                <img src="/dreamroad.svg" alt="Dream Road" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl font-bold uppercase text-[#255cf4]">DreamRoad</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className='hover:text-[#255cf4] hover:bg-transparent hover:underline cursor-pointer' onClick={() => router.push('/')}>
                JobSeeker Login
              </Button>
              <Button onClick={() => router.push('/employer/login')}>
                LogIn
              </Button>
            </div>
          </div>
        </div>
      </header>
      </div>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tighter">
            One Stop Solution for 
              <span className="text-blue-600 block">Smarter, Faster Recruiting</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The most powerful and intuitive recruiting platform to help you find, 
              attract, and hire the best talent for your growing company.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => router.push('employer/login')}>
                Start Recruiting Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" onClick={() => router.push('employer/login')}>
                Sign In to Dashboard
              </Button> 
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Hire Better
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive suite of tools makes recruiting easier, faster, and more effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Top Companies Choose Dream Road
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Join thousands of successful companies that have transformed their hiring process 
                with our cutting-edge recruitment platform.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">100+</div>
                  <div className="text-gray-600">Companies trust us</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">50k+</div>
                  <div className="text-gray-600">Successful hires</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">85%</div>
                  <div className="text-gray-600">Faster hiring process</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join Dream Road today and start building your dream team with the most powerful recruiting tools available.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6" onClick={() => router.push('/employer/signup')}>
                Let's Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Dream Road</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Dream Road. All rights reserved.
            </div>
          </div>
        </div>
      </footer> */}
      <Footer/>
    </div>
  );
};

export default LandingPageEmployer;
