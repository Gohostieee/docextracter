import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiSummarizer {
  constructor() {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY environment variable is required');
    }

    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.0,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 512,
      }
    });
  }

  async summarizePage(pageData) {
    const { url, title, markdown, metaDescription } = pageData;

    try {
      const prompt = this.buildSummarizationPrompt(title, markdown, metaDescription, url);

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const summary = response.text();

      return {
        url,
        title,
        summary: summary.trim(),
        wordCount: this.countWords(markdown),
        summaryWordCount: this.countWords(summary),
        timestamp: new Date().toISOString(),
        success: true
      };

    } catch (error) {
      console.error(`Error summarizing ${url}:`, error.message);

      return {
        url,
        title,
        summary: `Failed to generate summary: ${error.message}`,
        wordCount: this.countWords(markdown),
        summaryWordCount: 0,
        timestamp: new Date().toISOString(),
        success: false,
        error: error.message
      };
    }
  }

  async summarizeMultiplePages(pages, options = {}) {
    const {
      maxConcurrent = 2, // Lower concurrency for API rate limits
      delayBetweenRequests = 1000,
      onProgress = null
    } = options;

    const summaries = [];
    const totalPages = pages.length;
    let completedPages = 0;

    // Process pages in small batches to respect API rate limits
    for (let i = 0; i < pages.length; i += maxConcurrent) {
      const batch = pages.slice(i, i + maxConcurrent);

      const batchPromises = batch.map(async (page) => {
        const summary = await this.summarizePage(page);
        completedPages++;

        if (onProgress) {
          onProgress({
            completed: completedPages,
            total: totalPages,
            current: page.url,
            success: summary.success
          });
        }

        return summary;
      });

      const batchSummaries = await Promise.all(batchPromises);
      summaries.push(...batchSummaries);

      // Add delay between batches to respect API rate limits
      if (i + maxConcurrent < pages.length && delayBetweenRequests > 0) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
      }
    }

    return {
      summaries,
      stats: this.generateSummaryStats(summaries)
    };
  }

  async generateMasterSummary(summaries, originalQuery) {
    try {
      const prompt = this.buildMasterSummaryPrompt(summaries, originalQuery);

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const masterSummary = response.text();

      return {
        masterSummary: masterSummary.trim(),
        timestamp: new Date().toISOString(),
        success: true
      };

    } catch (error) {
      console.error('Error generating master summary:', error.message);

      return {
        masterSummary: `Failed to generate master summary: ${error.message}`,
        timestamp: new Date().toISOString(),
        success: false,
        error: error.message
      };
    }
  }

  buildSummarizationPrompt(title, markdown, metaDescription, url) {
    return `You are creating a concise reference summary for AI systems to quickly understand page contents and know where to look for specific information.

**Page Information:**
- Title: ${title}
- URL: ${url}
- Meta Description: ${metaDescription || 'Not provided'}

**Content to Summarize:**
${markdown}

**Instructions:**
Create a brief, structured summary (2-4 sentences max) that answers:
1. **What is this page about?** (main topic/purpose)
2. **What key information does it contain?** (APIs, configs, examples, concepts)
3. **When would someone need this page?** (use cases, problems it solves)

Focus on being concise and descriptive so an AI can quickly determine if this page contains relevant information for a specific query.

**Concise Summary:**`;
  }

  buildMasterSummaryPrompt(summaries, originalQuery) {
    const successfulSummaries = summaries.filter(s => s.success);
    const summaryText = successfulSummaries
      .map(s => `• **${s.title}** (${s.url}): ${s.summary}`)
      .join('\n');

    return `Create a concise overview of this documentation set for AI reference purposes.

**Original Query:** ${originalQuery}

**Page Summaries:**
${summaryText}

**Instructions:**
Create a brief master summary (3-5 sentences) that covers:
1. **What this documentation covers** (main product/service/topic)
2. **Key areas/categories** (APIs, guides, configuration, etc.)
3. **Primary use cases** (who uses this and for what)
4. **Getting started path** (where beginners should look first)

Keep it concise - this will help AI systems quickly understand the scope and organization of the documentation.

**Master Overview:**`;
  }

  countWords(text) {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  generateSummaryStats(summaries) {
    const successful = summaries.filter(s => s.success);
    const failed = summaries.filter(s => !s.success);

    const totalWords = successful.reduce((sum, s) => sum + s.wordCount, 0);
    const totalSummaryWords = successful.reduce((sum, s) => sum + s.summaryWordCount, 0);

    return {
      total: summaries.length,
      successful: successful.length,
      failed: failed.length,
      successRate: `${((successful.length / summaries.length) * 100).toFixed(1)}%`,
      totalContentWords: totalWords,
      totalSummaryWords: totalSummaryWords,
      averageCompressionRatio: totalWords > 0
        ? `${((totalSummaryWords / totalWords) * 100).toFixed(1)}%`
        : '0%',
      averageWordsPerPage: successful.length > 0
        ? Math.round(totalWords / successful.length)
        : 0,
      averageSummaryLength: successful.length > 0
        ? Math.round(totalSummaryWords / successful.length)
        : 0
    };
  }
}