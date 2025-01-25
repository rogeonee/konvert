import type { Metadata } from 'next';
import Heic from '@/components/heic';

export const metadata: Metadata = {
  title: 'HEIC',
  description:
    'Easily convert HEIC images to JPG or PNG online. Fast, secure, and 100% browser-based with no uploads required.',
  keywords: [
    'HEIC to JPG',
    'HEIC to PNG',
    'convert HEIC online',
    'free HEIC converter',
    'iPhone photo converter',
    'batch HEIC conversion',
  ],
  alternates: {
    canonical: 'https://www.knvrt.one/heic',
  },
  openGraph: {
    title: 'HEIC | Konvert',
    description:
      'Easily convert HEIC images to JPG or PNG online. Fast, secure, and 100% browser-based with no uploads required.',
    url: 'https://www.knvrt.one/heic',
    images: [
      {
        url: 'https://www.knvrt.one/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Convert HEIC to JPG or PNG online with Konvert.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HEIC | Konvert',
    description:
      'Easily convert HEIC images to JPG or PNG online. Fast, secure, and 100% browser-based with no uploads required.',
    images: [
      {
        url: 'https://www.knvrt.one/og-image.png',
        alt: 'Convert HEIC to JPG or PNG online with Konvert.',
      },
    ],
  },
};

const HeicPage = () => {
  return <Heic />;
};

export default HeicPage;
