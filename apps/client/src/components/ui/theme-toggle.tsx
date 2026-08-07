'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        flex size-8 items-center justify-center
        rounded-sm
        bg-brand-dark text-primary-foreground
        shadow-sm
        transition-all duration-200
        hover:bg-primary/80
      "
    >
      {mounted ? (
        theme === 'dark' ? (
          <Sun className="size-[18px]" strokeWidth={1.8} />
        ) : (
          <Moon className="size-[18px]" strokeWidth={1.8} />
        )
      ) : (
        <Moon className="size-[18px]" strokeWidth={1.8} />
      )}
    </button>
  );
}
