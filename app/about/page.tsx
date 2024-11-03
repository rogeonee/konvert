import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function About() {
  return (
    <div className="mx-auto max-w-prose pt-11 sm:py-3">
      <article className="prose dark:prose-invert">
        <h1 className="text-4xl font-semibold mb-8">Why Konvert Exists</h1>
        <div className="dark:text-[var(--custom-dark-font-color)]">
          <p className="my-5">
            Konvert started back in August 2024, when I needed to convert an
            image to a different format, because something somewhere wasn’t
            accepted. Sure, there were plenty of format converters out there —
            but most were overloaded with options, designed like something
            straight from the early 2010s, and often lacked focus. Being a fan
            of clean, black-and-white, functional design (thanks,{' '}
            <Link
              href={'https://vercel.com/about'}
              target="_blank"
              className="text-primary underline"
            >
              Vercel
            </Link>{' '}
            and{' '}
            <Link
              href={'https://ui.shadcn.com/docs'}
              target="_blank"
              className="text-primary underline"
            >
              shadcn
            </Link>
            !),{' '}
            <span className="line-through">
              and making every website look the same
            </span>
            , I decided to build my own converter that would:
          </p>
          <ol>
            <li>1. Get the job done, fast and simple</li>
            <li>2. Minimize settings — no excessive toggles</li>
            <li>3. Look sleek and modern</li>
            <li>4. Be mobile-first and easy to use</li>
          </ol>
          <p className="my-5">
            Starting out with “any format to any format” conversion quickly
            proved more complex than I’d thought, needing a robust backend
            setup. So I decided to focus on one of the trickiest formats
            instead: HEIC. Yes, Apple — every iPhone shoots in HEIC by default,
            yet Safari, your own browser, doesn’t support it. So for the initial
            release, Konvert centers on converting HEIC to JPG or PNG.
          </p>
          <p className="mt-5 mb-8">
            Beyond that, I decided: why even send these heavy images to a
            server? Modern browsers can handle conversion perfectly well without
            data leaving your device — <span className="font-bold">faster</span>
            , <span className="font-bold">more secure</span>, and your photos
            stay <span className="font-bold">private</span>, without ever
            leaving your device.
          </p>
          <Separator orientation="horizontal" />
          <p className="mt-8 mb-5">
            Whether or not people need another converter, time will tell. I
            definitely have plans to add support for other lesser-used formats
            (looking at you, WEBP) and will continue expanding Konvert’s
            capabilities over time. If you run into any bugs, have requests for
            new features, or just want to share feedback, I’d love to hear from
            you.
          </p>
          <p className="mt-5 mb-5">Stay tuned for updates!</p>
        </div>
      </article>
    </div>
  );
}
