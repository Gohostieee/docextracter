// Simple in-memory store for extraction progress
type ProgressUpdate = {
  type: 'progress' | 'complete' | 'error';
  step?: number;
  stepName?: string;
  message: string;
  progress?: number; // 0-100
  timestamp: string;
  details?: any;
};

type ExtractionProgress = {
  id: string;
  status: 'processing' | 'complete' | 'error';
  updates: ProgressUpdate[];
  result?: any;
  error?: string;
};

// Ensure a single global store across hot reloads / route files
declare global {
  // eslint-disable-next-line no-var
  var __progressStore: Map<string, ExtractionProgress> | undefined;
}

const progressStore: Map<string, ExtractionProgress> =
  globalThis.__progressStore ?? new Map<string, ExtractionProgress>();

globalThis.__progressStore = progressStore;

// Filesystem-backed persistence to ensure cross-process visibility
import fs from 'node:fs';
import path from 'node:path';

const PROGRESS_DIR = path.join(process.cwd(), 'server', 'generated', 'progress');

function ensureProgressDir() {
  try {
    fs.mkdirSync(PROGRESS_DIR, { recursive: true });
  } catch {}
}

function progressFilePath(id: string): string {
  return path.join(PROGRESS_DIR, `${id}.json`);
}

function writeProgressToDisk(progress: ExtractionProgress) {
  try {
    ensureProgressDir();
    fs.writeFileSync(progressFilePath(progress.id), JSON.stringify(progress), 'utf8');
  } catch (e) {
    console.error('[progress-store] Failed to write progress file:', e);
  }
}

function readProgressFromDisk(id: string): ExtractionProgress | undefined {
  try {
    const file = progressFilePath(id);
    if (!fs.existsSync(file)) return undefined;
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data) as ExtractionProgress;
  } catch (e) {
    console.error('[progress-store] Failed to read progress file:', e);
    return undefined;
  }
}

// Clean up old progress entries after 10 minutes
setInterval(() => {
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
  for (const [id, progress] of progressStore.entries()) {
    const lastUpdate = new Date(progress.updates[progress.updates.length - 1]?.timestamp || 0).getTime();
    if (lastUpdate < tenMinutesAgo) {
      progressStore.delete(id);
    }
  }
}, 60 * 1000); // Run every minute

export function createProgress(id: string) {
  const initial: ExtractionProgress = {
    id,
    status: 'processing',
    updates: [],
  };
  progressStore.set(id, initial);
  writeProgressToDisk(initial);
}

export function addProgressUpdate(id: string, update: Omit<ProgressUpdate, 'timestamp'>) {
  const progress = progressStore.get(id);
  let current = progress;
  if (!current) {
    // Attempt to hydrate from disk if missing in memory
    current = readProgressFromDisk(id);
    if (current) {
      progressStore.set(id, current);
    }
  }
  if (!current) return;

  current.updates.push({
    ...update,
    timestamp: new Date().toISOString(),
  });
  writeProgressToDisk(current);
}

export function completeProgress(id: string, result?: any) {
  const progress = progressStore.get(id);
  let current = progress;
  if (!current) {
    current = readProgressFromDisk(id);
    if (current) progressStore.set(id, current);
  }
  if (!current) return;

  current.status = 'complete';
  current.result = result;
  current.updates.push({
    type: 'complete',
    message: 'Extraction completed successfully',
    timestamp: new Date().toISOString(),
  });
  writeProgressToDisk(current);
}

export function errorProgress(id: string, error: string) {
  const progress = progressStore.get(id);
  let current = progress;
  if (!current) {
    current = readProgressFromDisk(id);
    if (current) progressStore.set(id, current);
  }
  if (!current) return;

  current.status = 'error';
  current.error = error;
  current.updates.push({
    type: 'error',
    message: error,
    timestamp: new Date().toISOString(),
  });
  writeProgressToDisk(current);
}

export function getProgress(id: string): ExtractionProgress | undefined {
  const inMem = progressStore.get(id);
  if (inMem) return inMem;
  const onDisk = readProgressFromDisk(id);
  if (onDisk) progressStore.set(id, onDisk);
  return onDisk;
}
