"use client"

import { useState, useEffect } from "react"
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Share2, CheckCircle, Sparkles, Edit3 } from "lucide-react"
import { Textarea } from "../ui/textarea"
import toast from "react-hot-toast";

// Confetti component for celebration effect
const Confetti = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: ["#255cf4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][Math.floor(Math.random() * 5)],
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default function JobApplicationModal({ jobId, userId, onApplied, onClose, onSuccess }: { jobId: string, userId: string, onApplied?: () => void, onClose?: () => void, onSuccess?: () => void }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isApplying, setIsApplying] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isEditingResume, setIsEditingResume] = useState(false)
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const resumeFileName = "resume.pdf"

  const handleApply = async () => {
    setIsApplying(true);
    try {
      const formData = new FormData();
      formData.append('id', userId);
      formData.append('coverLetter', coverLetter);
      
      if (resumeFile) {
        formData.append('file', resumeFile);
      }
      
      const response = await axios.post(
        `http://localhost:4000/api/application/applyJob/${jobId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      if (response.data.success) {
        setShowSuccess(true);
        setShowConfetti(true);
        onApplied?.();
        onSuccess?.(); 
        setTimeout(() => {
          setShowSuccess(false);
          setShowConfetti(false);
          setIsOpen(false);
          if (onApplied) onApplied();
        }, 3000);
        toast.success("Job applied successfully");
      } else {
        toast.error("Failed to apply for job");
      }
    } catch (err) {
      toast.error("Failed to apply for job");
    } finally {
      setIsApplying(false);
    }
  }

  const handleCancel = () => {
    setIsOpen(false)
    setShowSuccess(false)
    setShowConfetti(false)
    if (onClose) onClose()
  }

  const resetModal = () => {
    setShowSuccess(false)
    setShowConfetti(false)
    setIsApplying(false)
  }

  useEffect(() => {
    if (!isOpen) {
      resetModal()
      if (onClose) onClose()
    }
  }, [isOpen])

  return (
      <>
      <Confetti isActive={showConfetti} />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        
        <DialogContent className="max-w-md">
          {!showSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-[#255cf4]" />
                  Apply for Position
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Your profile and resume will be shared with the recruiter for this position.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <Card className="border-[#255cf4]/20 bg-[#255cf4]/5">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#255cf4]/10 rounded-lg">
                        <FileText className="h-5 w-5 text-[#255cf4]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Resume</h4>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-600 font-mono bg-white px-2 py-1 rounded border flex-1">
                            {resumeFileName}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditingResume(!isEditingResume)}
                            className="h-8 w-8 p-0 hover:bg-[#255cf4]/10 text-[#255cf4]"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#255cf4]/20 bg-[#255cf4]/5 mt-4">
                  <CardContent className="pt-4 ">
                    <div className="flex items-center gap-3">
                   
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1 ">Cover Letter</h4>
                        <div className="flex items-center gap-2">

                        <Textarea 
                          className="mt-2 h-[5rem]" 
                          placeholder="Cover Letter" 
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                        />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {isEditingResume && (
                  <Card className="mt-3 border-[#255cf4]/30">
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-900">Edit Resume</h5>
                        <div className="space-y-2">
                          <input 
                            type="file"
                            id="resume-upload"
                            style={{ display: 'none' }}
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setResumeFile(e.target.files[0]);
                              }
                            }}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-left border-dashed border-[#255cf4] bg-transparent text-black hover:bg-[#255cf4]/5"
                            onClick={() => document.getElementById('resume-upload')?.click()}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            {resumeFile ? resumeFile.name : 'Upload New Resume'}
                          </Button>
                          <p className="text-xs text-gray-500 text-center">
                            Supported formats: PDF (Max 5MB)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> By clicking "Apply", you consent to sharing your profile information and
                    resume with the hiring team.
                  </p>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={handleCancel} disabled={isApplying} className="px-6">
                  Cancel
                </Button>
                <Button
                  onClick={handleApply}
                  disabled={isApplying}
                  className="bg-[#255cf4] hover:bg-[#1e4bc7] text-white px-8"
                >
                  {isApplying ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Applying...
                    </div>
                  ) : (
                    "Apply"
                  )}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mb-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-[#255cf4] animate-pulse" />
                  <h3 className="text-xl font-bold text-gray-900">Application Submitted!</h3>
                  <Sparkles className="h-5 w-5 text-[#255cf4] animate-pulse" />
                </div>
                <p className="text-gray-600 mb-4">Your application has been successfully sent to the recruiter.</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    You'll receive a confirmation email shortly and hear back from the team within 2-3 business days.
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      </>
  )
}
