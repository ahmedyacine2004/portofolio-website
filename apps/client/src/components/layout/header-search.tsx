'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Code2,
  CornerDownLeft,
  FileText,
  Folder,
  Infinity as InfinityIcon,
  Search,
  Tag,
  Terminal,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

import { useTerminalStore } from '@/stores/terminal.store';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  typeLabel: string;
  shortcut: string;
  category: 'Top Results' | 'Commands';
  tab: string; // Belongs to which tab ('Projects', 'Files', 'Code', 'Folders', 'Tags', 'Commands')
  action: (router: ReturnType<typeof useRouter>, openTerminal: () => void) => void;
}

// ─── Filter Tabs ──────────────────────────────────────────────────────────────

const TABS = ['All', 'Projects', 'Files', 'Code', 'Folders', 'Tags', 'Commands'];

// ─── Search Items Data & Actions ──────────────────────────────────────────────

const ALL_SEARCH_ITEMS: SearchResultItem[] = [
  {
    id: 'r1',
    title: 'CONSULIFY - AI Powered Consultant Matching Platform',
    subtitle: 'Featured Project · React, Next.js, Node.js, MongoDB',
    Icon: InfinityIcon,
    typeLabel: 'Project',
    shortcut: '⌘1',
    category: 'Top Results',
    tab: 'Projects',
    action: (router) => router.push('/projects'),
  },
  {
    id: 'r2',
    title: 'CONSULIFY Case Study',
    subtitle: 'projects/consulify/case-study.md',
    Icon: FileText,
    typeLabel: 'File',
    shortcut: '⌘2',
    category: 'Top Results',
    tab: 'Files',
    action: (router) => router.push('/projects'),
  },
  {
    id: 'r3',
    title: 'consulify-service.ts',
    subtitle: 'projects/consulify/src/services/',
    Icon: Code2,
    typeLabel: 'Code',
    shortcut: '⌘3',
    category: 'Top Results',
    tab: 'Code',
    action: (router) => router.push('/projects'),
  },
  {
    id: 'r4',
    title: 'consulify',
    subtitle: 'projects/consulify/',
    Icon: Folder,
    typeLabel: 'Folder',
    shortcut: '⌘4',
    category: 'Top Results',
    tab: 'Folders',
    action: (router) => router.push('/projects'),
  },
  {
    id: 'r5',
    title: 'Consulify',
    subtitle: '#projects · #consultant-matching · #ai',
    Icon: Tag,
    typeLabel: 'Tag',
    shortcut: '⌘5',
    category: 'Top Results',
    tab: 'Tags',
    action: (router) => router.push('/projects'),
  },
  {
    id: 'c1',
    title: 'Go to Project: CONSULIFY',
    subtitle: 'Navigate to project page',
    Icon: Terminal,
    typeLabel: 'File',
    shortcut: '⌘G',
    category: 'Commands',
    tab: 'Commands',
    action: (router) => router.push('/projects'),
  },
  {
    id: 'c2',
    title: 'Search in CONSULIFY',
    subtitle: 'Full-text search in projects',
    Icon: Terminal,
    typeLabel: 'Code',
    shortcut: '⌘F',
    category: 'Commands',
    tab: 'Commands',
    action: (router) => router.push('/projects'),
  },
  {
    id: 'c3',
    title: 'Open in Terminal',
    subtitle: 'Toggle interactive terminal window',
    Icon: Terminal,
    typeLabel: 'Folder',
    shortcut: '⌘T',
    category: 'Commands',
    tab: 'Commands',
    action: (_, openTerminal) => openTerminal(),
  },
  {
    id: 'c4',
    title: 'Deploy CONSULIFY',
    subtitle: 'Trigger deployment pipeline',
    Icon: Terminal,
    typeLabel: 'Tag',
    shortcut: '⌘D',
    category: 'Commands',
    tab: 'Commands',
    action: (router) => router.push('/services'),
  },
];

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
      // Tab filter
      if (activeTab !== 'All' && item.tab !== activeTab) {
        return false;
      }
      // Query filter
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.typeLabel.toLowerCase().includes(q)
      );
    });
  }, [activeTab, query]);

  // Group filtered items into Top Results vs Commands
  const topResults = useMemo(
    () => filteredItems.filter((i) => i.category === 'Top Results'),
    [filteredItems],
  );

  const commandResults = useMemo(
    () => filteredItems.filter((i) => i.category === 'Commands'),
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
