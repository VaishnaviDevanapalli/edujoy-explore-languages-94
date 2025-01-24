import { Sparkles, BookOpen } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <div className="relative">
        <div className="bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] rounded-full p-4 shadow-lg animate-bounce">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-yellow-400 animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-bold bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent">
          EduLang
        </span>
        <span className="text-sm text-gray-400">Magic of Learning! ✨</span>
      </div>
    </div>
  );
}