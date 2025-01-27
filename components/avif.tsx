'use client';

import Converter from '@/components/converter';
import { filterAvifFiles } from '@/lib/utils';
import { useAvifConversion } from '@/hooks/useAvifConversion';

export default function AvifConverter() {
  return (
    <Converter
      acceptedFileExtension={'.avif'}
      formatName="AVIF"
      filterFiles={filterAvifFiles}
      conversionHook={useAvifConversion}
      defaultOutputFormat="jpg"
    />
  );
}
