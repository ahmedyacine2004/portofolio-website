'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import type { LucideIcon } from 'lucide-react';
import {
  Code2,
  FileText,
  Folder,
  Infinity as InfinityIcon,
  LayoutDashboard,
  Search,
  Tag,
  Terminal,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { ABOUT_FILES_REGISTRY } from '@/lib/utils/about-files';
import { useTerminalStore } from '@/stores/terminal.store';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  typeLabel: string;
  shortcut: string;
  category: 'Top Results' | 'Commands' | 'Searchable';
  tab: string; // Belongs to which tab ('Projects', 'Files', 'Code', 'Folders', 'Tags', 'Commands')
  action: (router: ReturnType<typeof useRouter>, openTerminal: () => void) => void;
}

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .replace(/\.(jsx|tsx|ts|js|json|yaml|yml|toml|md|csv|xml|pdf|docx|png|svg|env)$/gi, '')
    .replace(/[^a-z0-9\s-_./]/g, ' ')
    .replace(/[._/-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchesSearchQuery(item: SearchResultItem, rawQuery: string): boolean {
  if (!rawQuery.trim()) return true;

  const q = rawQuery.trim().toLowerCase();
  const queryVariants = new Set<string>([
    q,
    normalizeSearchText(q),
    q.replace(/\.(jsx|tsx)/gi, '.ts'),
    q.replace(/\.(jsx|tsx)/gi, '.js'),
    q.replace(/\.(ts|js)/gi, '.jsx'),
    q.replace(/\.(ts|js)/gi, '.tsx'),
  ]);

  const haystacks = [
    item.title,
    item.subtitle,
    item.typeLabel,
    normalizeSearchText(item.title),
    normalizeSearchText(item.subtitle),
    item.title.replace(/\.[A-Za-z0-9]+$/g, ''),
    item.subtitle.replace(/^\//, '').replace(/\//g, ' '),
  ];

  for (const variant of queryVariants) {
    if (!variant) continue;
    for (const haystack of haystacks) {
      const normalizedHaystack = normalizeSearchText(haystack);
      if (
        haystack.toLowerCase().includes(variant) ||
        normalizedHaystack.includes(variant) ||
        normalizedHaystack.includes(normalizeSearchText(variant))
      ) {
        return true;
      }
    }
  }

  return false;
}

// ─── Filter Tabs ──────────────────────────────────────────────────────────────

const TABS = ['All', 'Projects', 'Files', 'Code', 'Folders', 'Tags', 'Commands'];

// ─── Search Items Data & Actions ──────────────────────────────────────────────

const ABOUT_SEARCH_ITEMS: SearchResultItem[] = ABOUT_FILES_REGISTRY.map((file, index) => ({
  id: `about-${file.id}`,
  title: file.label,
  subtitle: file.href,
  Icon:
    file.href.includes('.json') || file.href.includes('.yaml') || file.href.includes('.toml')
      ? FileText
      : file.href.includes('.png') ||
          file.href.includes('.pdf') ||
          file.href.includes('.docx') ||
          file.href.includes('.xml') ||
          file.href.includes('.csv')
        ? FileText
        : Folder,
  typeLabel: file.label.includes('.') ? 'File' : 'Page',
  shortcut: `⌘${index + 1}`,
  category: 'Searchable',
  tab: file.label.includes('.') ? 'Files' : 'Folders',
  action: (router) => router.push(file.href),
}));

const SECONDARY_PAGE_ITEMS: SearchResultItem[] = [
  {
    id: 'page-dashboard',
    title: 'Dashboard',
    subtitle: '/dashboard',
    Icon: LayoutDashboard,
    typeLabel: 'System',
    shortcut: '⌘0',
    category: 'Searchable',
    tab: 'Commands',
    action: (router) => router.push('/dashboard'),
  },
  {
    id: 'page-projects',
    title: 'Projects',
    subtitle: '/projects',
    Icon: InfinityIcon,
    typeLabel: 'Project',
    shortcut: '⌘1',
    category: 'Searchable',
    tab: 'Projects',
    action: (router) => router.push('/projects'),
  },
  {
    id: 'page-skills',
    title: 'Skills',
    subtitle: '/skills',
    Icon: FileText,
    typeLabel: 'Skill',
    shortcut: '⌘2',
    category: 'Searchable',
    tab: 'Files',
    action: (router) => router.push('/skills'),
  },
  {
    id: 'page-experience',
    title: 'Experience',
    subtitle: '/experience',
    Icon: Code2,
    typeLabel: 'Career',
    shortcut: '⌘3',
    category: 'Searchable',
    tab: 'Code',
    action: (router) => router.push('/experience'),
  },
  {
    id: 'page-about',
    title: 'About',
    subtitle: '/about',
    Icon: Folder,
    typeLabel: 'Profile',
    shortcut: '⌘4',
    category: 'Searchable',
    tab: 'Folders',
    action: (router) => router.push('/about'),
  },
  {
    id: 'page-ai-assistant',
    title: 'AI Assistant',
    subtitle: '/ai-assistant',
    Icon: Tag,
    typeLabel: 'Tool',
    shortcut: '⌘5',
    category: 'Searchable',
    tab: 'Tags',
    action: (router) => router.push('/ai-assistant'),
  },
  {
    id: 'page-contact',
    title: 'Contact',
    subtitle: '/contact',
    Icon: Tag,
    typeLabel: 'Connect',
    shortcut: '⌘6',
    category: 'Searchable',
    tab: 'Commands',
    action: (router) => router.push('/contact'),
  },
  {
    id: 'page-certification',
    title: 'Certification',
    subtitle: '/certification',
    Icon: FileText,
    typeLabel: 'Badge',
    shortcut: '⌘7',
    category: 'Searchable',
    tab: 'Files',
    action: (router) => router.push('/certification'),
  },
  {
    id: 'page-settings',
    title: 'Open Settings',
    subtitle: '/settings',
    Icon: Terminal,
    typeLabel: 'System',
    shortcut: '⌘S',
    category: 'Commands',
    tab: 'Commands',
    action: (router) => router.push('/settings'),
  },
  {
    id: 'page-terminal',
    title: 'Open Terminal',
    subtitle: 'Toggle terminal',
    Icon: Terminal,
    typeLabel: 'Command',
    shortcut: '⌘T',
    category: 'Commands',
    tab: 'Commands',
    action: (_, openTerminal) => openTerminal(),
  },
  {
    id: 'page-home',
    title: 'Go to Home',
    subtitle: '/',
    Icon: Terminal,
    typeLabel: 'Home',
    shortcut: '⌘H',
    category: 'Commands',
    tab: 'Commands',
    action: (router) => router.push('/'),
  },
  {
    id: 'page-experience-education',
    title: 'Education Timeline',
    subtitle: '/experience/education',
    Icon: FileText,
    typeLabel: 'Page',
    shortcut: '⌘E',
    category: 'Searchable',
    tab: 'Files',
    action: (router) => router.push('/experience/education'),
  },
  {
    id: 'page-experience-internships',
    title: 'Internships',
    subtitle: '/experience/internships',
    Icon: FileText,
    typeLabel: 'Page',
    shortcut: '⌘I',
    category: 'Searchable',
    tab: 'Files',
    action: (router) => router.push('/experience/internships'),
  },
  {
    id: 'page-skills-frontend',
    title: 'Frontend Skills',
    subtitle: '/skills/frontend',
    Icon: Code2,
    typeLabel: 'Page',
    shortcut: '⌘F',
    category: 'Searchable',
    tab: 'Files',
    action: (router) => router.push('/skills/frontend'),
  },
  {
    id: 'page-skills-backend',
    title: 'Backend Skills',
    subtitle: '/skills/backend',
    Icon: Code2,
    typeLabel: 'Page',
    shortcut: '⌘B',
    category: 'Searchable',
    tab: 'Files',
    action: (router) => router.push('/skills/backend'),
  },
];

const ALL_SEARCH_ITEMS: SearchResultItem[] = [...ABOUT_SEARCH_ITEMS, ...SECONDARY_PAGE_ITEMS];

// ─── Result Row Component ─────────────────────────────────────────────────────

function ResultRow({
  item,
  isSelected,
  onSelect,
  onHover,
}: {
  item: SearchResultItem;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
}) {
  const { Icon } = item;
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      className={`flex w-full items-center gap-2.5 rounded-[6px] px-2.5 py-2 text-left transition-colors ${
        isSelected ? 'bg-accent text-foreground' : 'hover:bg-accent/60'
      }`}
    >
      {/* Icon square */}
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-indigo-50 dark:bg-indigo-950/80">
        <Icon className="size-[16px] text-indigo-500 dark:text-indigo-400" strokeWidth={1.5} />
      </span>

      {/* Text */}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[11px] font-semibold leading-snug text-foreground">
          {item.title}
        </span>
        <span className="block truncate text-[9.5px] leading-snug text-foreground-secondary">
          {item.subtitle}
        </span>
      </span>

      {/* Right: type label + shortcut chip */}
      <span className="flex shrink-0 items-center gap-1.5">
        <span className="text-[9.5px] text-foreground-disabled">{item.typeLabel}</span>
        <span className="flex items-center justify-center rounded-[6px] border border-border bg-card px-1.5 py-0.5 text-[8.5px] font-medium text-foreground-secondary">
          {item.shortcut}
        </span>
      </span>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function HeaderSearch() {
  const router = useRouter();
  const openTerminal = useTerminalStore((s) => s.open);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Filter items based on activeTab and query
  const filteredItems = useMemo(() => {
    return ALL_SEARCH_ITEMS.filter((item) => {
      if (activeTab !== 'All' && item.tab !== activeTab) {
        return false;
      }

      return matchesSearchQuery(item, query);
    });
  }, [activeTab, query]);

  // Group filtered items into Top Results, Commands, and Searchable items
  const topResults = useMemo(
    () => filteredItems.filter((i) => i.category === 'Top Results'),
    [filteredItems],
  );

  const commandResults = useMemo(
    () => filteredItems.filter((i) => i.category === 'Commands'),
    [filteredItems],
  );

  const searchableResults = useMemo(
    () => filteredItems.filter((i) => i.category === 'Searchable'),
    [filteredItems],
  );

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Horizontal wheel scroll on tab bar
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [open]);

  // Execute selected item
  const handleSelectItem = (item: SearchResultItem) => {
    item.action(router, openTerminal);
    setOpen(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      setOpen(false);
      (e.target as HTMLInputElement).blur();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredItems.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredItems.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems.length > 0 && filteredItems[selectedIndex]) {
        handleSelectItem(filteredItems[selectedIndex]);
      }
      return;
    }
  };

  return (
    <div ref={containerRef} className="relative w-[300px]">
      {/* ── Search bar ── */}
      <div
        className={`flex h-8 w-full items-center rounded-sm px-2.5 shadow-sm transition-all duration-200 ${
          open ? 'bg-card ring-1 ring-border' : 'bg-card hover:ring-1 hover:ring-border/50'
        }`}
      >
        <input
          id="header-search-input"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search projects, skills or commands ..."
          className="min-w-0 flex-1 bg-transparent text-[10px] text-foreground outline-none placeholder:text-foreground-disabled"
          aria-label="Search"
          aria-expanded={open}
          aria-haspopup="listbox"
          autoComplete="off"
        />
        <Search className="size-[15px] shrink-0 text-foreground-secondary" strokeWidth={2} />
      </div>

      {/* ── Dropdown — exact width of search bar (300px) ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="header-search-dropdown"
            role="listbox"
            aria-label="Search results"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-[calc(100%+6px)] z-50 w-full overflow-hidden rounded-[8px] border border-border bg-background shadow-xl shadow-black/10 dark:shadow-black/40"
          >
            {/* ── Single scrollable tab row — scrollbar always hidden ── */}
            <div className="border-b border-border px-2 pt-2">
              <div
                ref={tabsRef}
                className="flex items-center gap-0.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`shrink-0 rounded-[6px] px-2 py-[3px] text-[10px] font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-accent text-foreground'
                        : 'text-foreground-secondary hover:text-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Results ── */}
            <div className="max-h-[360px] overflow-y-auto px-1.5 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-[10px] text-foreground-disabled">
                  No results found for &quot;{query}&quot;
                </div>
              ) : (
                <>
                  {/* Top Results */}
                  {topResults.length > 0 && (
                    <div className="mb-2">
                      <p className="mb-1 px-1.5 text-[9.5px] font-semibold text-foreground">
                        Top Results
                      </p>
                      <div className="space-y-0.5">
                        {topResults.map((item) => {
                          const globalIdx = filteredItems.findIndex((i) => i.id === item.id);
                          return (
                            <ResultRow
                              key={item.id}
                              item={item}
                              isSelected={globalIdx === selectedIndex}
                              onSelect={() => handleSelectItem(item)}
                              onHover={() => setSelectedIndex(globalIdx)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {topResults.length > 0 && commandResults.length > 0 && (
                    <div className="my-1.5 border-t border-border" />
                  )}

                  {/* Commands */}
                  {commandResults.length > 0 && (
                    <div>
                      <p className="mb-1 px-1.5 text-[9.5px] font-semibold text-foreground">
                        Commands
                      </p>
                      <div className="space-y-0.5">
                        {commandResults.map((item) => {
                          const globalIdx = filteredItems.findIndex((i) => i.id === item.id);
                          return (
                            <ResultRow
                              key={item.id}
                              item={item}
                              isSelected={globalIdx === selectedIndex}
                              onSelect={() => handleSelectItem(item)}
                              onHover={() => setSelectedIndex(globalIdx)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {(commandResults.length > 0 || topResults.length > 0) &&
                    searchableResults.length > 0 && (
                      <div className="my-1.5 border-t border-border" />
                    )}

                  {/* Searchable */}
                  {searchableResults.length > 0 && (
                    <div>
                      <p className="mb-1 px-1.5 text-[9.5px] font-semibold text-foreground">
                        Searchable
                      </p>
                      <div className="space-y-0.5">
                        {searchableResults.map((item) => {
                          const globalIdx = filteredItems.findIndex((i) => i.id === item.id);
                          return (
                            <ResultRow
                              key={item.id}
                              item={item}
                              isSelected={globalIdx === selectedIndex}
                              onSelect={() => handleSelectItem(item)}
                              onHover={() => setSelectedIndex(globalIdx)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── Footer — Compact & Non-collapsing for 300px ── */}
            <div className="flex items-center justify-between border-t border-border px-2.5 py-1.5 text-[8.5px] text-foreground-disabled">
              <div className="flex shrink-0 items-center gap-1.5">
                <span>↑↓ navigate</span>
                <span>·</span>
                <span>↵ select</span>
                <span>·</span>
                <span>ESC exit</span>
              </div>
              <span className="truncate pl-1 text-[8px] opacity-75">Search title / command</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
