import { useEffect, useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import * as pdfjs from 'pdfjs-dist';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const languages = [
  { value: "hi", label: "Hindi" },
  { value: "te", label: "Telugu" },
  { value: "ta", label: "Tamil" },
  { value: "kn", label: "Kannada" },
  { value: "ml", label: "Malayalam" },
  { value: "bn", label: "Bengali" },
  { value: "gu", label: "Gujarati" },
  { value: "mr", label: "Marathi" },
  { value: "pa", label: "Punjabi" },
];

export function FileUpload({ onTextExtracted }: { onTextExtracted: (text: string) => void }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedSourceLang, setSelectedSourceLang] = useState("en");
  const [selectedTargetLang, setSelectedTargetLang] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isInitialized) {
      const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const handleFile = async (file: File) => {
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
      
      setExtractedText(fullText.trim());
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
      setExtractedText(text);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Error reading file. Please try again.");
    }
  };

  const handleTranslate = async () => {
    if (!extractedText) {
      toast.error("Please upload a file first!");
      return;
    }
    if (!selectedTargetLang) {
      toast.error("Please select a target language!");
      return;
    }

    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(extractedText)}&langpair=${selectedSourceLang}|${selectedTargetLang}`);
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        onTextExtracted(data.responseData.translatedText);
        toast.success("Text translated successfully! 🎉");
      } else {
        toast.error("Translation failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-[#FEF7CD] to-[#FDE1D3] border-2 border-[#FEC6A1]/20 transition-all duration-300 dark:from-gray-800 dark:to-gray-900">
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Source Language</label>
            <Select value={selectedSourceLang} onValueChange={setSelectedSourceLang}>
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue placeholder="Choose source language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Language</label>
            <Select value={selectedTargetLang} onValueChange={setSelectedTargetLang}>
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue placeholder="Choose target language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div 
          className={`text-center cursor-pointer min-h-[200px] flex items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300 ${
            isDragging 
              ? 'border-[#8B5CF6] bg-[#E5DEFF]/20' 
              : 'border-gray-300 hover:border-[#8B5CF6]'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            accept=".pdf,.txt,.doc,.docx"
            className="hidden"
          />
          <div className="flex flex-col items-center gap-4 p-6">
            <div className="bg-[#E5DEFF] rounded-full p-3 animate-bounce dark:bg-gray-700">
              <Upload className="w-6 h-6 text-[#8B5CF6] dark:text-purple-400" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-[#333] dark:text-gray-200">
                Drag & drop your file here, or click to select
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Drop your PDF or text file here to transform it into any Indian language! 🎯
              </p>
            </div>
          </div>
        </div>

        {extractedText && (
          <div className="mt-4">
            <button
              onClick={handleTranslate}
              className="w-full bg-gradient-to-r from-primary to-purple-500 text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Translate File Content
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
