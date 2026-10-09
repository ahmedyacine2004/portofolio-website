'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function SimpleBackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 240);

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-5 right-5 z-40 inline-flex size-11 items-center justify-center rounded-[8px] border border-border bg-background text-primary shadow-lg transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:bottom-7 sm:right-7"
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
