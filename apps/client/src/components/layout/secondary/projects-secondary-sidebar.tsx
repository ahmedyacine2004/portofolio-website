'use client';

import React, { useState } from 'react';
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

// 1. Page configurations for each Project Type (max 5 pages)
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

// Override map for items inside "Featured Projects" to inherit their core project type
const FEATURED_ITEM_TYPE_MAP: Record<string, string> = {
  CONSULTIFY: 'web-dev',
  'Portfolio Workspace': 'web-dev',
  'E-commerce Website': 'web-dev',
};

const CATEGORIES: CategoryItem[] = [
  {
    id: 'featured',
    title: 'Featured Projects',
    count: 3,
    icon: Star,
    items: ['CONSULTIFY', 'Portfolio Workspace', 'E-commerce Website'],
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

export function ProjectsSecondarySidebar() {
  const [openSection, setOpenSection] = useState<string | null>('featured');

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  // Helper to determine page icons for a given item
  const getPagesForItem = (categoryId: string, itemName: string): PageConfig[] => {
    if (categoryId === 'featured') {
      const type = FEATURED_ITEM_TYPE_MAP[itemName] || 'web-dev';
      return PROJECT_TYPE_PAGES[type] || PROJECT_TYPE_PAGES['web-dev'];
    }
    return PROJECT_TYPE_PAGES[categoryId] || PROJECT_TYPE_PAGES['web-dev'];
  };

  return (
    <aside className="flex h-full w-[180px] select-none flex-col gap-1 overflow-y-auto rounded-[8px] bg-background px-2 py-3 text-[var(--color-text-primary)] shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
      {/* Title */}
      <h2 className="mb-1 px-0.5 font-inter text-[12px] font-semibold uppercase leading-none text-foreground">
        Project Hub
      </h2>

      {/* Project Workspace Banner */}
      <div className="flex items-center gap-1.5 rounded-[4px] border-l-2 border-[var(--color-purple)] bg-[var(--color-surface-brand)] px-2 py-1.5">
        <Hexagon className="size-3.5 shrink-0 stroke-[2] text-[var(--color-purple)]" />
        <span className="truncate text-[9px] font-semibold text-[var(--color-text-primary)]">
          Project Workspace
        </span>
      </div>

      {/* Accordion Container */}
      <div className="flex flex-col gap-0 overflow-hidden rounded-[4px] bg-[var(--color-bg-secondary)] shadow-gray-300 dark:shadow-[0_0_2px_rgba(255,255,255,0.015)]">
        {CATEGORIES.map((category) => {
          const CategoryIcon = category.icon;
          const isOpen = openSection === category.id;

          return (
            <div key={category.id} className="bg-[var(--color-bg-secondary)]">
              {/* Category Header */}
              <button
                onClick={() => toggleSection(category.id)}
                className="flex w-full items-center justify-between px-2 py-1 text-left transition-colors hover:bg-[var(--color-bg-tertiary)]"
              >
                <div className="flex min-w-0 items-center gap-1.5 text-[var(--color-text-primary)]">
                  <CategoryIcon className="size-3 shrink-0 text-[var(--color-brand)]" />
                  <span className="truncate text-[9px] font-semibold">
                    {category.title} ({category.count})
                  </span>
                </div>
                <ChevronDown
                  className={`size-3 shrink-0 text-[var(--color-text-tertiary)] transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Accordion Content */}
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

                        return (
                          <div
                            key={item}
                            className="group flex w-full items-center justify-between rounded-[3px] px-1.5 py-1 transition-colors hover:bg-[var(--color-brand)] hover:text-white"
                          >
                            {/* Project Name */}
                            <span className="truncate text-[8px] font-medium text-[var(--color-text-secondary)] group-hover:font-semibold group-hover:text-white">
                              {item}
                            </span>

                            {/* Page Icons (Displayed on Hover) */}
                            <div className="hidden shrink-0 items-center gap-0.5 group-hover:flex">
                              {pages.map((page) => {
                                const PageIcon = page.icon;
                                return (
                                  <button
                                    key={page.name}
                                    title={page.name}
                                    className="flex size-3.5 items-center justify-center rounded-[2px] bg-white/20 transition-colors hover:bg-white/40"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Handle page navigation here
                                    }}
                                  >
                                    <PageIcon className="size-2.5 text-white" />
                                  </button>
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
            Project Overview
          </h3>
          <p className="mt-0.5 text-[8px] leading-tight text-[var(--color-surface-secondary)] opacity-90">
            Pls choose a project to get the overview insights
          </p>
        </div>
        <button className="flex items-center justify-between rounded-[4px] bg-[var(--color-surface)] px-2 py-1 text-[8px] font-semibold text-[var(--color-brand-dark)] shadow-[var(--shadow-sm)] transition-opacity hover:opacity-95">
          <span>Open Case Study</span>
          <ExternalLink className="size-2.5 shrink-0 text-[var(--color-brand-dark)]" />
        </button>
      </div>

      {/* Version History Card */}
      <div className="flex flex-col gap-1 rounded-[4px] bg-[var(--color-bg-secondary)] p-2">
        <h3 className="font-inter text-[9px] font-bold text-[var(--color-text-primary)]">
          Version History
        </h3>

        <div className="space-y-0.5 text-[8px] font-medium text-[var(--color-text-secondary)]">
          {/* v3.2 */}
          <div className="flex items-center justify-between py-0.5">
            <span>v3.2</span>
            <div className="flex items-center gap-1">
              <span className="rounded-[2px] bg-[var(--color-success-light)] px-1 py-0.2 text-[7px] font-semibold text-white">
                Latest
              </span>
              <ChevronRight className="size-2.5 shrink-0 text-[var(--color-text-disabled)]" />
            </div>
          </div>

          {/* v2.5 */}
          <div className="flex items-center justify-between py-0.5">
            <span>v2.5</span>
            <ChevronRight className="size-2.5 shrink-0 text-[var(--color-text-disabled)]" />
          </div>

          {/* v1.0 */}
          <div className="flex items-center justify-between py-0.5">
            <span>v1.0</span>
            <ChevronRight className="size-2.5 shrink-0 text-[var(--color-text-disabled)]" />
          </div>
        </div>
      </div>
    </aside>
  );
}
