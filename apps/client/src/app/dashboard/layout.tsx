import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'System Dashboard | Admin Hub',
  description: 'Portfolio system telemetry, analytics, session inspection, and diagnostics.',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="h-full w-full font-sans [--font-beni:var(--font-sans)] [--font-display:var(--font-sans)]"
      style={
        {
          '--font-display': 'var(--font-sans)',
          '--font-beni': 'var(--font-sans)',
          fontFamily: 'var(--font-sans), system-ui, sans-serif',
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
