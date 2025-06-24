"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Star,
  Users,
  Building2,
  Globe,
  Award,
  TrendingUp,
  Calendar,
  DollarSign,
  GraduationCap,
  Coffee,
  Car,
  Shield,
  Target,
  Lightbulb,
  Handshake,
  Bookmark,
} from "lucide-react"
import { div } from "motion/react-client"

// Company Data Arrays
const companyInfo = {
  name: "Cognizant",
  tagline: "Leading the way in digital transformation",
  rating: 3.7,
  reviewCount: "54,260",
  status: "Actively Hiring",
  logo: Building2,
}

const companyStats = [
  { label: "Global Employees", value: "350,000+", icon: Users },
  { label: "Countries", value: "40+", icon: Globe },
  { label: "Fortune 500 Rank", value: "#185", icon: TrendingUp },
  { label: "Founded", value: "1994", icon: Calendar },
]

const aboutContent = {
  title: "About Cognizant",
  paragraphs: [
    "Cognizant is a leading multinational technology company that provides digital, technology, consulting, and operations services. We help our clients modernize technology, reimagine processes and transform experiences so they can stay ahead in our fast-changing world.",
    "Founded in 1994, Cognizant has grown to become one of the world's leading professional services companies, transforming clients' business, operating and technology models for the digital era. Our unique industry-based, consultative approach helps clients envision, build and run more innovative and efficient businesses.",
    "With over 350,000 associates worldwide, we are committed to helping our clients build stronger businesses through our deep industry expertise, leading technologies, and comprehensive service offerings.",
  ],
}

