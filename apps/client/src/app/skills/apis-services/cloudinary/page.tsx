import FrontendView from '@/components/skills/FrontendView';
import { cloudinaryWorkspaceData } from '@/data/skills/apis-workspace';

export const metadata = {
  title: 'Cloudinary API Workspace | Skills',
  description: 'Image and video management workspace details',
};

export default function CloudinaryWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={cloudinaryWorkspaceData} />
      </div>
    </div>
  );
}
