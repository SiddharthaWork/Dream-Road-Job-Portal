"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResumeEditor from "./ResumeEditor";
import ResumePreview from "./ResumePreview";
import ThemeSelector from "./ThemeSelector";
import PDFExporter from "./PDFExporter";
import { ResumeData, ResumeTheme } from "@/types/resume";
import { Save, RotateCcw, Send, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { transformUserData } from "@/utils/transformUserData";
import { UserApiResponse } from "@/types/user";

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
    },
    experience: [],
    education: [],
    projects: [],
    skills: [],
    languages: [],
    certifications: [],
  }); 
  const [selectedTheme, setSelectedTheme] = useState<ResumeTheme>("classic");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/user/getuser/${userId}`
        );
        const data: UserApiResponse = await response.json();
        if (data.success) {
          const transformedData = transformUserData(data);
          setResumeData(transformedData);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        setError("An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = () => {
    localStorage.setItem("dreamRoadResume", JSON.stringify(resumeData));
    localStorage.setItem("dreamRoadTheme", selectedTheme);
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully.",
    });
  };

  const handleReset = () => {
    setResumeData({
      personalInfo: {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        address: "",
        summary: "",
      },
      experience: [],
      education: [],
      projects: [],
      skills: [],
      languages: [],
      certifications: [],
    });
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

  const handlePrint = () => {
    const content = document.getElementById('resume-preview');
    if (!content) return;
    
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    
    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) return;
    
    printWindow.document.write('<html><head><title>Resume</title>');
    
    // Include styles
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
    styles.forEach(style => {
      printWindow.document.write(style.outerHTML);
    });
    
    printWindow.document.write('</head><body>');
    printWindow.document.write(content.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-elegant">
        <div className="container max-w-7xl mx-auto pr-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-resume-heading text-black tracking-tight">
                Build Your Resume
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeSelector 
                selectedTheme={selectedTheme}
                onThemeChange={setSelectedTheme}
              />
              
              {/* <Button 
                variant="outline" 
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button> */}
              
              {/* <Button 
                variant="secondary" 
                onClick={handleSave}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Save Draft
              </Button> */}
              
              {/* <PDFExporter 
                resumeData={resumeData}
                theme={selectedTheme}
              /> */}
              <Button 
                variant="default" 
                onClick={handlePrint}
                className="gap-2"
                >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
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
              
              <div id="resume-preview" className="border border-resume-border rounded-lg overflow-hidden bg-resume-bg bg-black">
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