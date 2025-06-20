import JobCard, { type JobListing } from "@/components/job-card"
import { Icon } from "@iconify/react/dist/iconify.js"
const sampleJobs: JobListing[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    jobType: "Full-time",
    salary: 80000,
    postedDate: "2024-06-09",
    isUrgent: true,
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "Design Studio",
    location: "New York, NY",
    jobType: "Remote",
    salary: 80000,
    postedDate: "2024-06-09",
  },
  {
    id: "3",
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Austin, TX",
    jobType: "Hybrid",
    salary: 80000,
    postedDate: "2024-06-09",
  },
  {
    id: "4",
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Seattle, WA",
    jobType: "Full-time",
    salary: 80000,
    postedDate: "2024-06-09",
  },
  {
    id: "5",
    title: "Marketing Specialist",
    company: "Growth Agency",
    location: "Los Angeles, CA",
    jobType: "Part-time",
    salary: 80000,
    postedDate: "2024-06-09",
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Denver, CO",
    jobType: "Contract",
    salary: 80000,
    postedDate: "2024-06-09",
  },

  {
    id: "7",
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Denver, CO",
    jobType: "Contract",
    salary: 80000,
    postedDate: "2024-06-09",
  },
  {
    id: "8",
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Denver, CO",
    jobType: "Contract",
    salary: 80000,
    postedDate: "2024-06-09",
  },
  {
    id: "9",
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Denver, CO",
    jobType: "Contract",
    salary: 80000,
    postedDate: "2024-06-09",
  },
]

export default function JobListingsDemo() {
//   const handleApply = (jobId: string) => {
//     console.log(`Applied to job: NPR{jobId}`)
//     // Handle apply logic here
//   }

//   const handleSave = (jobId: string) => {
//     console.log(`Saved job: NPR{jobId}`)
//     // Handle save logic here
//   }

  return (
    <div className="min-h-screen py-16 relative max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sampleJobs.map((job) => (
            <JobCard key={job.id} job={job}  />
          ))}
        </div>
        <div className="absolute z-20 bottom-10 h-2/3 bg-gradient-to-b from-transparent via-white to-white/80 w-full flex gap-4 flex-col justify-center items-center">
        <h1 className="text-4xl font-bold tracking-tighter text-black/80">Log in to explores <span className="text-[#255cf4] "> 1000+</span> Jobs!</h1>
          <button className="bg-[#255cf4]  text-white px-6 h-10 rounded-md text-lg tracking-tight flex items-center gap-2 cursor-pointer font-semibold">
            <Icon icon="ic:outline-lock" />
            Log In Now
          </button>
        </div>
      </div>
    </div>
  )
}
