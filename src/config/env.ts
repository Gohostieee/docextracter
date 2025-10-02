/**
 * Environment configuration for the application
 * All environment variables should be accessed through this file
 */

export const env = {
  // App URL
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  // API URL (can be different from app URL in production)
  API_URL: process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  // Clerk
  CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

  // OpenAI (for server-side usage)
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,

  // BrowserBase (optional)
  BROWSERBASE_API_KEY: process.env.BROWSERBASE_API_KEY,
  BROWSERBASE_PROJECT_ID: process.env.BROWSERBASE_PROJECT_ID,

  // Node environment
  NODE_ENV: process.env.NODE_ENV || 'development',

  // CLI Callback Port (for OAuth flow)
  CLI_CALLBACK_PORT: parseInt(process.env.CLI_CALLBACK_PORT || '8765'),
} as const;

// Validate required environment variables
if (typeof window === 'undefined') {
  // Server-side only validation
  if (!env.CLERK_SECRET_KEY) {
    console.warn('Warning: CLERK_SECRET_KEY is not set');
  }
}

// Client-side validation
if (typeof window !== 'undefined') {
  if (!env.CLERK_PUBLISHABLE_KEY) {
    console.warn('Warning: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set');
  }
}
