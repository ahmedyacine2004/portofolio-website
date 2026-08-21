import React from 'react';
import { WebProjectRepositoryView } from '@/components/projects/WebProjectRepositoryView';
import { CONSULTIFY_REPOSITORY_DATA } from '@/data/projects/consultify';

export const metadata = {
  title: 'Consultify - GitHub Repository Overview',
  description: 'Repository structure, commits, branches, CI status, and insights for Consultify.',
};

export default function ConsultifyRepositoryPage() {
  return <WebProjectRepositoryView data={CONSULTIFY_REPOSITORY_DATA} />;
}
