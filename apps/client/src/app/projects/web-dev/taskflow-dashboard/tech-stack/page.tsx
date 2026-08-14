import { WebProjectTechStackView } from '@/components/projects/WebProjectTechStackView';
import { TASKFLOW_DASHBOARD_TECH_STACK_DATA } from '@/data/projects/taskflow-dashboard';

export const metadata = {
  title: 'TaskFlow Dashboard - Tech Stack',
  description: 'Interactive runtime and technology stack powering TaskFlow Dashboard.',
};

export default function TaskFlowDashboardTechStackPage() {
  return (
    <main className="h-full w-full p-2">
      <WebProjectTechStackView data={TASKFLOW_DASHBOARD_TECH_STACK_DATA} />
    </main>
  );
}
