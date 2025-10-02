# Working with iframes - 🤘 Stagehand

**URL:** [https://docs.stagehand.dev/best-practices/computer-use-agents](https://docs.stagehand.dev/best-practices/computer-use-agents)
**Crawled:** 9/28/2025, 2:32:45 PM

---

## Full Content

Working with iframes - 🤘 Stagehand

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

Best Practices

Working with iframes

On this page

-   [What is an iframe?](#what-is-an-iframe%3F)
-   [Enable iframe support](#enable-iframe-support)
-   [Tips](#tips)
-   [Next steps](#next-steps)

Best Practices

# Working with iframes

Copy page

Copy page

###

[​

](#what-is-an-iframe%3F)

What is an iframe?

Iframes embed other pages within your current page. Sites use them for consent banners, payment widgets, chat bubbles, and third-party content. Elements inside iframes exist in a separate context than the main page.

###

[​

](#enable-iframe-support)

Enable iframe support

Set `iframes: true` in your `act()`, `observe()`, and `extract()` commands.

TypeScript

Python

Copy

Ask AI

```
// Act within iframes
await page.act({ action: "click the accept cookies button", iframes: true });

// Observe within iframes
const results = await page.observe({
  instruction: "Find the primary action button",
  iframes: true,
});

// Extract from iframes
const data = await page.extract({
  instruction: "Extract the product price from the payment widget",
  schema: z.object({
    price: z.string(),
  }),
  iframes: true,
});
```

###

[​

](#tips)

Tips

-   Iframes can increase processing time. For best performance, use the iframe option only when necessary.
-   When you are unsure whether an element will be in an iframe, you can verify the presence of iframes in Stagehand logs.
-   If an element intermittently fails to be found, it may be inside a lazy‑loaded iframe. Add small waits between steps or re‑run your action.

You can enable experimental features (like Shadow DOM support) via your Stagehand configuration. See the [configuration guide](/configuration/browser).

##

[​

](#next-steps)

Next steps

[

## Analyze pages with observe()

Use `observe()` to plan precise, single-step actions before executing them.

](/basics/observe)[

## Extract data with extract()

Use `extract()` with a data schema to pull clean, typed data from any page.

](/basics/extract)[

## Caching actions

Speed up repeated automations by caching actions.

](/best-practices/caching)[

## Act fundamentals

Learn how to perform single-step actions reliably with `act()`.

](/basics/act)

[Using Multiple Tabs](/best-practices/using-multiple-tabs)[Deploying Stagehand](/best-practices/deployments)

[x](https://x.com/stagehanddev)[github](https://github.com/browserbase/stagehand)[linkedin](https://linkedin.com/company/browserbasehq)[slack](https://stagehand.dev/slack)

[Powered by Mintlify](https://mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=stagehand)

Assistant

Responses are generated using AI and may contain mistakes.