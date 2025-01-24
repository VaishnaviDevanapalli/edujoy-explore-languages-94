import { useState } from "react";
import { AICharacter } from "@/components/AICharacter";
import { TranslationCard } from "@/components/TranslationCard";
import { TextToSpeech } from "@/components/TextToSpeech";

const Index = () => {
  const [translatedText, setTranslatedText] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          EduLang Adventures
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <AICharacter />
          
          <div className="mt-8 space-y-6">
            <TranslationCard onTranslate={setTranslatedText} />
            <TextToSpeech text={translatedText} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;