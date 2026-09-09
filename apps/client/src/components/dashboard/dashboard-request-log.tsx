'use client';

import type { ApiRequestLog } from '@/types/dashboard.types';
import { useTranslation } from '@/hooks/use-translation';
import { AnimatePresence, motion } from 'motion/react';

interface DashboardRequestLogProps {
  requests: ApiRequestLog[];
  isLoading: boolean;
}

function formatRelativeTime(timestamp: string, t: (k: string, f?: string) => string): string {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const diffMinutes = Math.round(diffMs / 60000);
  if (diffMinutes < 1) return t('dashboard.justNow', 'just now');
  if (diffMinutes < 60)
    return t('dashboard.minutesAgo', `${diffMinutes}m ago`).replace('{m}', String(diffMinutes));
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24)
    return t('dashboard.hoursAgo', `${diffHours}h ago`).replace('{h}', String(diffHours));
  const diffDays = Math.round(diffHours / 24);
  return t('dashboard.daysAgo', `${diffDays}d ago`).replace('{d}', String(diffDays));
}

const METHOD_COLOR: Record<string, string> = {
  GET: 'bg-sky-500/15 text-sky-600 dark:text-sky-400',
  POST: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  PUT: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  PATCH: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  DELETE: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
};

function StatusBadge({ code }: { code: number }) {
  const color =
    code >= 500
      ? 'text-rose-600 dark:text-rose-400 bg-rose-500/10'
      : code >= 400
        ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10'
        : code >= 300
          ? 'text-sky-600 dark:text-sky-400 bg-sky-500/10'
          : 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10';

  return (
    <span className={`shrink-0 rounded-xs px-1 py-px font-mono text-[6px] font-bold ${color}`}>
      {code}
    </span>
  );
}

function LatencyBar({ ms }: { ms: number }) {
  // Cap visual at 500ms
  const pct = Math.min((ms / 500) * 100, 100);
  const color = ms > 200 ? 'bg-amber-500' : ms > 100 ? 'bg-sky-500' : 'bg-emerald-500';
  return (
    <div className="flex items-center gap-1">
      <div className="h-1 w-12 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[6px] text-muted-foreground">{ms}ms</span>
    </div>
  );
}

export function DashboardRequestLog({ requests, isLoading }: DashboardRequestLogProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col rounded-sm bg-background shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] font-sans">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <h2 className="font-inter text-[11px] font-bold leading-none tracking-[-0.02em]">
          {t('dashboard.requestLog', 'API Request Log')}
        </h2>
        <span className="text-[7px] text-muted-foreground">
          {requests.length} {t('dashboard.liveEntries', 'entries · live')}
        </span>
      </div>

      <div className="max-h-52 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col divide-y divide-border/40">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 animate-pulse">
                <div className="h-3 w-10 rounded bg-muted" />
                <div className="h-2 flex-1 rounded bg-muted" />
                <div className="h-2 w-6 rounded bg-muted" />
                <div className="h-2 w-12 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : requests.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-[8px] text-muted-foreground">
              {t(
                'dashboard.noRequests',
                'No requests logged yet. Visit any page to generate data.',
              )}
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {requests.slice(0, 80).map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12, delay: i * 0.01 }}
                className={`flex items-center gap-2 border-b border-border/40 px-3 py-1.5 last:border-0 transition-colors hover:bg-muted/30 ${r.isError ? 'bg-rose-500/5' : ''}`}
              >
                {/* Method */}
                <span
                  className={`shrink-0 rounded-xs px-1.5 py-px font-mono text-[6px] font-bold ${METHOD_COLOR[r.method] ?? 'bg-muted text-muted-foreground'}`}
                >
                  {r.method}
                </span>

                {/* Path */}
                <span className="min-w-0 flex-1 truncate font-mono text-[7px] text-foreground">
                  {r.path}
                </span>

                {/* Status */}
                <StatusBadge code={r.statusCode} />

                {/* Latency */}
                <LatencyBar ms={r.latencyMs} />

                {/* Time */}
                <span className="shrink-0 text-[6px] text-muted-foreground/60">
                  {formatRelativeTime(r.timestamp, t)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
