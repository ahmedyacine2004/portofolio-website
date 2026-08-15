import DevOpsAndToolsView from '@/components/skills/DevOpsAndToolsView';
import { vercelWorkspaceData } from '@/data/skills/devops-workspace';

export const metadata = {
  title: 'Render Workspace | Skills',
  description: 'Deployment and hosting workspace details',
};

export default function RenderWorkspacePage() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-y-auto rounded-[8px] bg-background p-6 text-foreground md:p-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <DevOpsAndToolsView data={vercelWorkspaceData} />
      </div>
    </div>
  );
}
