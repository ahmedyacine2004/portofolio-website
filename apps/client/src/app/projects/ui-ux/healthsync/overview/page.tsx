import { UIUXProjectOverviewView } from '@/components/projects/UIUXProjectOverviewView';
import { HEALTHSYNC_OVERVIEW_DATA } from '@/data/projects/healthsync';

export const metadata = {
  title: 'HealthSync - UI/UX Design Overview',
  description:
    'Product overview, design process, visual system, and impact metrics for HealthSync.',
};

export default function HealthSyncOverviewPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectOverviewView data={HEALTHSYNC_OVERVIEW_DATA} />
    </main>
  );
}
