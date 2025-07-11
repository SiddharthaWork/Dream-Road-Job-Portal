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
  Building2,
  CheckCircle,
  XCircle,
  MapPin,
  Users,
  Calendar,
  Briefcase,
  Star,
  TrendingUp
} from 'lucide-react';

// Mock data for verified companies
const verifiedCompanies = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    email: 'contact@techcorp.com',
    industry: 'Technology',
    size: '100-500',
    location: 'Kathmandu, Nepal',
    verifiedDate: '2024-01-15',
    activeJobs: 12,
    totalEmployees: 250,
    rating: 4.8,
    status: 'active',
    plan: 'premium',
    lastActivity: '2024-01-20'
  },
  {
    id: '2',
    name: 'HealthCare Plus',
    email: 'hr@healthcareplus.com',
    industry: 'Healthcare',
    size: '500-1000',
    location: 'Kathmandu, Nepal',
    verifiedDate: '2024-01-12',
    activeJobs: 8,
    totalEmployees: 750,
    rating: 4.6,
    status: 'active',
    plan: 'enterprise',
    lastActivity: '2024-01-19'
  },
  {
    id: '3',
    name: 'EduTech Innovations',
    email: 'careers@edutech.com',
    industry: 'Education',
    size: '10-50',
    location: 'Kathmandu, Nepal',
    verifiedDate: '2024-01-10',
    activeJobs: 5,
    totalEmployees: 35,
    rating: 4.9,
    status: 'active',
    plan: 'basic',
    lastActivity: '2024-01-20'
  },
  {
    id: '4',
    name: 'GreenEnergy Corp',
    email: 'info@greenenergy.com',
    industry: 'Energy',
    size: '50-100',
    location: 'Kathmandu, Nepal',
    verifiedDate: '2024-01-08',
    activeJobs: 3,
    totalEmployees: 85,
    rating: 4.4,
    status: 'inactive',
    plan: 'basic',
    lastActivity: '2024-01-15'
  }
];

const stats = [
  {
    title: 'Verified Companies',
    value: '987',
    change: '+12.1%',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    title: 'Active Companies',
    value: '834',
    change: '+8.5%',
    icon: Building2,
    color: 'text-blue-600'
  },
  {
    title: 'Premium Plans',
    value: '234',
    change: '+15.2%',
    icon: Star,
    color: 'text-purple-600'
  },
  {
    title: 'Avg. Rating',
    value: '4.7',
    change: '+0.2',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
];

export default function VerifiedCompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const getPlanBadge = (plan: string) => {
    const variants = {
      basic: 'bg-gray-100 text-gray-800',
      premium: 'bg-blue-100 text-blue-800',
      enterprise: 'bg-purple-100 text-purple-800'
    };
    return variants[plan as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const filteredCompanies = verifiedCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;
    const matchesPlan = planFilter === 'all' || company.plan === planFilter;
    return matchesSearch && matchesStatus && matchesIndustry && matchesPlan;
  });

  return (
    <div className="">
      <div className="py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Verified Companies</h1>
            <p className="text-gray-600 mt-1">Manage all verified and active companies</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm">
              Send Notification
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
                    placeholder="Search by company name or email..."
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
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Energy">Energy</SelectItem>
                </SelectContent>
              </Select>
              <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Verified Companies Table */}
        <Card>
          <CardHeader>
            <CardTitle>Verified Companies</CardTitle>
            <CardDescription>
              All companies that have completed the verification process
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="divide-y divide-gray-200">
                    <TableHead>Company</TableHead>
                    <TableHead>Industry & Plan</TableHead>
                    <TableHead>Status & Rating</TableHead>
                    <TableHead>Active Jobs</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Verified Date</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                            <Building2 className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 flex items-center">
                              {company.name}
                              <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                            </div>
                            <div className="text-sm text-gray-500">{company.email}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {company.location}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{company.industry}</div>
                          <Badge className={getPlanBadge(company.plan)}>
                            {company.plan}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={getStatusBadge(company.status)}>
                            {company.status}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                            {company.rating}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-gray-900">
                          <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                          {company.activeJobs}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-gray-900">
                          <Users className="h-4 w-4 mr-1 text-gray-400" />
                          {company.totalEmployees}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        {new Date(company.verifiedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        {new Date(company.lastActivity).toLocaleDateString()}
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
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Company
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Briefcase className="mr-2 h-4 w-4" />
                              View Jobs
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              Suspend Company
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-gray-700">
                Showing 1 to {Math.min(10, filteredCompanies.length)} of {filteredCompanies.length} results
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