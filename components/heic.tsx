'use client';

import Converter from '@/components/converter';
import { filterHeicFiles } from '@/lib/utils';
import { useHeicConversion } from '@/hooks/useHeicConversion';

export default function HeicConverter() {
  return (
    <Converter
      acceptedFileExtension={'.heic'}
      formatName="HEIC"
      filterFiles={filterHeicFiles}
      conversionHook={useHeicConversion}
      defaultOutputFormat="jpg"
    />
  );
}
