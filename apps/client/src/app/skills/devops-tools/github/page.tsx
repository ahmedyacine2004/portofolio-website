import DevOpsAndToolsView from '@/components/skills/DevOpsAndToolsView';
import { githubactionsWorkspaceData } from '@/data/skills/devops-workspace';

export const metadata = {
  title: 'GitHub Workspace | Skills',
  description: 'Repository hosting and collaboration workspace details',
};

export default function GitHubWorkspacePage() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-y-auto rounded-[8px] bg-background p-6 text-foreground md:p-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <DevOpsAndToolsView data={githubactionsWorkspaceData} />
      </div>
    </div>
  );
}
