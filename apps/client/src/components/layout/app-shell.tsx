'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import { Header } from './header';
import { SecondarySidebar } from './secondary/secondary-sidebar';
import { Sidebar } from './sidebar';
import { StatusBar } from './status-bar';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
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
              key={pathname} /* <--- Triggers re-animation on route change */
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

        {/* Page */}
        <main className="min-w-0 flex-1 rounded-[8px] bg-background shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
          {children}
        </main>
      </div>

      {/* Status bar */}
      <footer className="shrink-0">
        <StatusBar />
      </footer>
    </div>
  );
}
