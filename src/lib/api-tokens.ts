import { clerkClient } from '@clerk/nextjs/server';
import crypto from 'crypto';

export interface ApiToken {
  id: string;
  token: string;
  userId: string;
  name: string;
  createdAt: number;
  lastUsed?: number;
}

/**
 * Generate a secure API token
 */
export function generateApiToken(): string {
  // Format: dex_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (prefix + 44 random chars)
  const randomBytes = crypto.randomBytes(32);
  const token = `dex_${randomBytes.toString('base64url').substring(0, 44)}`;
  return token;
}

/**
 * Hash a token for storage (we store hashes, not plain tokens)
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Store API token in user's private metadata
 */
export async function createApiToken(userId: string, name: string): Promise<{ token: string; id: string }> {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const token = generateApiToken();
  const tokenHash = hashToken(token);
  const tokenId = crypto.randomBytes(8).toString('hex');

  const tokenData: Omit<ApiToken, 'token'> & { tokenHash: string } = {
    id: tokenId,
    tokenHash,
    userId,
    name,
    createdAt: Date.now(),
  };

  // Get existing tokens from metadata
  const existingTokens = (user.privateMetadata?.apiTokens as any[]) || [];

  // Add new token
  const updatedTokens = [...existingTokens, tokenData];

  // Update user metadata
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      ...user.privateMetadata,
      apiTokens: updatedTokens,
    },
  });

  // Return the plain token (only shown once)
  return { token, id: tokenId };
}

/**
 * Verify an API token and return the user ID
 */
export async function verifyApiToken(token: string): Promise<{ userId: string; tokenId: string } | null> {
  if (!token.startsWith('dex_')) {
    return null;
  }

  const tokenHash = hashToken(token);
  const client = await clerkClient();

  // Search for the token across all users (this is not ideal for scale, but works for now)
  // In production, you'd want a separate token database
  try {
    const users = await client.users.getUserList({ limit: 100 });

    for (const user of users.data) {
      const tokens = (user.privateMetadata?.apiTokens as any[]) || [];

      const matchingToken = tokens.find((t: any) => t.tokenHash === tokenHash);

      if (matchingToken) {
        // Update last used timestamp
        const updatedTokens = tokens.map((t: any) =>
          t.id === matchingToken.id ? { ...t, lastUsed: Date.now() } : t
        );

        await client.users.updateUserMetadata(user.id, {
          privateMetadata: {
            ...user.privateMetadata,
            apiTokens: updatedTokens,
          },
        });

        return { userId: user.id, tokenId: matchingToken.id };
      }
    }

    return null;
  } catch (error) {
    console.error('Error verifying API token:', error);
    return null;
  }
}

/**
 * List all API tokens for a user
 */
export async function listApiTokens(userId: string): Promise<Omit<ApiToken, 'token'>[]> {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const tokens = (user.privateMetadata?.apiTokens as any[]) || [];

  return tokens.map((t: any) => ({
    id: t.id,
    userId: t.userId,
    name: t.name,
    createdAt: t.createdAt,
    lastUsed: t.lastUsed,
  }));
}

/**
 * Delete an API token
 */
export async function deleteApiToken(userId: string, tokenId: string): Promise<void> {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const tokens = (user.privateMetadata?.apiTokens as any[]) || [];
  const updatedTokens = tokens.filter((t: any) => t.id !== tokenId);

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      ...user.privateMetadata,
      apiTokens: updatedTokens,
    },
  });
}
