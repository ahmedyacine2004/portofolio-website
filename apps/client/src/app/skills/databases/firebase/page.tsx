import DatabasesView from '@/components/skills/DatabasesView';
import { firebaseWorkspaceData } from '@/data/skills/databases-workspace';

export const metadata = {
  title: 'Firebase Workspace | Skills',
  description: 'Backend-as-a-service platform workspace details',
};

export default function FirebaseWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <DatabasesView data={firebaseWorkspaceData} />
      </div>
    </div>
  );
}
