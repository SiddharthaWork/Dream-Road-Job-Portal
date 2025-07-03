"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeEditor } from "./ResumeEditor";
import { ResumePreview } from "./ResumePreview";
import { ThemeSelector } from "./ThemeSelector";
import { PDFExporter } from "./PDFExporter";
import { mockUserData } from "@/data/resumeMockData";
import { ResumeData, ResumeTheme } from "@/types/resume";
import { Save, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(mockUserData);
  const [selectedTheme, setSelectedTheme] = useState<ResumeTheme>("modern");
  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem("dreamRoadResume", JSON.stringify(resumeData));
    localStorage.setItem("dreamRoadTheme", selectedTheme);
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully.",
    });
  };

  const handleReset = () => {
    setResumeData(mockUserData);
    setSelectedTheme("modern");
    localStorage.removeItem("dreamRoadResume");
    localStorage.removeItem("dreamRoadTheme");
    toast({
      title: "Resume Reset",
      description: "Your resume has been reset to default values.",
    });
  };

  const updateResumeData = (newData: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...newData }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-elegant">
        <div className="container max-w-7xl mx-auto pr-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <h1 className="text-2xl font-bold text-resume-heading">
                Dream Road Resume Builder
              </h1>
              <p className="text-resume-subtext">
                Create your professional resume in minutes
              </p> */}
              <h1 className="text-2xl font-bold text-resume-heading text-black tracking-tight">Build Your Resume</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeSelector 
                selectedTheme={selectedTheme}
                onThemeChange={setSelectedTheme}
              />
              
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={handleSave}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              
              <PDFExporter 
                resumeData={resumeData}
                theme={selectedTheme}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <Card className="p-6 shadow-elegant">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>
              
              <div className="min-h-[600px]">
                <ResumeEditor 
                  resumeData={resumeData}
                  onUpdate={updateResumeData}
                />
              </div>
            </Tabs>
          </Card>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-6">
            <Card className="p-6 shadow-resume bg-gradient-to-br from-background to-muted/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-resume-heading">
                  Live Preview
                </h3>
                <div className="text-sm text-resume-subtext">
                  Theme: {selectedTheme}
                </div>
              </div>
              
              <div className="border border-resume-border rounded-lg overflow-hidden bg-resume-bg">
                <ResumePreview 
                  resumeData={resumeData}
                  theme={selectedTheme}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;