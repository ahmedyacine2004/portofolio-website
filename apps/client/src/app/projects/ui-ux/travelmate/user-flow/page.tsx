import { UIUXProjectUserFlowView } from '@/components/projects/UIUXProjectUserFlowView';
import type { UIUXUserFlowData } from '@/data/projects/neobank-mobile';
import { TRAVELMATE_USER_FLOW_DATA } from '@/data/projects/travelmate';

export const metadata = {
  title: 'TravelMate - User Flow',
  description: 'User journey flows and interaction patterns for TravelMate.',
};

export default function TravelMateUserFlowPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectUserFlowView data={TRAVELMATE_USER_FLOW_DATA as unknown as UIUXUserFlowData} />
    </main>
  );
}
