import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Externalize heavy server-only dependencies so Next can trace required files correctly
  // per Vercel Puppeteer guide: https://vercel.com/guides/deploying-puppeteer-with-nextjs-on-vercel
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  // Ensure Chromium assets are bundled with the serverless function
  // so chromium.executablePath() can locate the brotli files at runtime.
  outputFileTracingIncludes: {
    "/api/extract": [
      "./node_modules/@sparticuz/chromium/bin/**",
      "./node_modules/@sparticuz/chromium/lib/**",
      "./node_modules/@sparticuz/chromium/swiftshader/**",
      "./node_modules/@sparticuz/chromium/locales/**"
    ]
  }
};

export default nextConfig;
