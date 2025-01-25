import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, Square, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface TextToSpeechProps {
  text: string;
  language?: string;
}

const languageToVoiceMap: Record<string, string> = {
  'hi': 'hi-IN', // Hindi
  'te': 'te-IN', // Telugu
  'ta': 'ta-IN', // Tamil
  'kn': 'kn-IN', // Kannada
  'ml': 'ml-IN', // Malayalam
  'bn': 'bn-IN', // Bengali
  'gu': 'gu-IN', // Gujarati
  'mr': 'mr-IN', // Marathi
  'pa': 'pa-IN', // Punjabi
  'en': 'en-IN', // English (India)
};

export function TextToSpeech({ text, language = 'en' }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleSpeak = () => {
    if (!text) return;
    
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    const targetLang = languageToVoiceMap[language] || language;
    const voice = availableVoices.find(v => 
      v.lang.toLowerCase().includes(targetLang.toLowerCase())
    );
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.lang = targetLang;
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Translated text copied to clipboard! 📋");
    } catch (err) {
      toast.error("Failed to copy text. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-4">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium flex-1">{text || "Translated text will appear here..."}</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              className="ml-4"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleSpeak}
              className={`${isPlaying ? 'bg-red-100' : ''}`}
            >
              {isPlaying ? (
                <Square className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}