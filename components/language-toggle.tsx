"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { Globe } from "lucide-react"

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 glass px-4 py-2 rounded-full border border-blue-500/30">
      <Globe className="w-4 h-4 text-blue-400" />
      <div className="flex gap-1">
        <motion.button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            language === "en"
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EN
        </motion.button>
        <motion.button
          onClick={() => setLanguage("fr")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            language === "fr"
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          FR
        </motion.button>
      </div>
    </div>
  )
}
