import DesignView from '@/components/skills/DesignView';
import { figmaWorkspaceData } from '@/data/skills/design-workspace';

export const metadata = {
  title: 'Figma Workspace | Skills',
  description: 'UI/UX design tool workspace details',
};

export default function FigmaWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <DesignView data={figmaWorkspaceData} />
      </div>
    </div>
  );
}
