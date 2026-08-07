import type { Metadata } from 'next';

import { ThemeProvider } from '@/providers/theme-provider';
import { beni, geistMono, inter } from '@/styles/fonts';

import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { Geist } from 'next/font/google';
import { QueryProvider } from '@/providers/query-provider';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Modern Full-Stack Portfolio',
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={cn(inter.variable, beni.variable, geistMono.variable, 'font-sans', geist.variable)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
