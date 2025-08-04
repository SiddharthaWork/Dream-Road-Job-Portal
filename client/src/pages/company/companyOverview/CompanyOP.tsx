"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  MapPin, 
  Users, 
  Building2, 
  AlertCircle
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'
interface Job {
  _id: string
  title: string
  department: string
  location: string
  type: string
  experience: 'entry' | 'mid' | 'senior' | 'lead'
  salaryMin: number
  salaryMax: number
  description: string
  requirements: string
  benefits: string
  hasDeadline: boolean
  deadline?: string
  skills: string[]
  company: string
  createdAt: string
  updatedAt: string
  applications: string[]
  createdBy: {
    _id: string
    name: string
    email: string
    logo: string
    industry: string
    size: string
    description: string
    phoneNumber: string
  }
}

interface Company {
  name: string
  tagline: string
  rating: any
  reviewCount: string
  status: string
  logo: any
  industry: string
  size: string
  description: string
  email: string
  phoneNumber: string
}

interface CompanyStat {
  label: string
  value: string
  icon: any
}

interface AboutContent {
  title: string
  paragraphs: string[]
}

interface Service {
  title: string
  description: string
  color: string
  bgColor: string
  textColor: string
}

interface Benefit {
  category: string
  icon: any
  items: string[]
}

interface Location {
  city: string
  country: string
  employees: string
  established: string
}

interface Review {
  name: string
  role: string
  department: string
  quote: string
  rating: number
  tenure: string
}

interface JobOpening {
  title: string
  subtitle: string
  jobs: Job[]
}


export default function CompanyOp() {
  const params = useParams()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  const [companyInfo, setCompanyInfo] = useState<Company>({
    name: "",
    tagline: "",
    rating: "",
    reviewCount: "",
    status: "",
    logo: Building2,
    industry: "",
    size: "",
    description: "",
    email: "",
    phoneNumber: ""
  })

  useEffect(() => {
    if (!params?.id) {
      setError('Invalid company ID')
      setLoading(false)
      return
    }

    const fetchCompanyJobs = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `http://localhost:4000/api/job/getjobbycompany/${params.id}`
        )
        
        if (response.data.success) {
          const jobsData = response.data.data
          // Extract only necessary fields
          const filteredJobs = jobsData.map((job: any) => ({
            _id: job._id,
            title: job.title,
            department: job.department,
            location: job.location,
            type: job.type,
            experience: job.experience,
            salaryMin: job.salaryMin,
            salaryMax: job.salaryMax,
            description: job.description,
            requirements: job.requirements,
            benefits: job.benefits,
            hasDeadline: job.hasDeadline,
            deadline: job.deadline,
            skills: job.skills,
            applications: job.applications,
            createdAt: job.createdAt,
            updatedAt: job.updatedAt,
            createdBy: {
              _id: job.createdBy?._id,
              name: job.createdBy?.name,
              logo: job.createdBy?.logo,
              industry: job.createdBy?.industry,
              size: job.createdBy?.size,
              description: job.createdBy?.description,
              email: job.createdBy?.email,
              phoneNumber: job.createdBy?.phoneNumber
            }
          }))
          setJobs(filteredJobs)
          
          // Extract company info from first job if available
          if (filteredJobs.length > 0 && filteredJobs[0].createdBy) {
            const companyData = filteredJobs[0].createdBy
            setCompanyInfo(prev => ({
              ...prev,
              name: companyData.name || prev.name,
              logo: companyData.logo || prev.logo,
              industry: companyData.industry || prev.industry,
              size: companyData.size || prev.size,
              description: companyData.description || prev.description,
              email: companyData.email || prev.email,
              phoneNumber: companyData.phoneNumber || prev.phoneNumber
            }))
          }
  console.log(filteredJobs[0].createdBy)

        } else {
          setError(response.data.message || 'Failed to fetch jobs')
        }
      } catch (err) {
        setError('Error fetching company jobs')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyJobs()
  }, [params?.id])
  console.log(companyInfo)

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string } } = {
      blue: { bg: "bg-blue-50", text: "text-blue-600" },
      green: { bg: "bg-green-50", text: "text-green-600" },
      purple: { bg: "bg-purple-50", text: "text-purple-600" },
      orange: { bg: "bg-orange-50", text: "text-orange-600" },
    }
    return colorMap[color] || colorMap.blue
  }

  const truncateText = (text: string, maxWords: number = 20) => {
    if (!text) return ''
    const words = text.trim().split(/\s+/)
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '.........'
    }
    return text
  }

  return (
    <div className="bg-[#f8f9fa] py-6">
    <div className="min-h-screen bg-[#f8f9fa] w-full max-w-7xl mx-auto">
      {/* Company Header */}
      <div className="relative w-full h-64 bg-gradient-to-r rounded-xl from-blue-900  to-blue-700 overflow-hidden">
        <div className="absolute inset-0 flex items-center px-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-6 text-white">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                  <img src={companyInfo.logo} alt="" />                
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{companyInfo.name}</h1>
                <p className="text-xl opacity-90">{companyInfo.tagline}</p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge variant="secondary" className="bg-white text-blue-600">
                    {companyInfo.industry}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        ) : (
          <div>
            {/* Company Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900">Company Size</div>
                    <div className="text-sm text-gray-600">{companyInfo.size}</div>
                  </CardContent>
                </Card>
                {/* Department*/}
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900">Industry</div>
                    <div className="text-sm text-gray-600">{companyInfo.industry}</div>
                  </CardContent>
                </Card>
                {/* Email*/}
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900">Email</div>
                    <div className="text-sm text-gray-600">{companyInfo.email}</div>
                  </CardContent>
                </Card>
                {/* Phone Number*/}
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900">Contact</div>
                    <div className="text-sm text-gray-600">{companyInfo.phoneNumber}</div>
                  </CardContent>
                </Card> 
            </div>

            {/* About Section */}
            <section className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{companyInfo.name}</h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
              </div>

            </section>


            {/* Current Job Openings */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-2xl">{companyInfo.name}</CardTitle>
                <p className="text-gray-600">
                  {companyInfo.name} - {jobs.length} positions available
                </p>
              </CardHeader>
              <CardContent>
                {jobs.map((job) => (
                  <Card key={job._id} className="mb-4">
                    <CardHeader>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Badge variant="outline">{job.department}</Badge>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                        <span>•</span>
                        <span>{job.type}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Description</h4>
                          <p className="text-sm">{truncateText(job.description)}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Requirements</h4>  
                          <p className="text-sm">{truncateText(job.requirements)}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Salary Range</h4>
                          <p className="text-sm">
                            {job.salaryMin} - {job.salaryMax}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Posted: {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                        <Button onClick={() => router.push(`/job/${job._id}`)} disabled>Login to Apply</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
    </div>  
  )
}
