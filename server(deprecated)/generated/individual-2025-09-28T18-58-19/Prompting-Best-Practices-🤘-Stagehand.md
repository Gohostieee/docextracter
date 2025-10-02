# Prompting Best Practices - 🤘 Stagehand

**URL:** [https://docs.stagehand.dev/reference/act](https://docs.stagehand.dev/reference/act)
**Crawled:** 9/28/2025, 2:55:48 PM
**Description:** Write effective prompts for reliable Stagehand automation

---

## Full Content

Prompting Best Practices - 🤘 Stagehand

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

Prompting Best Practices

On this page

-   [Act Method](#act-method)
-   [Use Element Types, Not Colors](#use-element-types%2C-not-colors)
-   [Use Descriptive Language](#use-descriptive-language)
-   [Choose the Right Action Verbs](#choose-the-right-action-verbs)
-   [Protect Sensitive Data](#protect-sensitive-data)
-   [Extract Method](#extract-method)
-   [Schema Best Practices](#schema-best-practices)
-   [Handle Arrays Correctly](#handle-arrays-correctly)
-   [Use Proper URL Types](#use-proper-url-types)
-   [Observe Method](#observe-method)
-   [Check Elements First](#check-elements-first)
-   [Be Specific About Element Types](#be-specific-about-element-types)
-   [Agent Method](#agent-method)
-   [Navigate First](#navigate-first)
-   [Be Highly Specific](#be-highly-specific)
-   [Set Appropriate Step Limits](#set-appropriate-step-limits)
-   [Include Success Criteria](#include-success-criteria)
-   [Common Mistakes to Avoid](#common-mistakes-to-avoid)
-   [Testing Your Prompts](#testing-your-prompts)

Best Practices

# Prompting Best Practices

Copy page

Write effective prompts for reliable Stagehand automation

Copy page

Good prompts make Stagehand reliable. Bad prompts cause failures. Here’s how to write prompts that work consistently.

##

[​

](#act-method)

Act Method

Use `act()` for single actions on web pages. Each action should be focused and clear.

TypeScript

Python

Copy

Ask AI

```
// Good - Single, specific actions
await page.act("click the 'Add to Cart' button");
await page.act("type 'user@example.com' into the email field");

// Bad - Multiple actions combined
await page.act("fill out the form and submit it");
await page.act("login with credentials and navigate to dashboard");
```

###

[​

](#use-element-types%2C-not-colors)

Use Element Types, Not Colors

Describe elements by their type and function rather than visual attributes like color.

TypeScript

Python

Copy

Ask AI

```
// Good - Element types and descriptive text
await page.act("click the 'Sign In' button");
await page.act("type into the email input field");

// Bad - Color-based descriptions
await page.act("click the blue button");
await page.act("type into the white input");
```

###

[​

](#use-descriptive-language)

Use Descriptive Language

TypeScript

Python

Copy

Ask AI

```
// Good - Clear element identification
await page.act("click the 'Next' button at the bottom of the form");
await page.act("type into the search bar at the top of the page");

// Bad - Vague descriptions
await page.act("click next");
await page.act("type into search");
```

###

[​

](#choose-the-right-action-verbs)

Choose the Right Action Verbs

-   **Click** for buttons, links, checkboxes
-   **Type** for text inputs
-   **Select** for dropdowns
-   **Check/uncheck** for checkboxes
-   **Upload** for file inputs

TypeScript

Python

Copy

Ask AI

```
// Good
await page.act("click the submit button");
await page.act("select 'Option 1' from dropdown");

// Bad
await page.act("click submit");
await page.act("choose option 1");
```

###

[​

](#protect-sensitive-data)

Protect Sensitive Data

Variables keep sensitive information out of prompts and logs.

TypeScript

Python

Copy

Ask AI

```
// Good - Secure approach
await page.act({
  action: "enter %username% in the email field",
  variables: {
    username: "user@example.com"
  }
});

await page.act({
  action: "enter %password% in the password field",
  variables: {
    password: process.env.USER_PASSWORD
  }
});

// Bad - Insecure approach
await page.act("type 'mySecretPassword123' into the password field");
```

Set `verbose: 0` in your Stagehand config to prevent secrets from appearing in logs.

##

[​

](#extract-method)

Extract Method

Use `extract()` to pull structured data from pages. Define clear schemas and provide context.

###

[​

](#schema-best-practices)

Schema Best Practices

Use descriptive field names, correct types, and detailed descriptions. Field descriptions provide context that helps the agent understand exactly what to extract.

TypeScript

Python

Copy

Ask AI

```
// Good - Descriptive names, correct types, and helpful descriptions
const productData = await page.extract({
  instruction: "Extract product information",
  schema: z.object({
    productTitle: z.string().describe("The main product name displayed on the page"),
    priceInDollars: z.number().describe("Current selling price as a number, without currency symbol"),
    isInStock: z.boolean().describe("Whether the product is available for purchase")
  })
});

// Bad - Generic names, wrong types, no descriptions
const data = await page.extract({
  instruction: "Get product details",
  schema: z.object({
    name: z.string(), // Too generic, no context
    price: z.string(), // Should be number
    stock: z.string() // Should be boolean, no context
  })
});
```

###

[​

](#handle-arrays-correctly)

Handle Arrays Correctly

Always wrap schemas in objects for reliable extraction.

TypeScript

Python

Copy

Ask AI

```
// Good - Array wrapped in object
const listings = await page.extract({
  instruction: "Extract all apartment listings",
  schema: z.object({
    apartments: z.array(z.object({
      address: z.string(),
      rent: z.number()
    }))
  })
});

// Bad - Bare array
const listings = await page.extract({
  instruction: "Extract apartment listings",
  schema: z.array(z.string()) // Don't do this
});
```

###

[​

](#use-proper-url-types)

Use Proper URL Types

Specify URL types to tell Stagehand to extract URLs. Without proper URL types, Stagehand won’t extract URLs.

TypeScript

Python

Copy

Ask AI

```
// Good - Tells Stagehand to extract URLs
const links = await page.extract({
  instruction: "Extract navigation links",
  schema: z.object({
    links: z.array(z.object({
      text: z.string(),
      url: z.string().url() // Required for URL extraction
    }))
  })
});
```

##

[​

](#observe-method)

Observe Method

Use `observe()` to discover actionable elements before acting on them.

###

[​

](#check-elements-first)

Check Elements First

Verify elements exist before taking action to avoid errors.

TypeScript

Python

Copy

Ask AI

```
// Check for elements first
const loginButtons = await page.observe("Find the login button");

if (loginButtons.length > 0) {
  await page.act(loginButtons[0]);
} else {
  console.log("No login button found");
}
```

###

[​

](#be-specific-about-element-types)

Be Specific About Element Types

TypeScript

Python

Copy

Ask AI

```
// Good - Specific element types
const submitButtons = await page.observe("Find submit button in the form");
const dropdowns = await page.observe("Find the state dropdown menu");

// Bad - Too vague
const elements = await page.observe("Find submit stuff");
const things = await page.observe("Find state selection");
```

##

[​

](#agent-method)

Agent Method

Use `agent()` for complex, multi-step workflows. Provide detailed instructions and set appropriate limits.

###

[​

](#navigate-first)

Navigate First

Don’t include navigation in agent tasks. Handle it separately.

TypeScript

Python

Copy

Ask AI

```
// Good - Navigate first
await page.goto('https://amazon.com');
await agent.execute('Search for wireless headphones under $100 and add the best rated one to cart');

// Bad - Navigation in task
await agent.execute('Go to Amazon, search for headphones, and add one to cart');
```

###

[​

](#be-highly-specific)

Be Highly Specific

Detailed instructions lead to better results.

TypeScript

Python

Copy

Ask AI

```
// Good - Detailed instructions
await agent.execute({
  instruction: "Find Italian restaurants in Brooklyn that are open after 10pm, have outdoor seating, and are rated 4+ stars. Save the top 3 results.",
  maxSteps: 25
});

// Bad - Vague instructions
await agent.execute("Find some good restaurants");
```

###

[​

](#set-appropriate-step-limits)

Set Appropriate Step Limits

Match step limits to task complexity.

TypeScript

Python

Copy

Ask AI

```
// Simple task - fewer steps
await agent.execute({
  instruction: "Subscribe to the newsletter with email 'user@example.com'",
  maxSteps: 10
});

// Complex task - more steps
await agent.execute({
  instruction: "Research and compare 5 project management tools with pricing and features",
  maxSteps: 50
});
```

###

[​

](#include-success-criteria)

Include Success Criteria

Tell the agent how to know when it’s done.

TypeScript

Python

Copy

Ask AI

```
// Good - Clear success criteria
await agent.execute({
  instruction: "Add 3 smartphone cases to cart and confirm the cart shows exactly 3 items with total price",
  maxSteps: 20
});

// Bad - No validation
await agent.execute("Add some items to cart");
```

##

[​

](#common-mistakes-to-avoid)

Common Mistakes to Avoid

-   **Combining multiple actions** - Keep each `act()` call to one action
-   **Using vague descriptions** - Be specific about which elements to interact with
-   **Exposing sensitive data** - Always use variables for credentials
-   **Skipping validation** - Check results before proceeding

##

[​

](#testing-your-prompts)

Testing Your Prompts

1.  **Start simple** - Test basic functionality first
2.  **Add complexity gradually** - Build up to complex workflows
3.  **Monitor results** - Use logging to understand what’s happening
4.  **Iterate based on failures** - Refine prompts when they don’t work Remember: Good prompting is iterative. When in doubt, be more specific rather than less.

[Agent Fallbacks](/best-practices/agent-fallbacks)[MCP Integrations](/best-practices/mcp-integrations)

[x](https://x.com/stagehanddev)[github](https://github.com/browserbase/stagehand)[linkedin](https://linkedin.com/company/browserbasehq)[slack](https://stagehand.dev/slack)

[Powered by Mintlify](https://mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=stagehand)

Assistant

Responses are generated using AI and may contain mistakes.