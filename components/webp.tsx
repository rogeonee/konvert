'use client';

import Converter from '@/components/converter';
import { filterWebpFiles } from '@/lib/utils';
import { useWebpConversion } from '@/hooks/useWebpConversion';

export default function WebpConverter() {
  return (
    <Converter
      acceptedFileExtension={'.webp'}
      formatName="WEBP"
      filterFiles={filterWebpFiles}
      conversionHook={useWebpConversion}
      defaultOutputFormat="jpg"
    />
  );
}
