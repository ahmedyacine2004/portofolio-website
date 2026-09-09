import { api } from '@/lib/api';
import type {
  AnalyticsSummary,
  ApiRequestLog,
  DashboardActivityItem,
  DashboardStatsResponse,
  DashboardSummaryResponse,
  GoalProgressItem,
  SessionStats,
  SystemHealthStatus,
  VisitorLog,
} from '@/types/dashboard.types';

interface ApiWrapper<T> {
  success: boolean;
  data: T;
  message: string;
}

export async function getDashboardSummary(): Promise<DashboardSummaryResponse> {
  const { data } = await api.get<ApiWrapper<DashboardSummaryResponse>>('/dashboard/summary');
  return data.data;
}

export async function getDashboardActivity(
  category?: string,
  limit?: number,
): Promise<DashboardActivityItem[]> {
  const params: Record<string, string | number> = {};
  if (category && category !== 'all') params.category = category;
  if (limit) params.limit = limit;

  const { data } = await api.get<ApiWrapper<DashboardActivityItem[]>>('/dashboard/activity', {
    params,
  });
  return data.data;
}

export async function getDashboardStats(): Promise<DashboardStatsResponse> {
  const { data } = await api.get<ApiWrapper<DashboardStatsResponse>>('/dashboard/stats');
  return data.data;
}

export async function getDashboardGoals(): Promise<GoalProgressItem[]> {
  const { data } = await api.get<ApiWrapper<GoalProgressItem[]>>('/dashboard/goals');
  return data.data;
}

export async function getDashboardHealth(): Promise<SystemHealthStatus> {
  const { data } = await api.get<ApiWrapper<SystemHealthStatus>>('/dashboard/health');
  return data.data;
}

export async function getDashboardAnalytics(): Promise<AnalyticsSummary> {
  const { data } = await api.get<ApiWrapper<AnalyticsSummary>>('/dashboard/analytics');
  return data.data;
}

export async function getDashboardVisitors(limit = 50): Promise<VisitorLog[]> {
  const { data } = await api.get<ApiWrapper<VisitorLog[]>>('/dashboard/visitors', {
    params: { limit },
  });
  return data.data;
}

export async function getDashboardRequests(limit = 100): Promise<ApiRequestLog[]> {
  const { data } = await api.get<ApiWrapper<ApiRequestLog[]>>('/dashboard/requests', {
    params: { limit },
  });
  return data.data;
}

export async function getDashboardSessions(): Promise<SessionStats> {
  const { data } = await api.get<ApiWrapper<SessionStats>>('/dashboard/sessions');
  return data.data;
}
