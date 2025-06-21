export interface Job {
    id: number
    title: string
    company: string
    companyLogo: string
    logoColors: string
    type: string
    typeColor: string
    dueDate: string
    location: string
    applicants: number
    salary: string
    salaryType: string
  }
  
export interface JobProps {
    jobs: Job[]
    onCategoryChange?: (categoryId: number) => void
    onJobClick?: (jobId: number) => void
    onViewAll?: () => void
  }
