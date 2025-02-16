import Link from 'next/link';
import { ChevronRight, Infinity, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';
import { BlurFade } from '@/components/ui/blur-fade';
import { GlowEffect } from '@/components/ui/glow-effect';

const formatCards = [
  {
    title: 'HEIC',
    path: '/heic',
    description:
      'Convert your HEIC images to universally compatible JPG format.',
  },
  {
    title: 'WEBP',
    path: '/webp',
    description: 'Need JPGs from WEBP? Konvert handles it seamlessly.',
  },
  {
    title: 'AVIF',
    path: '/avif',
    description: 'Unlock AVIF images by converting them to JPG with ease.',
  },
];

const whyKonvertItems = [
  {
    title: 'Client-side conversion',
    desc: 'Your files never leave your device, ensuring maximum privacy and security.',
    icon: ShieldCheck,
  },
  {
    title: 'Blazing fast',
    desc: 'Convert multiple images in seconds thanks to optimized local processing.',
    icon: Zap,
  },
  {
    title: 'No limitations',
    desc: 'Convert as many files as you need, with no restrictions or accounts.',
    icon: Infinity,
  },
];

const Landing = () => {
  return (
    <div className="relative bg-background overflow-hidden">
      {/* Animated grid bg */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={2}
        repeatDelay={1}
        className={cn(
          'absolute inset-0 z-0',
          '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
          'skew-y-12',
        )}
      />

      {/* Hero Section: fills the viewport */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <BlurFade delay={0.2}>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Konvert your images.
              <br />
              <span className="text-muted-foreground">Simple. Fast. Free.</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-lg max-w-md mx-auto">
              Effortlessly convert rare and tricky image formats right in your
              browser.
            </p>
          </div>
        </BlurFade>

        <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          {formatCards.map(({ title, path, description }, index) => (
            <BlurFade key={path} delay={0.3 + index * 0.1} inView>
              <Link
                href={path}
                className={cn(
                  'group p-6 rounded-lg border border-border flex flex-col justify-between h-full bg-card',
                  'hover:border-foreground transition-colors',
                  'transform-gpu transition-transform duration-300',
                  'hover:scale-[1.01] hover:-translate-y-1',
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-foreground">
                    {title}
                  </h2>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Why Konvert Section: below the hero */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-24">
        <BlurFade inView>
          <div className="relative">
            {/* Glow behind the card */}
            <GlowEffect
              colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
              mode="breathe"
              blur="softest"
              duration={10}
              className="rounded-lg"
            />
            {/* The card above the glow */}
            <div className="p-6 rounded-lg border border-border bg-card relative z-10">
              <h2 className="text-xl font-semibold mb-4 text-card-foreground">
                Why Konvert?
              </h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {whyKonvertItems.map(({ title, desc, icon: Icon }, index) => (
                  <BlurFade key={title} delay={0.3 + index * 0.1} inView>
                    <div className="flex flex-col items-center text-center">
                      <Icon className="w-8 h-8 text-muted-foreground mb-3" />
                      <h3 className="font-medium mb-2 text-card-foreground">
                        {title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </div>
        </BlurFade>
      </section>
    </div>
  );
};

export default Landing;