const services = [
  {
    title: "Digital Engineering",
    description: "Modern software engineering, cloud-native development, and digital product engineering",
    color: "blue",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    title: "Data & Analytics",
    description: "AI, machine learning, data science, and advanced analytics solutions",
    color: "green",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    title: "Digital Operations",
    description: "Business process services, automation, and intelligent operations",
    color: "purple",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
  },
  {
    title: "Consulting",
    description: "Strategy, technology, and transformation consulting services",
    color: "orange",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
]

const cultureContent = {
  title: "Culture & Values",
  values: [
    {
      title: "Client Focus",
      description: "We put our clients at the center of everything we do",
      icon: Target,
    },
    {
      title: "Innovation",
      description: "We embrace new ideas and technologies to drive progress",
      icon: Lightbulb,
    },
    {
      title: "Collaboration",
      description: "We work together to achieve extraordinary results",
      icon: Handshake,
    },
    {
      title: "Excellence",
      description: "We strive for excellence in all our endeavors",
      icon: Award,
    },
  ],
  diversity: {
    title: "Diversity & Inclusion",
    description:
      "At Cognizant, we believe that diversity drives innovation. We're committed to creating an inclusive workplace where all associates can bring their authentic selves to work and contribute to our collective success.",
    stats: [
      { value: "40%", label: "Women in workforce", color: "blue" },
      { value: "100+", label: "Nationalities", color: "green" },
      { value: "15+", label: "Employee Resource Groups", color: "purple" },
    ],
  },
}

const benefits = [
  {
    category: "Health & Wellness",
    icon: Shield,
    items: ["Comprehensive health insurance", "Mental health support", "Wellness programs", "On-site fitness centers"],
  },
  {
    category: "Financial Benefits",
    icon: DollarSign,
    items: ["Competitive salary packages", "Performance bonuses", "Stock purchase plans", "Retirement savings plans"],
  },
  {
    category: "Learning & Development",
    icon: GraduationCap,
    items: [
      "Professional certification support",
      "Internal training programs",
      "Leadership development",
      "Tuition reimbursement",
    ],
  },
  {
    category: "Work-Life Balance",
    icon: Coffee,
    items: ["Flexible working hours", "Remote work options", "Paid time off", "Sabbatical programs"],
  },
  {
    category: "Additional Perks",
    icon: Car,
    items: ["Transportation allowance", "Employee discounts", "Travel opportunities", "Team building events"],
  },
]

const locationsData = {
  title: "Global Presence",
  subtitle: "We operate in over 40 countries with major delivery centers worldwide",
  offices: [
    {
      city: "Hyderabad",
      country: "India",
      employees: "45,000+",
      established: "2003",
    },
  ],
}

const reviewsData = {
  title: "Employee Reviews",
  overallRating: 3.7,
  totalReviews: "54,260",
  categories: [
    { name: "Work-Life Balance", score: 3.8, percentage: 75 },
    { name: "Culture & Values", score: 3.5, percentage: 70 },
    { name: "Career Growth", score: 3.6, percentage: 72 },
    { name: "Compensation", score: 3.4, percentage: 68 },
  ],
  testimonials: [
    {
      name: "Priya Sharma",
      role: "Senior Software Engineer",
      department: "Technology",
      quote:
        "Cognizant has provided me with incredible opportunities to grow both professionally and personally. The learning culture here is exceptional.",
      rating: 5,
      tenure: "3 years",
    },
    {
      name: "Rajesh Kumar",
      role: "Project Manager",
      department: "Consulting",
      quote:
        "The work-life balance and supportive management make Cognizant a great place to build a career. I've worked on projects across multiple industries.",
      rating: 4,
      tenure: "5 years",
    },
    {
      name: "Sarah Johnson",
      role: "Business Analyst",
      department: "Digital Operations",
      quote:
        "The diversity and inclusion initiatives at Cognizant create an environment where everyone can thrive and contribute their best work.",
      rating: 5,
      tenure: "2 years",
    },
  ],
}

const jobOpenings = {
  title: "Current Job Openings at Cognizant",
  subtitle: "Explore available positions across different departments and locations",
  jobs: [
    {
      id: 1,
      title: "Cognizant Hiring Freshers - Hyderabad (Work from home)",
      department: "Technology",
      location: "Hyderabad",
      experience: "0 years",
      type: "Full-time",
      salary: "Not Disclosed",
      postedDays: "1 day ago",
      applicants: "100+",
      description: "Fresher with strong attention to detail and ability to work independently",
    },
    {
      id: 2,
      title: "Walk-in-Drive For SPE - RTR - 23rd-June - 25",
      department: "Operations",
      location: "Hyderabad",
      experience: "0-2 years",
      type: "Full-time",
      salary: "NPR 3-5 LPA",
      postedDays: "4 days ago",
      applicants: "250+",
      description: "Support Process Executive role in Revenue and Tax Returns",
    },
    {
      id: 3,
      title: "PE-Retail & Comm Banking",
      department: "Banking",
      location: "Pune",
      experience: "0-2 years",
      type: "Full-time",
      salary: "NPR 4-6 LPA",
      postedDays: "12 days ago",
      applicants: "180+",
      description: "Process Executive role in Retail and Commercial Banking operations",
    },
    {
      id: 4,
      title: "Datacenter Support Engineer",
      department: "Infrastructure",
      location: "Bengaluru",
      experience: "0-3 years",
      type: "Full-time",
      salary: "NPR 5-7 LPA",
      postedDays: "12 days ago",
      applicants: "320+",
      description: "Support and maintain datacenter infrastructure and operations",
    },
    {
      id: 5,
      title: "Software Developer - Java",
      department: "Technology",
      location: "Chennai",
      experience: "1-3 years",
      type: "Full-time",
      salary: "NPR 6-9 LPA",
      postedDays: "5 days ago",
      applicants: "450+",
      description: "Develop and maintain Java-based applications and systems",
    },
    {
      id: 6,
      title: "Business Analyst",
      department: "Consulting",
      location: "Mumbai",
      experience: "2-4 years",
      type: "Full-time",
      salary: "NPR 8-12 LPA",
      postedDays: "8 days ago",
      applicants: "200+",
      description: "Analyze business requirements and provide strategic solutions",
    },
    {
      id: 7,
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Gurgaon",
      experience: "1-3 years",
      type: "Full-time",
      salary: "NPR 5-8 LPA",
      postedDays: "6 days ago",
      applicants: "150+",
      description: "Drive digital marketing campaigns and online presence",
    },
    {
      id: 8,
      title: "Cloud Solutions Architect",
      department: "Technology",
      location: "Bangalore",
      experience: "4-7 years",
      type: "Full-time",
      salary: "NPR 15-25 LPA",
      postedDays: "3 days ago",
      applicants: "80+",
      description: "Design and implement cloud-based solutions for enterprise clients",
    },
  ],
}

export default function CompanyOverview() {
  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string } } = {
      blue: { bg: "bg-blue-50", text: "text-blue-600" },
      green: { bg: "bg-green-50", text: "text-green-600" },
      purple: { bg: "bg-purple-50", text: "text-purple-600" },
      orange: { bg: "bg-orange-50", text: "text-orange-600" },
    }
    return colorMap[color] || colorMap.blue
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
                <companyInfo.logo className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{companyInfo.name}</h1>
                <p className="text-xl opacity-90">{companyInfo.tagline}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{companyInfo.rating}</span>
                    <span className="opacity-75">({companyInfo.reviewCount} reviews)</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {companyInfo.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {companyStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About Section */}
        <section className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{aboutContent.title}</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6">
              {aboutContent.paragraphs.map((paragraph, index) => (
                <p key={index} className={`text-gray-700 leading-relaxed ${index === 0 ? "text-lg" : ""}`}>
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Our Services</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <div key={index} className={`space-y-3 p-4 ${service.bgColor} rounded-lg`}>
                    <h3 className={`font-semibold ${service.textColor} text-lg`}>{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>


        {/* Benefits Section */}
        <section className="space-y-6 mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Benefits & Perks</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-lg">{benefit.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefit.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Locations Section */}
        <section className="space-y-6 mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{locationsData.title}</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">{locationsData.subtitle}</p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locationsData.offices.map((location, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-100 rounded-lg p-6 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{location.city}</h3>
                        <p className="text-sm text-gray-600">{location.country}</p>
                      </div>
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Employees:</span>
                        <span className="font-medium text-blue-600">{location.employees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Established:</span>
                        <span className="font-medium">{location.established}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>


        {/* Current Job Openings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">{jobOpenings.title}</CardTitle>
            <p className="text-gray-600">
              {jobOpenings.subtitle} - {jobOpenings.jobs.length} positions available
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {jobOpenings.jobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {job.department}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{job.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 mb-3">
                    <div>
                      <span className="font-medium">Experience:</span> {job.experience}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span> {job.type}
                    </div>
                    <div>
                      <span className="font-medium">Salary:</span> {job.salary}
                    </div>
                    <div>
                      <span className="font-medium">Applicants:</span> {job.applicants}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Posted {job.postedDays}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Bookmark className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>  
  )
}
