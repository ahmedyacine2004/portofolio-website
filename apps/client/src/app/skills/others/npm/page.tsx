import FrontendView from '@/components/skills/FrontendView';
import { npmWorkspaceData } from '@/data/skills/others-workspace';

export const metadata = {
  title: 'npm & pnpm Workspace | Skills',
  description: 'Package managers for JavaScript workspace details',
};

export default function NpmWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={npmWorkspaceData} />
      </div>
    </div>
  );
}
