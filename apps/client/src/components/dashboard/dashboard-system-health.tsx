'use client';

import type { SystemHealthStatus } from '@/types/dashboard.types';

interface DashboardSystemHealthProps {
  health: SystemHealthStatus | null;
  isLoading: boolean;
}

export function DashboardSystemHealth({ health, isLoading }: DashboardSystemHealthProps) {
  if (isLoading || !health) {
    return (
      <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="mt-3 space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-6 animate-pulse rounded bg-muted/80" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
      <h2 className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        System Health
      </h2>

      <div className="mt-3 space-y-2 text-[7px] text-foreground-secondary">
        <div className="flex items-center justify-between gap-2">
          <span>Status</span>
          <span className="rounded-xs bg-emerald-500/10 px-1.5 py-0.5 text-[6px] font-semibold uppercase text-emerald-600 dark:text-emerald-400">
            {health.status}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>Uptime</span>
          <span>{health.uptimeFormatted}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>API Latency</span>
          <span>{health.apiLatencyMs} ms</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>Memory</span>
          <span>{health.memoryUsageMb} MB</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>Database</span>
          <span>{health.databaseStatus}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>Node</span>
          <span>{health.nodeVersion}</span>
        </div>
      </div>
    </div>
  );
}
