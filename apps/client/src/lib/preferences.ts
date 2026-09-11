import type { Theme } from './theme';

export const SETTINGS_STORAGE_KEY = 'portfolio-preferences';

export type AccentColor = 'Blue' | 'Indigo' | 'Emerald' | 'Violet' | 'Cyan' | 'Rose' | 'Amber';

export const ACCENT_OPTIONS: AccentColor[] = [
  'Blue',
  'Indigo',
  'Emerald',
  'Violet',
  'Cyan',
  'Rose',
  'Amber',
];

export type PreferenceState = {
  theme: Theme;
  colorAccent: string;
  animationsEnabled: boolean;
  fontFamily: string;
  compactMode: boolean;
  hero3dEnabled: boolean;
  interactive3d: boolean;
  performanceMode: string;
  reduceMotion: boolean;
  highContrast: boolean;
  focusIndicators: boolean;
  textScaling: string;
  imageLazyLoading: boolean;
  smoothScrolling: boolean;
  preloadCritical: boolean;
  aiAssistantEnabled: boolean;
  autoSuggest: boolean;
  contextAwareness: boolean;
};

export const defaultPreferences: PreferenceState = {
  theme: 'dark',
  colorAccent: 'Blue',
  animationsEnabled: true,
  fontFamily: 'Inter',
  compactMode: false,
  hero3dEnabled: true,
  interactive3d: true,
  performanceMode: 'Auto Detect',
  reduceMotion: false,
  highContrast: false,
  focusIndicators: true,
  textScaling: '100%',
  imageLazyLoading: true,
  smoothScrolling: true,
  preloadCritical: true,
  aiAssistantEnabled: true,
  autoSuggest: true,
  contextAwareness: true,
};

export type AccentTokenSet = {
  brand: string;
  brandLight: string;
  brandDark: string;
  brandDarkest: string;
  surfaceBrand: string;
  primaryForeground: string;
};

export const ACCENT_PALETTES: Record<
  string,
  {
    dark: AccentTokenSet;
    light: AccentTokenSet;
  }
> = {
  Blue: {
    dark: {
      brand: '#6ea8ff',
      brandLight: '#8fc2ff',
      brandDark: '#5b94ff',
      brandDarkest: '#4285f4',
      surfaceBrand: 'rgba(110, 168, 255, 0.15)',
      primaryForeground: '#09090b',
    },
    light: {
      brand: '#3469ea',
      brandLight: '#4285f4',
      brandDark: '#00358b',
      brandDarkest: '#001e36',
      surfaceBrand: '#ebdffd',
      primaryForeground: '#ffffff',
    },
  },
  Indigo: {
    dark: {
      brand: '#818cf8',
      brandLight: '#a5b4fc',
      brandDark: '#6366f1',
      brandDarkest: '#4f46e5',
      surfaceBrand: 'rgba(129, 140, 248, 0.15)',
      primaryForeground: '#09090b',
    },
    light: {
      brand: '#4f46e5',
      brandLight: '#6366f1',
      brandDark: '#3730a3',
      brandDarkest: '#1e1b4b',
      surfaceBrand: 'rgba(79, 70, 229, 0.12)',
      primaryForeground: '#ffffff',
    },
  },
  Emerald: {
    dark: {
      brand: '#34d399',
      brandLight: '#6ee7b7',
      brandDark: '#10b981',
      brandDarkest: '#059669',
      surfaceBrand: 'rgba(52, 211, 153, 0.15)',
      primaryForeground: '#09090b',
    },
    light: {
      brand: '#059669',
      brandLight: '#10b981',
      brandDark: '#065f46',
      brandDarkest: '#022c22',
      surfaceBrand: 'rgba(5, 150, 105, 0.12)',
      primaryForeground: '#ffffff',
    },
  },
  Violet: {
    dark: {
      brand: '#a78bfa',
      brandLight: '#c4b5fd',
      brandDark: '#8b5cf6',
      brandDarkest: '#7c3aed',
      surfaceBrand: 'rgba(167, 139, 250, 0.15)',
      primaryForeground: '#09090b',
    },
    light: {
      brand: '#7c3aed',
      brandLight: '#8b5cf6',
      brandDark: '#5b21b6',
      brandDarkest: '#2e1065',
      surfaceBrand: 'rgba(124, 58, 237, 0.12)',
      primaryForeground: '#ffffff',
    },
  },
  Cyan: {
    dark: {
      brand: '#22d3ee',
      brandLight: '#67e8f9',
      brandDark: '#06b6d4',
      brandDarkest: '#0891b2',
      surfaceBrand: 'rgba(34, 211, 238, 0.15)',
      primaryForeground: '#09090b',
    },
    light: {
      brand: '#0891b2',
      brandLight: '#06b6d4',
      brandDark: '#155e75',
      brandDarkest: '#083344',
      surfaceBrand: 'rgba(8, 145, 178, 0.12)',
      primaryForeground: '#ffffff',
    },
  },
  Rose: {
    dark: {
      brand: '#fb7185',
      brandLight: '#fda4af',
      brandDark: '#f43f5e',
      brandDarkest: '#e11d48',
      surfaceBrand: 'rgba(251, 113, 133, 0.15)',
      primaryForeground: '#09090b',
    },
    light: {
      brand: '#e11d48',
      brandLight: '#f43f5e',
      brandDark: '#9f1239',
      brandDarkest: '#4c0519',
      surfaceBrand: 'rgba(225, 29, 72, 0.12)',
      primaryForeground: '#ffffff',
    },
  },
  Amber: {
    dark: {
      brand: '#fbbf24',
      brandLight: '#fcd34d',
      brandDark: '#f59e0b',
      brandDarkest: '#d97706',
      surfaceBrand: 'rgba(251, 191, 36, 0.15)',
      primaryForeground: '#09090b',
    },
    light: {
      brand: '#d97706',
      brandLight: '#f59e0b',
      brandDark: '#92400e',
      brandDarkest: '#451a03',
      surfaceBrand: 'rgba(217, 119, 6, 0.12)',
      primaryForeground: '#ffffff',
    },
  },
};

