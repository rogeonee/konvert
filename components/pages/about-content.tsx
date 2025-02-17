import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { BlurFade } from '@/components/ui/blur-fade';

export default function AboutContent() {
  return (
    <article className="p-4 prose dark:prose-invert">
      <BlurFade className="text-3xl sm:text-4xl font-semibold mb-8" delay={0}>
        <h1>About Konvert</h1>
      </BlurFade>

      <BlurFade delay={0.2}>
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
            I decided to focus on the most inconvenient formats, that I
            encountered more often than I wanted to. So, now Konvert supports
            HEIC, WEBP and AVIF, to the most common and comfortable for everyone
            JPEG, the most widely used format, and PNG for those who prioritize
            quality.
          </p>
          <p className="my-5">
            Best part? Your photos never leave your device. Modern browsers
            handle conversion locally — it’s faster, more secure, and completely
            private.
          </p>
        </div>
      </BlurFade>

      <Separator orientation="horizontal" className="my-5" />

      <BlurFade delay={0.4}>
        <h2 className="text-xl sm:text-2xl font-semibold mb-5">
          What’s Next 👀
        </h2>
        <div className="dark:text-[var(--custom-dark-font-color)]">
          <p className="my-5">
            I’m still debating whether to expand into “any to any format”, the
            market is flooded with those after all. I was against adding
            advanced options before, but maybe features like keeping EXIF
            metadata could be useful.
          </p>
          <p className="my-5">
            Anyway. Found a bug? Have a feature request? I’d love to hear from
            you.
          </p>
        </div>
      </BlurFade>

      <Separator orientation="horizontal" className="my-5" />

      <BlurFade delay={0.6}>
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
            improvements. Oh, and if you’re curious about what else I’m
            building, you can check out my other work{' '}
            <Link
              href={'https://www.rogeonee.com/'}
              target="_blank"
              className="text-primary underline underline-offset-4"
            >
              here
            </Link>
            .
          </p>
        </div>
      </BlurFade>
    </article>
  );
}
