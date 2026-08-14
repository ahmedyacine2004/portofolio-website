'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { ImageViewerModal } from '../about/image-viewer-modal';
import { CommandPaletteModal } from '../command-palette/command-palette-modal';
import { LoadingPage } from '../loading/loading-page';
import { TerminalModal } from '../terminal/terminal-modal';
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

  useEffect(() => {
    // Timer for initial website load (4.5s)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const showLoading = isLoading && pathname !== '/loading';

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

      <div className="flex h-screen bg-transparent flex-col px-4 py-1">
        {/* Header */}
        <Header />

        {/* Main workspace */}
        <div className="flex min-h-0 flex-1 gap-[6px] py-[6px]">
          {/* Main navigation */}
          <aside className="flex flex-row gap-[6px] shrink-0">
            <Sidebar />

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
                className="flex shrink-0"
              >
                <SecondarySidebar />
              </motion.div>
            </AnimatePresence>
          </aside>

          {/* Page Area */}
          <main className="relative min-w-0 flex-1 overflow-hidden rounded-[8px] bg-background shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
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
    </>
  );
}
