import { WebProjectRepositoryView } from '@/components/projects/WebProjectRepositoryView';
import { TASKFLOW_DASHBOARD_REPOSITORY_DATA } from '@/data/projects/taskflow-dashboard';

export const metadata = {
  title: 'TaskFlow Dashboard - Repository',
  description:
    'Repository information, CI/CD pipeline, and project statistics for TaskFlow Dashboard.',
};

export default function TaskFlowDashboardRepositoryPage() {
  return (
    <main className="h-full w-full p-2">
      <WebProjectRepositoryView data={TASKFLOW_DASHBOARD_REPOSITORY_DATA} />
    </main>
  );
}
