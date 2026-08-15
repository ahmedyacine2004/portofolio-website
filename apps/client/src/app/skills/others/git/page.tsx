import FrontendView from '@/components/skills/FrontendView';
import { gitWorkspaceData } from '@/data/skills/others-workspace';

export const metadata = {
  title: 'Git Workspace | Skills',
  description: 'Version control system workspace details',
};

export default function GitWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={gitWorkspaceData} />
      </div>
    </div>
  );
}
