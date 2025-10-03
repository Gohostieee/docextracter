"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Eye, EyeOff, Save, Trash2, ArrowLeft, Terminal, Copy, Check, Plus, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

interface ApiToken {
  id: string;
  name: string;
  createdAt: number;
  lastUsed?: number;
}

export default function SettingsPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [cliToken, setCliToken] = useState("");
  const [showCliToken, setShowCliToken] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [apiTokens, setApiTokens] = useState<ApiToken[]>([]);
  const [newTokenName, setNewTokenName] = useState("");
  const [createdToken, setCreatedToken] = useState<string | null>(null);
  const [showCreatedToken, setShowCreatedToken] = useState(false);

  const appUrl = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_APP_URL || window.location.origin) : 'http://localhost:3000';

  useEffect(() => {
    // Load API key from localStorage on mount
    const storedKey = localStorage.getItem("openai_api_key");
    if (storedKey) {
      setApiKey(storedKey);
    }

    // Fetch CLI token
    const fetchCliToken = async () => {
      try {
        const response = await axios.get("/api/cli-token");
        if (response.data.success) {
          setCliToken(response.data.token);
        }
      } catch (error) {
        console.error("Failed to fetch CLI token:", error);
      }
    };

    // Fetch API tokens
    const fetchApiTokens = async () => {
      try {
        const response = await axios.get("/api/api-tokens");
        if (response.data.success) {
          setApiTokens(response.data.tokens);
        }
      } catch (error) {
        console.error("Failed to fetch API tokens:", error);
      }
    };

    if (isSignedIn) {
      fetchCliToken();
      fetchApiTokens();
    }
  }, [isSignedIn]);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleClear = () => {
    localStorage.removeItem("openai_api_key");
    setApiKey("");
  };

  const handleCopyCliToken = () => {
    if (cliToken) {
      navigator.clipboard.writeText(cliToken);
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    }
  };

  const handleCreateToken = async () => {
    if (!newTokenName.trim()) return;

    try {
      const response = await axios.post("/api/api-tokens", {
        name: newTokenName.trim(),
      });

      if (response.data.success) {
        setCreatedToken(response.data.token);
        setNewTokenName("");

        // Refresh token list
        const listResponse = await axios.get("/api/api-tokens");
        if (listResponse.data.success) {
          setApiTokens(listResponse.data.tokens);
        }
      }
    } catch (error) {
      console.error("Failed to create API token:", error);
    }
  };

  const handleDeleteToken = async (tokenId: string) => {
    try {
      await axios.delete(`/api/api-tokens?id=${tokenId}`);

      // Refresh token list
      const listResponse = await axios.get("/api/api-tokens");
      if (listResponse.data.success) {
        setApiTokens(listResponse.data.tokens);
      }
    } catch (error) {
      console.error("Failed to delete API token:", error);
    }
  };

  const handleCopyCreatedToken = () => {
    if (createdToken) {
      navigator.clipboard.writeText(createdToken);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-[#0e0d0b] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#f4ede1] mb-4">Please sign in to access settings</p>
          <Button onClick={() => router.push("/")} className="bg-[#b08968] text-[#0e0d0b] font-semibold">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0d0b] p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-[#a39282] hover:text-[#f4ede1] hover:bg-white/5 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold text-[#f4ede1] mb-2">Settings</h1>
          <p className="text-[#a39282]">Manage your API configuration</p>
        </div>

        {/* Self-Hosting Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#b08968]/20 border border-[#b08968]/30 rounded-xl">
              <Key className="w-6 h-6 text-[#c97a63]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f4ede1]">Self-Hosting</h2>
              <p className="text-sm text-[#a39282]">Run DocExtract on your own infrastructure for free</p>
            </div>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-[#7f8c5a]/10 border border-[#7f8c5a]/20 rounded-xl">
            <h3 className="text-sm font-semibold text-[#f4ede1] mb-2">How to self-host DocExtract:</h3>
            <ol className="text-sm text-[#a39282] space-y-1 list-decimal list-inside">
              <li>Clone the repository: <a href="https://github.com/Gohostieee/docextracter" target="_blank" rel="noopener noreferrer" className="text-[#b08968] hover:text-[#c97a63] underline">github.com/Gohostieee/docextracter</a></li>
              <li>Follow the setup instructions in the README</li>
              <li>Deploy to your preferred hosting platform (Vercel, Railway, etc.)</li>
              <li>Use your own OpenAI API key in the environment variables</li>
            </ol>
            <p className="text-xs text-[#a39282] mt-3">
              <strong>Note:</strong> Self-hosting gives you full control and you only pay for OpenAI API usage.
            </p>
          </div>

          <div className="mt-4">
            <Button
              onClick={() => window.open('https://github.com/Gohostieee/docextracter', '_blank')}
              className="bg-gradient-to-r from-[#b08968] to-[#8c6a4a] hover:from-[#9b7b58] hover:to-[#75583e] text-[#0e0d0b] font-semibold w-full"
            >
              <Key className="w-4 h-4 mr-2" />
              View on GitHub
            </Button>
          </div>
        </motion.div>

        {/* CLI Authentication Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl mt-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#7f8c5a]/20 border border-[#7f8c5a]/30 rounded-xl">
              <Terminal className="w-6 h-6 text-[#7f8c5a]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f4ede1]">CLI Authentication</h2>
              <p className="text-sm text-[#a39282]">Use the CLI to extract docs from your terminal</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="cli-token" className="text-[#a39282]">
                Session Token
              </Label>
              <div className="relative mt-2">
                <Input
                  id="cli-token"
                  type={showCliToken ? "text" : "password"}
                  value={cliToken}
                  readOnly
                  placeholder="Loading..."
                  className="bg-[#1b1917] border-white/15 text-[#f4ede1] pr-20"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCliToken(!showCliToken)}
                    className="text-[#a39282] hover:text-[#f4ede1]"
                  >
                    {showCliToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyCliToken}
                    className="text-[#a39282] hover:text-[#f4ede1]"
                    disabled={!cliToken}
                  >
                    {copiedCli ? <Check className="w-4 h-4 text-[#7f8c5a]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <p className="text-xs text-[#a39282] mt-2">
                Copy this token to authenticate the CLI tool
              </p>
            </div>
          </div>

          {/* CLI Instructions */}
          <div className="mt-6 p-4 bg-[#b08968]/10 border border-[#b08968]/20 rounded-xl">
            <h3 className="text-sm font-semibold text-[#f4ede1] mb-2">How to use the CLI:</h3>
            <ol className="text-sm text-[#a39282] space-y-1 list-decimal list-inside">
              <li>Install the CLI: <code className="text-[#f4ede1] bg-black/30 px-2 py-0.5 rounded">npm install -g @docextracter/cli</code></li>
              <li>Login: <code className="text-[#f4ede1] bg-black/30 px-2 py-0.5 rounded">docextract login --server {appUrl}</code></li>
              <li>Paste the session token above when prompted</li>
              <li>Extract docs: <code className="text-[#f4ede1] bg-black/30 px-2 py-0.5 rounded">docextract extract &lt;url&gt;</code></li>
            </ol>
          </div>
        </motion.div>

        {/* API Token Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl mt-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#c97a63]/20 border border-[#c97a63]/30 rounded-xl">
              <Key className="w-6 h-6 text-[#c97a63]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f4ede1]">API Tokens (Recommended)</h2>
              <p className="text-sm text-[#a39282]">Permanent tokens for CLI authentication</p>
            </div>
          </div>

          {/* Created Token Alert */}
          {createdToken && (
            <div className="mb-6 p-4 bg-[#7f8c5a]/10 border border-[#7f8c5a]/30 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#7f8c5a] mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#f4ede1] mb-2">
                    Token created! Copy it now - you won't see it again.
                  </p>
                  <div className="relative">
                    <Input
                      type={showCreatedToken ? "text" : "password"}
                      value={createdToken}
                      readOnly
                      className="bg-[#1b1917] border-white/15 text-[#f4ede1] pr-20 font-mono text-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                      <button
                        onClick={() => setShowCreatedToken(!showCreatedToken)}
                        className="text-[#a39282] hover:text-[#f4ede1]"
                      >
                        {showCreatedToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={handleCopyCreatedToken}
                        className="text-[#a39282] hover:text-[#f4ede1]"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <Button
                    onClick={() => setCreatedToken(null)}
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-[#a39282] hover:text-[#f4ede1]"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Create Token */}
          <div className="mb-6">
            <Label htmlFor="token-name" className="text-[#a39282]">
              Create New Token
            </Label>
            <div className="flex gap-3 mt-2">
              <Input
                id="token-name"
                value={newTokenName}
                onChange={(e) => setNewTokenName(e.target.value)}
                placeholder="e.g., My CLI Token"
                className="bg-[#1b1917] border-white/15 text-[#f4ede1]"
              />
              <Button
                onClick={handleCreateToken}
                disabled={!newTokenName.trim()}
                className="bg-gradient-to-r from-[#c97a63] to-[#b08968] hover:from-[#b86952] hover:to-[#9b7b58] text-[#0e0d0b] font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
            </div>
          </div>

          {/* Token List */}
          <div>
            <h3 className="text-sm font-semibold text-[#f4ede1] mb-3">Active Tokens</h3>
            {apiTokens.length === 0 ? (
              <p className="text-sm text-[#a39282]">No API tokens created yet</p>
            ) : (
              <div className="space-y-2">
                {apiTokens.map((token) => (
                  <div
                    key={token.id}
                    className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#f4ede1]">{token.name}</p>
                      <p className="text-xs text-[#a39282]">
                        Created {new Date(token.createdAt).toLocaleDateString()}
                        {token.lastUsed && ` • Last used ${new Date(token.lastUsed).toLocaleDateString()}`}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleDeleteToken(token.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-[#c97a63]/10 border border-[#c97a63]/20 rounded-xl">
            <h3 className="text-sm font-semibold text-[#f4ede1] mb-2">Using API Tokens with CLI:</h3>
            <ol className="text-sm text-[#a39282] space-y-1 list-decimal list-inside">
              <li>Create a new API token above</li>
              <li>Copy the token (shown only once)</li>
              <li>Run: <code className="text-[#f4ede1] bg-black/30 px-2 py-0.5 rounded">docextract login --server {appUrl}</code></li>
              <li>Paste your API token when prompted</li>
            </ol>
            <p className="text-xs text-[#a39282] mt-3">
              <strong>Note:</strong> API tokens never expire and are more secure than session tokens.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
