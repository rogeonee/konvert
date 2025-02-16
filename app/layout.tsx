import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { CSPostHogProvider } from '@/components/providers/posthog-provider';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import SnowfallComponent from '@/components/snowfall';
import { GlobalMeta } from '@/lib/metadata';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = GlobalMeta;

/** react-scan
 * 
  <head>
    <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
  </head>
 */

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
            'min-h-screen bg-background font-sans antialiased relative',
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex w-full flex-col">
              <Navbar />
              <main className="flex-1 p-4">
                {children}
                {/* <SnowfallComponent /> */}
                <SpeedInsights />
              </main>
              <Toaster />
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
