import { chromium, Browser } from "playwright";
import Browserbase from "@browserbasehq/sdk";

export async function initBrowser(): Promise<Browser> {

  const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
  const session = await bb.sessions.create({
    projectId: process.env.BROWSERBASE_PROJECT_ID!,
    // Add configuration options here
  });

  const browser = await chromium.connectOverCDP(session.connectUrl);

  return browser;
}
