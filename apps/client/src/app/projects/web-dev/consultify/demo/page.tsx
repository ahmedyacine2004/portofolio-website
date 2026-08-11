import React from 'react';
import { WebProjectDemoView } from '@/components/projects/WebProjectDemoView';
import { CONSULTIFY_DEMO_DATA } from '@/data/projects/consultify';

export const metadata = {
  title: 'Consultify - Live Demo Execution',
  description: 'Interactive execution and demo session configuration for Consultify.',
};

export default function ConsultifyDemoPage() {
  return (
    <main className="h-full w-full p-2">
      <WebProjectDemoView data={CONSULTIFY_DEMO_DATA} />
    </main>
  );
}
