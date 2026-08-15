import FrontendView from '@/components/skills/FrontendView';
import { typescriptWorkspaceData } from '@/data/skills/typescript-workspace';

export const metadata = {
  title: 'TypeScript Workspace | Skills',
  description: 'Type-safe development workspace details for TypeScript',
};

export default function TypeScriptWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={typescriptWorkspaceData} />
      </div>
    </div>
  );
}
