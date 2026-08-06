'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        transition-all
        duration-300
        hover:scale-105
      "
      style={{
        background: 'var(--color-surface)',
        color: 'var(--color-text-primary)',
        borderColor: 'var(--color-border)',
      }}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
