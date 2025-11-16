"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2 } from "lucide-react"
import { useFormContext } from "@/contexts/form-context"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

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

export default function ProfessionalDetailsStep() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  try {
    const { formData, updateFormData, addExperience, removeExperience } = useFormContext()
    const [selectedSectors, setSelectedSectors] = useState<string[]>(formData.sectors || [])
    const [newExperience, setNewExperience] = useState({
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
    })

    const handleSectorToggle = (sector: string) => {
      const newSectors = selectedSectors.includes(sector)
        ? selectedSectors.filter((s) => s !== sector)
        : [...selectedSectors, sector]

      setSelectedSectors(newSectors)
      updateFormData({ sectors: newSectors })
    }

    const handleAddExperience = () => {
      if (newExperience.jobTitle && newExperience.company) {
        addExperience(newExperience)
        setNewExperience({
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        })
      }
    }

    const handleInputChange = (field: string, value: string | boolean) => {
      setNewExperience((prev) => ({ ...prev, [field]: value }))
    }

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Details</h2>
          <p className="text-gray-600">Add your professional information and work experience.</p>
        </div>

        {/* Sector Selection */}
        <div className="space-y-2">
          <Label>
            Sector <span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-wrap gap-2 p-3 border rounded-lg min-h-[50px] bg-gray-50">
            {sectorOptions.map((sector) => (
              <Badge
                key={sector}
                variant={selectedSectors.includes(sector) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedSectors.includes(sector) ? "bg-[#255cf4] hover:bg-blue-300 text-white" : "hover:bg-gray-200"
                }`}
                onClick={() => handleSectorToggle(sector)}
              >
                {sector}
                {selectedSectors.includes(sector) && <X className="w-3 h-3 ml-1" />}
              </Badge>
            ))}
          </div>
        </div>

        {/* Designation */}
        <div className="space-y-2">
          <Label htmlFor="designation">
            Designation <span className="text-red-500">*</span>
          </Label>
          <Input
            id="designation"
            value={formData.designation}
            onChange={(e) => updateFormData({ designation: e.target.value })}
            placeholder="eg. UI UX designer"
            className="rounded-lg"
          />
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
          
          {/* Existing Experience Cards */}
          {formData.experiences.map((exp) => (
            <Card key={exp.id} className="p-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold">{exp.jobTitle}</h4>
                  <p>{exp.company} - {exp.location}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                  </p>
                  <p className="mt-2">{exp.description}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}

          {/* Add New Experience Form */}
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={newExperience.jobTitle}
                  onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                  placeholder="Enter job title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={newExperience.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newExperience.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Enter location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newExperience.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newExperience.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  disabled={newExperience.currentlyWorking}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="currentlyWorking"
                  checked={newExperience.currentlyWorking}
                  onCheckedChange={(checked) => handleInputChange("currentlyWorking", !!checked)}
                />
                <Label htmlFor="currentlyWorking">Currently working here</Label>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newExperience.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your responsibilities and achievements"
                />
              </div>
            </div>
            <Button 
              className="mt-4"
              onClick={handleAddExperience}
              disabled={!newExperience.jobTitle || !newExperience.company}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Experience
            </Button>
          </Card>
        </div>
      </motion.div>
    )
  } catch (error) {
    console.error("Error in ProfessionalDetailsStep:", error)
    return <div>Error loading this step. Please try again later.</div>
  }
}
