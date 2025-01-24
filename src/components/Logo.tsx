import { BookOpen } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      <div className="bg-primary rounded-full p-3 shadow-lg animate-bounce">
        <BookOpen className="w-8 h-8 text-white" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        EduLang
      </span>
    </div>
  );
}