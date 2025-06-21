"use client"
import React from 'react'
import { CompanyListings } from './CompanyListing'
import { CompaniesPageHeader } from './CompanyPageHeader'
import { useState } from 'react'

const categories = [
    { name: "MNCs", count: "2.1K+", companies: "Companies" },
    { name: "Product", count: "1.2K+", companies: "Companies" },
    { name: "Banking & Fina...", count: "390", companies: "Companies" },
    { name: "Hospitality", count: "76", companies: "Companies" },
    { name: "Fintech", count: "129", companies: "Companies" },
  ]
  
  const companyTypes = [
    { name: "Corporate", count: 4487 },
    { name: "Foreign MNC", count: 1528 },
    { name: "Startup", count: 670 },
    { name: "Indian MNC", count: 612 },
  ]
  
  const locations = [
    { name: "Bengaluru", count: 3490 },
    { name: "Delhi / NCR", count: 3403 },
    { name: "Mumbai (All Areas)", count: 2901 },
    { name: "Hyderabad", count: 2431 },
    { name: "Pune", count: 1876 },
    { name: "Chennai", count: 1654 },
    { name: "Kolkata", count: 987 },
    { name: "Ahmedabad", count: 765 },
  ]
  
  const companies = [
    {
      id: 1,
      name: "Yashco Systems",
      logo: "/placeholder.svg?height=40&width=40",
      rating: 0,
      reviews: 11,
      tags: ["Corporate", "IT Services & Consulting"],
      founded: null,
      employees: null,
    },
    {
      id: 2,
      name: "Prerana Motors",
      logo: "/placeholder.svg?height=40&width=40",
      rating: 4,
      reviews: 96,
      tags: ["Corporate", "Automobile", "Manufacturing"],
      founded: 1991,
      employees: null,
    },
    {
      id: 3,
      name: "ThoughtWorks",
      logo: "/placeholder.svg?height=40&width=40",
      rating: 3.9,
      reviews: 564,
      tags: ["Foreign MNC", "IT Services & Consulting", "Software Development"],
      founded: null,
      employees: null,
    },
    {
      id: 4,
      name: "66degrees",
      logo: "/placeholder.svg?height=40&width=40",
      rating: 0,
      reviews: 24,
      tags: ["Corporate", "IT Services & Consulting"],
      founded: null,
      employees: null,
    },
    {
      id: 5,
      name: "Frog Cellsat",
      logo: "/placeholder.svg?height=40&width=40",
      rating: 4,
      reviews: 112,
      tags: ["Design", "Technology"],
      founded: 1993,
      employees: "51-200 emp.",
    },
    {
      id: 6,
      name: "GSK Solutions India",
      logo: "/placeholder.svg?height=40&width=40",
      rating: 0,
      reviews: 6,
      tags: ["Corporate", "IT Services & Consulting"],
      founded: null,
      employees: null,
    },
    {
      id: 7,
      name: "MoEngage",
      logo: "/placeholder.svg?height=40&width=40",
      rating: 3.9,
      reviews: 112,
      tags: ["Startup", "Emerging Technologies", "SaaS"],
      founded: null,
      employees: null,
    },
    {
      id: 8,
      name: "Prolim",
      logo: "/placeholder.svg?height=40&width=40",
      rating: 3.9,
      reviews: 84,
      tags: ["Foreign MNC", "IT Services & Consulting"],
      founded: null,
      employees: null,
    },
    {
      id: 9,
      name: "Infogain",
      logo: "/placeholder.svg?height=40&width=40",
      rating: 3.6,
      reviews: 1200,
      tags: ["Foreign MNC", "IT Services & Consulting", "Digital Transformation"],
      founded: null,
      employees: null,
    },
    {
      id: 10,
      name: "SAP Fioneer",
      logo: "/placeholder.svg?height=40&width=40",
      rating: 3.7,
      reviews: 15,
      tags: ["Startup", "IT Services & Consulting", "Fintech"],
      founded: null,
      employees: null,
    },
  ]
  
  const topCompanies = [
    {
      id: 1,
      name: "Google",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Leading technology company focused on search, cloud computing, and AI innovation.",
      industry: "Technology",
      employees: "100K+",
      rating: 4.4,
      openJobs: 1250,
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Global technology corporation developing software, services, and solutions.",
      industry: "Technology",
      employees: "200K+",
      rating: 4.3,
      openJobs: 980,
    },
    {
      id: 3,
      name: "Amazon",
      logo: "/placeholder.svg?height=80&width=80",
      description: "E-commerce and cloud computing giant with diverse business operations.",
      industry: "E-commerce",
      employees: "1.5M+",
      rating: 4.1,
      openJobs: 2100,
    },
    {
      id: 4,
      name: "Apple",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Innovative technology company designing consumer electronics and software.",
      industry: "Technology",
      employees: "150K+",
      rating: 4.5,
      openJobs: 750,
    },
    {
      id: 5,
      name: "Meta",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Social technology company building the next generation of social connection.",
      industry: "Social Media",
      employees: "80K+",
      rating: 4.2,
      openJobs: 650,
    },
    {
      id: 6,
      name: "Netflix",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Entertainment company revolutionizing how the world watches TV and movies.",
      industry: "Entertainment",
      employees: "12K+",
      rating: 4.3,
      openJobs: 320,
    },
  ]

