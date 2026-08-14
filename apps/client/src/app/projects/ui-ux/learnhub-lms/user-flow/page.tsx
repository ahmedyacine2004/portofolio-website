import { UIUXProjectUserFlowView } from '@/components/projects/UIUXProjectUserFlowView';
import { LEARNHUB_LMS_USER_FLOW_DATA } from '@/data/projects/learnhub-lms';
import type { UIUXUserFlowData } from '@/data/projects/neobank-mobile';

export const metadata = {
  title: 'LearnHub LMS - User Flow',
  description: 'User journey flows and interaction patterns for LearnHub LMS.',
};

export default function LearnHubLmsUserFlowPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectUserFlowView data={LEARNHUB_LMS_USER_FLOW_DATA as unknown as UIUXUserFlowData} />
    </main>
  );
}
