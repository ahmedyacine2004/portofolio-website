export interface DashboardMetric {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
  subtext?: string;
}

export interface DashboardActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: 'project' | 'code' | 'system' | 'milestone' | 'certification';
  status: 'completed' | 'in-progress' | 'deployed' | 'verified';
  link?: string;
  badgeColor?: string;
}

export interface TechDistributionItem {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface GoalProgressItem {
  id: string;
  title: string;
  category: string;
  progress: number;
  targetDate: string;
  status: 'active' | 'completed' | 'planned';
}

export interface SystemHealthStatus {
  status: 'healthy' | 'degraded' | 'maintenance';
  uptimeSeconds: number;
  uptimeFormatted: string;
  memoryUsageMb: number;
  memoryTotalMb: number;
  memoryPercent: number;
  cpuUser: number;
  cpuSystem: number;
  nodeVersion: string;
  environment: string;
  databaseStatus: 'connected' | 'disconnected' | 'mocked';
  apiLatencyMs: number;
  version: string;
  requestsTotal: number;
  requestsLastHour: number;
  errorsLastHour: number;
}

export interface DashboardWorkStatus {
  availability: string;
  focus: string;
  timezone: string;
  location: string;
}

export interface DashboardSummaryResponse {
  metrics: DashboardMetric[];
  workStatus: DashboardWorkStatus;
  highlights: {
    featuredProject: {
      name: string;
      slug: string;
      tech: string[];
      status: string;
    };
    totalCommitsEstimate: number;
    linesOfCodeEstimate: string;
  };
}

export interface DashboardStatsResponse {
  techDistribution: TechDistributionItem[];
  projectCategoryBreakdown: { category: string; count: number }[];
  skillProficiency: { domain: string; score: number; skillsCount: number }[];
  monthlyActivity: { month: string; contributions: number }[];
}

export type ActivityFilter = 'all' | 'project' | 'code' | 'system' | 'milestone';

// ─── Telemetry / Analytics ──────────────────────────────────────────────────

export interface VisitorLog {
  id: string;
  ip: string;
  page: string;
  referrer: string;
  userAgent: string;
  deviceLabel: string;
  country: string;
  timestamp: string;
  sessionId: string;
}

export interface ApiRequestLog {
  id: string;
  method: string;
  path: string;
  statusCode: number;
  latencyMs: number;
  ip: string;
  userAgent: string;
  timestamp: string;
  isError: boolean;
}

export interface PageViewStat {
  page: string;
  views: number;
  percentage: number;
}

export interface DeviceStat {
  type: 'Desktop' | 'Mobile' | 'Tablet' | 'Bot' | 'Unknown';
  count: number;
  percentage: number;
}

export interface ReferrerStat {
  source: string;
  count: number;
  percentage: number;
}

export interface HourlyStat {
  hour: string;
  requests: number;
}

export interface AnalyticsSummary {
  visitorsToday: number;
  visitorsThisWeek: number;
  visitorsTotal: number;
  pageViewsToday: number;
  uniqueIpsToday: number;
  topPages: PageViewStat[];
  deviceBreakdown: DeviceStat[];
  referrerBreakdown: ReferrerStat[];
  hourlyRequests: HourlyStat[];
  requestsTotal: number;
  requestsToday: number;
  errorsToday: number;
  avgLatencyMs: number;
}

export interface SessionStats {
  activeSessions: number;
  totalSessionsToday: number;
  avgSessionDurationMs: number;
  topUserAgents: { label: string; count: number }[];
}

export interface DashboardData {
  summary: DashboardSummaryResponse | null;
  activity: DashboardActivityItem[];
  stats: DashboardStatsResponse | null;
  goals: GoalProgressItem[];
  health: SystemHealthStatus | null;
  analytics: AnalyticsSummary | null;
  visitors: VisitorLog[];
  requests: ApiRequestLog[];
  sessions: SessionStats | null;
}
