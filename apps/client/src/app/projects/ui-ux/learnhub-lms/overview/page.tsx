import { UIUXProjectOverviewView } from '@/components/projects/UIUXProjectOverviewView';
import { LEARNHUB_LMS_OVERVIEW_DATA } from '@/data/projects/learnhub-lms';

export const metadata = {
  title: 'LearnHub LMS - UI/UX Design Overview',
  description:
    'Product overview, design process, visual system, and impact metrics for LearnHub LMS.',
};

export default function LearnHubLmsOverviewPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectOverviewView data={LEARNHUB_LMS_OVERVIEW_DATA} />
    </main>
  );
}
