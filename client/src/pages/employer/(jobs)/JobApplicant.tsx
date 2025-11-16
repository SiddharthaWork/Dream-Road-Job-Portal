'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Mail, Star, ExternalLink, Users, Eye } from 'lucide-react';
import { AppProvider, useApp } from '@/contexts/AppContext';
import { format, formatDistanceToNow } from 'date-fns';


interface Applicant {
  id: string;
  name: string;
  email: string;
  status: string;
  resume: string;
  coverLetter: string;
  createdAt: string;
}

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string;
  benefits: string;
  skills: string;
  deadline: string;
  createdAt: string;
}

const JobApplicantsContent = () => {
  const params = useParams();
  // const jobId = params?.id as string;
  const jobId = params?.id;
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [bestMatches, setBestMatches] = useState<any[]>([]);
  const [loadingBestMatches, setLoadingBestMatches] = useState(true);
  
  // Use the hook safely within the provider
  const { getJob, getApplicantsForJob, toggleShortlist, updateApplicant } = useApp();

  useEffect(() => { 
    const fetchData = async () => {
      if (!jobId) {
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/application/getApplicants/${jobId}`
        );
        
        if (response.data.success) {
          // Map API response to component structure
          const jobData = response.data.job;
          console.log("jobData", jobData)
          setJob({
            id: jobData._id,
            title: jobData.title,
            department: jobData.department,
            location: jobData.location,
            type: jobData.type,
            experience: jobData.experience,
            salaryMin: jobData.salaryMin,
            salaryMax: jobData.salaryMax,
            description: jobData.description,
            requirements: jobData.requirements,
            benefits: jobData.benefits,
            skills: jobData.skills,
            deadline: jobData.deadline,
            createdAt: jobData.createdAt,
          });
          console.log("jobData", jobData)
          
          // Map applicants data
          const applicantsData = jobData.applications.map((app: any) => ({
            id: app._id,
            name: app.user.fullname,
            email: app.user.email,
            status: app.status,
            resume: app.resume,
            coverLetter: app.coverLetter,
            createdAt: app.createdAt,
            userId: app.user._id,
            profilePicture: app.user.profile?.profilePicture,  
          }));
          
          setApplicants(applicantsData);
        }
      } catch (error) {
        console.error('Error fetching applicants:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBestMatches = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/application/getRankedApplicants/${jobId}`
        );
        if (response.data.job && response.data.job.applications) {
          setBestMatches(response.data.job.applications);
        }
      } catch (error) {
        console.error('Failed to fetch best matches:', error);
      } finally {
        setLoadingBestMatches(false);
      }
    };

    fetchData();
    fetchBestMatches();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading...</h3>
            <p className="text-gray-500 mb-4">
              Please wait while we load the applicants.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Job not found</h3>
            <p className="text-gray-500 mb-4">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.push('/employer/dashboard/jobs')}>
              Back to Jobs
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  console.log(filteredApplicants);

  const shortlistedApplicants = applicants.filter(applicant => applicant.status === 'shortlisted');

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

  const renderBestMatchRow = (application: any) => (
    <TableRow key={application._id}>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage 
              src={application?.user?.profile?.profilePicture || '/placeholder-user.jpg'} 
              alt={application?.user?.fullname}
            />
            <AvatarFallback>
              {application?.user?.fullname?.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{application.user?.fullname}</div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
            <Mail className="h-3 w-3" />
              {application.user?.email}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="font-medium">
          {(application.applicantScore * 100).toFixed(0)}%
        </div>
      </TableCell>
      {/* <TableCell>
        {application.summary?.strengths?.join(', ') || 'N/A'}
        N/A
      </TableCell> */}
      <TableCell>
        {new Date(application.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
      </TableCell>
      <TableCell>
      <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push(`/employer/dashboard/applicants/profile/${application?.user?._id}?jobid=${jobId}`)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push(`/employer/dashboard/applicants/profile/${application?.user?._id}?jobid=${jobId}`)}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );

  const renderApplicantRow = (applicant: any) => (
    <TableRow key={applicant.id}>
      <TableCell>
        <div className="flex items-center gap-3">
        <Avatar>
            <AvatarImage 
              src={applicant?.profilePicture || '/placeholder-user.jpg'} 
              alt={applicant?.name}
            />  
            <AvatarFallback>
              {applicant?.name?.split(' ').map((n: string) => n[0]).join('')}
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
        <div className="text-sm">
         {format(new Date(applicant.createdAt), 'MMM d, yyyy h:mm a')}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Badge className={getStatusColor(applicant.status)}>
            {applicant.status}
          </Badge>
          {applicant.status === 'shortlisted' && (
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
            onClick={() => router.push(`/employer/dashboard/applicants/profile/${applicant?.userId}?jobid=${jobId}`)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push(`/employer/dashboard/applicants/profile/${applicant?.userId}?jobid=${jobId}`)}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
            onClick={() => router.push('/employer/dashboard/jobs')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Applicants for {job.title}</h2>
          <p className="text-muted-foreground">{applicants.length} total applications</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{applicants.length}</div>
            <p className="text-sm text-muted-foreground">Total Applications</p>
          </CardContent>
        </Card>
        {/* <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">
              {applicants.filter(a => a.status === 'new').length}
            </div>
            <p className="text-sm text-muted-foreground">New Applications</p>
          </CardContent>
        </Card> */}
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{shortlistedApplicants.length}</div>
            <p className="text-sm text-muted-foreground">Shortlisted</p>
          </CardContent>
        </Card>
        {/* <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">
              {applicants.filter(a => a.status === 'interviewed').length}
            </div>
            <p className="text-sm text-muted-foreground">Interviewed</p>
          </CardContent>
        </Card> */}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search applicants by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {/* <SelectItem value="new">New</SelectItem> */}
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
      <Tabs defaultValue="bestmatches" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Applicants ({filteredApplicants.length})</TabsTrigger>
          <TabsTrigger value="bestmatches">Best Matches ({bestMatches.length})</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted ({shortlistedApplicants.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="bestmatches">
          <Card>
            <CardHeader>
              <CardTitle>Best Matches ({bestMatches.length})</CardTitle>
              <CardDescription>Top ranked applicants based on job requirements</CardDescription>
            </CardHeader>
            <CardContent>
              {bestMatches.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Match Score</TableHead>
                      {/* <TableHead>Strengths</TableHead> */}
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bestMatches.map(renderBestMatchRow)}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No best matches found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

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
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No applicants found</h3>
                  <p className="text-gray-500">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filters.' 
                      : 'No applications have been received for this job yet.'}
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

// Main component wrapped with AppProvider for SSR compatibility
const JobApplicants = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading...</h3>
            <p className="text-gray-500 mb-4">
              Please wait while we load the applicants.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <AppProvider>
      <JobApplicantsContent />
    </AppProvider>
  );
};

export default JobApplicants;