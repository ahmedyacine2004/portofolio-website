'use client';

import { useTranslation } from '@/hooks/use-translation';
import {
  BookOpen,
  FileText,
  GitBranch,
  Globe,
  Image as ImageIcon,
  Layers,
  Layout,
  Palette,
  Play,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PageConfig {
  name: string;
  icon: LucideIcon;
}

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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function ProjectPageTabs() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const segments = pathname.split('/');
  const category = segments[2] || 'web-dev';
  const pages = PROJECT_TYPE_PAGES[category] || PROJECT_TYPE_PAGES['web-dev'];
  const projectBasePath = segments.slice(0, 4).join('/');
  const activeTab = segments[4] || slugify(pages[0].name);

  return (
    <nav
      aria-label={t('projectsDetails.projectPages')}
      className="flex w-full items-center gap-1 border-b border-border/60 pb-1"
    >
      {pages.map((page) => {
        const Icon = page.icon;
        const pageSlug = slugify(page.name);
        const isActive = activeTab === pageSlug;

        return (
          <Link
            key={page.name}
            href={`${projectBasePath}/${pageSlug}`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={t(`projectsDetails.pageTypes.${page.name}`, page.name)}
            title={t(`projectsDetails.pageTypes.${page.name}`, page.name)}
            className={`flex min-w-0 items-center justify-center rounded-[4px] px-1.5 py-1.5 text-[9px] font-semibold transition-colors lg:py-2 lg:text-[10px] ${
              isActive
                ? 'flex-[2_1_0%] bg-primary text-primary-foreground shadow-xs'
                : 'flex-1 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Icon className="size-3.5 shrink-0" strokeWidth={2} />
              {isActive && (
                <span className="truncate">
                  {t(`projectsDetails.pageTypes.${page.name}`, page.name)}
                </span>
              )}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export function WebProjectPageTabs() {
  return <ProjectPageTabs />;
}
