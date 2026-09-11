import type { Metadata } from 'next';

import { AppShell } from '@/components/layout/app-shell';
import { siteName, siteUrl } from '@/lib/site';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';

import { cn } from '@/lib/utils';

import { beni, geistMono, inter } from '@/styles/fonts';

import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: siteUrl,

  title: {
    default: 'Ahmed Yassine Abbane — Full-Stack Developer',
    template: '%s | Ahmed Yassine Abbane',
  },

  description:
    'Ahmed Yassine Abbane is a full-stack developer building thoughtful web products with Next.js, React, TypeScript, NestJS, and MongoDB.',

  keywords: [
    'Ahmed Yassine Abbane',
    'Ahmed Yassine Abbane portfolio',
    'Ahmed Abbane',
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
  applicationName: siteName,
  category: 'technology',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Ahmed Yassine Abbane — Full-Stack Developer',
    description:
      'Explore the portfolio, projects, experience, certifications, and technical work of Ahmed Yassine Abbane.',
    siteName: `${siteName} Portfolio`,
    url: '/',
    images: [
      {
        url: '/branding/logo.png',
        alt: 'Ahmed Yassine Abbane portfolio logo',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Yassine Abbane — Full-Stack Developer',
    description:
      'Explore the portfolio, projects, experience, certifications, and technical work of Ahmed Yassine Abbane.',
    images: ['/branding/logo.png'],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Ahmed Yassine Abbane',
                url: siteUrl.toString(),
                jobTitle: 'Full-Stack Developer',
                image: new URL('/branding/logo.png', siteUrl).toString(),
                knowsAbout: [
                  'Web development',
                  'Next.js',
                  'React',
                  'TypeScript',
                  'NestJS',
                  'MongoDB',
                ],
                mainEntityOfPage: {
                  '@type': 'WebPage',
                  '@id': siteUrl.toString(),
                },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: `${siteName} Portfolio`,
                url: siteUrl.toString(),
                inLanguage: 'en-US',
                about: {
                  '@type': 'Person',
                  name: 'Ahmed Yassine Abbane',
                },
              },
            ]),
          }}
        />
        {/* Apply stored accent color before React hydrates to prevent flash of wrong color */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var stored = localStorage.getItem('portfolio-preferences');
    var themeStored = localStorage.getItem('portfolio-theme');
    var prefs = stored ? JSON.parse(stored) : {};
    var currentTheme = (prefs.theme || themeStored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'light' ? 'light' : 'dark';
    var root = document.documentElement;

    var palettes = {
      Blue: {
        dark: { brand: '#6ea8ff', light: '#8fc2ff', dark: '#5b94ff', darkest: '#4285f4', surface: 'rgba(110, 168, 255, 0.15)', fg: '#09090b' },
        light: { brand: '#3469ea', light: '#4285f4', dark: '#00358b', darkest: '#001e36', surface: '#ebdffd', fg: '#ffffff' }
      },
      Indigo: {
        dark: { brand: '#818cf8', light: '#a5b4fc', dark: '#6366f1', darkest: '#4f46e5', surface: 'rgba(129, 140, 248, 0.15)', fg: '#09090b' },
        light: { brand: '#4f46e5', light: '#6366f1', dark: '#3730a3', darkest: '#1e1b4b', surface: 'rgba(79, 70, 229, 0.12)', fg: '#ffffff' }
      },
      Emerald: {
        dark: { brand: '#34d399', light: '#6ee7b7', dark: '#10b981', darkest: '#059669', surface: 'rgba(52, 211, 153, 0.15)', fg: '#09090b' },
        light: { brand: '#059669', light: '#10b981', dark: '#065f46', darkest: '#022c22', surface: 'rgba(5, 150, 105, 0.12)', fg: '#ffffff' }
      },
      Violet: {
        dark: { brand: '#a78bfa', light: '#c4b5fd', dark: '#8b5cf6', darkest: '#7c3aed', surface: 'rgba(167, 139, 250, 0.15)', fg: '#09090b' },
        light: { brand: '#7c3aed', light: '#8b5cf6', dark: '#5b21b6', darkest: '#2e1065', surface: 'rgba(124, 58, 237, 0.12)', fg: '#ffffff' }
      },
      Cyan: {
        dark: { brand: '#22d3ee', light: '#67e8f9', dark: '#06b6d4', darkest: '#0891b2', surface: 'rgba(34, 211, 238, 0.15)', fg: '#09090b' },
        light: { brand: '#0891b2', light: '#06b6d4', dark: '#155e75', darkest: '#083344', surface: 'rgba(8, 145, 178, 0.12)', fg: '#ffffff' }
      },
      Rose: {
        dark: { brand: '#fb7185', light: '#fda4af', dark: '#f43f5e', darkest: '#e11d48', surface: 'rgba(251, 113, 133, 0.15)', fg: '#09090b' },
        light: { brand: '#e11d48', light: '#f43f5e', dark: '#9f1239', darkest: '#4c0519', surface: 'rgba(225, 29, 72, 0.12)', fg: '#ffffff' }
      },
      Amber: {
        dark: { brand: '#fbbf24', light: '#fcd34d', dark: '#f59e0b', darkest: '#d97706', surface: 'rgba(251, 191, 36, 0.15)', fg: '#09090b' },
        light: { brand: '#d97706', light: '#f59e0b', dark: '#92400e', darkest: '#451a03', surface: 'rgba(217, 119, 6, 0.12)', fg: '#ffffff' }
      }
    };

    var pal = (palettes[prefs.colorAccent] || palettes.Blue)[currentTheme];
    root.style.setProperty('--color-brand', pal.brand);
    root.style.setProperty('--color-brand-light', pal.light);
    root.style.setProperty('--color-brand-dark', pal.dark);
    root.style.setProperty('--color-brand-darkest', pal.darkest);
    root.style.setProperty('--color-surface-brand', pal.surface);
    root.style.setProperty('--color-primary', pal.brand);
    root.style.setProperty('--color-primary-foreground', pal.fg);
    root.style.setProperty('--color-ring', pal.brand);
    root.style.setProperty('--color-accent', pal.surface);
    root.style.setProperty('--color-accent-foreground', pal.brand);
    root.style.setProperty('--primary', pal.brand);
    root.style.setProperty('--primary-foreground', pal.fg);
    root.style.setProperty('--ring', pal.brand);

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
