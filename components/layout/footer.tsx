'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Show footer only on About page
  if (pathname !== '/about') {
    return null;
  }

  return (
    <footer className="flex h-20 border-t bg-background z-20 px-4 md:px-6">
      <div className="flex items-center gap-4">
        <div className="font-semibold">
          <Link href="/">Konvert</Link>
        </div>
        <div>
          <Link
            href="/"
            aria-label="Home"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-9 px-4 py-2"
          >
            Home
          </Link>
          <Link
            target="_blank"
            href="mailto:egor.bezriadin.01@gmail.com"
            aria-label="Contact Support"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-9 px-4 py-2"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
