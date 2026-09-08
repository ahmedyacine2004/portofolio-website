import { UIUXProjectWireframesView } from '@/components/projects/UIUXProjectWireframesView';
import { DESIGN_SYSTEM_WIREFRAMES_DATA } from '@/data/projects/design-system';

export const metadata = {
  title: 'Design System - Wireframes',
  description: 'Low-fidelity and high-fidelity wireframes for Design System screens.',
};

export default function DesignSystemWireframesPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectWireframesView data={DESIGN_SYSTEM_WIREFRAMES_DATA} />
    </main>
  );
}
