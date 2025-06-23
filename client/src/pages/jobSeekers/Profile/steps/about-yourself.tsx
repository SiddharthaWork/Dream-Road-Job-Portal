"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Bold, Italic, Underline } from "lucide-react"
import { useFormContext } from "@/contexts/form-context"
import { ScrollArea } from "@/components/ui/scroll-area"

const genderOptions = ["Male", "Female", "Other", "Prefer not to say"]
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

export function AboutYourselfStep() {
  const { formData, updateFormData } = useFormContext()
  const [selectedSectors, setSelectedSectors] = useState<string[]>(formData.sectors || [])
  const [textFormat, setTextFormat] = useState({ bold: false, italic: false, underline: false })

  const handleSectorToggle = (sector: string) => {
    const newSectors = selectedSectors.includes(sector)
      ? selectedSectors.filter((s) => s !== sector)
      : [...selectedSectors, sector]

    setSelectedSectors(newSectors)
    updateFormData({ sectors: newSectors })
  }

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value })
  }

  return (
    <ScrollArea className="h-full w-full">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 ">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">About yourself</h2>
        <p className="text-gray-600">Fill out your primary information.</p>
      </div>

      {/* Profile Picture Upload */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-gray-400" />
        </div>
        <Button variant="outline" className="bg-black">
          <Upload className="w-4 h-4 mr-2" />
          Upload Profile Picture
        </Button>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Enter your first name"
            className="rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="eg. Copper"
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Gender and Date of Birth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>
            Gender <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              {genderOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">
            Date Of Birth <span className="text-red-500">*</span>
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">
          Phone Number <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          placeholder="Enter your phone number"
          className="rounded-lg"
        />
      </div>

      {/* Sectors */}
      <div className="space-y-2">
        <Label>
          Sectors <span className="text-red-500">*</span>
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
          onChange={(e) => handleInputChange("designation", e.target.value)}
          placeholder="eg. UI UX designer"
          className="rounded-lg"
        />
      </div>

      {/* About Me */}
      <div className="space-y-2">
        <Label htmlFor="aboutMe">
          About Me <span className="text-red-500">*</span>
        </Label>
        <div className="border rounded-lg">
          <div className="flex items-center space-x-2 p-2 border-b bg-gray-50 rounded-t-lg">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={textFormat.bold ? "bg-gray-200" : ""}
              onClick={() => setTextFormat((prev) => ({ ...prev, bold: !prev.bold }))}
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={textFormat.italic ? "bg-gray-200" : ""}
              onClick={() => setTextFormat((prev) => ({ ...prev, italic: !prev.italic }))}
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={textFormat.underline ? "bg-gray-200" : ""}
              onClick={() => setTextFormat((prev) => ({ ...prev, underline: !prev.underline }))}
            >
              <Underline className="w-4 h-4" />
            </Button>
          </div>
          <Textarea
            id="aboutMe"
            value={formData.aboutMe}
            onChange={(e) => handleInputChange("aboutMe", e.target.value)}
            placeholder="eg. Secure a responsible career opportunity to fully utilize my training and skills, while making a significant contribution to success of the company."
            className="border-0 rounded-t-none min-h-[120px] resize-none focus-visible:ring-0"
            style={{
              fontWeight: textFormat.bold ? "bold" : "normal",
              fontStyle: textFormat.italic ? "italic" : "normal",
              textDecoration: textFormat.underline ? "underline" : "none",
            }}
          />
        </div>
      </div>
    </motion.div>
    </ScrollArea>
  )
}
