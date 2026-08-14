import { BrandingOverviewView } from '@/components/projects/BrandingOverviewView';
import { NOVA_COFFEE_OVERVIEW_DATA } from '@/data/projects/nova-coffee';

export const metadata = {
  title: 'Nova Coffee - Overview',
  description:
    'Project overview, strategic vision, metrics, and key deliverables for Nova Coffee rebrand.',
};

export default function NovaCoffeeOverviewPage() {
  return (
    <main className="h-full w-full p-2">
      <BrandingOverviewView data={NOVA_COFFEE_OVERVIEW_DATA} />
    </main>
  );
}
