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

  if (pathname.startsWith('/projects')) {
    return <ProjectsSecondarySidebar />;
  }

  if (pathname.startsWith('/services')) {
    return <ServicesSecondarySidebar />;
  }

  if (pathname.startsWith('/experience')) {
    return <ExperienceSecondarySidebar />;
  }

  if (pathname.startsWith('/contact')) {
    return <ContactSecondarySidebar />;
  }

  if (pathname.startsWith('/settings')) {
    return <SettingsSecondarySidebar />;
  }

  return null;
}
