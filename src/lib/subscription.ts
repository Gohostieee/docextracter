import { auth } from "@clerk/nextjs/server";

/**
 * Check if the current user has an active subscription with the 'extracter' feature
 * Uses Clerk's native billing system (Beta)
 * 
 * Plan: paid_subscription
 * Feature: extracter
 */
export async function checkSubscription(): Promise<boolean> {
  try {
    const { userId, has } = await auth();
    
    if (!userId) {
      return false;
    }

    // Check if user has the 'extracter' feature using Clerk's native billing
    // This uses Clerk's has() method from the Beta billing feature
    const hasExtractorFeature = has({ feature: 'extracter' });

    return hasExtractorFeature;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return false;
  }
}

