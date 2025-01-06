import type { Metadata } from 'next';

const title = 'Konvert - Free HEIC to JPG & PNG Converter';

const description =
  'Fast, secure, and free HEIC to JPG or PNG conversion, all in your browser. No uploads required, 100% privacy guaranteed.';

const keywords = [
  'HEIC to JPG',
  'convert HEIC to JPG online',
  'HEIC to PNG',
  'iPhone photo converter',
  'free HEIC converter',
  'batch HEIC conversion',
  'HEIC to JPEG',
  'online image format converter',
  'convert HEIC files',
  'secure HEIC to JPG',
];

export const GlobalMeta: Metadata = {
  metadataBase: new URL('https://konvert-sigma.vercel.app/'),
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export const HomeMeta: Metadata = {
  title: title,
  description: description,
  keywords: [
    'HEIC to JPG',
    'convert HEIC to JPG online',
    'HEIC to PNG',
    'iPhone photo converter',
    'free HEIC converter',
  ],
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_US',
    url: 'https://konvert-sigma.vercel.app/',
    siteName: 'Konvert',
    images: [
      {
        url: '/og-image.png',
        alt: 'Konvert Screenshot',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@roge_one_',
    title,
    description,
    images: [{ url: '/og-image.png', alt: 'Konvert Screenshot' }],
  },
};

export const AboutMeta: Metadata = {
  title: 'Konvert - About',
  description:
    'Learn more about Konvert, the free, secure tool for converting HEIC files to JPG or PNG.',
  openGraph: {
    title: 'About Konvert',
    description:
      'Learn more about Konvert, the free, secure tool for converting HEIC files to JPG or PNG.',
    url: 'https://konvert-sigma.vercel.app/about',
    images: [
      {
        url: '/og-image.png',
        alt: 'Konvert Screenshot',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@roge_one_',
    title: 'About Konvert',
    description:
      'Learn more about Konvert, the free, secure tool for converting HEIC files to JPG or PNG.',
    images: [{ url: '/og-image.png', alt: 'Konvert Screenshot' }],
  },
};
