'use client';

import type { SystemHealthStatus } from '@/types/dashboard.types';
import { useTranslation } from '@/hooks/use-translation';
import { Cpu, Server } from 'lucide-react';

interface DashboardSystemHealthProps {
  health: SystemHealthStatus | null;
  isLoading: boolean;
}

function HealthRow({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) {
  return (
    <div className="flex items-center justify-between gap-2 py-1">
      <span className="text-[7px] text-muted-foreground">{label}</span>
      <div className="text-right">
        <span className="text-[7px] font-medium text-foreground">{value}</span>
        {sub && <p className="text-[5.5px] text-muted-foreground/70">{sub}</p>}
      </div>
    </div>
  );
}

export function DashboardSystemHealth({ health, isLoading }: DashboardSystemHealthProps) {
  const { t } = useTranslation();

  if (isLoading || !health) {
    return (
      <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] font-sans">
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
        <div className="mt-3 space-y-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-5 animate-pulse rounded bg-muted/80" />
          ))}
        </div>
      </div>
    );
  }

  const statusColor =
    health.status === 'healthy'
      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
      : health.status === 'degraded'
        ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10'
        : 'text-rose-600 dark:text-rose-400 bg-rose-500/10';

  const statusLabel =
    health.status === 'healthy'
      ? t('dashboard.statusHealthy', 'healthy')
      : health.status === 'degraded'
        ? t('dashboard.statusDegraded', 'degraded')
        : t('dashboard.statusCritical', 'critical');

  const memPct =
    health.memoryPercent ??
    Math.round((health.memoryUsageMb / Math.max(health.memoryTotalMb, 1)) * 100);

  return (
    <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] font-sans">
      <div className="flex items-center justify-between">
        <h2 className="font-inter text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {t('dashboard.systemHealth', 'System Health')}
        </h2>
        <span
          className={`rounded-xs px-1.5 py-0.5 text-[6px] font-semibold uppercase ${statusColor}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="mt-3 divide-y divide-border/40">
        <HealthRow label={t('dashboard.uptime', 'Uptime')} value={health.uptimeFormatted} />
        <HealthRow
          label={t('dashboard.latency', 'API Latency')}
          value={`${health.apiLatencyMs} ms`}
        />

        {/* Memory bar */}
        <div className="flex items-center justify-between gap-2 py-1">
          <span className="flex items-center gap-1 text-[7px] text-muted-foreground">
            <Server className="size-2.5" /> {t('dashboard.memory', 'Memory')}
          </span>
          <div className="flex items-center gap-1">
            <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${memPct > 80 ? 'bg-rose-500' : memPct > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                style={{ width: `${memPct}%` }}
              />
            </div>
            <span className="font-mono text-[7px] text-foreground">
              {health.memoryUsageMb} / {health.memoryTotalMb} MB
            </span>
          </div>
        </div>

        <HealthRow
          label={t('dashboard.requestsPerHourHealth', 'Requests / hr')}
          value={`${health.requestsLastHour}`}
          sub={`${health.errorsLastHour} ${t('dashboard.errors', 'errors')}`}
        />
        <HealthRow
          label={t('dashboard.dbStatus', 'Database')}
          value={
            <span
              className={
                health.databaseStatus === 'connected' ? 'text-emerald-500' : 'text-amber-500'
              }
            >
              {health.databaseStatus === 'connected'
                ? t('dashboard.connected', 'connected')
                : t('dashboard.disconnected', 'disconnected')}
            </span>
          }
        />
        <HealthRow label={t('dashboard.nodeVersion', 'Node')} value={health.nodeVersion} />
        <HealthRow label={t('dashboard.environment', 'Environment')} value={health.environment} />
      </div>

      {/* CPU indicator */}
      {(health.cpuUser > 0 || health.cpuSystem > 0) && (
        <div className="mt-2 flex items-center gap-1.5 rounded-xs bg-muted/40 px-2 py-1">
          <Cpu className="size-2.5 text-muted-foreground" />
          <span className="font-mono text-[6.5px] text-muted-foreground">
            {t('dashboard.cpuLabel', 'CPU — user: {user}ms · sys: {sys}ms')
              .replace('{user}', String(health.cpuUser))
              .replace('{sys}', String(health.cpuSystem))}
          </span>
        </div>
      )}
    </div>
  );
}
