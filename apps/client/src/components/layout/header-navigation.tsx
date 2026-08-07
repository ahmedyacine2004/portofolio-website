'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export function HeaderNavigation() {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    const updateNavigationState = () => {
      setCanGoBack(window.history.length > 1);
    };

    updateNavigationState();

    window.addEventListener('popstate', updateNavigationState);

    return () => {
      window.removeEventListener('popstate', updateNavigationState);
    };
  }, []);

  const handleBack = () => {
    if (!canGoBack) return;

    window.history.back();
  };

  const handleForward = () => {
    if (!canGoForward) return;

    window.history.forward();
  };

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
