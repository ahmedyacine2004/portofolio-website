export class DashboardActivityQueryDto {
  category?:
    'all' | 'project' | 'code' | 'system' | 'milestone' | 'certification';
  limit?: number;
}
