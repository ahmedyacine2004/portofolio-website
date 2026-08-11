import React from 'react';
import { UIUXProjectWireframesView } from '@/components/projects/UIUXProjectWireframesView';
import { NEOBANK_MOBILE_WIREFRAMES_DATA } from '@/data/projects/neobank-mobile';

export const metadata = {
  title: 'NeoBank Mobile - Wireframes & Layout Architecture',
  description:
    'Structural blueprints, ergonomic wireframe screens, and design system specs for NeoBank Mobile.',
};

export default function NeoBankMobileWireframesPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectWireframesView data={NEOBANK_MOBILE_WIREFRAMES_DATA} />
    </main>
  );
}
