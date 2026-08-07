import type { Metadata } from 'next';

import { AppShell } from '@/components/layout/app-shell';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';

import { cn } from '@/lib/utils';

import { beni, geistMono, inter } from '@/styles/fonts';

import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),

  title: {
    default: 'Ahmed Yassine Abbane — Full-Stack Developer',
    template: '%s | Ahmed Yassine Abbane',
  },

  description:
    'Full-stack developer portfolio showcasing projects, services, experience, certifications, and technical expertise.',

  keywords: [
    'Full-Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Next.js',
    'React',
    'TypeScript',
    'NestJS',
    'MongoDB',
    'Web Developer',
    'Portfolio',
  ],

  authors: [
    {
      name: 'Ahmed Yassine Abbane',
    },
  ],

  creator: 'Ahmed Yassine Abbane',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Ahmed Yassine Abbane — Full-Stack Developer',
    description:
      'Full-stack developer portfolio showcasing projects, services, experience, certifications, and technical expertise.',
    siteName: 'Ahmed Yassine Abbane Portfolio',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Yassine Abbane — Full-Stack Developer',
    description:
      'Full-stack developer portfolio showcasing projects, services, experience, certifications, and technical expertise.',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  icons: {
    icon: '/favicon.ico',
  },
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
