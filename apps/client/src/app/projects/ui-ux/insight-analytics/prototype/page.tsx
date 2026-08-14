import { UIUXProjectPrototypeView } from '@/components/projects/UIUXProjectPrototypeView';
import { INSIGHT_ANALYTICS_PROTOTYPE_DATA } from '@/data/projects/insight-analytics';
import type { UIUXPrototypeData } from '@/data/projects/neobank-mobile';

export const metadata = {
  title: 'Insight Analytics - Prototype',
  description: 'Interactive prototypes and design specifications for Insight Analytics.',
};

export default function InsightAnalyticsPrototypePage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectPrototypeView
        data={INSIGHT_ANALYTICS_PROTOTYPE_DATA as unknown as UIUXPrototypeData}
      />
    </main>
  );
}
