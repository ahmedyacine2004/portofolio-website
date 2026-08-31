'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  Briefcase,
  ChevronRight,
  Clock,
  Code2,
  Flag,
  GraduationCap,
  Heart,
  LayoutGrid,
  MapPin,
  Play,
  Quote,
  Sliders,
  X,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

import { ExperienceSecondarySidebar } from '@/components/layout/secondary/experience-secondary-sidebar';
import { useTranslation } from '@/hooks/use-translation';

interface CareerMilestone {
  id: string;
  title: string;
  year: string;
  icon: React.ElementType;
}

interface OverviewCard {
  title: string;
  description: string;
  badge: string;
  href: string;
  icon: React.ElementType;
  accentClass: string;
  iconBgClass: string;
  textColorClass: string;
}

interface MetricSnapshot {
  id: string;
  value: string;
  label: string;
  icon: React.ElementType;
  badgeBg: string;
}

const CAREER_MILESTONES_DATA: CareerMilestone[] = [
  {
    id: '1',
    title: 'Education Started',
    year: '2019',
    icon: Play,
  },
  {
    id: '2',
    title: 'First Coding Journey',
    year: '2020',
    icon: Code2,
  },
  {
    id: '3',
    title: 'First Internship',
    year: '2022',
    icon: Briefcase,
  },
  {
    id: '4',
    title: 'Key Achievements',
    year: '2023',
    icon: Flag,
  },
  {
    id: '5',
    title: 'Building Impact',
    year: '2024',
    icon: Heart,
  },
  {
    id: '6',
    title: 'Future Goals',
    year: '2025',
    icon: Bookmark,
  },
];

const OVERVIEW_CARDS_DATA: OverviewCard[] = [
  {
    title: 'Education',
    description: 'Academic background & learning journey',
    badge: '2 degrees',
    href: '/experience/education',
    icon: BookOpen,
    accentClass: 'border-t-emerald-500 hover:border-emerald-600',
    iconBgClass: 'bg-emerald-500 text-white',
    textColorClass: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    title: 'Internships',
    description: 'Hands-on experience & real-world exposure',
    badge: '2 Internships',
    href: '/experience/internships',
    icon: Briefcase,
    accentClass: 'border-t-sky-500 hover:border-sky-600',
    iconBgClass: 'bg-sky-500 text-white',
    textColorClass: 'text-sky-600 dark:text-sky-400',
  },
  {
    title: 'Achievements',
    description: 'Recognitions & accomplishments',
    badge: '8 Achievements',
    href: '/experience/achievements',
    icon: Flag,
    accentClass: 'border-t-violet-600 hover:border-violet-700',
    iconBgClass: 'bg-violet-600 text-white',
    textColorClass: 'text-violet-600 dark:text-violet-400',
  },
  {
    title: 'Milestones',
    description: 'Key moments in my journey',
    badge: '12 Milestones',
    href: '/experience/education',
    icon: MapPin,
    accentClass: 'border-t-orange-500 hover:border-orange-600',
    iconBgClass: 'bg-orange-500 text-white',
    textColorClass: 'text-orange-600 dark:text-orange-400',
  },
  {
    title: 'Future Goals',
    description: "What's next & my vision",
    badge: '5 Goals',
    href: '/experience/consultify',
    icon: Sliders,
    accentClass: 'border-t-primary hover:border-primary/80',
    iconBgClass: 'bg-primary text-primary-foreground',
    textColorClass: 'text-primary',
  },
];

const METRIC_SNAPSHOTS_DATA: MetricSnapshot[] = [
  {
    id: 'years',
    value: '5+',
    label: 'Years of Journey',
    icon: Clock,
    badgeBg: 'bg-sky-500 text-white',
  },
  {
    id: 'degrees',
    value: '2',
    label: 'Degrees Earned',
    icon: GraduationCap,
    badgeBg: 'bg-emerald-500 text-white',
  },
  {
    id: 'internships',
    value: '2',
    label: 'Internships Completed',
    icon: Briefcase,
    badgeBg: 'bg-violet-600 text-white',
  },
  {
    id: 'achievements',
    value: '8',
    label: 'Key Achievements',
    icon: LayoutGrid,
    badgeBg: 'bg-orange-500 text-white',
  },
  {
    id: 'milestones',
    value: '12',
    label: 'Milestones Reached',
    icon: MapPin,
    badgeBg: 'bg-rose-500 text-white',
  },
];

const REGISTERED_MODULES: string[] = [
  'Started my coding journey with curiosity and passion.',
  'Built strong foundations in Computer Science.',
  'Gained real-world experience through internships.',
  'Achieved recognition for consistent performance.',
  'Continuously learning and building meaningful solutions.',
];

