import React from 'react';
import Link from 'next/link';
import { MailQuestion, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navlinks = [
  { href: '#', text: 'Konvert' },
  { href: '#', text: 'Something' },
  { href: '#', text: 'Else' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <nav className="flex items-center gap-6 text-md font-medium sm:text-md md:text-lg">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <MailQuestion className="h-6 w-6" />
                <span className="sr-only">Konvert</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Konvert
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Something
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Else
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        {navlinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.text}
          </Link>
        ))}
      </nav>
      <div className="hidden md:flex items-center gap-4 ml-auto">
        <ModeToggle />
      </div>
    </header>
  );
}
