'use client';

import Converter from '@/components/converter';
import { filterFiles } from '@/lib/utils';
import { useAvifConversion } from '@/hooks/useAvifConversion';

export default function AvifConverter() {
  return (
    <Converter
      acceptedFileExtension={'.avif'}
      formatName="AVIF"
      filterFiles={filterFiles}
      conversionHook={useAvifConversion}
      defaultOutputFormat="jpg"
    />
  );
}
