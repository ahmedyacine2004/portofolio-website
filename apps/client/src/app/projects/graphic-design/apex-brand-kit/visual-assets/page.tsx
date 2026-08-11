import React from 'react';
import { GraphicDesignVisualAssetsView } from '@/components/projects/GraphicDesignVisualAssetsView';
import { APEX_BRAND_KIT_VISUAL_ASSETS_DATA } from '@/data/projects/apex-brand-kit';

export const metadata = {
  title: 'Apex Brand Kit - Visual Assets',
  description:
    'Downloadable logos, vector graphics, 3D renders, and social templates for Apex Brand Kit.',
};

export default function ApexBrandKitVisualAssetsPage() {
  return (
    <main className="h-full w-full p-2">
      <GraphicDesignVisualAssetsView data={APEX_BRAND_KIT_VISUAL_ASSETS_DATA} />
    </main>
  );
}
