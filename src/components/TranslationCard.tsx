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
];

export function TranslationCard({ onTranslate }: { onTranslate: (text: string) => void }) {
  const [inputText, setInputText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleTranslate = () => {
    if (!inputText) {
      toast.error("Please enter some text to translate!");
      return;
    }
    if (!selectedLanguage) {
      toast.error("Please select a language!");
      return;
    }
    
    // In a real app, you would call your translation API here
    const translatedText = `Translated: ${inputText}`;
    onTranslate(translatedText);
    toast.success("Text translated successfully!");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary">
          Translate Educational Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Language</label>
          <Select onValueChange={setSelectedLanguage}>
            <SelectTrigger>
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
          <label className="text-sm font-medium">Enter Text</label>
          <Textarea
            placeholder="Type your educational content here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
        
        <Button 
          onClick={handleTranslate}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Translate
        </Button>
      </CardContent>
    </Card>
  );
}