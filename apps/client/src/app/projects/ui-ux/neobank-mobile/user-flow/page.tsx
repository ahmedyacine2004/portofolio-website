import React from 'react';
import { UIUXProjectUserFlowView } from '@/components/projects/UIUXProjectUserFlowView';
import { NEOBANK_MOBILE_USER_FLOW_DATA } from '@/data/projects/neobank-mobile';

export const metadata = {
  title: 'NeoBank Mobile - User Flow Architecture',
  description:
    'Interactive user flow maps, decision logic nodes, and interaction paths for NeoBank Mobile.',
};

export default function NeoBankMobileUserFlowPage() {
  return (
    <main className="h-full w-full p-2">
      <UIUXProjectUserFlowView data={NEOBANK_MOBILE_USER_FLOW_DATA} />
    </main>
  );
}
