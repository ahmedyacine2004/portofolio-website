import { GraphicDesignVisualAssetsView } from '@/components/projects/GraphicDesignVisualAssetsView';
import { EVENT_VISUAL_IDENTITY_VISUAL_ASSETS_DATA } from '@/data/projects/event-visual-identity';

export const metadata = {
  title: 'Event Visual Identity - Visual Assets',
  description: 'Design assets, graphics, and visual elements for Event Visual Identity.',
};

export default function EventVisualIdentityVisualAssetsPage() {
  return (
    <main className="h-full w-full p-2">
      <GraphicDesignVisualAssetsView data={EVENT_VISUAL_IDENTITY_VISUAL_ASSETS_DATA} />
    </main>
  );
}
