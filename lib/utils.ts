import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filterFiles = (extension: string, files: File[]) => {
  const validFiles = files.filter((file) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    return ext === extension;
  });

  return validFiles;
};
