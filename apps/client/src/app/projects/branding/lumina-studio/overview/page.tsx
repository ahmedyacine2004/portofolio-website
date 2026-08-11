import React from 'react';
import { BrandingOverviewView } from '@/components/projects/BrandingOverviewView';
import { LUMINA_STUDIO_OVERVIEW_DATA } from '@/data/projects/lumina-studio';

export const metadata = {
  title: 'Lumina Studio - Overview',
  description:
    'Project overview, strategic vision, metrics, and key deliverables for Lumina Studio rebrand.',
};

export default function LuminaStudioOverviewPage() {
  return (
    <main className="h-full w-full p-2">
      <BrandingOverviewView data={LUMINA_STUDIO_OVERVIEW_DATA} />
    </main>
  );
}
