import { chromium, Browser } from "playwright";
import Browserbase from "@browserbasehq/sdk";
import { Stagehand } from "@browserbasehq/stagehand";

export async function initBrowser(): Promise<Browser> {

  const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
  const session = await bb.sessions.create({
    projectId: process.env.BROWSERBASE_PROJECT_ID!,
    // Add configuration options here
  });

  const browser = await chromium.connectOverCDP(session.connectUrl);

  return browser;
}

export async function initStagehand(): Promise<Stagehand> {
  try {
    const stagehand = new Stagehand({
      env: "BROWSERBASE",
      apiKey: process.env.BROWSERBASE_API_KEY!,
      projectId: process.env.BROWSERBASE_PROJECT_ID!,
      modelName: "gpt-4o",
      modelClientOptions: {
        apiKey: process.env.OPENAI_API_KEY!,
      },
    });
    await stagehand.init();
    return stagehand;
  } catch (error) {
    console.error("Failed to initialize Stagehand:", error);
    throw error;
  }
}