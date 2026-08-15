import FrontendView from '@/components/skills/FrontendView';
import { tailwindWorkspaceData } from '@/data/skills/tailwindcss-workspace';

export default function TailwindCSSWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto rounded-[8px] bg-background p-6 text-foreground md:p-8">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={tailwindWorkspaceData} />
      </div>
    </div>
  );
}
