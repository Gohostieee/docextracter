import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { initBrowser } from '@/utils/browserbase';
import { initPuppeteer, extractLinksWithPuppeteer, fetchHTMLWithPuppeteer } from '@/utils/puppeteer';
import { openai, createOpenAI } from '@ai-sdk/openai';
import { generateObject, generateText } from 'ai';
//@ts-ignore
import archiver from 'archiver';
import { Readable } from 'stream';
//@ts-ignore
import TurndownService from 'turndown';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import { createProgress, addProgressUpdate, completeProgress, errorProgress } from './progress-store';
import { verifyApiToken } from '@/lib/api-tokens';

// Ensure Node runtime and no caching for long-running extraction
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Define the request schema
const extractSchema = z.object({
  url: z.string().url('Invalid URL format'),
  guide: z.string().min(1, 'Guide is required'),
  jsr: z.boolean().optional().default(false), // JavaScript render flag
  aggressive: z.boolean().optional().default(false), // Aggressive rendering mode (only applies when jsr=true)
});

// Schema for AI response
const urlFilterSchema = z.object({
  filteredUrls: z.array(z.string().url()).describe('URLs that match the extraction guide criteria'),
  reasoning: z.string().describe('Brief explanation of why these URLs were selected'),
});

// Helper function to fetch and convert URL to markdown
async function fetchAndConvertToMarkdown(
  url: string,
  puppeteerBrowser?: import('puppeteer').Browser,
  aggressive: boolean = false
): Promise<{ markdown: string; title: string }> {
  let html: string;

  // Use Puppeteer if provided, otherwise use regular fetch
  if (puppeteerBrowser) {
    html = await fetchHTMLWithPuppeteer(puppeteerBrowser, url, aggressive);
  } else {
    const response = await fetch(url);
    html = await response.text();
  }

  const dom = new JSDOM(html, { url });

  // Remove ALL hiding attributes and mechanisms
  // This ensures all tab content is captured, not just the active tab
  const hiddenElements = dom.window.document.querySelectorAll('[hidden], [data-state="inactive"]');
  hiddenElements.forEach((el) => {
    el.removeAttribute('hidden');
    el.removeAttribute('data-state'); // REMOVE data-state to prevent CSS hiding
    el.setAttribute('style', 'display: block !important; visibility: visible !important;'); // Force visibility
  });

  // Remove/disable style tags that contain hiding rules for tabs
  const styleTags = dom.window.document.querySelectorAll('style');
  styleTags.forEach((styleTag) => {
    const cssText = styleTag.textContent || '';
    if (cssText.includes('data-state') || cssText.includes('[hidden]') || cssText.includes('display:none')) {
      // Disable hiding rules by commenting them out
      styleTag.textContent = cssText
        .replace(/\[data-state="inactive"\][^}]*\{[^}]*display:\s*none[^}]*\}/g, '/* removed */')
        .replace(/\[hidden\][^}]*\{[^}]*display:\s*none[^}]*\}/g, '/* removed */');
    }
  });

  // Pre-process code blocks to extract clean code from syntax-highlighted spans
  const codeElements = dom.window.document.querySelectorAll('code[language], pre code');
  codeElements.forEach((codeEl) => {
    const lines = codeEl.querySelectorAll('.line, span.line');
    if (lines.length > 0) {
      // Extract text content from each line, removing inline styles
      const cleanCode = Array.from(lines)
        .map(line => {
          // Get all text content from spans within the line
          return Array.from(line.querySelectorAll('span'))
            .map(span => span.textContent || '')
            .join('');
        })
        .join('\n');

      // Replace the entire code element content with clean text
      codeEl.textContent = cleanCode;

      // Get language attribute if available
      const language = codeEl.getAttribute('language') || '';
      if (language) {
        codeEl.setAttribute('data-language', language);
      }
    }
  });

  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
  });

  // Add custom rule for code blocks with language attribute
  turndownService.addRule('codeWithLanguage', {
    filter: (node: Node) => {
      return node.nodeName === 'CODE' && (node as Element).getAttribute('data-language');
    },
    replacement: (content: string, node: Node) => {
      const language = (node as Element).getAttribute('data-language') || '';
      return '\n```' + language + '\n' + content + '\n```\n';
    }
  });

  const markdown = article ? turndownService.turndown(article.content) : turndownService.turndown(html);
  const title = article?.title || dom.window.document.title || 'Untitled';

  return { markdown, title };
}

