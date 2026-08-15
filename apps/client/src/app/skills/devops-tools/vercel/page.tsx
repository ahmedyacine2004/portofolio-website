import DevOpsAndToolsView from '@/components/skills/DevOpsAndToolsView';
import { vercelWorkspaceData } from '@/data/skills/devops-workspace';

export const metadata = {
  title: 'Vercel Workspace | Skills',
  description: 'Serverless deployment platform workspace details',
};

export default function VercelWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <DevOpsAndToolsView data={vercelWorkspaceData} />
      </div>
    </div>
  );
}
