"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react";
import axios from "axios";
import AppliedJobCard from "./AppliedJobCard";
import { useRouter } from "next/navigation";
import ShortlistJobCard from "./Shortlist";
import RejectedJobCard from "./RejectedJobCard";

export default function AppliedShortlistPage() {
  const router = useRouter();
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error("User ID not found in localStorage");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/api/application/getAppliedJobUsers/${userId}`
        );
        console.log(response.data)
        const applications = response.data.application;
        const jobsWithDates = applications.map((app: any) => ({
          job: app.job,
          appliedDate: app.createdAt,
          status: app.status
        }));
        setAppliedJobs(jobsWithDates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const onJobClick = (id: string) => {
    console.log(id);
  };

  const pendingJobs = appliedJobs.filter(item => item.status === 'pending');
  const shortlistedJobs = appliedJobs.filter(item => item.status === 'shortlisted');
  const rejectedJobs = appliedJobs.filter(item => item.status === 'rejected'); // Filter rejected jobs

  return (
    <div className="bg-[#f8f9fa]">
      <div className="min-h-screen w-full max-w-7xl mx-auto">
        <main className="container mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Jobs</h1>
            <p className="text-gray-600">Manage your job applications and shortlisted positions</p>
          </div>

          <Tabs defaultValue="applied" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-full">
              <TabsTrigger value="applied" className="text-lg py-3">
                Applied Jobs
              </TabsTrigger>
              <TabsTrigger value="shortlisted" className="text-lg py-3">
                Shortlisted
              </TabsTrigger>
              <TabsTrigger value="rejected" className="text-lg py-3">
                Rejected
              </TabsTrigger>
            </TabsList>

            <TabsContent value="applied">
              <div className="flex flex-col gap-4">
                {loading ? (
                  <p>Loading...</p>
                ) : pendingJobs.length === 0 ? (
                  <p>No applied jobs found.</p>
                ) : (
                  pendingJobs.map((item) => (
                    <AppliedJobCard
                      key={item.job._id}
                      job={item.job}
                      onJobClick={() => router.push(`/job/${item.job._id}`)}
                      appliedDate={item.appliedDate}
                      status={item.status}
                    />
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="shortlisted">
              <div className="flex flex-col gap-4">
                {loading ? (
                  <p>Loading...</p>
                ) : shortlistedJobs.length === 0 ? (
                  <p>No shortlisted jobs found.</p>
                ) : (
                  shortlistedJobs.map((item) => (
                    <ShortlistJobCard 
                      key={item.job._id}
                      job={item.job}
                      onJobClick={() => router.push(`/job/${item.job._id}`)}
                      appliedDate={item.appliedDate}
                      status={item.status}
                    />
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="rejected">
              <div className="flex flex-col gap-4">
                {loading ? (
                  <p>Loading...</p>
                ) : rejectedJobs.length === 0 ? (
                  <p>No rejected jobs found.</p>
                ) : (
                  rejectedJobs.map((item) => (
                    <RejectedJobCard 
                      key={item.job._id}
                      job={item.job}
                      onJobClick={() => router.push(`/job/${item.job._id}`)}
                      appliedDate={item.appliedDate}
                      status={item.status}
                    />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