// Helper function to generate master catalog summary
async function generateMasterSummary(
  pages: Array<{ url: string; title: string; markdown: string }>,
  guide: string
): Promise<{ summary: string; usage: { promptTokens: number; completionTokens: number; totalTokens: number } }> {
  // Combine all pages into a single catalog text
  let catalogText = '';
  for (const page of pages) {
    // Limit each page to 15k characters to prevent token overflow
    const truncatedMarkdown = page.markdown.slice(0, 15000);
    catalogText += `\n\n--- PAGE: ${page.title} ---\nURL: ${page.url}\n\n${truncatedMarkdown}\n`;
  }

  // Further limit total catalog size
  const maxCatalogSize = 100000; // ~25k tokens
  if (catalogText.length > maxCatalogSize) {
    catalogText = catalogText.slice(0, maxCatalogSize) + '\n\n[... Content truncated for length ...]';
  }

  const provider = openai;
  const { text, usage } = await generateText({
    model: provider('gpt-5-nano'),
    prompt: `You are analyzing an entire documentation catalog. Generate a comprehensive summary of all the documentation pages provided below.

Extraction Guide Context:
${guide}

Documentation Catalog (${pages.length} pages):
${catalogText}

Provide a comprehensive summary that includes:
1. Overview of the entire documentation catalog
2. Main topics and themes covered across all pages
3. Key technical concepts and features
4. How the pages relate to each other
5. Important details from each major section

Generate a well-structured summary (5-10 paragraphs) that captures the essence of this documentation collection.`,
  });

  return {
    summary: text,
    usage: {
      promptTokens: (usage as any).promptTokens || 0,
      completionTokens: (usage as any).completionTokens || 0,
      totalTokens: (usage as any).totalTokens || 0,
    },
  };
}

// Helper function to sanitize filename
function sanitizeFilename(name: string): string {
  return name
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .toLowerCase()
    .slice(0, 50);
}

// Helper function to generate a 4-letter hash
function generateShortHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Convert to base36 and take first 4 characters
  return Math.abs(hash).toString(36).substring(0, 4).toUpperCase();
}

