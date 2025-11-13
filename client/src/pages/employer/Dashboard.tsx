'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Users, Eye, TrendingUp, Calendar, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Dashboard = () => {
  const router = useRouter();
  const [company, setCompany] = useState<any>('');
  const [jobCounts, setJobCounts] = useState({ activeJobs: 0, totalApplicants: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState([
    { name: 'Active Jobs', value: 0 },
    { name: 'Total Applicants', value: 0 }
  ]);

  useEffect(() => {
    const company = localStorage.getItem('companyName');
    setCompany(company);
    
    // Fetch job counts when component mounts
    const fetchJobCounts = async () => {
      try {
        const companyId = localStorage.getItem('companyId');
        if (!companyId) {
          throw new Error('Company ID not found');
        }
        
        const response = await fetch(`http://localhost:4000/api/job/getjobcount/${companyId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job count');
        }
        
        const data = await response.json();
        if (data.success) {
          setJobCounts({
            activeJobs: data.data.jobCount || 0,
            totalApplicants: data.data.applicationCount || 0  
          });
          setChartData([
            { name: 'Active Jobs', value: data.data.jobCount || 0 },
            { name: 'Total Applicants', value: data.data.applicationCount || 0 }
          ]);
        }
      } catch (err) {
        console.error('Error fetching job counts:', err);
        setError('Failed to load job data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobCounts();
  }, []);
  
  const stats = [
    {
      title: 'Active Jobs',
      value: loading ? '...' : error ? 'Error' : jobCounts.activeJobs.toString(),
      change: '',
      icon: Briefcase,
      color: 'text-blue-600',
    },
    {
      title: 'Total Applicants',
      value: loading ? '...' : error ? 'Error' : jobCounts.totalApplicants.toString(),
      change: '',
      icon: Users,
      color: 'text-green-600',
    },
  ];



  return (
    <div className="space-y-8">

      {/* {Welcome Banner} */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Welcome {company} to DreamRoad</h1>
      </div>
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
              onClick={() => router.push('/employer/dashboard/jobs')}
              className="h-20 flex flex-col gap-2"
            >
              <Users className="h-6 w-6" />
              Job Posts
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Metrics Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#3B82F6' : '#10B981'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Job Posts */}
        {/* <Card>
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
        </Card> */}

        {/* Recent Applicants */}
        {/* <Card>
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
        </Card> */}
      </div>
    </div>
  );
};

export default Dashboard;