export const parseScale = (value: string) => {
  const numericValue = Number.parseFloat(value.replace('%', '')) || 100;
  return numericValue / 100;
};

export const readStoredPreferences = (): PreferenceState => {
  if (typeof window === 'undefined') {
    return defaultPreferences;
  }

  try {
    const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!stored) {
      return defaultPreferences;
    }
    return { ...defaultPreferences, ...JSON.parse(stored) };
  } catch {
    return defaultPreferences;
  }
};

export const applyPreferenceStyles = (preferences: PreferenceState) => {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  const currentTheme = preferences.theme === 'light' ? 'light' : 'dark';
  const paletteConfig = ACCENT_PALETTES[preferences.colorAccent] ?? ACCENT_PALETTES.Blue;
  const activePalette = paletteConfig[currentTheme];

  root.dataset.theme = preferences.theme;
  root.dataset.compact = String(preferences.compactMode);
  root.dataset.highContrast = String(preferences.highContrast);
  root.dataset.reduceMotion = String(preferences.reduceMotion);
  root.dataset.performanceMode = preferences.performanceMode.toLowerCase().replace(/\s+/g, '-');
  root.dataset.hero3d = String(preferences.hero3dEnabled);
  root.dataset.interactive3d = String(preferences.interactive3d);
  root.dataset.imageLazyLoading = String(preferences.imageLazyLoading);
  root.dataset.smoothScrolling = String(preferences.smoothScrolling);
  root.dataset.preloadCritical = String(preferences.preloadCritical);
  root.dataset.aiAssistantEnabled = String(preferences.aiAssistantEnabled);
  root.dataset.autoSuggest = String(preferences.autoSuggest);
  root.dataset.contextAwareness = String(preferences.contextAwareness);
  root.dataset.focusIndicators = String(preferences.focusIndicators);

  root.style.setProperty('scroll-behavior', preferences.smoothScrolling ? 'smooth' : 'auto');
  root.style.setProperty('--font-sans', `${preferences.fontFamily}, sans-serif`);
  root.style.setProperty('--portfolio-font-scale', String(parseScale(preferences.textScaling)));

  // Accent & Brand CSS variables (Tailwind v4 tokens and standard variables)
  root.style.setProperty('--color-brand', activePalette.brand);
  root.style.setProperty('--color-brand-light', activePalette.brandLight);
  root.style.setProperty('--color-brand-dark', activePalette.brandDark);
  root.style.setProperty('--color-brand-darkest', activePalette.brandDarkest);
  root.style.setProperty('--color-surface-brand', activePalette.surfaceBrand);

  root.style.setProperty('--color-primary', activePalette.brand);
  root.style.setProperty('--color-primary-foreground', activePalette.primaryForeground);
  root.style.setProperty('--color-ring', activePalette.brand);
  root.style.setProperty('--color-accent', activePalette.surfaceBrand);
  root.style.setProperty('--color-accent-foreground', activePalette.brand);

  // Set standard legacy / component variables
  root.style.setProperty('--primary', activePalette.brand);
  root.style.setProperty('--primary-foreground', activePalette.primaryForeground);
  root.style.setProperty('--ring', activePalette.brand);

  // High contrast mode overrides
  root.style.setProperty('--background', preferences.highContrast ? 'oklch(0.99 0 0)' : '');
  root.style.setProperty('--foreground', preferences.highContrast ? 'oklch(0.12 0 0)' : '');
  root.style.setProperty('--border', preferences.highContrast ? 'oklch(0.18 0 0)' : '');
  root.style.setProperty('--muted', preferences.highContrast ? 'oklch(0.96 0 0)' : '');
  root.style.setProperty('--muted-foreground', preferences.highContrast ? 'oklch(0.28 0 0)' : '');

  if (!preferences.animationsEnabled || preferences.reduceMotion) {
    root.dataset.motionReduced = 'true';
  } else {
    root.dataset.motionReduced = 'false';
  }
};
