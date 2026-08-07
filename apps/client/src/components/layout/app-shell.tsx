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
    <div className="flex min-h-screen flex-col px-4 py-3">
      {/* Header */}
      <Header />

      {/* Main workspace */}
      <div className="flex min-h-0 flex-1 gap-[6px] py-[6px]">
        {/* Main navigation */}
        <aside className="shrink-0">
          <Sidebar />
        </aside>

        {/* Page */}
        <main className="min-w-0 flex-1 overflow-auto rounded-sm r shadow-md bg-background">
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
