import React from 'react';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/theme-toggle';
import { Separator } from '@/components/ui/separator';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import EnvelopeLogo from '../env-logo';

export default function Navbar() {
  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6 z-20">
      <nav className="flex items-center gap-4 text-md font-medium sm:text-md md:text-lg">
        <EnvelopeLogo className="w-8 h-8" />
        <Separator orientation="vertical" className="hidden sm:flex h-8 ml-4" />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href={'/'} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  HEIC
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={'/webp'} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  WEBP
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={'/about'} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <div className="flex items-center gap-4 ml-auto">
        <ModeToggle />
      </div>
    </header>
  );
}
