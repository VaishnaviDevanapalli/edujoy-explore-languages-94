import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import * as pdfjs from 'pdfjs-dist';
import { Button } from "@/components/ui/button";

export function FileUpload({ onTextExtracted }: { onTextExtracted: (text: string) => void }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      // Initialize PDF.js worker
      const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (file.type === 'application/pdf') {
        await handlePdfFile(file);
      } else if (file.type.includes('text') || file.type.includes('document')) {
        await handleTextFile(file);
      } else {
        toast.error("Please upload a PDF or text file!");
      }
    } catch (error) {
      console.error('File upload error:', error);
      toast.error("Error processing file. Please try again.");
    }
  };

  const handlePdfFile = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
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
      console.error('PDF processing error:', error);
      toast.error("Error reading PDF file. Please try again.");
    }
  };

  const handleTextFile = async (file: File) => {
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
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-[#FEF7CD] to-[#FDE1D3] border-2 border-[#FEC6A1]/20 transition-all duration-300 dark:from-gray-800 dark:to-gray-900">
      <CardContent className="p-6">
        <div className="text-center cursor-pointer">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-[#E5DEFF] rounded-full p-3 animate-bounce dark:bg-gray-700">
              <Upload className="w-6 h-6 text-[#8B5CF6] dark:text-purple-400" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-[#333] dark:text-gray-200">Upload your magical book! ✨</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Let's transform your PDF or text into any Indian language! 🎯
              </p>
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button 
                    className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:opacity-90 text-white dark:from-purple-600 dark:to-pink-600"
                  >
                    Choose File
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.txt,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}