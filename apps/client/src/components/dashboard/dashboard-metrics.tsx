'use client';

import {
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  RefreshCw,
  ShieldCheck,
  UserRound,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { DashboardMetric } from '@/types/dashboard.types';

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
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-1.5">
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
    <div className="grid grid-cols-3 gap-1.5">
      {metrics.map((metric) => {
        const Icon = ICON_MAP[metric.icon] ?? Code2;
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
              <p className="text-[6.5px] leading-none text-muted-foreground">{metric.label}</p>
              <p className="mt-0.5 text-[11px] font-semibold leading-none">{metric.value}</p>
              {metric.subtext && (
                <p className="mt-0.5 truncate text-[6px] leading-none text-muted-foreground/70">
                  {metric.subtext}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
