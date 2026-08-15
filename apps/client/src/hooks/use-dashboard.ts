'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  getDashboardActivity,
  getDashboardGoals,
  getDashboardHealth,
  getDashboardStats,
  getDashboardSummary,
} from '@/services/dashboard.service';
import type {
  ActivityFilter,
  DashboardActivityItem,
  DashboardData,
  DashboardStatsResponse,
  DashboardSummaryResponse,
  GoalProgressItem,
  SystemHealthStatus,
} from '@/types/dashboard.types';

// ---------------------------------------------------------------------------
// Fallback data (displayed when backend is unreachable)
// ---------------------------------------------------------------------------

const FALLBACK_SUMMARY: DashboardSummaryResponse = {
  metrics: [
    {
      id: 'projects',
      label: 'Total Projects',
      value: '16+',
      change: '+4 this quarter',
      trend: 'up',
      icon: 'FolderKanban',
      color: 'bg-violet-600',
      subtext: '4 Production · 12 Prototypes',
    },
    {
      id: 'experience',
      label: 'Experience',
      value: '2+ Years',
      change: 'Active Contributor',
      trend: 'up',
      icon: 'UserRound',
      color: 'bg-sky-500',
      subtext: 'Full Stack & UI/UX',
    },
    {
      id: 'skills',
      label: 'Technologies',
      value: '35+',
      change: '10 Core Frameworks',
      trend: 'neutral',
      icon: 'Code2',
      color: 'bg-emerald-500',
      subtext: 'TypeScript, React, NestJS',
    },
    {
      id: 'certifications',
      label: 'Certifications',
      value: '6',
      change: 'Verified',
      trend: 'up',
      icon: 'GraduationCap',
      color: 'bg-amber-500',
      subtext: 'ESTIN & Tech Programs',
    },
    {
      id: 'code-volume',
      label: 'Code Volume',
      value: '50k+',
      change: 'Lines of Code',
      trend: 'up',
      icon: 'Zap',
      color: 'bg-rose-500',
      subtext: 'Across 16 Repositories',
    },
    {
      id: 'system-uptime',
      label: 'System Status',
      value: '99.9%',
      change: 'Operational',
      trend: 'neutral',
      icon: 'ShieldCheck',
      color: 'bg-emerald-600',
      subtext: 'NestJS · Next.js 15',
    },
  ],
  workStatus: {
    availability: 'Available for Full-time & Freelance',
    focus: 'Building CONSULTIFY & Exploring AI-driven Workspaces',
    timezone: 'GMT+1 (Algiers, Algeria)',
    location: 'Tebessa, Algeria · ESTIN Student',
  },
  highlights: {
    featuredProject: {
      name: 'CONSULTIFY',
      slug: 'consultify',
      tech: ['React', 'Next.js', 'Node.js', 'MongoDB'],
      status: 'In Active Development',
    },
    totalCommitsEstimate: 840,
    linesOfCodeEstimate: '50,000+',
  },
};

const FALLBACK_ACTIVITY: DashboardActivityItem[] = [
  {
    id: 'act-1',
    title: 'CONSULTIFY Workspace Architecture',
    description: 'Completed multi-tenant authentication and project matching workflow engine.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    category: 'project',
    status: 'deployed',
    link: '/projects',
    badgeColor: 'bg-violet-600',
  },
  {
    id: 'act-2',
    title: 'Backend Skills & Interactive Workspaces',
    description:
      'Published interactive IDE simulations for NestJS, TypeScript, and MongoDB architectures.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    category: 'code',
    status: 'completed',
    link: '/skills',
    badgeColor: 'bg-sky-500',
  },
  {
    id: 'act-3',
    title: 'Dashboard Analytics Engine Online',
    description: 'NestJS REST API telemetry and dynamic health inspection modules initiated.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    category: 'system',
    status: 'verified',
    link: '/dashboard',
    badgeColor: 'bg-emerald-500',
  },
  {
    id: 'act-4',
    title: 'ESTIN Academic Milestone Completed',
    description: 'Successfully finished advanced distributed systems & algorithms coursework.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    category: 'milestone',
    status: 'completed',
    link: '/about',
    badgeColor: 'bg-amber-500',
  },
  {
    id: 'act-5',
    title: 'Lumina Studio Brand Kit Finalized',
    description:
      'Exported complete vector assets, typography system, and mobile design guidelines.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    category: 'project',
    status: 'deployed',
    link: '/projects',
    badgeColor: 'bg-violet-600',
  },
];

