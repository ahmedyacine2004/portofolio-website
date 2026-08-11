import React from 'react';
import { BrandingGuidelinesView } from '@/components/projects/BrandingGuidelinesView';
import { LUMINA_STUDIO_GUIDELINES_DATA } from '@/data/projects/lumina-studio';

export const metadata = {
  title: 'Lumina Studio - Brand Guidelines',
  description:
    'Official brand guidelines, logo clear space rules, color system, and art direction for Lumina Studio.',
};

export default function LuminaStudioGuidelinesPage() {
  return (
    <main className="h-full w-full p-2 overflow-hidden">
      <BrandingGuidelinesView data={LUMINA_STUDIO_GUIDELINES_DATA} />
    </main>
  );
}
