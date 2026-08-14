import { WebProjectGalleryView } from '@/components/projects/WebProjectGalleryView';
import { TASKFLOW_DASHBOARD_GALLERY_DATA } from '@/data/projects/taskflow-dashboard';

export default function TaskFlowDashboardGalleryPage() {
  return <WebProjectGalleryView data={TASKFLOW_DASHBOARD_GALLERY_DATA} />;
}
