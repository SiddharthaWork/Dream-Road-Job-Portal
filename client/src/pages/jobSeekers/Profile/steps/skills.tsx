"use client"

import type React from "react"
import { forwardRef, ForwardedRef, useState, useEffect, useImperativeHandle } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
import { useFormContext } from "@/contexts/form-context"

// NOTE: This component must be rendered inside a <FormProvider> from '@/contexts/form-context'.
const SkillsStep = forwardRef((props, ref: ForwardedRef<{ validate: () => boolean }>) => {
  try {
    const { formData, updateFormData } = useFormContext()
    const [newSkill, setNewSkill] = useState("")
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
      validateSkills();
    }, [formData.skills]);

    const validateSkills = () => {
      if (formData.skills.length < 5) {
        setError('Please add at least 5 skills');
        return false;
      }
      setError(null);
      return true;
    };

    useImperativeHandle(ref, () => ({
      validate: () => {
        return validateSkills();
      }
    }));

    const handleAddSkill = () => {
      if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
        updateFormData({ skills: [...formData.skills, newSkill.trim()] })
        setNewSkill("")
      }
    }

    const handleRemoveSkill = (skillToRemove: string) => {
      updateFormData({
        skills: formData.skills.filter((skill) => skill !== skillToRemove),
      })
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
        handleAddSkill()
      }
    }

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
          <p className="text-gray-600">Add your technical and soft skills.</p>
        </div>

        <div className="space-y-4 px-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex space-x-2">
            <div className="flex-1 ">
              <Label htmlFor="newSkill">Add Skill</Label>
              <Input
                id="newSkill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter a skill (e.g., JavaScript, Communication)"
                className="rounded-lg mt-4"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddSkill} className="bg-[#255cf4] hover:bg-[#255cf4]/80 text-white">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Skills Display */}
          <div className="space-y-2">
            <Label>Your Skills</Label>
            <div className="flex flex-wrap gap-2 p-4 border rounded-lg min-h-[100px] bg-gray-50">
              {formData.skills.length === 0 ? (
                <p className="text-gray-500 text-sm">No skills added yet. Add your first skill above.</p>
              ) : (
                formData.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge
                      variant="secondary"
                      className="bg-[#255cf4] text-white hover:bg-purple-200 px-3 py-1 text-sm"
                    >
                      {skill}
                      <button onClick={() => handleRemoveSkill(skill)} className="ml-2 hover:text-[#255cf4]">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {formData.skills.length > 0 && (
            <div className="text-sm text-gray-600">Total skills: {formData.skills.length}</div>
          )}
        </div>
      </motion.div>
    )
  } catch (e) {
    return <div>Error: SkillsStep must be used within a FormProvider.</div>
  }
})

export default SkillsStep;
