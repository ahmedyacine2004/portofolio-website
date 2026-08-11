import React from 'react';
import { GraphicDesignBrandKitView } from '@/components/projects/GraphicDesignBrandKitView';
import { APEX_BRAND_KIT_BRAND_KIT_DATA } from '@/data/projects/apex-brand-kit';

export const metadata = {
  title: 'Apex Brand Kit - Brand Kit & Guidelines',
  description:
    'Design tokens, color swatches, typography hierarchy, and logo rules for Apex Brand Kit.',
};

export default function ApexBrandKitBrandKitPage() {
  return (
    <main className="h-full w-full p-2">
      <GraphicDesignBrandKitView data={APEX_BRAND_KIT_BRAND_KIT_DATA} />
    </main>
  );
}
