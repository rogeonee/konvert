import type { Metadata } from 'next';
import Avif from '@/components/avif';

export const metadata: Metadata = {
  title: 'AVIF',
  description:
    'Easily convert AVIF images to JPG or PNG online. Fast, secure, and 100% browser-based with no uploads required.',
  keywords: [
    'AVIF to JPG',
    'AVIF to PNG',
    'convert AVIF online',
    'free AVIF converter',
    'online image format converter',
    'batch AVIF conversion',
  ],
  alternates: {
    canonical: 'https://www.knvrt.one/avif',
  },
  openGraph: {
    title: 'AVIF | Konvert',
    description:
      'Easily convert AVIF images to JPG or PNG online. Fast, secure, and 100% browser-based with no uploads required.',
    url: 'https://www.knvrt.one/avif',
    images: [
      {
        url: 'https://www.knvrt.one/avif-og.png',
        width: 1200,
        height: 630,
        alt: 'Convert AVIF to JPG or PNG online with Konvert.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AVIF | Konvert',
    description:
      'Easily convert AVIF images to JPG or PNG online. Fast, secure, and 100% browser-based with no uploads required.',
    images: [
      {
        url: 'https://www.knvrt.one/avif-og.png',
        alt: 'Convert AVIF to JPG or PNG online with Konvert.',
      },
    ],
  },
};

const AvifPage = () => {
  return <Avif />;
};

export default AvifPage;
