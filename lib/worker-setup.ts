export const setupHeicWorker = () => {
  if (typeof window === 'undefined') return null;
  const worker = new Worker(
    new URL('../workers/heicWorker.ts', import.meta.url),
    { type: 'module' },
  );
  return worker;
};

export const setupWebpWorker = () => {
  if (typeof window === 'undefined') return null;
  const worker = new Worker(
    new URL('../workers/webpWorker.ts', import.meta.url),
    { type: 'module' },
  );
  return worker;
};
