'use client';

import type { VisitorLog } from '@/types/dashboard.types';
import { useTranslation } from '@/hooks/use-translation';
import { Globe, Monitor, Smartphone } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface DashboardVisitorLogProps {
  visitors: VisitorLog[];
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

function DeviceIcon({ label }: { label: string }) {
  if (label.includes('Mobile') || label.includes('iPhone') || label.includes('Android')) {
    return <Smartphone className="size-2.5" />;
  }
  if (label.includes('Bot')) return <Globe className="size-2.5" />;
  return <Monitor className="size-2.5" />;
}

function formatPage(page: string, homeLabel: string): string {
  if (!page || page === '/') return `/  (${homeLabel})`;
  return page;
}

export function DashboardVisitorLog({ visitors, isLoading }: DashboardVisitorLogProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col rounded-sm bg-background shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] font-sans">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <h2 className="font-inter text-[11px] font-bold leading-none tracking-[-0.02em]">
          {t('dashboard.visitorLog', 'Visitor Log')}
        </h2>
        <span className="text-[7px] text-muted-foreground">
          {visitors.length} {t('dashboard.entries', 'entries')}
        </span>
      </div>

      <div className="max-h-52 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col divide-y divide-border/40">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 animate-pulse">
                <div className="size-5 rounded-xs bg-muted shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="h-2 w-24 rounded bg-muted" />
                  <div className="h-1.5 w-36 rounded bg-muted" />
                </div>
                <div className="h-1.5 w-10 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : visitors.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-[8px] text-muted-foreground">
              {t(
                'dashboard.noVisitors',
                'No visitors recorded yet. Visit the portfolio to generate data.',
              )}
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {visitors.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, delay: i * 0.02 }}
                className="flex items-center gap-2 border-b border-border/40 px-3 py-2 last:border-0 hover:bg-muted/30 transition-colors"
              >
                <div className="flex size-5 shrink-0 items-center justify-center rounded-xs bg-sky-500/15 text-sky-500">
                  <DeviceIcon label={v.deviceLabel} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[7px] font-medium text-foreground">{v.ip}</span>
                    <span className="rounded-xs bg-muted px-1 py-px text-[5.5px] text-muted-foreground">
                      {v.deviceLabel.split(' / ')[1] ?? t('dashboard.device', 'Device')}
                    </span>
                  </div>
                  <p className="mt-px truncate text-[6.5px] text-muted-foreground">
                    <span className="font-mono">
                      {formatPage(v.page, t('navigation.home', 'Home'))}
                    </span>
                    {v.referrer && (
                      <span className="ml-1 text-muted-foreground/60">
                        · {t('dashboard.from', 'from')}{' '}
                        {v.referrer.length > 30 ? v.referrer.slice(0, 30) + '…' : v.referrer}
                      </span>
                    )}
                  </p>
                </div>
                <span className="shrink-0 text-[6px] text-muted-foreground/60">
                  {formatRelativeTime(v.timestamp, t)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
