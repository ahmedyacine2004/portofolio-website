import FrontendView from '@/components/skills/FrontendView';
import { eslintWorkspaceData } from '@/data/skills/others-workspace';

export const metadata = {
  title: 'ESLint Workspace | Skills',
  description: 'JavaScript code quality tool workspace details',
};

export default function ESLintWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={eslintWorkspaceData} />
      </div>
    </div>
  );
}
