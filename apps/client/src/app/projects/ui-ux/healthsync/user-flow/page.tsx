import { UIUXProjectUserFlowView } from '@/components/projects/UIUXProjectUserFlowView';
import { HEALTHSYNC_USER_FLOW_DATA } from '@/data/projects/healthsync';
import type { UIUXUserFlowData } from '@/data/projects/neobank-mobile';

export const metadata = {
  title: 'HealthSync - User Flow',
  description: 'User journey flows and interaction patterns for HealthSync.',
};

export default function HealthSyncUserFlowPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectUserFlowView data={HEALTHSYNC_USER_FLOW_DATA as unknown as UIUXUserFlowData} />
    </main>
  );
}
