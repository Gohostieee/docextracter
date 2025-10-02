"use client";

import { Sparkles, Zap, FileStack, Lock } from "lucide-react";
import { motion } from "motion/react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  isSignedIn: boolean;
  hasSubscription: boolean;
}

export function HeroSection({ isSignedIn, hasSubscription }: HeroSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
    >
      {/* Icon Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#b08968] to-[#7f8c5a] rounded-full blur-2xl opacity-30 animate-pulse" />
          <div className="relative p-6 bg-gradient-to-br from-[#b08968]/20 to-[#7f8c5a]/20 border border-white/10 rounded-full backdrop-blur-xl">
            <FileStack className="w-12 h-12 text-[#c97a63]" />
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-6xl sm:text-8xl font-black tracking-tight text-center mb-6"
      >
        <span className="bg-gradient-to-r from-[#f4ede1] via-[#e8dcc3] to-[#d1bfa7] bg-clip-text text-transparent">
          DocExtract
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl sm:text-2xl text-gray-400 text-center max-w-2xl mb-8 leading-relaxed"
      >
        Transform any documentation site into a{" "}
        <span className="text-[#c97a63] font-semibold">structured knowledge base</span>{" "}
        with AI-powered extraction
      </motion.p>

      {/* Feature Pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-3"
      >
        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-sm text-gray-300">Lightning Fast</span>
        </div>
        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#c97a63]" />
          <span className="text-sm text-gray-300">AI-Powered</span>
        </div>
        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-2">
          <FileStack className="w-4 h-4 text-[#7f8c5a]" />
          <span className="text-sm text-gray-300">Markdown Export</span>
        </div>
      </motion.div>

      {/* CTA for non-authenticated or non-subscribed users */}
      {!isSignedIn && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <p className="text-gray-400 text-center">
            Sign in to start extracting documentation
          </p>
          <div className="flex items-center gap-3">
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="border-[#b08968]/40 hover:text-[#f4ede1] text-[#0e0d0b] hover:bg-[#b08968]/20 hover:border-[#b08968]/60"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="bg-gradient-to-r from-[#b08968] to-[#8c6a4a] hover:from-[#9b7b58] hover:to-[#75583e] text-[#0e0d0b] font-semibold shadow-lg">
                Get Started Free
              </Button>
            </SignUpButton>
          </div>
        </motion.div>
      )}

      {isSignedIn && !hasSubscription && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-col items-center gap-4 max-w-md"
        >
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <Lock className="w-6 h-6 text-amber-400" />
          </div>
          <p className="text-gray-300 text-center font-medium">
            Upgrade to unlock extraction
          </p>
          <p className="text-gray-500 text-sm text-center">
            Subscribe to get unlimited access — or use your own OpenAI API key for free
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => window.location.href = '/subscribe'}
              className="bg-gradient-to-r from-[#c97a63] to-[#b08968] hover:from-[#b86952] hover:to-[#9b7b58] text-[#0e0d0b] font-semibold shadow-lg"
            >
              Upgrade Now
            </Button>
            <Button
              onClick={() => window.location.href = '/settings'}
              variant="outline"
              className="border-[#b08968]/40 text-[#f4ede1] hover:bg-[#b08968]/20 hover:border-[#b08968]/60"
            >
              Add API Key
            </Button>
          </div>
        </motion.div>
      )}

      {/* Hint Text - only show for subscribed users */}
      {isSignedIn && hasSubscription && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-sm text-gray-500 flex items-center gap-2"
        >
          <span className="inline-block w-1.5 h-1.5 bg-[#c97a63] rounded-full animate-pulse" />
          Enter a URL below to get started
        </motion.p>
      )}
    </motion.div>
  );
}
