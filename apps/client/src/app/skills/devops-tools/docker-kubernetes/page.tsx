import DevOpsAndToolsView from '@/components/skills/DevOpsAndToolsView';
import { dockerWorkspaceData } from '@/data/skills/devops-workspace';

export const metadata = {
  title: 'Docker & Kubernetes Workspace | Skills',
  description: 'Containerization and orchestration workspace details',
};

export default function DockerKubernetesWorkspacePage() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-y-auto rounded-[8px] bg-background p-6 text-foreground md:p-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <DevOpsAndToolsView data={dockerWorkspaceData} />
      </div>
    </div>
  );
}
