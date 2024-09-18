import type { Metadata } from 'next';

const title = 'Konvert';

const description =
  'Minimalistic image format converter with Vercel-like design.';

const keywords = [
  'konvert',
  'image conversion',
  'format converter',
  'open source',
];

export const SEO: Metadata = {
  title: title,
  description: description,
  metadataBase: new URL('https://konvert-sigma.vercel.app/'),
  openGraph: {
    type: 'website',
    locale: 'en-US',
    url: 'https://konvert-sigma.vercel.app/',
    siteName: 'Konvert',
    description,
    title,
    images: [
      {
        url: 'https://konvert-sigma.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Konvert image format converter screenshot',
      },
    ],
  },
  twitter: {
    creator: '@roge_one_',
    card: 'summary_large_image',
    description,
    title,
    images: [
      {
        url: 'https://konvert-sigma.vercel.app/og-image.png',
        alt: 'Konvert image format converter screenshot',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
  keywords: keywords,
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};
