import DesignView from '@/components/skills/DesignView';
import { aftereffectsWorkspaceData } from '@/data/skills/design-workspace';

export const metadata = {
  title: 'After Effects Workspace | Skills',
  description: 'Video editing and motion graphics workspace details',
};

export default function AfterEffectsWorkspacePage() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-y-auto rounded-[8px] bg-background p-6 text-foreground md:p-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <DesignView data={aftereffectsWorkspaceData} />
      </div>
    </div>
  );
}
