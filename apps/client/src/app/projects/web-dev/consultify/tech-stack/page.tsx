import React from 'react';
import { WebProjectTechStackView } from '@/components/projects/WebProjectTechStackView';
import { CONSULTIFY_TECH_STACK_DATA } from '@/data/projects/consultify';

export const metadata = {
  title: 'Consultify - Tech Stack',
  description: 'Interactive runtime and technology stack powering Consultify.',
};

export default function ConsultifyTechStackPage() {
  return <WebProjectTechStackView data={CONSULTIFY_TECH_STACK_DATA} />;
}
