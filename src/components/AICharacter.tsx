import { motion } from "framer-motion";

export function AICharacter() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-6"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-secondary via-purple-300 to-primary flex items-center justify-center mb-4 shadow-lg">
        <span className="text-4xl">🤖</span>
      </div>
      <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
        Edu Bot
      </h2>
      <p className="text-sm text-gray-600 text-center mt-2 max-w-md">
        Hi! I'm your learning companion. I can help translate and read educational content for you! 
        Try dragging a PDF or typing some text to get started! ✨
      </p>
    </motion.div>
  );
}