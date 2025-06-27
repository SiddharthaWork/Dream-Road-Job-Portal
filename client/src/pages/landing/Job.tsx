"use client"
import React, { useState } from 'react'
import JobSearch from '../../components/shared/Jobsearch'
import JobListingsDemo from './JobFetch'

const Job = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // Reset to first page when searching
  }

  return (
    <div className='relative w-full h-screen overflow-hidden'>
           <JobSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedExperience={selectedExperience}
              setSelectedExperience={setSelectedExperience}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              onSearch={handleSearch}
            />
        <JobListingsDemo/>
    </div>
  )
}

export default Job