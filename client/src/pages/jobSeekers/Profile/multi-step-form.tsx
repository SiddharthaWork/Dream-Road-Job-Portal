"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FormProvider } from "@/contexts/form-context"
import { AboutYourselfStep } from "./steps/about-yourself"
import { AddressStep } from "./steps/address"
import { EducationStep } from "./steps/education"
import { SkillsStep } from "./steps/skills"
import { AchievementsStep } from "./steps/achivements"
import { SummaryStep } from "./steps/summary"
import { ProjectsStep } from "./steps/project-step"
import { ProgressStepper } from "./ProjectStepper"

const steps = [
  { id: 1, title: "About Yourself", component: AboutYourselfStep },
  { id: 2, title: "Address", component: AddressStep },
  { id: 3, title: "Education", component: EducationStep },
  { id: 4, title: "Projects", component: ProjectsStep },
  { id: 5, title: "Skills", component: SkillsStep },
  { id: 6, title: "Achievements", component: AchievementsStep },
  { id: 7, title: "Summary", component: SummaryStep },
]

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(0)

  const nextStep = () => {
    if (currentStep < steps.length) {
      setDirection(1)
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1)
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1)
    setCurrentStep(step)
  }

  const CurrentStepComponent = steps[currentStep - 1].component

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <FormProvider>
      <div className="max-w-4xl mx-auto">
        <ProgressStepper steps={steps.slice(0, 6)} currentStep={currentStep} onStepClick={goToStep} />

        <Card className="mt-8 p-8 shadow-lg rounded-2xl">
          <div className="relative overflow-hidden min-h-[600px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <CurrentStepComponent />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button onClick={nextStep} className="bg-[#255cf4] hover:bg-blue-500 text-white">
                Continue to {steps[currentStep]?.title}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button className="bg-[#255cf4] hover:bg-blue-500 text-white">Submit Application</Button>
            )}
          </div>
        </Card>
      </div>
    </FormProvider>
  )
}
