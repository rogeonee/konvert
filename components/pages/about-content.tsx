import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { BlurFade } from '@/components/ui/blur-fade';

const AboutContent = () => {
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
      </BlurFade>

      <Separator orientation="horizontal" className="my-5" />

      <BlurFade delay={0.4}>
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
            improvements.
          </p>
        </div>
      </BlurFade>
    </article>
  );
};

export default AboutContent;
