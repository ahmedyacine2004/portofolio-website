'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import { useLanguageStore } from '@/stores/language.store';

import { ImageViewerModal } from '../about/image-viewer-modal';
import { CommandPaletteModal } from '../command-palette/command-palette-modal';
import { LoadingPage } from '../loading/loading-page';
import { TerminalModal } from '../terminal/terminal-modal';
import { AudioPlayer } from './audio-player';
import { DownloadManager } from './download-manager';
import { Header } from './header';
import { NotificationsPanel } from './notifications-panel';
import { SecondarySidebar } from './secondary/secondary-sidebar';
import { Sidebar } from './sidebar';
import { StatusBar } from './status-bar';
import { VisitorInfoPanel } from './visitor-info-panel';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const hasShownMobileWarning = useRef(false);
  const hydrateLocale = useLanguageStore((state) => state.hydrateLocale);

  useEffect(() => {
    if (
      !isLoading &&
      pathname === '/' &&
      !hasShownMobileWarning.current &&
      window.matchMedia('(max-width: 1023px)').matches
    ) {
      hasShownMobileWarning.current = true;
      setShowMobileWarning(true);
    }
  }, [isLoading, pathname]);

  useEffect(() => {
    hydrateLocale();
  }, [hydrateLocale]);

  useEffect(() => {
    // Timer for initial website load (4.5s)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const showLoading = isLoading && pathname !== '/loading';
  const hasSecondarySidebar =
    pathname.startsWith('/about') ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/skills') ||
    pathname.startsWith('/experience');

  return (
    <>
      {/* Full Viewport Preloader Overlay */}
      <AnimatePresence>
        {showLoading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.99 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] h-screen w-screen overflow-hidden bg-background"
          >
            <LoadingPage onSkip={() => setIsLoading(false)} isAnimatedSequence={true} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-dvh bg-transparent flex-col px-2 py-1 md:h-screen md:px-4 md:py-1">
        {/* Header */}
        <Header />

        {/* Main workspace */}
        <div className="flex min-h-0 flex-1 gap-[6px] py-[6px] pb-14 md:pb-[6px]">
          {/* Main navigation */}
          <aside className="hidden md:flex flex-row gap-[6px] shrink-0">
            <Sidebar />

            {hasSecondarySidebar && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 32,
                    opacity: { duration: 0.2 },
                  }}
                  className="hidden shrink-0 lg:flex"
                >
                  <SecondarySidebar />
                </motion.div>
              </AnimatePresence>
            )}
          </aside>

          {/* Page Area */}
          <main className="relative min-w-0 flex-1 overflow-x-hidden overflow-y-auto rounded-[4px] bg-background shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] lg:rounded-[8px] lg:overflow-hidden">
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="h-full w-full"
            >
              {children}
            </motion.div>
          </main>
        </div>

        {/* Status bar */}
        <footer className="shrink-0">
          <StatusBar />
        </footer>
      </div>

      <div className="md:hidden">
        <Sidebar />
      </div>

      <AnimatePresence>
        {showMobileWarning && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="presentation"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-warning-title"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              className="relative w-full max-w-sm rounded-md border-2 border-destructive bg-background p-5 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setShowMobileWarning(false)}
                aria-label="Close warning"
                className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-sm text-destructive transition-colors hover:bg-destructive/10"
              >
                <X className="size-4" strokeWidth={2.5} />
              </button>

              <div className="flex flex-col items-center gap-1 text-center">
                <div className="flex size-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <AlertTriangle className="size-6" strokeWidth={2.2} />
                </div>
                <h2 id="mobile-warning-title" className="text-4xl font-bold text-destructive">
                  Warning
                </h2>
                <p className="text-[11px] font-normal leading-tight text-foreground">
                  This portfolio was designed for the desktop experience, which is the original and
                  fully intended way to explore it. Mobile and tablet layouts are provided for
                  convenience but may not represent the complete experience.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Modal */}
      <TerminalModal />

      {/* Command Palette Modal */}
      <CommandPaletteModal />

      {/* Download Manager Floating Panel */}
      <DownloadManager />

      {/* Notifications Panel Popover */}
      <NotificationsPanel />

      {/* Visitor info panel */}
      <VisitorInfoPanel />

      {/* Image Preview Viewer Modal */}
      <ImageViewerModal />

      {/* Background Audio Player */}
      <AudioPlayer />
    </>
  );
}
