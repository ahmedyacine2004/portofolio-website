'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/hooks/use-translation';

import { motion } from 'motion/react';
import { HeaderActionButtons } from './header-action-buttons';
import { HeaderNavigation } from './header-navigation';
import { HeaderSearch } from './header-search';

import { useAdminAuthStore } from '@/stores/admin-auth.store';
import { useCommandPaletteStore } from '@/stores/command-palette.store';
import { useDownloadManagerStore } from '@/stores/download-manager.store';
import { useLanguageStore } from '@/stores/language.store';
import { useNotificationsStore } from '@/stores/notifications.store';
import { useTerminalStore } from '@/stores/terminal.store';
import { useVisitorInfoStore } from '@/stores/visitor-info.store';

type NavItem =
  | { label: string; href: string; action?: never }
  | { label: string; action: () => void; href?: never };

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const toggleTerminal = useTerminalStore((s) => s.toggle);
  const toggleCommandPalette = useCommandPaletteStore((s) => s.toggle);
  const toggleDownloads = useDownloadManagerStore((s) => s.toggleOpen);
  const downloadsCount = useDownloadManagerStore((s) => s.items.length);
  const toggleNotifications = useNotificationsStore((s) => s.toggleOpen);
  const unreadNotifsCount = useNotificationsStore(
    (s) => s.notifications.filter((n) => !n.read).length,
  );
  const locale = useLanguageStore((s) => s.locale);
  const setLocale = useLanguageStore((s) => s.setLocale);
  const toggleVisitorInfo = useVisitorInfoStore((s) => s.toggle);

  const isAuthenticated = useAdminAuthStore((state) => state.isAuthenticated);
  const { t } = useTranslation();

  useEffect(() => {
    const updateNavigationState = () => {
      setCanGoBack(window.history.length > 1);
    };

    updateNavigationState();

    window.addEventListener('popstate', updateNavigationState);

    return () => {
      window.removeEventListener('popstate', updateNavigationState);
    };
  }, []);

  const navigation: NavItem[] = [
    ...(isAuthenticated ? [{ label: t('navigation.dashboard'), href: '/dashboard' }] : []),
    { label: t('navigation.about'), href: '/about' },
    { label: t('navigation.projects'), href: '/projects' },
    { label: t('navigation.skills'), href: '/skills' },
    { label: t('navigation.experience'), href: '/experience' },
    { label: t('navigation.certifications'), href: '/certification' },
    { label: t('navigation.terminal'), action: toggleTerminal },
    { label: t('navigation.contact'), href: '/contact' },
  ];

  return (
    <>
      {/* DESKTOP HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="hidden lg:flex items-center justify-between rounded-sm bg-background px-4 py-2 shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
      >
        {/* ================================================================
            LEFT SIDE
            Logo + Navigation + Arrows
            ================================================================ */}

        <div className="flex min-w-0 shrink-0 items-center gap-8">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Portfolio home"
            className="flex h-[19px] shrink-0 items-center"
          >
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
            <nav className="flex items-center gap-2" aria-label="Main navigation">
              {navigation.map((item) => {
                if (item.action) {
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={item.action}
                      className="whitespace-nowrap text-[10px] text-foreground-secondary transition-colors hover:text-foreground cursor-pointer"
                    >
                      {item.label}
                    </button>
                  );
                }

                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={[
                      'whitespace-nowrap text-[10px] transition-colors',
                      isActive
                        ? 'text-foreground font-medium'
                        : 'text-foreground-secondary hover:text-foreground',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Browser-style navigation */}
            <HeaderNavigation />
          </div>
        </div>

        {/* ================================================================
            CENTER
            Search / Command Palette trigger
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

      {/* TABLET HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="hidden md:flex lg:hidden items-center justify-between rounded-sm bg-background px-3 py-1.5 shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] gap-2"
      >
        {/* Logo */}
        <Link href="/" aria-label="Portfolio home" className="flex h-[16px] shrink-0 items-center">
          <Image
            src="/logo.png"
            alt="Portfolio"
            width={20}
            height={20}
            className="h-[16px] w-auto"
            priority
          />
        </Link>

        <span className="truncate px-2 text-center text-[10px] font-bold uppercase text-foreground">
          {pathname.split('/')[1] || 'Home'}
        </span>

        {/* Compact navigation - icon only */}
        <nav className="flex items-center gap-1 flex-1" aria-label="Main navigation">
          {navigation.slice(0, 4).map((item) => {
            if (item.action) return null;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.label}
                href={item.href}
                title={item.label}
                className={`text-[9px] px-1.5 py-0.5 rounded-xs transition-colors ${
                  isActive
                    ? 'bg-primary/20 text-foreground font-medium'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-muted/30'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side - minimal */}
        <div className="flex shrink-0 items-center gap-1">
          <ThemeToggle />
        </div>
      </motion.header>

      {/* MOBILE HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="md:hidden flex w-full items-center justify-between rounded-[4px] bg-background px-2 py-1 shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
      >
        {/* Logo */}
        <Link href="/" aria-label="Portfolio home" className="flex h-[14px] shrink-0 items-center">
          <Image
            src="/logo.png"
            alt="Portfolio"
            width={18}
            height={18}
            className="h-[14px] w-auto"
            priority
          />
        </Link>

        {/* Center - current page or minimal info */}
        <span className="flex-1 truncate px-2 text-center text-[10px] font-bold uppercase text-foreground">
          {pathname.split('/')[1] || 'Home'}
        </span>

        {/* Right side */}
        <div className="flex shrink-0 items-center gap-1">
          <div className="relative">
            {unreadNotifsCount > 0 && (
              <span className="absolute -right-1 -top-1.5 z-10 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[7px] font-bold leading-none text-primary-foreground shadow-xs">
                {unreadNotifsCount > 9 ? '9+' : unreadNotifsCount}
              </span>
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="relative flex size-7 items-center justify-center text-foreground transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="size-3.5" strokeWidth={2} />
              ) : (
                <Menu className="size-3.5" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/30"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.aside
            initial={{ x: 110, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 110, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
            className="absolute right-0 top-0 h-full w-[72%] max-w-[260px] bg-background p-4 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-secondary">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="flex size-7 items-center justify-center text-foreground"
              >
                <X className="size-3.5" strokeWidth={2} />
              </button>
            </div>

            <nav
              className="flex flex-col gap-1.5 overflow-y-auto max-h-[calc(100vh-120px)]"
              aria-label="Mobile feature menu"
            >
              {/* Navigation */}
              <div className="mb-2 pb-2 border-b border-foreground/10">
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-foreground-secondary mb-2">
                  Navigation
                </p>
                {navigation.map((item) => {
                  if (item.action) {
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          item.action();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-between rounded-[4px] px-2 py-2 text-left text-[10px] text-foreground-secondary transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <span>{item.label}</span>
                      </button>
                    );
                  }

                  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={[
                        'block rounded-[4px] px-2 py-2 text-[10px] transition-colors',
                        isActive
                          ? 'bg-primary/15 text-foreground font-medium'
                          : 'text-foreground-secondary hover:bg-muted hover:text-foreground',
                      ].join(' ')}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="mb-2 pb-2 border-b border-foreground/10">
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-foreground-secondary mb-2">
                  Actions
                </p>
                <button
                  type="button"
                  onClick={() => {
                    toggleCommandPalette();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between rounded-[4px] px-2 py-2 text-left text-[10px] text-foreground-secondary transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span>Command Palette</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLocale(locale === 'en' ? 'fr' : 'en');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between rounded-[4px] px-2 py-2 text-left text-[10px] text-foreground-secondary transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span>Language</span>
                  <span className="font-medium text-foreground">
                    {locale === 'en' ? 'EN' : 'FR'}
                  </span>
                </button>
                <Link
                  href="/ai-assistant"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-[4px] px-2 py-2 text-[10px] text-foreground-secondary transition-colors hover:bg-muted hover:text-foreground"
                >
                  AI Assistant
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-[4px] px-2 py-2 text-[10px] text-foreground-secondary transition-colors hover:bg-muted hover:text-foreground"
                >
                  Settings
                </Link>
              </div>

              {/* Tools */}
              <div className="mb-2 pb-2 border-b border-foreground/10">
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-foreground-secondary mb-2">
                  Tools
                </p>
                <button
                  type="button"
                  onClick={() => {
                    toggleDownloads();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between rounded-[4px] px-2 py-2 text-left text-[10px] text-foreground-secondary transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span>Downloads</span>
                  {downloadsCount > 0 && (
                    <span className="text-[8px] font-bold text-primary">{downloadsCount}</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toggleNotifications();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between rounded-[4px] px-2 py-2 text-left text-[10px] text-foreground-secondary transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span>Notifications</span>
                  {unreadNotifsCount > 0 && (
                    <span className="text-[8px] font-bold text-primary">{unreadNotifsCount}</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toggleVisitorInfo();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between rounded-[4px] px-2 py-2 text-left text-[10px] text-foreground-secondary transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span>Visitor Info</span>
                </button>
              </div>

              {/* Preferences */}
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-foreground-secondary mb-2">
                  Preferences
                </p>
                <button
                  type="button"
                  onClick={() => {
                    toggleTheme();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between rounded-[4px] px-2 py-2 text-left text-[10px] text-foreground-secondary transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span>Theme</span>
                  <span className="font-medium text-foreground">
                    {theme === 'dark' ? 'Dark' : 'Light'}
                  </span>
                </button>
              </div>
            </nav>
          </motion.aside>
        </div>
      )}
    </>
  );
}
