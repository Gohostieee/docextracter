import { PlaywrightCrawler, Dataset } from 'crawlee';
import { chromium } from 'playwright';

export class CrawleeUrlExtractor {
  constructor() {
    this.crawler = null;
    this.extractedUrls = [];
  }

  async extractUrls(targetUrl, guide, options = {}) {
    const {
      maxUrls = 100,
      includeExternalLinks = false,
      timeout = 30000
    } = options;

    this.extractedUrls = [];
    const baseOrigin = new URL(targetUrl).origin;

    try {
      // Create a new dataset for this extraction
      const dataset = await Dataset.open();

      this.crawler = new PlaywrightCrawler({
        launchContext: {
          launcher: chromium,
          launchOptions: {
            headless: true,
            timeout: timeout
          }
        },
        browserPoolOptions: {
          useFingerprints: false,
          preLaunchHooks: [
            async (pageId, launchContext) => {
              // Add user agent and headers
              launchContext.launchOptions.args = [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-web-security',
                '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
              ];
            }
          ]
        },
        requestHandlerTimeoutSecs: Math.ceil(timeout / 1000),
        maxRequestsPerCrawl: 1, // Only crawl the target page
        async requestHandler({ page, request, log }) {
          log.info(`Processing ${request.loadedUrl}`);

          try {
            // Wait for page to load
            await page.waitForLoadState('networkidle', { timeout: 10000 });

            // Extract all links from the page
            const links = await page.evaluate((guide) => {
              const allLinks = Array.from(document.querySelectorAll('a[href]'));

              return allLinks.map(link => ({
                href: link.href,
                text: link.textContent?.trim() || '',
                title: link.title || '',
                ariaLabel: link.getAttribute('aria-label') || ''
              })).filter(link => {
                // Basic filtering - exclude common non-content links
                const href = link.href.toLowerCase();
                const text = link.text.toLowerCase();

                // Skip common non-content links
                if (href.includes('javascript:') ||
                    href.includes('mailto:') ||
                    href.includes('tel:') ||
                    href.startsWith('#') ||
                    text.includes('skip to') ||
                    text.includes('back to top')) {
                  return false;
                }

                return true;
              });
            }, guide);

            // Process and filter links
            const processedLinks = this.processLinks(links, baseOrigin, includeExternalLinks, guide);

            // Store results
            await dataset.pushData({
              url: request.loadedUrl,
              guide,
              extractedUrls: processedLinks.slice(0, maxUrls),
              totalFound: processedLinks.length,
              reasoning: this.generateReasoning(processedLinks, guide, maxUrls),
              timestamp: new Date().toISOString()
            });

            log.info(`Extracted ${processedLinks.length} URLs`);

          } catch (error) {
            log.error(`Error processing page: ${error.message}`);
            throw error;
          }
        },
        failedRequestHandler({ request, log }) {
          log.error(`Failed to process ${request.url}: ${request.errorMessages}`);
        }
      });

      // Run the crawler
      await this.crawler.run([targetUrl]);

      // Get results from dataset
      const results = await dataset.getData();

      if (results.items.length === 0) {
        throw new Error('No data extracted from the page');
      }

      const result = results.items[0];

      return {
        extractedData: result.extractedUrls,
        reasoning: result.reasoning,
        totalFound: result.totalFound,
        success: true
      };

    } catch (error) {
      console.error('Crawlee extraction error:', error);
      return {
        extractedData: [],
        reasoning: `Failed to extract URLs: ${error.message}`,
        totalFound: 0,
        success: false,
        error: error.message
      };
    } finally {
      if (this.crawler) {
        await this.crawler.teardown();
      }
    }
  }

  processLinks(links, baseOrigin, includeExternalLinks, guide) {
    const uniqueUrls = new Set();
    const processedLinks = [];

    for (const link of links) {
      try {
        const url = new URL(link.href);

        // Remove fragments for deduplication
        const urlWithoutFragment = `${url.origin}${url.pathname}${url.search}`;

        if (uniqueUrls.has(urlWithoutFragment)) {
          continue;
        }

        // Filter external links if not included
        if (!includeExternalLinks && url.origin !== baseOrigin) {
          continue;
        }

        // Skip obviously non-content URLs
        if (this.isNonContentUrl(url, link)) {
          continue;
        }

        uniqueUrls.add(urlWithoutFragment);
        // Store URL without fragment to avoid duplicates
        processedLinks.push(urlWithoutFragment);

      } catch (error) {
        // Skip invalid URLs
        continue;
      }
    }

    return processedLinks;
  }

  isNonContentUrl(url, link) {
    const pathname = url.pathname.toLowerCase();
    const text = link.text.toLowerCase();

    // Skip common non-content paths
    const skipPatterns = [
      '/login', '/register', '/signup', '/signin',
      '/logout', '/admin', '/api/',
      '/favicon', '/robots.txt', '/sitemap',
      '.pdf', '.jpg', '.png', '.gif', '.svg',
      '.zip', '.tar', '.gz'
    ];

    if (skipPatterns.some(pattern => pathname.includes(pattern))) {
      return true;
    }

    // Skip common non-content link text
    const skipTexts = [
      'edit', 'delete', 'login', 'logout', 'sign in', 'sign up',
      'subscribe', 'unsubscribe', 'privacy', 'terms',
      'cookie', 'legal', 'contact', 'about'
    ];

    if (skipTexts.some(skipText => text.includes(skipText))) {
      return true;
    }

    return false;
  }

  generateReasoning(extractedUrls, guide, maxUrls) {
    const total = extractedUrls.length;
    const limited = Math.min(total, maxUrls);

    let reasoning = `Found ${total} relevant URLs on the page`;

    if (guide.toLowerCase().includes('documentation') || guide.toLowerCase().includes('docs')) {
      reasoning += ' that appear to be documentation-related';
    } else if (guide.toLowerCase().includes('api')) {
      reasoning += ' that appear to be API-related';
    } else if (guide.toLowerCase().includes('guide')) {
      reasoning += ' that appear to be guides or tutorials';
    } else {
      reasoning += ' matching the extraction criteria';
    }

    if (limited < total) {
      reasoning += `. Limited to ${limited} URLs as requested.`;
    } else {
      reasoning += '.';
    }

    reasoning += ' URLs were filtered to exclude login pages, media files, and other non-content links.';

    return reasoning;
  }

  async cleanup() {
    if (this.crawler) {
      await this.crawler.teardown();
      this.crawler = null;
    }
  }
}