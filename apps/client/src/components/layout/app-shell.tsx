'use client';

import type { ReactNode } from 'react';

import { Header } from './header';
import { Sidebar } from './sidebar';
import { StatusBar } from './status-bar';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen bg-transparent flex-col px-4 py-1">
      {/* Header */}
      <Header />

      {/* Main workspace */}
      <div className="flex min-h-0 flex-1 gap-[6px] py-[6px]">
        {/* Main navigation */}
        <aside className="shrink-0">
          <Sidebar />
          {/* Secondary side bar here*/}
        </aside>

        {/* Page */}
        <main className="min-w-0 flex-1 rounded-sm bg-background shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
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
