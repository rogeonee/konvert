import type { Metadata } from 'next';

const description =
  'Fast, secure, and free image conversion, all in your browser. No uploads required, 100% privacy guaranteed.';

export const GlobalMeta: Metadata = {
  metadataBase: new URL('https://www.knvrt.one/'),
  title: {
    template: '%s | Konvert',
    default: 'Konvert - Image Format Converter',
  },
  description: description,
  applicationName: 'Konvert',
  referrer: 'origin-when-cross-origin',
  generator: 'Next.js',
  keywords: [
    'HEIC to JPG',
    'WEBP to JPG',
    'AVIF to JPG',
    'image format converter',
    'HEIC to PNG',
    'WEBP to PNG',
    'AVIF to PNG',
    'online converter',
    'free HEIC converter',
    'free WEBP converter',
    'free AVIF converter',
  ],
  authors: [{ name: 'Egor Bezriadin', url: 'https://www.rogeonee.com/' }],
  creator: 'Egor Bezriadin',
  publisher: 'Egor Bezriadin',
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Konvert - Image Format Converter',
    description:
      'Fast, secure, and free image conversion, all in your browser. No uploads required, 100% privacy guaranteed.',
    url: 'https://www.knvrt.one/',
    siteName: 'Konvert',
    images: [
      {
        url: 'https://www.knvrt.one/og/main-og.png',
        width: 1200,
        height: 630,
        alt: 'Konvert - Fast and Secure Image Converter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Konvert - Image Format Converter',
    description:
      'Fast, secure, and free image conversion, all in your browser. No uploads required, 100% privacy guaranteed.',
    creator: '@roge_one_',
    images: [
      {
        url: 'https://www.knvrt.one/og/main-og.png',
        alt: 'Konvert - Fast and Secure Image Converter',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.knvrt.one/',
    languages: {
      'en-US': 'https://www.knvrt.one/',
    },
  },
};
