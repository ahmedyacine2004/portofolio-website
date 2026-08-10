import type { StaticImageData } from 'next/image';

import aboutIcon from '@/assets/icons/about.svg';
import careerIcon from '@/assets/icons/career.svg';
import csvIcon from '@/assets/icons/csv.svg';
import databaseIcon from '@/assets/icons/database.svg';
import docxIcon from '@/assets/icons/docx.svg';
import educationIcon from '@/assets/icons/education.svg';
import envIcon from '@/assets/icons/env.svg';
import gitIcon from '@/assets/icons/git.svg';
import imageIcon from '@/assets/icons/image.svg';
import jsonIcon from '@/assets/icons/json.svg';
import licenseIcon from '@/assets/icons/license.svg';
import linkIcon from '@/assets/icons/link.svg';
import markdownIcon from '@/assets/icons/markdown.svg';
import packageIcon from '@/assets/icons/package.svg';
import pdfIcon from '@/assets/icons/pdf.svg';
import personalIcon from '@/assets/icons/personal.svg';
import profileIcon from '@/assets/icons/profile.svg';
import reactIcon from '@/assets/icons/react.svg';
import tomlIcon from '@/assets/icons/toml.svg';
import typescriptIconV2 from '@/assets/icons/typescript-1.svg';
import typescriptIcon from '@/assets/icons/typescript.svg';
import xmlIcon from '@/assets/icons/xml.svg';
import yamlIcon from '@/assets/icons/yaml.svg';

export type AboutFile = {
  id: string;
  label: string;
  href: string;
  icon: string | StaticImageData;
};

export const ABOUT_ROOT_FILE: AboutFile = {
  id: 'about',
  label: 'about.tsx',
  href: '/about',
  icon: aboutIcon,
};

export const ABOUT_FILES_REGISTRY: AboutFile[] = [
  ABOUT_ROOT_FILE,

  // Profile
  { id: 'profile-index', label: 'index.tsx', href: '/about/profile', icon: reactIcon },
  {
    id: 'profile-metadata',
    label: 'metadata.json',
    href: '/about/profile/metadata',
    icon: jsonIcon,
  },
  { id: 'profile-avatar', label: 'avatar.png', href: '/about/profile/avatar', icon: imageIcon },
  { id: 'profile-social', label: 'social.links', href: '/about/profile/social', icon: linkIcon },
  {
    id: 'profile-config',
    label: 'config.ts',
    href: '/about/profile/config',
    icon: typescriptIconV2,
  },

  // Education
  { id: 'education-estin', label: 'estin.pdf', href: '/about/education/estin', icon: pdfIcon },
  {
    id: 'education-bachelor',
    label: 'bachelor.docx',
    href: '/about/education/bachelor',
    icon: docxIcon,
  },
  {
    id: 'education-timeline',
    label: 'timeline.yaml',
    href: '/about/education/timeline',
    icon: yamlIcon,
  },
  {
    id: 'education-courses',
    label: 'courses.csv',
    href: '/about/education/courses',
    icon: csvIcon,
  },
  {
    id: 'education-transcript',
    label: 'transcript.xml',
    href: '/about/education/transcript',
    icon: xmlIcon,
  },

  // Career
  { id: 'career-roadmap', label: 'roadmap.mmd', href: '/about/career/roadmap', icon: markdownIcon },
  {
    id: 'career-milestones',
    label: 'milestones.json',
    href: '/about/career/milestones',
    icon: jsonIcon,
  },
  { id: 'career-vision', label: 'vision.ts', href: '/about/career/vision', icon: typescriptIcon },
  {
    id: 'career-experience',
    label: 'experience.db',
    href: '/about/career/experience',
    icon: databaseIcon,
  },

  // Personal
  {
    id: 'personal-interests',
    label: 'interests.json',
    href: '/about/personal/interests',
    icon: jsonIcon,
  },
  {
    id: 'personal-languages',
    label: 'languages.yaml',
    href: '/about/personal/languages',
    icon: yamlIcon,
  },
  {
    id: 'personal-favorites',
    label: 'favorites.toml',
    href: '/about/personal/favorites',
    icon: tomlIcon,
  },
  {
    id: 'personal-hobbies',
    label: 'hobbies.md',
    href: '/about/personal/hobbies',
    icon: markdownIcon,
  },

  // Root files
  { id: 'readme', label: 'README.md', href: '/about/readme', icon: markdownIcon },
  { id: 'gitignore', label: '.gitignore', href: '/about/gitignore', icon: gitIcon },
  { id: 'env', label: '.env.example', href: '/about/env', icon: envIcon },
  { id: 'package', label: 'package.json', href: '/about/package', icon: packageIcon },
  { id: 'license', label: 'LICENSE', href: '/about/license', icon: licenseIcon },
];

export function findAboutFileByHref(href: string): AboutFile | undefined {
  return ABOUT_FILES_REGISTRY.find((file) => file.href === href);
}
