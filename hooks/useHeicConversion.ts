import { setupHeicWorker } from '@/workers/worker-setup';
import { useImageConversion } from '@/hooks/useConversion';

export const useHeicConversion = () => {
  return useImageConversion(setupHeicWorker);
};
