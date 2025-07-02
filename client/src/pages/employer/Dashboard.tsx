'use client'
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Users, Eye, TrendingUp, Calendar, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  
  const stats = [
    {
      title: 'Active Jobs',
      value: '1',
      change: '',
      icon: Briefcase,
      color: 'text-blue-600',
    },
    {
      title: 'Total Applicants',
      value: '1',
      change: '',
      icon: Users,
      color: 'text-green-600',
    },
    // {
    //   title: 'Profile Views',
    //   value: '1,429',
    //   change: '+5.2% this month',
    //   icon: Eye,
    //   color: 'text-purple-600',
    // },
    // {
    //   title: 'Hire Rate',
    //   value: '23%',
    //   change: '+3% this month',
    //   icon: TrendingUp,
    //   color: 'text-orange-600',
    // },
  ];

  const recentJobs = [
    {
      id: 1,
      title: 'Full Stack Developer',
      location: 'Kathmandu, Bāgmatī, Nepal',
      applicants: 1,
      posted: '2 days ago',
      status: 'active',
    },
 
  ];

  const recentApplicants = [
    {
      id: 1,
      name: 'Siddhartha Shrestha',
      role: 'Full Stack Developer',
      applied: '1 days ago',
      status: 'new',
    },

  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => router.push('/employer/dashboard/post-job')} 
              className="h-20 flex flex-col gap-2"
            >
              <Briefcase className="h-6 w-6" />
              Post New Job
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/employer/dashboard/applicants')}
              className="h-20 flex flex-col gap-2"
            >
              <Users className="h-6 w-6" />
              Review Applicants
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/employer/dashboard/company')}
              className="h-20 flex flex-col gap-2"
            >
              <TrendingUp className="h-6 w-6" />
              Update Company Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Job Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Posts</CardTitle>
            <CardDescription>Your latest job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">{job.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      {job.applicants} applicants
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                    <span className="text-sm text-gray-500">{job.posted}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => router.push('/employer/dashboard/jobs')}
            >
              View All Jobs
            </Button>
          </CardContent>
        </Card>

        {/* Recent Applicants */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applicants</CardTitle>
            <CardDescription>Latest applications received</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplicants.map((applicant) => (
                <div key={applicant.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">{applicant.name}</h4>
                    <p className="text-sm text-gray-500">{applicant.role}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {applicant.applied}
                    </div>
                  </div>
                  <Badge className={getStatusColor(applicant.status)}>
                    {applicant.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
                onClick={() => router.push('/employer/dashboard/applicants')}
            >
              View All Applicants
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
