'use client';

import { useTranslation } from '@/hooks/use-translation';
import {
  Code2,
  FileText,
  GitBranch,
  Globe,
  Image as ImageIcon,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ProjectPageTab {
  slug: string;
  label: string;
  translationKey: string;
  icon: LucideIcon;
}

const PROJECT_PAGE_TABS: ProjectPageTab[] = [
  {
    slug: 'project-details',
    label: 'Project Details',
    translationKey: 'projectDetails',
    icon: FileText,
  },
  { slug: 'gallery', label: 'Gallery', translationKey: 'gallery', icon: ImageIcon },
  { slug: 'tech-stack', label: 'Tech Stack', translationKey: 'techStack', icon: Code2 },
  { slug: 'demo', label: 'Demo', translationKey: 'demo', icon: Globe },
  { slug: 'repository', label: 'Repository', translationKey: 'repository', icon: GitBranch },
];

export function WebProjectPageTabs() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const segments = pathname.split('/');
  const projectBasePath = segments.slice(0, 4).join('/');
  const activeTab = segments[4] || 'project-details';

  return (
    <nav
      aria-label={t('projectsDetails.projectPages')}
      className="flex w-full items-center gap-1 border-b border-border/60 pb-1"
    >
      {PROJECT_PAGE_TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.slug;

        return (
          <Link
            key={tab.slug}
            href={`${projectBasePath}/${tab.slug}`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={t(`projectsDetails.pageTypes.${tab.translationKey}`, tab.label)}
            title={t(`projectsDetails.pageTypes.${tab.translationKey}`, tab.label)}
            className={`flex min-w-0 items-center justify-center rounded-[4px] px-1.5 py-1.5 text-[9px] font-semibold transition-colors lg:py-2 lg:text-[10px] ${
              isActive
                ? 'flex-[2_1_0%] bg-primary text-primary-foreground shadow-xs'
                : 'flex-1 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon className="size-3.5 shrink-0" strokeWidth={2} />
            {isActive && (
              <span className="truncate">
                {t(`projectsDetails.pageTypes.${tab.translationKey}`, tab.label)}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
