# Browser - 🤘 Stagehand

**URL:** [https://docs.stagehand.dev/configuration/evaluations](https://docs.stagehand.dev/configuration/evaluations)
**Crawled:** 9/28/2025, 2:55:12 PM
**Description:** Configure Stagehand on Browserbase or locally

---

## Full Content

Browser - 🤘 Stagehand

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

Configuration

Browser

On this page

-   [Browserbase Environment](#browserbase-environment)
-   [Environment Variables](#environment-variables)
-   [Using Stagehand with Browserbase](#using-stagehand-with-browserbase)
-   [Basic Setup](#basic-setup)
-   [Advanced Configuration](#advanced-configuration)
-   [Initialization Result](#initialization-result)
-   [Alternative: Browserbase SDK](#alternative%3A-browserbase-sdk)
-   [Connecting to an Existing Session](#connecting-to-an-existing-session)
-   [Local Environment](#local-environment)
-   [Environment Comparison](#environment-comparison)
-   [Basic Local Setup](#basic-local-setup)
-   [Advanced Local Configuration](#advanced-local-configuration)
-   [Connecting to your local browser](#connecting-to-your-local-browser)
-   [Troubleshooting](#troubleshooting)
-   [Common Issues](#common-issues)

Configuration

# Browser

Copy page

Configure Stagehand on Browserbase or locally

Copy page

Stagehand supports two primary environments:

-   **Browserbase** - Cloud-managed browser infrastructure optimized for production web automation at scale
-   **Local** - Run browsers directly on your machine for development and debugging

##

[​

](#browserbase-environment)

Browserbase Environment

Browserbase provides managed cloud browser infrastructure optimized for web automation at scale. It offers advanced features like stealth mode, proxy support, and persistent contexts.[

## Browserbase

Discover the power of cloud-managed browser infrastructure with Browserbase.

](https://docs.browserbase.com)

###

[​

](#environment-variables)

Environment Variables

Before getting started, set up the required environment variables:

.env

Copy

Ask AI

```
BROWSERBASE_API_KEY=your_api_key_here
BROWSERBASE_PROJECT_ID=your_project_id_here
```

Get your API key and Project ID from the [Browserbase Dashboard](https://browserbase.com/overview)

###

[​

](#using-stagehand-with-browserbase)

Using Stagehand with Browserbase

####

[​

](#basic-setup)

Basic Setup

The simplest way to get started is with default settings:

TypeScript

Python

Copy

Ask AI

```
import { Stagehand } from "@browserbasehq/stagehand";

const stagehand = new Stagehand({
  env: "BROWSERBASE",
});

await stagehand.init();
```

####

[​

](#advanced-configuration)

Advanced Configuration

Configure browser settings, proxy support, and other session parameters:

TypeScript

Python

Copy

Ask AI

```
import { Stagehand } from "@browserbasehq/stagehand";

const stagehand = new Stagehand({
  env: "BROWSERBASE",
  // Optional: API Key and Project ID will be pulled directly from your environment
  apiKey: process.env.BROWSERBASE_API_KEY,
  projectId: process.env.BROWSERBASE_PROJECT_ID,
  browserbaseSessionCreateParams: {
    proxies: true,
    region: "us-west-2",
    browserSettings: {
      viewport: { width: 1920, height: 1080 },
      blockAds: true,
    },
  },
});

await stagehand.init();
console.log("Session ID:", stagehand.sessionId);
```

Advanced Browserbase Configuration Example

TypeScript

Python

Copy

Ask AI

```
const stagehand = new Stagehand({
  env: "BROWSERBASE",
  apiKey: process.env.BROWSERBASE_API_KEY,
  projectId: process.env.BROWSERBASE_PROJECT_ID,
  browserbaseSessionCreateParams: {
    projectId: process.env.BROWSERBASE_PROJECT_ID!, // Optional: automatically set if given in environment variable or by Stagehand parameter
    proxies: true,
    region: "us-west-2",
    timeout: 3600, // 1 hour session timeout
    keepAlive: true, // Available on Startup plan
    browserSettings: {
      advancedStealth: false, // this is a Scale Plan feature - reach out to support@browserbase.com to enable
      blockAds: true,
      solveCaptchas: true,
      recordSession: false,
      os: "windows", // Valid: "windows" | "mac" | "linux" | "mobile" | "tablet"
      viewport: {
        width: 1920,
        height: 1080,
      },
    },
    userMetadata: {
      userId: "automation-user-123",
      environment: "production",
    },
  },
});
```

####

[​

](#initialization-result)

Initialization Result

After calling `stagehand.init()`, the method returns configuration information about the initialized session:

TypeScript

Python

Copy

Ask AI

```
const result = await stagehand.init();
console.log(result);
```

The returned object contains:

Copy

Ask AI

```
{
  debugUrl: 'https://www.browserbase.com/devtools/inspector.html?wss=connect.browserbase.com/debug/f8a21b4a-6fa1-4ab9-9007-fbfe61dc14f0/devtools/page/5474B0E0510C5B6E629BEB06E799CD70?debug=true',
  sessionUrl: 'https://www.browserbase.com/sessions/f8a21b4a-6fa1-4ab9-9007-fbfe61dc14f0',
  sessionId: 'f8a21b4a-6fa1-4ab9-9007-fbfe61dc14f0'
}
```

debugUrl

**Open the Browserbase [session live view](https://docs.browserbase.com/features/session-live-view)** to include a human-in-the-loop.

sessionUrl

**Open the [session replay](https://docs.browserbase.com/features/session-replay)** to see the full session recording.

sessionId

**Unique identifier** for the [Browserbase session](https://docs.browserbase.com/introduction/what-is-browserbase). This is used to identify the session in the Browserbase dashboard and to connect to the session.

###

[​

](#alternative%3A-browserbase-sdk)

Alternative: Browserbase SDK

If you prefer to manage sessions directly, you can use the Browserbase SDK:

TypeScript

Python

Copy

Ask AI

```
import { Browserbase } from "@browserbasehq/sdk";

const bb = new Browserbase({
  apiKey: process.env.BROWSERBASE_API_KEY!
});

const session = await bb.sessions.create({
  projectId: process.env.BROWSERBASE_PROJECT_ID!,
  // Add configuration options here
});
```

####

[​

](#connecting-to-an-existing-session)

Connecting to an Existing Session

Connect to a previously created Browserbase session using its session ID:

TypeScript

Python

Copy

Ask AI

```
import { Stagehand } from "@browserbasehq/stagehand";

const stagehand = new Stagehand({
  env: "BROWSERBASE",
  browserbaseSessionID: "existing-session-uuid-here",
});

await stagehand.init();
console.log("Resumed Session ID:", stagehand.sessionId);
```

##

[​

](#local-environment)

Local Environment

The local environment runs browsers directly on your machine, providing full control over browser instances and configurations. Ideal for development, debugging, and scenarios requiring custom browser setups.

###

[​

](#environment-comparison)

Environment Comparison

Feature

Browserbase

Local

**Scalability**

High (cloud-managed)

Limited (local resources)

**Stealth Features**

Advanced fingerprinting

Basic stealth

**Proxy Support**

Built-in residential proxies

Manual configuration

**Session Persistence**

Cloud context storage

File-based user data

**Geographic Distribution**

Multi-region deployment

Single machine

**Debugging**

Session recordings & logs

Direct DevTools access

**Setup Complexity**

Environment variables only

Browser installation required

**Cost**

Usage-based pricing

Infrastructure & maintenance

**Best For**

Production, scale, compliance

Development, debugging

###

[​

](#basic-local-setup)

Basic Local Setup

TypeScript

Python

Copy

Ask AI

```
import { Stagehand } from "@browserbasehq/stagehand";

const stagehand = new Stagehand({
  env: "LOCAL"
});

await stagehand.init();
console.log("Session ID:", stagehand.sessionId);
```

###

[​

](#advanced-local-configuration)

Advanced Local Configuration

Customize browser launch options for local development:

TypeScript

Python

Copy

Ask AI

```
import { Stagehand } from "@browserbasehq/stagehand";

const stagehand = new Stagehand({
  env: "LOCAL",
  localBrowserLaunchOptions: {
    headless: false, // Show browser window
    devtools: true, // Open developer tools
    viewport: { width: 1280, height: 720 },
    executablePath: '/opt/google/chrome/chrome', // Custom Chrome path
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--allow-running-insecure-content',
    ],
    env: {
      NODE_ENV: "development",
      DEBUG: "true",
    },
  },
});

await stagehand.init();
```

###

[​

](#connecting-to-your-local-browser)

Connecting to your local browser

Connect to your existing local Chrome/Chromium browser instead of launching a new one. This lets you automate your normal browser with all your existing tabs, extensions and settings.

TypeScript

Python

Copy

Ask AI

```
import { Stagehand } from "@browserbasehq/stagehand";

const stagehand = new Stagehand({
	env: "LOCAL",
	localBrowserLaunchOptions: {
		cdpUrl: 'http://localhost:9222'
	}
});

await stagehand.init();
```

##

[​

](#troubleshooting)

Troubleshooting

###

[​

](#common-issues)

Common Issues

Browserbase Authentication Errors

-   Verify your `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID` are set correctly
-   Check that your API key has the necessary permissions
-   Ensure your Browserbase account has sufficient credits

Local Browser Launch Failures

-   Install Chrome or Chromium on your system
-   Set the correct `executablePath` for your Chrome installation
-   Check that required dependencies are installed (Linux: `libnss3-dev libatk-bridge2.0-dev libgtk-3-dev libxss1 libasound2`)

Session Timeout Issues

-   Increase session timeout in `browserbaseSessionCreateParams.timeout`
-   Use `keepAlive: true` for long-running sessions
-   Monitor session usage to avoid unexpected terminations

[Agent](/basics/agent)[Observability](/configuration/observability)

[x](https://x.com/stagehanddev)[github](https://github.com/browserbase/stagehand)[linkedin](https://linkedin.com/company/browserbasehq)[slack](https://stagehand.dev/slack)

[Powered by Mintlify](https://mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=stagehand)

Assistant

Responses are generated using AI and may contain mistakes.