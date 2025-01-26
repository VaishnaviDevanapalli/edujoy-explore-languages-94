import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, Trash2, Undo } from "lucide-react";

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

export function TranslationCard({ onTranslate }: { onTranslate: (text: string, lang: string) => void }) {
  const [inputText, setInputText] = useState("");
  const [previousText, setPreviousText] = useState("");
  const [selectedSourceLang, setSelectedSourceLang] = useState("en");
  const [selectedTargetLang, setSelectedTargetLang] = useState("");

  const handleTranslate = async () => {
    if (!inputText) {
      toast.error("Please enter some text to translate!");
      return;
    }
    if (!selectedTargetLang) {
      toast.error("Please select a target language!");
      return;
    }
    
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${selectedSourceLang}|${selectedTargetLang}`);
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        onTranslate(data.responseData.translatedText, selectedTargetLang);
        toast.success("Text translated successfully! 🎉");
      } else {
        toast.error("Translation failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleClear = () => {
    setPreviousText(inputText);
    setInputText("");
    toast.success("Content cleared! ✨");
  };

  const handleUndo = () => {
    if (previousText) {
      setInputText(previousText);
      toast.success("Previous text restored! ↩️");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inputText);
      toast.success("Text copied to clipboard! 📋");
    } catch (err) {
      toast.error("Failed to copy text. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Translate Educational Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Enter Text</label>
            <Button
              onClick={handleUndo}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Undo className="w-4 h-4 mr-2" />
              Undo
            </Button>
          </div>
          <Textarea
            placeholder="Type your educational content here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px] bg-white dark:bg-gray-800 resize-y"
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleCopy}
            variant="outline"
            className="flex-1"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Text
          </Button>
          
          <Button 
            onClick={handleClear}
            variant="outline"
            className="flex-1"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
        
        <Button 
          onClick={handleTranslate}
          className="w-full bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity dark:from-blue-600 dark:to-purple-600"
        >
          Translate Now! ✨
        </Button>
      </CardContent>
    </Card>
  );
}