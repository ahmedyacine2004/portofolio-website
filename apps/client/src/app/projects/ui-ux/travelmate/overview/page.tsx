import { UIUXProjectOverviewView } from '@/components/projects/UIUXProjectOverviewView';
import { TRAVELMATE_OVERVIEW_DATA } from '@/data/projects/travelmate';

export const metadata = {
  title: 'TravelMate - UI/UX Design Overview',
  description:
    'Product overview, design process, visual system, and impact metrics for TravelMate.',
};

export default function TravelMateOverviewPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectOverviewView data={TRAVELMATE_OVERVIEW_DATA} />
    </main>
  );
}
