/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useTranslation } from '@/hooks/use-translation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Code2,
  ExternalLink,
  FileText,
  GitBranch,
  Globe,
  Hexagon,
  Image as ImageIcon,
  Layers,
  Layout,
  LucideIcon,
  Palette,
  Pencil,
  Play,
  Sparkles,
  Star,
  Tag,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CategoryItem {
  id: string;
  title: string;
  count: number;
  icon: LucideIcon;
  items: string[];
}

interface PageConfig {
  name: string;
  icon: LucideIcon;
}

// 1. Page configurations for each Project Type
const PROJECT_TYPE_PAGES: Record<string, PageConfig[]> = {
  'web-dev': [
    { name: 'Project Details', icon: FileText },
    { name: 'Gallery', icon: ImageIcon },
    { name: 'Tech Stack', icon: Layers },
    { name: 'Demo', icon: Globe },
    { name: 'Repository', icon: GitBranch },
  ],
  'ui-ux': [
    { name: 'Overview', icon: FileText },
    { name: 'User Flow', icon: Workflow },
    { name: 'Wireframes', icon: Layout },
    { name: 'Prototype', icon: Play },
  ],
  'graphic-design': [
    { name: 'Overview', icon: FileText },
    { name: 'Visual Assets', icon: ImageIcon },
    { name: 'Brand Kit', icon: Sparkles },
  ],
  branding: [
    { name: 'Overview', icon: FileText },
    { name: 'Guidelines', icon: BookOpen },
    { name: 'Color Palette', icon: Palette },
    { name: 'Mockups', icon: Layers },
  ],
};

// Override map for items inside "Featured Projects" to inherit their core project category
const FEATURED_ITEM_TYPE_MAP: Record<string, string> = {
  CONSULTIFY: 'web-dev',
  'Portfolio Workspace': 'web-dev',
  'E-commerce Website': 'web-dev',
  ShopSphere: 'web-dev',
};

const CATEGORIES: CategoryItem[] = [
  {
    id: 'featured',
    title: 'Featured Projects',
    count: 3,
    icon: Star,
    items: ['CONSULTIFY', 'Portfolio Workspace', 'ShopSphere'],
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    count: 4,
    icon: Code2,
    items: ['CONSULTIFY', 'Portfolio Workspace', 'TaskFlow Dashboard', 'ShopSphere'],
  },
  {
    id: 'ui-ux',
    title: 'UI/ UX',
    count: 6,
    icon: Pencil,
    items: [
      'NeoBank Mobile',
      'Insight Analytics',
      'HealthSync',
      'TravelMate',
      'LearnHub LMS',
      'Design System',
    ],
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    count: 3,
    icon: Palette,
    items: ['Apex Brand Kit', 'Social Campaign 2025', 'Event Visual Identity'],
  },
  {
    id: 'branding',
    title: 'Branding',
    count: 3,
    icon: Tag,
    items: ['Lumina Studio', 'Nova Coffee', 'GreenLeaf Market'],
  },
];

// Helper to convert names into URL-safe slugs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper to identify which category accordion should be open based on the current URL
function getActiveCategoryId(pathname: string): string {
  if (!pathname) return 'featured';

  const segments = pathname.split('/');
  const categorySlugInUrl = segments[2];

  if (categorySlugInUrl) {
    const directMatch = CATEGORIES.find(
      (cat) => cat.id !== 'featured' && cat.id === categorySlugInUrl,
    );
    if (directMatch) return directMatch.id;
  }

  for (const category of CATEGORIES) {
    for (const item of category.items) {
      const categorySlug =
        category.id === 'featured' ? FEATURED_ITEM_TYPE_MAP[item] || 'web-dev' : category.id;
      const projectSlug = slugify(item);

      if (pathname.startsWith(`/projects/${categorySlug}/${projectSlug}`)) {
        return category.id;
      }
    }
  }

  return 'featured';
}

