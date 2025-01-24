import { useState } from "react";
import { Upload, FileType, File } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import * as pdfjs from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface FileUploadProps {
  onTextExtracted: (text: string) => void;
}

export function FileUpload({ onTextExtracted }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];

    if (!file) return;

    if (file.type === 'application/pdf') {
      await handlePdfFile(file);
    } else if (file.type.includes('text')) {
      await handleTextFile(file);
    } else {
      toast.error("Please upload a PDF or text file!");
    }
  };

  const handlePdfFile = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + ' ';
      }
      
      onTextExtracted(fullText.trim());
      toast.success("PDF uploaded and text extracted successfully!");
    } catch (error) {
      toast.error("Error reading PDF file. Please try again.");
    }
  };

  const handleTextFile = async (file: File): Promise<void> => {
    try {
      const text = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string || "");
        reader.readAsText(file);
      });
      onTextExtracted(text);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Error reading file. Please try again.");
    }
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto bg-gradient-to-br from-[#1A1F2C] to-[#403E43] border-2 border-[#8B5CF6]/20 transition-all duration-300 ${isDragging ? 'scale-105 border-[#8B5CF6]' : ''}`}>
      <CardContent className="p-6">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-[#8B5CF6] transition-colors"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="bg-[#8B5CF6]/20 rounded-full p-3 animate-bounce">
              <Upload className="w-6 h-6 text-[#8B5CF6]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Drop your magical book here! ✨</h3>
              <p className="text-sm text-gray-400">
                Let's transform your PDF or text into any Indian language! 🎯
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}