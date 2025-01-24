import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filterHeicFiles = (files: File[]) => {
  const validFiles = files.filter((file) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension === 'heic';
  });

  return validFiles;
};

export const filterWebpFiles = (files: File[]) => {
  const validFiles = files.filter((file) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension === 'webp';
  });

  return validFiles;
};
