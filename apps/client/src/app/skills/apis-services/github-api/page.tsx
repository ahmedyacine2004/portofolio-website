import FrontendView from '@/components/skills/FrontendView';
import { githubAPIWorkspaceData } from '@/data/skills/apis-workspace';

export const metadata = {
  title: 'GitHub API Workspace | Skills',
  description: 'GitHub platform integration workspace details',
};

export default function GitHubAPIWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={githubAPIWorkspaceData} />
      </div>
    </div>
  );
}
