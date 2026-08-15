import FrontendView from '@/components/skills/FrontendView';
import { reactnativeWorkspaceData } from '@/data/skills/mobile-desktop-workspace';

export const metadata = {
  title: 'React Native Workspace | Skills',
  description: 'Cross-platform mobile development workspace details',
};

export default function ReactNativeWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={reactnativeWorkspaceData} />
      </div>
    </div>
  );
}
