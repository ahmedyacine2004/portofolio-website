import { create } from 'zustand';

export type Locale = 'en' | 'fr';

type LanguageStore = {
  locale: Locale;
  hydrateLocale: () => void;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const safeReadLocale = (): Locale => {
  if (typeof window === 'undefined') return 'en';

  const stored = window.localStorage.getItem('portfolio-locale');
  if (stored === 'en' || stored === 'fr') return stored;

  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
};

const applyDocumentLocale = (locale: Locale) => {
  if (typeof window === 'undefined') return;

  document.documentElement.lang = locale === 'fr' ? 'fr' : 'en';
  document.documentElement.setAttribute('data-locale', locale);
};

export const useLanguageStore = create<LanguageStore>((set) => ({
  locale: 'en',
  hydrateLocale: () => {
    const nextLocale = safeReadLocale();
    applyDocumentLocale(nextLocale);
    set({ locale: nextLocale });
  },
  setLocale: (locale) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('portfolio-locale', locale);
      applyDocumentLocale(locale);
    }

    set({ locale });
  },
  toggleLocale: () =>
    set((state) => {
      const nextLocale = state.locale === 'en' ? 'fr' : 'en';

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('portfolio-locale', nextLocale);
        applyDocumentLocale(nextLocale);
      }

      return { locale: nextLocale };
    }),
}));
