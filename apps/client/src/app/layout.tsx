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
      <head>
        {/* Apply stored accent color before React hydrates to prevent flash of wrong color */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var stored = localStorage.getItem('portfolio-preferences');
    if (!stored) return;
    var prefs = JSON.parse(stored);
    var root = document.documentElement;
    var accentMap = {
      Indigo: { '--primary': 'oklch(0.55 0.22 263.2)', '--primary-foreground': 'oklch(0.985 0 0)', '--ring': 'oklch(0.65 0.18 263.2)' },
      Emerald: { '--primary': 'oklch(0.6 0.18 155)', '--primary-foreground': 'oklch(0.985 0 0)', '--ring': 'oklch(0.7 0.16 155)' },
      Violet: { '--primary': 'oklch(0.62 0.2 305)', '--primary-foreground': 'oklch(0.985 0 0)', '--ring': 'oklch(0.7 0.18 305)' },
      Cyan: { '--primary': 'oklch(0.64 0.14 205)', '--primary-foreground': 'oklch(0.985 0 0)', '--ring': 'oklch(0.72 0.14 205)' },
      Rose: { '--primary': 'oklch(0.65 0.18 15)', '--primary-foreground': 'oklch(0.985 0 0)', '--ring': 'oklch(0.73 0.16 15)' }
    };
    var accent = accentMap[prefs.colorAccent] || accentMap.Indigo;
    Object.keys(accent).forEach(function(key) { root.style.setProperty(key, accent[key]); });
    if (prefs.theme) root.dataset.theme = prefs.theme;
    if (prefs.compactMode !== undefined) root.dataset.compact = String(prefs.compactMode);
    if (prefs.reduceMotion !== undefined) root.dataset.reduceMotion = String(prefs.reduceMotion);
    if (prefs.highContrast !== undefined) root.dataset.highContrast = String(prefs.highContrast);
    if (prefs.fontFamily) root.style.setProperty('--font-sans', prefs.fontFamily + ', sans-serif');
  } catch(e) {}
})();
            `,
          }}
        />
      </head>
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
