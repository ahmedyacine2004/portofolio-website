import FrontendView from '@/components/skills/FrontendView';
import { tauriWorkspaceData } from '@/data/skills/mobile-desktop-workspace';

export const metadata = {
  title: 'Tauri Workspace | Skills',
  description: 'Lightweight desktop application framework workspace details',
};

export default function TauriWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={tauriWorkspaceData} />
      </div>
    </div>
  );
}
