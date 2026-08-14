import { WebProjectDetailsView } from '@/components/projects/WebProjectDetailsView';
import { TASKFLOW_DASHBOARD_DETAILS } from '@/data/projects/taskflow-dashboard';

export const metadata = {
  title: 'TaskFlow Dashboard - Project Details',
  description:
    'Project overview, objectives, architecture, and engineering highlights for TaskFlow Dashboard.',
};

export default function TaskFlowDashboardDetailsPage() {
  return (
    <main className="h-full w-full p-2">
      <WebProjectDetailsView data={TASKFLOW_DASHBOARD_DETAILS} />
    </main>
  );
}
