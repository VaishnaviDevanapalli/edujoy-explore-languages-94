import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, Square } from "lucide-react";
import { useState } from "react";

export function TextToSpeech({ text }: { text: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if (!text) return;
    
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-4">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium flex-1">{text || "Translated text will appear here..."}</p>
          <Button
            variant="outline"
            size="icon"
            onClick={handleSpeak}
            className={`ml-4 ${isPlaying ? 'bg-red-100' : ''}`}
          >
            {isPlaying ? (
              <Square className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}