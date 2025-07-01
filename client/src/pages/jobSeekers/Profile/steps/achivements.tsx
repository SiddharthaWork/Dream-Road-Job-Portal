"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Award, BadgeIcon as Certificate } from "lucide-react"
import { useFormContext } from "@/contexts/form-context"
import { FormProvider } from "@/contexts/form-context"

// NOTE: This component must be rendered inside a <FormProvider> from '@/contexts/form-context'.
export default function AchievementsStep() {
  try {
    const { formData, addAchievement, removeAchievement, addCertificate, removeCertificate } = useFormContext()
    const [newAchievement, setNewAchievement] = useState({ title: "", description: "" })
    const [newCertificate, setNewCertificate] = useState({ title: "", description: "" })

    const handleAddAchievement = () => {
      if (newAchievement.title && newAchievement.description) {
        addAchievement(newAchievement)
        setNewAchievement({ title: "", description: "" })
      }
    }

    const handleAddCertificate = () => {
      if (newCertificate.title && newCertificate.description) {
        addCertificate(newCertificate)
        setNewCertificate({ title: "", description: "" })
      }
    }

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Achievements & Certifications</h2>
          <p className="text-gray-600">Add your achievements and certifications.</p>
        </div>

        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="achievements" className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center space-x-2">
              <Certificate className="w-4 h-4" />
              <span>Certifications</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-4">
            {/* Existing Achievements */}
            {formData.achievements.map((achievement) => (
              <Card key={achievement.id} className="p-4 rounded-lg border-l-4 border-l-yellow-500">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg flex items-center">
                      <Award className="w-5 h-5 mr-2 text-yellow-500" />
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{achievement.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAchievement(achievement.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}

            {/* Add New Achievement */}
            <Card className="p-6 rounded-lg border-2 border-dashed border-gray-300">
              <h3 className="font-semibold mb-4">Add Achievement</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Achievement Title</Label>
                  <Input
                    value={newAchievement.title}
                    onChange={(e) => setNewAchievement((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter achievement title"
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newAchievement.description}
                    onChange={(e) => setNewAchievement((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your achievement"
                    className="rounded-lg min-h-[80px]"
                  />
                </div>
                <Button onClick={handleAddAchievement} className="bg-[#255cf4] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4">
            {/* Existing Certificates */}
            {formData.certificates.map((certificate) => (
              <Card key={certificate.id} className="p-4 rounded-lg border-l-4 border-l-blue-500">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg flex items-center">
                      <Certificate className="w-5 h-5 mr-2 text-blue-500" />
                      {certificate.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{certificate.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCertificate(certificate.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}

            {/* Add New Certificate */}
            <Card className="p-6 rounded-lg border-2 border-dashed border-gray-300">
              <h3 className="font-semibold mb-4">Add Certificate</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Certificate Title</Label>
                  <Input
                    value={newCertificate.title}
                    onChange={(e) => setNewCertificate((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter certificate title"
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newCertificate.description}
                    onChange={(e) => setNewCertificate((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your certificate"
                    className="rounded-lg min-h-[80px]"
                  />
                </div>
                <Button onClick={handleAddCertificate} className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Certificate
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    )
  } catch (e) {
    return <div>Error: AchievementsStep must be used within a FormProvider.</div>
  }
}

export const Preview = () => {
  return (
    <FormProvider>
      <AchievementsStep />
    </FormProvider>
  )
}