import DesignView from '@/components/skills/DesignView';
import { blenderWorkspaceData } from '@/data/skills/design-workspace';

export const metadata = {
  title: 'Blender Workspace | Skills',
  description: '3D modeling and animation workspace details',
};

export default function BlenderWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <DesignView data={blenderWorkspaceData} />
      </div>
    </div>
  );
}
