import React from 'react';
import { BrandingMockupsView } from '@/components/projects/BrandingMockupsView';
import { LUMINA_STUDIO_MOCKUPS_DATA } from '@/data/projects/lumina-studio';

export const metadata = {
  title: 'Lumina Studio - Production Mockups',
  description:
    'Photorealistic 3D rendering scenes, editable PSD/Figma smart templates, hardware showcases, and spatial signage mockups.',
};

export default function LuminaStudioMockupsPage() {
  return (
    <main className="h-full w-full p-2 overflow-hidden">
      <BrandingMockupsView data={LUMINA_STUDIO_MOCKUPS_DATA} />
    </main>
  );
}
