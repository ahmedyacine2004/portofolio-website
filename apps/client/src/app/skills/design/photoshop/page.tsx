import DesignView from '@/components/skills/DesignView';
import { photoshopWorkspaceData } from '@/data/skills/design-workspace';

export const metadata = {
  title: 'Photoshop & Illustrator | Skills',
  description: 'Image editing and vector design workspace details',
};

export default function PhotoshopWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <DesignView data={photoshopWorkspaceData} />
      </div>
    </div>
  );
}
