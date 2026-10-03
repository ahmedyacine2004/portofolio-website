import type { Metadata } from 'next';

import StudioHome from '@/components/home/studio-home';

export const metadata: Metadata = {
  title: 'Interactive developer portfolio',
  description: 'Explore Ahmed Yassine Abbane’s portfolio as an interactive developer workspace.',
};

export default function StudioPage() {
  return <StudioHome />;
}
