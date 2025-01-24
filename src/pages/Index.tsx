import { useState } from "react";
import { AICharacter } from "@/components/AICharacter";
import { TranslationCard } from "@/components/TranslationCard";
import { TextToSpeech } from "@/components/TextToSpeech";
import { FileUpload } from "@/components/FileUpload";
import { Logo } from "@/components/Logo";

const Index = () => {
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleTranslation = (text: string, lang: string) => {
    setTranslatedText(text);
    setSelectedLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] via-[#FEF7CD] to-[#FDE1D3] text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <Logo />
        
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent mb-4 animate-float">
          EduLang Adventures
        </h1>
        
        <p className="text-center text-gray-600 mb-8">
          Explore the magic of learning in your favorite language! 🌟
        </p>
        
        <div className="max-w-4xl mx-auto">
          <AICharacter />
          
          <div className="mt-8 space-y-6">
            <FileUpload onTextExtracted={(text) => handleTranslation(text, selectedLanguage)} />
            <TranslationCard onTranslate={handleTranslation} />
            <TextToSpeech text={translatedText} language={selectedLanguage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;