"use client";

import { motion } from "motion/react";
import { Terminal, Package, Zap, Code, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function CLIPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0e0d0b] via-[#171411] to-[#1f1b18] text-[#f4ede1]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 pt-32 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex p-4 bg-gradient-to-br from-[#b08968]/20 to-[#7f8c5a]/20 border border-white/10 rounded-2xl mb-6">
            <Terminal className="w-12 h-12 text-[#c97a63]" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-[#f4ede1] via-[#e8dcc3] to-[#d1bfa7] bg-clip-text text-transparent">
              DocExtract CLI
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Extract documentation directly from your terminal with our powerful command-line tool
          </p>
        </motion.div>

        {/* Installation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-6 h-6 text-[#c97a63]" />
            <h2 className="text-3xl font-bold">Installation</h2>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 mb-4">Install globally via npm:</p>
            <div className="bg-[#0a0908] rounded-lg p-4 font-mono text-sm border border-white/5">
              <div className="flex items-center justify-between">
                <code className="text-[#7f8c5a]">npm install -g docextract-cli</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText("npm install -g docextract-cli")}
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-[#c97a63]" />
            <h2 className="text-3xl font-bold">Quick Start</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#c97a63]/20 rounded-full flex items-center justify-center text-[#c97a63] font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Authenticate</h3>
                  <div className="bg-[#0a0908] rounded-lg p-4 font-mono text-sm border border-white/5">
                    <code className="text-[#7f8c5a]">docextract login</code>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Opens your browser to authenticate with your DocExtract account
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#c97a63]/20 rounded-full flex items-center justify-center text-[#c97a63] font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Extract Documentation</h3>
                  <div className="bg-[#0a0908] rounded-lg p-4 font-mono text-sm border border-white/5">
                    <code className="text-[#7f8c5a]">docextract https://docs.example.com</code>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Extracts and saves documentation as structured markdown
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-6 h-6 text-[#c97a63]" />
            <h2 className="text-3xl font-bold">Key Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-[#c97a63]" />
                Fast & Efficient
              </h3>
              <p className="text-gray-400">
                Parallel processing for lightning-fast documentation extraction
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-[#c97a63]" />
                AI-Powered
              </h3>
              <p className="text-gray-400">
                Intelligent content structuring and markdown formatting
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-[#c97a63]" />
                Offline First
              </h3>
              <p className="text-gray-400">
                Save and organize documentation locally for offline access
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-[#c97a63]" />
                Customizable
              </h3>
              <p className="text-gray-400">
                Configure output format, depth, and extraction rules
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-[#b08968]/10 to-[#7f8c5a]/10 border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-3">Ready to get started?</h3>
            <p className="text-gray-400 mb-6">
              Install the CLI tool and start extracting documentation in seconds
            </p>
            <div className="bg-[#0a0908] rounded-lg p-4 font-mono text-sm border border-white/5 max-w-md mx-auto">
              <code className="text-[#7f8c5a]">npm install -g docextract-cli</code>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
