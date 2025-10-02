"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle2, XCircle, Sparkles } from "lucide-react";

type ProgressUpdate = {
  type: 'progress' | 'complete' | 'error';
  step?: number;
  stepName?: string;
  message: string;
  progress?: number;
  timestamp: string;
  details?: any;
};

interface ProgressModalProps {
  progressId: string | null;
  onComplete?: () => void;
  onError?: (error: string) => void;
}

export function ProgressModal({ progressId, onComplete, onError }: ProgressModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [updates, setUpdates] = useState<ProgressUpdate[]>([]);
  const [status, setStatus] = useState<'processing' | 'complete' | 'error'>('processing');

  useEffect(() => {
    if (!progressId) {
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
    setCurrentProgress(0);
    setCurrentStep("");
    setCurrentMessage("Initializing extraction...");
    setUpdates([]);
    setStatus('processing');

    // Connect to SSE endpoint
    const eventSource = new EventSource(`/api/extract/progress?id=${progressId}&sse=true`);

    eventSource.onmessage = (event) => {
      try {
        const update: ProgressUpdate = JSON.parse(event.data);

        setUpdates((prev) => [...prev, update]);

        if (update.type === 'progress') {
          setCurrentMessage(update.message);
          if (update.stepName) setCurrentStep(update.stepName);
          if (update.progress !== undefined) setCurrentProgress(update.progress);
        } else if (update.type === 'complete') {
          setStatus('complete');
          setCurrentProgress(100);
          setCurrentMessage(update.message);
          eventSource.close();

          // Auto-close after 2 seconds
          setTimeout(() => {
            setIsOpen(false);
            onComplete?.();
          }, 2000);
        } else if (update.type === 'error') {
          setStatus('error');
          setCurrentMessage(update.message);
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

      // Fallback to polling if SSE fails
      startPolling();
    };

    function startPolling() {
      const pollInterval = setInterval(async () => {
        try {
          const response = await fetch(`/api/extract/progress?id=${progressId}`);
          if (!response.ok) {
            clearInterval(pollInterval);
            return;
          }

          const data = await response.json();

          if (data.updates && data.updates.length > updates.length) {
            const newUpdates = data.updates.slice(updates.length);
            setUpdates(data.updates);

            const latestUpdate = newUpdates[newUpdates.length - 1];
            if (latestUpdate) {
              setCurrentMessage(latestUpdate.message);
              if (latestUpdate.stepName) setCurrentStep(latestUpdate.stepName);
              if (latestUpdate.progress !== undefined) setCurrentProgress(latestUpdate.progress);
            }
          }

          if (data.status === 'complete') {
            setStatus('complete');
            setCurrentProgress(100);
            clearInterval(pollInterval);
            setTimeout(() => {
              setIsOpen(false);
              onComplete?.();
            }, 2000);
          } else if (data.status === 'error') {
            setStatus('error');
            setCurrentMessage(data.error || 'An error occurred');
            clearInterval(pollInterval);
            onError?.(data.error || 'An error occurred');
          }
        } catch (error) {
          console.error('Polling error:', error);
        }
      }, 1000);

      return () => clearInterval(pollInterval);
    }

    return () => {
      eventSource.close();
    };
  }, [progressId, onComplete, onError]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="sm:max-w-lg bg-black/95 backdrop-blur-2xl border-white/10 text-white shadow-2xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            {status === 'processing' && (
            <>
                <Loader2 className="w-6 h-6 text-[#c97a63] animate-spin" />
                <span className="text-[#c97a63]">Extracting Documentation</span>
            </>
            )}
            {status === 'complete' && (
              <>
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <span className="text-green-400">Extraction Complete</span>
              </>
            )}
            {status === 'error' && (
              <>
                <XCircle className="w-6 h-6 text-red-400" />
                <span className="text-red-400">Extraction Failed</span>
              </>
            )}
          </DialogTitle>
          {currentStep && (
            <DialogDescription className="text-gray-400 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#b08968]" />
              {currentStep}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="relative">
              <Progress
                value={currentProgress}
                className="h-3 bg-white/10"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-mono text-gray-400">
                {currentProgress}%
              </p>
              {status === 'processing' && (
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#b08968] rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-[#c97a63] rounded-full animate-pulse delay-75" />
                  <div className="w-2 h-2 bg-[#7f8c5a] rounded-full animate-pulse delay-150" />
                </div>
              )}
            </div>
          </div>

          {/* Current Status */}
          <div className="rounded-xl border border-white/10 bg-[#b08968]/10 p-4">
            <p className="text-sm text-white leading-relaxed">{currentMessage}</p>
          </div>

          {/* Recent Updates */}
          <div className="max-h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {updates.slice(-5).reverse().map((update, index) => (
              <div
                key={index}
                className={`text-xs p-3 rounded-lg border backdrop-blur-sm ${
                  update.type === 'error'
                    ? 'bg-red-500/10 border-red-500/20 text-red-300'
                    : update.type === 'complete'
                    ? 'bg-green-500/10 border-green-500/20 text-green-300'
                    : 'bg-[#b08968]/10 border-[#b08968]/20 text-[#e8dcc3]'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="flex-1">{update.message}</span>
                  <span className="text-gray-500 text-[10px] whitespace-nowrap">
                    {new Date(update.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                {update.details && (
                  <div className="mt-2 text-[10px] opacity-75 font-mono">
                    {JSON.stringify(update.details)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {status === 'error' && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-red-300 font-medium">
                An error occurred during extraction. Please try again.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
