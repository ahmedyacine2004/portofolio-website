'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const HEADER_NAV_HISTORY_KEY = 'header-nav-history';

type HeaderNavState = {
  stack: string[];
  index: number;
};

function readHeaderNavState(): HeaderNavState {
  if (typeof window === 'undefined') return { stack: [], index: -1 };

  try {
    const raw = window.sessionStorage.getItem(HEADER_NAV_HISTORY_KEY);
    if (!raw) return { stack: [], index: -1 };

    const parsed = JSON.parse(raw) as Partial<HeaderNavState>;
    const stack = Array.isArray(parsed.stack)
      ? parsed.stack.filter((value): value is string => typeof value === 'string')
      : [];
    const index = Number.isInteger(parsed.index) ? parsed.index! : stack.length - 1;

    return {
      stack,
      index: Math.min(Math.max(index, 0), Math.max(stack.length - 1, 0)),
    };
  } catch {
    return { stack: [], index: -1 };
  }
}

function saveHeaderNavState(nextState: HeaderNavState) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(HEADER_NAV_HISTORY_KEY, JSON.stringify(nextState));
}

export function HeaderNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    const currentPath = pathname || '/';
    const state = readHeaderNavState();

    if (!state.stack.length) {
      const nextState = { stack: [currentPath], index: 0 };
      saveHeaderNavState(nextState);
      setCanGoBack(false);
      setCanGoForward(false);
      return;
    }

    const existingIndex = state.stack.indexOf(currentPath);
    const nextState =
      existingIndex === -1
        ? {
            stack: [...state.stack.slice(0, state.index + 1), currentPath],
            index: state.index + 1,
          }
        : {
            stack: state.stack,
            index: existingIndex,
          };

    saveHeaderNavState(nextState);
    setCanGoBack(nextState.index > 0);
    setCanGoForward(nextState.index < nextState.stack.length - 1);
  }, [pathname]);

  const navigateByOffset = (offset: number) => {
    const currentState = readHeaderNavState();
    const nextIndex = currentState.index + offset;

    if (nextIndex < 0 || nextIndex >= currentState.stack.length) {
      return;
    }

    const nextState = { ...currentState, index: nextIndex };
    saveHeaderNavState(nextState);
    setCanGoBack(nextIndex > 0);
    setCanGoForward(nextIndex < nextState.stack.length - 1);
    router.push(currentState.stack[nextIndex]);
  };

  const handleBack = () => navigateByOffset(-1);
  const handleForward = () => navigateByOffset(1);

  return (
    <div className="ml-5 flex items-center gap-2">
      <button
        type="button"
        aria-label="Go back"
        onClick={handleBack}
        disabled={!canGoBack}
        className={[
          'flex size-5 items-center justify-center',
          'text-foreground-secondary transition-colors',
          'hover:text-foreground',
          'disabled:pointer-events-none disabled:opacity-30',
        ].join(' ')}
      >
        <ChevronLeft className="size-5" strokeWidth={1.8} />
      </button>

      <button
        type="button"
        aria-label="Go forward"
        onClick={handleForward}
        disabled={!canGoForward}
        className={[
          'flex size-5 items-center justify-center',
          'text-foreground-secondary transition-colors',
          'hover:text-foreground',
          'disabled:pointer-events-none disabled:opacity-30',
        ].join(' ')}
      >
        <ChevronRight className="size-5" strokeWidth={1.8} />
      </button>
    </div>
  );
}
