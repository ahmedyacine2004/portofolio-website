'use client';

import type { AnalyticsSummary } from '@/types/dashboard.types';
import { useTranslation } from '@/hooks/use-translation';
import { Globe, Laptop, Monitor, Smartphone, Tablet, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface DashboardAnalyticsProps {
  analytics: AnalyticsSummary | null;
  isLoading: boolean;
}

const MAX_BAR = 80;

const DEVICE_ICON: Record<string, LucideIcon> = {
  Desktop: Monitor,
  Laptop,
  Mobile: Smartphone,
  Tablet,
  Bot: Globe,
};

const DEVICE_COLOR: Record<string, string> = {
  Desktop: 'bg-sky-500',
  Mobile: 'bg-emerald-500',
  Tablet: 'bg-violet-500',
  Bot: 'bg-amber-500',
};

function MiniBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function DashboardAnalytics({ analytics, isLoading }: DashboardAnalyticsProps) {
  const { t } = useTranslation();

  if (isLoading || !analytics) {
    return (
      <div className="grid gap-3 lg:grid-cols-2 font-sans">
        <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
          <div className="h-4 w-36 animate-pulse rounded bg-muted" />
          <div className="mt-3 flex h-24 items-end gap-1">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="h-8 flex-1 animate-pulse rounded-t-xs bg-muted/70" />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
            <div className="h-3 w-20 animate-pulse rounded bg-muted" />
            <div className="mt-2 space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 animate-pulse rounded bg-muted/60" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const maxHourly = Math.max(...analytics.hourlyRequests.map((h) => h.requests), 1);

  return (
    <div className="grid gap-3 lg:grid-cols-2 font-sans">
      {/* Hourly request chart */}
      <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-inter flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            <TrendingUp className="size-3" />
            {t('dashboard.requestsPerHour', 'Requests / Hour (24h)')}
          </h2>
          <span className="text-[7px] text-muted-foreground">
            {analytics.requestsToday} {t('dashboard.today', 'today')}
          </span>
        </div>
        <div className="flex h-24 items-end gap-px">
          {analytics.hourlyRequests.map((h) => {
            const height =
              maxHourly > 0 ? Math.max(2, Math.round((h.requests / maxHourly) * MAX_BAR)) : 2;
            return (
              <div
                key={h.hour}
                className="group relative flex flex-1 flex-col items-center justify-end"
              >
                <div
                  className="w-full rounded-t-xs bg-violet-500/70 transition-all duration-300 group-hover:bg-violet-500"
                  style={{ height: `${height}%` }}
                />
                {/* tooltip */}
                <span className="pointer-events-none absolute -top-4 hidden rounded bg-popover px-1 py-0.5 text-[6px] text-popover-foreground shadow group-hover:block">
                  {h.hour}: {h.requests}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-1 flex justify-between text-[6px] text-muted-foreground/60">
          <span>00:00</span>
          <span>12:00</span>
          <span>23:00</span>
        </div>
      </div>

      {/* Top pages + device breakdown */}
      <div className="space-y-3">
        {/* Top pages */}
        <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
          <h2 className="font-inter mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {t('dashboard.topPages', 'Top Pages')}
          </h2>
          {analytics.topPages.length === 0 ? (
            <p className="py-4 text-center text-[7px] text-muted-foreground">
              {t('dashboard.noPageViews', 'No page views recorded yet.')}
            </p>
          ) : (
            <div className="space-y-2">
              {analytics.topPages.slice(0, 5).map((p) => (
                <div key={p.page}>
                  <div className="mb-0.5 flex items-center justify-between gap-2 text-[7px]">
                    <span className="truncate font-mono text-foreground">{p.page || '/'}</span>
                    <span className="shrink-0 text-muted-foreground">
                      {p.views} · {p.percentage}%
                    </span>
                  </div>
                  <MiniBar pct={p.percentage} color="bg-sky-500" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Device breakdown */}
        <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
          <h2 className="font-inter mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {t('dashboard.deviceTypes', 'Device Types')}
          </h2>
          {analytics.deviceBreakdown.length === 0 ? (
            <p className="py-2 text-center text-[7px] text-muted-foreground">
              {t('dashboard.noVisitorData', 'No visitor data yet.')}
            </p>
          ) : (
            <div className="space-y-2">
              {analytics.deviceBreakdown.map((d) => {
                const Icon = DEVICE_ICON[d.type] ?? Globe;
                const color = DEVICE_COLOR[d.type] ?? 'bg-muted-foreground';
                return (
                  <div key={d.type} className="flex items-center gap-2">
                    <div
                      className={`flex size-5 items-center justify-center rounded-xs text-white ${color}`}
                    >
                      <Icon className="size-3" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex justify-between text-[7px]">
                        <span>{d.type}</span>
                        <span className="text-muted-foreground">
                          {d.count} · {d.percentage}%
                        </span>
                      </div>
                      <MiniBar pct={d.percentage} color={color} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
