import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AICharacter } from "@/components/AICharacter";
import { TranslationCard } from "@/components/TranslationCard";
import { TextToSpeech } from "@/components/TextToSpeech";
import { FileUpload } from "@/components/FileUpload";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut } from "lucide-react";
import { toast } from "sonner";

const TranslatePage = () => {
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleTranslation = (text: string, lang: string) => {
    setTranslatedText(text);
    setSelectedLanguage(lang);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    toast.success("Successfully signed out!");
    navigate("/signin");
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-[#F2FCE2] via-[#FEF7CD] to-[#FDE1D3]'} text-gray-800 dark:text-gray-200`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full p-2"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6 text-yellow-500" />
              ) : (
                <Moon className="h-6 w-6 text-gray-700" />
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent mb-4 animate-float">
          EduLang Adventures
        </h1>
        
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
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

export default TranslatePage;