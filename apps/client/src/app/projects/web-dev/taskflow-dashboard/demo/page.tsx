import { WebProjectDemoView } from '@/components/projects/WebProjectDemoView';
import { TASKFLOW_DASHBOARD_DEMO_DATA } from '@/data/projects/taskflow-dashboard';

export const metadata = {
  title: 'TaskFlow Dashboard - Live Demo Execution',
  description: 'Interactive execution and demo session configuration for TaskFlow Dashboard.',
};

export default function TaskFlowDashboardDemoPage() {
  return (
    <main className="h-full w-full p-2">
      <WebProjectDemoView data={TASKFLOW_DASHBOARD_DEMO_DATA} />
    </main>
  );
}
