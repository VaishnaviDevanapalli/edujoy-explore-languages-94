import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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

export function TranslationCard({ onTranslate }: { onTranslate: (text: string) => void }) {
  const [inputText, setInputText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleTranslate = async () => {
    if (!inputText) {
      toast.error("Please enter some text to translate!");
      return;
    }
    if (!selectedLanguage) {
      toast.error("Please select a language!");
      return;
    }
    
    try {
      // Using a free translation API (for demonstration)
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=en|${selectedLanguage}`);
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        onTranslate(data.responseData.translatedText);
        toast.success("Text translated successfully! 🎉");
      } else {
        toast.error("Translation failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white to-blue-50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Translate Educational Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Select Language</label>
          <Select onValueChange={setSelectedLanguage}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Choose a language" />
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
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Enter Text</label>
          <Textarea
            placeholder="Type your educational content here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px] bg-white"
          />
        </div>
        
        <Button 
          onClick={handleTranslate}
          className="w-full bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity"
        >
          Translate Now! ✨
        </Button>
      </CardContent>
    </Card>
  );
}