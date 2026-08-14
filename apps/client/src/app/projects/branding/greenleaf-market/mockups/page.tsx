import { BrandingMockupsView } from '@/components/projects/BrandingMockupsView';
import { GREENLEAF_MARKET_MOCKUPS_DATA } from '@/data/projects/greenleaf-market';

export const metadata = {
  title: 'GreenLeaf Market - Mockups',
  description: 'Brand application mockups and real-world implementations for GreenLeaf Market.',
};

export default function GreenLeafMarketMockupsPage() {
  return (
    <main className="h-full w-full p-2">
      <BrandingMockupsView data={GREENLEAF_MARKET_MOCKUPS_DATA} />
    </main>
  );
}
