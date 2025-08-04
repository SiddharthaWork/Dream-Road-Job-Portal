"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2 } from "lucide-react"
import { useFormContext } from "@/contexts/form-context"
import { FormProvider } from "@/contexts/form-context"

const collegeTypes = ["School", "College", "University"]

export default function EducationStep() {
  try {
    const { formData, addEducation, removeEducation } = useFormContext()
    const [newEducation, setNewEducation] = useState({
      collegeType: "",
      degree: "",
      city: "",
      startDate: "",
      graduationDate: "",
      currentlyStudying: false,
    })
    const initialErrors = {
      collegeType: '',
      degree: '',
      city: '',
      startDate: '',
      graduationDate: '',
    }
    const [errors, setErrors] = useState(initialErrors)

    const handleAddEducation = () => {
      if (validateEducation()) {
        addEducation(newEducation)
        setNewEducation({
          collegeType: "",
          degree: "",
          city: "",
          startDate: "",
          graduationDate: "",
          currentlyStudying: false,
        })
        setErrors(initialErrors)
      }
    }

    const handleInputChange = (field: string, value: string | boolean) => {
      if (field === "currentlyStudying" && value === true) {
        setNewEducation(prev => ({
          ...prev,
          graduationDate: ""
        }));
        setErrors(prev => ({
          ...prev,
          graduationDate: ""
        }));
      }
      setNewEducation(prev => ({ ...prev, [field]: value }));
    }

    const validateEducation = () => {
      const errors = {
        collegeType: !newEducation.collegeType ? 'College type is required' : '',
        degree: !newEducation.degree ? 'Degree is required' : '',
        city: !newEducation.city ? 'College name is required' : '',
        startDate: !newEducation.startDate ? 'Start date is required' : 
          new Date(newEducation.startDate) > new Date() ? 'Start date cannot be in the future' : '',
        graduationDate: !newEducation.graduationDate && !newEducation.currentlyStudying 
          ? 'Graduation date is required' : 
          new Date(newEducation.graduationDate) > new Date() 
            ? 'Graduation date cannot be in the future' : 
          newEducation.startDate && newEducation.graduationDate && newEducation.graduationDate < newEducation.startDate 
            ? 'Graduation date must be after start date' : ''
      };
      
      setErrors(errors);
      return Object.values(errors).every(error => !error);
    };

    const today = new Date().toISOString().split('T')[0];

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Education</h2>
          <p className="text-gray-600">Add your educational background.</p>
        </div>

        {/* Existing Education */}
        {formData.education.map((edu) => (
          <Card key={edu.id} className="p-4 rounded-lg border-l-4 border-l-blue-500">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{edu.degree}</h3>
                <p className="text-gray-600">
                  {edu.collegeType} • {edu.city}
                </p>
                <p className="text-sm text-gray-500">
                  {edu.startDate} - {edu.currentlyStudying ? "Present" : edu.graduationDate}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}

        {/* Add New Education */}
        <Card className="p-6 rounded-lg border-2 border-dashed border-gray-300">
          <h3 className="font-semibold mb-4">Add Education</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>College Type</Label>
              <Select value={newEducation.collegeType} onValueChange={(value) => handleInputChange("collegeType", value)}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {collegeTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.collegeType && <p className="text-red-500">{errors.collegeType}</p>}
            </div>
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input
                value={newEducation.degree}
                onChange={(e) => handleInputChange("degree", e.target.value)}
                placeholder="Enter degree"
                className="rounded-lg"
              />
              {errors.degree && <p className="text-red-500">{errors.degree}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label>College</Label>
              <Input
                value={newEducation.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="Enter college name"
                className="rounded-lg"
              />
              {errors.city && <p className="text-red-500">{errors.city}</p>}
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={newEducation.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                max={today}
                className="rounded-lg"
              />
              {errors.startDate && <p className="text-red-500">{errors.startDate}</p>}
            </div>
            <div className="space-y-2">
              <Label>Graduation Date</Label>
              <Input
                type="date"
                value={newEducation.graduationDate}
                onChange={(e) => handleInputChange("graduationDate", e.target.value)}
                disabled={newEducation.currentlyStudying}
                max={today}
                className="rounded-lg"
              />
              {errors.graduationDate && <p className="text-red-500">{errors.graduationDate}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="currentlyStudying"
              checked={newEducation.currentlyStudying}
              onCheckedChange={(checked) => handleInputChange("currentlyStudying", checked as boolean)}
            />
            <Label htmlFor="currentlyStudying">I currently study here</Label>
          </div>

          <Button onClick={handleAddEducation} className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </Card>
      </motion.div>
    )
  } catch (e) {
    return <div>Error: EducationStep must be used within a FormProvider.</div>;
  }
}

export const Preview = () => {
  return (
    <FormProvider>
      <EducationStep />
    </FormProvider>
  )
}
