/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Boxes,
  ChevronDown,
  Code2,
  Cpu,
  Database,
  FileCode2,
  Globe,
  Layers,
  Layout,
  LucideIcon,
  Palette,
  Search,
  Server,
  Terminal,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useTranslation } from '@/hooks/use-translation';

interface SkillItem {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
  icon?: LucideIcon;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: Code2,
    skills: [
      { name: 'React', level: 'Expert', icon: Code2 },
      { name: 'Next.js', level: 'Advanced', icon: Globe },
      { name: 'TypeScript', level: 'Expert', icon: FileCode2 },
      { name: 'Tailwind CSS', level: 'Expert', icon: Layout },
      { name: 'HTML & CSS', level: 'Expert', icon: Layers },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Server,
    skills: [
      { name: 'NestJS', level: 'Expert', icon: Server },
      { name: 'Node.js', level: 'Expert', icon: Cpu },
      { name: 'Express.js', level: 'Advanced', icon: Terminal },
      { name: 'Spring Boot', level: 'Intermediate', icon: Boxes },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: Database,
    skills: [
      { name: 'MongoDB', level: 'Expert', icon: Database },
      { name: 'PostgreSQL', level: 'Advanced', icon: Database },
      { name: 'MySQL', level: 'Expert', icon: Database },
    ],
  },
  {
    id: 'design',
    title: 'Design',
    icon: Palette,
    skills: [
      { name: 'Figma', level: 'Expert', icon: Palette },
      { name: 'Photoshop', level: 'Advanced', icon: Palette },
      { name: 'Illustrator', level: 'Expert', icon: Palette },
      { name: 'After Effects', level: 'Intermediate', icon: Palette },
      { name: 'Blender', level: 'Intermediate', icon: Boxes },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Tools',
    icon: Wrench,
    skills: [
      { name: 'Git', level: 'Expert', icon: Wrench },
      { name: 'GitHub', level: 'Advanced', icon: Globe },
      { name: 'Docker & Kubernetes', level: 'Beginner', icon: Boxes },
      { name: 'Postman', level: 'Intermediate', icon: Terminal },
      { name: 'Render', level: 'Intermediate', icon: Server },
    ],
  },
];

const RECENTLY_USED = [
  { name: 'React', categorySlug: 'frontend', skillSlug: 'react' },
  { name: 'NestJS', categorySlug: 'backend', skillSlug: 'nestjs' },
  { name: 'Figma', categorySlug: 'design', skillSlug: 'figma' },
];

function slugify(text: string): string {
  const explicitMap: Record<string, string> = {
    'tailwind css': 'tailwind-css',
    'html & css': 'html-css',
    'express.js': 'expressjs',
    'spring boot': 'spring-boot',
    'docker & kubernetes': 'docker-kubernetes',
    'after effects': 'after-effects',
    'git hub': 'github',
    render: 'render',
  };

  const normalized = text.toLowerCase().trim();
  const mapped = explicitMap[normalized];
  if (mapped) return mapped;

  return normalized
    .replace(/\.js/g, 'js')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function FileCodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a1 1 0 0 0 1 1h4" />
      <path d="m10 13-2 2 2 2" />
      <path d="m14 17 2-2-2-2" />
    </svg>
  );
}

export function SkillsSecondarySidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [openSection, setOpenSection] = useState<string | null>('frontend');

  // Automatically keep accordion aligned with active route
  useEffect(() => {
    if (pathname) {
      const segments = pathname.split('/').filter(Boolean);
      if (segments[0] === 'skills' && segments[1]) {
        const activeCategory = SKILL_CATEGORIES.find(
          (cat) => slugify(cat.title) === segments[1] || cat.id === segments[1],
        );
        if (activeCategory) {
          setOpenSection(activeCategory.id);
        }
      }
    }
  }, [pathname]);

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const filteredCategories = SKILL_CATEGORIES.map((category) => {
    const matchingSkills = category.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    return {
      ...category,
      skills: matchingSkills,
    };
  }).filter((category) => category.skills.length > 0);