const FALLBACK_STATS: DashboardStatsResponse = {
  techDistribution: [
    { name: 'Frontend (React/Next.js)', count: 14, percentage: 40, color: 'bg-sky-500' },
    { name: 'Backend (NestJS/Node/Express)', count: 12, percentage: 32, color: 'bg-violet-600' },
    { name: 'Databases (MongoDB/PostgreSQL)', count: 8, percentage: 18, color: 'bg-emerald-500' },
    { name: 'DevOps & Tooling (Docker/Git)', count: 6, percentage: 10, color: 'bg-amber-500' },
  ],
  projectCategoryBreakdown: [
    { category: 'Full-Stack Apps', count: 7 },
    { category: 'Frontend & UI Kits', count: 4 },
    { category: 'Brand & Visual Identity', count: 3 },
    { category: 'Backend & APIs', count: 2 },
  ],
  skillProficiency: [
    { domain: 'Frontend Development', score: 94, skillsCount: 12 },
    { domain: 'Backend Architecture', score: 90, skillsCount: 10 },
    { domain: 'UI/UX & Design Systems', score: 88, skillsCount: 8 },
    { domain: 'Database & Data Modeling', score: 85, skillsCount: 6 },
    { domain: 'DevOps & Deployment', score: 80, skillsCount: 5 },
  ],
  monthlyActivity: [
    { month: 'Jan', contributions: 42 },
    { month: 'Feb', contributions: 68 },
    { month: 'Mar', contributions: 95 },
    { month: 'Apr', contributions: 82 },
    { month: 'May', contributions: 110 },
    { month: 'Jun', contributions: 124 },
    { month: 'Jul', contributions: 145 },
    { month: 'Aug', contributions: 174 },
  ],
};

const FALLBACK_GOALS: GoalProgressItem[] = [
  {
    id: 'goal-1',
    title: 'CONSULTIFY Platform v1.0 Launch',
    category: 'Product Launch',
    progress: 85,
    targetDate: 'Q3 2026',
    status: 'active',
  },
  {
    id: 'goal-2',
    title: 'Portfolio Workspace Interactive Shell V2',
    category: 'Engineering',
    progress: 95,
    targetDate: 'Q3 2026',
    status: 'active',
  },
  {
    id: 'goal-3',
    title: 'AWS Certified Cloud Practitioner',
    category: 'Certification',
    progress: 60,
    targetDate: 'Q4 2026',
    status: 'active',
  },
  {
    id: 'goal-4',
    title: 'Open-Source Devtools & Component Library',
    category: 'Open Source',
    progress: 40,
    targetDate: 'Q4 2026',
    status: 'planned',
  },
];

const FALLBACK_HEALTH: SystemHealthStatus = {
  status: 'degraded',
  uptimeSeconds: 0,
  uptimeFormatted: 'Unavailable',
  memoryUsageMb: 0,
  nodeVersion: 'N/A',
  environment: 'development',
  databaseStatus: 'mocked',
  apiLatencyMs: 0,
  version: '1.0.0',
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

interface UseDashboardReturn {
  data: DashboardData;
  isLoading: boolean;
  isRefreshing: boolean;
  hasError: boolean;
  isLiveFeed: boolean;
  lastUpdated: Date | null;
  activityFilter: ActivityFilter;
  setActivityFilter: (filter: ActivityFilter) => void;
  refresh: () => void;
}

export function useDashboard(): UseDashboardReturn {
  const [data, setData] = useState<DashboardData>({
    summary: null,
    activity: [],
    stats: null,
    goals: [],
    health: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLiveFeed, setIsLiveFeed] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>('all');

  const healthIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAll = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);

    try {
      const [summary, activity, stats, goals, health] = await Promise.all([
        getDashboardSummary(),
        getDashboardActivity(),
        getDashboardStats(),
        getDashboardGoals(),
        getDashboardHealth(),
      ]);

      setData({ summary, activity, stats, goals, health });
      setHasError(false);
      setIsLiveFeed(true);
      setLastUpdated(new Date());
    } catch {
      if (!silent) {
        setData({
          summary: FALLBACK_SUMMARY,
          activity: FALLBACK_ACTIVITY,
          stats: FALLBACK_STATS,
          goals: FALLBACK_GOALS,
          health: FALLBACK_HEALTH,
        });
        setHasError(true);
        setIsLiveFeed(false);
        setLastUpdated(new Date());
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Refresh only health every 30s for real-time feel
  const fetchHealth = useCallback(async () => {
    try {
      const health = await getDashboardHealth();
      setData((prev) => ({ ...prev, health }));
    } catch {
      // silently ignore
    }
  }, []);

  useEffect(() => {
    fetchAll(false);

    healthIntervalRef.current = setInterval(() => {
      fetchHealth();
    }, 30_000);

    return () => {
      if (healthIntervalRef.current) clearInterval(healthIntervalRef.current);
    };
  }, [fetchAll, fetchHealth]);

  const refresh = useCallback(() => {
    fetchAll(true);
  }, [fetchAll]);

  return {
    data,
    isLoading,
    isRefreshing,
    hasError,
    isLiveFeed,
    lastUpdated,
    activityFilter,
    setActivityFilter,
    refresh,
  };
}
