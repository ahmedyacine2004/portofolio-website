'use client';

import { usePathname } from 'next/navigation';

import { AboutSecondarySidebar } from './about-secondary-sidebar';
import { ExperienceSecondarySidebar } from './experience-secondary-sidebar';
import { ProjectsSecondarySidebar } from './projects-secondary-sidebar';
import { SkillsSecondarySidebar } from './skills-secondary-sidebar';

export function SecondarySidebar() {
  const pathname = usePathname();

  if (pathname.startsWith('/about')) {
    return <AboutSecondarySidebar />;
  }

  if (pathname.startsWith('/projects')) {
    return <ProjectsSecondarySidebar />;
  }

  if (pathname.startsWith('/skills')) {
    return <SkillsSecondarySidebar />;
  }

  if (pathname.startsWith('/experience')) {
    return <ExperienceSecondarySidebar />;
  }

  return null;
}
