import FrontendView from '@/components/skills/FrontendView';
import { capacitorWorkspaceData } from '@/data/skills/mobile-desktop-workspace';

export const metadata = {
  title: 'Capacitor Workspace | Skills',
  description: 'Cross-platform native bridge framework workspace details',
};

export default function CapacitorWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={capacitorWorkspaceData} />
      </div>
    </div>
  );
}
