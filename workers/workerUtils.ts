export interface WorkerMessage {
  id: string;
  fileBuffer: ArrayBuffer;
  filename: string;
  format: string; // e.g., "jpg", "png", etc.
  quality: number; // 0.0 to 1.0
}

export interface WorkerProgressMessage {
  id: string;
  type: 'progress';
  filename: string;
  progress: number;
}

export interface WorkerResultMessage {
  id: string;
  type: 'result';
  filename: string;
  blob: Blob;
  format: string;
}

/**
 * Helper function to send progress updates from the worker to the main thread.
 */
export function postProgress(msg: WorkerProgressMessage): void {
  (self as unknown as Worker).postMessage(msg);
}
