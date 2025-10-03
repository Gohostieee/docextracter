import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createApiToken } from '@/lib/api-tokens';

/**
 * GET /api/cli-token
 * Generates and returns a permanent API token for CLI authentication
 */
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'You must be signed in to get a CLI token' },
        { status: 401 }
      );
    }

    // Generate a permanent API token for CLI use
    const { token, id } = await createApiToken(userId, `CLI Token (${new Date().toISOString().split('T')[0]})`);

    return NextResponse.json({
      success: true,
      token,
      tokenId: id,
      userId,
      message: 'Use this token in your CLI by running: docextract login'
    });
  } catch (error) {
    console.error('Error generating CLI token:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to generate CLI token' },
      { status: 500 }
    );
  }
}