// Helper function to create human-readable filename from URL
function createReadableFilename(url: string): string {
  try {
    const urlObj = new URL(url);
    // Extract domain without www and TLD
    let domain = urlObj.hostname.replace(/^www\./, '');
    
    // Get the main domain name (before first dot)
    const domainParts = domain.split('.');
    const mainDomain = domainParts[0];
    
    // Get path parts (if any meaningful ones exist)
    const pathParts = urlObj.pathname
      .split('/')
      .filter(part => part && part !== 'docs' && part !== 'documentation');
    
    // Combine domain with first path part if it exists
    let baseName = mainDomain;
    if (pathParts.length > 0 && pathParts[0].length > 0) {
      baseName = `${mainDomain}-${pathParts[0]}`;
    }
    
    // Sanitize and limit length
    baseName = baseName
      .replace(/[^a-z0-9-]/gi, '-')
      .replace(/-+/g, '-')
      .toLowerCase()
      .slice(0, 30);
    
    // Generate 4-letter hash for uniqueness
    const hash = generateShortHash(url + Date.now());
    
    return `${baseName}-${hash}`;
  } catch (e) {
    // Fallback to generic name with hash
    const hash = generateShortHash(url + Date.now());
    return `documentation-${hash}`;
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  // Check authentication - handle both web and CLI requests
  let authResult = await auth();
  let userId = authResult.userId;
  let isApiTokenAuth = false;

  // If no userId from cookies, check for Bearer token (CLI authentication with permanent API tokens)
  if (!userId) {
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); // Remove 'Bearer ' prefix

      // Verify the permanent API token
      const tokenResult = await verifyApiToken(token);

      if (tokenResult) {
        userId = tokenResult.userId;
        isApiTokenAuth = true;
        console.log(`[CLI Auth] Authenticated user ${userId} via API token ${tokenResult.tokenId}`);
      } else {
        console.error('[CLI Auth] Invalid API token provided');
      }
    }
  }

  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
        message: 'You must be signed in or provide a valid API token to use this feature',
      },
      { status: 401 }
    );
  }

  // Parse the request body
  const body = await request.json();

  // Check subscription using Clerk's native billing (Beta)
  // The user must have the 'extracter' feature
  let hasExtractorFeature = false;

  // If authenticated via API token, grant access (API tokens are only given to authorized users)
  if (isApiTokenAuth) {
    hasExtractorFeature = true;
    console.log('[CLI Auth] Granting access via API token authentication');
  }

  // Try to check subscription from web auth first
  if (!hasExtractorFeature && authResult.has) {
    hasExtractorFeature = authResult.has({ feature: 'extracter' });
  }

  // If no feature found and we have userId, check via Clerk client
  if (!hasExtractorFeature && userId) {
    try {
      const { clerkClient } = await import('@clerk/nextjs/server');
      const client = await clerkClient();
      const user = await client.users.getUser(userId);

      // Check if user has the extracter feature in their metadata or subscriptions
      // This is a fallback for CLI authentication
      hasExtractorFeature = user.publicMetadata?.hasSubscription === true ||
                            user.privateMetadata?.hasExtractorFeature === true;
    } catch (error) {
      console.error('Error checking subscription via Clerk client:', error);
    }
  }

  if (!hasExtractorFeature) {
    return NextResponse.json(
      {
        success: false,
        error: 'Subscription required',
        message: 'You need an active subscription to use this service, or you can self-host for free at https://github.com/Gohostieee/docextracter',
      },
      { status: 403 }
    );
  }

  // Get progress ID from request header (sent by client)
  const progressId = request.headers.get('X-Progress-Id') || `extract-${Date.now()}-${Math.random().toString(36).substring(7)}`;

  console.log('[API] Using progress ID:', progressId);

  let tokenUsage = {
    urlFiltering: { prompt: 0, completion: 0, total: 0 },
    masterSummary: { prompt: 0, completion: 0, total: 0 },
    totalPrompt: 0,
    totalCompletion: 0,
    totalTokens: 0,
  };

  // Puppeteer browser instance (declared here so it's accessible in catch block)
  let puppeteerBrowser: import('puppeteer').Browser | null = null;

  // Create progress tracker
  createProgress(progressId);
  console.log('[API] Progress tracker created for:', progressId);

  try {
    console.log('=== EXTRACTION STARTED ===');
    console.log(`Progress ID: ${progressId}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);

    addProgressUpdate(progressId, {
      type: 'progress',
      step: 1,
      stepName: 'Starting extraction',
      message: 'Extraction process initiated',
      progress: 0,
    });

    // Validate request (body already parsed above)
    console.log('\n--- Step 1: Validating request ---');
    addProgressUpdate(progressId, {
      type: 'progress',
      step: 1,
      stepName: 'Validating request',
      message: 'Validating request data...',
      progress: 5,
    });

    // Validate the request data
    console.log('\n--- Step 2: Validating request data ---');
    const validateStart = Date.now();
    const validatedData = extractSchema.parse(body);
    console.log(`✓ Validation completed in ${Date.now() - validateStart}ms`);
    console.log(`✓ URL: ${validatedData.url}`);
    console.log(`✓ Guide length: ${validatedData.guide.length} characters`);

    addProgressUpdate(progressId, {
      type: 'progress',
      step: 2,
      stepName: 'Extracting links',
      message: `Extracting links from ${validatedData.url}...`,
      progress: 10,
    });

    // Extract all links from the page
    console.log('\n--- Step 3: Extracting links from page ---');
    const linkExtractionStart = Date.now();

    let links: string[] = [];
    let usedBrowser = false;

    // Use Puppeteer if JSR flag is true
    if (validatedData.jsr) {
      console.log('🎭 JSR flag enabled - using Puppeteer...');
      usedBrowser = true;

      const browserInitStart = Date.now();
      puppeteerBrowser = await initPuppeteer();
      console.log(`✓ Puppeteer initialized in ${Date.now() - browserInitStart}ms`);

      const extractStart = Date.now();
      links = await extractLinksWithPuppeteer(puppeteerBrowser, validatedData.url);
      console.log(`✓ Links extracted in ${Date.now() - extractStart}ms`);
      console.log(`✓ Found ${links.length} links via Puppeteer`);

    } else {
      // Use current behavior - try simple fetch first, fallback to browser if needed
      try {
        // Try simple HTTP fetch first (faster)
        console.log('Attempting simple HTTP fetch...');
        const fetchStart = Date.now();
        const response = await fetch(validatedData.url);
        const html = await response.text();
        console.log(`✓ HTML fetched in ${Date.now() - fetchStart}ms (${html.length} bytes)`);

        // Quick parse for links
        const parseStart = Date.now();
        const linkMatches = html.matchAll(/<a\s+(?:[^>]*?\s+)?href=["']([^"']+)["']/gi);
        const rawLinks = Array.from(linkMatches, m => m[1]);
        console.log(`✓ Parsed ${rawLinks.length} raw links in ${Date.now() - parseStart}ms`);

        // Check if this looks like a JS-rendered site
        const detectionStart = Date.now();
        const jsIndicators = [
          /<div[^>]*id=["'](root|app|__next)["']/i,
          /__NEXT_DATA__|ng-version|data-reactroot|data-vue-app/,
          /<noscript>.*?enable.*?javascript/i
        ];

        const isJSRendered = jsIndicators.some(pattern => pattern.test(html));
        console.log(`✓ JS detection completed in ${Date.now() - detectionStart}ms (JS-rendered: ${isJSRendered})`);

        if (rawLinks.length < 5 || isJSRendered) {
          console.log(`⚠️ Detected JS-rendered site (${rawLinks.length} links in raw HTML), falling back to browser...`);
          throw new Error('JS-rendered site detected');
        }

        // Convert relative URLs to absolute
        const conversionStart = Date.now();
        const baseUrl = new URL(validatedData.url);
        links = rawLinks.map(link => {
          try {
            return new URL(link, baseUrl.origin).href;
          } catch {
            return link;
          }
        }).filter(link => link.startsWith('http'));
        console.log(`✓ Converted to absolute URLs in ${Date.now() - conversionStart}ms`);

        console.log(`✓ Found ${links.length} links via HTTP fetch (fast path)`);

      } catch (error) {
        // Fallback to browser for JS-rendered sites
        console.log('Using browser for link extraction...');
        usedBrowser = true;

        const browserInitStart = Date.now();
        const browser = await initBrowser();
        console.log(`✓ Browser initialized in ${Date.now() - browserInitStart}ms`);

        const pageStart = Date.now();
        const page = await browser.newPage();
        console.log(`✓ New page created in ${Date.now() - pageStart}ms`);

        const navStart = Date.now();
        console.log(`Navigating to ${validatedData.url}...`);
        await page.goto(validatedData.url, { waitUntil: 'domcontentloaded' });
        console.log(`✓ Navigation completed in ${Date.now() - navStart}ms`);

        const selectorStart = Date.now();
        await page.waitForSelector('body');
        console.log(`✓ Body selector wait completed in ${Date.now() - selectorStart}ms`);

        const extractStart = Date.now();
        console.log('Extracting links from page...');
        links = await page.$$eval('a', as => as.map(a => a.href));
        console.log(`✓ Links extracted in ${Date.now() - extractStart}ms`);
        console.log(`✓ Found ${links.length} links via browser`);

        const cleanupStart = Date.now();
        await page.close();
        await browser.close();
        console.log(`✓ Browser cleanup completed in ${Date.now() - cleanupStart}ms`);
      }
    }

    const linkExtractionDuration = Date.now() - linkExtractionStart;
    const extractionMethod = validatedData.jsr ? 'Puppeteer (JSR)' : (usedBrowser ? 'browser' : 'HTTP fetch');
    console.log(`✓ Link extraction complete in ${linkExtractionDuration}ms (method: ${extractionMethod})`);

    addProgressUpdate(progressId, {
      type: 'progress',
      step: 3,
      stepName: 'Links extracted',
      message: `Found ${links.length} links`,
      progress: 20,
      details: { linkCount: links.length, method: extractionMethod },
    });

    // Remove duplicate URLs
    console.log('\nRemoving duplicate URLs...');
    const dedupeStart = Date.now();
    const originalCount = links.length;
    links = [...new Set(links)]; // Remove duplicates
    const duplicatesRemoved = originalCount - links.length;
    console.log(`✓ Removed ${duplicatesRemoved} duplicate URLs in ${Date.now() - dedupeStart}ms (${links.length} unique URLs remaining)`);

    // Use GPT to filter URLs based on the guide
    console.log('\n--- Step 4: Filtering URLs with AI ---');
    const filterStart = Date.now();

    // Chunk URLs if there are too many (to avoid token limits and improve speed)
    const MAX_URLS_PER_BATCH = 50;
    const linkBatches: string[][] = [];

    const batchingStart = Date.now();
    if (links.length > MAX_URLS_PER_BATCH) {
      console.log(`Splitting ${links.length} URLs into batches of ${MAX_URLS_PER_BATCH}...`);
      for (let i = 0; i < links.length; i += MAX_URLS_PER_BATCH) {
        linkBatches.push(links.slice(i, i + MAX_URLS_PER_BATCH));
      }
      console.log(`✓ Created ${linkBatches.length} batches in ${Date.now() - batchingStart}ms`);
    } else {
      linkBatches.push(links);
      console.log(`✓ Using single batch (${links.length} URLs)`);
    }

    // Process all batches in parallel
    console.log(`Starting parallel AI filtering of ${linkBatches.length} batch(es)...`);
    const aiRequestStart = Date.now();

    const filterPromises = linkBatches.map(async (batch, batchIndex) => {
      const batchStart = Date.now();
      console.log(`  [Batch ${batchIndex + 1}/${linkBatches.length}] Starting AI filtering of ${batch.length} URLs...`);

      const provider = openai;
      const { object, usage } = await generateObject({
        model: provider('gpt-5-nano'),
        schema: urlFilterSchema,
        prompt: `You are a URL filtering assistant. Given a list of URLs and extraction guidelines, return only the URLs that match the criteria.

Extraction Guide:
${validatedData.guide}

URLs to filter (batch ${batchIndex + 1}/${linkBatches.length}, ${batch.length} URLs):
${batch.join('\n')}

Return only the URLs that match the extraction guide criteria, along with your reasoning.`,
      });

      const batchDuration = Date.now() - batchStart;
      console.log(`  [Batch ${batchIndex + 1}] ✓ Completed in ${batchDuration}ms - Filtered to ${object.filteredUrls.length}/${batch.length} URLs (${(usage as any).totalTokens || 0} tokens)`);

      return { object, usage };
    });

    // Wait for all filtering to complete
    const filterResults = await Promise.all(filterPromises);
    const allAiDuration = Date.now() - aiRequestStart;
    console.log(`✓ All AI filtering requests completed in ${allAiDuration}ms`);

    // Combine results from all batches
    const combineStart = Date.now();
    const allFilteredUrls: string[] = [];
    const allReasonings: string[] = [];
    let totalFilterTokens = { prompt: 0, completion: 0, total: 0 };

    for (let i = 0; i < filterResults.length; i++) {
      const result = filterResults[i];
      allFilteredUrls.push(...result.object.filteredUrls);
      allReasonings.push(`Batch ${i + 1}: ${result.object.reasoning}`);
      totalFilterTokens.prompt += (result.usage as any).promptTokens || 0;
      totalFilterTokens.completion += (result.usage as any).completionTokens || 0;
      totalFilterTokens.total += (result.usage as any).totalTokens || 0;
    }

    // Create combined object for backward compatibility
    const object = {
      filteredUrls: allFilteredUrls,
      reasoning: allReasonings.join('\n\n'),
    };

    tokenUsage.urlFiltering = totalFilterTokens;
    console.log(`✓ Results combined in ${Date.now() - combineStart}ms`);

    const filterDuration = Date.now() - filterStart;
    console.log(`✓ AI filtering TOTAL TIME: ${filterDuration}ms`);
    console.log(`✓ Token usage - Prompt: ${totalFilterTokens.prompt}, Completion: ${totalFilterTokens.completion}, Total: ${totalFilterTokens.total}`);
    console.log(`✓ Filtered to ${object.filteredUrls.length} URLs (from ${links.length} total, ${((object.filteredUrls.length/links.length)*100).toFixed(1)}% match rate)`);

    addProgressUpdate(progressId, {
      type: 'progress',
      step: 4,
      stepName: 'AI filtering complete',
      message: `Filtered to ${object.filteredUrls.length} relevant URLs`,
      progress: 40,
      details: { filteredCount: object.filteredUrls.length, originalCount: links.length },
    });

    // Fetch and process each filtered URL - shotgun approach with smart batching and retry
    console.log('\n--- Step 5: Fetching and converting URLs to markdown ---');
    const markdownFetchStart = Date.now();
    console.log(`Starting parallel processing of ${object.filteredUrls.length} URLs...`);

    const processedPages: Array<{
      url: string;
      title: string;
      markdown: string;
      filename: string;
    }> = [];

    // Smart batching: shotgun if ≤100 URLs, batch if >100
    const SHOTGUN_THRESHOLD = 100;
    const BATCH_SIZE = 100;
    const useShotgun = object.filteredUrls.length <= SHOTGUN_THRESHOLD;

    if (useShotgun) {
      console.log(`🔫 SHOTGUN MODE: Fetching all ${object.filteredUrls.length} URLs simultaneously...`);
    } else {
      console.log(`📦 BATCH MODE: ${object.filteredUrls.length} URLs will be processed in batches of ${BATCH_SIZE}`);
    }

    // Helper function to fetch a single URL
    async function fetchUrl(url: string, urlNumber: number): Promise<{
      url: string;
      title: string;
      markdown: string;
      filename: string;
    } | null> {
      const urlStart = Date.now();
      console.log(`    [${urlNumber}/${object.filteredUrls.length}] Fetching: ${url}`);

      try {
        const { markdown, title } = await fetchAndConvertToMarkdown(
          url,
          puppeteerBrowser || undefined,
          validatedData.aggressive
        );
        const urlDuration = Date.now() - urlStart;

        console.log(`    [${urlNumber}] ✓ Completed in ${urlDuration}ms (${markdown.length} chars) - ${title}`);

        const filename = sanitizeFilename(title);

        return {
          url,
          title,
          markdown,
          filename,
        };
      } catch (error) {
        const urlDuration = Date.now() - urlStart;
        console.error(`    [${urlNumber}] ✗ Failed after ${urlDuration}ms:`, error instanceof Error ? error.message : error);
        return null;
      }
    }

    let urlsToFetch = object.filteredUrls;
    let attemptNumber = 1;
    const MAX_RETRIES = 2;

    while (urlsToFetch.length > 0 && attemptNumber <= MAX_RETRIES) {
      const isRetry = attemptNumber > 1;
      if (isRetry) {
        console.log(`\n🔄 RETRY ATTEMPT ${attemptNumber}: Re-fetching ${urlsToFetch.length} failed URLs in batches...`);
      }

      const failedUrls: string[] = [];

      if (useShotgun && !isRetry) {
        // SHOTGUN: All at once
        const shotgunStart = Date.now();
        const promises = urlsToFetch.map((url, index) => fetchUrl(url, index + 1));
        const results = await Promise.all(promises);

        for (let i = 0; i < results.length; i++) {
          if (results[i]) {
            processedPages.push(results[i]!);
          } else {
            failedUrls.push(urlsToFetch[i]);
          }
        }

        console.log(`🔫 Shotgun completed in ${Date.now() - shotgunStart}ms: ${results.filter(r => r !== null).length}/${urlsToFetch.length} successful`);
      } else {
        // BATCH MODE: Process in chunks
        const urlBatches: string[][] = [];
        for (let i = 0; i < urlsToFetch.length; i += BATCH_SIZE) {
          urlBatches.push(urlsToFetch.slice(i, i + BATCH_SIZE));
        }
        console.log(`Processing ${urlsToFetch.length} URLs in ${urlBatches.length} batch(es)...`);

        for (let batchIndex = 0; batchIndex < urlBatches.length; batchIndex++) {
          const batch = urlBatches[batchIndex];
          const batchStart = Date.now();
          console.log(`\n  Batch ${batchIndex + 1}/${urlBatches.length}: Starting ${batch.length} concurrent fetches...`);

          const promises = batch.map((url, index) => {
            const globalIndex = batchIndex * BATCH_SIZE + index + 1;
            return fetchUrl(url, globalIndex);
          });

          const results = await Promise.all(promises);
          const batchDuration = Date.now() - batchStart;

          for (let i = 0; i < results.length; i++) {
            if (results[i]) {
              processedPages.push(results[i]!);
            } else {
              failedUrls.push(batch[i]);
            }
          }

          console.log(`  ✓ Batch ${batchIndex + 1} completed in ${batchDuration}ms: ${results.filter(r => r !== null).length}/${batch.length} successful`);
        }
      }

      // Prepare for retry
      if (failedUrls.length > 0 && attemptNumber < MAX_RETRIES) {
        console.log(`\n⚠️ ${failedUrls.length} URLs failed, will retry in next attempt...`);
        urlsToFetch = failedUrls;
        attemptNumber++;
      } else {
        if (failedUrls.length > 0) {
          console.log(`\n❌ ${failedUrls.length} URLs failed after ${MAX_RETRIES} attempts, giving up on these:`);
          failedUrls.forEach(url => console.log(`    - ${url}`));
        }
        break;
      }
    }

    const markdownFetchDuration = Date.now() - markdownFetchStart;
    console.log(`\n✓ Markdown fetching TOTAL TIME: ${markdownFetchDuration}ms`);
    console.log(`✓ Success rate: ${processedPages.length}/${object.filteredUrls.length} pages (${((processedPages.length/object.filteredUrls.length)*100).toFixed(1)}%)`);
    console.log(`✓ Total attempts made: ${attemptNumber}`);

    addProgressUpdate(progressId, {
      type: 'progress',
      step: 5,
      stepName: 'Markdown conversion complete',
      message: `Successfully converted ${processedPages.length} pages to markdown`,
      progress: 60,
      details: { successCount: processedPages.length, totalCount: object.filteredUrls.length },
    });

    // Generate single master summary from all pages
    console.log('\n--- Step 6: Generating master catalog summary ---');
    const masterSummaryStart = Date.now();
    console.log(`Preparing catalog text from ${processedPages.length} pages...`);

    const catalogPrepStart = Date.now();
    const { summary: masterSummaryText, usage: masterSummaryUsage } = await generateMasterSummary(
      processedPages,
      validatedData.guide
    );
    const masterSummaryDuration = Date.now() - masterSummaryStart;

    tokenUsage.masterSummary = {
      prompt: masterSummaryUsage.promptTokens,
      completion: masterSummaryUsage.completionTokens,
      total: masterSummaryUsage.totalTokens,
    };

    console.log(`✓ Master summary AI call completed in ${masterSummaryDuration}ms`);
    console.log(`✓ Token usage - Prompt: ${masterSummaryUsage.promptTokens}, Completion: ${masterSummaryUsage.completionTokens}, Total: ${masterSummaryUsage.totalTokens}`);
    console.log(`✓ Summary length: ${masterSummaryText.length} characters`);

    // Calculate total token usage
    const tokenCalcStart = Date.now();
    tokenUsage.totalPrompt = tokenUsage.urlFiltering.prompt + tokenUsage.masterSummary.prompt;
    tokenUsage.totalCompletion = tokenUsage.urlFiltering.completion + tokenUsage.masterSummary.completion;
    tokenUsage.totalTokens = tokenUsage.totalPrompt + tokenUsage.totalCompletion;
    console.log(`✓ Token calculations completed in ${Date.now() - tokenCalcStart}ms`);

    console.log('\n=== TOKEN USAGE SUMMARY ===');
    console.log(`URL Filtering: ${tokenUsage.urlFiltering.total} tokens (${tokenUsage.urlFiltering.prompt} prompt + ${tokenUsage.urlFiltering.completion} completion)`);
    console.log(`Master Summary: ${tokenUsage.masterSummary.total} tokens (${tokenUsage.masterSummary.prompt} prompt + ${tokenUsage.masterSummary.completion} completion)`);
    console.log(`TOTAL: ${tokenUsage.totalTokens} tokens (${tokenUsage.totalPrompt} prompt + ${tokenUsage.totalCompletion} completion)`);

    // Create master summary document
    console.log('\n--- Step 7: Creating master summary document ---');
    const docCreationStart = Date.now();
    let masterSummary = `# Documentation Catalog Summary\n\n`;
    masterSummary += `**Source:** ${validatedData.url}\n`;
    masterSummary += `**Generated:** ${new Date().toISOString()}\n`;
    masterSummary += `**Total Pages:** ${processedPages.length}\n\n`;

    // Add token usage to master summary
    masterSummary += `## Token Usage\n\n`;
    masterSummary += `- **URL Filtering:** ${tokenUsage.urlFiltering.total} tokens\n`;
    masterSummary += `- **Master Summary:** ${tokenUsage.masterSummary.total} tokens\n`;
    masterSummary += `- **Total:** ${tokenUsage.totalTokens} tokens\n\n`;

    masterSummary += `## Extraction Criteria\n\n${validatedData.guide}\n\n`;
    masterSummary += `## AI URL Filtering Reasoning\n\n${object.reasoning}\n\n`;
    masterSummary += `---\n\n`;

    // Add the master catalog summary
    masterSummary += `## Comprehensive Catalog Summary\n\n`;
    masterSummary += `${masterSummaryText}\n\n`;
    masterSummary += `---\n\n`;

    // Add page index
    masterSummary += `## Page Index\n\n`;
    for (let i = 0; i < processedPages.length; i++) {
      const page = processedPages[i];
      masterSummary += `${i + 1}. **[${page.title}](${page.url})** - See \`pages/${page.filename}.md\`\n`;
    }

    const docCreationDuration = Date.now() - docCreationStart;
    console.log(`✓ Master summary document created in ${docCreationDuration}ms (${masterSummary.length} bytes)`);

    // Create ZIP file with minimal compression for speed
    console.log('\n--- Step 8: Creating ZIP archive ---');
    const zipStart = Date.now();
    console.log('Initializing archiver...');
    const archiverInitStart = Date.now();
    const archive = archiver('zip', { zlib: { level: 1 } }); // Minimal compression for speed
    const chunks: Buffer[] = [];

    archive.on('data', (chunk: Buffer) => chunks.push(chunk));

    const archivePromise = new Promise<Buffer>((resolve, reject) => {
      archive.on('end', () => resolve(Buffer.concat(chunks)));
      archive.on('error', reject);
    });
    console.log(`✓ Archiver initialized in ${Date.now() - archiverInitStart}ms`);

    // Add master summary
    const masterSummaryAddStart = Date.now();
    archive.append(masterSummary, { name: 'MASTER_SUMMARY.md' });
    console.log(`✓ Added MASTER_SUMMARY.md in ${Date.now() - masterSummaryAddStart}ms`);

    // Add individual markdown files
    const pagesAddStart = Date.now();
    for (const page of processedPages) {
      const content = `# ${page.title}\n\n**URL:** ${page.url}\n\n---\n\n${page.markdown}`;
      archive.append(content, { name: `pages/${page.filename}.md` });
    }
    console.log(`✓ Added ${processedPages.length} page files in ${Date.now() - pagesAddStart}ms`);

    // Add README
    const readmeAddStart = Date.now();
    const readme = `# Documentation Package\n\nExtracted from: ${validatedData.url}\nGenerated: ${new Date().toISOString()}\n\n## Contents\n\n- MASTER_SUMMARY.md - Combined summary of all pages\n- pages/ - Individual markdown files for each page\n\nTotal pages: ${processedPages.length}`;
    archive.append(readme, { name: 'README.md' });
    console.log(`✓ Added README.md in ${Date.now() - readmeAddStart}ms`);

    const finalizeStart = Date.now();
    console.log('Finalizing ZIP archive...');
    await archive.finalize();
    const zipBuffer = await archivePromise;
    const finalizeDuration = Date.now() - finalizeStart;
    console.log(`✓ ZIP finalized in ${finalizeDuration}ms`);

    const zipDuration = Date.now() - zipStart;
    console.log(`✓ ZIP archive TOTAL TIME: ${zipDuration}ms (${zipBuffer.length} bytes, ${(zipBuffer.length / 1024 / 1024).toFixed(2)} MB)`);

    const totalDuration = Date.now() - startTime;
    console.log('\n=== EXTRACTION COMPLETED ===');
    console.log(`Total duration: ${totalDuration}ms (${(totalDuration / 1000).toFixed(2)}s)`);
    console.log(`Pages processed: ${processedPages.length}`);
    console.log(`Total tokens used: ${tokenUsage.totalTokens}`);
    console.log('\n--- Timing Breakdown ---');
    console.log(`Step 3 (Link Extraction): ${linkExtractionDuration}ms (${((linkExtractionDuration/totalDuration)*100).toFixed(1)}%)`);
    console.log(`Step 4 (AI URL Filtering): ${filterDuration}ms (${((filterDuration/totalDuration)*100).toFixed(1)}%)`);
    console.log(`Step 5 (Markdown Fetching): ${markdownFetchDuration}ms (${((markdownFetchDuration/totalDuration)*100).toFixed(1)}%)`);
    console.log(`Step 6 (Master Summary): ${masterSummaryDuration}ms (${((masterSummaryDuration/totalDuration)*100).toFixed(1)}%)`);
    console.log(`Step 7 (Doc Creation): ${docCreationDuration}ms (${((docCreationDuration/totalDuration)*100).toFixed(1)}%)`);
    console.log(`Step 8 (ZIP Creation): ${zipDuration}ms (${((zipDuration/totalDuration)*100).toFixed(1)}%)`);

    // Clean up Puppeteer browser if it was used
    if (puppeteerBrowser) {
      const cleanupStart = Date.now();
      console.log('\n--- Cleaning up Puppeteer browser ---');
      await puppeteerBrowser.close();
      console.log(`✓ Puppeteer browser closed in ${Date.now() - cleanupStart}ms`);
    }

    // Mark as complete
    completeProgress(progressId, {
      totalPages: processedPages.length,
      totalTokens: tokenUsage.totalTokens,
      duration: totalDuration,
    });

    addProgressUpdate(progressId, {
      type: 'progress',
      step: 8,
      stepName: 'Complete',
      message: `Successfully extracted ${processedPages.length} pages`,
      progress: 100,
      details: { totalPages: processedPages.length, duration: totalDuration },
    });

    // Generate human-readable filename
    const zipFilename = `${createReadableFilename(validatedData.url)}.zip`;
    console.log(`✓ ZIP filename: ${zipFilename}`);

    // Return ZIP file as downloadable response
    return new NextResponse(zipBuffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${zipFilename}"`,
        'X-Token-Usage': JSON.stringify(tokenUsage),
        'X-Processing-Time': totalDuration.toString(),
        'X-Progress-Id': progressId,
      },
    });
  } catch (error) {
    // Clean up Puppeteer browser if it was used
    if (puppeteerBrowser) {
      try {
        await puppeteerBrowser.close();
        console.log('✓ Puppeteer browser cleaned up after error');
      } catch (cleanupError) {
        console.error('Failed to cleanup Puppeteer browser:', cleanupError);
      }
    }
    console.error('\n=== EXTRACTION ERROR ===');
    console.error('Error details:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    errorProgress(progressId, errorMessage);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.issues,
          progressId,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: errorMessage,
        progressId,
      },
      { status: 500 }
    );
  }
}
