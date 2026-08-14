import { BrandingGuidelinesView } from '@/components/projects/BrandingGuidelinesView';
import { NOVA_COFFEE_GUIDELINES_DATA } from '@/data/projects/nova-coffee';

export const metadata = {
  title: 'Nova Coffee - Guidelines',
  description: 'Brand guidelines, standards, and usage rules for Nova Coffee.',
};

export default function NovaCoffeeGuidelinesPage() {
  return (
    <main className="h-full w-full p-2">
      <BrandingGuidelinesView data={NOVA_COFFEE_GUIDELINES_DATA} />
    </main>
  );
}
