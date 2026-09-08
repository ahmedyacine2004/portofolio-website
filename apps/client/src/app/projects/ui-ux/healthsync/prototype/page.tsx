import { UIUXProjectPrototypeView } from '@/components/projects/UIUXProjectPrototypeView';
import { HEALTHSYNC_PROTOTYPE_DATA } from '@/data/projects/healthsync';

export const metadata = {
  title: 'HealthSync - Prototype',
  description: 'Interactive prototypes and design specifications for HealthSync.',
};

export default function HealthSyncPrototypePage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectPrototypeView data={HEALTHSYNC_PROTOTYPE_DATA} />
    </main>
  );
}
