'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  Building2,
  BriefcaseIcon,
  TrendingUp,
  TrendingDown,
  Eye,
} from 'lucide-react';
import axios from 'axios';
import { useState, useEffect } from 'react';

// Mock data
const userGrowthData = [
  { month: 'Jan', users: 1200, companies: 80 },
  { month: 'Feb', users: 1450, companies: 95 },
  { month: 'Mar', users: 1800, companies: 110 },
  { month: 'Apr', users: 2200, companies: 125 },
  { month: 'May', users: 2650, companies: 140 },
  { month: 'Jun', users: 3100, companies: 155 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6EE7B7', '#FBBF24'];

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCompanies: 0,
    activeJobs: 0
  });

  const [jobCategoriesData, setJobCategoriesData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => { 
    const fetchStats = async () => {
      try {
        const [usersRes, companiesRes, jobsRes] = await Promise.all([
          axios.get('http://localhost:4000/api/user/getallusercount'),
          axios.get('http://localhost:4000/api/company/getallcompanycount'),
          axios.get('http://localhost:4000/api/job/getalljobcount')
        ]);

        setStats({
          totalUsers: usersRes.data?.data || 0,
          totalCompanies: companiesRes.data?.data || 0,
          activeJobs: jobsRes.data?.data || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    const fetchJobCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/job/getjobcountbydepartment');
        if (response.data.success) {
          const data = response.data.data;
          const transformedData = Object.entries(data).map(([name, value]) => ({
            name,
            value: Number(value)
          }));
          setJobCategoriesData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching job categories:', error);
      }
    };

    fetchStats();
    fetchJobCategories();
  }, []);

  const statsData = [
    {
      title: 'Total Job Seekers',
      value: stats.totalUsers.toString(),
      change: '+10.2%',
      trend: 'up',
      icon: Users,
      description: 'Registered job seekers'
    },
    {
      title: 'Companies',
      value: stats.totalCompanies.toString(),
      change: '+3.4%',
      trend: 'up',
      icon: Building2,
      description: 'Verified companies'
    },
    {
      title: 'Active Jobs',
      value: stats.activeJobs.toString(),
      change: '-2.1%',
      trend: 'down',
      icon: BriefcaseIcon,
      description: 'Currently posted jobs'
    }
  ];

  const totalStatsData = [
    { name: 'Job Seekers', value: stats.totalUsers },
    { name: 'Companies', value: stats.totalCompanies },
    { name: 'Active Jobs', value: stats.activeJobs }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with DreamRoad today.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statsData.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className="p-2 bg-blue-50 rounded-lg">
                <stat.icon className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center text-sm mt-1">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Total Counts Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Total Counts</CardTitle>
            <CardDescription>Overview of key platform metrics</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={totalStatsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Job Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Job Categories</CardTitle>
            <CardDescription>Distribution of active job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jobCategoriesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {jobCategoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {jobCategoriesData.map((item, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-gray-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}