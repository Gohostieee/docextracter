"use client";

import { useState } from "react";
import { Warp } from '@paper-design/shaders-react';
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { BottomInputBar } from "@/components/BottomInputBar";
import { ExtractionLoader } from "@/components/ExtractionLoader";
import { ZipVisualization } from "@/components/ZipVisualization";
import { AnimatePresence } from "motion/react";
import axios from "axios";

const DEFAULT_GUIDE = "Extract all URLs that link to any sort of documentation";

type ViewState = 'hero' | 'loading' | 'complete' | 'error';

interface HomeClientProps {
  isSignedIn: boolean;
  hasSubscription: boolean;
}

export default function HomeClient({ isSignedIn, hasSubscription }: HomeClientProps) {
  const [viewState, setViewState] = useState<ViewState>('hero');
  const [url, setUrl] = useState("");
  const [guide, setGuide] = useState(DEFAULT_GUIDE);
  const [jsr, setJsr] = useState(false);
  const [aggressive, setAggressive] = useState(false);
  const [progressId, setProgressId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {
    // Check authentication
    if (!isSignedIn) {
      setError('Please sign in to use the extraction feature');
      setViewState('error');
      return;
    }

    // Check if user has subscription
    if (!hasSubscription) {
      setError('Please subscribe to use the extraction feature, or self-host for free');
      setViewState('error');
      return;
    }

    // Validate URL
    try {
      new URL(url);
    } catch (e) {
      setError('Invalid URL format');
      setViewState('error');
      return;
    }

    // Start extraction
    setViewState('loading');
    setError(null);
    setResult(null);

    const newProgressId = `extract-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    setProgressId(newProgressId);

    try {
      const response = await axios.post(`/api/extract`, {
        url,
        guide,
        jsr,
        aggressive,
      }, {
        responseType: 'blob',
        headers: {
          'X-Progress-Id': newProgressId,
        },
      });

      const tokenUsageHeader = response.headers['x-token-usage'];
      const processingTimeHeader = response.headers['x-processing-time'];
      const contentDisposition = response.headers['content-disposition'];

      let tokenUsage = null;
      if (tokenUsageHeader) {
        try {
          tokenUsage = JSON.parse(tokenUsageHeader);
        } catch (e) {
          console.error('Failed to parse token usage:', e);
        }
      }

      const processingTime = processingTimeHeader
        ? `${(parseInt(processingTimeHeader) / 1000).toFixed(2)}s`
        : null;

      // Extract filename from Content-Disposition header
      let fileName = `documentation_${Date.now()}.zip`; // fallback
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
        if (filenameMatch && filenameMatch[1]) {
          fileName = filenameMatch[1].replace(/"/g, '');
        }
      }

      const blob = new Blob([response.data], { type: 'application/zip' });
      const downloadUrl = window.URL.createObjectURL(blob);

      setResult({
        downloadUrl,
        fileName,
        processingTime,
        tokenUsage,
        timestamp: new Date().toISOString()
      });

      setViewState('complete');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data instanceof Blob) {
          const text = await err.response.data.text();
          try {
            const errorData = JSON.parse(text);
            setError(errorData.error || errorData.message || 'Something went wrong');
          } catch {
            setError(text || 'Something went wrong');
          }
        } else {
          const errorMessage = err.response?.data?.error || err.message || 'Something went wrong';
          setError(errorMessage);
        }
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
      setViewState('error');
    }
  };

  const handleComplete = () => {
    // Keep showing the complete view
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setViewState('error');
  };

  const handleReset = () => {
    setViewState('hero');
    setUrl("");
    setJsr(false);
    setAggressive(false);
    setError(null);
    setResult(null);
    setProgressId(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0e0d0b]">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <Warp
          width={typeof window !== 'undefined' ? window.innerWidth : 1920}
          height={typeof window !== 'undefined' ? window.innerHeight : 1080}
          colors={["#0e0d0b", "#b08968", "#0e0d0b", "#7f8c5a"]}
          proportion={0.45}
          softness={1.2}
          distortion={0.3}
          swirl={0.9}
          swirlIterations={12}
          shape="checks"
          shapeScale={0.08}
          speed={0.8}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="fixed inset-0 z-[1] bg-[#0e0d0b]/85 pointer-events-none" />

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="relative z-10 min-h-screen pt-20">
        <AnimatePresence mode="wait">
          {viewState === 'hero' && (
            <HeroSection 
              key="hero" 
              isSignedIn={isSignedIn}
              hasSubscription={hasSubscription}
            />
          )}

          {viewState === 'loading' && progressId && (
            <ExtractionLoader
              key="loading"
              progressId={progressId}
              onComplete={handleComplete}
              onError={handleError}
            />
          )}

          {viewState === 'complete' && result && (
            <ZipVisualization
              key="complete"
              downloadUrl={result.downloadUrl}
              fileName={result.fileName}
              processingTime={result.processingTime}
              tokenUsage={result.tokenUsage}
              timestamp={result.timestamp}
            />
          )}

          {viewState === 'error' && (
            <div key="error" className="flex flex-col items-center justify-center min-h-[60vh] px-4 pb-40">
              <div className="text-center">
                <div className="text-6xl mb-4">❌</div>
                <h2 className="text-3xl font-bold text-red-400 mb-2">Extraction Failed</h2>
                <p className="text-gray-400 mb-6">{error}</p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Bottom Input Bar - Always visible */}
        <BottomInputBar
          url={url}
          guide={guide}
          jsr={jsr}
          aggressive={aggressive}
          onUrlChange={setUrl}
          onGuideChange={setGuide}
          onJsrChange={setJsr}
          onAggressiveChange={setAggressive}
          onSubmit={handleSubmit}
          isLoading={viewState === 'loading'}
          isDisabled={!isSignedIn || !hasSubscription}
          disabledMessage={!isSignedIn ? "Sign in to extract docs" : "Subscribe or self-host to extract docs"}
        />
      </div>
    </div>
  );
}



