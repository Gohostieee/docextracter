import TurndownService from 'turndown';

export class DocumentCrawler {
  constructor(stagehandPage) {
    this.page = stagehandPage;
    this.turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      strongDelimiter: '**',
      emDelimiter: '_'
    });

    // Configure turndown to handle common HTML elements better
    this.turndownService.addRule('removeScripts', {
      filter: ['script', 'style', 'noscript'],
      replacement: () => ''
    });

    this.turndownService.addRule('cleanNav', {
      filter: (node) => {
        return node.classList && (
          node.classList.contains('nav') ||
          node.classList.contains('navbar') ||
          node.classList.contains('sidebar') ||
          node.classList.contains('header') ||
          node.classList.contains('footer')
        );
      },
      replacement: () => ''
    });
  }

  async crawlPage(url, options = {}) {
    const {
      timeout = 45000, // Increased timeout
      maxRetries = 3, // Increased retries
      waitForSelector = null
    } = options;

    let retries = 0;

    while (retries <= maxRetries) {
      try {
        console.log(`Crawling page: ${url} (attempt ${retries + 1})`);

        // Add longer delay between retries
        if (retries > 0) {
          const delay = Math.min(5000 * retries, 15000); // Exponential backoff up to 15s
          console.log(`Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        await this.page.goto(url, {
          timeout,
          waitUntil: 'domcontentloaded' // Less strict wait condition
        });

        // Try multiple wait strategies
        try {
          await this.page.waitForLoadState('networkidle', { timeout: 10000 });
        } catch (e) {
          console.log(`NetworkIdle failed for ${url}, trying domcontentloaded...`);
          await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 });
        }

        // Wait for specific selector if provided
        if (waitForSelector) {
          await this.page.waitForSelector(waitForSelector, { timeout: 10000 });
        }

        // Get the page content
        const htmlContent = await this.page.content();

        // Validate content
        if (!htmlContent || htmlContent.length < 100) {
          throw new Error('Page content too short or empty');
        }

        // Convert to markdown
        const markdown = this.turndownService.turndown(htmlContent);

        // Get page title
        const title = await this.page.title().catch(() => 'Untitled');

        // Get meta description if available
        const metaDescription = await this.page.evaluate(() => {
          const meta = document.querySelector('meta[name="description"]');
          return meta ? meta.getAttribute('content') : null;
        }).catch(() => null);

        console.log(`Successfully crawled ${url}`);

        return {
          url,
          title,
          metaDescription,
          markdown: this.cleanMarkdown(markdown),
          timestamp: new Date().toISOString(),
          success: true
        };

      } catch (error) {
        retries++;
        const errorType = this.categorizeError(error);
        console.error(`Error crawling ${url} (attempt ${retries}) [${errorType}]:`, error.message);

        if (retries > maxRetries) {
          return {
            url,
            title: 'Failed to Load',
            metaDescription: null,
            markdown: '',
            timestamp: new Date().toISOString(),
            success: false,
            error: `${errorType}: ${error.message}`,
            errorType
          };
        }

        // Skip retry for certain unrecoverable errors
        if (errorType === 'INVALID_URL' || errorType === 'BLOCKED') {
          console.log(`Skipping retries for ${url} due to ${errorType}`);
          break;
        }
      }
    }
  }

  categorizeError(error) {
    const message = error.message.toLowerCase();

    if (message.includes('net::err_aborted')) return 'ABORTED';
    if (message.includes('net::err_blocked')) return 'BLOCKED';
    if (message.includes('net::err_connection')) return 'CONNECTION';
    if (message.includes('net::err_timeout')) return 'TIMEOUT';
    if (message.includes('navigation')) return 'NAVIGATION';
    if (message.includes('invalid url')) return 'INVALID_URL';
    if (message.includes('parse')) return 'PARSE_ERROR';
    if (message.includes('proxy')) return 'PROXY_ERROR';

    return 'UNKNOWN';
  }

  async crawlMultiplePages(urls, options = {}) {
    const {
      maxConcurrent = 2, // Reduced concurrency to be less aggressive
      delayBetweenPages = 3000, // Increased delay between pages
      onProgress = null
    } = options;

    const results = [];
    const totalPages = urls.length;
    let completedPages = 0;

    // Process URLs in batches to avoid overwhelming the target server
    for (let i = 0; i < urls.length; i += maxConcurrent) {
      const batch = urls.slice(i, i + maxConcurrent);

      const batchPromises = batch.map(async (url) => {
        const result = await this.crawlPage(url, options);
        completedPages++;

        if (onProgress) {
          onProgress({
            completed: completedPages,
            total: totalPages,
            current: url,
            success: result.success
          });
        }

        return result;
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Add delay between batches to be respectful to the target server
      if (i + maxConcurrent < urls.length && delayBetweenPages > 0) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenPages));
      }
    }

    return {
      pages: results,
      summary: {
        total: totalPages,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        completedAt: new Date().toISOString()
      }
    };
  }

  cleanMarkdown(markdown) {
    // Remove excessive whitespace and clean up the markdown
    return markdown
      .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
      .replace(/[ \t]+$/gm, '') // Remove trailing whitespace
      .replace(/^\s+|\s+$/g, '') // Trim start and end
      .replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, '') // Remove complex image links
      .replace(/!\[.*?\]\(data:.*?\)/g, '') // Remove base64 images
      .slice(0, 50000); // Limit content length for AI processing
  }

  getProcessingStats(results) {
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    return {
      total: results.length,
      successful: successful.length,
      failed: failed.length,
      successRate: `${((successful.length / results.length) * 100).toFixed(1)}%`,
      totalContentLength: successful.reduce((sum, r) => sum + r.markdown.length, 0),
      averageContentLength: successful.length > 0
        ? Math.round(successful.reduce((sum, r) => sum + r.markdown.length, 0) / successful.length)
        : 0
    };
  }
}