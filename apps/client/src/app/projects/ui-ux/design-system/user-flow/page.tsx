import { UIUXProjectUserFlowView } from '@/components/projects/UIUXProjectUserFlowView';
import { DESIGN_SYSTEM_USER_FLOW_DATA } from '@/data/projects/design-system';

export const metadata = {
  title: 'Design System - User Flow',
  description: 'User journey flows and interaction patterns for Design System.',
};

export default function DesignSystemUserFlowPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectUserFlowView data={DESIGN_SYSTEM_USER_FLOW_DATA} />
    </main>
  );
}
