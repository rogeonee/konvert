import { setupWebpWorker } from '@/workers/worker-setup';
import { useImageConversion } from '@/hooks/useConversion';

export const useWebpConversion = () => {
  return useImageConversion(setupWebpWorker);
};
