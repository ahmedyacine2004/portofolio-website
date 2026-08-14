import { BrandingMockupsView } from '@/components/projects/BrandingMockupsView';
import { NOVA_COFFEE_MOCKUPS_DATA } from '@/data/projects/nova-coffee';

export const metadata = {
  title: 'Nova Coffee - Mockups',
  description: 'Brand application mockups and real-world implementations for Nova Coffee.',
};

export default function NovaCoffeeMockupsPage() {
  return (
    <main className="h-full w-full p-2">
      <BrandingMockupsView data={NOVA_COFFEE_MOCKUPS_DATA} />
    </main>
  );
}
