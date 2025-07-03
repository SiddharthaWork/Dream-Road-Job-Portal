'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Briefcase,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  DollarSign,
  Calendar,
  Building2
} from 'lucide-react';

// Mock data
const jobs = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    status: 'active',
    postedDate: '2024-01-20',
    applications: 45,
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateCorp',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$100,000 - $130,000',
    status: 'pending',
    postedDate: '2024-01-19',
    applications: 23,
    category: 'Management'
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'DataTech Inc',
    location: 'Remote',
    type: 'Contract',
    salary: '$80,000 - $100,000',
    status: 'expired',
    postedDate: '2024-01-10',
    applications: 67,
    category: 'Technology'
  },
  {
    id: '4',
    title: 'UX Designer',
    company: 'DesignStudio',
    location: 'Los Angeles, CA',
    type: 'Part-time',
    salary: '$60,000 - $80,000',
    status: 'active',
    postedDate: '2024-01-18',
    applications: 34,
    category: 'Design'
  }
];

const stats = [
  {
    title: 'Total Jobs',
    value: '3,456',
    change: '+15.7%',
    icon: Briefcase,
    color: 'text-blue-600'
  },
  {
    title: 'Active Jobs',
    value: '2,234',
    change: '+12.3%',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    title: 'Pending Approval',
    value: '89',
    change: '+8.9%',
    icon: Clock,
    color: 'text-yellow-600'
  },
  {
    title: 'Total Applications',
    value: '12,847',
    change: '+22.1%',
    icon: Calendar,
    color: 'text-purple-600'
  }
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      expired: 'bg-red-100 text-red-800',
      draft: 'bg-gray-100 text-gray-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      active: CheckCircle,
      pending: Clock,
      expired: XCircle,
      draft: Edit
    };
    return icons[status as keyof typeof icons] || Clock;
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter;
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesType;
  });

  return (
    <div className="">
      <div className="py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
            <p className="text-gray-600 mt-1">Manage and monitor all job postings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              Add Job
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by job title or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Job Postings</CardTitle>
            <CardDescription>
              A list of all job postings and their current status
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="divide-y divide-gray-200">
                    <TableHead>Job Details</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location & Type</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Posted Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {filteredJobs.map((job) => {
                    const StatusIcon = getStatusIcon(job.status);
                    
                    return (
                      <TableRow key={job.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">{job.title}</div>
                            <div className="text-sm text-gray-500">{job.category}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-900">{job.company}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-900">
                              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                              {job.location}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {job.type}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-gray-900">
                            <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                            {job.salary}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(job.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                            {job.applications}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">
                          {new Date(job.postedDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Job
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Job
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve Job
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                Deactivate Job
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-gray-700">
                Showing 1 to {Math.min(10, filteredJobs.length)} of {filteredJobs.length} results
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}