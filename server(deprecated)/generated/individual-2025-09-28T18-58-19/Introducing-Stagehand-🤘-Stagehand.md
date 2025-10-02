# Introducing Stagehand - 🤘 Stagehand

**URL:** [https://docs.stagehand.dev/quickstart](https://docs.stagehand.dev/quickstart)
**Crawled:** 9/28/2025, 2:54:45 PM
**Description:** Developers use Stagehand to reliably automate the web.

---

## AI Summary

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

## Full Content

Introducing Stagehand - 🤘 Stagehand

[🤘 Stagehand home page![light logo](https://mintcdn.com/stagehand/W3kYIUy5sYF-nkqt/logo/light_logo.png?fit=max&auto=format&n=W3kYIUy5sYF-nkqt&q=85&s=cb759f50fefd9800bb51457db4faa4b8)![dark logo](https://mintcdn.com/stagehand/W3kYIUy5sYF-nkqt/logo/dark_logo.png?fit=max&auto=format&n=W3kYIUy5sYF-nkqt&q=85&s=87dc397ae90550780e9fc803af66f015)](https://stagehand.dev)

Search...

Ctrl K

-   [Changelog](https://github.com/browserbase/stagehand/releases)
-   [Stagehand by Browserbase](https://docs.stagehand.dev/first-steps/introduction)

##### First Steps

-   [

    Introduction



    ](/first-steps/introduction)
-   [

    Quickstart



    ](/first-steps/quickstart)
-   [

    Installation



    ](/first-steps/installation)
-   [

    AI Rules



    ](/first-steps/ai-rules)

##### The Basics

-   [

    Act



    ](/basics/act)
-   [

    Extract



    ](/basics/extract)
-   [

    Observe



    ](/basics/observe)
-   [

    Agent



    ](/basics/agent)

##### Configuration

-   [

    Browser



    ](/configuration/browser)
-   [

    Observability



    ](/configuration/observability)
-   [

    Logging



    ](/configuration/logging)
-   [

    Models



    ](/configuration/models)
-   [

    Evaluations



    ](/configuration/evals)

##### Best Practices

-   [

    Caching Actions



    ](/best-practices/caching)
-   [

    Cost Optimization



    ](/best-practices/cost-optimization)
-   [

    Using Multiple Tabs



    ](/best-practices/using-multiple-tabs)
-   [

    Working with iframes



    ](/best-practices/working-with-iframes)
-   [

    Deploying Stagehand



    ](/best-practices/deployments)
-   [

    Computer Use Agents



    ](/best-practices/computer-use)
-   [

    Contribute to Stagehand



    ](/best-practices/contributing)
-   [

    Playwright Interoperability



    ](/best-practices/playwright-interop)
-   [

    Build a web browsing agent



    ](/best-practices/build-agent)
-   [

    Agent Fallbacks



    ](/best-practices/agent-fallbacks)
-   [

    Prompting Best Practices



    ](/best-practices/prompting-best-practices)
-   [

    MCP Integrations



    ](/best-practices/mcp-integrations)
-   [

    Speed Optimization



    ](/best-practices/speed-optimization)

##### Integrations

-   MCP Server

-   CrewAI

-   Langchain

-   Next.js + Vercel


##### Reference

-   [

    act()



    ](/references/act)
-   [

    extract()



    ](/references/extract)
-   [

    observe()



    ](/references/observe)
-   [

    agent()



    ](/references/agent)

-   [

    Support

    ](mailto:support@browserbase.com)

[🤘 Stagehand home page![light logo](https://mintcdn.com/stagehand/W3kYIUy5sYF-nkqt/logo/light_logo.png?fit=max&auto=format&n=W3kYIUy5sYF-nkqt&q=85&s=cb759f50fefd9800bb51457db4faa4b8)![dark logo](https://mintcdn.com/stagehand/W3kYIUy5sYF-nkqt/logo/dark_logo.png?fit=max&auto=format&n=W3kYIUy5sYF-nkqt&q=85&s=87dc397ae90550780e9fc803af66f015)](https://stagehand.dev)

Search...

Ctrl K

-   [Support](mailto:support@browserbase.com)

Search...

Navigation

First Steps

Introducing Stagehand

On this page

-   [The Problem with Browser Automation](#the-problem-with-browser-automation)
-   [Enter Stagehand](#enter-stagehand)
-   [Why Developers Choose Stagehand](#why-developers-choose-stagehand)
-   [Built for Modern Development](#built-for-modern-development)
-   [Get Started in 60 Seconds](#get-started-in-60-seconds)

First Steps

# Introducing Stagehand

Copy page

Developers use Stagehand to reliably automate the web.

Copy page

Stagehand is a browser automation framework used to control web browsers with natural language and code. By combining the power of AI with the precision of code, Stagehand makes web automation flexible, maintainable, and actually reliable.

##

[​

](#the-problem-with-browser-automation)

The Problem with Browser Automation

Traditional frameworks like Playwright and Puppeteer force you to write brittle scripts that break with every UI change. Web agents promise to solve this with AI, but leave you at the mercy of unpredictable behavior. **You’re stuck between two bad options:**

-   **Too brittle**: Traditional selectors break when websites change
-   **Too agentic**: AI agents are unpredictable and impossible to debug

##

[​

](#enter-stagehand)

Enter Stagehand

Stagehand gives you the best of both worlds through four powerful primitives that let you choose exactly how much AI to use:

[

## Act

Execute actions using natural language

](/basics/act)[

## Extract

Pull structured data with schemas

](/basics/extract)[

## Observe

Discover available actions on any page

](/basics/observe)[

## Agent

Automate entire workflows autonomously

](/basics/agent)

TypeScript

Python

Copy

Ask AI

```
// Act - Execute natural language actions
await page.act("click the login button");

// Extract - Pull structured data
const { price } = await page.extract({
  schema: z.object({ price: z.number() })
});

// Observe - Discover available actions
const actions = await page.observe("find submit buttons");

// Agent - Automate entire workflows
const agent = stagehand.agent({
    provider: "anthropic",
    model: "claude-sonnet-4-20250514",
    options: {
      apiKey: process.env.ANTHROPIC_API_KEY,
    },
})
await agent.execute("apply for this job");
```

##

[​

](#why-developers-choose-stagehand)

Why Developers Choose Stagehand

-   **Precise Control**: Mix AI-powered actions with deterministic code. You decide exactly how much AI to use.
-   **Actually Repeatable**: Save and replay actions exactly. No more “it worked on my machine” with browser automations.
-   **Maintainable at Scale**: One script can automate multiple websites. When sites change, your automations adapt.
-   **Composable Tools**: Choose your level of automation with Act, Extract, Observe, and Agent.

##

[​

](#built-for-modern-development)

Built for Modern Development

Stagehand is designed for developers building production browser automations and AI agents that need reliable web access.

Full Playwright Compatibility

Use any Playwright API alongside Stagehand. You’re never locked into our abstractions.

TypeScript & Python SDKs

First-class support for both ecosystems with type safety and IDE autocomplete.

Works Everywhere

Compatible with all Chromium-based browsers: Chrome, Edge, Arc, Brave, and more.

Built by Browserbase

Created and maintained by the team behind enterprise browser infrastructure.

##

[​

](#get-started-in-60-seconds)

Get Started in 60 Seconds

**Pro tip**: For best results, we recommend using Stagehand with [Browserbase](https://www.browserbase.com) for reliable cloud browser infrastructure.

[

## Quickstart

Build your first automation in under a minute

](/first-steps/quickstart)[

## Try Director

Generate Stagehand scripts with AI

](https://www.director.ai)[

## View Examples

See real-world automation examples

](https://github.com/browserbase/stagehand/tree/main/examples)[

## Join Discord

Get help from the community

](https://discord.gg/stagehand)

[Quickstart](/first-steps/quickstart)

[x](https://x.com/stagehanddev)[github](https://github.com/browserbase/stagehand)[linkedin](https://linkedin.com/company/browserbasehq)[slack](https://stagehand.dev/slack)

[Powered by Mintlify](https://mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=stagehand)

Assistant

Responses are generated using AI and may contain mistakes.