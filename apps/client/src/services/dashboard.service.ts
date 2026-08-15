import { api } from '@/lib/api';
import type {
  DashboardActivityItem,
  DashboardSummaryResponse,
  DashboardStatsResponse,
  GoalProgressItem,
  SystemHealthStatus,
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
