import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import clerkAppearance from "@/config/clerk-appearance";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DocExtracter — AI Docs from Any URL",
    template: "%s | DocExtracter",
  },
  description:
    "Extract URLs, crawl docs and generate polished, structured markdown with AI—blazingly fast.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://docextracter.local"),
  openGraph: {
    title: "DocExtracter — AI Docs from Any URL",
    description:
      "Extract URLs, crawl docs and generate polished, structured markdown with AI—blazingly fast.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocExtracter — AI Docs from Any URL",
    description:
      "Extract URLs, crawl docs and generate polished, structured markdown with AI—blazingly fast.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
