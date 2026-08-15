import DatabasesView from '@/components/skills/DatabasesView';
import { redisWorkspaceData } from '@/data/skills/databases-workspace';

export const metadata = {
  title: 'Redis Workspace | Skills',
  description: 'In-memory data store workspace details',
};

export default function RedisWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <DatabasesView data={redisWorkspaceData} />
      </div>
    </div>
  );
}
