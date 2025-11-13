"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FormProvider, useFormContext, FormContextData } from "@/contexts/form-context"
import  AboutYourselfStep  from "./steps/about-yourself"
import  ExperienceStep  from "./steps/address"
import  EducationStep  from "./steps/education"
import  SkillsStep  from "./steps/skills"
import  AchievementsStep  from "./steps/achivements"
import  SummaryStep  from "./steps/summary"
import  ProjectsStep  from "./steps/project-step"
import  ProgressStepper  from "./ProjectStepper"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"

const steps = [
  { id: 1, title: "About Yourself", component: AboutYourselfStep },
  { id: 2, title: "Experience", component: ExperienceStep },
  { id: 3, title: "Education", component: EducationStep },
  { id: 4, title: "Projects", component: ProjectsStep },
  { id: 5, title: "Skills", component: SkillsStep },
  { id: 6, title: "Achievements", component: AchievementsStep },
  { id: 7, title: "Summary", component: SummaryStep },
]

const FormSubmitButton = ({ onSubmit, isSubmitting }: any) => {
  const { formData } = useFormContext();
  const router = useRouter();
  
  const handleClick = async () => {
    // Combine firstName and lastName into fullName for backend
    const { firstName, lastName, ...rest } = formData;
    const fullname = [firstName, lastName].filter(Boolean).join(' ').trim();
    await onSubmit({ ...rest });
  };
  
  return (
    <Button 
      onClick={handleClick} 
      disabled={isSubmitting}
      className="bg-[#255cf4] hover:bg-blue-500 text-white"
    >
      {isSubmitting ? 'Saving Profile...' : 'Complete Profile'}
    </Button>
  );
};

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();
  const stepRef = useRef<{ validate: () => boolean } | null>(null);

  const nextStep = async () => {
    if (stepRef.current) {
      const isValid = await stepRef.current.validate();
      if (!isValid) {
        toast.error("Please fill all the fields");
        return;
      }
    }
    
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

  const handleSubmit = async (formContextData: FormContextData) => {
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        throw new Error('User ID not found');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('userId', userId);

      // Extract non-file data and stringify it
      const { profilePicture, resume, ...rest } = formContextData;
      formDataToSend.append('data', JSON.stringify(rest));

      if (profilePicture instanceof File) {
        formDataToSend.append('profilePicture', profilePicture);
      } else if (typeof profilePicture === 'string') {
        formDataToSend.append('profilePictureUrl', profilePicture);
      }

      if (resume instanceof File) {
        formDataToSend.append('resume', resume);
      } else if (typeof resume === 'string') {
        formDataToSend.append('resumeUrl', resume);
      }

      const response = await fetch('http://localhost:4000/api/user/save-profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      const result = await response.json();
      console.log('Profile saved successfully:', result);
      toast.success('Profile Saved');
      localStorage.setItem('profile', 'true');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider>
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <ProgressStepper steps={steps.slice(0, 6)} currentStep={currentStep}  />

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
                <CurrentStepComponent ref={stepRef} />
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
              <FormSubmitButton onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            )}
          </div>
        </Card>
      </div>
    </FormProvider>
  )
}