export function ProjectsSecondarySidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const [openSection, setOpenSection] = useState<string | null>(() =>
    getActiveCategoryId(pathname),
  );

  useEffect(() => {
    const activeCategoryId = getActiveCategoryId(pathname);
    setOpenSection(activeCategoryId);
  }, [pathname]);

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const getPagesForItem = (categoryId: string, itemName: string): PageConfig[] => {
    if (categoryId === 'featured') {
      const type = FEATURED_ITEM_TYPE_MAP[itemName] || 'web-dev';
      return PROJECT_TYPE_PAGES[type] || PROJECT_TYPE_PAGES['web-dev'];
    }
    return PROJECT_TYPE_PAGES[categoryId] || PROJECT_TYPE_PAGES['web-dev'];
  };

  const getCategorySlug = (categoryId: string, itemName: string): string => {
    if (categoryId === 'featured') {
      return FEATURED_ITEM_TYPE_MAP[itemName] || 'web-dev';
    }
    return categoryId;
  };

  return (
    <aside className="flex h-full w-[180px] select-none flex-col gap-1 overflow-y-auto rounded-[8px] bg-background px-2 py-3 text-[var(--color-text-primary)] shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
      {/* Title */}
      <h2 className="mb-1 px-0.5 font-inter text-[12px] font-semibold uppercase leading-none text-foreground">
        {t('projectsSidebar.projectHub')}
      </h2>

      {/* Accordion Categories List */}
      <div className="space-y-1">
        {CATEGORIES.map((category) => {
          const isOpen = openSection === category.id;
          const Icon = category.icon;
          const categoryTitle =
            category.id === 'featured'
              ? t('projectsDetails.categories.featured')
              : category.id === 'web-dev'
                ? t('projectsDetails.categories.web-dev')
                : category.id === 'ui-ux'
                  ? t('projectsDetails.categories.ui-ux')
                  : category.id === 'graphic-design'
                    ? t('projectsDetails.categories.graphic-design')
                    : category.id === 'branding'
                      ? t('projectsDetails.categories.branding')
                      : category.title;

          return (
            <div
              key={category.id}
              className="overflow-hidden rounded-[4px] border border-[var(--color-border-light)]"
            >
              {/* Category Header */}
              <button
                type="button"
                onClick={() => toggleSection(category.id)}
                className="flex w-full items-center justify-between bg-card px-2 py-1.5 text-left transition-colors hover:bg-[var(--color-surface)]"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <Icon className="size-3 text-[var(--color-brand)] shrink-0" />
                  <span className="font-inter text-[9px] font-semibold text-[var(--color-text-primary)] truncate">
                    {categoryTitle}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className="rounded-[2px] bg-[var(--color-brand)] px-1 py-0.2 text-[8px] font-semibold text-white">
                    {category.count}
                  </span>
                  {isOpen ? (
                    <ChevronDown className="size-3 text-[var(--color-text-tertiary)]" />
                  ) : (
                    <ChevronRight className="size-3 text-[var(--color-text-tertiary)]" />
                  )}
                </div>
              </button>

              {/* Projects Submenu Accordion Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden bg-[var(--color-surface)]"
                  >
                    <div className="space-y-0.5 px-1 py-1">
                      {category.items.map((item) => {
                        const pages = getPagesForItem(category.id, item);
                        const categorySlug = getCategorySlug(category.id, item);
                        const projectSlug = slugify(item);

                        const firstPageSlug = slugify(pages[0].name);
                        const defaultHref = `/projects/${categorySlug}/${projectSlug}/${firstPageSlug}`;
                        const isProjectActive = pathname.startsWith(
                          `/projects/${categorySlug}/${projectSlug}`,
                        );

                        return (
                          <div
                            key={item}
                            className={`group flex w-full items-center justify-between rounded-[3px] px-1.5 py-1 transition-colors ${
                              isProjectActive
                                ? 'bg-[var(--color-brand)] text-white'
                                : 'hover:bg-[var(--color-brand)] hover:text-white'
                            }`}
                          >
                            <Link
                              href={defaultHref}
                              className="truncate text-[8px] font-medium text-[var(--color-text-secondary)] group-hover:font-semibold group-hover:text-white"
                            >
                              {item}
                            </Link>

                            <div className="hidden shrink-0 items-center gap-0.5 group-hover:flex">
                              {pages.map((page) => {
                                const PageIcon = page.icon;
                                const pageSlug = slugify(page.name);
                                const href = `/projects/${categorySlug}/${projectSlug}/${pageSlug}`;
                                const isPageActive = pathname === href;

                                // Convert page name to translation key (camelCase)
                                const pageKey = page.name
                                  .replace(/\s+/g, '')
                                  .replace(/^./, (c) => c.toLowerCase());

                                return (
                                  <Link
                                    key={page.name}
                                    href={href}
                                    title={t(`projectsDetails.pageTypes.${pageKey}`, page.name)}
                                    className={`flex size-3.5 items-center justify-center rounded-[2px] transition-colors ${
                                      isPageActive
                                        ? 'bg-white text-[var(--color-brand-dark)]'
                                        : 'bg-white/20 hover:bg-white/40 text-white'
                                    }`}
                                  >
                                    <PageIcon className="size-2.5" />
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
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

      {/* Project Overview CTA Card */}
      <div className="flex flex-col gap-1.5 rounded-[4px] bg-[var(--color-brand-dark)] p-2 text-[var(--color-text-inverse)] shadow-[var(--shadow-sm)]">
        <div>
          <h3 className="font-inter text-[9px] font-semibold text-[var(--color-surface)]">
            {t('projectsSidebar.projectOverview')}
          </h3>
          <p className="mt-0.5 text-[8px] leading-tight text-[var(--color-surface-secondary)] opacity-90">
            {t('projectsSidebar.overviewInsights')}
          </p>
        </div>
        <Link
          href="/projects/web-dev/consultify/project-details"
          className="flex items-center justify-between rounded-[4px] bg-[var(--color-surface)] px-2 py-1 text-[8px] font-semibold text-[var(--color-brand-dark)] shadow-[var(--shadow-sm)] transition-opacity hover:opacity-95"
        >
          <span>{t('projectsSidebar.openCaseStudy')}</span>
          <ExternalLink className="size-2.5 shrink-0 text-[var(--color-brand-dark)]" />
        </Link>
      </div>

      {/* Version History Card */}
      <div className="flex flex-col gap-1 rounded-[4px] bg-[var(--color-bg-secondary)] p-2">
        <h3 className="font-inter text-[9px] font-bold text-[var(--color-text-primary)]">
          {t('projectsSidebar.versionHistory')}
        </h3>

        <div className="space-y-0.5 text-[8px] font-medium text-[var(--color-text-secondary)]">
          <div className="flex items-center justify-between py-0.5">
            <span>v3.2</span>
            <div className="flex items-center gap-1">
              <span className="rounded-[2px] bg-[var(--color-success-light)] px-1 py-0.2 text-[7px] font-semibold text-white">
                {t('projectsSidebar.latest')}
              </span>
              <ChevronRight className="size-2.5 shrink-0 text-[var(--color-text-disabled)]" />
            </div>
          </div>

          <div className="flex items-center justify-between py-0.5">
            <span>v2.5</span>
            <ChevronRight className="size-2.5 shrink-0 text-[var(--color-text-disabled)]" />
          </div>

          <div className="flex items-center justify-between py-0.5">
            <span>v1.0</span>
            <ChevronRight className="size-2.5 shrink-0 text-[var(--color-text-disabled)]" />
          </div>
        </div>
      </div>
    </aside>
  );
}
