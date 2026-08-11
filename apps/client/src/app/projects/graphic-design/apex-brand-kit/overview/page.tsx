import React from 'react';
import { GraphicDesignOverviewView } from '@/components/projects/GraphicDesignOverviewView';
import { APEX_BRAND_KIT_OVERVIEW_DATA } from '@/data/projects/apex-brand-kit';

export const metadata = {
  title: 'Apex Brand Kit - Overview',
  description: 'Visual identity system, design guidelines, and brand assets for Apex Brand Kit.',
};

export default function ApexBrandKitOverviewPage() {
  return (
    <main className="h-full w-full p-2">
      <GraphicDesignOverviewView data={APEX_BRAND_KIT_OVERVIEW_DATA} />
    </main>
  );
}
