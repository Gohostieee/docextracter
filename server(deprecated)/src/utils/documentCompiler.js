import { promises as fs } from 'fs';
import path from 'path';
import archiver from 'archiver';

export class DocumentCompiler {
  constructor() {
    this.outputDir = path.join(process.cwd(), 'generated');
    this.ensureOutputDirectory();
  }

  async ensureOutputDirectory() {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
    } catch (error) {
      console.error('Error creating output directory:', error);
    }
  }

  async compileDocumentationZip(crawlResults, summaries, masterSummary, metadata = {}) {
    const {
      originalQuery = 'Documentation extraction',
      sourceUrl = 'Unknown',
      generatedAt = new Date().toISOString()
    } = metadata;

    try {
      // Generate the master document
      const masterDoc = this.buildMasterDocument(
        crawlResults,
        summaries,
        masterSummary,
        { originalQuery, sourceUrl, generatedAt }
      );

      // Generate individual page documents in memory
      const individualDocs = this.generateIndividualDocsInMemory(crawlResults.pages, summaries);

      // Generate JSON data file content
      const dataFileContent = this.generateDataFileContent(crawlResults, summaries, masterSummary);

      // Create zip buffer in memory
      const zipBuffer = await this.createZipBuffer(masterDoc, individualDocs, dataFileContent, metadata);

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const zipFilename = `documentation-${timestamp}.zip`;

      return {
        zipBuffer,
        zipFilename,
        stats: this.generateCompilationStats(crawlResults, summaries, masterDoc),
        files: {
          masterDocument: 'documentation-summary.md',
          individualFiles: individualDocs.length,
          dataFile: 'documentation-data.json'
        },
        success: true
      };

    } catch (error) {
      console.error('Error compiling documentation zip:', error);
      return {
        error: error.message,
        success: false
      };
    }
  }

  buildMasterDocument(crawlResults, summaries, masterSummary, metadata) {
    const { originalQuery, sourceUrl, generatedAt } = metadata;
    const successfulSummaries = summaries.summaries.filter(s => s.success);

    const doc = [];

    // Header
    doc.push('# Documentation Summary Report');
    doc.push('');
    doc.push(`**Generated:** ${new Date(generatedAt).toLocaleString()}`);
    doc.push(`**Source:** ${sourceUrl}`);
    doc.push(`**Original Query:** ${originalQuery}`);
    doc.push(`**Pages Processed:** ${crawlResults.summary.total} (${crawlResults.summary.successful} successful)`);
    doc.push(`**Summaries Generated:** ${summaries.summaries.length} (${successfulSummaries.length} successful)`);
    doc.push('');
    doc.push('---');
    doc.push('');

    // Table of Contents
    doc.push('## Table of Contents');
    doc.push('');
    doc.push('1. [Executive Summary](#executive-summary)');
    doc.push('2. [Processing Statistics](#processing-statistics)');
    doc.push('3. [Individual Page Summaries](#individual-page-summaries)');
    doc.push('4. [Failed Pages](#failed-pages)');
    doc.push('5. [Raw Data](#raw-data)');
    doc.push('');
    doc.push('---');
    doc.push('');

    // Executive Summary (from Gemini master summary)
    doc.push('## Executive Summary');
    doc.push('');
    if (masterSummary.success) {
      doc.push(masterSummary.masterSummary);
    } else {
      doc.push('*Failed to generate executive summary. See individual page summaries below.*');
    }
    doc.push('');
    doc.push('---');
    doc.push('');

    // Processing Statistics
    doc.push('## Processing Statistics');
    doc.push('');
    doc.push('### Crawling Results');
    doc.push(`- **Total URLs:** ${crawlResults.summary.total}`);
    doc.push(`- **Successfully Crawled:** ${crawlResults.summary.successful}`);
    doc.push(`- **Failed:** ${crawlResults.summary.failed}`);
    doc.push(`- **Success Rate:** ${((crawlResults.summary.successful / crawlResults.summary.total) * 100).toFixed(1)}%`);
    doc.push('');

    doc.push('### Summarization Results');
    doc.push(`- **Total Summaries:** ${summaries.stats.total}`);
    doc.push(`- **Successful Summaries:** ${summaries.stats.successful}`);
    doc.push(`- **Failed Summaries:** ${summaries.stats.failed}`);
    doc.push(`- **Success Rate:** ${summaries.stats.successRate}`);
    doc.push(`- **Average Content Length:** ${summaries.stats.averageWordsPerPage} words`);
    doc.push(`- **Average Summary Length:** ${summaries.stats.averageSummaryLength} words`);
    doc.push(`- **Compression Ratio:** ${summaries.stats.averageCompressionRatio}`);
    doc.push('');
    doc.push('---');
    doc.push('');

    // Individual Page Summaries
    doc.push('## Individual Page Summaries');
    doc.push('');

    successfulSummaries.forEach((summary, index) => {
      doc.push(`### ${index + 1}. ${summary.title}`);
      doc.push('');
      doc.push(`**URL:** [${summary.url}](${summary.url})`);
      doc.push(`**Word Count:** ${summary.wordCount} words`);
      doc.push(`**Summary Length:** ${summary.summaryWordCount} words`);
      doc.push('');
      doc.push(summary.summary);
      doc.push('');
      doc.push('---');
      doc.push('');
    });

    // Failed Pages
    const failedPages = crawlResults.pages.filter(p => !p.success);
    const failedSummaries = summaries.summaries.filter(s => !s.success);

    if (failedPages.length > 0 || failedSummaries.length > 0) {
      doc.push('## Failed Pages');
      doc.push('');

      if (failedPages.length > 0) {
        doc.push('### Crawling Failures');
        doc.push('');

        // Group failures by error type
        const errorGroups = {};
        failedPages.forEach(page => {
          const errorType = page.errorType || 'UNKNOWN';
          if (!errorGroups[errorType]) errorGroups[errorType] = [];
          errorGroups[errorType].push(page);
        });

        Object.entries(errorGroups).forEach(([errorType, pages]) => {
          doc.push(`#### ${errorType} Errors (${pages.length})`);
          doc.push('');
          pages.forEach((page, index) => {
            doc.push(`${index + 1}. **${page.url}**`);
            doc.push(`   - Error: ${page.error}`);
            doc.push('');
          });
        });
      }

      if (failedSummaries.length > 0) {
        doc.push('### Summarization Failures');
        doc.push('');
        failedSummaries.forEach((summary, index) => {
          doc.push(`${index + 1}. **${summary.url}**`);
          doc.push(`   - Error: ${summary.error}`);
          doc.push('');
        });
      }

      doc.push('---');
      doc.push('');
    }

    // Raw Data Section
    doc.push('## Raw Data');
    doc.push('');
    doc.push('### Successfully Crawled URLs');
    doc.push('');
    const successfulPages = crawlResults.pages.filter(p => p.success);
    successfulPages.forEach((page, index) => {
      doc.push(`${index + 1}. [${page.title}](${page.url})`);
    });
    doc.push('');

    // Footer
    doc.push('---');
    doc.push('');
    doc.push('*This documentation summary was automatically generated using Stagehand for web crawling, Turndown for HTML-to-Markdown conversion, and Google Gemini for AI summarization.*');

    return doc.join('\n');
  }

  generateIndividualDocsInMemory(pages, summaries) {
    const successfulPages = pages.filter(p => p.success);
    const docs = [];

    for (const page of successfulPages) {
      try {
        const summary = summaries.summaries.find(s => s.url === page.url);
        const filename = this.sanitizeFilename(`${page.title}.md`);
        const content = this.buildIndividualPageDocument(page, summary);

        docs.push({
          filename,
          content,
          title: page.title,
          url: page.url
        });
      } catch (error) {
        console.error(`Error generating individual doc for ${page.url}:`, error);
      }
    }

    return docs;
  }

  generateDataFileContent(crawlResults, summaries, masterSummary) {
    const data = {
      metadata: {
        generatedAt: new Date().toISOString(),
        version: '1.0.0',
        processor: 'docextracter'
      },
      crawlResults,
      summaries,
      masterSummary
    };

    return JSON.stringify(data, null, 2);
  }

  async createZipBuffer(masterDoc, individualDocs, dataFileContent, metadata) {
    return new Promise((resolve, reject) => {
      const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level
      });

      const buffers = [];

      archive.on('data', (chunk) => {
        buffers.push(chunk);
      });

      archive.on('error', (err) => {
        reject(err);
      });

      archive.on('end', () => {
        const zipBuffer = Buffer.concat(buffers);
        resolve(zipBuffer);
      });

      // Add master document
      archive.append(masterDoc, { name: 'documentation-summary.md' });

      // Add individual page documents
      if (individualDocs && individualDocs.length > 0) {
        individualDocs.forEach(doc => {
          archive.append(doc.content, { name: `pages/${doc.filename}` });
        });
      }

      // Add data file
      archive.append(dataFileContent, { name: 'documentation-data.json' });

      // Add README with instructions
      const readmeContent = this.generateReadmeContent(metadata);
      archive.append(readmeContent, { name: 'README.md' });

      archive.finalize();
    });
  }

  generateReadmeContent(metadata) {
    const { originalQuery, sourceUrl, generatedAt } = metadata;

    return `# Documentation Summary Package

This zip file contains automatically generated documentation summaries.

## Contents

- **documentation-summary.md** - Master summary with overview and all page summaries
- **pages/** - Individual page summaries (markdown format)
- **documentation-data.json** - Raw data in JSON format for further processing
- **README.md** - This file

## Generation Details

- **Source URL:** ${sourceUrl}
- **Original Query:** ${originalQuery}
- **Generated:** ${new Date(generatedAt).toLocaleString()}
- **Processor:** DocExtracter v1.0.0

## How to Use

1. Start with **documentation-summary.md** for the complete overview
2. Browse **pages/** folder for detailed individual page summaries
3. Use **documentation-data.json** for programmatic access to all data

Generated with [DocExtracter](https://github.com/your-repo/docextracter) using Stagehand + Google Gemini AI.
`;
  }

  buildIndividualPageDocument(page, summary) {
    const doc = [];

    doc.push(`# ${page.title}`);
    doc.push('');
    doc.push(`**URL:** [${page.url}](${page.url})`);
    doc.push(`**Crawled:** ${new Date(page.timestamp).toLocaleString()}`);

    if (page.metaDescription) {
      doc.push(`**Description:** ${page.metaDescription}`);
    }

    doc.push('');
    doc.push('---');
    doc.push('');

    if (summary && summary.success) {
      doc.push('## AI Summary');
      doc.push('');
      doc.push(summary.summary);
      doc.push('');
      doc.push('---');
      doc.push('');
    }

    doc.push('## Full Content');
    doc.push('');
    doc.push(page.markdown);

    return doc.join('\n');
  }

  sanitizeFilename(filename) {
    return filename
      .replace(/[<>:"/\\|?*]/g, '-')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 100);
  }

  generateCompilationStats(crawlResults, summaries, masterDoc) {
    return {
      totalPages: crawlResults.summary.total,
      successfulPages: crawlResults.summary.successful,
      failedPages: crawlResults.summary.failed,
      totalSummaries: summaries.summaries.length,
      successfulSummaries: summaries.summaries.filter(s => s.success).length,
      masterDocumentSize: masterDoc.length,
      masterDocumentWordCount: masterDoc.split(/\s+/).filter(word => word.length > 0).length,
      totalProcessingTime: crawlResults.summary.completedAt,
      compressionAchieved: summaries.stats.averageCompressionRatio
    };
  }

  async listGeneratedFiles() {
    try {
      const files = await fs.readdir(this.outputDir);
      const fileStats = await Promise.all(
        files.map(async (file) => {
          const filepath = path.join(this.outputDir, file);
          const stats = await fs.stat(filepath);
          return {
            name: file,
            path: filepath,
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime
          };
        })
      );

      return fileStats.sort((a, b) => b.created - a.created);
    } catch (error) {
      console.error('Error listing generated files:', error);
      return [];
    }
  }
}