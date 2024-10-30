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
        type: 'image/x-icon', // Retained for compatibility with older browsers
      },
      {
        url: '/favicon-96x96.png', // New icon for standard usage
        sizes: '96x96',
        type: 'image/png',
      },
      {
        url: '/favicon.svg', // New SVG format icon
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png', // Updated Apple touch icon
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
};
