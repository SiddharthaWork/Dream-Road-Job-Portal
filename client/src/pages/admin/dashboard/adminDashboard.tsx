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
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Eye,
  UserPlus,
  FileText,
  CheckCircle
} from 'lucide-react';

// Mock data
const statsData = [
  {
    title: 'Total Jobseekers',
    value: '12,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    description: 'Active registered users'
  },
  {
    title: 'Companies',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: Building2,
    description: 'Verified companies'
  },
  {
    title: 'Active Jobs',
    value: '3,456',
    change: '-2.1%',
    trend: 'down',
    icon: BriefcaseIcon,
    description: 'Currently posted jobs'
  },
  {
    title: 'Open Tickets',
    value: '89',
    change: '+5.3%',
    trend: 'up',
    icon: MessageSquare,
    description: 'Unresolved complaints'
  }
];

const userGrowthData = [
  { month: 'Jan', users: 1200, companies: 80 },
  { month: 'Feb', users: 1450, companies: 95 },
  { month: 'Mar', users: 1800, companies: 110 },
  { month: 'Apr', users: 2200, companies: 125 },
  { month: 'May', users: 2650, companies: 140 },
  { month: 'Jun', users: 3100, companies: 155 }
];

const jobCategoryData = [
  { name: 'Technology', value: 35, color: '#3B82F6' },
  { name: 'Healthcare', value: 25, color: '#10B981' },
  { name: 'Finance', value: 20, color: '#F59E0B' },
  { name: 'Education', value: 12, color: '#EF4444' },
  { name: 'Others', value: 8, color: '#8B5CF6' }
];

const recentActivities = [
  {
    id: 1,
    type: 'user_registration',
    message: 'New user registered: John Doe',
    time: '2 minutes ago',
    icon: UserPlus
  },
  {
    id: 2,
    type: 'job_posted',
    message: 'New job posted by TechCorp: Senior Developer',
    time: '15 minutes ago',
    icon: FileText
  },
  {
    id: 3,
    type: 'complaint_resolved',
    message: 'Complaint #1234 resolved successfully',
    time: '1 hour ago',
    icon: CheckCircle
  },
  {
    id: 4,
    type: 'company_verified',
    message: 'Company verification completed: InnovateX',
    time: '2 hours ago',
    icon: Building2
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with DreamRoad today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Reports
          </Button>
          <Button size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly registration trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Jobseekers"
                />
                <Line 
                  type="monotone" 
                  dataKey="companies" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Companies"
                />
              </LineChart>
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
                  data={jobCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {jobCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {jobCategoryData.map((item, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest actions and updates on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                <div className="p-2 bg-white rounded-lg">
                  <activity.icon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {activity.type.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              View All Activities
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}