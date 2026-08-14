import { UIUXProjectOverviewView } from '@/components/projects/UIUXProjectOverviewView';
import { DESIGN_SYSTEM_OVERVIEW_DATA } from '@/data/projects/design-system';

export const metadata = {
  title: 'Design System - UI/UX Design Overview',
  description:
    'Product overview, design process, visual system, and impact metrics for Design System.',
};

export default function DesignSystemOverviewPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectOverviewView data={DESIGN_SYSTEM_OVERVIEW_DATA} />
    </main>
  );
}
