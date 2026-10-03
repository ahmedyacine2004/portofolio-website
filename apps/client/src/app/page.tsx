import type { Metadata } from 'next';

import { ExperienceChooser } from '@/components/home/experience-chooser';

export const metadata: Metadata = {
  title: 'Choose your experience',
  description:
    'Explore Ahmed Yassine Abbane’s portfolio in a simple format or as an interactive developer workspace.',
};

export default function Home() {
  return <ExperienceChooser />;
}
