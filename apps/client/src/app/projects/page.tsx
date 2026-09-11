'use client';

import { ProjectsSecondarySidebar } from '@/components/layout/secondary/projects-secondary-sidebar';
import { useDownload } from '@/hooks/use-download';
import { useTranslation } from '@/hooks/use-translation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Archive,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Code2,
  Download,
  ExternalLink,
  Folder,
  FolderTree,
  Layers,
  LayoutTemplate,
  MoreVertical,
  Terminal,
  TrendingUp,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import Image from 'next/image';
import folderImg from '../../assets/images/ui/folder.png';

export default function ProjectsPage() {
  const { t } = useTranslation();
  const { download } = useDownload();
  const [isProjectsSidebarOpen, setIsProjectsSidebarOpen] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isFeaturedModalOpen, setIsFeaturedModalOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(t('projects.todayTime'));

  const projectStats = {
    total: 12,
    completed: 10,
    active: 2,
    archived: 1,
  };

  const activityItems = [
    { label: t('projects.consultifyUpdated'), time: t('projects.time15mAgo'), color: 'purple' },
    { label: t('projects.consultifyUpdated'), time: t('projects.time15mAgo'), color: 'green' },
    { label: t('projects.taskflowDocAdded'), time: t('projects.time1hAgo'), color: 'warning' },
    { label: t('projects.newProjectInit'), time: t('projects.time3hAgo'), color: 'brand' },
  ];

  const featuredProjects = [
    {
      name: 'CONSULTIFY',
      subtitle: `${t('projects.fullStack')} / ${t('projects.enterprise')}`,
      link: '/projects/web-dev/consultify/project-details',
      icon: Layers,
    },
    {
      name: 'Portfolio Workspace',
      subtitle: 'React / Next.js / Live',
      link: '/projects/web-dev/portfolio-workspace/project-details',
      icon: Code2,
    },
    {
      name: 'ShopSphere',
      subtitle: 'MERN STACK / In progress',
      link: '/projects/web-dev/shopsphere/project-details',
      icon: LayoutTemplate,
    },
  ];

  const handleDownloadResume = () => {
    download({
      fileName: 'Ahmed-Yassine-Abbane-Resume.pdf',
      url: '/documents/estin.pdf',
      fileType: 'pdf',
      onError: (error) => {
        console.error('Resume download failed:', error);
      },
    });
  };

  return (
    <div className="flex w-full flex-col gap-3 p-2 overflow-y-auto lg:gap-1.5">
      <div className="flex items-center justify-between lg:hidden">
        <span className="font-inter text-[10px] font-bold uppercase text-[var(--color-text-primary)]">
          {t('projects.projectWorkspace')}
        </span>
        <button
          type="button"
          onClick={() => setIsProjectsSidebarOpen(true)}
          aria-label="Open project navigation"
          className="flex h-7 shrink-0 items-center gap-1.5 rounded-xs bg-background px-2 text-[9px] font-semibold text-[var(--color-text-primary)] shadow-gray-300 transition-colors hover:bg-muted dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
        >
          <FolderTree className="size-3.5" strokeWidth={1.8} />
          <span>Projects</span>
        </button>
      </div>

      <AnimatePresence>
        {isProjectsSidebarOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProjectsSidebarOpen(false)}
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
              className="h-full w-[82%] max-w-[340px] overflow-y-auto bg-background p-3 shadow-2xl md:w-[360px]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-secondary">
                  Projects
                </span>
                <button
                  type="button"
                  onClick={() => setIsProjectsSidebarOpen(false)}
                  aria-label="Close project navigation"
                  className="flex size-7 items-center justify-center text-foreground"
                >
                  <X className="size-3.5" strokeWidth={2} />
                </button>
              </div>
              <div className="[&_aside]:!h-auto [&_aside]:!w-full [&_aside]:!rounded-[4px] [&_aside]:!p-0 [&_aside]:!shadow-none">
                <ProjectsSecondarySidebar />
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Grid: Workspace Info & Status */}
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        {/* Project Workspace Card */}
        <div className="relative col-span-2 flex flex-col justify-between overflow-hidden rounded-[6px] border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-3 px-4 lg:p-2.5 lg:px-6 shadow-[var(--shadow-sm)]">
          {/* Folder Image */}
          <div className="relative right-auto top-auto order-2 mt-3 mb-5 flex justify-center max-md:my-4 lg:absolute lg:right-6 lg:top-1/2 lg:order-none lg:mt-0 lg:mb-0 lg:-translate-y-1/2">
            <Image
              src={folderImg}
              alt="Project Folder"
              className="h-20 w-auto object-contain"
              priority
            />
          </div>

          <div className="relative z-10 order-1 max-w-full space-y-1 lg:order-none lg:max-w-xs">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="flex size-8 items-center justify-center rounded-[6px] bg-blue-500 text-white shadow-sm shadow-blue-500/20 lg:size-9">
                <Folder className="size-4 lg:size-5" />
              </div>
              <h1 className="font-inter text-[25px] font-bold leading-tight text-[var(--color-text-primary)] max-md:text-[20px] max-md:leading-none">
                {t('projects.projectWorkspace')}
              </h1>
            </div>
            <p className="text-[9px] leading-tight text-[var(--color-text-secondary)]">
              {t('projects.description')}
            </p>
          </div>

          <Link
            href="/projects/web-dev/consultify/project-details"
            className="relative z-10 order-3 mt-3 flex w-fit items-center justify-center gap-1.5 rounded-[4px] bg-[var(--color-brand)] px-4 py-2 text-[10px] font-medium text-[var(--color-text-inverse)] transition-colors hover:opacity-90 max-md:mt-5 max-md:w-full lg:order-none"
          >
            {t('projects.browseFeatured')}
            <ExternalLink className="size-3" />
          </Link>
        </div>
        {/* Workspace Status Card */}
        <div className="col-span-1 flex flex-col justify-between rounded-[6px] border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-2 shadow-[var(--shadow-sm)]">
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex size-5 items-center justify-center rounded-[3px] bg-[var(--color-purple)] text-white shadow-sm">
                <TrendingUp className="size-3" />
              </div>
              <h2 className="font-inter text-[10px] font-bold text-[var(--color-text-primary)]">
                {t('projects.workspaceStatus')}
              </h2>
            </div>
            <div className="relative">
              <button
                type="button"
                aria-label="Open workspace status actions"
                aria-expanded={isStatusMenuOpen}
                className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                onClick={() => setIsStatusMenuOpen((value) => !value)}
              >
                <MoreVertical className="size-3" />
              </button>
              {isStatusMenuOpen && (
                <div className="absolute right-0 top-full z-20 mt-1 min-w-[160px] rounded-[4px] border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-1 shadow-[var(--shadow-sm)]">
                  <button
                    type="button"
                    onClick={() => {
                      setLastUpdated(
                        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      );
                      setIsStatusMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-1 rounded-[3px] px-2 py-1 text-[8px] font-semibold text-[var(--color-text-secondary)] transition hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
                  >
                    <Clock className="size-2.5" />
                    Refresh status
                  </button>
                  <Link
                    href="/projects"
                    onClick={() => setIsStatusMenuOpen(false)}
                    className="flex w-full items-center gap-1 rounded-[3px] px-2 py-1 text-[8px] font-semibold text-[var(--color-text-secondary)] transition hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
                  >
                    <Folder className="size-2.5" />
                    View all projects
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-0 text-[8px] font-medium">
            <div className="flex items-center justify-between border-b border-[var(--color-border-light)] py-1">
              <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                <Folder className="size-2.5 text-[var(--color-purple)]" />
                <span>{t('projects.projects')}</span>
              </div>
              <span className="font-bold text-[var(--color-text-primary)]">
                {projectStats.total}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-[var(--color-border-light)] py-1">
              <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                <CheckCircle2 className="size-2.5 text-[var(--color-purple)]" />
                <span>{t('projects.completed')}</span>
              </div>
              <span className="font-bold text-[var(--color-text-primary)]">
                {projectStats.completed}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-[var(--color-border-light)] py-1">
              <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                <Clock className="size-2.5 text-[var(--color-purple)]" />
                <span>{t('projects.active')}</span>
              </div>
              <span className="font-bold text-[var(--color-text-primary)]">
                {String(projectStats.active).padStart(2, '0')}
              </span>
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                <Archive className="size-2.5 text-[var(--color-purple)]" />
                <span>{t('projects.archived')}</span>
              </div>
              <span className="font-bold text-[var(--color-text-primary)]">
                {String(projectStats.archived).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="mt-1 flex items-center gap-1 text-[7px] font-semibold text-[var(--color-text-tertiary)] border-t border-[var(--color-border-light)] pt-1">
            <span className="text-[var(--color-text-primary)]">{t('projects.lastUpdate')}</span>
            <span className="size-1 rounded-full bg-[var(--color-success)]"></span>
            <span>{lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="flex flex-col gap-2 md:gap-2.5 lg:gap-1">
        <h3 className="font-inter text-[10px] font-bold text-[var(--color-text-primary)]">
          {t('projects.recentActivity')}
        </h3>
        <div className="rounded-[6px] border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-2 shadow-[var(--shadow-sm)]">
          <ul className="space-y-1">
            {activityItems.slice(0, 4).map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-[8px] font-medium text-[var(--color-text-secondary)]"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`size-1 rounded-full ${
                      item.color === 'purple'
                        ? 'bg-[var(--color-purple)]'
                        : item.color === 'green'
                          ? 'bg-[var(--color-success)]'
                          : item.color === 'warning'
                            ? 'bg-[var(--color-warning)]'
                            : 'bg-[var(--color-brand)]'
                    }`}
                  ></span>
                  <span>{item.label}</span>
                </div>
                <span className="text-[var(--color-text-tertiary)]">{item.time}</span>
              </li>
            ))}
          </ul>
          <div className="mt-1 flex justify-end">
            <button
              type="button"
              onClick={() => setIsActivityModalOpen(true)}
              className="flex items-center gap-0.5 text-[7px] font-semibold text-[var(--color-brand)] hover:opacity-80"
            >
              {t('projects.viewAllActivity')}
              <ArrowUpRight className="size-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="flex flex-col gap-2 md:gap-2.5 lg:gap-1">
        <div className="flex items-center justify-between">
          <h3 className="font-inter text-[10px] font-bold text-[var(--color-text-primary)]">
            {t('projects.featuredProjects')}
          </h3>
          <button
            type="button"
            onClick={() => setIsFeaturedModalOpen(true)}
            className="flex items-center gap-0.5 text-[7px] font-semibold text-[var(--color-brand)] hover:opacity-80"
          >
            {t('projects.viewAllProjects')}
            <ArrowUpRight className="size-2" />
          </button>
        </div>

        <div className="flex flex-col gap-2 md:gap-2.5 lg:gap-1.5">
          {/* Project Card 1 */}
          <div className="flex items-center justify-between rounded-[6px] border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-1.5 pr-2 shadow-[var(--shadow-sm)] transition-colors hover:bg-[var(--color-bg-secondary)]">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-[4px] bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border-light)]">
                <Layers className="size-3.5" />
              </div>
              <div>
                <h4 className="font-inter text-[9px] font-bold text-[var(--color-text-primary)]">
                  CONSULTIFY
                </h4>
                <div className="mt-0.5 flex items-center gap-1 text-[7px] font-medium text-[var(--color-text-secondary)]">
                  <span>{t('projects.fullStack')}</span>
                  <span className="rounded-[2px] bg-[var(--color-purple)]/10 px-1 py-0.5 font-semibold text-[var(--color-purple)]">
                    {t('projects.enterprise')}
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/projects/web-dev/consultify/project-details"
              className="flex items-center gap-1 rounded-[3px] bg-[var(--color-brand)] px-2.5 py-1 text-[7px] font-semibold text-[var(--color-text-inverse)] transition hover:opacity-90"
            >
              {t('projects.viewProject')}
              <ExternalLink className="size-2" />
            </Link>
          </div>

          {/* Project Card 2 */}
          <div className="flex items-center justify-between rounded-[6px] border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-1.5 pr-2 shadow-[var(--shadow-sm)] transition-colors hover:bg-[var(--color-bg-secondary)]">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-[4px] bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border-light)]">
                <Code2 className="size-3.5" />
              </div>
              <div>
                <h4 className="font-inter text-[9px] font-bold text-[var(--color-text-primary)]">
                  Portfolio Workspace
                </h4>
                <div className="mt-0.5 flex items-center gap-1 text-[7px] font-medium text-[var(--color-text-secondary)]">
                  <span>React / Next.js</span>
                  <span className="rounded-[2px] bg-[var(--color-brand)]/10 px-1 py-0.5 font-semibold text-[var(--color-brand)]">
                    {t('projects.live')}
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/projects/web-dev/portfolio-workspace/project-details"
              className="flex items-center gap-1 rounded-[3px] bg-[var(--color-brand)] px-2.5 py-1 text-[7px] font-semibold text-[var(--color-text-inverse)] transition hover:opacity-90"
            >
              {t('projects.viewProject')}
              <ExternalLink className="size-2" />
            </Link>
          </div>

          {/* Project Card 3 */}
          <div className="flex items-center justify-between rounded-[6px] border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-1.5 pr-2 shadow-[var(--shadow-sm)] transition-colors hover:bg-[var(--color-bg-secondary)]">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-[4px] bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border-light)]">
                <LayoutTemplate className="size-3.5" />
              </div>
              <div>
                <h4 className="font-inter text-[9px] font-bold text-[var(--color-text-primary)]">
                  ShopSphere
                </h4>
                <div className="mt-0.5 flex items-center gap-1 text-[7px] font-medium text-[var(--color-text-secondary)]">
                  <span>MERN STACK</span>
                  <span className="rounded-[2px] bg-[var(--color-warning)]/10 px-1 py-0.5 font-semibold text-[var(--color-warning)]">
                    {t('projects.inProgress')}
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/projects/web-dev/shopsphere/project-details"
              className="flex items-center gap-1 rounded-[3px] bg-[var(--color-brand)] px-2.5 py-1 text-[7px] font-semibold text-[var(--color-text-inverse)] transition hover:opacity-90"
            >
              {t('projects.viewProject')}
              <ExternalLink className="size-2" />
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isActivityModalOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsActivityModalOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              className="w-full max-w-[560px] rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-4 shadow-[var(--shadow-sm)]"
              initial={{ scale: 0.96, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-inter text-[12px] font-bold uppercase text-[var(--color-text-primary)]">
                    {t('projects.recentActivity')}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Close activity modal"
                  onClick={() => setIsActivityModalOpen(false)}
                  className="flex size-7 items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {activityItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-[4px] border border-[var(--color-border-light)] px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-1.5 rounded-full ${
                          item.color === 'purple'
                            ? 'bg-[var(--color-purple)]'
                            : item.color === 'green'
                              ? 'bg-[var(--color-success)]'
                              : item.color === 'warning'
                                ? 'bg-[var(--color-warning)]'
                                : 'bg-[var(--color-brand)]'
                        }`}
                      ></span>
                      <span className="text-[8px] font-semibold text-[var(--color-text-secondary)]">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[7px] font-semibold text-[var(--color-text-tertiary)]">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsActivityModalOpen(false)}
                  className="rounded-[4px] bg-[var(--color-brand)] px-3 py-1.5 text-[8px] font-semibold text-[var(--color-text-inverse)] hover:opacity-90"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFeaturedModalOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFeaturedModalOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              className="w-full max-w-[620px] rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-4 shadow-[var(--shadow-sm)]"
              initial={{ scale: 0.96, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-inter text-[12px] font-bold uppercase text-[var(--color-text-primary)]">
                    {t('projects.featuredProjects')}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Close featured projects modal"
                  onClick={() => setIsFeaturedModalOpen(false)}
                  className="flex size-7 items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {featuredProjects.map((project, index) => {
                  const Icon = project.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-[4px] border border-[var(--color-border-light)] px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-[4px] bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border-light)]">
                          <Icon className="size-3.5" />
                        </span>
                        <div>
                          <span className="block text-[8px] font-bold text-[var(--color-text-primary)]">
                            {project.name}
                          </span>
                          <span className="block text-[7px] font-semibold text-[var(--color-text-secondary)]">
                            {project.subtitle}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={project.link}
                        onClick={() => setIsFeaturedModalOpen(false)}
                        className="flex items-center gap-1 rounded-[3px] bg-[var(--color-brand)] px-2.5 py-1 text-[7px] font-semibold text-[var(--color-text-inverse)] transition hover:opacity-90"
                      >
                        {t('projects.viewProject')}
                        <ExternalLink className="size-2" />
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsFeaturedModalOpen(false)}
                  className="rounded-[4px] bg-[var(--color-brand)] px-3 py-1.5 text-[8px] font-semibold text-[var(--color-text-inverse)] hover:opacity-90"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions Section */}
      <div className="flex flex-col gap-2 md:gap-2.5 lg:gap-1">
        <h3 className="font-inter text-[10px] font-bold text-[var(--color-text-primary)]">
          {t('projects.quickActions')}
        </h3>
        <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2">
          <Link
            href="/projects/web-dev/consultify/project-details"
            className="flex w-full items-center justify-center gap-1.5 rounded-[4px] bg-[var(--color-brand)] py-1.5 text-[8px] font-semibold text-[var(--color-text-inverse)] shadow-[var(--shadow-sm)] transition hover:opacity-90"
          >
            <Folder className="size-2.5" />
            {t('projects.openFeatured')}
          </Link>
          <a
            href="https://consultify.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-1.5 rounded-[4px] bg-[var(--color-brand)] py-1.5 text-[8px] font-semibold text-[var(--color-text-inverse)] shadow-[var(--shadow-sm)] transition hover:opacity-90"
          >
            <ArrowUpRight className="size-2.5" />
            {t('projects.visitLiveDemo')}
          </a>
          <Link
            href="/projects/web-dev/consultify/repository"
            className="flex w-full items-center justify-center gap-1.5 rounded-[4px] bg-[var(--color-brand)] py-1.5 text-[8px] font-semibold text-[var(--color-text-inverse)] shadow-[var(--shadow-sm)] transition hover:opacity-90"
          >
            <Terminal className="size-2.5" />
            {t('projects.browseAllRepos')}
          </Link>
          <button
            onClick={handleDownloadResume}
            className="flex w-full items-center justify-center gap-1.5 rounded-[4px] bg-[var(--color-brand)] py-1.5 text-[8px] font-semibold text-[var(--color-text-inverse)] shadow-[var(--shadow-sm)] transition hover:opacity-90"
          >
            <Download className="size-2.5" />
            {t('projects.downloadResume')}
          </button>
        </div>
      </div>
    </div>
  );
}
