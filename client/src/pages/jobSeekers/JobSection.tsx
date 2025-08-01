"use client"

import { Job } from "@/types/job"
import axios from "axios";
import { useEffect, useState } from "react";
import RecomendJobCard from "./RecomendJobCard"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface RecommendedJob extends Job {
  similarity: number;
}

interface BrowseOpportunitiesProps {
  onJobClick?: any
}

export default function RecommendedJobs({
  onJobClick,
}: BrowseOpportunitiesProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobsState, setJobs] = useState<RecommendedJob[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [profileStatus, setProfileStatus] = useState<any>(null);
  const jobsPerPage = 5;

  useEffect(() => {
    // Check if profile is completed
    const checkProfile = localStorage.getItem("profile");
    if (checkProfile) {
      setProfileStatus(JSON.parse(checkProfile));
    }
  }, []);

  useEffect(() => {
    if (!profileStatus) {
      setLoading(false);
      return;
    }

    const fetchRecommendations = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID not found");
        }

        const response = await axios.get(
          `http://localhost:4000/api/user/recommendations/${userId}`
        );
        const data = response.data;
        console.log(data,"data here is the recommendation");

        if (data.success) {
          setJobs(data.data);
        } else {
          setError(data.message || "Failed to fetch recommendations");
        }
      } catch (err) {
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [profileStatus]);

  // Filter jobs with similarity > 0
  const filteredJobs = Array.isArray(jobsState) ? jobsState.filter(job => job.similarity > 0.3) : [];

  console.log(filteredJobs,"filteredJobs");

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>;
  }

  if (error) {
    return <div>
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>;
  }

  if (!profileStatus) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Recommended Jobs</h2>
        </div>
        <div className="bg-[#255cf4] text-white p-4 rounded-lg font-bold text-center">Please complete your profile to see job recommendations.</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">Recommended Jobs</h2>
        </div>
        <Badge variant="secondary" className="bg-gradient-to-br from-[#255cf4] to-sky-500  w-fit h-8 text-lg text-white font-medium">
            <Icon icon="game-icons:pointing" />
           {filteredJobs.length} Jobs that match your profile
          </Badge>
      </div>

      {/* Map through current jobs */}
      {currentJobs.map((job) => (
        <RecomendJobCard
          key={job._id}
          job={job}
          onJobClick={() => onJobClick(job._id)}
        />
      ))}

      {/* Pagination */}
      <div className="flex justify-end gap-2">
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeft/>
        </Button>
        <Button
        className="bg-[#255cf4] text-white hover:none"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastJob >= filteredJobs.length}
        >
          <ArrowRight/>
        </Button>
      </div>
    </div>
  );
}
