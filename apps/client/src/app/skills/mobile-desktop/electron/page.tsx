import FrontendView from '@/components/skills/FrontendView';
import { electronWorkspaceData } from '@/data/skills/mobile-desktop-workspace';

export const metadata = {
  title: 'Electron Workspace | Skills',
  description: 'Cross-platform desktop application workspace details',
};

export default function ElectronWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={electronWorkspaceData} />
      </div>
    </div>
  );
}
