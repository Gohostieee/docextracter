"use client";

import { Suspense, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Terminal, Loader2, CheckCircle2, XCircle } from "lucide-react";
import axios from "axios";

function CliAuthContent() {
  const { isSignedIn, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Authenticating...');
  const callbackPort = searchParams.get('port') || '8765';

  useEffect(() => {
    const authenticate = async () => {
      try {
        // Wait for Clerk to load
        if (!isLoaded) {
          return;
        }

        // Check if user is signed in
        if (!isSignedIn) {
          setStatus('error');
          setMessage('Please sign in to authenticate the CLI');
          return;
        }

        // Get the session token
        const response = await axios.get('/api/cli-token');

        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to get token');
        }

        const { token, userId } = response.data;

        // Send token to CLI callback server
        const callbackUrl = `http://localhost:${callbackPort}/callback?token=${encodeURIComponent(token)}&userId=${encodeURIComponent(userId)}`;

        // Use fetch to send the token to the CLI
        await fetch(callbackUrl, { mode: 'no-cors' });

        setStatus('success');
        setMessage('Successfully authenticated! You can close this window.');
      } catch (error) {
        console.error('Auth error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Authentication failed');
      }
    };

    authenticate();
  }, [isLoaded, isSignedIn, callbackPort]);

  return (
    <div className="min-h-screen bg-[#0e0d0b] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-[#7f8c5a]/20 border border-[#7f8c5a]/30 rounded-full">
              {status === 'loading' && <Loader2 className="w-12 h-12 text-[#7f8c5a] animate-spin" />}
              {status === 'success' && <CheckCircle2 className="w-12 h-12 text-[#7f8c5a]" />}
              {status === 'error' && <XCircle className="w-12 h-12 text-red-400" />}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-[#f4ede1] mb-3 flex items-center justify-center gap-2">
            <Terminal className="w-8 h-8 text-[#b08968]" />
            CLI Authentication
          </h1>

          {/* Message */}
          <p className={`text-lg mb-6 ${
            status === 'error' ? 'text-red-400' : 'text-[#a39282]'
          }`}>
            {message}
          </p>

          {/* Additional info */}
          {status === 'success' && (
            <div className="p-4 bg-[#7f8c5a]/10 border border-[#7f8c5a]/20 rounded-xl">
              <p className="text-sm text-[#a39282]">
                Return to your terminal to continue using the CLI
              </p>
            </div>
          )}

          {status === 'error' && !isSignedIn && (
            <div className="mt-6">
              <a
                href="/"
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#b08968] to-[#8c6a4a] hover:from-[#9b7b58] hover:to-[#75583e] text-[#0e0d0b] font-semibold rounded-xl transition-all"
              >
                Sign In
              </a>
            </div>
          )}

          {status === 'error' && isSignedIn && (
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#b08968] to-[#8c6a4a] hover:from-[#9b7b58] hover:to-[#75583e] text-[#0e0d0b] font-semibold rounded-xl transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function CliAuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0e0d0b] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#7f8c5a] animate-spin" />
      </div>
    }>
      <CliAuthContent />
    </Suspense>
  );
}
