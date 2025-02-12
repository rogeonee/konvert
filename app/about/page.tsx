import type { Metadata } from 'next';
import AboutContent from '@/components/pages/about-content';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Konvert, the fast, secure, and free image converter built for the modern web. Discover the story behind the project and future plans.',
  keywords: [
    'About Konvert',
    'image format converter story',
    'free online converter',
    'modern web converter',
    'HEIC to JPG converter origin',
    'future of Konvert',
  ],
  alternates: {
    canonical: 'https://www.knvrt.one/about',
  },
  openGraph: {
    title: 'About Konvert',
    description:
      'Learn more about Konvert, the fast, secure, and free image converter built for the modern web. Discover the story behind the project and future plans.',
    url: 'https://www.knvrt.one/about',
    images: [
      {
        url: 'https://www.knvrt.one/og/main-og.png',
        width: 1200,
        height: 630,
        alt: 'Learn more about Konvert - the sleek and secure image converter.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Konvert',
    description:
      'Learn more about Konvert, the fast, secure, and free image converter built for the modern web. Discover the story behind the project and future plans.',
    images: [
      {
        url: 'https://www.knvrt.one/og/main-og.png',
        alt: 'Learn more about Konvert - the sleek and secure image converter.',
      },
    ],
  },
};

export default function About() {
  return (
    <div className="mx-auto max-w-prose pt-11 sm:py-3">
      <AboutContent />
    </div>
  );
}
