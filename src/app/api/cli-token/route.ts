import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

/**
 * GET /api/cli-token
 * Returns the current session token for CLI authentication
 */
export async function GET(request: NextRequest) {
  try {
    const { userId, sessionId } = await auth();

    if (!userId || !sessionId) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'You must be signed in to get a CLI token' },
        { status: 401 }
      );
    }

    // Get the session token from cookies
    const sessionToken = request.cookies.get('__session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'No session token found', message: 'Could not retrieve session token' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      token: sessionToken,
      userId,
      message: 'Use this token in your CLI by running: docextract login'
    });
  } catch (error) {
    console.error('Error getting CLI token:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to get CLI token' },
      { status: 500 }
    );
  }
}
