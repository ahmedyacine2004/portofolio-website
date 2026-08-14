import { BrandingOverviewView } from '@/components/projects/BrandingOverviewView';
import { GREENLEAF_MARKET_OVERVIEW_DATA } from '@/data/projects/greenleaf-market';

export const metadata = {
  title: 'GreenLeaf Market - Overview',
  description:
    'Project overview, strategic vision, metrics, and key deliverables for GreenLeaf Market rebrand.',
};

export default function GreenLeafMarketOverviewPage() {
  return (
    <main className="h-full w-full p-2">
      <BrandingOverviewView data={GREENLEAF_MARKET_OVERVIEW_DATA} />
    </main>
  );
}
