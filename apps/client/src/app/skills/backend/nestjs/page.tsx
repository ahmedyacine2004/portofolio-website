import BackendView from '@/components/skills/BackendView';
import { nestjsWorkspaceData } from '@/data/skills/nestjs-workspace';

export const metadata = {
  title: 'NestJS Workspace | Skills',
  description: 'Enterprise backend framework workspace details',
};

export default function NestJSWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <BackendView data={nestjsWorkspaceData} />
      </div>
    </div>
  );
}
