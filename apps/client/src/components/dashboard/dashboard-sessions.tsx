'use client';

import type { SessionStats } from '@/types/dashboard.types';
import { useTranslation } from '@/hooks/use-translation';
import { Users } from 'lucide-react';

interface DashboardSessionsProps {
  sessions: SessionStats | null;
  isLoading: boolean;
}

function formatDuration(ms: number): string {
  if (ms === 0) return '0s';
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

export function DashboardSessions({ sessions, isLoading }: DashboardSessionsProps) {
  const { t } = useTranslation();

  if (isLoading || !sessions) {
    return (
      <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] font-sans">
        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        <div className="mt-3 space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-5 animate-pulse rounded bg-muted/80" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] font-sans">
      <h2 className="font-inter text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {t('dashboard.sessions', 'Sessions')}
      </h2>

      {/* Key stats */}
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <div className="rounded-xs bg-muted/40 p-2 text-center">
          <p className="font-mono text-[14px] font-bold leading-none text-sky-500">
            {sessions.activeSessions}
          </p>
          <p className="mt-1 text-[6px] text-muted-foreground">
            {t('dashboard.activeNow', 'Active Now')}
          </p>
        </div>
        <div className="rounded-xs bg-muted/40 p-2 text-center">
          <p className="font-mono text-[14px] font-bold leading-none text-violet-500">
            {sessions.totalSessionsToday}
          </p>
          <p className="mt-1 text-[6px] text-muted-foreground">
            {t('dashboard.todayLabel', 'Today')}
          </p>
        </div>
        <div className="rounded-xs bg-muted/40 p-2 text-center">
          <p className="font-mono text-[11px] font-bold leading-none text-emerald-500">
            {formatDuration(sessions.avgSessionDurationMs)}
          </p>
          <p className="mt-1 text-[6px] text-muted-foreground">
            {t('dashboard.avgDuration', 'Avg Duration')}
          </p>
        </div>
      </div>

      {/* Top user agents */}
      {sessions.topUserAgents.length > 0 && (
        <div className="mt-3">
          <p className="mb-2 text-[7px] font-medium text-muted-foreground">
            {t('dashboard.topClients', 'Top Clients')}
          </p>
          <div className="space-y-1.5">
            {sessions.topUserAgents.map((ua) => {
              const total = sessions.topUserAgents.reduce((a, b) => a + b.count, 0) || 1;
              const pct = Math.round((ua.count / total) * 100);
              return (
                <div key={ua.label} className="flex items-center gap-2 text-[7px]">
                  <div className="flex size-4 shrink-0 items-center justify-center rounded-xs bg-muted">
                    <Users className="size-2.5 text-muted-foreground" />
                  </div>
                  <span className="min-w-0 flex-1 truncate text-foreground">{ua.label}</span>
                  <span className="shrink-0 font-mono text-muted-foreground">{ua.count}</span>
                  <div className="h-1 w-12 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-sky-500/70"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {sessions.topUserAgents.length === 0 && (
        <p className="mt-4 text-center text-[7px] text-muted-foreground">
          {t(
            'dashboard.noSessionData',
            'No session data yet. Visit the portfolio to generate sessions.',
          )}
        </p>
      )}
    </div>
  );
}
