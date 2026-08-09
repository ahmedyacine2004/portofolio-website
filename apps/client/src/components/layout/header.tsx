'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ThemeToggle } from '@/components/ui/theme-toggle';

import { motion } from 'motion/react';
import { HeaderActionButtons } from './header-action-buttons';
import { HeaderNavigation } from './header-navigation';
import { HeaderSearch } from './header-search';

const navigation = [
  'Portfolio',
  'Projects',
  'Services',
  'Resources',
  'Tool',
  'Terminal',
  'Contact',
];

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex items-center justify-between rounded-sm bg-background px-4 py-2 shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
    >
      {/* ================================================================
          LEFT SIDE
          Logo + Navigation + Arrows
          ================================================================ */}

      <div className="flex min-w-0 shrink-0 items-center gap-8">
        {/* Logo */}
        <Link href="/" aria-label="Portfolio home" className="flex h-[19px] shrink-0 items-center">
          <Image
            src="/logo.png"
            alt="Portfolio"
            width={25}
            height={25}
            className="h-[19px] w-auto"
            priority
          />
        </Link>

        {/* Navigation + arrows */}
        <div className="flex min-w-0 items-center gap-2">
          {/* Main navigation */}
          <nav className="flex items-center gap-2">
            {navigation.map((item) => (
              <Link
                key={item}
                href="#"
                className="whitespace-nowrap text-[10px] text-foreground-secondary transition-colors hover:text-foreground"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Browser-style navigation */}
          <HeaderNavigation />
        </div>
      </div>

      {/* ================================================================
          CENTER
          Search
          ================================================================ */}

      <div className="mx-6 flex min-w-0 flex-1 justify-center">
        <HeaderSearch />
      </div>

      {/* ================================================================
          RIGHT SIDE
          Actions + Theme
          ================================================================ */}

      <div className="flex shrink-0 items-center gap-1.5">
        <HeaderActionButtons />
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
