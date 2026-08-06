import type { Metadata } from 'next';

import { beni, geistMono, inter } from '@/styles/fonts';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Modern Full-Stack Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${beni.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
