'use client';

import { useTranslation } from '@/hooks/use-translation';
import { useAdminAuthStore } from '@/stores/admin-auth.store';
import { useTerminalStore } from '@/stores/terminal.store';
import { AnimatePresence, motion } from 'framer-motion';
import { Columns2, History, MoreHorizontal, Plus, Sparkles, SquareTerminal, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

interface TerminalLine {
  id: number;
  type: 'command' | 'output' | 'blank' | 'section' | 'item' | 'error' | 'success' | 'info';
  content: string;
  prompt?: boolean;
}

/*
|--------------------------------------------------------------------------
| Command Definitions
|--------------------------------------------------------------------------
*/

const getCommands = (t: any): Record<string, TerminalLine[]> => ({
  dev: [
    { id: 1, type: 'output', content: t('terminal.startingPortfolio') },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'success', content: t('terminal.initializingVSCode') },
    { id: 4, type: 'success', content: t('terminal.loadingComponents') },
    { id: 5, type: 'success', content: t('terminal.connectingAI') },
    { id: 6, type: 'success', content: t('terminal.workspaceReady') },
    { id: 7, type: 'blank', content: '' },
    { id: 8, type: 'info', content: t('terminal.openingHome') },
  ],
  start: [
    { id: 1, type: 'output', content: t('terminal.portfolioVersion') },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'info', content: t('terminal.welcomeBack') },
    { id: 4, type: 'blank', content: '' },
    { id: 5, type: 'output', content: t('terminal.exploreCommands') },
  ],
  about: [
    { id: 1, type: 'info', content: t('terminal.openingAbout') },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'output', content: t('terminal.loaded') },
    { id: 4, type: 'blank', content: '' },
    { id: 5, type: 'success', content: t('terminal.developerProfile') },
    { id: 6, type: 'success', content: t('terminal.metadata') },
    { id: 7, type: 'success', content: t('terminal.socialLinks') },
    { id: 8, type: 'blank', content: '' },
    { id: 9, type: 'output', content: 'Ready.' },
  ],
  projects: [
    { id: 1, type: 'info', content: t('terminal.openingProjects') },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'output', content: t('terminal.projectsFound') },
    { id: 4, type: 'blank', content: '' },
    { id: 5, type: 'section', content: t('terminal.featured') },
    { id: 6, type: 'item', content: t('terminal.consultify') },
    { id: 7, type: 'item', content: t('terminal.portfolio') },
    { id: 8, type: 'item', content: t('terminal.aiRecommendation') },
    { id: 9, type: 'blank', content: '' },
    { id: 10, type: 'output', content: t('terminal.selectProject') },
  ],
  skills: [
    { id: 1, type: 'info', content: t('terminal.openingSkills') },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'section', content: t('skillsSidebar.categories', 'Categories') },
    { id: 4, type: 'blank', content: '' },
    { id: 5, type: 'item', content: t('skills.frontend', 'Frontend') },
    { id: 6, type: 'item', content: t('skills.backend', 'Backend') },
    { id: 7, type: 'item', content: t('skills.databases', 'Databases') },
    { id: 8, type: 'item', content: t('skills.design', 'Design') },
    { id: 9, type: 'item', content: t('skills.devops', 'DevOps & Tools') },
    { id: 10, type: 'blank', content: '' },
    {
      id: 11,
      type: 'output',
      content: t('commandPalette.indexedTechStack', '32 Technologies Indexed.'),
    },
  ],
  experience: [
    { id: 1, type: 'info', content: t('terminal.openingExperience') },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'output', content: t('experienceSidebar.title', 'Career Timeline Loaded') },
    { id: 4, type: 'blank', content: '' },
    { id: 5, type: 'item', content: t('experience.education', 'Education') },
    { id: 6, type: 'item', content: t('experience.internships', 'Internships') },
    { id: 7, type: 'item', content: t('experienceSidebar.achievements', 'Achievements') },
    { id: 8, type: 'item', content: t('experiencePage.milestones', 'Milestones') },
    { id: 9, type: 'blank', content: '' },
    { id: 10, type: 'output', content: t('commandPalette.ready', 'Ready.') },
  ],
  certifications: [
    {
      id: 1,
      type: 'info',
      content: t('certificationsPage.subtitle', 'Opening Certifications Workspace...'),
    },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'output', content: t('certificationsPage.title', '14 Certificates Indexed') },
    { id: 4, type: 'blank', content: '' },
    { id: 5, type: 'section', content: t('skills.latestAdded', 'Latest Added') },
    { id: 6, type: 'item', content: '• React Development' },
    { id: 7, type: 'item', content: '• Advanced TypeScript' },
    { id: 8, type: 'item', content: '• UI / UX Design' },
    { id: 9, type: 'blank', content: '' },
    { id: 10, type: 'output', content: t('commandPalette.ready', 'Ready.') },
  ],
  contact: [
    { id: 1, type: 'info', content: t('contactPage.heading', 'Opening Contact Workspace...') },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'section', content: t('contactPage.tagline', 'Communication Channels') },
    { id: 4, type: 'blank', content: '' },
    { id: 5, type: 'success', content: `✓ ${t('contact.email', 'Email')}` },
    { id: 6, type: 'success', content: `✓ ${t('contact.linkedin', 'LinkedIn')}` },
    { id: 7, type: 'success', content: `✓ ${t('contact.github', 'GitHub')}` },
    { id: 8, type: 'blank', content: '' },
    { id: 9, type: 'output', content: t('commandPalette.ready', 'Ready.') },
  ],
  chat: [
    { id: 1, type: 'info', content: t('aiAssistantSidebar.title', 'Initializing AI Assistant...') },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'output', content: t('aiAssistantSidebar.subtitle', 'Knowledge Base Loaded') },
    { id: 4, type: 'blank', content: '' },
    { id: 5, type: 'item', content: t('aiAssistantSidebar.projects', 'Projects') },
    { id: 6, type: 'item', content: t('aiAssistantSidebar.technicalSkills', 'Skills') },
    { id: 7, type: 'item', content: t('navigation.experience', 'Experience') },
    { id: 8, type: 'item', content: t('navigation.certifications', 'Certifications') },
    { id: 9, type: 'blank', content: '' },
    { id: 10, type: 'success', content: t('commandPalette.workspaceReady', 'AI Assistant Ready.') },
    { id: 11, type: 'blank', content: '' },
    { id: 12, type: 'output', content: t('aiAssistant.placeholder', 'How can I help?') },
  ],
  help: [
    { id: 1, type: 'output', content: 'Portfolio CLI v3.0' },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'section', content: 'Commands' },
    { id: 4, type: 'blank', content: '' },
    { id: 5, type: 'item', content: 'dev' },
    { id: 6, type: 'item', content: 'start' },
    { id: 7, type: 'item', content: 'about' },
    { id: 8, type: 'item', content: 'projects' },
    { id: 9, type: 'item', content: 'skills' },
    { id: 10, type: 'item', content: 'experience' },
    { id: 11, type: 'item', content: 'certifications' },
    { id: 12, type: 'item', content: 'contact' },
    { id: 13, type: 'item', content: 'search <query>' },
    { id: 14, type: 'item', content: 'chat' },
    { id: 15, type: 'item', content: 'login <username> <password>' },
    { id: 16, type: 'item', content: 'logout' },
    { id: 17, type: 'item', content: 'dashboard' },
    { id: 18, type: 'blank', content: '' },
    { id: 19, type: 'output', content: 'Type a command to continue.' },
  ],
});

