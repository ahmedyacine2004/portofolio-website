import React from 'react';
import FrontendView from '@/components/skills/FrontendView';
import { reactWorkspaceData } from '@/data/skills/react-workspace';

export const metadata = {
  title: 'ReactJS Workspace | Skills',
  description: 'Frontend workspace details for ReactJS',
};

export default function ReactWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={reactWorkspaceData} />
      </div>
    </div>
  );
}
