'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Code2,
  Compass,
  CornerDownLeft,
  FileText,
  Folder,
  Infinity as InfinityIcon,
  Moon,
  Plus,
  Search,
  Sparkles,
  SquareTerminal,
  Sun,
  Tag,
  Terminal,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { useCommandPaletteStore } from '@/stores/command-palette.store';
import { useTerminalStore } from '@/stores/terminal.store';
import { useTheme } from '@/hooks/use-theme';

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Terminal Commands' | 'Quick Actions' | 'System';
  Icon: LucideIcon;
  shortcut?: string;
  badge?: string;
  action: (ctx: CommandContext) => void;
}

interface CommandContext {
  router: ReturnType<typeof useRouter>;
  openTerminal: () => void;
  toggleTheme: () => void;
  theme: string;
  runCliCommand: (cmd: string) => void;
  close: () => void;
}

interface TerminalOutputLine {
  id: number;
  type: 'command' | 'output' | 'success' | 'info' | 'error' | 'section' | 'item' | 'blank';
  content: string;
}

/*
|--------------------------------------------------------------------------
| Mock CLI Command Outputs (Shared with Terminal Modal)
|--------------------------------------------------------------------------
*/

const CLI_COMMAND_OUTPUTS: Record<string, TerminalOutputLine[]> = {
  dev: [
    { id: 1, type: 'output', content: 'Starting Portfolio Workspace...' },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'success', content: '✔ Initializing VS Code Environment' },
    { id: 4, type: 'success', content: '✔ Loading Components' },
    { id: 5, type: 'success', content: '✔ Connecting AI Assistant' },
    { id: 6, type: 'success', content: '✔ Workspace Ready' },
    { id: 7, type: 'blank', content: '' },
    { id: 8, type: 'info', content: 'Opening Home Page...' },
  ],
  start: [
    { id: 1, type: 'output', content: 'Portfolio Workspace v3.0' },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'info', content: 'Welcome back.' },
    { id: 4, type: 'blank', content: '' },
    { id: 5, type: 'output', content: 'Type "portfolio help" to explore available commands.' },
  ],
  about: [
    { id: 1, type: 'info', content: 'Opening About Workspace...' },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'success', content: '✓ Developer Profile' },
    { id: 4, type: 'success', content: '✓ Metadata' },
    { id: 5, type: 'success', content: '✓ Social Links' },
    { id: 6, type: 'blank', content: '' },
    { id: 7, type: 'output', content: 'Ready.' },
  ],
  projects: [
    { id: 1, type: 'info', content: 'Opening Projects Workspace...' },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'output', content: 'Projects Found: 18' },
    { id: 4, type: 'section', content: 'Featured:' },
    { id: 5, type: 'item', content: '• CONSULTIFY – AI Powered Consultant Platform' },
    { id: 6, type: 'item', content: '• Portfolio Workspace v3.0' },
    { id: 7, type: 'item', content: '• Neobank Mobile App' },
    { id: 8, type: 'item', content: '• Lumina Studio' },
  ],
  skills: [
    { id: 1, type: 'info', content: 'Opening Skills Workspace...' },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'section', content: 'Indexed Tech Stack:' },
    { id: 4, type: 'item', content: 'Frontend: React, Next.js, TypeScript, Tailwind CSS, Motion' },
    { id: 5, type: 'item', content: 'Backend: NestJS, Node.js, Express, REST APIs' },
    { id: 6, type: 'item', content: 'Databases: MongoDB, Mongoose, PostgreSQL, Redis' },
    { id: 7, type: 'item', content: 'DevOps: Docker, Git, CI/CD, Vercel' },
  ],
  experience: [
    { id: 1, type: 'info', content: 'Opening Experience Workspace...' },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'item', content: 'Full-Stack Software Engineer (Present)' },
    { id: 4, type: 'item', content: 'Frontend Engineer Intern' },
    { id: 5, type: 'item', content: 'Open Source Contributor' },
  ],
  help: [
    { id: 1, type: 'output', content: 'Portfolio CLI v3.0 — Available Commands:' },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'item', content: 'dev              Start dev environment' },
    { id: 4, type: 'item', content: 'projects         Explore featured projects' },
    { id: 5, type: 'item', content: 'skills           Display full tech stack' },
    { id: 6, type: 'item', content: 'experience       View career timeline' },
    { id: 7, type: 'item', content: 'about            Open developer profile' },
    { id: 8, type: 'item', content: 'contact          Open communication channels' },
    { id: 9, type: 'item', content: 'terminal         Toggle bottom terminal modal' },
    { id: 10, type: 'item', content: 'clear            Clear output log' },
  ],
};

