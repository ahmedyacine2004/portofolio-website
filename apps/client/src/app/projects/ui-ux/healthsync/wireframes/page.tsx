import { UIUXProjectWireframesView } from '@/components/projects/UIUXProjectWireframesView';
import { HEALTHSYNC_WIREFRAMES_DATA } from '@/data/projects/healthsync';
import type { UIUXWireframesData } from '@/data/projects/neobank-mobile';

export const metadata = {
  title: 'HealthSync - Wireframes',
  description: 'Low-fidelity and high-fidelity wireframes for HealthSync screens.',
};

export default function HealthSyncWireframesPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectWireframesView
        data={HEALTHSYNC_WIREFRAMES_DATA as unknown as UIUXWireframesData}
      />
    </main>
  );
}
