"use client"

import { useState, useRef, useEffect, forwardRef, useImperativeHandle, ForwardedRef } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, File, X, Bold, Italic, Underline } from "lucide-react"
import { useFormContext } from "@/contexts/form-context"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FormProvider } from "@/contexts/form-context"

const genderOptions = ["Male", "Female", "Other", "Prefer not to say"]

const AboutYourselfStep = forwardRef((props, ref: ForwardedRef<{ validate: () => boolean }>) => {
  try {
    const { formData, updateFormData } = useFormContext()
    const [selectedSectors, setSelectedSectors] = useState<string[]>(formData.sectors || [])
    const [textFormat, setTextFormat] = useState({ bold: false, italic: false, underline: false })
    const profilePicInputRef = useRef<HTMLInputElement>(null)
    const resumeInputRef = useRef<HTMLInputElement>(null)
    const [profilePic, setProfilePic] = useState<File | null>(null)
    const [resume, setResume] = useState<File | null>(null)
    const [fullname, setFullname] = useState<string>("")
    const [dateError, setDateError] = useState<string | null>(null)
    const [errors, setErrors] = useState({
      gender: '',
      dateOfBirth: '',
      phoneNumber: '',
      city: '',
      postalCode: '',
      aboutMe: '',
      profilePicture: '',
      resume: ''
    })

    const validateField = (field: string, value: any) => {
      let error = ''
      
      if (!value) {
        error = `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`
      } else {
        // Add phone number validation
        if (field === 'phoneNumber' && value.length !== 10) {
          error = 'Phone number must be exactly 10 digits'
        }
        
        // Add city validation
        if (field === 'city') {
          const wordCount = value.trim().split(/\s+/).filter(Boolean).length
          if (wordCount > 20) {
            error = 'City must be maximum 30 words'
          }
        }
        
        // Add aboutMe validation
        if (field === 'aboutMe') {
          const wordCount = value.trim().split(/\s+/).filter(Boolean).length
          if (wordCount > 100) {
            error = 'About me must be maximum 100 words'
          }
        }
      }
      
      setErrors(prev => ({ ...prev, [field]: error }))
      return error
    }

    const validateForm = () => {
      const newErrors = {
        gender: validateField('gender', formData.gender),
        dateOfBirth: validateField('dateOfBirth', formData.dateOfBirth),
        phoneNumber: validateField('phoneNumber', formData.phoneNumber),
        city: validateField('city', formData.city),
        postalCode: validateField('postalCode', formData.postalCode),
        aboutMe: validateField('aboutMe', formData.aboutMe),
        profilePicture: validateField('profilePicture', profilePic),
        resume: validateField('resume', resume)
      }
      
      return Object.values(newErrors).every(error => error === '')
    }

    useEffect(() => {
      validateForm()
    }, [formData, profilePic, resume])

    const handleSectorToggle = (sector: string) => {
      const newSectors = selectedSectors.includes(sector)
        ? selectedSectors.filter((s) => s !== sector)
        : [...selectedSectors, sector]

      setSelectedSectors(newSectors)
      updateFormData({ sectors: newSectors })
    }

    const validateDateOfBirth = (dateString: string) => {
      if (!dateString) return "Date of birth is required";
      
      const today = new Date();
      const birthDate = new Date(dateString);

      // Check if the date is valid
      if (isNaN(birthDate.getTime())) {
        return "Invalid date";
      }
      
      if (birthDate > today) {
        return "Birth date cannot be in the future";
      }
      
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      if (age < 18) {
        return "You must be at least 18 years old";
      }
      
      return null;
    };

    const handleInputChange = (field: string, value: string) => {
      updateFormData({ [field]: value })
      validateField(field, value)
      
      if (field === "dateOfBirth") {
        const error = validateDateOfBirth(value);
        setDateError(error);
      }
    }

    const handleFileChange = (type: 'profilePicture' | 'resume', file: File | null) => {
      if (type === 'profilePicture') {
        setProfilePic(file)
        updateFormData({ profilePicture: file })
      } else {
        setResume(file)
        updateFormData({ resume: file })
      }
      validateField(type, file)
    }

    useEffect(() => {
      const fullname = localStorage.getItem("fullname")
      if(fullname){
        setFullname(fullname)
      }
    }, [])

    useImperativeHandle(ref, () => ({
      validate: () => {
        const isValid = validateForm();
        const dobError = validateDateOfBirth(formData.dateOfBirth);
        return isValid && !dobError;
      }
    }));

    return (
      <FormProvider>    
      <ScrollArea className="h-full w-full ">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 ">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">About yourself <span className="text-red-500">*</span></h2>
          <p className="text-gray-600">Fill out your primary information.</p>
        </div>

        {/* Profile Picture Upload */}
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            {profilePic ? (
              <img
                src={URL.createObjectURL(profilePic)}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <Upload className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <Button
            variant="outline"
            className="bg-black"
            onClick={() => profilePicInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            {profilePic ? "Profile Picture Uploaded" : "Upload Profile Picture"}
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={profilePicInputRef}
            className="hidden"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                handleFileChange('profilePicture', file);
              } else {
                handleFileChange('profilePicture', null);
              }
            }}
          />
        </div>
        {errors.profilePicture && <p className="text-red-500 text-sm px-4">{errors.profilePicture}</p>}

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              value={fullname}
              readOnly
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Enter your first name"
              className="rounded-lg hover:none focus:none border-0 ring-0"
            />
          </div>
        </div>

        {/* Gender and Date of Birth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
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
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
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
              max={new Date().toISOString().split("T")[0]}  
              required
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
            {dateError && <p className="text-red-500 text-sm mt-1">{dateError}</p>}
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-2 px-4">
          <Label htmlFor="phoneNumber">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phoneNumber"
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={10}
            value={formData.phoneNumber}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only digits up to 10
              if (/^\d{0,10}$/.test(value)) {
                handleInputChange("phoneNumber", value);
              }
            }}
            placeholder="Enter your phone number"
            className="rounded-lg"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          <div className="space-y-2">
            <Label htmlFor="city">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="Enter your city"
              className="rounded-lg"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">
              Postal Code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              placeholder="Enter postal code"
              className="rounded-lg"
            />
            {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
          </div>
        </div>

        {/* About Me */}
        <div className="space-y-2 px-4">
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
          {errors.aboutMe && <p className="text-red-500 text-sm">{errors.aboutMe}</p>}
        </div>
        
        {/* Resume Upload */}
        <div className="flex items-center space-x-4 px-4">
          <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center">
            <File className="w-6 h-6 text-gray-400" />
          </div>
          <Button
            variant="outline"
            className="bg-black"
            onClick={() => resumeInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            {resume ? "Resume Uploaded" : "Upload Your Resume"}
          </Button>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            ref={resumeInputRef}
            className="hidden"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                handleFileChange('resume', file);
              } else {
                handleFileChange('resume', null);
              }
            }}
          />
          {resume && (
            <span className="ml-2 text-[#255cf4] font-medium">{resume.name}</span>
          )}
        </div>
        {errors.resume && <p className="text-red-500 text-sm px-4">{errors.resume}</p>}
        
      </motion.div>
      </ScrollArea>
      </FormProvider>
    )
  } catch (e) {
    return <div>Error: AboutYourselfStep must be used within a FormProvider.</div>;
  }
});

export default AboutYourselfStep;

export const Preview = () => {
  return (
    <FormProvider>
      <AboutYourselfStep />
    </FormProvider>
  )
}