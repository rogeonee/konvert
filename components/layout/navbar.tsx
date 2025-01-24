'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/ui/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import EnvelopeLogo from '@/components/env-logo';
import MenuIcon from '@/components/icons/hamburger';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const isActive = (route: string) => pathname === route;

  const links = [
    { href: '/heic', label: 'HEIC' },
    { href: '/webp', label: 'WEBP' },
    { href: '/about', label: 'About' },
  ];

  const handleLinkClick = () => {
    setSheetOpen(false);
  };

  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6 z-20">
      <nav className="flex items-center gap-4 text-md font-medium sm:text-md md:text-lg">
        <EnvelopeLogo className="w-8 h-8" />
        <p className="font-semibold">Konvert</p>
        <Separator orientation="vertical" className="hidden sm:flex h-8 ml-4" />
        <NavigationMenu>
          <NavigationMenuList className="hidden sm:flex">
            {links.map((link) => (
              <NavigationMenuItem key={link.href}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'font-semibold',
                      isActive(link.href)
                        ? 'underline underline-offset-4 text-primary'
                        : 'dark:text-[var(--custom-dark-font-color)]',
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <div className="flex items-center gap-4 ml-auto">
        <ModeToggle />
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="sm:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[60vw] sm:w-[60vw] px-4 py-8">
            <SheetHeader>
              <SheetTitle className="flex flex-row gap-2 px-4 font-semibold items-center">
                <EnvelopeLogo className="w-6 h-6" />
                Konvert
              </SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-10">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    isActive(link.href)
                      ? 'underline underline-offset-4 text-primary'
                      : 'dark:text-[var(--custom-dark-font-color)]',
                    'text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors rounded-md px-4 py-2',
                  )}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
