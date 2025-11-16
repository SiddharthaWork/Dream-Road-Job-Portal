"use client"

import JobApplicationModal from "@/components/modal/job-application-modal"
import ProfileCompletionModal from "@/components/modal/profile-completion-modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from 'date-fns';
import {
  MapPin,
  Clock,
  Star,
  Bookmark,
  Share2,
  Building2,
  DollarSign,
  Award,
  TrendingUp,
  Heart,
  Briefcase,
  Calendar,
  ArrowLeft,
} from "lucide-react"
import { useState, useEffect } from 'react';
import { useParams } from "next/navigation"
import axios from 'axios';
import { Job } from '@/types/job';
import Loading from "@/components/shared/loading"
import Link from "next/link"
import { div } from "motion/react-client"

export default function AdminJobOverview() {
  const params = useParams<any>();
  const id = params?.id;

  useEffect(() => {
    if (!id) {
      return;
    }
  }, [id]);

  const [job, setJob] = useState<any>(null);
  const [similarJobs, setSimilarJobs] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)
  const [appliedUsers, setAppliedUsers] = useState<any>(null)
  const [profileCompleted, setProfileCompleted] = useState<boolean>(false)
  const [showProfileCompletionModal, setShowProfileCompletionModal] = useState(false)

  // so the appliedUsersContain bollean
  
  useEffect(() => {
    const profile = localStorage.getItem('profile');
    // Properly handle 'false' string from localStorage
    setProfileCompleted(profile === 'true');
  }, [])
  
  console.log(profileCompleted,"profileCompleted");

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/job/getjobbyid/${id}`);
      if (response.data.success) {
        setJob(response.data.data);
        setSimilarJobs(response.data.similarJobs);
        setAppliedUsers(response.data.applied)
      } else {
        setError('Failed to fetch job');
      }
    } catch (err) {
      setError('An error occurred while fetching the job');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchJob();
  }, []);

  const handleApplied = () => {
    setApplied(true);
    setApplying(false);
  }

  const handleApplyClick = () => {
    if (!profileCompleted) {
      setShowProfileCompletionModal(true);
      return;
    }
    setApplying(true);
  };

  const refreshJobData = () => {
    fetchJob();
  };

  if (loading) {
    return <div>
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>;
  }

  // Format the salary range
  const formattedSalary = `NPR ${job?.salaryMin.toLocaleString()}-${job?.salaryMax.toLocaleString()} /month`;

  // Format the posted date
  const postedDate = new Date(job?.createdAt);
  const daysAgo = Math.floor((Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24));
  const postedText = daysAgo === 0 ? 'Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;

  // Job highlights - we'll split the description by newline and take the lines after "Job Highlights"
  // const jobHighlights = job.description.split('\n').filter(line => line.trim() !== '' && !line.includes('Job Description'));
  const jobHighlights = job?.description

  // Key skills
  const keySkills = job?.skills;
  

  return (
    <div className="w-full h-full bg-gray-50">
      

      {applying && profileCompleted && (
        <div className=" bg-black/10">
        <JobApplicationModal
          jobId={job._id}
          userId={localStorage.getItem('userId') || ''}
          onClose={() => setApplying(false)}
          onApplied={handleApplied}
          onSuccess={refreshJobData}
        />
        </div>
      )}
      {showProfileCompletionModal && !profileCompleted && (
        <ProfileCompletionModal
          onClose={() => setShowProfileCompletionModal(false)}
        />
      )}

      <div className="min-h-screen bg-gray-50 w-full max-w-7xl mx-auto py-2">

        <div className="container mx-auto py-6">
            {/* add back button here */}
            <Link href="/admin/jobs" className="flex items-center mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-items-center">
            

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Job Header */}
              <Card>
                <CardContent className="">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold mb-2">{job?.title}</h1>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <div className="w-8 h-8 overflow-hidden">
                            {/* Company logo - not provided in API */}
                            <img src={job?.createdBy?.logo} alt="Company logo" className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium ml-2">{job?.createdBy?.name}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gray-500" />
                          <span>{job?.type}</span>
                        </div>
                        <div className="flex items-center gap-2 w-full min-w-[25rem]">
                          <span>{formattedSalary}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-8">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{job?.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    {/* <div className="flex items-center gap-4">
                      <span>Posted: {formatDistanceToNow(new Date(job?.createdAt), { addSuffix: true }).replace("about ", "")}</span>
                      <span>Applicants: {job?.applications.length}</span>
                    </div> */}
                  </div>
                </CardContent>
              </Card>

              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Job Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Job Highlights</h3>
                    <span className="text-sm text-gray-700">{jobHighlights}</span>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Benefits</h3>
                    <p className="text-sm text-gray-700">{job?.benefits}</p>
                  </div>


                  <div>
                    <h3 className="font-semibold mb-2">Location:</h3>
                    <p className="text-sm text-gray-700">{job?.location}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Roles & Responsibilities</h3>
                    <span className="text-sm text-gray-700">{job?.requirements}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Key Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Skills</CardTitle>
                  <p className="text-sm text-gray-600">Skills highlighted with '*' are preferred keyskills</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {keySkills?.map((skill: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
