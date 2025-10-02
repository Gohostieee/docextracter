"use client";

import { motion } from "motion/react";
import { FileArchive, Download, Clock, Cpu, File, Folder, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ZipVisualizationProps {
  downloadUrl?: string;
  fileName?: string;
  processingTime?: string;
  tokenUsage?: {
    totalTokens: number;
    urlFiltering?: { total: number };
    masterSummary?: { total: number };
  };
  timestamp?: string;
}

export function ZipVisualization({
  downloadUrl,
  fileName = "documentation.zip",
  processingTime,
  tokenUsage,
  timestamp
}: ZipVisualizationProps) {
  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4 pb-40"
    >
      {/* Success Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#7f8c5a] to-[#b08968] rounded-full blur-2xl opacity-30 animate-pulse" />
          <div className="relative p-6 bg-gradient-to-br from-[#7f8c5a]/20 to-[#b08968]/20 border border-white/10 rounded-full backdrop-blur-xl">
            <CheckCircle2 className="w-12 h-12 text-[#7f8c5a]" />
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl sm:text-5xl font-bold text-[#f4ede1] mb-3 text-center"
      >
        Extraction Complete!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-gray-400 mb-8 text-center"
      >
        Your documentation has been packaged and is ready to download
      </motion.p>

      {/* ZIP File Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative w-full max-w-2xl mb-8"
      >
        <div className="bg-gradient-to-br from-[#b08968]/10 to-[#7f8c5a]/10 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          {/* ZIP Icon and Name */}
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-white/5 rounded-2xl">
              <FileArchive className="w-8 h-8 text-[#c97a63]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#f4ede1] mb-1">{fileName}</h3>
              <p className="text-sm text-gray-400">Documentation Package</p>
            </div>
            <Button
              onClick={handleDownload}
              className="bg-gradient-to-r from-[#b08968] to-[#8c6a4a] hover:from-[#9b7b58] hover:to-[#75583e] text-white px-6"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          {/* File Preview */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <File className="w-4 h-4 text-[#c97a63]" />
              <span className="text-sm text-[#e8dcc3]">MASTER_SUMMARY.md</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <File className="w-4 h-4 text-[#7f8c5a]" />
              <span className="text-sm text-[#e8dcc3]">README.md</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <Folder className="w-4 h-4 text-[#b08968]" />
              <span className="text-sm text-[#e8dcc3]">pages/</span>
              <span className="text-xs text-gray-500 ml-auto">Multiple files</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {processingTime && (
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-[#c97a63]" />
                  <span className="text-xs font-semibold text-gray-400">Processing Time</span>
                </div>
                <p className="text-xl font-bold text-[#f4ede1]">{processingTime}</p>
              </div>
            )}

            {tokenUsage?.totalTokens && (
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-[#b08968]" />
                  <span className="text-xs font-semibold text-gray-400">AI Tokens</span>
                </div>
                <p className="text-xl font-bold text-[#f4ede1]">{tokenUsage.totalTokens.toLocaleString()}</p>
              </div>
            )}
          </div>

          {/* Token Breakdown */}
          {tokenUsage && (
            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
              <h4 className="text-xs font-semibold text-gray-400 mb-3">Token Breakdown</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500">URL Filtering:</span>
                  <span className="ml-2 text-[#f4ede1] font-mono">{tokenUsage.urlFiltering?.total?.toLocaleString() ?? 0}</span>
                </div>
                <div>
                  <span className="text-gray-500">Summary:</span>
                  <span className="ml-2 text-[#f4ede1] font-mono">{tokenUsage.masterSummary?.total?.toLocaleString() ?? 0}</span>
                </div>
              </div>
            </div>
          )}

          {/* Timestamp */}
          {timestamp && (
            <div className="mt-4 text-xs text-gray-500 text-center">
              Completed at {new Date(timestamp).toLocaleString()}
            </div>
          )}
        </div>
      </motion.div>

      {/* Action Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm text-gray-500"
      >
        Check your downloads folder or click the button above
      </motion.p>
    </motion.div>
  );
}