/*
|--------------------------------------------------------------------------
| Command Items List
|--------------------------------------------------------------------------
*/

const COMMAND_ITEMS: CommandItem[] = [
  // Navigation
  {
    id: 'nav-home',
    title: 'Go to Home / Portfolio',
    subtitle: 'Navigate to main portfolio landing workspace',
    category: 'Navigation',
    Icon: Compass,
    shortcut: '↵',
    badge: 'Page',
    action: ({ router, close }) => {
      router.push('/');
      close();
    },
  },
  {
    id: 'nav-projects',
    title: 'Go to Projects',
    subtitle: 'Browse all full-stack applications & case studies',
    category: 'Navigation',
    Icon: Folder,
    shortcut: '⌘P',
    badge: 'Page',
    action: ({ router, close }) => {
      router.push('/projects');
      close();
    },
  },
  {
    id: 'nav-services',
    title: 'Go to Services',
    subtitle: 'Explore services, architecture & offerings',
    category: 'Navigation',
    Icon: InfinityIcon,
    shortcut: '⌘S',
    badge: 'Page',
    action: ({ router, close }) => {
      router.push('/services');
      close();
    },
  },
  {
    id: 'nav-contact',
    title: 'Go to Contact',
    subtitle: 'Get in touch or start a new project',
    category: 'Navigation',
    Icon: FileText,
    shortcut: '⌘C',
    badge: 'Page',
    action: ({ router, close }) => {
      router.push('/contact');
      close();
    },
  },

  // Terminal Commands
  {
    id: 'cmd-dev',
    title: 'dev',
    subtitle: 'Run dev workspace initialization sequence',
    category: 'Terminal Commands',
    Icon: Terminal,
    shortcut: '⌘1',
    badge: 'CLI',
    action: ({ runCliCommand }) => runCliCommand('dev'),
  },
  {
    id: 'cmd-help',
    title: 'portfolio help',
    subtitle: 'Display all available CLI commands & descriptions',
    category: 'Terminal Commands',
    Icon: SquareTerminal,
    shortcut: '⌘H',
    badge: 'CLI',
    action: ({ runCliCommand }) => runCliCommand('help'),
  },
  {
    id: 'cmd-projects',
    title: 'projects',
    subtitle: 'Execute CLI command to index projects',
    category: 'Terminal Commands',
    Icon: Code2,
    shortcut: '⌘2',
    badge: 'CLI',
    action: ({ runCliCommand }) => runCliCommand('projects'),
  },
  {
    id: 'cmd-skills',
    title: 'skills',
    subtitle: 'Index tech stack technologies via terminal',
    category: 'Terminal Commands',
    Icon: Tag,
    shortcut: '⌘3',
    badge: 'CLI',
    action: ({ runCliCommand }) => runCliCommand('skills'),
  },
  {
    id: 'cmd-experience',
    title: 'experience',
    subtitle: 'Load experience timeline & milestones',
    category: 'Terminal Commands',
    Icon: Sparkles,
    shortcut: '⌘4',
    badge: 'CLI',
    action: ({ runCliCommand }) => runCliCommand('experience'),
  },
  {
    id: 'cmd-toggle-terminal',
    title: 'Open Terminal Drawer',
    subtitle: 'Toggle bottom interactive terminal shell window',
    category: 'Terminal Commands',
    Icon: Terminal,
    shortcut: '⌘`',
    badge: 'Tool',
    action: ({ openTerminal, close }) => {
      openTerminal();
      close();
    },
  },

  // Quick Actions & System
  {
    id: 'act-toggle-theme',
    title: 'Toggle Color Theme',
    subtitle: 'Switch between Dark and Light mode themes',
    category: 'Quick Actions',
    Icon: Sun,
    shortcut: '⌘L',
    badge: 'System',
    action: ({ toggleTheme }) => toggleTheme(),
  },
  {
    id: 'act-ai-chat',
    title: 'Ask AI Assistant',
    subtitle: 'Launch AI assistant in terminal shell',
    category: 'Quick Actions',
    Icon: Sparkles,
    shortcut: '⌘I',
    badge: 'AI',
    action: ({ openTerminal, close }) => {
      openTerminal();
      close();
    },
  },
];

/*
|--------------------------------------------------------------------------
| Command Palette Component
|--------------------------------------------------------------------------
*/

