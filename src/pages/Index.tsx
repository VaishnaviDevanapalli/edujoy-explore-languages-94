import { useState } from "react";
import { AICharacter } from "@/components/AICharacter";
import { TranslationCard } from "@/components/TranslationCard";
import { TextToSpeech } from "@/components/TextToSpeech";
import { FileUpload } from "@/components/FileUpload";
import { Logo } from "@/components/Logo";

const Index = () => {
  const [translatedText, setTranslatedText] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <Logo />
        
        <h1 className="text-4xl font-bold text-center text-primary mb-4 animate-float">
          EduLang Adventures
        </h1>
        
        <p className="text-center text-gray-600 mb-8">
          Learn and explore in your favorite language! 🌟
        </p>
        
        <div className="max-w-4xl mx-auto">
          <AICharacter />
          
          <div className="mt-8 space-y-6">
            <FileUpload onTextExtracted={setTranslatedText} />
            <TranslationCard onTranslate={setTranslatedText} />
            <TextToSpeech text={translatedText} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;