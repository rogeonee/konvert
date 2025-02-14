import Link from 'next/link';
import {
  ChevronRight,
  FileIcon,
  Infinity,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';

const LandingPage = () => {
  return (
    <div
      className={cn(
        'relative min-h-screen flex flex-col items-center justify-center',
        'bg-background overflow-hidden',
      )}
    >
      {/* Animated Grid bg */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          'absolute inset-0 z-0',
          '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
          'skew-y-12',
        )}
      />
      {/* Main content on top */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-4 py-24">
        <div className="space-y-10 md:space-y-12 lg:space-y-16">
          {/* Intro */}
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

          {/* Cards container */}
          <div className="grid gap-6 mt-[72px] sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'HEIC',
                path: '/heic',
                description:
                  'Convert your HEIC images to universally compatible JPG format.',
              },
              {
                title: 'WEBP',
                path: '/webp',
                description:
                  'Need JPGs from WEBP? Konvert handles it seamlessly.',
              },
              {
                title: 'AVIF',
                path: '/avif',
                description:
                  'Unlock AVIF images by converting them to JPG with ease.',
              },
            ].map(({ title, path, description }) => (
              <Link
                key={path}
                href={path}
                className={cn(
                  'group p-6 rounded-lg bg-background border border-border flex flex-col justify-between h-full',
                  'hover:border-foreground hover:bg-card transition-colors',
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
            ))}
          </div>

          {/* Why Konvert section */}
          <div className="mt-16 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">
              Why Konvert?
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
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
                  desc: 'Convert as many files as you need, with no size restrictions or accounts.',
                  icon: Infinity,
                },
              ].map(({ title, desc, icon: Icon }) => (
                <div
                  key={title}
                  className="flex flex-col items-center text-center"
                >
                  <Icon className="w-8 h-8 text-muted-foreground mb-3" />
                  <h3 className="font-medium mb-2 text-card-foreground">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
