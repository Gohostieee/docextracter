"use client";

import { useEffect, useState } from "react";
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, XCircle, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";

type ProgressUpdate = {
  type: 'progress' | 'complete' | 'error';
  step?: number;
  stepName?: string;
  message: string;
  progress?: number;
  timestamp: string;
  details?: any;
};

interface ExtractionLoaderProps {
  progressId: string;
  onComplete?: () => void;
  onError?: (error: string) => void;
}

export function ExtractionLoader({ progressId, onComplete, onError }: ExtractionLoaderProps) {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [updates, setUpdates] = useState<ProgressUpdate[]>([]);
  const [status, setStatus] = useState<'processing' | 'complete' | 'error'>('processing');

  useEffect(() => {
    if (!progressId) return;

    setCurrentProgress(0);
    setCurrentStep("Initializing extraction...");
    setUpdates([]);
    setStatus('processing');

    // Connect to SSE endpoint
    const eventSource = new EventSource(`/api/extract/progress?id=${progressId}&sse=true`);

    eventSource.onmessage = (event) => {
      try {
        const update: ProgressUpdate = JSON.parse(event.data);

        setUpdates((prev) => [...prev, update]);

        if (update.type === 'progress') {
          if (update.stepName) setCurrentStep(update.stepName);
          if (update.progress !== undefined) setCurrentProgress(update.progress);
        } else if (update.type === 'complete') {
          setStatus('complete');
          setCurrentProgress(100);
          setCurrentStep("Extraction complete!");
          eventSource.close();
          onComplete?.();
        } else if (update.type === 'error') {
          setStatus('error');
          setCurrentStep("Extraction failed");
          eventSource.close();
          onError?.(update.message);
        }
      } catch (error) {
        console.error('Failed to parse SSE message:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [progressId, onComplete, onError]);

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
            {status === 'processing' && <Loader2 className="w-12 h-12 text-[#c97a63] animate-spin" />}
            {status === 'complete' && <CheckCircle2 className="w-12 h-12 text-[#7f8c5a]" />}
            {status === 'error' && <XCircle className="w-12 h-12 text-red-400" />}
          </div>
        </div>
      </motion.div>

      {/* Current Step */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl sm:text-4xl font-bold text-[#f4ede1] mb-3 text-center flex items-center gap-3"
      >
        {status === 'processing' && <Sparkles className="w-8 h-8 text-[#c97a63]" />}
        {currentStep}
      </motion.h2>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="relative">
          <Progress
            value={currentProgress}
            className="h-2 bg-white/10"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -top-8 left-0 right-0 flex justify-between items-center"
          >
            <span className="text-sm text-gray-400">{currentProgress}%</span>
            {status === 'processing' && (
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-[#b08968] rounded-full animate-pulse" />
                <div className="w-1.5 h-1.5 bg-[#c97a63] rounded-full animate-pulse delay-75" />
                <div className="w-1.5 h-1.5 bg-[#7f8c5a] rounded-full animate-pulse delay-150" />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Animated Updates List */}
      <div className="w-full max-w-2xl">
        <AnimatedList className="gap-3" delay={300}>
          {updates.slice(-5).reverse().map((update, index) => (
            <AnimatedListItem key={`${update.timestamp}-${index}`}>
              <div
                className={`p-4 rounded-2xl border backdrop-blur-xl transition-all ${
                  update.type === 'error'
                    ? 'bg-red-500/10 border-red-500/20'
                    : update.type === 'complete'
                    ? 'bg-[#7f8c5a]/10 border-[#7f8c5a]/20'
                    : 'bg-[#b08968]/10 border-[#b08968]/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {update.type === 'error' && <XCircle className="w-4 h-4 text-red-400" />}
                    {update.type === 'complete' && <CheckCircle2 className="w-4 h-4 text-[#7f8c5a]" />}
                    {update.type === 'progress' && <Zap className="w-4 h-4 text-[#c97a63]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${
                        update.type === 'error'
                          ? 'text-red-300'
                          : update.type === 'complete'
                          ? 'text-[#e8dcc3]'
                          : 'text-[#d1bfa7]'
                      }`}
                    >
                      {update.message}
                    </p>
                    {update.details && (
                      <p className="text-xs text-gray-500 mt-1 font-mono truncate">
                        {JSON.stringify(update.details)}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {new Date(update.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </AnimatedListItem>
          ))}
        </AnimatedList>
      </div>
    </motion.div>
  );
}
