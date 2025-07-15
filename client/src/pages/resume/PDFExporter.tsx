import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResumeData, ResumeTheme } from "@/types/resume";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

interface PDFExporterProps {
  resumeData: ResumeData;
  theme: ResumeTheme;
}

export const PDFExporter = ({ resumeData }: PDFExporterProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();


  const exportToPDF = async () => {
    setIsExporting(true);
    
    try {
      const element = document.getElementById('resume-preview');
      if (!element) {
        throw new Error('Resume preview not found');
      }

      // Ensure element is visible and has content
      const elementRect = element.getBoundingClientRect();
      if (elementRect.width === 0 || elementRect.height === 0) {
        throw new Error('Resume preview has no dimensions');
      }

      // A4 dimensions in points (72 DPI standard)
      const A4_WIDTH_PT = 595.28; // 210mm
      const A4_HEIGHT_PT = 841.89; // 297mm
      const MARGIN_PT = 18; // 0.25 inch margins (reduced from 0.5 inch)
      const CONTENT_WIDTH_PT = A4_WIDTH_PT - (MARGIN_PT * 2);
      const CONTENT_HEIGHT_PT = A4_HEIGHT_PT - (MARGIN_PT * 2);

      // Wait a bit to ensure fonts and styles are loaded
      await new Promise(resolve => setTimeout(resolve, 100));

      // Create high-resolution canvas with better options for text rendering
      const canvas = await html2canvas(element, {
        scale: 2, // Reduced scale for better compatibility
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.offsetWidth,
        windowHeight: element.offsetHeight
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Create PDF with exact A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [A4_WIDTH_PT, A4_HEIGHT_PT]
      });

      // Calculate scaling to fit content width while maintaining aspect ratio
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const scaleToFitWidth = CONTENT_WIDTH_PT / canvasWidth;
      const scaledHeight = canvasHeight * scaleToFitWidth;

      // If content fits on one page
      if (scaledHeight <= CONTENT_HEIGHT_PT) {
        const x = MARGIN_PT;
        const y = MARGIN_PT;
        pdf.addImage(imgData, 'PNG', x, y, CONTENT_WIDTH_PT, scaledHeight);
      } else {
        // Multi-page handling
        const pagesNeeded = Math.ceil(scaledHeight / CONTENT_HEIGHT_PT);
        
        for (let page = 0; page < pagesNeeded; page++) {
          if (page > 0) {
            pdf.addPage([A4_WIDTH_PT, A4_HEIGHT_PT]);
          }
          
          // Calculate the portion of the image for this page
          const sourceY = (page * CONTENT_HEIGHT_PT) / scaleToFitWidth;
          const sourceHeight = Math.min(
            CONTENT_HEIGHT_PT / scaleToFitWidth,
            canvasHeight - sourceY
          );
          
          // Create a temporary canvas for this page's content
          const pageCanvas = document.createElement('canvas');
          const pageCtx = pageCanvas.getContext('2d');
          
          pageCanvas.width = canvasWidth;
          pageCanvas.height = sourceHeight;
          
          if (pageCtx) {
            // Fill with white background
            pageCtx.fillStyle = '#ffffff';
            pageCtx.fillRect(0, 0, canvasWidth, sourceHeight);
            
            // Draw the portion of the original image
            pageCtx.drawImage(
              canvas,
              0, sourceY, canvasWidth, sourceHeight,
              0, 0, canvasWidth, sourceHeight
            );
            
            const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
            const pageHeight = Math.min(CONTENT_HEIGHT_PT, sourceHeight * scaleToFitWidth);
            
            pdf.addImage(pageImgData, 'PNG', MARGIN_PT, MARGIN_PT, CONTENT_WIDTH_PT, pageHeight);
          }
        }
      }
      
      // Generate filename
      const fileName = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
      
      pdf.save(fileName);
      
      toast({
        title: "PDF Downloaded",
        description: "Your resume has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={exportToPDF}
      disabled={isExporting}
      className="gap-2 bg-black text-white hover:opacity-90"
    >
      <Download className="h-4 w-4" />
      {isExporting ? 'Exporting...' : 'Download PDF'}
    </Button>
  );
};

export default PDFExporter;
  