import Link from 'next/link';
import { ChevronRight, FileIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <section className="flex-1 max-w-5xl mx-auto px-4 py-24">
        <div className="space-y-8">
          <h1 className="text-5xl font-bold tracking-tight">
            Konvert your images.
            <br />
            <span className="text-zinc-400">Simple. Fast. Free.</span>
          </h1>

          <div className="grid gap-4 mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'HEIC to JPG',
                path: '/heic',
                description: 'Convert HEIC images to JPG format',
              },
              {
                title: 'WEBP to JPG',
                path: '/webp',
                description: 'Convert WEBP images to JPG format',
              },
              {
                title: 'AVIF to JPG',
                path: '/avif',
                description: 'Convert AVIF images to JPG format',
              },
            ].map(({ title, path, description }) => (
              <Link
                key={path}
                href={path}
                className={cn(
                  'group p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors',
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <FileIcon className="w-6 h-6 text-zinc-400" />
                  <ChevronRight className="w-5 h-5 text-zinc-700 group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-sm text-zinc-400">{description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-16 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-xl font-semibold mb-4">Why Konvert?</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: 'Client-side conversion',
                  desc: 'Your files never leave your device. All processing happens locally.',
                },
                {
                  title: 'Blazing fast',
                  desc: 'Built with performance in mind. Convert multiple files in seconds.',
                },
                {
                  title: 'No limitations',
                  desc: 'No file size limits. No conversion limits. No account required.',
                },
              ].map(({ title, desc }) => (
                <div key={title}>
                  <h3 className="font-medium mb-2">{title}</h3>
                  <p className="text-sm text-zinc-400">{desc}</p>
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