const CompanyPage = () => {
    const [selectedCompanyTypes, setSelectedCompanyTypes] = useState<string[]>([])
    const [selectedLocations, setSelectedLocations] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
  
    const handleCompanyTypeChange = (type: string, checked: boolean) => {
      setIsLoading(true)
      if (checked) {
        setSelectedCompanyTypes([...selectedCompanyTypes, type])
      } else {
        setSelectedCompanyTypes(selectedCompanyTypes.filter((t) => t !== type))
      }
      // Simulate API call
      setTimeout(() => setIsLoading(false), 500)
    }
  
    const handleLocationChange = (location: string, checked: boolean) => {
      setIsLoading(true)
      if (checked) {
        setSelectedLocations([...selectedLocations, location])
      } else {
        setSelectedLocations(selectedLocations.filter((l) => l !== location))
      }
      // Simulate API call
      setTimeout(() => setIsLoading(false), 500)
    }
  
    const handleCategoryClick = (category: any) => {
      console.log("Category clicked:", category)
      // Implement category filtering logic here
    }
  
    const handleCompanyClick = (company: any) => {
      console.log("Company clicked:", company)
      // Navigate to company detail page
    }
  
    const handleTopCompanyClick = (company: any) => {
      console.log("Top company clicked:", company)
      // Navigate to company detail page
    }
  
    // Filter companies based on selected filters
    const filteredCompanies = companies.filter((company) => {
      const matchesCompanyType =
        selectedCompanyTypes.length === 0 || selectedCompanyTypes.some((type) => company.tags.includes(type))
  
      // For demo purposes, we'll assume location filtering based on company name
      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.some((location) => company.name.toLowerCase().includes(location.toLowerCase().split(" ")[0]))
  
      return matchesCompanyType && matchesLocation
    })

  return (
    <div className='w-full h-full bg-[#f8f9fa]'>
        <CompaniesPageHeader
        title="Top companies hiring now"
        categories={categories}
        topCompanies={topCompanies}
        onCategoryClick={handleCategoryClick}
        onTopCompanyClick={handleTopCompanyClick}
      />

        <CompanyListings
        companies={filteredCompanies}
        companyTypes={companyTypes}
        locations={locations}
        totalCount={filteredCompanies.length}
        selectedCompanyTypes={selectedCompanyTypes}
        selectedLocations={selectedLocations}
        onCompanyTypeChange={handleCompanyTypeChange}
        onLocationChange={handleLocationChange}
        onCompanyClick={handleCompanyClick}
        isLoading={isLoading}
      />
    </div>

  )
}

export default CompanyPage