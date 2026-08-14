'use client';

import { useAboutTabsStore } from '@/stores/about-tabs.store';
import { ABOUT_ROOT_FILE, findAboutFileByHref } from '@/lib/utils/about-files';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useTranslation } from '@/hooks/use-translation';

// --- Icons ---
import aboutIcon from '@/assets/icons/about.svg';
import careerIcon from '@/assets/icons/career.svg';
import educationIcon from '@/assets/icons/education.svg';
import personalIcon from '@/assets/icons/personal.svg';
import profileIcon from '@/assets/icons/profile.svg';

import databaseIcon from '@/assets/icons/database.svg';
import imageIcon from '@/assets/icons/image.svg';
import jsonIcon from '@/assets/icons/json.svg';
import linkIcon from '@/assets/icons/link.svg';
import reactIcon from '@/assets/icons/react.svg';
import typescriptIconV2 from '@/assets/icons/typescript-1.svg';
import typescriptIcon from '@/assets/icons/typescript.svg';

import csvIcon from '@/assets/icons/csv.svg';
import docxIcon from '@/assets/icons/docx.svg';
import pdfIcon from '@/assets/icons/pdf.svg';
import tomlIcon from '@/assets/icons/toml.svg';
import xmlIcon from '@/assets/icons/xml.svg';
import yamlIcon from '@/assets/icons/yaml.svg';

import envIcon from '@/assets/icons/env.svg';
import gitIcon from '@/assets/icons/git.svg';
import licenseIcon from '@/assets/icons/license.svg';
import markdownIcon from '@/assets/icons/markdown.svg';
import packageIcon from '@/assets/icons/package.svg';

type FileItem = {
  label: string;
  href: string;
  icon: typeof reactIcon;
};

type Section = {
  label: string;
  icon: typeof profileIcon;
  files: FileItem[];
};

const sections: Section[] = [
  {
    label: 'profile',
    icon: profileIcon,
    files: [
      { label: 'index.tsx', href: '/about/profile', icon: reactIcon },
      { label: 'metadata.json', href: '/about/profile/metadata', icon: jsonIcon },
      { label: 'avatar.png', href: '/about/profile/avatar', icon: imageIcon },
      { label: 'social.links', href: '/about/profile/social', icon: linkIcon },
      { label: 'config.ts', href: '/about/profile/config', icon: typescriptIconV2 },
    ],
  },
  {
    label: 'education',
    icon: educationIcon,
    files: [
      { label: 'estin.pdf', href: '/about/education/estin', icon: pdfIcon },
      { label: 'bachelor.docx', href: '/about/education/bachelor', icon: docxIcon },
      { label: 'timeline.yaml', href: '/about/education/timeline', icon: yamlIcon },
      { label: 'courses.csv', href: '/about/education/courses', icon: csvIcon },
      { label: 'transcript.xml', href: '/about/education/transcript', icon: xmlIcon },
    ],
  },
  {
    label: 'career',
    icon: careerIcon,
    files: [
      { label: 'roadmap.mmd', href: '/about/career/roadmap', icon: markdownIcon },
      { label: 'milestones.json', href: '/about/career/milestones', icon: jsonIcon },
      { label: 'vision.ts', href: '/about/career/vision', icon: typescriptIcon },
      { label: 'experience.db', href: '/about/career/experience', icon: databaseIcon },
    ],
  },
  {
    label: 'personal',
    icon: personalIcon,
    files: [
      { label: 'interests.json', href: '/about/personal/interests', icon: jsonIcon },
      { label: 'languages.yaml', href: '/about/personal/languages', icon: yamlIcon },
      { label: 'favorites.toml', href: '/about/personal/favorites', icon: tomlIcon },
      { label: 'hobbies.md', href: '/about/personal/hobbies', icon: markdownIcon },
    ],
  },
];

const rootFiles: FileItem[] = [
  { label: 'README.md', href: '/about/readme', icon: markdownIcon },
  { label: '.gitignore', href: '/about/gitignore', icon: gitIcon },
  { label: '.env.example', href: '/about/env', icon: envIcon },
  { label: 'package.json', href: '/about/package', icon: packageIcon },
  { label: 'LICENSE', href: '/about/license', icon: licenseIcon },
];

