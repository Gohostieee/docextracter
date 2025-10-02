"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, Link2, Sparkles, Zap, Flame } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BottomInputBarProps {
  url: string;
  guide: string;
  jsr: boolean;
  aggressive: boolean;
  onUrlChange: (value: string) => void;
  onGuideChange: (value: string) => void;
  onJsrChange: (value: boolean) => void;
  onAggressiveChange: (value: boolean) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  disabledMessage?: string;
}

export function BottomInputBar({
  url,
  guide,
  jsr,
  aggressive,
  onUrlChange,
  onGuideChange,
  onJsrChange,
  onAggressiveChange,
  onSubmit,
  isLoading = false,
  isDisabled = false,
  disabledMessage
}: BottomInputBarProps) {
  const [activeTab, setActiveTab] = useState("url");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && activeTab === "url") {
      e.preventDefault();
      if (url.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 pb-6 px-4 sm:px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Glass Card */}
        <div className="relative bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#b08968]/20 via-[#c97a63]/20 to-[#7f8c5a]/20 opacity-50 blur-xl" />

          <div className="relative">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center gap-3 p-3 pb-0">
                <TabsList className="bg-white/5 border border-white/10 p-1">
                  <TabsTrigger
                    value="url"
                    className="data-[state=inactive]:hover:cursor-pointer data-[state=active]:bg-[#c97a63]/20 data-[state=active]:text-[#e8dcc3] text-gray-400 px-4 py-1.5 rounded-lg transition-all"
                  >
                    <Link2 className="w-4 h-4 mr-2" />
                    URL
                  </TabsTrigger>
                  <TabsTrigger
                    value="guide"
                    className="data-[state=inactive]:hover:cursor-pointer data-[state=active]:bg-[#7f8c5a]/20 data-[state=active]:text-[#d1bfa7] text-gray-400 px-4 py-1.5 rounded-lg transition-all"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Guide
                  </TabsTrigger>
                </TabsList>

                {/* JSR Toggle */}
                <div className="flex items-center gap-2 ml-auto bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  <Zap className={`w-4 h-4 transition-colors ${jsr ? 'text-yellow-400' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium transition-colors ${jsr ? 'text-yellow-400' : 'text-gray-400'}`}>
                    JSR
                  </span>
                  <Switch
                    checked={jsr}
                    onCheckedChange={onJsrChange}
                    disabled={isLoading || isDisabled}
                    className="data-[state=checked]:bg-yellow-500/80"
                  />
                </div>

                {/* Aggressive Toggle - Only visible when JSR is enabled */}
                <AnimatePresence>
                  {jsr && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, x: 10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: 10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg"
                    >
                      <Flame className={`w-4 h-4 transition-colors ${aggressive ? 'text-orange-400' : 'text-gray-500'}`} />
                      <span className={`text-sm font-medium transition-colors ${aggressive ? 'text-orange-400' : 'text-gray-400'}`}>
                        Aggressive
                      </span>
                      <Switch
                        checked={aggressive}
                        onCheckedChange={onAggressiveChange}
                        disabled={isLoading || isDisabled}
                        className="data-[state=checked]:bg-orange-500/80"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-3">
                <TabsContent value="url" className="mt-0">
                  <div className="flex items-center gap-3">
                    <Textarea
                      value={url}
                      onChange={(e) => onUrlChange(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={isDisabled ? disabledMessage || "Feature locked" : "https://docs.example.com"}
                      className="min-h-[40px] max-h-[40px] bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#c97a63]/50 focus:ring-[#c97a63]/20 resize-none text-lg pr-3"
                      disabled={isLoading || isDisabled}
                    />
                    <Button
                      onClick={onSubmit}
                      disabled={isLoading || !url.trim() || isDisabled}
                      className="h-[40px] px-6 bg-gradient-to-r from-[#b08968] to-[#8c6a4a] hover:from-[#9b7b58] hover:to-[#75583e] text-white rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="guide" className="mt-0">
                  <Input
                    value={guide}
                    onChange={(e) => onGuideChange(e.target.value)}
                    placeholder={isDisabled ? disabledMessage || "Feature locked" : "Enter a simple extraction instruction..."}
                    className="h-[40px] bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#7f8c5a]/50 focus:ring-[#7f8c5a]/20 text-lg"
                    disabled={isLoading || isDisabled}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Helper Text */}
        <AnimatePresence>
          {activeTab === "url" && !url && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center text-xs text-gray-500 mt-3"
            >
              Press <kbd className="px-2 py-0.5 bg-white/10 rounded text-gray-400">Enter</kbd> to submit
            </motion.p>
          )}
          {jsr && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center text-xs text-yellow-400/70 mt-2"
            >
              ⚡ JavaScript Render enabled - Uses local browser for JS-heavy sites
              {aggressive && <span className="text-orange-400/70"> | 🔥 Aggressive mode: Auto-scroll + extended waits for max content</span>}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
