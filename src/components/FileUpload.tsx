import { useState } from "react";
import { Upload, FileType, File } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

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

    if (!file.type.includes('pdf') && !file.type.includes('text')) {
      toast.error("Please upload a PDF or text file!");
      return;
    }

    try {
      const text = await readFileContent(file);
      onTextExtracted(text);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Error reading file. Please try again.");
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string || "");
      };
      reader.readAsText(file);
    });
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto transition-all duration-300 ${isDragging ? 'scale-105 border-primary' : ''}`}>
      <CardContent className="p-6">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="bg-primary/10 rounded-full p-3">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Drag and drop your file here</h3>
              <p className="text-sm text-gray-500">
                Support for PDF and text files
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}