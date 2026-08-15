import BackendView from '@/components/skills/BackendView';
import { expressWorkspaceData } from '@/data/skills/express-workspace';

export const metadata = {
  title: 'Express.js Workspace | Skills',
  description: 'Lightweight web framework workspace details',
};

export default function ExpressJSWorkspacePage() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-y-auto rounded-[8px] bg-background p-6 text-foreground md:p-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <BackendView data={expressWorkspaceData} />
      </div>
    </div>
  );
}
