import { UIUXProjectPrototypeView } from '@/components/projects/UIUXProjectPrototypeView';
import { LEARNHUB_LMS_PROTOTYPE_DATA } from '@/data/projects/learnhub-lms';

export const metadata = {
  title: 'LearnHub LMS - Prototype',
  description: 'Interactive prototypes and design specifications for LearnHub LMS.',
};

export default function LearnHubLmsPrototypePage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectPrototypeView data={LEARNHUB_LMS_PROTOTYPE_DATA} />
    </main>
  );
}
