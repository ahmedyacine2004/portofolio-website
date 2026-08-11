import React from 'react';
import { UIUXProjectPrototypeView } from '@/components/projects/UIUXProjectPrototypeView';
import { NEOBANK_MOBILE_PROTOTYPE_DATA } from '@/data/projects/neobank-mobile';

export const metadata = {
  title: 'NeoBank Mobile - Interactive Prototype',
  description:
    'High-fidelity interactive prototype, micro-animations, and motion design specs for NeoBank Mobile.',
};

export default function NeoBankMobilePrototypePage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectPrototypeView data={NEOBANK_MOBILE_PROTOTYPE_DATA} />
    </main>
  );
}
