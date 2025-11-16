import JobCard, { type JobListing } from "@/components/job-card-landing"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";

export default function JobListingsDemo() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/job/getlatestjobs`);
        const result = await response.json();
        if (result.success) {
          const jobsData = result.data.map((job: any) => ({
            id: job._id,
            title: job.title,
            company: job.createdBy.name,
            location: job.location,
            jobType: job.type,
            salary: job.salaryMin,
            postedDate: new Date(job.createdAt).toLocaleDateString(),
            companyLogo: job.createdBy.logo,
          }));
          setJobs(jobsData);
        } else {
          setError(result.message || 'Failed to fetch jobs');
        }
      } catch (err) {
        setError('An error occurred while fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="min-h-screen py-16 relative max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
              <div className="h-4 bg-gray-200 rounded-lg mt-4"></div>
              <div className="h-4 bg-gray-200 rounded-lg mt-4"></div>
              <div className="h-4 bg-gray-200 rounded-lg mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen py-16 relative max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job}  />
          ))}
        </div>
        <div className="absolute z-20 bottom-10 h-2/3 bg-gradient-to-b from-transparent via-white to-white/80 w-full flex gap-4 flex-col justify-center items-center">
          <h1 className="text-4xl font-bold tracking-tighter text-black/80">Log in to explores <span className="text-[#255cf4] "> 1000+</span> Jobs!</h1>
          <button onClick={() => router.push('/login')} className="bg-[#255cf4]  text-white px-6 h-10 rounded-md text-lg tracking-tight flex items-center gap-2 cursor-pointer font-semibold">
            <Icon icon="ic:outline-lock" />
            Log In Now
          </button>
        </div>
      </div>
    </div>
  );
}