'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ExternalLink, Eye, Mail, MapPin, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AppProvider } from '@/contexts/AppContext';
import { format } from 'date-fns';

const Applicants = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mock data since context is not available
  const jobs: any[] = [];
  const allApplicants: any[] = [];
  const shortlistedApplicants: any[] = [];

  const toggleShortlist = (id: string) => {
    console.log('Toggle shortlist for:', id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted':
        return 'bg-purple-100 text-purple-800';
      case 'interviewed':
        return 'bg-orange-100 text-orange-800';
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApplicants = allApplicants.filter((applicant: any) => {
    const job = jobs.find((j: any) => j.id === applicant.jobId);
    const jobTitle = job?.title || '';
    
    const matchesSearch = applicant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter;
    const matchesJob = jobFilter === 'all' || applicant.jobId === jobFilter;
    return matchesSearch && matchesStatus && matchesJob;
  });

  const uniqueJobs = jobs.filter((job: any) => job.applicants && job.applicants.length > 0);

  const renderApplicantRow = (applicant: any) => {
    const job = jobs.find((j: any) => j.id === applicant.jobId);
    
    return (
      <TableRow key={applicant.id}>
        <TableCell>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {applicant.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{applicant.name}</div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {applicant.email}
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div>
            <div className="font-medium">{job?.title || 'Unknown Job'}</div>
            <div className="text-sm text-gray-500">{job?.location}</div>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-1 text-sm">
            <Calendar className="h-3 w-3" />
            {format(applicant.appliedDate, 'MMM d, yyyy')}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex gap-2">
            <Badge className={getStatusColor(applicant.status)}>
              {applicant.status}
            </Badge>
            {applicant.isShortlisted && (
              <Badge className="bg-green-100 text-green-800">
                <Star className="h-3 w-3 mr-1" />
                Shortlisted
              </Badge>
            )}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
            onClick={() => router.push(`/employer/dashboard/applicants/${applicant.id}`)}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button 
              variant={applicant.isShortlisted ? "default" : "outline"}
              size="sm"
              onClick={() => toggleShortlist(applicant.id)}
            >
              <Star className={`h-4 w-4 ${applicant.isShortlisted ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Applicants</h2>
        <p className="text-muted-foreground">Manage and review job applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{allApplicants.length}</div>
            <p className="text-sm text-muted-foreground">Total Applicants</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">
              {allApplicants.filter((a: any) => a.status === 'new').length}
            </div>
            <p className="text-sm text-muted-foreground">New Applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{shortlistedApplicants.length}</div>
            <p className="text-sm text-muted-foreground">Shortlisted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">
              {allApplicants.filter((a: any) => a.status === 'interviewed').length}
            </div>
            <p className="text-sm text-muted-foreground">Interviewed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search applicants by name, email, or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={jobFilter} onValueChange={setJobFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {uniqueJobs.map((job: any) => (
                  <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="interviewed">Interviewed</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applicants Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Applicants ({filteredApplicants.length})</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted ({shortlistedApplicants.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Applicants ({filteredApplicants.length})</CardTitle>
              <CardDescription>Review and manage job applications</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredApplicants.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Job Applied</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplicants.map(renderApplicantRow)}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <Star className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No applicants found</h3>
                  <p className="text-gray-500">
                    {searchTerm || statusFilter !== 'all' || jobFilter !== 'all'
                      ? 'Try adjusting your search or filters.' 
                      : 'No applications have been received yet.'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shortlisted">
          <Card>
            <CardHeader>
              <CardTitle>Shortlisted Candidates ({shortlistedApplicants.length})</CardTitle>
              <CardDescription>Candidates you've marked for further consideration</CardDescription>
            </CardHeader>
            <CardContent>
              {shortlistedApplicants.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Job Applied</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shortlistedApplicants.map(renderApplicantRow)}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <Star className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No shortlisted candidates</h3>
                  <p className="text-gray-500">
                    Start shortlisting candidates from the all applicants tab to see them here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Applicants;
