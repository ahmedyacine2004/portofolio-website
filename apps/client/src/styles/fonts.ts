import { Geist_Mono, Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const beni = localFont({
  src: [
    {
      path: '../assets/fonts/Beni/BeniBlack.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Beni/BeniBold.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Beni/BeniLight.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Beni/BeniRegular.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-beni',
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});
