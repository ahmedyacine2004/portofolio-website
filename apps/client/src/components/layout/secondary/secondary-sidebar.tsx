'use client';

import { usePathname } from 'next/navigation';

import { AboutSecondarySidebar } from './about-secondary-sidebar';
import { ContactSecondarySidebar } from './contact-secondary-sidebar';
import { ExperienceSecondarySidebar } from './experience-secondary-sidebar';
import { ProjectsSecondarySidebar } from './projects-secondary-sidebar';
import { ServicesSecondarySidebar } from './services-secondary-sidebar';
import { SettingsSecondarySidebar } from './settings-secondary-sidebar';

export function SecondarySidebar() {
  const pathname = usePathname();

  if (pathname.startsWith('/about')) {
    return <AboutSecondarySidebar />;
  }

  switch (pathname) {
    case '/projects':
      return <ProjectsSecondarySidebar />;

    case '/services':
      return <ServicesSecondarySidebar />;

    case '/experience':
      return <ExperienceSecondarySidebar />;

    case '/contact':
      return <ContactSecondarySidebar />;

    case '/settings':
      return <SettingsSecondarySidebar />;

    default:
      return null;
  }
}
