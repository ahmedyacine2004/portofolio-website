'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  Eye,
  FolderKanban,
  Globe,
  LogOut,
  RefreshCw,
  Server,
  Users,
  Wifi,
  Code2,
  Zap,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { DashboardActivityFeed } from '@/components/dashboard/dashboard-activity-feed';
import { DashboardAnalytics } from '@/components/dashboard/dashboard-analytics';
import { DashboardRequestLog } from '@/components/dashboard/dashboard-request-log';
import { DashboardSessions } from '@/components/dashboard/dashboard-sessions';
import { DashboardStatistics } from '@/components/dashboard/dashboard-statistics';
import { DashboardSystemHealth } from '@/components/dashboard/dashboard-system-health';
import { DashboardVisitorLog } from '@/components/dashboard/dashboard-visitor-log';
import { useDashboard } from '@/hooks/use-dashboard';
import { useTranslation } from '@/hooks/use-translation';
import { useAdminAuthStore } from '@/stores/admin-auth.store';

// ─── Icon map for summary metrics ──────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Activity,
  FolderKanban,
  Code2,
  GraduationCap,
  Zap,
  ShieldCheck,
  Eye,
  Globe,
  Server,
};

// ─── Stat card ────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
  isLoading?: boolean;
}

function StatCard({ icon: Icon, label, value, sub, color, isLoading }: StatCardProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-xs bg-muted" />
          <div className="flex-1 space-y-1.5">
            <div className="h-1.5 w-16 rounded bg-muted" />
            <div className="h-4 w-12 rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex items-center gap-3 rounded-sm bg-background p-3 shadow-gray-300 transition-shadow duration-200 hover:shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.03)]">
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-xs text-white ${color}`}
      >
        <Icon className="size-4" strokeWidth={1.8} />
      </div>
      <div className="min-w-0">
        <p className="text-[7px] leading-none text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-[15px] font-black leading-tight tracking-tight">{value}</p>
        {sub && <p className="mt-px truncate text-[6px] text-muted-foreground/70">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Goal row ──────────────────────────────────────────────────────────────

function GoalRow({
  title,
  category,
  progress,
  targetDate,
  status,
  statusLabel,
}: {
  title: string;
  category: string;
  progress: number;
  targetDate: string;
  status: string;
  statusLabel: string;
}) {
  const statusColor =
    status === 'active'
      ? 'text-sky-600 dark:text-sky-400 bg-sky-500/10'
      : status === 'completed'
        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
        : 'text-muted-foreground bg-muted';

  const barColor =
    progress >= 90 ? 'bg-emerald-500' : progress >= 60 ? 'bg-sky-500' : 'bg-amber-500';

  return (
    <div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-inter text-[7.5px] font-semibold leading-tight">{title}</p>
          <p className="text-[6px] text-muted-foreground">
            {category} · {targetDate}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span
            className={`rounded-xs px-1 py-px text-[5.5px] font-semibold uppercase ${statusColor}`}
          >
            {statusLabel}
          </span>
          <span className="font-mono text-[7px] font-bold">{progress}%</span>
        </div>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { t, locale } = useTranslation();
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
    isLiveFeed,
    lastUpdated,
    activityFilter,
    setActivityFilter,
    refresh,
  } = useDashboard();

  const metrics = useMemo(() => data.summary?.metrics ?? [], [data.summary]);
  const activities = data.activity ?? [];
  const analytics = data.analytics;
  const sessions = data.sessions;

  const getMetricLabel = (m: { id: string; label: string }) => {
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

  const getMetricSubtext = (m: { id: string; subtext?: string }) => {
    if (!m.subtext) return undefined;
    if (m.id === 'code-volume' && m.subtext.includes('16 Repositories')) {
      return t('dashboard.metrics.acrossRepos', m.subtext);
    }
    if (m.id === 'system-uptime' && m.subtext.toLowerCase().includes('backend offline')) {
      return t('dashboard.metrics.backendOffline', m.subtext);
    }
    return m.subtext;
  };

  const getMetricValue = (m: { id: string; value: string | number }) => {
    if (typeof m.value === 'string' && m.value.toLowerCase() === 'unavailable') {
      return t('dashboard.metrics.unavailable', m.value);
    }
    return m.value;
  };

  const getGoalStatusLabel = (status: string) => {
    if (status === 'active') return t('dashboard.statusActive', 'Active');
    if (status === 'completed') return t('dashboard.statusCompleted', 'Completed');
    if (status === 'planned') return t('dashboard.statusPlanned', 'Planned');
    return status;
  };

  // ─── Unauthenticated gate ───────────────────────────────────────────────

  if (!isAuthenticated) {
    return (
      <div className="flex h-full items-center justify-center bg-background p-6 font-sans [--font-display:var(--font-sans)] [--font-beni:var(--font-sans)]">
        <div className="w-full max-w-lg rounded-sm border border-border bg-card p-6 shadow-lg shadow-gray-300 dark:shadow-[0_0_10px_rgba(255,255,255,0.02)]">
          <div className="mb-5">
            <p className="font-inter text-[9px] font-bold uppercase tracking-[0.24em] text-primary/80">
              {t('dashboard.restrictedAccess', 'Restricted Access')}
            </p>
            <h1 className="mt-2 font-inter text-2xl font-black tracking-tight">
              {t('dashboard.adminDashboard', 'Admin Dashboard')}
            </h1>
          </div>

          <div className="space-y-4 text-sm text-foreground/80">
            <p>
              {t(
                'dashboard.restrictedDesc',
                'This dashboard is visible only to the administrator. Sign in from the terminal using the credentials set in your environment file.',
              )}
            </p>

            <div className="rounded-sm border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground">
              portfolio login &lt;username&gt; &lt;password&gt;
            </div>

            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {t(
                'dashboard.requiredEnv',
                'Required env vars: NEXT_PUBLIC_ADMIN_USERNAME and NEXT_PUBLIC_ADMIN_PASSWORD',
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Dashboard layout ───────────────────────────────────────────────────

  return (
    <div className="h-full w-full overflow-y-auto p-3 text-foreground font-sans [--font-display:var(--font-sans)] [--font-beni:var(--font-sans)]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <header className="flex flex-col gap-2 rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-inter text-[7px] font-bold uppercase tracking-[0.18em] text-primary/80">
                {t('dashboard.adminHub', 'Admin · Portfolio Hub')}
              </p>
              <h1 className="mt-1 font-inter text-[22px] font-black leading-none tracking-[-0.06em]">
                {t('dashboard.title', 'System Dashboard')}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {/* Live indicator */}
              <span
                className={`inline-flex items-center gap-1 rounded-xs border px-2 py-1 text-[7px] font-medium ${
                  isLiveFeed
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${isLiveFeed ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}
                />
                {isLiveFeed
                  ? t('dashboard.live', 'Live')
                  : t('dashboard.offlineMode', 'Offline Mode')}
              </span>

              <button
                type="button"
                onClick={refresh}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1 rounded-xs border border-border bg-muted/40 px-2 py-1 text-[7px] font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw className={`size-2.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing
                  ? t('dashboard.refreshing', 'Refreshing…')
                  : t('dashboard.refresh', 'Refresh')}
              </button>

              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1 rounded-xs border border-border bg-muted/40 px-2 py-1 text-[7px] font-medium transition hover:bg-muted"
              >
                <LogOut className="size-2.5" />
                {t('dashboard.logout', 'Log Out')}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[7px] text-muted-foreground">
            <Wifi className="size-2.5" />
            <span>
              {lastUpdated
                ? `${t('dashboard.lastUpdated', 'Updated')} ${lastUpdated.toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`
                : t('dashboard.fetching', 'Fetching…')}
            </span>
            <span className="size-1 rounded-full bg-muted-foreground/60" />
            <span>
              {t('dashboard.telemetrySubtitle', 'Next.js + NestJS telemetry · refreshes every 15s')}
            </span>
          </div>
        </header>

        {/* ── Error banner ────────────────────────────────────────────── */}
        {hasError && (
          <div className="flex items-center gap-2 rounded-sm border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-[7px] text-amber-900 dark:text-amber-200">
            <AlertTriangle className="size-3 shrink-0" />
            {t(
              'dashboard.cachedWarning',
              'Backend server is currently unreachable. Displaying cached fallback data. Live telemetry is unavailable.',
            )}
          </div>
        )}

        {/* ── Top KPI row ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <StatCard key={i} icon={Activity} label="" value="" color="bg-muted" isLoading />
              ))
            : metrics.map((m) => {
                const Icon = ICON_MAP[m.icon] ?? Activity;
                return (
                  <StatCard
                    key={m.id}
                    icon={Icon}
                    label={getMetricLabel(m)}
                    value={getMetricValue(m)}
                    sub={getMetricSubtext(m)}
                    color={m.color}
                    trend={m.trend}
                  />
                );
              })}
        </div>

        {/* ── Main content grid ────────────────────────────────────────── */}
        <div className="grid gap-3 xl:grid-cols-[1fr_300px]">
          {/* Left column */}
          <div className="space-y-3">
            {/* Analytics charts */}
            <section>
              <DashboardAnalytics analytics={analytics} isLoading={isLoading} />
            </section>

            {/* Logs row */}
            <div className="grid gap-3 lg:grid-cols-2">
              <DashboardRequestLog requests={data.requests} isLoading={isLoading} />
              <DashboardVisitorLog visitors={data.visitors} isLoading={isLoading} />
            </div>

            {/* Activity + Stats */}
            <div className="grid gap-3 lg:grid-cols-[1.3fr_0.7fr]">
              <DashboardActivityFeed
                items={activities}
                isLoading={isLoading}
                filter={activityFilter}
                onFilterChange={setActivityFilter}
              />

              <div className="space-y-3">
                <DashboardSessions sessions={sessions} isLoading={isLoading} />
                <DashboardStatistics stats={data.stats} isLoading={isLoading} />
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-3">
            {/* System health */}
            <DashboardSystemHealth health={data.health} isLoading={isLoading} />

            {/* Goals */}
            <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
              <h2 className="font-inter text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {t('dashboard.goalsProgress', 'Goals & Progress')}
              </h2>
              <div className="mt-3 space-y-3">
                {isLoading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="space-y-1 animate-pulse">
                        <div className="h-2 w-32 rounded bg-muted" />
                        <div className="h-1.5 w-full rounded-full bg-muted" />
                      </div>
                    ))
                  : data.goals.map((g) => (
                      <GoalRow key={g.id} {...g} statusLabel={getGoalStatusLabel(g.status)} />
                    ))}
              </div>
            </div>

            {/* Work status */}
            <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
              <h2 className="font-inter text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {t('dashboard.workStatus', 'Work Status')}
              </h2>
              <div className="mt-3 space-y-1.5 text-[7.5px] text-foreground/80">
                <p>
                  {data.summary?.workStatus.availability === 'Available for Full-time & Freelance'
                    ? t('dashboard.defaultAvailability', 'Available for Full-time & Freelance')
                    : (data.summary?.workStatus.availability ??
                      t('dashboard.defaultAvailability', 'Available for Full-time & Freelance'))}
                </p>
                <p>
                  {data.summary?.workStatus.focus?.includes('CONSULTIFY')
                    ? t(
                        'dashboard.defaultFocus',
                        'Building CONSULTIFY & exploring AI-driven workspaces',
                      )
                    : (data.summary?.workStatus.focus ??
                      t(
                        'dashboard.defaultFocus',
                        'Building CONSULTIFY & exploring AI-driven workspaces',
                      ))}
                </p>
                <p className="text-muted-foreground">
                  {data.summary?.workStatus.timezone?.includes('Algiers')
                    ? t('dashboard.defaultTimezone', 'GMT+1 (Algiers, Algeria)')
                    : (data.summary?.workStatus.timezone ??
                      t('dashboard.defaultTimezone', 'GMT+1 (Algiers, Algeria)'))}
                </p>
                <p className="text-muted-foreground">
                  {data.summary?.workStatus.location?.includes('ESTIN')
                    ? t('dashboard.defaultLocation', 'Tebessa, Algeria · ESTIN Student')
                    : (data.summary?.workStatus.location ??
                      t('dashboard.defaultLocation', 'Tebessa, Algeria · ESTIN Student'))}
                </p>
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
              <h2 className="font-inter text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {t('dashboard.quickActions', 'Quick Actions')}
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-1.5 text-[7px]">
                {[
                  { label: t('dashboard.viewProjects', 'View Projects'), href: '/projects' },
                  { label: t('dashboard.viewSkills', 'View Skills'), href: '/skills' },
                  { label: t('dashboard.aboutMe', 'About Me'), href: '/about' },
                  { label: t('dashboard.contact', 'Contact'), href: '/contact' },
                  { label: t('dashboard.experience', 'Experience'), href: '/experience' },
                  {
                    label: t('dashboard.certifications', 'Certifications'),
                    href: '/certification',
                  },
                ].map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-xs border border-border bg-muted/40 px-2 py-2 text-left font-medium transition hover:bg-muted"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
