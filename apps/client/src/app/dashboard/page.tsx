'use client';

import { useEffect, useMemo } from 'react';

import { DashboardActivityFeed } from '@/components/dashboard/dashboard-activity-feed';
import { DashboardMetrics } from '@/components/dashboard/dashboard-metrics';
import { DashboardStatistics } from '@/components/dashboard/dashboard-statistics';
import { DashboardSystemHealth } from '@/components/dashboard/dashboard-system-health';
import { useDashboard } from '@/hooks/use-dashboard';
import { useAdminAuthStore } from '@/stores/admin-auth.store';

export default function DashboardPage() {
  const isAuthenticated = useAdminAuthStore((state) => state.isAuthenticated);
  const logout = useAdminAuthStore((state) => state.logout);
  const refreshSession = useAdminAuthStore((state) => state.refreshSession);

  useEffect(() => {
    void refreshSession();

    if (!isAuthenticated && typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('admin');
      window.history.replaceState({}, '', url);
    }
  }, [isAuthenticated, refreshSession]);

  const {
    data,
    isLoading,
    isRefreshing,
    hasError,
    lastUpdated,
    activityFilter,
    setActivityFilter,
    refresh,
  } = useDashboard();

  const metrics = useMemo(() => data.summary?.metrics ?? [], [data.summary]);
  const activities = data.activity ?? [];

  if (!isAuthenticated) {
    return (
      <div className="flex h-full items-center justify-center bg-background p-6">
        <div className="w-full max-w-lg rounded-sm border border-border bg-card p-6 shadow-lg shadow-gray-300 dark:shadow-[0_0_10px_rgba(255,255,255,0.02)]">
          <div className="mb-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-primary/80">
              Restricted Access
            </p>
            <h1 className="mt-2 font-inter text-2xl font-black tracking-tight">Admin Dashboard</h1>
          </div>

          <div className="space-y-4 text-sm text-foreground/80">
            <p>
              This dashboard is visible only to the administrator. Sign in from the terminal using
              the credentials set in your environment file.
            </p>

            <div className="rounded-sm border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground">
              portfolio login &lt;username&gt; &lt;password&gt;
            </div>

            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Required env vars: NEXT_PUBLIC_ADMIN_USERNAME and NEXT_PUBLIC_ADMIN_PASSWORD
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto p-3 text-foreground">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3">
        <header className="flex flex-col gap-2 rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-primary/80">
                Portfolio Hub & Metrics
              </p>
              <h1 className="mt-1 font-inter text-[22px] font-black leading-none tracking-[-0.06em]">
                System Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-xs border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[7px] font-medium text-emerald-600 dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Operational
              </span>

              <button
                type="button"
                onClick={logout}
                className="rounded-xs border border-border bg-muted/40 px-2 py-1 text-[7px] font-medium text-foreground transition hover:bg-muted"
              >
                Log Out
              </button>

              <button
                type="button"
                onClick={refresh}
                disabled={isRefreshing}
                className="rounded-xs border border-border bg-muted/40 px-2 py-1 text-[7px] font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[7px] text-muted-foreground">
            <span>
              {lastUpdated
                ? `Updated ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : 'Updated --:--'}
            </span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
            <span>Next.js + NestJS telemetry</span>
          </div>
        </header>

        {hasError && (
          <div className="rounded-sm border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-[7px] text-amber-900 dark:text-amber-200">
            Backend server is currently unreachable. Displaying fallback workspace metrics.
          </div>
        )}

        <div className="grid gap-3 xl:grid-cols-[1.6fr_0.9fr]">
          <section className="space-y-3">
            <DashboardMetrics metrics={metrics} isLoading={isLoading} />

            <div className="grid gap-3 lg:grid-cols-[1.3fr_0.7fr]">
              <DashboardActivityFeed
                items={activities}
                isLoading={isLoading}
                filter={activityFilter}
                onFilterChange={setActivityFilter}
              />

              <div className="space-y-3">
                <DashboardStatistics stats={data.stats} isLoading={isLoading} />
                <DashboardSystemHealth health={data.health} isLoading={isLoading} />
              </div>
            </div>
          </section>

          <aside className="space-y-3">
            <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
              <h2 className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Work Status
              </h2>

              <div className="mt-3 space-y-2 text-[8px] text-foreground-secondary">
                <p>
                  {data.summary?.workStatus.availability ?? 'Available for Full-time & Freelance'}
                </p>
                <p>
                  {data.summary?.workStatus.focus ??
                    'Building CONSULTIFY & exploring AI-driven workspaces'}
                </p>
                <p>{data.summary?.workStatus.timezone ?? 'GMT+1 (Algiers, Algeria)'}</p>
                <p>{data.summary?.workStatus.location ?? 'Tebessa, Algeria · ESTIN Student'}</p>
              </div>
            </div>

            <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
              <h2 className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Quick Actions
              </h2>

              <div className="mt-3 grid grid-cols-2 gap-2 text-[7px]">
                {[
                  'AI Assistant',
                  'Open Terminal',
                  'View Projects',
                  'View Skills',
                  'Contact Me',
                  'Download Resume',
                ].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="rounded-xs border border-border bg-muted/40 px-2 py-2 text-left font-medium transition hover:bg-muted"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
