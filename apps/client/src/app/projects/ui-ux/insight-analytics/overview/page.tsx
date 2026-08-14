import { UIUXProjectOverviewView } from '@/components/projects/UIUXProjectOverviewView';
import { INSIGHT_ANALYTICS_OVERVIEW_DATA } from '@/data/projects/insight-analytics';

export const metadata = {
  title: 'Insight Analytics - UI/UX Design Overview',
  description:
    'Product overview, design process, visual system, and impact metrics for Insight Analytics.',
};

export default function InsightAnalyticsOverviewPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectOverviewView data={INSIGHT_ANALYTICS_OVERVIEW_DATA} />
    </main>
  );
}
