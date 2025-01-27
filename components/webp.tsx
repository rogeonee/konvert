'use client';

import Converter from '@/components/converter';
import { filterFiles } from '@/lib/utils';
import { useWebpConversion } from '@/hooks/useWebpConversion';

export default function WebpConverter() {
  return (
    <Converter
      acceptedFileExtension={'.webp'}
      formatName="WEBP"
      filterFiles={filterFiles}
      conversionHook={useWebpConversion}
      defaultOutputFormat="jpg"
    />
  );
}
