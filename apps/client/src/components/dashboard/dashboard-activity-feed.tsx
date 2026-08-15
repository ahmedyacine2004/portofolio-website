'use client';

import type { ActivityFilter, DashboardActivityItem } from '@/types/dashboard.types';
import type { LucideIcon } from 'lucide-react';
import {
  ChevronRight,
  Code2,
  FolderKanban,
  GraduationCap,
  Milestone,
  MonitorCheck,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';

interface DashboardActivityFeedProps {
  items: DashboardActivityItem[];
  isLoading: boolean;
  filter: ActivityFilter;
  onFilterChange: (f: ActivityFilter) => void;
}

const CATEGORY_ICON: Record<string, LucideIcon> = {
  project: FolderKanban,
  code: Code2,
  system: MonitorCheck,
  milestone: Milestone,
  certification: GraduationCap,
};

const STATUS_LABEL: Record<string, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  deployed: 'Deployed',
  verified: 'Verified',
};

const STATUS_COLOR: Record<string, string> = {
  completed: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
  'in-progress': 'text-amber-600 dark:text-amber-400 bg-amber-500/10',
  deployed: 'text-violet-600 dark:text-violet-400 bg-violet-500/10',
  verified: 'text-sky-600 dark:text-sky-400 bg-sky-500/10',
};

const FILTERS: { key: ActivityFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'project', label: 'Projects' },
  { key: 'code', label: 'Code' },
  { key: 'system', label: 'System' },
  { key: 'milestone', label: 'Milestones' },
];

function formatRelativeTime(timestamp: string) {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const diffMinutes = Math.round(diffMs / 60000);

  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

export function DashboardActivityFeed({
  items,
  isLoading,
  filter,
  onFilterChange,
}: DashboardActivityFeedProps) {
  const filtered = filter === 'all' ? items : items.filter((i) => i.category === filter);

  return (
    <div className="flex min-h-0 flex-col rounded-sm bg-background shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <h2 className="font-inter text-[11px] font-bold leading-none tracking-[-0.02em]">
          Recent Activity
        </h2>
        {/* Filter pills */}
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => onFilterChange(f.key)}
              className={[
                'rounded-xs px-1.5 py-0.5 text-[7px] font-medium transition-colors duration-150',
                filter === f.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col gap-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-2 border-b border-border/40 px-3 py-2.5 animate-pulse last:border-0"
              >
                <div className="mt-0.5 size-6 shrink-0 rounded-xs bg-muted" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2 w-32 rounded bg-muted" />
                  <div className="h-1.5 w-48 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-4">
            <p className="text-[8px] text-muted-foreground">
              No recent activity matching the selected filter.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => {
              const Icon = CATEGORY_ICON[item.category] ?? Code2;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  className="group flex items-start gap-2 border-b border-border/40 px-3 py-2 last:border-0 hover:bg-muted/40 transition-colors duration-150"
                >
                  <div
                    className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-xs text-white ${item.badgeColor ?? 'bg-primary'}`}
                  >
                    <Icon className="size-3" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-1">
                      <p className="font-inter text-[8px] font-semibold leading-tight">
                        {item.title}
                      </p>
                      <span
                        className={`shrink-0 rounded-xs px-1 py-0.5 text-[6px] font-semibold ${STATUS_COLOR[item.status]}`}
                      >
                        {STATUS_LABEL[item.status]}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-[6.5px] leading-tight text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-[6px] text-muted-foreground/60">
                        {formatRelativeTime(item.timestamp)}
                      </span>
                      {item.link && (
                        <Link
                          href={item.link}
                          className="flex items-center gap-0.5 text-[6px] text-primary opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          View <ChevronRight className="size-2" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
