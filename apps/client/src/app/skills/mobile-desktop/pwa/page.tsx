import FrontendView from '@/components/skills/FrontendView';
import { pwaWorkspaceData } from '@/data/skills/mobile-desktop-workspace';

export const metadata = {
  title: 'PWA Workspace | Skills',
  description: 'Progressive Web Apps workspace details',
};

export default function PWAWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={pwaWorkspaceData} />
      </div>
    </div>
  );
}
