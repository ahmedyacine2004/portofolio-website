import { UIUXProjectWireframesView } from '@/components/projects/UIUXProjectWireframesView';
import type { UIUXWireframesData } from '@/data/projects/neobank-mobile';
import { TRAVELMATE_WIREFRAMES_DATA } from '@/data/projects/travelmate';

export const metadata = {
  title: 'TravelMate - Wireframes',
  description: 'Low-fidelity and high-fidelity wireframes for TravelMate screens.',
};

export default function TravelMateWireframesPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectWireframesView
        data={TRAVELMATE_WIREFRAMES_DATA as unknown as UIUXWireframesData}
      />
    </main>
  );
}
