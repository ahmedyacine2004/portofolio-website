import { UIUXProjectWireframesView } from '@/components/projects/UIUXProjectWireframesView';
import { LEARNHUB_LMS_WIREFRAMES_DATA } from '@/data/projects/learnhub-lms';
import type { UIUXWireframesData } from '@/data/projects/neobank-mobile';

export const metadata = {
  title: 'LearnHub LMS - Wireframes',
  description: 'Low-fidelity and high-fidelity wireframes for LearnHub LMS screens.',
};

export default function LearnHubLmsWireframesPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectWireframesView
        data={LEARNHUB_LMS_WIREFRAMES_DATA as unknown as UIUXWireframesData}
      />
    </main>
  );
}
