import DevOpsAndToolsView from '@/components/skills/DevOpsAndToolsView';
import { githubactionsWorkspaceData } from '@/data/skills/devops-workspace';

export const metadata = {
  title: 'GitHub Actions Workspace | Skills',
  description: 'CI/CD workflow automation workspace details',
};

export default function GitHubActionsWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <DevOpsAndToolsView data={githubactionsWorkspaceData} />
      </div>
    </div>
  );
}
