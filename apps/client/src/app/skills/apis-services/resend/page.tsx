import FrontendView from '@/components/skills/FrontendView';
import { resendWorkspaceData } from '@/data/skills/apis-workspace';

export const metadata = {
  title: 'Resend API Workspace | Skills',
  description: 'Email delivery platform workspace details',
};

export default function ResendWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={resendWorkspaceData} />
      </div>
    </div>
  );
}
