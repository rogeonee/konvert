'use client';

import Converter from '@/components/converter';
import { filterFiles } from '@/lib/utils';
import { useHeicConversion } from '@/hooks/useHeicConversion';

export default function HeicConverter() {
  return (
    <Converter
      acceptedFileExtension={'.heic'}
      formatName="HEIC"
      filterFiles={filterFiles}
      conversionHook={useHeicConversion}
      defaultOutputFormat="jpg"
    />
  );
}
