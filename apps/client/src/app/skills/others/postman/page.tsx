import FrontendView from '@/components/skills/FrontendView';
import { postmanWorkspaceData } from '@/data/skills/others-workspace';

export const metadata = {
  title: 'Postman Workspace | Skills',
  description: 'API development and testing platform workspace details',
};

export default function PostmanWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={postmanWorkspaceData} />
      </div>
    </div>
  );
}
