import { UIUXProjectWireframesView } from '@/components/projects/UIUXProjectWireframesView';
import { INSIGHT_ANALYTICS_WIREFRAMES_DATA } from '@/data/projects/insight-analytics';
import type { UIUXWireframesData } from '@/data/projects/neobank-mobile';

export const metadata = {
  title: 'Insight Analytics - Wireframes',
  description: 'Low-fidelity and high-fidelity wireframes for Insight Analytics screens.',
};

export default function InsightAnalyticsWireframesPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectWireframesView
        data={INSIGHT_ANALYTICS_WIREFRAMES_DATA as unknown as UIUXWireframesData}
      />
    </main>
  );
}
