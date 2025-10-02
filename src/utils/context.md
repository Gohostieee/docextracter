# Context – src/utils

This folder contains utility functions and integrations for the application.

## Utilities

### browserbase/
Browserbase integration for remote browser automation.
- Uses Playwright with Browserbase cloud service
- Provides `initBrowser()` and `initStagehand()` functions
- Used when JSR flag is false/omitted and fallback is needed

### puppeteer/
Local Puppeteer integration for JavaScript-rendered platforms.
- `initPuppeteer()`: Initialize local Puppeteer browser instance
- `extractLinksWithPuppeteer()`: Extract links from a page using Puppeteer
- `fetchHTMLWithPuppeteer()`: Fetch fully-rendered HTML using Puppeteer
- Used when JSR flag is true in extraction requests

### crawlee.ts
Crawlee integration for web scraping (if used).

## When to Use Each Browser Tool

**Use Puppeteer (local):**
- When `jsr: true` flag is passed
- For JavaScript-heavy sites that require full rendering
- When you have control over the execution environment
- Cost-effective for high-volume extractions

**Use Browserbase (remote):**
- When `jsr: false` or omitted
- As fallback when simple HTTP fetch fails
- When you need cloud-based browser automation
- For sites that may require complex browser environments


