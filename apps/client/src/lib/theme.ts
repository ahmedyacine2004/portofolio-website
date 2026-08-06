export const THEME_STORAGE_KEY = 'portfolio-theme';

export type Theme = 'light' | 'dark';

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const theme = localStorage.getItem(THEME_STORAGE_KEY);

  if (theme === 'light' || theme === 'dark') {
    return theme;
  }

  return null;
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}
