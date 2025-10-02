import { z } from 'zod';
import { initStagehand } from '../utils/stagehand.js';
import { CrawleeUrlExtractor } from '../utils/crawleeExtractor.js';
import { DocumentCrawler } from '../utils/crawler.js';
import { GeminiSummarizer } from '../utils/gemini.js';
import { DocumentCompiler } from '../utils/documentCompiler.js';

// Define the request schema
const extractSchema = z.object({
  url: z.string().url('Invalid URL format'),
  guide: z.string().min(1, 'Guide is required'),
});

// Define the enhanced request schema for crawling
const extractAndCrawlSchema = z.object({
  url: z.string().url('Invalid URL format'),
  guide: z.string().min(1, 'Guide is required'),
  crawlPages: z.boolean().default(false),
  maxPages: z.number().min(1).max(100).default(25),
  includeExternalLinks: z.boolean().default(false),
  maxConcurrentCrawls: z.number().min(1).max(5).default(3),
  crawlTimeout: z.number().min(5000).max(60000).default(30000)
});

export default async function extractRoutes(fastify, options) {
  // Extract route using Crawlee
  fastify.post('/extract', async (request, reply) => {
    const extractor = new CrawleeUrlExtractor();

    try {
      // Validate the request data
      const validatedData = extractSchema.parse(request.body);

      console.log(`Extracting URLs from ${validatedData.url} using Crawlee...`);

      // Use Crawlee for URL extraction
      const result = await extractor.extractUrls(validatedData.url, validatedData.guide, {
        maxUrls: 100,
        includeExternalLinks: true, // Include all links for flexibility
        timeout: 30000
      });

      if (!result.success) {
        return reply.status(500).send({
          success: false,
          error: result.error || 'Failed to extract URLs',
        });
      }

      return reply.send({
        extractedData: result.extractedData,
        reasoning: result.reasoning,
        totalFound: result.totalFound,
        success: true
      });

    } catch (error) {
      console.error('Crawlee extraction error:', error);

      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          success: false,
          error: 'Validation error',
          details: error.issues,
        });
      }

      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      });
    } finally {
      // Cleanup Crawlee resources
      await extractor.cleanup();
    }
  });

  // New enhanced route with crawling and summarization
  fastify.post('/extract-and-crawl', async (request, reply) => {
    const startTime = Date.now();
    let stagehand, crawler, summarizer, compiler, extractor;

    try {
      // Validate the request data
      const validatedData = extractAndCrawlSchema.parse(request.body);

      // Step 1: Extract URLs using Crawlee
      console.log('Step 1: Extracting URLs with Crawlee...');
      extractor = new CrawleeUrlExtractor();

      const extractionResult = await extractor.extractUrls(validatedData.url, validatedData.guide, {
        maxUrls: validatedData.maxPages * 2, // Get more URLs than needed for filtering
        includeExternalLinks: validatedData.includeExternalLinks,
        timeout: 30000
      });

      if (!extractionResult.success) {
        throw new Error(`URL extraction failed: ${extractionResult.error}`);
      }

      console.log(`Extracted ${extractionResult.extractedData?.length || 0} URLs`);

      // Clean up Crawlee resources early
      await extractor.cleanup();
      extractor = null;

      // If crawling is not requested, return just the URLs
      if (!validatedData.crawlPages || !extractionResult.extractedData?.length) {
        return reply.send({
          extractedUrls: extractionResult.extractedData || [],
          reasoning: extractionResult.reasoning || 'No reasoning provided',
          crawlResults: null,
          processingTime: `${((Date.now() - startTime) / 1000).toFixed(1)}s`
        });
      }

      // Initialize Stagehand for page crawling
      stagehand = await initStagehand();
      const page = stagehand.page;

      // Step 2: Filter and limit URLs
      let urlsToProcess = extractionResult.extractedData.slice(0, validatedData.maxPages);

      // Filter out problematic URLs
      urlsToProcess = urlsToProcess.filter(url => {
        try {
          const urlObj = new URL(url);

          // Filter out fragment-only URLs (anchors on same page)
          if (urlObj.hash && !urlObj.pathname.endsWith('/') && urlObj.pathname !== '/') {
            return false;
          }

          // Filter out URLs with just fragments and no meaningful path
          if (urlObj.hash && urlObj.pathname === '/' && urlObj.search === '') {
            return false;
          }

          // Filter out external links if not included
          if (!validatedData.includeExternalLinks) {
            const baseOrigin = new URL(validatedData.url).origin;
            return urlObj.origin === baseOrigin;
          }

          return true;
        } catch {
          return false;
        }
      });

      console.log(`Step 2: Processing ${urlsToProcess.length} URLs...`);

      // Step 3: Crawl pages
      crawler = new DocumentCrawler(page);

      const crawlResults = await crawler.crawlMultiplePages(urlsToProcess, {
        maxConcurrent: Math.min(validatedData.maxConcurrentCrawls, 2), // Cap at 2 for stability
        delayBetweenPages: 3000, // 3 second delay between pages
        timeout: validatedData.crawlTimeout,
        onProgress: (progress) => {
          console.log(`Crawling progress: ${progress.completed}/${progress.total} - ${progress.current} (${progress.success ? 'SUCCESS' : 'FAILED'})`);
        }
      });

      console.log(`Step 3: Crawled ${crawlResults.summary.successful}/${crawlResults.summary.total} pages`);

      // Step 4: Generate summaries
      summarizer = new GeminiSummarizer();

      const summariesResult = await summarizer.summarizeMultiplePages(
        crawlResults.pages.filter(p => p.success),
        {
          onProgress: (progress) => {
            console.log(`Summarization progress: ${progress.completed}/${progress.total}`);
          }
        }
      );

      console.log(`Step 4: Generated ${summariesResult.summaries.filter(s => s.success).length} summaries`);

      // Step 5: Generate master summary
      const masterSummary = await summarizer.generateMasterSummary(
        summariesResult.summaries.filter(s => s.success),
        validatedData.guide
      );

      console.log('Step 5: Generated master summary');

      // Step 6: Compile documentation into zip
      compiler = new DocumentCompiler();

      const compilationResult = await compiler.compileDocumentationZip(
        crawlResults,
        summariesResult,
        masterSummary,
        {
          originalQuery: validatedData.guide,
          sourceUrl: validatedData.url,
          generatedAt: new Date().toISOString()
        }
      );

      console.log('Step 6: Compiled documentation zip');

      // Cleanup
      await page.close();
      await stagehand.close();

      const processingTime = `${((Date.now() - startTime) / 1000).toFixed(1)}s`;

      if (!compilationResult.success) {
        return reply.status(500).send({
          success: false,
          error: 'Failed to compile documentation zip',
          processingTime
        });
      }

      // Set headers for file download
      reply.header('Content-Type', 'application/zip');
      reply.header('Content-Disposition', `attachment; filename="${compilationResult.zipFilename}"`);
      reply.header('Content-Length', compilationResult.zipBuffer.length);

      // Add custom headers with processing information
      reply.header('X-Processing-Time', processingTime);
      reply.header('X-Total-Pages', crawlResults.summary.total.toString());
      reply.header('X-Successful-Pages', crawlResults.summary.successful.toString());
      reply.header('X-Total-Summaries', summariesResult.stats.successful.toString());

      return reply.send(compilationResult.zipBuffer);

    } catch (error) {
      console.error('Extract and crawl error:', error);

      // Cleanup on error
      try { if (stagehand) await stagehand.close(); } catch (e) {}
      try { if (extractor) await extractor.cleanup(); } catch (e) {}

      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          success: false,
          error: 'Validation error',
          details: error.issues,
        });
      }

      return reply.status(500).send({
        success: false,
        error: error.message || 'Internal server error',
        processingTime: `${((Date.now() - startTime) / 1000).toFixed(1)}s`
      });
    }
  });
}