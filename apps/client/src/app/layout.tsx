import type { Metadata } from 'next';

import { QueryProvider } from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';

import { AppShell } from '@/components/layout/app-shell';

import { cn } from '@/lib/utils';

import { beni, geistMono, inter } from '@/styles/fonts';

import '@/styles/globals.css';

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
      className={cn(inter.variable, beni.variable, geistMono.variable, 'font-sans')}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <QueryProvider>
            <AppShell>{children}</AppShell>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
