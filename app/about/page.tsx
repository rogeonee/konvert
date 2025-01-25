import type { Metadata } from 'next';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

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
    title: 'About Konvert | Why It Exists and What’s Next',
    description:
      'Learn more about Konvert, the fast, secure, and free image converter built for the modern web. Discover the story behind the project and future plans.',
    url: 'https://www.knvrt.one/about',
    images: [
      {
        url: 'https://www.knvrt.one/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Learn more about Konvert - the sleek and secure image converter.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Konvert | Why It Exists and What’s Next',
    description:
      'Learn more about Konvert, the fast, secure, and free image converter built for the modern web. Discover the story behind the project and future plans.',
    images: [
      {
        url: 'https://www.knvrt.one/og-image.png',
        alt: 'Learn more about Konvert - the sleek and secure image converter.',
      },
    ],
  },
};

const About = () => {
  return (
    <div className="mx-auto max-w-prose pt-11 sm:py-3">
      <article className="prose dark:prose-invert">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-8">
          About Konvert
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-5">
          Why It Exists 🛰️
        </h2>
        <div className="dark:text-[var(--custom-dark-font-color)]">
          <p className="my-5">
            I needed to convert an image format in August 2024, and found myself
            drowning in converters from the early 2010s, all cluttered with
            endless options. Being a fan of clean, functional design (thanks,{' '}
            <Link
              href={'https://vercel.com/about'}
              target="_blank"
              className="text-primary underline underline-offset-4"
            >
              Vercel
            </Link>{' '}
            and{' '}
            <Link
              href={'https://ui.shadcn.com/docs'}
              target="_blank"
              className="text-primary underline underline-offset-4"
            >
              shadcn
            </Link>
            !), I built Konvert to be:
          </p>
          <ol>
            <li>1. Fast and simple</li>
            <li>2. Free of excessive settings</li>
            <li>3. Sleek and modern</li>
            <li>4. Mobile-first</li>
          </ol>
          <p className="my-5">
            Starting with “any to any format” proved complex, so I focused on
            solving one real problem: HEIC. Yes, Apple — iPhones shoot in HEIC
            by default, yet Safari doesn’t even support it. So Konvert focuses
            on converting HEIC to JPG or PNG.
          </p>
          <p className="my-5">
            Best part? Your photos never leave your device. Modern browsers
            handle conversion locally — it’s faster, more secure, and completely
            private.
          </p>
        </div>
        <Separator orientation="horizontal" className="my-5" />
        <h2 className="text-xl sm:text-2xl font-semibold mb-5">
          What’s Next 👀
        </h2>
        <div className="dark:text-[var(--custom-dark-font-color)]">
          <p className="my-5">
            Time will tell if we need another converter, but I have plans to
            support more formats (looking at you, WEBP) and expand Konvert’s
            capabilities. Found a bug? Have a feature request? I’d love to hear
            from you.
          </p>
        </div>
        <Separator orientation="horizontal" className="my-5" />
        <h2 className="text-xl sm:text-2xl font-semibold mb-5">
          Support the Project ☕
        </h2>
        <div className="dark:text-[var(--custom-dark-font-color)]">
          <p className="my-5">
            And if Konvert has made your life a bit simpler, (and you made it
            this far), consider{' '}
            <Link
              href={'https://buymeacoffee.com/rogeonee'}
              target="_blank"
              className="text-primary underline underline-offset-4"
            >
              buying me a coffee
            </Link>
            ! Your support helps keep the project running and motivates future
            improvements.
          </p>
        </div>
      </article>
    </div>
  );
};

export default About;
