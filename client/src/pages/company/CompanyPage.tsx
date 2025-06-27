"use client"
import React from 'react'
import { CompanyListings } from './CompanyListing'
import { CompaniesPageHeader } from './CompanyPageHeader'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
    { name: "Nepal MNC", count: 612 },
  ]
  
  const locations = [
    { name: "Kathmandu", count: 3490 },
    { name: "Pokhara", count: 1876 },
    { name: "Lalitpur", count: 1654 },
    { name: "Biratnagar", count: 987 },
    { name: "Birgunj", count: 765 },
    { name: "Butwal", count: 654 },
    { name: "Dharan", count: 543 },
  ]
  
  const companies = [
    {
      id: 1,
      name: "F1Soft",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTHH85rqeQFzAwlWQvMpGs5P5jgXAeluwNzA&s",
      rating: 0,
      reviews: 11,
      tags: ["Corporate", "IT Services & Consulting"],
      founded: null,
      employees: null,
    },
    {
      id: 2,
      name: "Leapfrog",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvknAULMIa1Lu9QgyPv7XdWIJ3hklDeskMig&s",
      rating: 4,
      reviews: 96,
      tags: ["Corporate", "Software Development"],
      founded: 2010,
      employees: null,
    },
    {
      id: 3,
      name: "Cedar Gate Technologies",
      logo: "https://www.cedargate.com/wp-content/uploads/2022/01/cedargate-yoast-2022.jpg",
      rating: 3.9,
      reviews: 564,
      tags: ["Foreign MNC", "IT Services & Consulting", "Healthcare"],
      founded: null,
      employees: null,
    },
    {
      id: 4,
      name: "Google",
      logo: "https://yt3.googleusercontent.com/2eI1TjX447QZFDe6R32K0V2mjbVMKT5mIfQR-wK5bAsxttS_7qzUDS1ojoSKeSP0NuWd6sl7qQ=s900-c-k-c0x00ffffff-no-rj",
      rating: 4.5,
      reviews: 1200,
      tags: ["Foreign MNC", "Technology", "Search Engine"],
      founded: 1998,
      employees: "10000+ emp.",
    },
    {
      id: 5,
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
      rating: 4.6,
      reviews: 1500,
      tags: ["Foreign MNC", "Technology", "Software"],
      founded: 1975,
      employees: "10000+ emp.",
    },
    {
      id: 6,
      name: "Info Developers",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73484JT07cWw9hTnLlm4QKer_fkpE3t3eTw&s",
      rating: 4.1,
      reviews: 84,
      tags: ["Corporate", "IT Services & Consulting"],
      founded: 2002,
      employees: null,
    },
    {
      id: 7,
      name: "NCCS Software",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvOZcN0BOWXgH_caHKVbdiRAGsZQsr2FLMew&s",
      rating: 3.8,
      reviews: 112,
      tags: ["Startup", "Software Development"],
      founded: null,
      employees: null,
    },
    {
      id: 8,
      name: "Cloco Nepal",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdxDFw67ruCx2iIthYOGW-5zWY7-BC6M2naQ&s",
      rating: 3.7,
      reviews: 15,
      tags: ["Startup", "IT Services & Consulting", "Fintech"],
      founded: null,
      employees: null,
    }
  ];
  
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
    const router = useRouter()
  
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
      router.push(`/company/${company.id}`)
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