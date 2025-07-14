"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { ChevronDown, ChevronRight, Search, Star, AlertCircle } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface FilterOption {
  name: string
  count: number
}

interface Company {
  _id: string
  name: string
  logo?: string
  industry: string
  location: string
  email: string
  phoneNumber: string
  createdAt: string
  updatedAt: string
  jobCount: number
}

interface CompanyListingsProps {
  onCompanyClick?: (company: Company) => void
}

export default function CompanyListings({ onCompanyClick }: CompanyListingsProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [companyTypes, setCompanyTypes] = useState<FilterOption[]>([])
  const [locations, setLocations] = useState<FilterOption[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [companyNameSearch, setCompanyNameSearch] = useState('')
  const [isCompanyTypeOpen, setIsCompanyTypeOpen] = useState(true)
  const [isLocationOpen, setIsLocationOpen] = useState(true)
  const [isIndustryOpen, setIsIndustryOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Retail',
    'Manufacturing'
  ]

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])

  const filteredCompanies = companies.filter(company => {
    const matchesName = companyNameSearch === '' || company.name.toLowerCase().includes(companyNameSearch.toLowerCase())
    const matchesCompanyType = selectedCompanyTypes.length === 0 || selectedCompanyTypes.includes(company.industry)
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(company.location)
    const hasJobs = company.jobCount > 0
    return matchesName && matchesCompanyType && matchesLocation && hasJobs
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const clearAllFilters = () => {
    setSelectedCompanyTypes([])
    setSelectedLocations([])
    setSelectedIndustries([])
    setCompanyNameSearch("")
  }

  const hasActiveFilters = selectedCompanyTypes.length > 0 || selectedLocations.length > 0 || selectedIndustries.length > 0

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:4000/api/company/getallcompanies')
        console.log(response.data);
        if (response.data.success) {
          setCompanies(response.data.data)
          setTotalCount(response.data.data.length)
        } else {
          setError(response.data.message || 'Failed to fetch companies')
        }
      } catch (err) {
        setError('Network error - could not fetch companies')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  return (
    <div className="max-w-7xl min-h-[6  0vh] mx-auto py-6 w-full">
      <div className="flex gap-6 justify-between w-full">
        {/* Sidebar Filters */}
        <div className="w-80 space-y-6 flex-shrink-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">All Filters</h2>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Company Type Filter */}
              <Collapsible open={isCompanyTypeOpen} onOpenChange={setIsCompanyTypeOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-gray-50 rounded px-2 -mx-2">
                  <span className="font-medium text-gray-900">Company type</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCompanyTypeOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-3">
                  {companyTypes.map((type) => (
                    <div key={type.name} className="flex items-center space-x-2">
                      <Checkbox
                        id={`company-type-${type.name}`}
                        checked={selectedCompanyTypes.includes(type.name)}
                        onCheckedChange={(checked) => setSelectedCompanyTypes(checked ? [...selectedCompanyTypes, type.name] : selectedCompanyTypes.filter(item => item !== type.name))}
                      />
                      <label
                        htmlFor={`company-type-${type.name}`}
                        className="text-sm text-gray-700 cursor-pointer flex-1"
                      >
                        {type.name}
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Location Filter */}
              <Collapsible open={isLocationOpen} onOpenChange={setIsLocationOpen} className="mt-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-gray-50 rounded px-2 -mx-2">
                  <span className="font-medium text-gray-900">Location</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isLocationOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-3">
                  {locations.map((location) => (
                    <div key={location.name} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location.name}`}
                        checked={selectedLocations.includes(location.name)}
                        onCheckedChange={(checked) => setSelectedLocations(checked ? [...selectedLocations, location.name] : selectedLocations.filter(item => item !== location.name))}
                      />
                      <label
                        htmlFor={`location-${location.name}`}
                        className="text-sm text-gray-700 cursor-pointer flex-1"
                      >
                        {location.name}
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Industry Filter */}
              <Collapsible open={isIndustryOpen} onOpenChange={setIsIndustryOpen} className="mt-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-gray-50 rounded px-2 -mx-2">
                  <span className="font-medium text-gray-900">Industry</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isIndustryOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-3">
                  {industries.map((industry) => (
                    <div key={industry} className="flex items-center space-x-2">
                      <Checkbox
                        id={`industry-${industry}`}
                        checked={selectedIndustries.includes(industry)}
                        onCheckedChange={(checked) => 
                          setSelectedIndustries(checked ? 
                            [...selectedIndustries, industry] : 
                            selectedIndustries.filter(item => item !== industry)
                          )
                        }
                      />
                      <label htmlFor={`industry-${industry}`} className="text-sm text-gray-700 cursor-pointer">
                        {industry}
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>

        {/* Company Grid */}
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Showing {loading ? "..." : filteredCompanies.length.toLocaleString()} companies</p>
              {hasActiveFilters && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Filters applied:</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {selectedCompanyTypes.length + selectedLocations.length + selectedIndustries.length}
                  </span>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {Array.from({ length: 6 }, (_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="flex space-x-2">
                          <div className="h-6 bg-gray-200 rounded w-16"></div>
                          <div className="h-6 bg-gray-200 rounded w-20"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters or search criteria to find more companies.
              </p>
              {hasActiveFilters && (
                <Button onClick={clearAllFilters} variant="outline">
                  Clear all filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredCompanies.map((company) => (
                <Card
                  key={company._id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onCompanyClick?.(company)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <img
                            src={company.logo || "/placeholder.svg"}
                            alt={`${company.name} logo`}
                            className="rounded "
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 truncate">{company.name}</h3>

                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {company.industry}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Email: {company.email}</span>
                            <span>Phone Number: {company.phoneNumber}</span>
                          </div>
                          {company.jobCount === 0 ? (
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <AlertCircle className="w-4 h-4 text-yellow-500" />
                              <span>No jobs posted yet</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">
                              {company.jobCount} job{company.jobCount !== 1 ? 's' : ''} available
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
