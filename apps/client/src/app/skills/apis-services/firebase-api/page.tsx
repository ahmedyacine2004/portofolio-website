import FrontendView from '@/components/skills/FrontendView';
import { firebaseapiWorkspaceData } from '@/data/skills/apis-workspace';

export const metadata = {
  title: 'Firebase API Workspace | Skills',
  description: 'Google Cloud backend services workspace details',
};

export default function FirebaseAPIWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={firebaseapiWorkspaceData} />
      </div>
    </div>
  );
}
