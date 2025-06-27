"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppliedTable from "./Applied"
import ShortlistTable from "./Shortlist"
import { appliedJobsData, jobsData } from "@/data/mockData"

export default function AppliedShortlistPage() {
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
            {appliedJobsData.map((job) => (
              <AppliedTable key={job.id} job={job} />
            ))}
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
