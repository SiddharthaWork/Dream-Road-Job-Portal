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
} from "lucide-react"
import { useState, useEffect } from 'react';
import { useParams } from "next/navigation"
import axios from 'axios';
import { Job } from '@/types/job';
import Loading from "@/components/shared/loading"
import Link from "next/link"
import { div } from "motion/react-client"

export default function JobOverviewPage() {
  const { id } = useParams() as { id: string };

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
      const response = await axios.get(`http://localhost:4000/api/job/getjobbyid/${id}?userId=${localStorage.getItem('userId')}`);
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

      <div className="min-h-screen bg-gray-50 w-full max-w-7xl mx-auto py-6">
        {/* Banner */}
        {/* <div className="relative w-full h-48 overflow-hidden rounded-xl">
          <div className="w-full h-full">
            <img src="https://png.pngtree.com/thumb_back/fh260/background/20201023/pngtree-abstract-geometric-green-background-with-fresh-gradient-banner-image_432556.jpg" alt="Join our talent community" className="w-full h-full object-cover" />
          </div>
        </div> */}

        <div className="container mx-auto py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Similar Jobs (optional) */}
            <div className="lg:col-span-1">
              {/* Similar jobs can be implemented later */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader className="pb-0 mb-0 px-4 py-0 ">
                    <CardTitle className="text-lg font-semibold ">Similar roles you might be interested in</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 ">
                    <ScrollArea className="h-fit pt-0">
                      <div className="space-y-4 p-4">
                        {similarJobs?.map((job: any, index: number) => (
                          <Link href={`/job/${job._id}`} key={index}>
                            <div className="border-b pb-4 last:border-b-2 mt-2 cursor-pointer">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="font-medium text-sm mb-2 line-clamp-2">{job?.title}</h3>
                                  <div className="space-y-1 text-xs text-gray-600">
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      <span>{job?.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span>{job?.type}</span>
                                    </div>
                                    <div className="text-gray-500">{formatDistanceToNow(new Date(job?.createdAt), { addSuffix: true }).replace("about ", "")}</div>
                                  </div>
                                  <Button size="sm" className="mt-2 h-7 text-xs" >
                                    Apply
                                  </Button>

                                </div>
                                <div className="ml-2">
                                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                    {/* <Building2 className="w-4 h-4 text-blue-600" /> */}
                                    <img src={job?.createdBy?.logo} alt={job?.createdBy?.name} className="w-full h-full object-cover" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>

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

                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Bookmark className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button onClick={handleApplyClick} size="sm" disabled={appliedUsers}>
                        {appliedUsers ? 'Applied' : 'Apply'}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <span>Posted: {formatDistanceToNow(new Date(job?.createdAt), { addSuffix: true }).replace("about ", "")}</span>
                      <span>Applicants: {job?.applications.length}</span>
                    </div>
                    <Button variant="link" className="text-blue-600 p-0">
                      Send me jobs like this
                    </Button>
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
