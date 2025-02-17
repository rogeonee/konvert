'use client';

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/ui/theme-toggle';
import { DesktopNav } from '@/components/layout/desktop-nav';
import { MobileSheet } from '@/components/layout/mobile-sheet';
import { EnvelopeLogo } from '@/components/icons';

export default function Navbar() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/heic', label: 'HEIC' },
    { href: '/webp', label: 'WEBP' },
    { href: '/avif', label: 'AVIF' },
  ];

  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6 z-20">
      <nav className="flex items-center text-md font-medium sm:text-md md:text-lg">
        <Link
          href={'/'}
          className="flex items-center gap-2 cursor-pointer mr-5"
        >
          <EnvelopeLogo className="w-8 h-8" />
          <p className="font-semibold">Konvert</p>
        </Link>
        <Separator orientation="vertical" className="hidden sm:flex h-8 mr-1" />
        <DesktopNav links={links} />
      </nav>

      <div className="flex items-center gap-4 ml-auto">
        <ModeToggle />
        <MobileSheet links={links} />
      </div>
    </header>
  );
}