function FileLink({ file }: { file: FileItem }) {
  const pathname = usePathname();
  const isActive = pathname === file.href;
  const openTab = useAboutTabsStore((state) => state.openTab);

  const handleClick = () => {
    const regFile = findAboutFileByHref(file.href);

    if (regFile) {
      openTab(regFile);
    }
  };

  return (
    <Link
      href={file.href}
      onClick={handleClick}
      className={`flex items-center gap-1 px-2 py-[3px] transition-colors hover:bg-muted ${
        isActive ? 'bg-primary/20 text-primary font-medium' : 'text-foreground'
      }`}
    >
      <Image
        src={file.icon}
        alt=""
        width={8}
        height={8}
        className="size-2 shrink-0 object-contain"
        aria-hidden="true"
      />
      <span className="text-[8px] leading-none">{file.label}</span>
    </Link>
  );
}

function SectionBlock({ section }: { section: Section }) {
  const { t } = useTranslation();
  const pathname = usePathname();
  // Automatically open the folder if one of its files is currently active
  const isChildActive = section.files.some((file) => pathname === file.href);
  const [isOpen, setIsOpen] = useState(true); // Defaults to true (open)

  return (
    <div className="rounded-[2px] bg-background shadow-gray-300 dark:shadow-[0_0_2px_rgba(255,255,255,0.015)]">
      {/* Section header - Now a clickable button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between rounded-t-[2px] bg-surface-brand px-2 py-2 hover:bg-surface-brand/80 transition-colors"
      >
        <div className="flex items-center gap-1">
          <Image
            src={section.icon}
            alt=""
            width={11}
            height={11}
            className="size-[11px] shrink-0 object-contain"
            aria-hidden="true"
          />
          <span className="text-[9px] font-semibold leading-none text-foreground">
            {t(`aboutSidebar.${section.label}`, section.label)}
          </span>
        </div>

        <ChevronDown
          className={`size-2.5 shrink-0 text-foreground transition-transform duration-300 ${
            isOpen ? 'rotate-0' : '-rotate-90'
          }`}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      {/* Collapsible Files List */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="py-0.5">
              {section.files.map((file) => (
                <FileLink key={file.label} file={file} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AboutSecondarySidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isRootAboutActive = pathname === '/about';
  const openTab = useAboutTabsStore((state) => state.openTab);

  return (
    <aside className="flex h-full w-[180px] flex-col rounded-[8px] bg-background px-2 py-3 shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
      {/* Title */}
      <h2 className="mb-1 px-0.5 text-[12px] font-inter font-semibold uppercase leading-none text-foreground">
        {t('aboutSidebar.title')}
      </h2>

      {/* Default About Page */}
      <Link
        href="/about"
        onClick={() => openTab(ABOUT_ROOT_FILE)}
        aria-current="page"
        className={`mb-1 flex items-center gap-1 rounded-[2px] px-2 py-2 transition-colors ${
          isRootAboutActive
            ? 'bg-primary text-primary-foreground shadow-[0_0_18px_var(--color-brand)]'
            : 'text-foreground hover:bg-muted'
        }`}
      >
        <Image
          src={aboutIcon}
          alt=""
          width={11}
          height={11}
          className="size-[11px] shrink-0 object-contain"
          aria-hidden="true"
        />
        <span className="text-[9px] font-semibold leading-none">{t('aboutSidebar.about')}</span>
      </Link>

      {/* Folder sections */}
      <div className="flex flex-col gap-1 ">
        {sections.map((section) => (
          <SectionBlock key={section.label} section={section} />
        ))}

        {/* Root files */}
        <div className="rounded-[2px] bg-background py-0.5 shadow-gray-300 dark:shadow-[0_0_2px_rgba(255,255,255,0.015)] mt-1">
          {rootFiles.map((file) => (
            <FileLink key={file.label} file={file} />
          ))}
        </div>
      </div>
    </aside>
  );
}
