import FrontendView from '@/components/skills/FrontendView';
import { jestWorkspaceData } from '@/data/skills/others-workspace';

export const metadata = {
  title: 'Jest Workspace | Skills',
  description: 'JavaScript testing framework workspace details',
};

export default function JestWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={jestWorkspaceData} />
      </div>
    </div>
  );
}
