import FrontendView from '@/components/skills/FrontendView';
import { prettierWorkspaceData } from '@/data/skills/others-workspace';

export const metadata = {
  title: 'Prettier Workspace | Skills',
  description: 'Code formatter workspace details',
};

export default function PrettierWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={prettierWorkspaceData} />
      </div>
    </div>
  );
}
