// Use dynamic imports to follow Vercel's Puppeteer guidance and avoid bundling heavy deps
// Types are referenced from puppeteer-core to keep compile-time safety without forcing runtime imports
import type { Browser, Page } from 'puppeteer-core';

/**
 * Initialize a local Puppeteer browser instance
 * Used when JSR (JavaScript Render) flag is true
 * Works in both local and serverless (Vercel) environments
 */
export async function initPuppeteer(): Promise<Browser> {
  const isServerless = Boolean(
    process.env.VERCEL_ENV || process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
  );

  try {
    if (isServerless) {
      // Serverless (Vercel): puppeteer-core + @sparticuz/chromium per official guide
      // Ref: https://vercel.com/guides/deploying-puppeteer-with-nextjs-on-vercel
      const chromium = (await import('@sparticuz/chromium')).default;
      const puppeteerCore = await import('puppeteer-core');

      const browser = await puppeteerCore.launch({
        headless: true,
        args: chromium.args,
        executablePath: await chromium.executablePath(),
      });

      console.log('Serverless Puppeteer browser launched successfully');
      return browser as unknown as Browser;
    }

    // Local dev: full puppeteer (bundled Chrome) for convenience
    const puppeteer = await import('puppeteer');
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
    });

    return browser as unknown as Browser;
  } catch (error) {
    console.error('Failed to initialize Puppeteer:', error);
    console.error('Error name:', error instanceof Error ? error.name : 'Unknown');
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    throw error;
  }
}

/**
 * Auto-scroll page to trigger lazy-loaded content
 */
async function autoScrollPage(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 500; // Scroll 500px at a time
      const timer = setInterval(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        // Stop when we've scrolled to the bottom
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          // Scroll back to top
          window.scrollTo(0, 0);
          resolve();
        }
      }, 200); // Pause 200ms between scrolls
    });
  });
}

/**
 * Wait for DOM to stabilize (no mutations for a period)
 */
async function waitForDOMStabilization(page: Page, timeout: number = 5000): Promise<void> {
  try {
    await page.evaluate((timeoutMs) => {
      return new Promise<void>((resolve) => {
        let timer: NodeJS.Timeout;
        const observer = new MutationObserver(() => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            observer.disconnect();
            resolve();
          }, 1000); // Wait 1s of no changes
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
        });

        // Fallback timeout
        setTimeout(() => {
          observer.disconnect();
          resolve();
        }, timeoutMs);
      });
    }, timeout);
  } catch (e) {
    // Timeout is fine, continue anyway
  }
}

/**
 * Force viewport rendering with extreme dimensions
 */
async function forceViewportRendering(page: Page): Promise<void> {
  // Set massive viewport to force everything into view
  await page.setViewport({
    width: 1920,
    height: 10000, // Extremely tall viewport
    deviceScaleFactor: 0.1, // Zoom way out
  });

  // Wait a bit for reflow
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
}

/**
 * Fetch a page and extract all links using Puppeteer
 */
export async function extractLinksWithPuppeteer(
  browser: Browser,
  url: string
): Promise<string[]> {
  const page = await browser.newPage();

  try {
    // Navigate to the page
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 45000
    });

    // Wait for body to be ready
    await page.waitForSelector('body', { timeout: 10000 });

    // Try to wait for network idle
    try {
      await page.waitForNetworkIdle({ timeout: 10000, idleTime: 500 });
    } catch (e) {
      console.log(`NetworkIdle timeout for link extraction, using current state`);
    }

    // Additional wait for dynamic links
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    // Extract all links and remove hash fragments
    const links = await page.$$eval('a', (anchors) =>
      anchors.map(a => {
        try {
          const url = new URL(a.href);
          // Remove hash fragment
          url.hash = '';
          return url.href;
        } catch {
          return a.href;
        }
      })
    );

    // Deduplicate
    return [...new Set(links)];
  } finally {
    await page.close();
  }
}

/**
 * Fetch HTML content using Puppeteer with optional aggressive rendering
 *
 * Non-aggressive mode (fast): Force viewport + networkidle0 + single network idle check (~5-10s)
 * Aggressive mode (slow): Adds auto-scroll + DOM stabilization + multiple network idle attempts + extra waits (~30-60s)
 */
export async function fetchHTMLWithPuppeteer(
  browser: Browser,
  url: string,
  aggressive: boolean = false
): Promise<string> {
  const page = await browser.newPage();

  try {
    // ALWAYS: Force viewport rendering to trigger all content into view (fast, ~1s)
    await forceViewportRendering(page);

    // Navigate to the page with extended timeout and wait for networkidle
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 90000 // 90 seconds for heavy JS sites
    });

    // Wait for body to be ready
    await page.waitForSelector('body', { timeout: 15000 });

    if (aggressive) {
      // AGGRESSIVE: Auto-scroll to trigger lazy-loaded content (SLOW: ~5-10s)
      console.log(`[Aggressive] Auto-scrolling ${url}...`);
      await autoScrollPage(page);

      // Wait for DOM to stabilize after scroll (SLOW: ~1-10s)
      console.log(`[Aggressive] Waiting for DOM stabilization...`);
      await waitForDOMStabilization(page, 10000);

      // Try multiple network idle attempts with increasing timeouts (SLOW: ~15-30s)
      const idleAttempts = [5000, 10000, 15000];
      for (const timeout of idleAttempts) {
        try {
          await page.waitForNetworkIdle({ timeout, idleTime: 500 });
          console.log(`[NetworkIdle] Achieved after ${timeout}ms for ${url}`);
          break;
        } catch (e) {
          if (timeout === idleAttempts[idleAttempts.length - 1]) {
            console.log(`[NetworkIdle] Timeout for ${url}, using current state`);
          }
        }
      }

      // Final wait for any remaining dynamic content (SLOW: +3s)
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3000)));
    } else {
      // NON-AGGRESSIVE: Single short network idle check (fast, max 5s)
      try {
        await page.waitForNetworkIdle({ timeout: 5000, idleTime: 500 });
        console.log(`[NetworkIdle] Achieved for ${url}`);
      } catch (e) {
        console.log(`[NetworkIdle] Timeout for ${url}, using current state`);
      }
    }

    // Get the fully-rendered HTML
    const html = await page.content();

    // Check content length
    const contentLength = html.length;
    console.log(`[Content] Captured ${contentLength} chars from ${url} (${aggressive ? 'aggressive' : 'normal'} mode)`);

    return html;
  } finally {
    await page.close();
  }
}



