import { api } from '@/lib/api';

export type ApiResponse = {
  success: boolean;
  message: string;
  timestamp: string;
  version: string;
};

export async function getApi() {
  const { data } = await api.get<ApiResponse>('/');

  return data;
}
