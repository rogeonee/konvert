/// <reference lib="webworker" />

import {
  WorkerMessage,
  WorkerResultMessage,
  postProgress,
} from './workerUtils';

self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const { id, fileBuffer, filename, format, quality } = event.data;
  try {
    // Notify progress
    postProgress({ id, type: 'progress', filename, progress: 5 });

    // Load the image from the buffer
    const blob = new Blob([fileBuffer], { type: 'image/webp' });
    const img = await createImageBitmap(blob);
    postProgress({ id, type: 'progress', filename, progress: 50 });

    // Draw on OffscreenCanvas
    const canvas = new OffscreenCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error(
        'OffscreenCanvas not supported or no 2D context available',
      );
    }
    ctx.drawImage(img, 0, 0);
    postProgress({ id, type: 'progress', filename, progress: 70 });

    // Convert to desired format
    const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;
    const convertedBlob = await canvas.convertToBlob({
      type: mimeType,
      quality,
    });
    postProgress({ id, type: 'progress', filename, progress: 90 });

    // Send result back
    const result: WorkerResultMessage = {
      id,
      type: 'result',
      filename,
      blob: convertedBlob,
      format: format === 'jpg' ? 'jpeg' : format,
    };
    (self as unknown as Worker).postMessage(result);
  } catch (err) {
    console.error('Worker conversion error:', err);
  } finally {
    postProgress({ id, type: 'progress', filename, progress: 100 });
  }
};
