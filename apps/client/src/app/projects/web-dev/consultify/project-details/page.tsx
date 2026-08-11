import React from 'react';
import { CONSULTIFY_DETAILS } from '@/data/projects/consultify'; // Adjust path to your data file
import { WebProjectDetailsView } from '@/components/projects/WebProjectDetailsView';

export default function ConsultifyDetailsPage() {
  return <WebProjectDetailsView data={CONSULTIFY_DETAILS} />;
}
