import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/ui/theme-toggle';
import { DesktopNav } from '@/components/layout/desktop-nav';
import { MobileSheet } from '@/components/layout/mobile-sheet';
import { EnvelopeLogo } from '@/components/icons';

export default function Navbar() {
  const links = [
    { href: '/heic', label: 'HEIC' },
    { href: '/webp', label: 'WEBP' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6 z-20">
      <nav className="flex items-center gap-4 text-md font-medium sm:text-md md:text-lg">
        <EnvelopeLogo className="w-8 h-8" />
        <p className="font-semibold">Konvert</p>
        <Separator orientation="vertical" className="hidden sm:flex h-8 ml-4" />
        <DesktopNav links={links} />
      </nav>

      <div className="flex items-center gap-4 ml-auto">
        <ModeToggle />
        <MobileSheet links={links} />
      </div>
    </header>
  );
}
