"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { FormProvider } from "@/contexts/form-context"

interface Step {
  id: number
  title: string
}

interface ProgressStepperProps {
  steps: Step[]
  currentStep: number
  onStepClick: (step: number) => void
}

export default function ProgressStepper({ steps, currentStep, onStepClick }: ProgressStepperProps) {
  return (
    <FormProvider>
      <div className="flex items-center justify-center space-x-4 mb-8">
        {(steps || []).map((step, index) => {
        const isCompleted = currentStep > step.id
        const isCurrent = currentStep === step.id

        return (
          <div key={step.id} className="flex items-center">
            <motion.button
              onClick={() => onStepClick(step.id)}
              className={`
                relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                transition-all duration-200 cursor-pointer
                ${
                  isCompleted
                    ? "bg-[#255cf4] text-white"
                    : isCurrent
                      ? "bg-[#255cf4] text-white"
                      : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCompleted ? <Check className="w-5 h-5" /> : step.id}
            </motion.button>

            {index < steps.length - 1 && (
              <div
                className={`
                w-12 h-0.5 mx-2
                ${currentStep > step.id ? "bg-[#255cf4]" : "bg-gray-200"}
              `}
              />
            )}
          </div>
        )
      })}
      </div>
    </FormProvider>
  )
}
