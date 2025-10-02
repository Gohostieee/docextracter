import { Stagehand } from "@browserbasehq/stagehand";

export async function initStagehand() {
  try {
    const stagehand = new Stagehand({
      env: "BROWSERBASE",
      apiKey: process.env.BROWSERBASE_API_KEY,
      projectId: process.env.BROWSERBASE_PROJECT_ID,
      modelName: "google/gemini-2.5-pro",
      modelClientOptions: {
        apiKey: process.env.GOOGLE_API_KEY,
      },
    });
    await stagehand.init();
    return stagehand;
  } catch (error) {
    console.error("Failed to initialize Stagehand:", error);
    throw error;
  }
}