export function CommandPaletteModal() {
  const router = useRouter();
  const { isOpen, close, toggle } = useCommandPaletteStore();
  const openTerminal = useTerminalStore((s) => s.open);
  const { theme, toggleTheme } = useTheme();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<
    'all' | 'Navigation' | 'Terminal Commands' | 'Quick Actions'
  >('all');
  const [terminalOutput, setTerminalOutput] = useState<TerminalOutputLine[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Global keybinding: Cmd+K / Ctrl+K to toggle open/close
  useEffect(() => {
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', handleGlobalKeydown);
    return () => window.removeEventListener('keydown', handleGlobalKeydown);
  }, [toggle]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTerminalOutput(null);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Filter items based on activeTab and search query
  const filteredItems = useMemo(() => {
    return COMMAND_ITEMS.filter((item) => {
      if (activeTab !== 'all' && item.category !== activeTab) {
        return false;
      }
      if (!query.trim()) return true;
      const q = query.toLowerCase().trim();
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [activeTab, query]);

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  // Run CLI command function
  const runCliCommand = (cmdName: string) => {
    const lines = CLI_COMMAND_OUTPUTS[cmdName] || [
      { id: 1, type: 'error', content: `Command not found: ${cmdName}` },
      { id: 2, type: 'output', content: 'Type "help" for available commands.' },
    ];
    setTerminalOutput(lines);
  };

  const context: CommandContext = {
    router,
    openTerminal,
    toggleTheme,
    theme,
    runCliCommand,
    close,
  };

  // Execute selected item
  const handleExecute = (item: CommandItem) => {
    item.action(context);
  };

  // Handle Form submit / Enter key in raw input mode
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (terminalOutput) {
      setTerminalOutput(null);
      return;
    }

    // Check if raw query matches a CLI command directly
    const rawCmd = query
      .trim()
      .toLowerCase()
      .replace(/^portfolio\s+/, '');
    if (CLI_COMMAND_OUTPUTS[rawCmd]) {
      runCliCommand(rawCmd);
      return;
    }

    if (filteredItems.length > 0 && filteredItems[selectedIndex]) {
      handleExecute(filteredItems[selectedIndex]);
    }
  };

  // Key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (terminalOutput) {
        setTerminalOutput(null);
      } else {
        close();
      }
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
  };

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selectedEl = listRef.current.querySelector('[data-selected="true"]');
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop + Centered Overlay Wrapper */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              key="cmd-palette-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={close}
              className="absolute inset-0 bg-black/50 backdrop-blur-[3px]"
              aria-hidden="true"
            />

            {/* ── Command Palette Modal — Perfectly Centered in Viewport ── */}
            <motion.div
              key="cmd-palette-modal"
              role="dialog"
              aria-label="Command Palette"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 32,
              }}
              className="relative z-10 flex w-[min(640px,94vw)] flex-col overflow-hidden rounded-[10px] border border-border bg-background shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.6)]"
            >
              {/* ── Title Bar (Terminal Style) ── */}
              <div className="flex shrink-0 items-center justify-between border-b border-border bg-background-secondary px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 items-center justify-center rounded-sm bg-brand/10">
                    <SquareTerminal className="size-4 text-brand" strokeWidth={1.8} />
                  </div>
                  <span className="text-[12px] font-semibold text-foreground">Command Palette</span>
                  <span className="flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[9.5px] font-medium text-success">
                    <span className="size-1.5 rounded-full bg-success" />
                    Portfolio CLI v3.0
                  </span>
                </div>

                {/* Shortcut badge & Close button */}
                <div className="flex items-center gap-2 text-[10px] text-foreground-disabled">
                  <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[9px] font-medium text-foreground-secondary">
                    ⌘K
                  </kbd>
                  <button
                    type="button"
                    aria-label="Close command palette"
                    onClick={close}
                    className="flex items-center rounded-sm p-1 transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="size-4" strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              {/* ── Input Bar with Terminal Prompt Style ── */}
              <form
                onSubmit={handleFormSubmit}
                className="flex shrink-0 items-center gap-2.5 border-b border-border px-4 py-3"
              >
                <span className="shrink-0 font-mono text-[12px] font-semibold text-success select-none">
                  →
                </span>
                <span className="shrink-0 font-mono text-[11px] text-foreground-secondary select-none">
                  ~/portfolio &gt;
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (terminalOutput) setTerminalOutput(null);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command or search (e.g. dev, projects, theme)..."
                  className="min-w-0 flex-1 bg-transparent font-mono text-[11px] text-foreground caret-brand outline-none placeholder:text-foreground-disabled"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-[10px] text-foreground-disabled hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
              </form>

              {/* ── Filter Tabs Bar ── */}
              <div className="flex items-center gap-1 border-b border-border bg-card/40 px-3 py-1.5">
                {(['all', 'Navigation', 'Terminal Commands', 'Quick Actions'] as const).map(
                  (tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`rounded-sm px-2.5 py-1 text-[10px] font-medium transition-colors ${
                        activeTab === tab
                          ? 'bg-brand/10 text-brand'
                          : 'text-foreground-secondary hover:text-foreground'
                      }`}
                    >
                      {tab === 'all' ? 'All Commands' : tab}
                    </button>
                  ),
                )}
              </div>

              {/* ── Main Body: Terminal Output Mode OR Command Items List ── */}
              <div
                ref={listRef}
                className="max-h-[340px] min-h-[220px] overflow-y-auto p-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border"
              >
                {terminalOutput ? (
                  /* Inline Terminal Log Viewer */
                  <div className="rounded-md border border-border bg-background-secondary p-3 font-mono text-[11px]">
                    <div className="mb-2 flex items-center justify-between border-b border-border pb-1.5">
                      <span className="text-brand font-semibold">Output Terminal Log</span>
                      <button
                        type="button"
                        onClick={() => setTerminalOutput(null)}
                        className="text-[9.5px] text-foreground-secondary hover:text-foreground"
                      >
                        ← Back to list
                      </button>
                    </div>
                    <div className="space-y-1">
                      {terminalOutput.map((line) => {
                        if (line.type === 'blank') return <div key={line.id} className="h-1.5" />;
                        const colorClass =
                          line.type === 'success'
                            ? 'text-success font-medium'
                            : line.type === 'info'
                              ? 'text-brand font-medium'
                              : line.type === 'error'
                                ? 'text-error font-medium'
                                : line.type === 'section'
                                  ? 'text-foreground font-semibold'
                                  : line.type === 'item'
                                    ? 'text-foreground-secondary pl-2'
                                    : 'text-foreground';
                        return (
                          <div key={line.id} className={`leading-relaxed ${colorClass}`}>
                            {line.content}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : filteredItems.length === 0 ? (
                  /* Empty state */
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <SquareTerminal
                      className="mb-2 size-8 text-foreground-disabled"
                      strokeWidth={1.5}
                    />
                    <p className="text-[11px] font-medium text-foreground">
                      No matching commands found
                    </p>
                    <p className="mt-1 text-[10px] text-foreground-disabled">
                      Try typing &quot;dev&quot;, &quot;help&quot;, &quot;projects&quot; or
                      &quot;theme&quot;
                    </p>
                  </div>
                ) : (
                  /* Filtered Command Items List */
                  <div className="space-y-1">
                    {filteredItems.map((item, index) => {
                      const isSelected = index === selectedIndex;
                      const { Icon } = item;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-selected={isSelected}
                          onClick={() => handleExecute(item)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`flex w-full items-center gap-3 rounded-[6px] px-3 py-2.5 text-left transition-colors ${
                            isSelected
                              ? 'bg-brand/10 text-foreground ring-1 ring-brand/30'
                              : 'hover:bg-accent/60 text-foreground-secondary hover:text-foreground'
                          }`}
                        >
                          {/* Square Icon Container */}
                          <span
                            className={`flex size-8 shrink-0 items-center justify-center rounded-[6px] transition-colors ${
                              isSelected
                                ? 'bg-brand text-white'
                                : 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-500 dark:text-indigo-400'
                            }`}
                          >
                            <Icon className="size-[17px]" strokeWidth={1.8} />
                          </span>

                          {/* Title & Subtitle */}
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[11px] font-semibold leading-tight text-foreground">
                              {item.title}
                            </span>
                            <span className="block truncate text-[9.5px] leading-tight text-foreground-secondary">
                              {item.subtitle}
                            </span>
                          </span>

                          {/* Badges & Shortcuts */}
                          <span className="flex shrink-0 items-center gap-1.5">
                            {item.badge && (
                              <span className="rounded-[4px] bg-accent px-1.5 py-0.5 text-[8.5px] font-medium text-foreground-secondary">
                                {item.badge}
                              </span>
                            )}
                            {item.shortcut && (
                              <kbd className="flex items-center justify-center rounded-[5px] border border-border bg-card px-1.5 py-0.5 font-mono text-[9px] font-medium text-foreground-secondary">
                                {item.shortcut}
                              </kbd>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ── Footer Bar ── */}
              <div className="flex items-center justify-between border-t border-border bg-background-secondary px-4 py-2 font-mono text-[9.5px] text-foreground-disabled">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-border bg-card px-1 py-0.5 text-[8.5px]">
                      ↑↓
                    </kbd>{' '}
                    navigate
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-border bg-card px-1 py-0.5 text-[8.5px]">
                      ↵
                    </kbd>{' '}
                    select
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-border bg-card px-1 py-0.5 text-[8.5px]">
                      ESC
                    </kbd>{' '}
                    exit
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <CornerDownLeft className="size-3 text-brand" />
                  <span>Execute command</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
