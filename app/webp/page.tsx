import type { Metadata } from 'next';
import WebpConverter from '@/components/webp';

export const metadata: Metadata = {
  title: 'WEBP',
  description:
    'Easily convert WEBP images to JPG or PNG online. Fast, secure, and 100% browser-based with no uploads required.',
  keywords: [
    'WEBP to JPG',
    'WEBP to PNG',
    'convert WEBP online',
    'free WEBP converter',
    'online image format converter',
    'batch WEBP conversion',
  ],
  alternates: {
    canonical: 'https://www.knvrt.one/webp',
  },
  openGraph: {
    title: 'WEBP | Konvert',
    description:
      'Easily convert WEBP images to JPG or PNG online. Fast, secure, and 100% browser-based with no uploads required.',
    url: 'https://www.knvrt.one/webp',
    images: [
      {
        url: 'https://www.knvrt.one/webp-og.png',
        width: 1200,
        height: 630,
        alt: 'Convert WEBP to JPG or PNG online with Konvert.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WEBP | Konvert',
    description:
      'Easily convert WEBP images to JPG or PNG online. Fast, secure, and 100% browser-based with no uploads required.',
    images: [
      {
        url: 'https://www.knvrt.one/webp-og.png',
        alt: 'Convert WEBP to JPG or PNG online with Konvert.',
      },
    ],
  },
};

const WebpPage = () => {
  return <WebpConverter />;
};

export default WebpPage;
