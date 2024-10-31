import { Inter as FontSans } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { CSPostHogProvider } from '@/components/posthog-provider';
import Navbar from '@/components/navbar';
import { cn } from '@/lib/utils';
import { SEO } from '@/lib/seo-config';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = SEO;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <CSPostHogProvider>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen w-full flex-col">
              <Navbar />
              <main className="flex-1 p-4">
                {children}
                <SpeedInsights />
              </main>
            </div>
          </ThemeProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