  return (
    <aside className="flex h-full w-[180px] select-none flex-col gap-1 overflow-y-auto rounded-[8px] bg-background px-2 py-3 text-[var(--color-text-primary)] shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
      {/* Clickable Sidebar Header Title -> Navigates to /skills */}
      <Link href="/skills" className="group mb-0.5 inline-block">
        <h2 className="px-0.5 font-inter text-[12px] font-semibold uppercase leading-none text-foreground transition-opacity group-hover:opacity-80">
          {t('skillsSidebar.toolkitTitle')}
        </h2>
      </Link>

      {/* Search Bar Input */}
      <div className="relative mb-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('skillsSidebar.searchPlaceholder')}
          className="w-full rounded-[4px] border border-border/60 bg-[var(--color-bg-secondary)] py-1 pl-2 pr-6 text-[8px] font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-brand)] focus:outline-none"
        />
        <Search className="absolute right-1.5 top-1/2 size-2.5 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
      </div>

      {/* Accordion Categories Container */}
      <div className="flex flex-col gap-1.5 rounded-[4px] py-0.5">
        {filteredCategories.map((category) => {
          const categorySlug = slugify(category.title);
          const isOpen = searchQuery ? true : openSection === category.id;
          const isCategoryActive = pathname === `/skills/${categorySlug}`;
          const categoryTitle = t(`skills.${category.id}`, category.title);

          return (
            <div
              key={category.id}
              className="rounded-[4px] bg-[var(--color-bg-secondary)] shadow-xs transition-shadow"
            >
              {/* Category Header Row */}
              <div className="flex w-full items-center justify-between rounded-[4px] px-2 py-1 transition-colors hover:bg-[var(--color-bg-tertiary)]">
                <Link
                  href={`/skills/${categorySlug}`}
                  onClick={() => setOpenSection(category.id)}
                  className={`flex items-center gap-1.5 min-w-0 truncate text-[9px] font-semibold transition-colors hover:text-[var(--color-brand)] ${
                    isCategoryActive
                      ? 'text-[var(--color-brand)] font-bold'
                      : 'text-[var(--color-text-primary)]'
                  }`}
                >
                  {/* Indicator Circle when open */}
                  {isOpen && (
                    <span className="size-1.5 shrink-0 rounded-full bg-[var(--color-brand)] animate-in fade-in zoom-in-75 duration-200" />
                  )}

                  <span className="truncate">
                    {categoryTitle} ({category.skills.length})
                  </span>
                </Link>

                <button
                  onClick={() => toggleSection(category.id)}
                  className="p-0.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                  aria-label={`Toggle ${categoryTitle}`}
                >
                  <ChevronDown
                    className={`size-3 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Accordion Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden rounded-b-[4px] bg-[var(--color-surface)]"
                  >
                    <div className="space-y-0.5 p-1">
                      {category.skills.map((skill) => {
                        const skillSlug = slugify(skill.name);
                        const skillHref = `/skills/${categorySlug}/${skillSlug}`;
                        const isSkillActive = pathname === skillHref;
                        const ItemIcon = skill.icon || Code2;
                        const levelLabel = t(`skillsSidebar.levels.${skill.level}`, skill.level);

                        return (
                          <Link
                            key={skill.name}
                            href={skillHref}
                            className={`group flex w-full items-center justify-between rounded-[3px] px-1.5 py-1 transition-colors ${
                              isSkillActive
                                ? 'bg-[var(--color-brand)] text-white'
                                : 'hover:bg-[var(--color-bg-secondary)]'
                            }`}
                          >
                            <div className="flex min-w-0 items-center gap-1.5">
                              <ItemIcon
                                className={`size-2.5 shrink-0 ${
                                  isSkillActive ? 'text-white' : 'text-[var(--color-brand)]'
                                }`}
                              />
                              <span
                                className={`truncate text-[8px] font-medium ${
                                  isSkillActive
                                    ? 'font-semibold text-white'
                                    : 'text-[var(--color-text-secondary)] group-hover:font-semibold group-hover:text-[var(--color-text-primary)]'
                                }`}
                              >
                                {skill.name}
                              </span>
                            </div>

                            {/* Level Badge */}
                            <span
                              className={`shrink-0 rounded-[2px] px-1 py-0.2 font-mono text-[6.5px] font-semibold border ${
                                isSkillActive
                                  ? 'bg-white/20 text-white border-white/30'
                                  : 'bg-muted/80 text-muted-foreground border-border/40'
                              }`}
                            >
                              {levelLabel}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom Recently Used Card */}
      <div className="mt-auto flex flex-col gap-1 rounded-[6px] bg-blue-600 dark:bg-blue-700 p-2 text-white shadow-sm">
        <h3 className="font-inter text-[9px] font-bold tracking-tight">
          {t('skillsSidebar.recentlyUsed')} ({RECENTLY_USED.length})
        </h3>

        <div className="flex flex-col gap-0.5 pt-0.5">
          {RECENTLY_USED.map((item) => (
            <Link
              key={item.name}
              href={`/skills/${item.categorySlug}/${item.skillSlug}`}
              className="text-[8px] font-medium text-blue-100/90 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
