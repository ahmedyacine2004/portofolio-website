import DatabasesView from '@/components/skills/DatabasesView';
import { postgresqlWorkspaceData } from '@/data/skills/databases-workspace';

export const metadata = {
  title: 'PostgreSQL Workspace | Skills',
  description: 'Advanced relational database workspace details',
};

export default function PostgreSQLWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <DatabasesView data={postgresqlWorkspaceData} />
      </div>
    </div>
  );
}
