"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Education {
  id: string
  collegeType: string
  degree: string
  city: string
  startDate: string
  graduationDate: string
  currentlyStudying: boolean
}

interface Project {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  projectLink: string
}

interface Achievement {
  id: string
  title: string
  description: string
}

interface Certificate {
  id: string
  title: string
  description: string
}

export interface Experience {
  id: string
  jobTitle: string
  company: string
  location: string
  description: string
  startDate: string
  endDate: string
  currentlyWorking: boolean
}

interface FormData {
  firstName: string
  lastName: string
  gender: string
  phoneNumber: string
  dateOfBirth: string
  sectors: string[]
  designation: string
  aboutMe: string
  profilePicture?: string

  city: string
  currentAddress: string
  postalCode: string
  province: string

  education: Education[]
  projects: Project[]
  skills: string[]
  achievements: Achievement[]
  certificates: Certificate[]
  experiences: Experience[]
}

interface FormContextType {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  addEducation: (education: Omit<Education, "id">) => void
  removeEducation: (id: string) => void
  addProject: (project: Omit<Project, "id">) => void
  removeProject: (id: string) => void
  addAchievement: (achievement: Omit<Achievement, "id">) => void
  removeAchievement: (id: string) => void
  addCertificate: (certificate: Omit<Certificate, "id">) => void
  removeCertificate: (id: string) => void
  addExperience: (experience: Omit<Experience, "id">) => void
  removeExperience: (id: string) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  gender: "",
  phoneNumber: "",
  dateOfBirth: "",
  sectors: [],
  designation: "",
  aboutMe: "",
  city: "",
  currentAddress: "",
  postalCode: "",
  province: "",
  education: [],
  projects: [],
  skills: [],
  achievements: [],
  certificates: [],
  experiences: [],
  profilePicture: undefined,
}

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("dreamroad-form-data")
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (error) {
        console.error("Error loading form data:", error)
      }
    }
  }, [])

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("dreamroad-form-data", JSON.stringify(formData))
  }, [formData])

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const addExperience = (experience: Omit<Experience, "id">) => {
    const newExperience = { ...experience, id: Date.now().toString() }
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }))
  }

  const removeExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = (education: Omit<Education, "id">) => {
    const newEducation = { ...education, id: Date.now().toString() }
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }))
  }

  const removeEducation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addProject = (project: Omit<Project, "id">) => {
    const newProject = { ...project, id: Date.now().toString() }
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }

  const removeProject = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }))
  }

  const addAchievement = (achievement: Omit<Achievement, "id">) => {
    const newAchievement = { ...achievement, id: Date.now().toString() }
    setFormData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement],
    }))
  }

  const removeAchievement = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((ach) => ach.id !== id),
    }))
  }

  const addCertificate = (certificate: Omit<Certificate, "id">) => {
    const newCertificate = { ...certificate, id: Date.now().toString() }
    setFormData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, newCertificate],
    }))
  }

  const removeCertificate = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((cert) => cert.id !== id),
    }))
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        addEducation,
        removeEducation,
        addProject,
        removeProject,
        addAchievement,
        removeAchievement,
        addCertificate,
        removeCertificate,
        addExperience,
        removeExperience,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}
