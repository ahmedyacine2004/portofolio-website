'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, ChevronDown, ChevronRight, Clock, LucideIcon, MapPin, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
}

interface YearGroup {
  year: string;
  items: ActivityItem[];
}

interface ActionItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const ACTIVITY_DATA: YearGroup[] = [
  {
    year: '2026',
    items: [
      {
        id: 'consultify',
        title: 'CONSULTIFY',
        subtitle: 'Status: Finalized',
        detail: 'It was a great experience even though it failed',
      },
    ],
  },
  {
    year: '2025',
    items: [
      {
        id: 'bachelor',
        title: "Bachelor's Degree",
        subtitle: "M'Hamed Bougara University",
        detail: 'Specialty: Web development and computer Graphics',
      },
      {
        id: 'somiphos',
        title: 'SOMIPHOS Internship',
        subtitle: 'Integration Internship',
        detail: 'Duration: 2 months',
      },
    ],
  },
  {
    year: '2024',
    items: [
      {
        id: 'algerie-telecom',
        title: 'Algerie Telecom Internship',
        subtitle: 'Early level Internship',
        detail: 'Duration: 1 month',
      },
    ],
  },
];

const ACTIONS: ActionItem[] = [
  { name: 'Education Timeline', href: '/experience/education', icon: Clock },
  { name: 'Internships', href: '/experience/internships', icon: Briefcase },
  { name: 'Achievements', href: '/experience/achievements', icon: MapPin },
];

export function ExperienceSecondarySidebar() {
  const [openYears, setOpenYears] = useState<string[]>(['2026', '2025', '2024']);
  const pathname = usePathname();

  const toggleYear = (year: string) => {
    setOpenYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
    );
  };

  return (
    <aside className="flex h-full w-[180px] select-none flex-col gap-1 overflow-y-auto rounded-[8px] bg-background px-2 py-3 text-[var(--color-text-primary)] shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] font-inter">
      {/* Clickable Sidebar Header Title */}
      <Link href="/experience" className="group mb-0.5 inline-block">
        <h2 className="px-0.5 font-inter text-[12px] font-semibold uppercase leading-none text-foreground transition-opacity group-hover:opacity-80">
          Activity History
        </h2>
      </Link>

      {/* Accordion Categories Container */}
      <div className="flex flex-col gap-1 rounded-[4px] py-0.5">
        {ACTIVITY_DATA.map((group) => {
          const isOpen = openYears.includes(group.year);

          return (
            <div
              key={group.year}
              className="rounded-[4px] bg-[var(--color-bg-secondary)] shadow-xs transition-shadow"
            >
              {/* Category Header Row */}
              <button
                onClick={() => toggleYear(group.year)}
                className="flex w-full items-center justify-between rounded-[4px] px-2 py-1 transition-colors hover:bg-[var(--color-bg-tertiary)]"
                aria-label={`Toggle ${group.year}`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <ChevronDown
                    className={`size-3 shrink-0 text-[var(--color-text-tertiary)] transition-transform duration-200 ${
                      isOpen ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                  <span className="truncate text-[9px] font-semibold text-[var(--color-text-primary)]">
                    {group.year}
                  </span>
                </div>
              </button>

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
                    <div className="space-y-1 p-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.id}
                          href={`/experience/${item.id}`}
                          className="group/item flex items-start gap-1.5 rounded-[3px] bg-[var(--color-bg-secondary)]/60 p-1.5 transition-colors hover:bg-[var(--color-bg-tertiary)]"
                        >
                          {/* Green Indicator Dot */}
                          <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-emerald-500 group-hover/item:scale-110 transition-transform" />

                          {/* Details */}
                          <div className="min-w-0 space-y-0.5 text-[8px]">
                            <p className="font-semibold leading-tight text-[var(--color-text-primary)] truncate group-hover/item:text-blue-500 transition-colors">
                              {item.title}
                            </p>
                            <p className="font-medium leading-tight text-[var(--color-text-secondary)] text-[7.5px]">
                              {item.subtitle}
                            </p>
                            <p className="leading-tight text-[var(--color-text-tertiary)] text-[7px] break-words">
                              {item.detail}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom Actions Card */}
      <div className="mt-auto flex flex-col rounded-[6px] border border-border/40 bg-[var(--color-bg-secondary)] overflow-hidden shadow-xs">
        {/* Actions Banner Header */}
        <div className="flex items-center gap-1 bg-[var(--color-bg-tertiary)] px-2 py-1 text-[9px] font-bold text-[var(--color-text-primary)] border-b border-border/30">
          <Zap className="size-2.5 text-blue-500 fill-blue-500 shrink-0" />
          <span>Actions</span>
        </div>

        {/* Actions List */}
        <div className="divide-y divide-border/20">
          {ACTIONS.map((action) => {
            const Icon = action.icon;
            const isActive = pathname === action.href;

            return (
              <Link
                key={action.name}
                href={action.href}
                className={`flex items-center justify-between px-2 py-1.5 text-[8px] transition-colors border-l-2 ${
                  isActive
                    ? 'border-blue-500 bg-blue-500/10 font-bold text-blue-600 dark:text-blue-400'
                    : 'border-transparent font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]/50'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <Icon
                    className={`size-2.5 shrink-0 ${
                      isActive ? 'text-blue-500' : 'text-[var(--color-text-tertiary)]'
                    }`}
                  />
                  <span className="truncate">{action.name}</span>
                </div>
                <ChevronRight
                  className={`size-2.5 shrink-0 ${
                    isActive ? 'text-blue-500' : 'text-[var(--color-text-tertiary)]'
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
