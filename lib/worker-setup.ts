export const setupWorker = () => {
  if (typeof window === 'undefined') return null;
  const worker = new Worker(
    new URL('../workers/heicWorker.ts', import.meta.url),
    { type: 'module' },
  );
  return worker;
};
