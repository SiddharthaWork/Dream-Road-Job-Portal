"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Search, Star } from "lucide-react"
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
  id: number
  name: string
  logo: string
  rating: number
  reviews: number
  tags: string[]
  founded?: number | null
  employees?: string | null
}

interface CompanyListingsProps {
  companies: Company[]
  companyTypes: FilterOption[]
  locations: FilterOption[]
  totalCount: number
  selectedCompanyTypes: string[]
  selectedLocations: string[]
  onCompanyTypeChange: (type: string, checked: boolean) => void
  onLocationChange: (location: string, checked: boolean) => void
  onCompanyClick?: (company: Company) => void
  isLoading?: boolean
}

export function CompanyListings({
  companies,
  companyTypes,
  locations,
  totalCount,
  selectedCompanyTypes,
  selectedLocations,
  onCompanyTypeChange,
  onLocationChange,
  onCompanyClick,
  isLoading = false,
}: CompanyListingsProps) {
  const [locationSearch, setLocationSearch] = useState("")
  const [isCompanyTypeOpen, setIsCompanyTypeOpen] = useState(true)
  const [isLocationOpen, setIsLocationOpen] = useState(true)
  const [isIndustryOpen, setIsIndustryOpen] = useState(false)

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(locationSearch.toLowerCase()),
  )

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const clearAllFilters = () => {
    selectedCompanyTypes.forEach((type) => onCompanyTypeChange(type, false))
    selectedLocations.forEach((location) => onLocationChange(location, false))
    setLocationSearch("")
  }

  const hasActiveFilters = selectedCompanyTypes.length > 0 || selectedLocations.length > 0

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex gap-6">
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
                        onCheckedChange={(checked) => onCompanyTypeChange(type.name, checked as boolean)}
                      />
                      <label
                        htmlFor={`company-type-${type.name}`}
                        className="text-sm text-gray-700 cursor-pointer flex-1"
                      >
                        {type.name} <span className="text-gray-500">({type.count})</span>
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
                <CollapsibleContent className="mt-3">
                  <div className="relative mb-3">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search Location"
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="space-y-3 max-h-48 overflow-y-auto location-scrollbar">
                    {filteredLocations.map((location) => (
                      <div key={location.name} className="flex items-center space-x-2">
                        <Checkbox
                          id={`location-${location.name}`}
                          checked={selectedLocations.includes(location.name)}
                          onCheckedChange={(checked) => onLocationChange(location.name, checked as boolean)}
                        />
                        <label
                          htmlFor={`location-${location.name}`}
                          className="text-sm text-gray-700 cursor-pointer flex-1"
                        >
                          {location.name} <span className="text-gray-500">({location.count})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  {locations.length > filteredLocations.length && (
                    <Button variant="link" className="text-blue-600 p-0 h-auto mt-2">
                      +{locations.length - filteredLocations.length} more
                    </Button>
                  )}
                </CollapsibleContent>
              </Collapsible>

              {/* Industry Filter */}
              <Collapsible open={isIndustryOpen} onOpenChange={setIsIndustryOpen} className="mt-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-gray-50 rounded px-2 -mx-2">
                  <span className="font-medium text-gray-900">Industry</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isIndustryOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="text-sm text-gray-500">Industry filters would go here...</div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>

        {/* Company Grid */}
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Showing {isLoading ? "..." : totalCount.toLocaleString()} companies</p>
              {hasActiveFilters && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Filters applied:</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {selectedCompanyTypes.length + selectedLocations.length}
                  </span>
                </div>
              )}
            </div>
          </div>

          {isLoading ? (
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
          ) : companies.length === 0 ? (
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
              {companies.map((company) => (
                <Card
                  key={company.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onCompanyClick?.(company)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Image
                            src={company.logo || "/placeholder.svg"}
                            alt={`${company.name} logo`}
                            width={40}
                            height={40}
                            className="rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 truncate">{company.name}</h3>

                          {company.rating > 0 && (
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex items-center">{renderStars(company.rating)}</div>
                              <span className="text-sm font-medium text-gray-900">{company.rating}</span>
                              <span className="text-sm text-gray-500">{company.reviews} reviews</span>
                            </div>
                          )}

                          {company.rating === 0 && (
                            <div className="mb-2">
                              <span className="text-sm text-gray-500">{company.reviews} reviews</span>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2 mb-2">
                            {company.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {company.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{company.tags.length - 2} more
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            {company.founded && <span>Founded: {company.founded}</span>}
                            {company.employees && <span>{company.employees}</span>}
                          </div>
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
