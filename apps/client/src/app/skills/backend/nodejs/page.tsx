import BackendView from '@/components/skills/BackendView';
import { nodejsWorkspaceData } from '@/data/skills/nodejs-workspace';

export const metadata = {
  title: 'Node.js Workspace | Skills',
  description: 'JavaScript runtime workspace details',
};

export default function NodeJSWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <BackendView data={nodejsWorkspaceData} />
      </div>
    </div>
  );
}
