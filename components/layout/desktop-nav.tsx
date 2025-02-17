'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';

export function DesktopNav({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList className="hidden sm:flex">
        {links.slice(0, 2).map((link) => (
          <NavigationMenuItem key={link.href}>
            <Link href={link.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'font-semibold',
                  pathname === link.href
                    ? 'underline underline-offset-4 text-primary'
                    : 'dark:text-[var(--custom-dark-font-color)]',
                )}
              >
                {link.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        <Separator orientation="vertical" className="hidden sm:flex h-8" />
        {links.slice(2).map((link) => (
          <NavigationMenuItem key={link.href}>
            <Link href={link.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'font-semibold',
                  pathname === link.href
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
  );
}
