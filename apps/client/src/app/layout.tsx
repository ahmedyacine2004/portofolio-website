import type { Metadata } from 'next';

import { ThemeProvider } from '@/providers/theme-provider';
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
      className={`${inter.variable} ${beni.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
