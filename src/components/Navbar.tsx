"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Sparkles, Settings } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-3 shadow-2xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-[#b08968]/20 to-[#7f8c5a]/20 border border-white/10 rounded-lg">
                  <Sparkles className="w-5 h-5 text-[#c97a63]" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#f4ede1] to-[#d1bfa7] bg-clip-text text-transparent">
                  DocExtract
                </span>
              </div>

              {/* Nav Links */}
              <Button
                variant="ghost"
                onClick={() => router.push('/cli')}
                className="text-gray-300 hover:text-white hover:bg-white/10 hidden sm:flex"
              >
                CLI
              </Button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <Button
                      variant="ghost"
                      className="text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="bg-gradient-to-r from-[#b08968] to-[#8c6a4a] hover:from-[#9b7b58] hover:to-[#75583e] text-white shadow-lg">
                      Get Started
                    </Button>
                  </SignUpButton>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push('/settings')}
                    className="text-[#a39282] hover:text-[#f4ede1] hover:bg-white/10"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="ml-2 hidden sm:inline">Settings</span>
                  </Button>
                  <span className="text-sm text-gray-400 hidden sm:block">
                    {user?.firstName || user?.username || 'User'}
                  </span>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-9 h-9 ring-2 ring-[#c97a63]/30",
                        userButtonPopoverCard: "bg-[#171411] border border-white/10 text-[#f4ede1]",
                        userButtonPopoverMain: "text-[#f4ede1]",
                        userButtonPopoverActions: "text-[#f4ede1]",
                        userButtonPopoverActionButton: "text-[#f4ede1] hover:bg-[#252220]",
                        userButtonPopoverActionButtonText: "text-[#f4ede1]",
                        userButtonPopoverActionButtonIcon: "text-[#a39282]",
                        userButtonPopoverFooter: "hidden",
                        userPreviewTextContainer: "text-[#f4ede1]",
                        userPreviewMainIdentifier: "text-[#f4ede1]",
                        userPreviewSecondaryIdentifier: "text-[#a39282]",
                        userButtonOuterIdentifier: "text-[#f4ede1]",
                        userButtonBox: "text-[#f4ede1]",
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}


