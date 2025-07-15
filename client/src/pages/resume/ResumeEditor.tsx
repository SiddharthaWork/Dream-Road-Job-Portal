"use client";
import { TabsContent } from "@/components/ui/tabs";
import { Experience, ResumeData } from "@/types/resume";
import { PersonalInfoEditor } from "./editor/PersonalInfoEditor";
import ExperienceEditor from "./editor/ExperienceEditor";
import { EducationEditor } from "./editor/EducationEditor";
import { SkillsEditor } from "./editor/SkillsEditor";

interface ResumeEditorProps {
  resumeData: ResumeData;
  onUpdate: (data: Partial<ResumeData>) => void;
}

function ResumeEditor({ resumeData, onUpdate }: ResumeEditorProps) {
  return (
    <div className="space-y-6">
      <TabsContent value="personal" className="mt-0">
        <PersonalInfoEditor 
          personalInfo={resumeData?.personalInfo}
          onUpdate={(personalInfo) => onUpdate({ personalInfo })}
        />
      </TabsContent>

      <TabsContent value="experience" className="mt-0">
        <ExperienceEditor 
          experience={resumeData?.experience}
          onUpdate={(experience: Experience[]) => onUpdate({ experience })}
        />
      </TabsContent>

      <TabsContent value="education" className="mt-0">
        <EducationEditor 
          education={resumeData?.education}
          projects={resumeData?.projects}
          certifications={resumeData?.certifications}
          onUpdate={(updates) => onUpdate(updates)}
        />
      </TabsContent>

      <TabsContent value="skills" className="mt-0">
        <SkillsEditor 
          skills={resumeData?.skills}
          languages={resumeData?.languages}
          onUpdate={(updates) => onUpdate(updates)}
        />
      </TabsContent>
    </div>
  );
}

export default ResumeEditor;

export const getStaticProps = async () => {
  return {
    notFound: true,
  };
};