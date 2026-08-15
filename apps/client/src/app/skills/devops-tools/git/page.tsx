import DevOpsAndToolsView from '@/components/skills/DevOpsAndToolsView';
import { gitWorkspaceData } from '@/data/skills/others-workspace';

export const metadata = {
  title: 'Git Workspace | Skills',
  description: 'Version control and collaboration workspace details',
};

export default function GitWorkspacePage() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-y-auto rounded-[8px] bg-background p-6 text-foreground md:p-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <DevOpsAndToolsView data={gitWorkspaceData} />
      </div>
    </div>
  );
}
