'use client';

import { useEffect, useState } from 'react';
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
  Clock,
  XCircle,
  TrendingUp,
  Users,
  Briefcase,
  UserX
} from 'lucide-react';
import axios from 'axios';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
// Mock data


const stats = [
  {
    title: 'Total Companies',
    value: '1,234',
    change: '+8.2%',
    icon: Building2,
    color: 'text-blue-600'
  },
  {
    title: 'Verified Companies',
    value: '987',
    change: '+12.1%',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    title: 'Pending Verification',
    value: '156',
    change: '+5.3%',
    icon: Clock,
    color: 'text-yellow-600'
  },
  {
    title: 'Active Job Posts',
    value: '3,456',
    change: '+15.7%',
    icon: Briefcase,
    color: 'text-purple-600'
  }
];


export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [companies, setCompanies] = useState<any>([]);  
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();


  const getStatusIcon = (status: string) => {
    const icons = {
      verified: CheckCircle,
      pending: Clock,
      suspended: XCircle,
      rejected: XCircle
    };
    return icons[status as keyof typeof icons] || Clock;
  };

  const filteredCompanies = companies.filter((company: any) => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/getAllCompany`);
      console.log(response.data.data)
      setCompanies(response.data.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="">
      <div className="py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
            <p className="text-gray-600 mt-1">Manage and monitor all registered companies</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              Add Company
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
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
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
            <CardTitle>All Companies</CardTitle>
            <CardDescription>
              A list of all registered companies and their verification status
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="divide-y divide-gray-200">
                    <TableHead>Company</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {filteredCompanies.map((company: any) => {
                    const StatusIcon = getStatusIcon(company.status);
                    
                    return (
                      <TableRow key={company._id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-lg overflow-hidden bg-blue-100 flex items-center justify-center mr-3">
                              <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{company.name}</div>
                              <div className="text-sm text-gray-500">{company.email}</div>
                              <div className="text-sm text-gray-500">{company.location}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">
                          {company.industry}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">
                          {company.size} employees
                        </TableCell>
                        <TableCell>
                          <Badge className={company.block ? 'bg-red-100 text-red-800' : 'bg-green-600 text-white'}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {company.block ? 'Blocked' : 'Active'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">
                          {new Date(company.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => router.push(`/admin/companies/${company._id}`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCompany(company);
                                setIsDialogOpen(true);
                              }}
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                {company.block ? 'Unblock Company' : 'Block Company'}
                              </DropdownMenuItem>
                              {/* <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Verify Company
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                Suspend Company
                              </DropdownMenuItem> */}
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
      {/* Block/Unblock Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCompany?.block ? 'Unblock Company' : 'Block Company'}</DialogTitle>
            <DialogDescription>
              Are you sure you want to {selectedCompany?.block ? 'unblock' : 'block'} {selectedCompany?.fullname}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={async () => {
                if (!selectedCompany) return;
                try {
                  if (selectedCompany.block) {
                    // Unblock user
                    await axios.put(`http://localhost:4000/api/admin/unblockCompany/${selectedCompany._id}`);
                  } else {
                    // Block user
                    await axios.put(`http://localhost:4000/api/admin/blockCompany/${selectedCompany._id}`);
                  }
                  // Update the user state to reflect the change
                  setCompanies((prev: any) => prev.map((company: any) => 
                    company._id === selectedCompany._id ? { ...company, block: !company.block } : company
                  ));
                  toast.success(`Company ${selectedCompany.block ? 'unblocked' : 'blocked'} successfully`);
                } catch (error) {
                  toast.error('Failed to update user status');
                  console.error(error);
                } finally {
                  setIsDialogOpen(false);
                }
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

  );
}