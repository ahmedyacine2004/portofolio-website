import { UIUXProjectPrototypeView } from '@/components/projects/UIUXProjectPrototypeView';
import { DESIGN_SYSTEM_PROTOTYPE_DATA } from '@/data/projects/design-system';

export const metadata = {
  title: 'Design System - Prototype',
  description: 'Interactive prototypes and design specifications for Design System.',
};

export default function DesignSystemPrototypePage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectPrototypeView data={DESIGN_SYSTEM_PROTOTYPE_DATA} />
    </main>
  );
}
