import { UIUXProjectWireframesView } from '@/components/projects/UIUXProjectWireframesView';
import { DESIGN_SYSTEM_WIREFRAMES_DATA } from '@/data/projects/design-system';
import type { UIUXWireframesData } from '@/data/projects/neobank-mobile';

export const metadata = {
  title: 'Design System - Wireframes',
  description: 'Low-fidelity and high-fidelity wireframes for Design System screens.',
};

export default function DesignSystemWireframesPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectWireframesView
        data={DESIGN_SYSTEM_WIREFRAMES_DATA as unknown as UIUXWireframesData}
      />
    </main>
  );
}
