"use client"
import React from 'react'
import  CompanyListings  from './CompanyListing'
import  CompaniesPageHeader  from './CompanyPageHeader'
import { useState } from 'react'
import { useRouter } from 'next/navigation' 

type Category = {
  name: string;
  count: string;
  companies: string;
};

interface Company {
  _id: string
  name: string
  logo?: string
  industry: string
  email: string
  phoneNumber: string
  createdAt: string
  updatedAt: string
}

type TopCompany = {
  id: number;
  name: string;
  logo: string;
  description: string;
  industry: string;
  employees: string;
  rating: number;
  openJobs: number;
};

const categories = [
    { name: "Technology", count: "2.1K+", companies: "Companies" },
    { name: "Finance", count: "1.2K+", companies: "Companies" },
    { name: "Healthcare", count: "390", companies: "Companies" },
    { name: "Education", count: "76", companies: "Companies" },
    { name: "Retail", count: "129", companies: "Companies" },
    { name: "Manufacturing", count: "129", companies: "Companies" },
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
      _id: "1",
      name: "F1Soft",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTHH85rqeQFzAwlWQvMpGs5P5jgXAeluwNzA&s",
      industry: "IT Services & Consulting",
      email: "info@f1soft.com",
      phoneNumber: "+977 1 4423377",
      createdAt: "2022-01-01T00:00:00.000Z",
      updatedAt: "2022-01-01T00:00:00.000Z",
    },
    {
      _id: "2",
      name: "Leapfrog",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvknAULMIa1Lu9QgyPv7XdWIJ3hklDeskMig&s",
      industry: "Software Development",
      email: "info@leapfrog.com",
      phoneNumber: "+977 1 4413377",
      createdAt: "2010-01-01T00:00:00.000Z",
      updatedAt: "2010-01-01T00:00:00.000Z",
    },
    {
      _id: "3",
      name: "Cedar Gate Technologies",
      logo: "https://www.cedargate.com/wp-content/uploads/2022/01/cedargate-yoast-2022.jpg",
      industry: "IT Services & Consulting, Healthcare",
      email: "info@cedargate.com",
      phoneNumber: "+977 1 4423377",
      createdAt: "2022-01-01T00:00:00.000Z",
      updatedAt: "2022-01-01T00:00:00.000Z",
    },
    {
      _id: "4",
      name: "Google",
      logo: "https://yt3.googleusercontent.com/2eI1TjX447QZFDe6R32K0V2mjbVMKT5mIfQR-wK5bAsxttS_7qzUDS1ojoSKeSP0NuWd6sl7qQ=s900-c-k-c0x00ffffff-no-rj",
      industry: "Technology, Search Engine",
      email: "info@google.com",
      phoneNumber: "+1 650 253 0000",
      createdAt: "1998-01-01T00:00:00.000Z",
      updatedAt: "1998-01-01T00:00:00.000Z",
    },
    {
      _id: "5",
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
      industry: "Technology, Software",
      email: "info@microsoft.com",
      phoneNumber: "+1 425 882 8080",
      createdAt: "1975-01-01T00:00:00.000Z",
      updatedAt: "1975-01-01T00:00:00.000Z",
    },
    {
      _id: "6",
      name: "Info Developers",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73484JT07cWw9hTnLlm4QKer_fkpE3t3eTw&s",
      industry: "IT Services & Consulting",
      email: "info@infodevelopers.com",
      phoneNumber: "+977 1 4413377",
      createdAt: "2002-01-01T00:00:00.000Z",
      updatedAt: "2002-01-01T00:00:00.000Z",
    },
    {
      _id: "7",
      name: "NCCS Software",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvOZcN0BOWXgH_caHKVbdiRAGsZQsr2FLMew&s",
      industry: "Software Development",
      email: "info@nccs.com",
      phoneNumber: "+977 1 4423377",
      createdAt: "2022-01-01T00:00:00.000Z",
      updatedAt: "2022-01-01T00:00:00.000Z",
    },
    {
      _id: "8",
      name: "Cloco Nepal",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdxDFw67ruCx2iIthYOGW-5zWY7-BC6M2naQ&s",
      industry: "IT Services & Consulting, Fintech",
      email: "info@cloco.com",
      phoneNumber: "+977 1 4413377",
      createdAt: "2022-01-01T00:00:00.000Z",
      updatedAt: "2022-01-01T00:00:00.000Z",
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

export default function CompanyPage() {
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
  
    const handleCategoryClick = (category: Category) => {
      console.log("Category clicked:", category)
      // Implement category filtering logic here
    }
  
    const handleCompanyClick = (company: Company) => {
      router.push(`/company/${company._id}`)
      // Navigate to company detail page
    }
  
    const handleTopCompanyClick = (company: TopCompany) => {
      console.log("Top company clicked:", company)
      // Navigate to company detail page
    }
  
    // Filter companies based on selected filters
    const filteredCompanies = companies.filter((company) => {
      const matchesCompanyType =
        selectedCompanyTypes.length === 0 || selectedCompanyTypes.some((type) => company.industry.includes(type))
  
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

        <div className="flex flex-col gap-4">
          <CompanyListings 
            onCompanyClick={handleCompanyClick}
          />
        </div>

    </div>

  )
}
