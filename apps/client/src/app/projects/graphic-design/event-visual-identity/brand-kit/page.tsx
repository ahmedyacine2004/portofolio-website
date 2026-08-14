import { GraphicDesignBrandKitView } from '@/components/projects/GraphicDesignBrandKitView';
import type { GraphicDesignBrandKitData } from '@/data/projects/apex-brand-kit';
import { EVENT_VISUAL_IDENTITY_BRAND_KIT_DATA } from '@/data/projects/event-visual-identity';

export const metadata = {
  title: 'Event Visual Identity - Brand Kit',
  description:
    'Brand guidelines, brand kit specifications, and design standards for Event Visual Identity.',
};

export default function EventVisualIdentityBrandKitPage() {
  return (
    <main className="h-full w-full p-2">
      <GraphicDesignBrandKitView
        data={EVENT_VISUAL_IDENTITY_BRAND_KIT_DATA as unknown as GraphicDesignBrandKitData}
      />
    </main>
  );
}
