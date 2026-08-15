import DevOpsAndToolsView from '@/components/skills/DevOpsAndToolsView';
import { nginxWorkspaceData } from '@/data/skills/devops-workspace';

export const metadata = {
  title: 'Nginx Workspace | Skills',
  description: 'Web server and reverse proxy workspace details',
};

export default function NginxWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <DevOpsAndToolsView data={nginxWorkspaceData} />
      </div>
    </div>
  );
}
