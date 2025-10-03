"use client";

import { Loader2, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface ExtractionLoaderProps {
  progressId?: string;
  onComplete?: () => void;
  onError?: (error: string) => void;
}

export function ExtractionLoader({ progressId, onComplete, onError }: ExtractionLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4 pb-40"
    >
      {/* Status Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#b08968] to-[#7f8c5a] rounded-full blur-2xl opacity-30 animate-pulse" />
          <div className="relative p-6 bg-gradient-to-br from-[#b08968]/20 to-[#7f8c5a]/20 border border-white/10 rounded-full backdrop-blur-xl">
            <Loader2 className="w-12 h-12 text-[#c97a63] animate-spin" />
          </div>
        </div>
      </motion.div>

      {/* Current Step */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl sm:text-4xl font-bold text-[#f4ede1] mb-3 text-center flex items-center gap-3"
      >
        <Sparkles className="w-8 h-8 text-[#c97a63]" />
        Extracting Documentation
      </motion.h2>

      {/* Loading Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-400 text-center max-w-md"
      >
        Please wait while we extract and process your documentation...
      </motion.p>

      {/* Animated Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex gap-2 mt-8"
      >
        <div className="w-2 h-2 bg-[#b08968] rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-[#c97a63] rounded-full animate-pulse delay-75" />
        <div className="w-2 h-2 bg-[#7f8c5a] rounded-full animate-pulse delay-150" />
      </motion.div>
    </motion.div>
  );
}