function getSearchResults(query: string): TerminalLine[] {
  const q = query.toLowerCase();
  const results: string[] = [];

  if ('react typescript frontend'.includes(q) || q.includes('react')) {
    results.push('Skills/Frontend/React');
  }
  if (q.includes('portfolio') || q.includes('workspace')) {
    results.push('Projects/Portfolio Workspace');
  }
  if (q.includes('consult') || q.includes('ai')) {
    results.push('Projects/CONSULTIFY');
  }
  if (q.includes('next') || q.includes('backend')) {
    results.push('Skills/Backend/NestJS');
  }
  if (results.length === 0) {
    results.push(`No results found for "${query}"`);
  }

  const lines: TerminalLine[] = [
    { id: 1, type: 'info', content: 'Searching...' },
    { id: 2, type: 'blank', content: '' },
    { id: 3, type: 'section', content: 'Results' },
    { id: 4, type: 'blank', content: '' },
    ...results.map((r, i) => ({ id: 5 + i, type: 'item' as const, content: r })),
    { id: 5 + results.length, type: 'blank', content: '' },
    {
      id: 6 + results.length,
      type: 'output',
      content: `${results.length} Match${results.length !== 1 ? 'es' : ''} Found.`,
    },
  ];
  return lines;
}

/*
|--------------------------------------------------------------------------
| Line Renderer
|--------------------------------------------------------------------------
*/

