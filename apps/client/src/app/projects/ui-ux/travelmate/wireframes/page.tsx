import { UIUXProjectWireframesView } from '@/components/projects/UIUXProjectWireframesView';
import { TRAVELMATE_WIREFRAMES_DATA } from '@/data/projects/travelmate';

export const metadata = {
  title: 'TravelMate - Wireframes',
  description: 'Low-fidelity and high-fidelity wireframes for TravelMate screens.',
};

export default function TravelMateWireframesPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectWireframesView data={TRAVELMATE_WIREFRAMES_DATA} />
    </main>
  );
}
