'use client';

import {
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  GraduationCap,
  RefreshCw,
  ShieldCheck,
  UserRound,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { DashboardMetric } from '@/types/dashboard.types';
import { useTranslation } from '@/hooks/use-translation';

interface DashboardMetricsProps {
  metrics: DashboardMetric[];
  isLoading: boolean;
}

const ICON_MAP: Record<string, LucideIcon> = {
  FolderKanban,
  UserRound,
  Code2,
  GraduationCap,
  Zap,
  ShieldCheck,
  BriefcaseBusiness,
  RefreshCw,
};

export function DashboardMetrics({ metrics, isLoading }: DashboardMetricsProps) {
  const { t } = useTranslation();

  const getMetricLabel = (m: DashboardMetric) => {
    switch (m.id) {
      case 'visitors-today':
        return t('dashboard.metrics.visitorsToday', m.label);
      case 'requests-today':
        return t('dashboard.metrics.apiRequests', m.label);
      case 'projects':
        return t('dashboard.metrics.totalProjects', m.label);
      case 'skills':
        return t('dashboard.metrics.technologies', m.label);
      case 'code-volume':
        return t('dashboard.metrics.codeVolume', m.label);
      case 'system-uptime':
        return t('dashboard.metrics.systemUptime', m.label);
      default:
        return m.label;
    }
  };

  const getMetricSubtext = (m: DashboardMetric) => {
    if (!m.subtext) return undefined;
    if (m.id === 'code-volume' && m.subtext.includes('16 Repositories')) {
      return t('dashboard.metrics.acrossRepos', m.subtext);
    }
    if (m.id === 'system-uptime' && m.subtext.toLowerCase().includes('backend offline')) {
      return t('dashboard.metrics.backendOffline', m.subtext);
    }
    return m.subtext;
  };

  const getMetricValue = (m: DashboardMetric) => {
    if (typeof m.value === 'string' && m.value.toLowerCase() === 'unavailable') {
      return t('dashboard.metrics.unavailable', m.value);
    }
    return m.value;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-1.5 font-sans">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-sm bg-background p-2.5 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] animate-pulse"
          >
            <div className="size-8 shrink-0 rounded-xs bg-muted" />
            <div className="flex-1 space-y-1.5">
              <div className="h-1.5 w-16 rounded bg-muted" />
              <div className="h-2.5 w-10 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1.5 font-sans">
      {metrics.map((metric) => {
        const Icon = ICON_MAP[metric.icon] ?? Code2;
        const sub = getMetricSubtext(metric);
        return (
          <div
            key={metric.id}
            className="group flex items-center gap-2 rounded-sm bg-background p-2.5 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] transition-shadow duration-200 hover:shadow-gray-400 dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.03)]"
          >
            <div
              className={`flex size-8 shrink-0 items-center justify-center rounded-xs text-white ${metric.color}`}
            >
              <Icon className="size-4" strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <p className="text-[6.5px] leading-none text-muted-foreground">
                {getMetricLabel(metric)}
              </p>
              <p className="mt-0.5 text-[11px] font-semibold leading-none">
                {getMetricValue(metric)}
              </p>
              {sub && (
                <p className="mt-0.5 truncate text-[6px] leading-none text-muted-foreground/70">
                  {sub}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
