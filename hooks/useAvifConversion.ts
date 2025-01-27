import { setupAvifWorker } from '@/workers/worker-setup';
import { useImageConversion } from '@/hooks/useConversion';

export const useAvifConversion = () => {
  return useImageConversion(setupAvifWorker);
};
