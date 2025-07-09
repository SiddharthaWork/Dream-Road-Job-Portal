import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import JobCard from './JobCard';
import { Job } from '@/types/job';
import { useRouter } from 'next/navigation';

interface BrowseOpportunitiesProps {
  onJobClick: (jobId: string) => void;
}

const BrowseOpportunities: React.FC<BrowseOpportunitiesProps> = ({ 
  onJobClick, 
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const jobsPerPage = 10;

  const industries = [
    "All",
    "Engineering",
    "Product",
    "Design",
    "Marketing",
  
  ];

  const handleIndustryChange = (industry: string) => {
    if (industry === "All") {
      setSelectedIndustry(null);
    } else {
      setSelectedIndustry(industry === selectedIndustry ? null : industry);
    }
    setCurrentPage(1);
  };

  const filteredJobs = selectedIndustry 
    ? jobs.filter(job => job?.department === selectedIndustry)
    : jobs;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/job/getalljobs');
        if (response.data.success) {
          setJobs(response.data.data);
          console.log("here is the jobs", response.data.data)
        } else {
          setError('Failed to fetch jobs');
        }
      } catch (err) {
        setError('Failed to connect to server');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Browse Opportunities</h2>
          <div className="animate-pulse h-8 w-32 bg-gray-200 rounded-md"></div>
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse h-24 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Browse Opportunities</h2>
        </div>
        <div className="text-red-500 p-4 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Browse Opportunities</h2>
        </div>


      <div className="flex space-x-2 bg-gray-100 p-2 rounded-xl">
        {industries.map((industry) => (
          <Button 
            key={industry}
            variant={selectedIndustry === industry ? "default" : "outline"}
            size="sm"
            className="w-fit bg-white text-black hover:bg-gray-50 cursor-pointer"
            onClick={() => handleIndustryChange(industry)}
          >
            {industry}
          </Button>
        ))}
      </div>
      </div>
      <div className="space-y-3">
        {currentJobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onJobClick={() => onJobClick(job._id)}
          />
        ))}
      </div>

{/* 
      <div className="pagination flex items-center justify-end">
        {[...Array(Math.ceil(filteredJobs.length / jobsPerPage))].map((_, i) => (
          <Button 
            key={i}
            variant={currentPage === i + 1 ? "default" : "outline"}
            className="w-fit bg-white text-black hover:bg-gray-50"
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
            
          </Button>
        ))}
      </div> */}

      <Button 
        variant="outline" 
        className="w-full bg-white text-black hover:bg-gray-50"
        onClick={() => router.push('/job')}
      >
        View All
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default BrowseOpportunities;
