# Documentation Summary Report

**Generated:** 9/28/2025, 2:58:19 PM
**Source:** https://docs.stagehand.dev/configuration/models
**Original Query:** Find and extract all URLs that link to documentation
**Pages Processed:** 45 (38 successful)
**Summaries Generated:** 38 (10 successful)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Processing Statistics](#processing-statistics)
3. [Individual Page Summaries](#individual-page-summaries)
4. [Failed Pages](#failed-pages)
5. [Raw Data](#raw-data)

---

## Executive Summary

*Failed to generate executive summary. See individual page summaries below.*

---

## Processing Statistics

### Crawling Results
- **Total URLs:** 45
- **Successfully Crawled:** 38
- **Failed:** 7
- **Success Rate:** 84.4%

### Summarization Results
- **Total Summaries:** 38
- **Successful Summaries:** 10
- **Failed Summaries:** 28
- **Success Rate:** 26.3%
- **Average Content Length:** 558 words
- **Average Summary Length:** 251 words
- **Compression Ratio:** 45.1%

---

## Individual Page Summaries

### 1. Introducing Stagehand - 🤘 Stagehand

**URL:** [https://docs.stagehand.dev/](https://docs.stagehand.dev/)
**Word Count:** 724 words
**Summary Length:** 334 words

Of course. As a technical documentation expert, here is a comprehensive summary and analysis of the provided documentation page for Stagehand.

***

### Summary of "Introducing Stagehand"

Stagehand is a modern browser automation framework designed for developers who need to create reliable and maintainable web automations. The documentation introduces it as a solution that bridges the gap between traditional, brittle automation scripts (like those written with Playwright or Puppeteer) and unpredictable, fully autonomous AI agents. The core value proposition is combining the precision of code with the flexibility of AI-driven natural language commands, giving developers precise control over the level of automation. The target audience is developers building production-grade browser automations and AI agents that require dependable web interaction.

The framework is built around four primary primitives that allow for a composable approach to automation: `Act` (to execute actions using natural language), `Extract` (to pull structured data using schemas), `Observe` (to discover available actions on a page), and `Agent` (to automate entire workflows autonomously). The documentation provides a key code example in both TypeScript and Python to illustrate these concepts in practice:

```typescript
// Act - Execute natural language actions
await page.act("click the login button");

// Extract - Pull structured data
const { price } = await page.extract({
  schema: z.object({ price: z.number() })
});

// Observe - Discover available actions
const actions = await page.observe("find submit buttons");

// Agent - Automate entire workflows
const agent = stagehand.agent(/* ...config */);
await agent.execute("apply for this job");
```

Stagehand is built for modern development environments, offering first-class SDKs for both TypeScript and Python. A significant feature is its full compatibility with Playwright, ensuring that developers are never locked into Stagehand's abstractions and can fall back to familiar Playwright APIs when needed. It works with all Chromium-based browsers and is maintained by Browserbase, which is also recommended as the preferred cloud infrastructure for running Stagehand automations. The page concludes by directing new users to a Quickstart guide, examples, and community support channels to facilitate a fast onboarding process.

---

### 2. Introducing Stagehand - 🤘 Stagehand

**URL:** [https://docs.stagehand.dev/changelog](https://docs.stagehand.dev/changelog)
**Word Count:** 724 words
**Summary Length:** 263 words

Of course. As a technical documentation expert, here is a comprehensive summary and analysis of the provided documentation page.

***

### Summary of "Introducing Stagehand"

This documentation page introduces Stagehand, a modern browser automation framework designed for developers. The core purpose of Stagehand is to solve the fundamental problems of web automation by combining the flexibility of AI-powered natural language with the precision and reliability of traditional code. It positions itself as a solution that is neither as brittle as selector-based frameworks like Playwright, which break with UI changes, nor as unpredictable as fully autonomous AI agents. The target audience is developers who are building production-grade browser automations, web scrapers, or AI agents that require dependable web interaction.

Stagehand is built around four primary primitives that allow developers to choose their desired level of AI control: **Act** (to execute actions using natural language, e.g., `await page.act("click the login button");`), **Extract** (to pull structured data using a defined schema), **Observe** (to discover available actions on a page), and **Agent** (to automate entire workflows autonomously). The framework is designed for modern development with first-class SDKs for both TypeScript and Python, ensuring type safety and IDE support.

Key dependencies and integrations include full compatibility with Playwright, allowing developers to use its APIs alongside Stagehand without being locked in. It works with all Chromium-based browsers and is maintained by Browserbase, which is also the recommended cloud browser infrastructure for deploying Stagehand automations. The page encourages users to get started quickly by following the quickstart guide, exploring examples, or using the companion AI tool, Director.ai, to generate scripts.

---

### 3. Introducing Stagehand - 🤘 Stagehand

**URL:** [https://docs.stagehand.dev/introduction](https://docs.stagehand.dev/introduction)
**Word Count:** 724 words
**Summary Length:** 112 words

Here is a summary and analysis of the provided documentation page for Stagehand.

***

### **Summary of "Introducing Stagehand"**

Stagehand is a modern browser automation framework designed for developers seeking to create reliable and maintainable web automations. The documentation introduces it as a solution to the common dilemma between traditional, brittle automation scripts (like those in Playwright) that break with UI changes, and purely AI-driven agents that can be unpredictable and difficult to debug. Stagehand's core philosophy is to provide the "best of both worlds" by combining the flexibility of natural language commands with the precision and control of deterministic code, making web automation more adaptable and robust.

The framework is built

---

### 4. Introducing Stagehand - 🤘 Stagehand

**URL:** [https://docs.stagehand.dev/quickstart](https://docs.stagehand.dev/quickstart)
**Word Count:** 724 words
**Summary Length:** 266 words

Of course. Here is a professional summary and analysis of the provided documentation page.

***

### Summary of "Introducing Stagehand"

Stagehand is a modern browser automation framework designed to provide a reliable and maintainable way to control web browsers. The documentation introduces it as a solution to the common pitfalls of web automation, positioning it as a middle ground between traditional, brittle scripting tools like Playwright and unpredictable, fully autonomous AI web agents. The core value proposition of Stagehand is its hybrid approach, which combines the flexibility of AI and natural language with the precision and control of deterministic code. This allows developers to choose the exact level of AI intervention needed for their tasks, resulting in automations that are both robust and adaptable to UI changes.

The framework is built around four primary primitives, which are demonstrated in a clear code example for both TypeScript and Python:
*   **`Act`**: Executes actions described in natural language (e.g., `await page.act("click the login button");`).
*   **`Extract`**: Pulls structured data from a page based on a defined schema.
*   **`Observe`**: Discovers and lists available actions or elements on the current page.
*   **`Agent`**: Automates entire multi-step workflows autonomously based on a high-level goal.

This documentation is targeted at developers building production-level browser automations or AI agents that require dependable web access. Key technical features highlighted include full compatibility with the Playwright API, allowing developers to use familiar tools alongside Stagehand's abstractions. It offers first-class SDKs for TypeScript and Python and is compatible with all Chromium-based browsers. The page also notes that Stagehand is created by the team at Browser

---

### 5. Page Not Found

**URL:** [https://docs.stagehand.dev/ai-rules](https://docs.stagehand.dev/ai-rules)
**Word Count:** 239 words
**Summary Length:** 235 words

**Summary:**

This documentation page is a "404 Page Not Found" error, indicating that the content for the requested URL, `https://docs.stagehand.dev/ai-rules`, does not exist at that specific location. The primary purpose of this page is to inform the user of the broken link while providing comprehensive navigational aids to help them find the correct information and explore the Stagehand documentation. The target audience is developers or technical users who were attempting to access information about a feature likely named "AI Rules" and encountered an incorrect URL.

While the page itself contains no substantive technical content, code examples, or configuration details, its key feature is the set of recovery and discovery tools it offers. It provides three specific, algorithmically-suggested links to potentially relevant topics: "AI Rules" (pointing to the likely correct location at `/first-steps/ai-rules`), "Models," and "Browserbase MCP Server." This strongly suggests that the concept of "AI Rules" is a foundational topic within Stagehand, closely related to model configuration and server integrations.

Furthermore, the page includes the complete site navigation sidebar, which acts as a full table of contents for the Stagehand documentation. This sidebar organizes the documentation into logical sections such as "First Steps," "The Basics," "Configuration," "Best Practices," "Integrations," and a "Reference" guide for core functions like `act()`, `extract()`, `observe()`, and `agent()`. This structure allows the user to understand the overall architecture of the Stagehand library and easily navigate to any other topic of interest.

---

### 6. Page Not Found

**URL:** [https://docs.stagehand.dev/the-basics/extract](https://docs.stagehand.dev/the-basics/extract)
**Word Count:** 239 words
**Summary Length:** 278 words

Based on my analysis as a technical documentation expert, here is a summary of the provided page.

***

### **Summary**

This documentation page is a "404 Page Not Found" error, indicating that the content for the URL `.../the-basics/extract` is missing, has been moved, or the link is broken. The primary purpose of this page is to inform users, likely developers interested in the Stagehand framework, that their requested resource is unavailable. Instead of technical content, the page provides navigational aids to help users reorient themselves and find relevant information within the Stagehand documentation.

While the page itself contains no specific details, code examples, or configurations related to an `extract` feature, its structure provides significant context about the Stagehand product. The comprehensive navigation sidebar outlines the entire documentation hierarchy, revealing that `extract` is intended to be a core concept under "The Basics," alongside `act`, `observe`, and `agent`. These functions are also listed in the "Reference" section, confirming their importance to the framework. The sidebar also details other key areas such as configuration, best practices for cost and performance optimization, and integrations with tools like CrewAI and Langchain.

The page serves its function as a user-friendly error message by not only displaying the 404 status but also by offering alternative navigation paths. It includes a persistent search bar and suggests potentially related topics, such as "AI Rules," "Models," and the "Browserbase MCP Server," to guide the user toward other useful content. In essence, the page's value lies not in its direct content but in the structural map it provides to the overall Stagehand documentation, allowing a lost user to discover the breadth of the tool's capabilities and find alternative information.

---

### 7. Browser - 🤘 Stagehand

**URL:** [https://docs.stagehand.dev/configuration/browser](https://docs.stagehand.dev/configuration/browser)
**Word Count:** 1197 words
**Summary Length:** 302 words

Of course. As a technical documentation expert, here is a comprehensive summary and analysis of the provided documentation page.

***

### Summary of Stagehand Browser Configuration

This documentation page details how to configure the browser environment for Stagehand, a tool designed for web automation. The primary purpose is to guide developers in setting up their execution environment, whether for large-scale production tasks or local development and debugging. The page outlines two distinct environments: **Browserbase**, a managed cloud browser infrastructure, and a **Local** environment running on the developer's own machine. Browserbase is positioned as the solution for production use, offering high scalability, advanced stealth features, built-in proxies, and session persistence. In contrast, the Local environment is ideal for development, providing direct control, access to browser DevTools, and the ability to automate an existing browser session.

The documentation provides clear, actionable instructions and code examples for configuring each environment. For Browserbase, the main prerequisite is setting `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID` as environment variables. Configuration is managed within the `Stagehand` constructor by setting `env: "BROWSERBASE"` and passing advanced options through the `browserbaseSessionCreateParams` object, which can control settings like region, proxies, and viewport size. For the Local environment (`env: "LOCAL"`), developers can customize the browser launch using the `localBrowserLaunchOptions` object to control headless mode, specify an executable path, or connect to an already running browser instance via its Chrome DevTools Protocol (CDP) URL.

Finally, the page covers important operational details and troubleshooting. It explains that the `stagehand.init()` method returns crucial session information, including a `debugUrl` for live session viewing and a unique `sessionId`. A dedicated troubleshooting section addresses common issues such as authentication errors with Browserbase, local browser launch failures (including required Linux dependencies), and session timeouts. This makes the document a complete guide for developers needing to set up, configure, and debug their Stagehand browser environment.

---

### 8. Working with iframes - 🤘 Stagehand

**URL:** [https://docs.stagehand.dev/best-practices/working-with-iframes](https://docs.stagehand.dev/best-practices/working-with-iframes)
**Word Count:** 529 words
**Summary Length:** 267 words

Of course. Here is a professional analysis and summary of the provided technical documentation page.

***

### **Summary of "Working with iframes - 🤘 Stagehand"**

This documentation page serves as a best-practice guide for developers using the Stagehand automation library to interact with web page elements located inside iframes. The primary audience is developers who need to automate actions or extract data from complex web pages that embed third-party content, such as payment widgets, consent banners, or chat bubbles. The document explains that elements within an iframe exist in a separate document context, making them inaccessible to Stagehand's core functions by default.

The central instruction of the guide is how to enable iframe support. This is achieved by adding the `iframes: true` parameter to Stagehand's main commands: `act()`, `observe()`, and `extract()`. The page provides a clear code example demonstrating this implementation for all three functions, showing how to instruct Stagehand to search within iframes for the target elements. For instance, to click a button inside an iframe, a developer would use `await page.act({ action: "...", iframes: true });`.

The document concludes with practical tips and performance considerations. It advises that enabling iframe support can increase processing time, so it should only be used when necessary. For debugging, developers are encouraged to check Stagehand logs to verify if a target element resides within an iframe. The guide also addresses potential issues with lazy-loaded iframes, recommending the addition of small waits or action retries to handle intermittent failures. As a related topic, it mentions that experimental features like Shadow DOM support can be enabled separately in the Stagehand configuration.

---

### 9. Page Not Found

**URL:** [https://docs.stagehand.dev/best-practices/contribute-to-stagehand](https://docs.stagehand.dev/best-practices/contribute-to-stagehand)
**Word Count:** 240 words
**Summary Length:** 209 words

Based on the analysis of the provided documentation page, here is a comprehensive summary.

***

### Summary

This documentation page is a "Page Not Found" (404) error, indicating that the content for the requested URL, `.../best-practices/contribute-to-stagehand`, does not exist at that specific path. The primary purpose of this page is to inform the user of the broken link and provide alternative methods for finding the desired information. Analysis of the page's navigation sidebar suggests a potential typo in the URL; the correct page for this topic is likely located at the similar but distinct path `/best-practices/contributing`.

While the page itself contains no substantive content, code examples, or configuration details, it serves a crucial navigational function. It provides a comprehensive site-wide navigation menu, a prominent search bar (with a `Ctrl+K` shortcut), and direct links to the Stagehand home page, the project's changelog, and email support. The navigation is organized into logical sections, including "First Steps," "The Basics," "Configuration," "Best Practices," "Integrations," and "Reference," which allows any user who lands on this page to easily reorient themselves and browse the full scope of the Stagehand documentation to find the correct topic. The page also offers a few AI-generated links to other potentially relevant pages, such as "Computer Use Agents" and "Prompt

---

### 10. Page Not Found

**URL:** [https://docs.stagehand.dev/best-practices/playwright-interoperability](https://docs.stagehand.dev/best-practices/playwright-interoperability)
**Word Count:** 240 words
**Summary Length:** 248 words

Based on the provided information, here is a summary and analysis of the documentation page.

***

### Summary of Documentation Page

This documentation page, located at the URL `https://docs.stagehand.dev/best-practices/playwright-interoperability`, is a "Page Not Found" (404) error page. As a result, it does not contain any specific content, technical concepts, or code examples related to Playwright interoperability with the Stagehand framework. The page's primary purpose is to inform the user that the requested content could not be found and to provide alternative navigation options to help them locate the correct information within the Stagehand documentation.

An analysis of the page's navigation sidebar reveals a potential reason for the error. The sidebar lists a topic under "Best Practices" titled "Playwright Interoperability" with the URL path `/best-practices/playwright-interop`. This suggests the requested URL (`.../playwright-interoperability`) may be incorrect or outdated, and that the intended content is likely available at the slightly different address ending in `.../playwright-interop`. The target audience for the intended content would be developers looking to integrate or use the Stagehand AI-powered browser automation tool in conjunction with the Playwright testing framework.

While the specific page content is missing, the surrounding navigation provides a high-level overview of the Stagehand documentation. It is structured for developers and covers topics from initial setup ("First Steps") and core functions (`act`, `extract`, `observe`) to advanced configuration and best practices. Related topics of interest might include "Using Multiple Tabs," "Working with iframes," and "Build a web browsing agent," all of which are listed in the "

---

## Failed Pages

### Crawling Failures

1. **https://docs.stagehand.dev/installation**
   - Error: Failed to parse server response

2. **https://docs.stagehand.dev/the-basics/act**
   - Error: Failed to parse server response

3. **https://docs.stagehand.dev/the-basics/agent**
   - Error: Failed to parse server response

4. **https://docs.stagehand.dev/best-practices/cost-optimization**
   - Error: Failed to parse server response

5. **https://docs.stagehand.dev/best-practices/deploying-stagehand**
   - Error: Failed to parse server response

6. **https://docs.stagehand.dev/best-practices/build-a-web-browsing-agent**
   - Error: Failed to parse server response

7. **https://docs.stagehand.dev/reference/extract**
   - Error: Failed to parse server response

### Summarization Failures

1. **https://docs.stagehand.dev/the-basics/observe**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 45.055086861s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"45s"}]

2. **https://docs.stagehand.dev/configuration/observability**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 28.262433023s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"28s"}]

3. **https://docs.stagehand.dev/configuration/logging**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 28.311116113s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"28s"}]

4. **https://docs.stagehand.dev/configuration/models**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 27.173982136s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"27s"}]

5. **https://docs.stagehand.dev/configuration/evaluations**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 27.167728165s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"27s"}]

6. **https://docs.stagehand.dev/best-practices/caching-actions**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 26.083440136s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"26s"}]

7. **https://docs.stagehand.dev/best-practices/using-multiple-tabs**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 26.079978954s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"26s"}]

8. **https://docs.stagehand.dev/best-practices/computer-use-agents**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 24.993263736s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"model":"gemini-2.5-pro","location":"global"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"24s"}]

9. **https://docs.stagehand.dev/best-practices/agent-fallbacks**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 47.058837102s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"47s"}]

10. **https://docs.stagehand.dev/best-practices/prompting-best-practices**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 47.062173463s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"model":"gemini-2.5-pro","location":"global"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"47s"}]

11. **https://docs.stagehand.dev/best-practices/mcp-integrations**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 45.96288149s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"45s"}]

12. **https://docs.stagehand.dev/best-practices/speed-optimization**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 45.950657231s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"model":"gemini-2.5-pro","location":"global"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"45s"}]

13. **https://docs.stagehand.dev/reference/act**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 44.849586201s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"44s"}]

14. **https://docs.stagehand.dev/reference/observe**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 44.848883553s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"44s"}]

15. **https://docs.stagehand.dev/reference/agent**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 43.768046846s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"43s"}]

16. **https://docs.stagehand.dev/configuration/models#why-llm-choice-matters**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 43.766083242s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"43s"}]

17. **https://docs.stagehand.dev/configuration/models#environment-variables-setup**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 42.689375116s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"model":"gemini-2.5-pro","location":"global"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"42s"}]

18. **https://docs.stagehand.dev/configuration/models#supported-providers**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 42.672324151s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"42s"}]

19. **https://docs.stagehand.dev/configuration/models#production-ready-providers**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 41.577973847s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"41s"}]

20. **https://docs.stagehand.dev/configuration/models#additional-providers**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 41.567868164s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"model":"gemini-2.5-pro","location":"global"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"41s"}]

21. **https://docs.stagehand.dev/configuration/models#basic-configuration**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 40.472869253s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"model":"gemini-2.5-pro","location":"global"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"40s"}]

22. **https://docs.stagehand.dev/configuration/models#model-name-format**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 40.477283421s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"40s"}]

23. **https://docs.stagehand.dev/configuration/models#quick-start-examples**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 39.373920793s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"39s"}]

24. **https://docs.stagehand.dev/configuration/models#custom-llm-integration**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 39.375040714s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"39s"}]

25. **https://docs.stagehand.dev/configuration/models#vercel-ai-sdk**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 38.277891667s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"38s"}]

26. **https://docs.stagehand.dev/configuration/models#troubleshooting**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 38.287504129s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"38s"}]

27. **https://docs.stagehand.dev/configuration/models#common-issues**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 37.195341571s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"37s"}]

28. **https://docs.stagehand.dev/configuration/models#next-steps**
   - Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 2
Please retry in 37.193392877s. [{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.5-pro"},"quotaValue":"2"}]},{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"37s"}]

---

## Raw Data

### Successfully Crawled URLs

1. [Introducing Stagehand - 🤘 Stagehand](https://docs.stagehand.dev/)
2. [Introducing Stagehand - 🤘 Stagehand](https://docs.stagehand.dev/changelog)
3. [Introducing Stagehand - 🤘 Stagehand](https://docs.stagehand.dev/introduction)
4. [Introducing Stagehand - 🤘 Stagehand](https://docs.stagehand.dev/quickstart)
5. [Page Not Found](https://docs.stagehand.dev/ai-rules)
6. [Page Not Found](https://docs.stagehand.dev/the-basics/extract)
7. [Page Not Found](https://docs.stagehand.dev/the-basics/observe)
8. [Browser - 🤘 Stagehand](https://docs.stagehand.dev/configuration/browser)
9. [Browser - 🤘 Stagehand](https://docs.stagehand.dev/configuration/observability)
10. [Browser - 🤘 Stagehand](https://docs.stagehand.dev/configuration/logging)
11. [Browser - 🤘 Stagehand](https://docs.stagehand.dev/configuration/models)
12. [Browser - 🤘 Stagehand](https://docs.stagehand.dev/configuration/evaluations)
13. [Working with iframes - 🤘 Stagehand](https://docs.stagehand.dev/best-practices/caching-actions)
14. [Working with iframes - 🤘 Stagehand](https://docs.stagehand.dev/best-practices/using-multiple-tabs)
15. [Working with iframes - 🤘 Stagehand](https://docs.stagehand.dev/best-practices/working-with-iframes)
16. [Page Not Found](https://docs.stagehand.dev/best-practices/computer-use-agents)
17. [Page Not Found](https://docs.stagehand.dev/best-practices/contribute-to-stagehand)
18. [Page Not Found](https://docs.stagehand.dev/best-practices/playwright-interoperability)
19. [Page Not Found](https://docs.stagehand.dev/best-practices/agent-fallbacks)
20. [Prompting Best Practices - 🤘 Stagehand](https://docs.stagehand.dev/best-practices/prompting-best-practices)
21. [Prompting Best Practices - 🤘 Stagehand](https://docs.stagehand.dev/best-practices/mcp-integrations)
22. [Prompting Best Practices - 🤘 Stagehand](https://docs.stagehand.dev/best-practices/speed-optimization)
23. [Prompting Best Practices - 🤘 Stagehand](https://docs.stagehand.dev/reference/act)
24. [Page Not Found](https://docs.stagehand.dev/reference/observe)
25. [Page Not Found](https://docs.stagehand.dev/reference/agent)
26. [Page Not Found](https://docs.stagehand.dev/configuration/models#why-llm-choice-matters)
27. [Page Not Found](https://docs.stagehand.dev/configuration/models#environment-variables-setup)
28. [Page Not Found](https://docs.stagehand.dev/configuration/models#supported-providers)
29. [Models - 🤘 Stagehand](https://docs.stagehand.dev/configuration/models#production-ready-providers)
30. [Models - 🤘 Stagehand](https://docs.stagehand.dev/configuration/models#additional-providers)
31. [Models - 🤘 Stagehand](https://docs.stagehand.dev/configuration/models#basic-configuration)
32. [Models - 🤘 Stagehand](https://docs.stagehand.dev/configuration/models#model-name-format)
33. [Models - 🤘 Stagehand](https://docs.stagehand.dev/configuration/models#quick-start-examples)
34. [Models - 🤘 Stagehand](https://docs.stagehand.dev/configuration/models#custom-llm-integration)
35. [Models - 🤘 Stagehand](https://docs.stagehand.dev/configuration/models#vercel-ai-sdk)
36. [Models - 🤘 Stagehand](https://docs.stagehand.dev/configuration/models#troubleshooting)
37. [Models - 🤘 Stagehand](https://docs.stagehand.dev/configuration/models#common-issues)
38. [Models - 🤘 Stagehand](https://docs.stagehand.dev/configuration/models#next-steps)

---

*This documentation summary was automatically generated using Stagehand for web crawling, Turndown for HTML-to-Markdown conversion, and Google Gemini for AI summarization.*