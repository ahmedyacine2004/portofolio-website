import React from 'react';
import { UIUXProjectOverviewView } from '@/components/projects/UIUXProjectOverviewView';
import { NEOBANK_MOBILE_OVERVIEW_DATA } from '@/data/projects/neobank-mobile';

export const metadata = {
  title: 'NeoBank Mobile - UI/UX Design Overview',
  description:
    'Product overview, design process, visual system, and impact metrics for NeoBank Mobile.',
};

export default function NeoBankMobileOverviewPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectOverviewView data={NEOBANK_MOBILE_OVERVIEW_DATA} />
    </main>
  );
}
