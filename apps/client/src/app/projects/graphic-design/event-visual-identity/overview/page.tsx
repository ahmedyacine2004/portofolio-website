import { GraphicDesignOverviewView } from '@/components/projects/GraphicDesignOverviewView';
import { EVENT_VISUAL_IDENTITY_OVERVIEW_DATA } from '@/data/projects/event-visual-identity';

export const metadata = {
  title: 'Event Visual Identity - Design Overview',
  description:
    'Project overview, design vision, visual identity, and campaign strategy for Event Visual Identity.',
};

export default function EventVisualIdentityOverviewPage() {
  return (
    <main className="h-full w-full p-2">
      <GraphicDesignOverviewView data={EVENT_VISUAL_IDENTITY_OVERVIEW_DATA} />
    </main>
  );
}
