import FrontendView from '@/components/skills/FrontendView';
import { expoWorkspaceData } from '@/data/skills/mobile-desktop-workspace';

export const metadata = {
  title: 'Expo Workspace | Skills',
  description: 'React Native development framework workspace details',
};

export default function ExpoWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={expoWorkspaceData} />
      </div>
    </div>
  );
}
