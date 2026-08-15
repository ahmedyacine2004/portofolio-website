import DesignView from '@/components/skills/DesignView';
import { aftereffectsWorkspaceData } from '@/data/skills/design-workspace';

export const metadata = {
  title: 'After Effects & Premiere Pro | Skills',
  description: 'Video editing and motion graphics workspace details',
};

export default function AfterEffectsWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <DesignView data={aftereffectsWorkspaceData} />
      </div>
    </div>
  );
}
