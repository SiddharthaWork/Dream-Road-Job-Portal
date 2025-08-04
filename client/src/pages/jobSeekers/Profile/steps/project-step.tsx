"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, ExternalLink } from "lucide-react"
import { useFormContext } from "@/contexts/form-context"
import { FormProvider } from "@/contexts/form-context"
import { ScrollArea } from "@/components/ui/scroll-area"

// NOTE: This component must be rendered inside a <FormProvider> from '@/contexts/form-context'.
export default function ProjectsStep() {
  try {
    const { formData, addProject, removeProject } = useFormContext()
    const [newProject, setNewProject] = useState({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      projectLink: "",
    })

    const initialErrors = {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    };

    const [errors, setErrors] = useState(initialErrors);

    const validateProject = () => {
      const errors = {
        title: !newProject.title ? 'Project title is required' : '',
        description: !newProject.description ? 'Description is required' : '',
        startDate: !newProject.startDate ? 'Start date is required' : 
          new Date(newProject.startDate) > new Date() ? 'Start date cannot be in the future' : '',
        endDate: !newProject.endDate 
          ? 'End date is required' : 
          newProject.endDate && new Date(newProject.endDate) > new Date() 
            ? 'End date cannot be in the future' : 
          newProject.startDate && newProject.endDate && newProject.endDate < newProject.startDate 
            ? 'End date must be after start date' : ''
      };
      
      setErrors(errors);
      return Object.values(errors).every(error => !error);
    };

    const handleAddProject = () => {
      if (validateProject()) {
        addProject(newProject)
        setNewProject({
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          projectLink: "",
        })
        setErrors(initialErrors)
      }
    }

    const handleInputChange = (field: string, value: string) => {
      setNewProject((prev) => ({ ...prev, [field]: value }))
    }

    const today = new Date().toISOString().split('T')[0]

    return (
        <ScrollArea className="h-full w-full ">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
          <p className="text-gray-600">Add your personal or academic projects.</p>
        </div>

        {/* Existing Projects */}
        {(formData.projects || []).map((project) => (
          <Card key={project.id} className="p-4 rounded-lg border-l-4 border-l-green-500">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  {project.projectLink && (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{project.description}</p>
                <p className="text-sm text-gray-500">
                  {project.startDate} - {project.endDate}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}

        {/* Add New Project */}
        <Card className="p-6 rounded-lg border-2 border-dashed border-gray-300">
          <h3 className="font-semibold mb-4">Add Project</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Project Title</Label>
              <Input
                value={newProject.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter project title"
                className="rounded-lg"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newProject.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your project"
                className="rounded-lg min-h-[100px]"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={newProject.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  max={today}
                  className="rounded-lg"
                />
                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={newProject.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  max={today}
                  className="rounded-lg"
                />
                {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Project Link (Optional)</Label>
              <Input
                type="url"
                value={newProject.projectLink}
                onChange={(e) => handleInputChange("projectLink", e.target.value)}
                placeholder="https://example.com"
                className="rounded-lg"
              />
            </div>

            <Button onClick={handleAddProject} className="bg-[#255cf4] hover:bg-blue-500 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </Card>
      </motion.div>
        </ScrollArea>
    )
  } catch (e) {
    return <div>Error: ProjectsStep must be used within a FormProvider.</div>;
  }
}
