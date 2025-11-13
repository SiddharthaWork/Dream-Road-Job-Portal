'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
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
  Calendar,
  Building2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'react-hot-toast';

interface Job {
  _id: string;
  title: string;
  company: string;
  category: string;
  type: string;
  status: string;
  applications: string[];
}

export default function AdminJobPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const router = useRouter();
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);

  const stats = [
    { title: 'Total Jobs', value: jobs.length, change: '+12%', icon: Briefcase, color: 'text-blue-500' },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/getAllJobs');
        if (response.data.success) {
          setJobs(response.data.data);
          setTotalJobs(response.data.data.length);
        } else {
          setError('Failed to fetch jobs');
        }
      } catch (err) {
        setError('Error fetching jobs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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

  const filteredJobs = jobs.filter((job: any) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter;
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesType;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteJob = async () => {
    if (!deleteJobId) return;
    try {
      const response = await axios.delete(`http://localhost:4000/api/admin/deleteJob/${deleteJobId}`);
      if (response.data.success) {
        // Remove the job from the state
        setJobs(jobs.filter((job: any) => job._id !== deleteJobId));
        toast.success('Job deleted successfully');
      } else {
        toast.error('Failed to delete job');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the job');
      console.error(error);
    } finally {
      setDeleteJobId(null);
      setIsDeleteModalOpen(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="">
      <div className="py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
            <p className="text-gray-600 mt-1">Manage and monitor all job postings</p>
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
                    <p className="text-2xl font-bold text-gray-900">{totalJobs}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                    <stat.icon className="h-6 w-6"   />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        {/* Filters and Search */}
        <Card className="mb-6 col-span-3 h-full">
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
              {/* <Select value={statusFilter} onValueChange={setStatusFilter}>
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
              </Button> */}
            </div>
          </CardContent>
        </Card>
        </div>


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
                    <TableHead>Industry</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Posted Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {currentJobs.map((job: any) => (
                    <TableRow key={job._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 border-2 overflow-hidden rounded-xl w-16 h-16" >
                            <img src={job.createdBy?.logo} alt="profile" />
                            </div>
                          <div>
                            <div className="font-medium">{job.title}</div>
                            <div className="text-sm text-gray-500">{job.createdBy?.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{job.createdBy?.industry}</TableCell>
                      <TableCell>
                        <Badge variant="default">{job.type}</Badge>
                      </TableCell>
                      <TableCell>Rs{job.salaryMin} - Rs{job.salaryMax}</TableCell>
                  
                      <TableCell>
                        <Badge variant="destructive">{job?.applications?.length}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(job.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/admin/jobs/${job._id}`)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600" 
                              onClick={() => {
                                setDeleteJobId(job._id);
                                setIsDeleteModalOpen(true);
                              }}
                            >
                              Delete
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
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredJobs.length)} of {filteredJobs.length} results
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastItem >= filteredJobs.length}>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteJob}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}