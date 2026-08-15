import DatabasesView from '@/components/skills/DatabasesView';
import { mongodbWorkspaceData } from '@/data/skills/databases-workspace';

export const metadata = {
  title: 'MongoDB Workspace | Skills',
  description: 'NoSQL document database workspace details',
};

export default function MongoDBWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <DatabasesView data={mongodbWorkspaceData} />
      </div>
    </div>
  );
}
