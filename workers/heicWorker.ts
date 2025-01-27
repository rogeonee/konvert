/// <reference lib="webworker" />

import decode from 'heic-decode';
import {
  WorkerMessage,
  WorkerResultMessage,
  postProgress,
} from './workerUtils';

// OffscreenCanvas is used to create a PNG/JPEG blob from the raw RGBA data

self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const { id, fileBuffer, filename, format, quality } = event.data;
  try {
    // 1. Tell main thread we started decoding
    postProgress({ id, type: 'progress', filename, progress: 5 });

    // 2. Decode the .heic buffer to get RGBA
    const { width, height, data } = await decode({
      // @ts-ignore
      buffer: new Uint8Array(fileBuffer),
    });
    postProgress({ id, type: 'progress', filename, progress: 50 });

    // 3. Create an OffscreenCanvas and draw the image
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error(
        'OffscreenCanvas not supported or no 2D context available',
      );
    }

    // 4. Put the raw RGBA data into the canvas
    const imageData = new ImageData(new Uint8ClampedArray(data), width, height);
    ctx.putImageData(imageData, 0, 0);
    postProgress({ id, type: 'progress', filename, progress: 70 });

    // 5. Convert to desired format with given quality (quality only works for jpg)
    const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;
    const blob = await canvas.convertToBlob({
      type: mimeType,
      quality: quality,
    });
    postProgress({ id, type: 'progress', filename, progress: 90 });

    // 6. Send the result back to main thread
    const result: WorkerResultMessage = {
      id,
      type: 'result',
      filename,
      blob,
      format: format === 'jpg' ? 'jpeg' : format,
    };

    (self as unknown as Worker).postMessage(result);
  } catch (err) {
    console.error('Worker decode error:', err);
  } finally {
    postProgress({ id, type: 'progress', filename, progress: 100 });
  }
};
