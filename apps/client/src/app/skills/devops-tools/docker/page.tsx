import DevOpsAndToolsView from '@/components/skills/DevOpsAndToolsView';
import { dockerWorkspaceData } from '@/data/skills/devops-workspace';

export const metadata = {
  title: 'Docker Workspace | Skills',
  description: 'Containerization platform workspace details',
};

export default function DockerWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <DevOpsAndToolsView data={dockerWorkspaceData} />
      </div>
    </div>
  );
}
