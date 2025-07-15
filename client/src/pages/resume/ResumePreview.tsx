import { ResumeData, ResumeTheme } from "@/types/resume";
import { ClassicTemplate } from "./template/ClassicTemplate";
import MinimalistTemplate from "./template/MinimalistTemplate";
import { ModernTemplate } from "./template/ModernTemplate";

interface ResumePreviewProps {
  resumeData: ResumeData;
  theme: ResumeTheme;
}

export default function ResumePreview({ resumeData, theme }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (theme) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'minimalist':
        return <MinimalistTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div 
      id="resume-preview" 
      className="w-full bg-white text-black print:shadow-none"
      style={{ 
        minHeight: '11in', 
        maxWidth: '8.5in',
        margin: '0 auto',
        padding: '0.25in',
        fontSize: '10px',
        lineHeight: '1.3',
        color: '#000000', // Ensure text color is set
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {renderTemplate()}
    </div>
  );
}

export const getStaticProps = async () => {
  return {
    notFound: true,
  };
};