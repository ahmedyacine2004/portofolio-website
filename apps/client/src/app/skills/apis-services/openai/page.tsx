import FrontendView from '@/components/skills/FrontendView';
import { openaiWorkspaceData } from '@/data/skills/apis-workspace';

export const metadata = {
  title: 'OpenAI API Workspace | Skills',
  description: 'AI and language model integration workspace details',
};

export default function OpenAIWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={openaiWorkspaceData} />
      </div>
    </div>
  );
}
