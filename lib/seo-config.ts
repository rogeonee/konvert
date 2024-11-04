import type { Metadata } from 'next';

const title = 'Konvert';

const description = 'Secure HEIC to JPG conversion, right in your browser.';

const keywords = [
  'convert heic to jpg',
  'heic converter',
  'heic to jpeg online',
  'iphone heic converter',
  'convert iphone photos',
  'heic to png converter',
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
        url: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
};
