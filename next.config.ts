import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Externalize heavy server-only dependencies so Next can trace required files correctly
  // per Vercel Puppeteer guide: https://vercel.com/guides/deploying-puppeteer-with-nextjs-on-vercel
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
};

export default nextConfig;
