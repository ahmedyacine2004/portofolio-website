import DatabasesView from '@/components/skills/DatabasesView';
import { mysqlWorkspaceData } from '@/data/skills/databases-workspace';

export const metadata = {
  title: 'MySQL Workspace | Skills',
  description: 'Relational database workspace details',
};

export default function MySQLWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <DatabasesView data={mysqlWorkspaceData} />
      </div>
    </div>
  );
}
