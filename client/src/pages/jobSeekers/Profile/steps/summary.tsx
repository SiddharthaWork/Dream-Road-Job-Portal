"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, MapPin, GraduationCap, Briefcase, Code, Award } from "lucide-react"
import { useFormContext } from "@/contexts/form-context"
import { ScrollArea } from "@/components/ui/scroll-area"

export function SummaryStep() {
  const { formData } = useFormContext()

  return (
    <ScrollArea className="h-full w-full">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Summary</h2>
        <p className="text-gray-600">Review your information before submitting.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 mr-2 text-blue-500" />
            <h3 className="text-lg font-semibold">Personal Information</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <span className="font-medium">Gender:</span> {formData.gender}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {formData.phoneNumber}
            </p>
            <p>
              <span className="font-medium">Date of Birth:</span> {formData.dateOfBirth}
            </p>
            <p>
              <span className="font-medium">Designation:</span> {formData.designation}
            </p>
            <div>
              <span className="font-medium">Sectors:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.sectors.map((sector) => (
                  <Badge key={sector} variant="secondary" className="text-xs">
                    {sector}
                  </Badge>
                ))}
              </div>
            </div>
            {formData.aboutMe && (
              <div>
                <span className="font-medium">About:</span>
                <p className="text-gray-600 mt-1">{formData.aboutMe}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Address */}
        <Card className="p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <MapPin className="w-5 h-5 mr-2 text-green-500" />
            <h3 className="text-lg font-semibold">Address</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">City:</span> {formData.city}
            </p>
            <p>
              <span className="font-medium">Province:</span> {formData.province}
            </p>
            <p>
              <span className="font-medium">Postal Code:</span> {formData.postalCode}
            </p>
            <p>
              <span className="font-medium">Address:</span> {formData.currentAddress}
            </p>
          </div>
        </Card>

        {/* Education */}
        <Card className="p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <GraduationCap className="w-5 h-5 mr-2 text-purple-500" />
            <h3 className="text-lg font-semibold">Education ({formData.education.length})</h3>
          </div>
          <div className="space-y-3">
            {formData.education.map((edu) => (
              <div key={edu.id} className="text-sm">
                <p className="font-medium">{edu.degree}</p>
                <p className="text-gray-600">
                  {edu.collegeType} • {edu.city}
                </p>
                <p className="text-gray-500 text-xs">
                  {edu.startDate} - {edu.currentlyStudying ? "Present" : edu.graduationDate}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Projects */}
        <Card className="p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Briefcase className="w-5 h-5 mr-2 text-orange-500" />
            <h3 className="text-lg font-semibold">Projects ({formData.projects.length})</h3>
          </div>
          <div className="space-y-3">
            {formData.projects.map((project) => (
              <div key={project.id} className="text-sm">
                <p className="font-medium">{project.title}</p>
                <p className="text-gray-600 text-xs">{project.description}</p>
                <p className="text-gray-500 text-xs">
                  {project.startDate} - {project.endDate}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Skills */}
        <Card className="p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Code className="w-5 h-5 mr-2 text-indigo-500" />
            <h3 className="text-lg font-semibold">Skills ({formData.skills.length})</h3>
          </div>
          <div className="flex flex-wrap gap-1">
            {formData.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Achievements & Certifications */}
        <Card className="p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Award className="w-5 h-5 mr-2 text-yellow-500" />
            <h3 className="text-lg font-semibold">Achievements & Certifications</h3>
          </div>
          <div className="space-y-4">
            {formData.achievements.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Achievements ({formData.achievements.length})</h4>
                <div className="space-y-2">
                  {formData.achievements.map((achievement) => (
                    <div key={achievement.id} className="text-sm">
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-gray-600 text-xs">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.certificates.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Certifications ({formData.certificates.length})</h4>
                <div className="space-y-2">
                  {formData.certificates.map((certificate) => (
                    <div key={certificate.id} className="text-sm">
                      <p className="font-medium">{certificate.title}</p>
                      <p className="text-gray-600 text-xs">{certificate.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </motion.div>
    </ScrollArea> 
  )
}