function LineRenderer({ line }: { line: TerminalLine }) {
  if (line.type === 'blank') return <div className="h-2" />;

  const classMap: Record<string, string> = {
    command: 'text-brand font-semibold',
    output: 'text-foreground',
    section: 'text-foreground font-semibold',
    item: 'text-foreground-secondary pl-2',
    success: 'text-success',
    info: 'text-brand',
    error: 'text-error',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15 }}
      className={`font-mono text-[11px] leading-relaxed ${classMap[line.type] ?? 'text-foreground'}`}
    >
      {line.content}
    </motion.div>
  );
}

/*
|--------------------------------------------------------------------------
| Terminal Block (one full command + output block)
|--------------------------------------------------------------------------
*/

interface HistoryBlock {
  id: number;
  command: string;
  lines: TerminalLine[];
}

/*
|--------------------------------------------------------------------------
| Terminal Modal
|--------------------------------------------------------------------------
*/

export function TerminalModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isOpen, close } = useTerminalStore();
  const login = useAdminAuthStore((state) => state.login);
  const logout = useAdminAuthStore((state) => state.logout);
  const isAuthenticated = useAdminAuthStore((state) => state.isAuthenticated);
  const COMMANDS = getCommands(t);
  const [history, setHistory] = useState<HistoryBlock[]>([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);
  const [blockCounter, setBlockCounter] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  // Scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [close]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    const parts = raw.split(/\s+/);
    const cmd = parts[0] === 'portfolio' ? (parts[1] ?? '') : parts[0];
    const arg = parts[0] === 'portfolio' ? parts.slice(2).join(' ') : parts.slice(1).join(' ');
    const fullCmd = raw;

    let outputLines: TerminalLine[] = [];

    if (cmd === 'clear') {
      setHistory([]);
      setBlockCounter(0);
      setInput('');
      setCmdHistoryIdx(-1);
      return;
    } else if (cmd === 'login') {
      const [username, password] = arg.split(/\s+/).filter(Boolean);
      const success = await login(username ?? '', password ?? '');
      outputLines = success
        ? [
            { id: 1, type: 'success', content: 'Admin access granted by the server.' },
            { id: 2, type: 'output', content: 'Dashboard is now unlocked for this session.' },
          ]
        : [
            { id: 1, type: 'error', content: 'Authentication failed.' },
            {
              id: 2,
              type: 'output',
              content: 'Use the admin username and password configured on the server.',
            },
          ];

      if (success) {
        router.push('/dashboard');
        close();
      }
    } else if (cmd === 'logout') {
      await logout();
      outputLines = [
        { id: 1, type: 'info', content: 'Admin session closed.' },
        { id: 2, type: 'output', content: 'Dashboard access has been revoked.' },
      ];
    } else if (cmd === 'dashboard') {
      outputLines = isAuthenticated
        ? [
            { id: 1, type: 'success', content: 'Dashboard access is enabled.' },
            { id: 2, type: 'output', content: 'Open /dashboard to view the admin panel.' },
          ]
        : [
            { id: 1, type: 'error', content: 'Dashboard is restricted to admins only.' },
            { id: 2, type: 'output', content: 'Run: portfolio login <username> <password>' },
          ];
    } else if (cmd === 'search' && arg) {
      outputLines = getSearchResults(arg);
    } else if (COMMANDS[cmd]) {
      outputLines = COMMANDS[cmd];
    } else {
      outputLines = [
        { id: 1, type: 'error', content: `Command not found: ${cmd}` },
        { id: 2, type: 'output', content: 'Type "portfolio help" for available commands.' },
      ];
    }

    const nextBlockId = blockCounter + 1;
    setBlockCounter(nextBlockId);
    setHistory((prev) => [...prev, { id: nextBlockId, command: fullCmd, lines: outputLines }]);
    setCmdHistory((prev) => [raw, ...prev]);
    setCmdHistoryIdx(-1);
    setInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIdx = Math.min(cmdHistoryIdx + 1, cmdHistory.length - 1);
      setCmdHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = Math.max(cmdHistoryIdx - 1, -1);
      setCmdHistoryIdx(nextIdx);
      setInput(nextIdx === -1 ? '' : (cmdHistory[nextIdx] ?? ''));
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="terminal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Terminal Modal — grows from bottom up */}
          <motion.div
            key="terminal-modal"
            role="dialog"
            aria-label="Portfolio Terminal"
            aria-modal="true"
            initial={{ opacity: 0, y: '100%', scaleY: 0.6 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: '100%', scaleY: 0.6 }}
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 34,
              opacity: { duration: 0.18 },
            }}
            className="fixed bottom-0 left-1/2 z-[101] flex w-[min(900px,96vw)] -translate-x-1/2 flex-col overflow-hidden rounded-t-[8px] border border-b-0 border-border bg-background shadow-[0_-8px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_-8px_40px_rgba(0,0,0,0.55)]"
            style={{ originY: 1 } as React.CSSProperties}
          >
            {/* ── Title Bar ── */}
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-background-secondary px-4 py-2">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-sm bg-brand/10">
                  <SquareTerminal className="size-4 text-brand" strokeWidth={1.8} />
                </div>
                <span className="text-[12px] font-semibold text-foreground">
                  Portfolio Terminal
                </span>
                <span className="flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">
                  <span className="size-1.5 rounded-full bg-success" />
                  Connected
                </span>
              </div>

              {/* Tab bar */}
              <div className="flex items-center gap-1 text-[11px] text-foreground-secondary">
                <button
                  type="button"
                  title="New Session"
                  onClick={() => {
                    setHistory([]);
                    setInput('');
                  }}
                  className="flex items-center gap-1 rounded-sm px-2 py-1 transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Plus className="size-3.5" strokeWidth={1.8} />
                  <span>New Session</span>
                </button>
                <button
                  type="button"
                  title="Split"
                  className="flex items-center gap-1 rounded-sm px-2 py-1 transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Columns2 className="size-3.5" strokeWidth={1.8} />
                  <span>Split</span>
                </button>
                <button
                  type="button"
                  title="History"
                  className="flex items-center gap-1 rounded-sm px-2 py-1 transition-colors hover:bg-muted hover:text-foreground"
                >
                  <History className="size-3.5" strokeWidth={1.8} />
                  <span>History</span>
                </button>
                <button
                  type="button"
                  title="AI"
                  className="flex items-center gap-1 rounded-sm px-2 py-1 transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Sparkles className="size-3.5" strokeWidth={1.8} />
                  <span>AI</span>
                </button>
                <button
                  type="button"
                  title="More"
                  className="flex items-center rounded-sm p-1 transition-colors hover:bg-muted hover:text-foreground"
                >
                  <MoreHorizontal className="size-4" strokeWidth={1.8} />
                </button>

                {/* Divider */}
                <div className="mx-1 h-4 w-px bg-border" />

                <button
                  type="button"
                  aria-label="Close terminal"
                  onClick={close}
                  className="flex items-center rounded-sm p-1 transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="size-4" strokeWidth={1.8} />
                </button>
              </div>
            </div>

            {/* ── Scrollable Output ── */}
            <div
              className="flex-1 overflow-y-auto px-5 py-4 font-mono text-[11px]"
              style={{ height: '360px', maxHeight: '60vh' }}
              onClick={() => inputRef.current?.focus()}
            >
              {/* Welcome message if no history */}
              {history.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-foreground-secondary"
                >
                  <div className="text-success font-semibold">Portfolio Workspace v3.0</div>
                  <div className="mt-1 text-foreground-disabled">
                    Type <span className="text-brand">portfolio help</span> to see all commands.
                    Press <span className="text-brand">Esc</span> to close.
                  </div>
                  <div className="mt-3 h-px bg-border" />
                </motion.div>
              )}

              {/* History blocks */}
              {history.map((block) => (
                <div key={block.id} className="mt-3">
                  {/* Prompt line */}
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span className="text-success font-semibold select-none">→</span>
                    <span className="text-foreground-secondary select-none">~/portfolio</span>
                    <span className="text-brand font-semibold">{block.command}</span>
                  </div>
                  {/* Output */}
                  <div className="mt-1.5 pl-4 border-l border-border/40 ml-1">
                    {block.lines.map((line, idx) => (
                      <LineRenderer key={`${block.id}-${idx}`} line={line} />
                    ))}
                  </div>
                </div>
              ))}

              <div ref={bottomRef} />
            </div>

            {/* ── Input Bar ── */}
            <form
              onSubmit={handleSubmit}
              className="flex shrink-0 items-center gap-2 border-t border-border bg-background-secondary px-5 py-3"
            >
              <span className="shrink-0 font-mono text-[11px] font-semibold text-success select-none">
                →
              </span>
              <span className="shrink-0 font-mono text-[11px] text-foreground-secondary select-none">
                ~/portfolio
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="portfolio help"
                aria-label="Terminal input"
                autoComplete="off"
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent font-mono text-[11px] text-foreground caret-brand outline-none placeholder:text-foreground-disabled"
              />
              <button
                type="submit"
                className="shrink-0 rounded-sm bg-brand px-3 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Run
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
