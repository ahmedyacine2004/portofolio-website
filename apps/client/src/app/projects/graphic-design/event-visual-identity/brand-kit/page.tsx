import { BrandingMockupsView } from '@/components/projects/BrandingMockupsView';
import { EVENT_VISUAL_IDENTITY_BRAND_KIT_DATA } from '@/data/projects/event-visual-identity';

export const metadata = {
  title: 'Event Visual Identity - Brand Kit',
  description:
    'Brand guidelines, brand kit specifications, and design standards for Event Visual Identity.',
};

export default function EventVisualIdentityBrandKitPage() {
  return (
    <main className="h-full w-full p-2">
      <BrandingMockupsView data={EVENT_VISUAL_IDENTITY_BRAND_KIT_DATA} />
    </main>
  );
}
