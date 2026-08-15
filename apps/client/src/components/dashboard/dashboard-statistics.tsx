'use client';

import type { DashboardStatsResponse } from '@/types/dashboard.types';

interface DashboardStatisticsProps {
  stats: DashboardStatsResponse | null;
  isLoading: boolean;
}

export function DashboardStatistics({ stats, isLoading }: DashboardStatisticsProps) {
  if (isLoading || !stats) {
    return (
      <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
        <div className="h-4 w-28 animate-pulse rounded bg-muted" />
        <div className="mt-3 space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-10 animate-pulse rounded bg-muted/80" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
      <h2 className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        Statistics
      </h2>

      <div className="mt-3 space-y-4 text-[7px]">
        <div>
          <p className="mb-2 text-[7px] font-medium text-muted-foreground">
            Technology Stack Distribution
          </p>
          <div className="space-y-2">
            {stats.techDistribution.map((item) => (
              <div key={item.name}>
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span>{item.name}</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div
                    className={`${item.color} h-full rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[7px] font-medium text-muted-foreground">Domain Mastery</p>
          <div className="space-y-2">
            {stats.skillProficiency.map((item) => (
              <div key={item.domain}>
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span>{item.domain}</span>
                  <span>{item.score}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 via-violet-500 to-emerald-500"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
