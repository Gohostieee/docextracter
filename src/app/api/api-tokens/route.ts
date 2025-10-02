import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createApiToken, listApiTokens, deleteApiToken } from '@/lib/api-tokens';

/**
 * GET /api/api-tokens
 * List all API tokens for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const tokens = await listApiTokens(userId);

    return NextResponse.json({
      success: true,
      tokens,
    });
  } catch (error) {
    console.error('Error listing API tokens:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/api-tokens
 * Create a new API token
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Token name is required' },
        { status: 400 }
      );
    }

    const { token, id } = await createApiToken(userId, name.trim());

    return NextResponse.json({
      success: true,
      token,
      id,
      message: 'API token created successfully. Save it now - you won\'t be able to see it again!',
    });
  } catch (error) {
    console.error('Error creating API token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/api-tokens/:id
 * Delete an API token
 */
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const tokenId = url.searchParams.get('id');

    if (!tokenId) {
      return NextResponse.json(
        { error: 'Token ID is required' },
        { status: 400 }
      );
    }

    await deleteApiToken(userId, tokenId);

    return NextResponse.json({
      success: true,
      message: 'API token deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting API token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
