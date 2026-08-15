import BackendView from '@/components/skills/BackendView';
import { springBootWorkspaceData } from '@/data/skills/spring-boot-workspace';

export default function SpringBootWorkspacePage() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-y-auto rounded-[8px] bg-background p-6 text-foreground md:p-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <BackendView data={springBootWorkspaceData} />
      </div>
    </div>
  );
}
