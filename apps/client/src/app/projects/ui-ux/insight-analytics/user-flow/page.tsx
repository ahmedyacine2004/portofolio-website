import { UIUXProjectUserFlowView } from '@/components/projects/UIUXProjectUserFlowView';
import { INSIGHT_ANALYTICS_USER_FLOW_DATA } from '@/data/projects/insight-analytics';
import type { UIUXUserFlowData } from '@/data/projects/neobank-mobile';

export const metadata = {
  title: 'Insight Analytics - User Flow',
  description: 'User journey flows and interaction patterns for Insight Analytics.',
};

export default function InsightAnalyticsUserFlowPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectUserFlowView
        data={INSIGHT_ANALYTICS_USER_FLOW_DATA as unknown as UIUXUserFlowData}
      />
    </main>
  );
}
