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
  nodeVersion: string;
  environment: string;
  databaseStatus: 'connected' | 'disconnected' | 'mocked';
  apiLatencyMs: number;
  version: string;
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
  projectCategoryBreakdown: {
    category: string;
    count: number;
  }[];
  skillProficiency: {
    domain: string;
    score: number;
    skillsCount: number;
  }[];
  monthlyActivity: {
    month: string;
    contributions: number;
  }[];
}

export type ActivityFilter = 'all' | 'project' | 'code' | 'system' | 'milestone';

export interface DashboardData {
  summary: DashboardSummaryResponse | null;
  activity: DashboardActivityItem[];
  stats: DashboardStatsResponse | null;
  goals: GoalProgressItem[];
  health: SystemHealthStatus | null;
}
