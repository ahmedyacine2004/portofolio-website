import { UIUXProjectPrototypeView } from '@/components/projects/UIUXProjectPrototypeView';
import type { UIUXPrototypeData } from '@/data/projects/neobank-mobile';
import { TRAVELMATE_PROTOTYPE_DATA } from '@/data/projects/travelmate';

export const metadata = {
  title: 'TravelMate - Prototype',
  description: 'Interactive prototypes and design specifications for TravelMate.',
};

export default function TravelMatePrototypePage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectPrototypeView data={TRAVELMATE_PROTOTYPE_DATA as unknown as UIUXPrototypeData} />
    </main>
  );
}
