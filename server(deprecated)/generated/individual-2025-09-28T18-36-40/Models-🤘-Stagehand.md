# Models - 🤘 Stagehand

**URL:** [https://docs.stagehand.dev/configuration/models#next-steps](https://docs.stagehand.dev/configuration/models#next-steps)
**Crawled:** 9/28/2025, 2:33:36 PM

---

## Full Content

Models - 🤘 Stagehand

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

Models

On this page

-   [Why LLM Choice Matters](#why-llm-choice-matters)
-   [Environment Variables Setup](#environment-variables-setup)
-   [Supported Providers](#supported-providers)
-   [Production-Ready Providers](#production-ready-providers)
-   [Additional Providers](#additional-providers)
-   [Basic Configuration](#basic-configuration)
-   [Model Name Format](#model-name-format)
-   [Quick Start Examples](#quick-start-examples)
-   [Custom LLM Integration](#custom-llm-integration)
-   [Vercel AI SDK](#vercel-ai-sdk)
-   [Troubleshooting](#troubleshooting)
-   [Common Issues](#common-issues)
-   [Next Steps](#next-steps)

Configuration

# Models

Copy page

Enhance Stagehand with LLMs for optimal performance, cost, and reliability

Copy page

Stagehand uses Large Language Models (LLMs) to understand web pages, plan actions, and interact with complex interfaces. The choice of LLM significantly impacts your automation’s accuracy, speed, and cost.[

## Model Evaluation

Find more details about how to choose the right model on our Model Evaluation page.

](https://www.stagehand.dev/evals)

##

[​

](#why-llm-choice-matters)

Why LLM Choice Matters

-   **Accuracy**: Better models provide more reliable element detection and action planning
-   **Speed**: Faster models reduce automation latency
-   **Cost**: Different providers offer varying pricing structures
-   **Reliability**: Structured output support ensures consistent automation behavior

Find more details about how to choose the right model on our [Model Evaluation](https://www.stagehand.dev/evals) page.

Small models on **Ollama** struggle with consistent structured outputs. While technically supported, we don’t recommend them for production Stagehand workflows.

##

[​

](#environment-variables-setup)

Environment Variables Setup

Set up your API keys before configuring Stagehand:

.env

Copy

Ask AI

```
# Choose one or more providers
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
GOOGLE_API_KEY=your_google_key_here
GROQ_API_KEY=your_groq_key_here
```

##

[​

](#supported-providers)

Supported Providers

Stagehand supports major LLM providers with structured output capabilities:

###

[​

](#production-ready-providers)

Production-Ready Providers

Provider

Best Models

Strengths

Use Case

**OpenAI**

`gpt-4.1`, `gpt-4.1-mini`

High accuracy, reliable

Production, complex sites

**Anthropic**

`claude-3-7-sonnet-latest`

Excellent reasoning

Complex automation tasks

**Google**

`gemini-2.5-flash`, `gemini-2.5-pro`

Fast, cost-effective

High-volume automation

###

[​

](#additional-providers)

Additional Providers

Show More Providers

-   **Groq** - `llama-3.3-70b-versatile` (Good for speed critical applications)
-   **xAI** - `grok-beta` (Good for complex reasoning)
-   **Azure** - Enterprise OpenAI deployment
-   **Cerebras** - High-speed inference
-   **TogetherAI** - Open-source models
-   **Mistral** - `mixtral-8x7b-32768` (European option)
-   **DeepSeek** - Cost-effective alternative
-   **Perplexity** - Real-time web data
-   **Ollama** - Local deployment (limited accuracy)
-   **Run any model included in AI SDK** - Find supported models in the [Vercel AI SDK](https://sdk.vercel.ai/providers/ai-sdk-providers) (Follow the guide [here](#vercel-ai-sdk) to get started.)

##

[​

](#basic-configuration)

Basic Configuration

###

[​

](#model-name-format)

Model Name Format

Stagehand uses the format `provider/model-name` for model specification. **Examples:**

-   OpenAI: `openai/gpt-4.1`
-   Anthropic: `anthropic/claude-3-7-sonnet-latest`
-   Google: `google/gemini-2.5-flash` (Recommended)

###

[​

](#quick-start-examples)

Quick Start Examples

-   Google (Recommended)
-   OpenAI
-   Anthropic

TypeScript

Python

Copy

Ask AI

```
import { Stagehand } from "@browserbasehq/stagehand";

const stagehand = new Stagehand({
  modelName: "google/gemini-2.5-flash",
  modelClientOptions: {
    apiKey: process.env.GOOGLE_API_KEY,
  },
});
```

##

[​

](#custom-llm-integration)

Custom LLM Integration

Only [LiteLLM compatible providers](https://docs.litellm.ai/docs/providers) are available in Python. Some may require extra setup.

Integrate any LLM with Stagehand using custom clients. The only requirement is **structured output support** for consistent automation behavior.

###

[​

](#vercel-ai-sdk)

Vercel AI SDK

The [Vercel AI SDK](https://sdk.vercel.ai/providers/ai-sdk-providers) is a popular library for interacting with LLMs. You can use any of the providers supported by the Vercel AI SDK to create a client for your model, **as long as they support structured outputs**. Vercel AI SDK supports providers for OpenAI, Anthropic, and Google, along with support for **Amazon Bedrock** and **Azure OpenAI**. For a full list, see the [Vercel AI SDK providers page](https://sdk.vercel.ai/providers/ai-sdk-providers). To get started, you’ll need to install the `ai` package (version 4) and the provider you want to use (version 1 - both need to be compatible with LanguageModelV1). For example, to use Amazon Bedrock, you’ll need to install the `@ai-sdk/amazon-bedrock` package. You’ll also need to import the [Vercel AI SDK external client](https://github.com/browserbase/stagehand/blob/main/lib/llm/aisdk.ts) through Stagehand to create a client for your model.

-   npm
-   pnpm
-   yarn

Copy

Ask AI

```
npm install ai@4 @ai-sdk/amazon-bedrock@1
```

The `AISdkClient` is not yet available via the Stagehand npm package. For now, install Stagehand as a git repository to access the `AISdkClient` (this will be included in the npm package in an upcoming release).

-   npm
-   pnpm
-   yarn

Copy

Ask AI

```
npm install @browserbasehq/stagehand@git+https://github.com/browserbase/stagehand.git
```

Copy

Ask AI

```
// Install/import the provider you want to use.
// For example, to use Azure OpenAI, import { createAzure } from '@ai-sdk/azure';
import { bedrock } from "@ai-sdk/amazon-bedrock";
// @ts-ignore
import { AISdkClient } from "@browserbasehq/stagehand";

const stagehand = new Stagehand({
  llmClient: new AISdkClient({
	model: bedrock("anthropic.claude-3-7-sonnet-20250219-v1:0"),
  }),
});
```

##

[​

](#troubleshooting)

Troubleshooting

###

[​

](#common-issues)

Common Issues

Model doesn't support structured outputs

**Error**: `Model does not support structured outputs`**Solution**: Use models that support function calling/structured outputs. The minimum requirements are:

-   Model must support JSON/structured outputs
-   Model must have strong reasoning capabilities
-   Model must be able to handle complex instructions

For each provider, use their latest models that meet these requirements. Some examples:

-   **OpenAI**: GPT-4 series or newer
-   **Anthropic**: Claude 3 series or newer
-   **Google**: Gemini 2 series or newer
-   **Other providers**: Latest models with structured output support

**Note**: Avoid base language models without structured output capabilities or fine-tuning for instruction following. When in doubt, check our [Model Evaluation](https://www.stagehand.dev/evals) page for up-to-date recommendations.

Authentication errors

**Error**: `Invalid API key` or `Unauthorized`**Solution**:

-   Verify your environment variables are set correctly
-   Check API key permissions and quotas
-   Ensure you’re using the correct API key for the provider
-   For Anthropic, make sure you have access to the Claude API

Inconsistent automation results

**Symptoms**: Actions work sometimes but fail other times**Causes & Solutions**:

-   **Weak models**: Use more capable models - check our [Model Evaluation](https://www.stagehand.dev/evals) page for current recommendations
-   **High temperature**: Set temperature to 0 for deterministic outputs
-   **Complex pages**: Switch to models with higher accuracy scores on our [Model Evaluation](https://www.stagehand.dev/evals) page
-   **Rate limits**: Implement retry logic with exponential backoff
-   **Context limits**: Reduce page complexity or use models with larger context windows
-   **Prompt clarity**: Ensure your automation instructions are clear and specific

Slow performance

**Issue**: Automation takes too long to respond**Solutions**:

-   **Use fast models**: Choose models optimized for speed
    -   Any model with < 1s response time
    -   Models with “fast” or “flash” variants
-   **Optimize settings**:
    -   Use `verbose: 0` to minimize token usage
    -   Set temperature to 0 for fastest processing
    -   Keep max tokens as low as possible
-   **Consider local deployment**: Local models can provide lowest latency
-   **Batch operations**: Group multiple actions when possible

High costs

**Issue**: LLM usage costs are too high**Cost Optimization Strategies**:

1.  **Switch to cost-effective models**:
    -   Check our [Model Evaluation](https://www.stagehand.dev/evals) page for current cost-performance benchmarks
    -   Choose models with lower cost per token that still meet accuracy requirements
    -   Consider models optimized for speed to reduce total runtime costs
2.  **Optimize token usage**:
    -   Set `verbose: 0` to reduce logging overhead
    -   Use concise prompts and limit response length
3.  **Smart model selection**: Start with cheaper models, fallback to premium ones only when needed
4.  **Cache responses**: Implement LLM response caching for repeated automation patterns
5.  **Monitor usage**: Set up billing alerts and track costs per automation run
6.  **Batch processing**: Process multiple similar tasks together

###

[​

](#next-steps)

Next Steps

[

## Choose Models

See our Model Evaluation page

](https://www.stagehand.dev/evals)[

## Test Models

Evaluate performance on your specific use cases in our Model Evaluation guide

](/configuration/evals)[

## Track Costs

Monitor token usage and set alerts using our Observability tools

](/configuration/observability)[

## Cache Results

Store successful patterns using our Caching Guide

](/best-practices/caching)

[Logging](/configuration/logging)[Evaluations](/configuration/evals)

[x](https://x.com/stagehanddev)[github](https://github.com/browserbase/stagehand)[linkedin](https://linkedin.com/company/browserbasehq)[slack](https://stagehand.dev/slack)

[Powered by Mintlify](https://mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=stagehand)

Assistant

Responses are generated using AI and may contain mistakes.