import { NextRequest, NextResponse } from 'next/server';
import { getProgress, createProgress } from '../progress-store';

// Force Node.js runtime and dynamic rendering to avoid caching issues with SSE
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// SSE endpoint for real-time updates (EventSource uses GET)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  console.log('[Progress API GET] Request for ID:', id);

  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  // Check if this is an SSE request (we'll use a query param to differentiate)
  const useSSE = searchParams.get('sse') === 'true';

  if (!useSSE) {
    // Regular polling endpoint - return current progress as JSON
    const progress = getProgress(id);
    if (!progress) {
      console.log('[Progress API GET] Progress not found for ID:', id);
      return NextResponse.json({ error: 'Progress not found' }, { status: 404 });
    }
    console.log('[Progress API GET] Returning progress:', progress);
    return NextResponse.json(progress);
  }

  // SSE streaming endpoint
  const encoder = new TextEncoder();
  let lastUpdateIndex = 0;
  let waitAttempts = 0;
  const MAX_WAIT_ATTEMPTS = 120; // Wait up to 60 seconds (120 * 500ms)

  const stream = new ReadableStream({
    async start(controller) {
      console.log('[Progress API SSE] Stream started for ID:', id);

      // Create progress entry immediately if it doesn't exist
      // This prevents race condition where SSE connects before POST creates progress
      if (!getProgress(id)) {
        console.log('[Progress API SSE] Creating progress entry for:', id);
        createProgress(id);
      }

      // Send initial handshake event to client
      try {
        controller.enqueue(encoder.encode(`event: message\n`));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'progress', message: 'Connected', progress: 0, timestamp: new Date().toISOString() })}\n\n`));
      } catch (e) {
        console.error('[Progress API SSE] Failed to send handshake:', e);
      }

      // If there are already updates, flush them immediately
      const existing = getProgress(id);
      if (existing && existing.updates.length > 0) {
        for (const update of existing.updates) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(update)}\n\n`));
        }
        lastUpdateIndex = existing.updates.length;
      }

      let keepAliveTick = 0;
      const interval = setInterval(() => {
        const progress = getProgress(id);

        if (!progress) {
          waitAttempts++;
          // Keep waiting and send periodic keep-alive to prevent proxy timeouts
          if (waitAttempts % 4 === 0) {
            controller.enqueue(encoder.encode(`: keep-alive\n\n`));
          }
          if (waitAttempts >= MAX_WAIT_ATTEMPTS) {
            console.log('[Progress API SSE] Still waiting for progress after max attempts, continuing to wait:', id);
          }
          return;
        }

        // Reset wait attempts once we find the progress
        if (waitAttempts > 0) {
          console.log(`[Progress API SSE] Progress found after ${waitAttempts} attempts`);
          waitAttempts = 0;
        }

        // Send only new updates
        const newUpdates = progress.updates.slice(lastUpdateIndex);
        if (newUpdates.length > 0) {
          console.log(`[Progress API SSE] Sending ${newUpdates.length} new updates for ID:`, id);
        }

        for (const update of newUpdates) {
          const message = `data: ${JSON.stringify(update)}\n\n`;
          console.log('[Progress API SSE] Sending update:', update);
          controller.enqueue(encoder.encode(message));
        }
        lastUpdateIndex = progress.updates.length;

        // Close if complete or error
        if (progress.status === 'complete' || progress.status === 'error') {
          console.log('[Progress API SSE] Closing stream, status:', progress.status);
          clearInterval(interval);
          controller.close();
          return;
        }

        // Periodic keep-alive comment to keep connection open
        keepAliveTick++;
        if (keepAliveTick >= 30) { // ~15s (30 * 500ms)
          controller.enqueue(encoder.encode(`: keep-alive\n\n`));
          keepAliveTick = 0;
        }
      }, 500); // Poll every 500ms

      // Clean up on client disconnect
      request.signal.addEventListener('abort', () => {
        console.log('[Progress API SSE] Client disconnected for ID:', id);
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
