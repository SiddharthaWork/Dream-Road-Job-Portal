"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronLeft, Star } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Category {
  name: string
  count: string
  companies: string
}

interface TopCompany {
  id: number
  name: string
  logo: string
  description: string
  industry: string
  employees: string
  rating: number
  openJobs: number
}

interface CompaniesPageHeaderProps {
  title: string
  categories: Category[]
  topCompanies: TopCompany[]
  onCategoryClick?: (category: Category) => void
  onTopCompanyClick?: (company: TopCompany) => void
}

export function CompaniesPageHeader({
  title,
  categories,
  topCompanies,
  onCategoryClick,
  onTopCompanyClick,
}: CompaniesPageHeaderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const itemsPerSlide = 3
  const totalSlides = Math.ceil(topCompanies.length / itemsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentSlide, totalSlides])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <>
      {/* Page Header Section */}
      <div className="bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>

          {/* Category Cards */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="min-w-[200px] cursor-pointer hover:shadow-md transition-shadow flex-shrink-0"
                onClick={() => onCategoryClick?.(category)}
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <div className="flex items-center text-blue-600 text-sm">
                    <span className="font-medium">
                      {category.count} {category.companies}
                    </span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Top Companies Carousel Section */}
      <div className="bg-[#f8f9fa] border-t">
        <div className="max-w-7xl mx-auto py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Companies</h2>
              <p className="text-gray-600">Discover leading companies that are actively hiring</p>
            </div>
            {totalSlides > 1 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className="h-10 w-10"
                  aria-label="Previous companies"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className="h-10 w-10"
                  aria-label="Next companies"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topCompanies.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((company) => (
                      <Card
                        key={company.id}
                        className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        onClick={() => onTopCompanyClick?.(company)}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                              <Image
                                src={company.logo || "/placeholder.svg"}
                                alt={`${company.name} logo`}
                                width={60}
                                height={60}
                                className="rounded-xl"
                              />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {company.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{company.description}</p>
                            <div className="flex items-center justify-between w-full mb-4">
                              <div className="flex items-center space-x-1">
                                <div className="flex items-center">{renderStars(company.rating)}</div>
                                <span className="text-sm font-medium text-gray-900 ml-1">{company.rating}</span>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {company.industry}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between w-full text-sm text-gray-500 mb-4">
                              <span>{company.employees} employees</span>
                              <span className="text-green-600 font-medium">{company.openJobs} open jobs</span>
                            </div>
                            <Button className="w-full group-hover:bg-blue-600 transition-colors">View Company</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
