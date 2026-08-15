import FrontendView from '@/components/skills/FrontendView';
import { nextjsWorkspaceData } from '@/data/skills/nextjs-workspace';

export const metadata = {
  title: 'Next.js Workspace | Skills',
  description: 'Full-stack framework workspace details for Next.js',
};

export default function NextjsWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={nextjsWorkspaceData} />
      </div>
    </div>
  );
}
