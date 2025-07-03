'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  MapPin,
  Users,
  Calendar,
  AlertTriangle,
  FileText
} from 'lucide-react';

// Mock data for pending companies
const pendingCompanies = [
  {
    id: '1',
    name: 'TechStart Innovations',
    email: 'contact@techstart.com',
    industry: 'Technology',
    size: '10-50',
    location: 'San Francisco, CA',
    website: 'https://techstart.com',
    submittedDate: '2024-01-20',
    documents: ['Business License', 'Tax ID', 'Company Registration'],
    description: 'A cutting-edge AI startup focused on machine learning solutions for healthcare.',
    contactPerson: 'John Smith',
    phone: '+1 (555) 123-4567',
    priority: 'high'
  },
  {
    id: '2',
    name: 'GreenEnergy Solutions',
    email: 'info@greenenergy.com',
    industry: 'Energy',
    size: '50-100',
    location: 'Austin, TX',
    website: 'https://greenenergy.com',
    submittedDate: '2024-01-19',
    documents: ['Business License', 'Environmental Permits'],
    description: 'Renewable energy company specializing in solar panel installations.',
    contactPerson: 'Sarah Johnson',
    phone: '+1 (555) 987-6543',
    priority: 'medium'
  },
  {
    id: '3',
    name: 'FinTech Pro',
    email: 'hello@fintechpro.com',
    industry: 'Finance',
    size: '100-500',
    location: 'New York, NY',
    website: 'https://fintechpro.com',
    submittedDate: '2024-01-18',
    documents: ['Business License', 'Financial License', 'Insurance Certificate'],
    description: 'Digital banking solutions for small and medium enterprises.',
    contactPerson: 'Michael Chen',
    phone: '+1 (555) 456-7890',
    priority: 'high'
  }
];

const stats = [
  {
    title: 'Pending Review',
    value: '24',
    change: '+3 today',
    icon: Clock,
    color: 'text-yellow-600'
  },
  {
    title: 'High Priority',
    value: '8',
    change: '+2 urgent',
    icon: AlertTriangle,
    color: 'text-red-600'
  },
  {
    title: 'Avg. Review Time',
    value: '2.5 days',
    change: '-0.5 days',
    icon: Calendar,
    color: 'text-blue-600'
  },
  {
    title: 'Approved Today',
    value: '12',
    change: '+4 from yesterday',
    icon: CheckCircle,
    color: 'text-green-600'
  }
];

export default function PendingCompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return variants[priority as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const filteredCompanies = pendingCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || company.priority === priorityFilter;
    const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;
    return matchesSearch && matchesPriority && matchesIndustry;
  });

  const handleApprove = (companyId: string) => {
    console.log('Approving company:', companyId);
    // Handle approval logic
  };

  const handleReject = (companyId: string) => {
    console.log('Rejecting company:', companyId);
    // Handle rejection logic
  };

  return (
    <div className="">
      <div className="py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pending Company Reviews</h1>
            <p className="text-gray-600 mt-1">Review and approve company registration requests</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button size="sm">
              Bulk Actions
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
                    <p className="text-sm text-gray-500">{stat.change}</p>
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
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Energy">Energy</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Companies Table */}
        <Card>
          <CardHeader>
            <CardTitle>Companies Awaiting Review</CardTitle>
            <CardDescription>
              Review company registration requests and supporting documents
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="divide-y divide-gray-200">
                    <TableHead>Company Details</TableHead>
                    <TableHead>Industry & Size</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Submitted</TableHead>
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
                            <div className="font-medium text-gray-900">{company.name}</div>
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
                          <div className="text-sm text-gray-500 flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {company.size} employees
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{company.contactPerson}</div>
                          <div className="text-sm text-gray-500">{company.phone}</div>
                          <a href={company.website} className="text-sm text-blue-600 hover:underline">
                            {company.website}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityBadge(company.priority)}>
                          {company.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {company.documents.map((doc, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <FileText className="h-3 w-3 mr-1" />
                              {doc}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        {new Date(company.submittedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end ">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedCompany(company)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="w-full min-w-[60rem]">
                              <DialogHeader>
                                <DialogTitle>Company Review - {company.name}</DialogTitle>
                                <DialogDescription>
                                  Review company details and approve or reject the registration
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="grid gap-6">
                                {/* Company Info */}
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Company Information</h4>
                                      <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                                        <p><span className="font-medium">Name:</span> {company.name}</p>
                                        <p><span className="font-medium">Industry:</span> {company.industry}</p>
                                        <p><span className="font-medium">Size:</span> {company.size} employees</p>
                                        <p><span className="font-medium">Location:</span> {company.location}</p>
                                        <p><span className="font-medium">Website:</span> 
                                          <a href={company.website} className="text-blue-600 hover:underline ml-1">
                                            {company.website}
                                          </a>
                                        </p>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <h4 className="font-medium mb-2">Contact Information</h4>
                                      <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                                        <p><span className="font-medium">Contact Person:</span> {company.contactPerson}</p>
                                        <p><span className="font-medium">Email:</span> {company.email}</p>
                                        <p><span className="font-medium">Phone:</span> {company.phone}</p>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Company Description</h4>
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-700">{company.description}</p>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <h4 className="font-medium mb-2">Submitted Documents</h4>
                                      <div className="space-y-2">
                                        {company.documents.map((doc, index) => (
                                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center">
                                              <FileText className="h-4 w-4 mr-2 text-gray-400" />
                                              <span className="text-sm">{doc}</span>
                                            </div>
                                            <Button variant="outline" size="sm">
                                              <Eye className="h-4 w-4 mr-1" />
                                              View
                                            </Button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Review Notes */}
                                <div>
                                  <label className="block text-sm font-medium mb-2">Review Notes</label>
                                  <Textarea
                                    placeholder="Add your review comments..."
                                    value={reviewNotes}
                                    onChange={(e) => setReviewNotes(e.target.value)}
                                    rows={3}
                                  />
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-4 border-t">
                                  <Button 
                                    onClick={() => handleApprove(company.id)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve Company
                                  </Button>
                                  <Button 
                                    variant="destructive"
                                    onClick={() => handleReject(company.id)}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject Application
                                  </Button>
                                  <Button variant="outline">
                                    Request More Info
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Quick Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                Mark High Priority
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject Application
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
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