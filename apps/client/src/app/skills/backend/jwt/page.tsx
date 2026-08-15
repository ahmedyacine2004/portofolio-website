import BackendView from '@/components/skills/BackendView';
import { jwtWorkspaceData } from '@/data/skills/jwt-workspace';

export const metadata = {
  title: 'JWT Workspace | Skills',
  description: 'Token-based authentication workspace details',
};

export default function JWTWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <BackendView data={jwtWorkspaceData} />
      </div>
    </div>
  );
}