export default function ExperienceWorkspacePage() {
  const { t } = useTranslation();
  const [isExperienceSidebarOpen, setIsExperienceSidebarOpen] = useState(false);

  const careerMilestones = useMemo(
    () => [
      {
        id: '1',
        title: t('experiencePage.educationStarted'),
        year: '2019',
        icon: Play,
      },
      {
        id: '2',
        title: t('experiencePage.firstCodingJourney'),
        year: '2020',
        icon: Code2,
      },
      {
        id: '3',
        title: t('experiencePage.firstInternship'),
        year: '2022',
        icon: Briefcase,
      },
      {
        id: '4',
        title: t('experiencePage.keyAchievements'),
        year: '2023',
        icon: Flag,
      },
      {
        id: '5',
        title: t('experiencePage.buildingImpact'),
        year: '2024',
        icon: Heart,
      },
      {
        id: '6',
        title: t('experiencePage.futureGoals'),
        year: '2025',
        icon: Bookmark,
      },
    ],
    [t],
  );

  const overviewCards = useMemo(
    () => [
      {
        title: t('experiencePage.education'),
        description: t('experiencePage.educationDesc'),
        badge: t('experience.educationBadge'),
        href: '/experience/education',
        icon: BookOpen,
        accentClass: 'border-t-emerald-500 hover:border-emerald-600',
        iconBgClass: 'bg-emerald-500 text-white',
        textColorClass: 'text-emerald-600 dark:text-emerald-400',
      },
      {
        title: t('experiencePage.internships'),
        description: t('experiencePage.internshipsDesc'),
        badge: t('experience.internshipsBadge'),
        href: '/experience/internships',
        icon: Briefcase,
        accentClass: 'border-t-sky-500 hover:border-sky-600',
        iconBgClass: 'bg-sky-500 text-white',
        textColorClass: 'text-sky-600 dark:text-sky-400',
      },
      {
        title: t('experiencePage.achievements'),
        description: t('experiencePage.achievementsDesc'),
        badge: t('experiencePage.achievementsBadge'),
        href: '/experience/achievements',
        icon: Flag,
        accentClass: 'border-t-violet-600 hover:border-violet-700',
        iconBgClass: 'bg-violet-600 text-white',
        textColorClass: 'text-violet-600 dark:text-violet-400',
      },
      {
        title: t('experiencePage.milestones'),
        description: 'Key moments in my journey',
        badge: t('experiencePage.milestonesBadge'),
        href: '/experience/education',
        icon: MapPin,
        accentClass: 'border-t-orange-500 hover:border-orange-600',
        iconBgClass: 'bg-orange-500 text-white',
        textColorClass: 'text-orange-600 dark:text-orange-400',
      },
      {
        title: t('experiencePage.futureGoals'),
        description: t('experiencePage.futureGoalsDesc'),
        badge: t('experiencePage.goalsBadge'),
        href: '/experience/consultify',
        icon: Sliders,
        accentClass: 'border-t-primary hover:border-primary/80',
        iconBgClass: 'bg-primary text-primary-foreground',
        textColorClass: 'text-primary',
      },
    ],
    [t],
  );

  const metricSnapshots = useMemo(
    () => [
      {
        id: 'years',
        value: t('experiencePage.yearsValue'),
        label: t('experiencePage.yearsOfJourney'),
        icon: Clock,
        badgeBg: 'bg-sky-500 text-white',
      },
      {
        id: 'degrees',
        value: t('experiencePage.degreesValue'),
        label: t('experiencePage.degreesEarned'),
        icon: GraduationCap,
        badgeBg: 'bg-emerald-500 text-white',
      },
      {
        id: 'internships',
        value: '2',
        label: t('experiencePage.internshipsCompleted'),
        icon: Briefcase,
        badgeBg: 'bg-violet-600 text-white',
      },
      {
        id: 'achievements',
        value: t('experiencePage.achievementsValue'),
        label: t('experiencePage.keyAchievementsMetric'),
        icon: LayoutGrid,
        badgeBg: 'bg-orange-500 text-white',
      },
      {
        id: 'milestones',
        value: t('experiencePage.milestonesValue'),
        label: t('experiencePage.milestonesReached'),
        icon: MapPin,
        badgeBg: 'bg-rose-500 text-white',
      },
    ],
    [t],
  );
  return (
    <div className="h-full w-full overflow-y-auto rounded-sm bg-background p-4 md:p-6 space-y-6 text-foreground shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] font-inter select-none">
      <div className="flex items-center justify-between lg:hidden">
        <span className="font-inter text-[10px] font-bold uppercase text-[var(--color-text-primary)]">
          {t('experiencePage.title')}
        </span>
        <button
          type="button"
          onClick={() => setIsExperienceSidebarOpen(true)}
          aria-label="Open experience navigation"
          className="flex h-7 shrink-0 items-center gap-1.5 rounded-xs bg-background px-2 text-[9px] font-semibold text-[var(--color-text-primary)] shadow-gray-300 transition-colors hover:bg-muted dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
        >
          <LayoutGrid className="size-3.5" strokeWidth={1.8} />
          <span>Experience</span>
        </button>
      </div>

      <AnimatePresence>
        {isExperienceSidebarOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExperienceSidebarOpen(false)}
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
                  Experience
                </span>
                <button
                  type="button"
                  onClick={() => setIsExperienceSidebarOpen(false)}
                  aria-label="Close experience navigation"
                  className="flex size-7 items-center justify-center text-foreground"
                >
                  <X className="size-3.5" strokeWidth={2} />
                </button>
              </div>
              <div className="[&_aside]:!h-auto [&_aside]:!w-full [&_aside]:!rounded-[4px] [&_aside]:!p-0 [&_aside]:!shadow-none">
                <ExperienceSecondarySidebar />
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
            {t('experiencePage.title')}
          </h1>
          <p className="text-xs font-semibold text-primary">{t('experiencePage.yourJourney')}</p>
        </div>

        {/* Top Right Quote Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 rounded-xs bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] max-w-xs shrink-0 border border-border/50"
        >
          <div className="flex size-7 shrink-0 items-center justify-center rounded-xs bg-primary text-primary-foreground">
            <Quote className="size-3.5 fill-current" />
          </div>
          <p className="text-[11px] font-medium leading-tight text-muted-foreground">
            Every milestone is a step towards building impact through code.
          </p>
        </motion.div>
      </header>

      {/* Section 1: Career Milestones */}
      <section className="rounded-sm bg-background p-4 md:p-5 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] space-y-4 border border-border/40">
        <h2 className="text-sm font-bold text-foreground">{t('experiencePage.milestones')}</h2>

        <div className="flex flex-nowrap items-center justify-between overflow-x-auto py-2 px-1 scrollbar-none gap-2 sm:gap-4">
          {careerMilestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isLast = index === careerMilestones.length - 1;

            return (
              <React.Fragment key={milestone.id}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="flex flex-col items-center text-center shrink-0 group cursor-pointer"
                >
                  <div className="flex size-13 sm:size-15 items-center justify-center rounded-full bg-sky-50 text-sky-600 dark:bg-slate-900 dark:text-sky-400 border border-sky-100 dark:border-slate-800 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] group-hover:scale-105 group-hover:border-sky-500 transition-transform">
                    <Icon className="size-5 sm:size-6" />
                  </div>
                  <h3 className="mt-2.5 text-xs font-bold text-foreground max-w-[100px] leading-tight">
                    {milestone.title}
                  </h3>
                  <span className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                    {milestone.year}
                  </span>
                </motion.div>

                {!isLast && (
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground/50 self-center" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* Section 2: Experience Overview */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-foreground">Experience Overview</h2>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
          {overviewCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.06, duration: 0.4 }}
                className={`flex flex-col justify-between rounded-sm bg-background p-4 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] border-t-4 transition-all hover:shadow-md border-x border-b border-border/40 ${card.accentClass}`}
              >
                <div>
                  <div
                    className={`flex size-8 items-center justify-center rounded-xs ${card.iconBgClass}`}
                  >
                    <Icon className="size-4" strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-foreground">{card.title}</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-border/40 pt-2.5">
                  <Link
                    href={card.href}
                    className={`flex items-center justify-between text-[11px] font-bold ${card.textColorClass} transition-colors group`}
                  >
                    <span>{card.badge}</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Experience Snapshot & Registered Modules */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Column: Experience Snapshot */}
        <div className="lg:col-span-7 space-y-3">
          <h2 className="text-sm font-bold text-foreground">Experience Snapshot</h2>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {metricSnapshots.map((snapshot, index) => {
              const Icon = snapshot.icon;

              return (
                <motion.div
                  key={snapshot.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + index * 0.05, duration: 0.35 }}
                  className="flex flex-col justify-between rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] min-h-[130px] border border-border/40"
                >
                  <div
                    className={`flex size-7 items-center justify-center rounded-xs ${snapshot.badgeBg}`}
                  >
                    <Icon className="size-3.5" strokeWidth={1.8} />
                  </div>

                  <div className="mt-3">
                    <span className="text-xl sm:text-2xl font-black leading-none tracking-tight text-foreground">
                      {snapshot.value}
                    </span>
                    <p className="mt-1 text-[10px] font-medium leading-tight text-muted-foreground">
                      {snapshot.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Registered Modules */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground">Registered Modules</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="rounded-sm bg-background p-4 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] border border-border/40 h-[calc(100%-1.75rem)] flex flex-col justify-between"
          >
            <ol className="space-y-2.5">
              {REGISTERED_MODULES.map((moduleText, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-[11px] font-medium leading-snug text-foreground"
                >
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-muted-foreground">{moduleText}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>

      {/* Bottom Tip Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex items-center gap-3 rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] border border-border/40 text-[11px] text-foreground"
      >
        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 dark:bg-slate-900 dark:text-sky-400 border border-sky-100 dark:border-slate-800">
          <Zap className="size-3.5 fill-current" />
        </div>
        <p className="leading-snug">
          <span className="font-bold text-primary">Tip</span> Select a section from the sidebar to
          explore more details about my experience.
        </p>
      </motion.div>
    </div>
  );
}
