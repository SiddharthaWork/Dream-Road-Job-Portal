"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react";
import axios from "axios";
import AppliedJobCard from "./AppliedJobCard";
import { useRouter } from "next/navigation";

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
  return (
    <div className="bg-[#f8f9fa]">
      <div className="min-h-screen w-full max-w-7xl mx-auto">
        <main className="container mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Jobs</h1>
            <p className="text-gray-600">Manage your job applications and shortlisted positions</p>
          </div>

          <Tabs defaultValue="applied" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-full">
              <TabsTrigger value="applied" className="text-lg py-3">
                Applied Jobs
              </TabsTrigger>
              <TabsTrigger value="shortlisted" className="text-lg py-3">
                Shortlisted
              </TabsTrigger>
            </TabsList>

            <TabsContent value="applied">
              <div className="flex flex-col gap-4">
                {loading ? (
                  <p>Loading...</p>
                ) : appliedJobs.length === 0 ? (
                  <p>No applied jobs found.</p>
                ) : (
                  appliedJobs.map((item) => (
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
                {/* {jobsData.map((job) => (
              <ShortlistTable key={job.id} job={job} />
            ))} */}
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-2xl font-semibold">No Shortlisted Jobs</h1>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
