import { BrandingGuidelinesView } from '@/components/projects/BrandingGuidelinesView';
import { GREENLEAF_MARKET_GUIDELINES_DATA } from '@/data/projects/greenleaf-market';

export const metadata = {
  title: 'GreenLeaf Market - Guidelines',
  description: 'Brand guidelines, standards, and usage rules for GreenLeaf Market.',
};

export default function GreenLeafMarketGuidelinesPage() {
  return (
    <main className="h-full w-full p-2">
      <BrandingGuidelinesView data={GREENLEAF_MARKET_GUIDELINES_DATA} />
    </main>
  );
}
