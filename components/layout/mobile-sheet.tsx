'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { MenuIcon, EnvelopeLogo } from '@/components/icons';
import { cn } from '@/lib/utils';

export function MobileSheet({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => setSheetOpen(false);

  return (
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
          {links.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                pathname === link.href
                  ? 'underline underline-offset-4 text-primary'
                  : 'dark:text-[var(--custom-dark-font-color)]',
                'text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors rounded-md px-4 py-2',
              )}
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
          <Separator orientation="horizontal" className="" />
          {links.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                pathname === link.href
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
  );
}
