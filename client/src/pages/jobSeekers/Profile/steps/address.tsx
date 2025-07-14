"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormContext } from "@/contexts/form-context"
import { FormProvider } from "@/contexts/form-context"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2 } from "lucide-react"

const provinces = [
  "Province No. 1",
  "Madhesh",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim",
];

const sectorOptions = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Marketing",
  "Sales",
  "Design",
  "Engineering",
  "Human Resources",
  "Operations",
]

export default function AddressStep() {
  try {
    const { formData, updateFormData, addExperience, removeExperience } = useFormContext()
    const [selectedSectors, setSelectedSectors] = useState<string[]>(formData.sectors || [])
    const [newExperience, setNewExperience] = useState({
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      location: '',
      description: ''
    })

    const handleInputChange = (field: string, value: string) => {
      updateFormData({ [field]: value })
    }

    const handleSectorToggle = (sector: string) => {
      const newSectors = selectedSectors.includes(sector)
        ? selectedSectors.filter((s) => s !== sector)
        : [...selectedSectors, sector]

      setSelectedSectors(newSectors)
      updateFormData({ sectors: newSectors })
    }

    const handleExperienceChange = (field: string, value: string | boolean) => {
      setNewExperience(prev => ({
        ...prev,
        [field]: value
      }))
    }

    const handleAddExperience = () => {
      if (newExperience.jobTitle && newExperience.company) {
        addExperience(newExperience)
        setNewExperience({
          jobTitle: '',
          company: '',
          startDate: '',
          endDate: '',
          currentlyWorking: false,
          location: '',
          description: ''
        })
      }
    }

    return (
        <ScrollArea className="h-full w-full ">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Experience</h2>
          <p className="text-gray-600">Provide your past job experience information.</p>
        </div>

        {formData.experiences.map((exp) => (
          <Card key={exp.id} className="p-4 rounded-lg border-l-4 border-l-blue-500 mb-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{exp.jobTitle}</h3>
                <p className="text-gray-600">
                  {exp.company} • {exp.location}
                </p>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(exp.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}

        <Card className="p-6 rounded-lg border-2 border-dashed border-gray-300 mt-6">
          <h3 className="font-semibold mb-4">Add Work Experience</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input
                value={newExperience.jobTitle}
                onChange={(e) => handleExperienceChange('jobTitle', e.target.value)}
                placeholder="Enter job title"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input
                value={newExperience.company}
                onChange={(e) => handleExperienceChange('company', e.target.value)}
                placeholder="Enter company name"
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={newExperience.location}
                onChange={(e) => handleExperienceChange('location', e.target.value)}
                placeholder="Enter location"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={newExperience.startDate}
                onChange={(e) => handleExperienceChange('startDate', e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={newExperience.endDate}
                onChange={(e) => handleExperienceChange('endDate', e.target.value)}
                disabled={newExperience.currentlyWorking}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="currentlyWorking"
              checked={newExperience.currentlyWorking}
              onCheckedChange={(checked) => handleExperienceChange('currentlyWorking', checked as boolean)}
            />
            <Label htmlFor="currentlyWorking">I currently work here</Label>
          </div>

          <div className="space-y-2 mb-4">
            <Label>Description</Label>
            <Textarea
              value={newExperience.description}
              onChange={(e) => handleExperienceChange('description', e.target.value)}
              placeholder="Describe your role and responsibilities"
              className="rounded-lg"
            />
          </div>

          <Button onClick={handleAddExperience} className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </Card>

        {/* <div className="space-y-2">
          <Label htmlFor="currentAddress">
            Current Address <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="currentAddress"
            value={formData.currentAddress}
            onChange={(e) => handleInputChange("currentAddress", e.target.value)}
            placeholder="Enter your complete address"
            className="rounded-lg min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label>
            Province <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.province} onValueChange={(value) => handleInputChange("province", value)}>
            <SelectTrigger className="rounded-lg w-[7rem]">
              <SelectValue placeholder="Select Province" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
      </div>
      </ScrollArea>
    )
  } catch (e) {
    return <div>Error: AddressStep must be used within a FormProvider.</div>;
  }
}

export function Preview() {
  return (
    <FormProvider>
      <AddressStep />
    </FormProvider>
  );
}