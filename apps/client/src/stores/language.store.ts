import { create } from 'zustand';

export type Locale = 'en' | 'fr';

type LanguageStore = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const safeReadLocale = (): Locale => {
  if (typeof window === 'undefined') return 'en';

  const stored = window.localStorage.getItem('portfolio-locale');
  if (stored === 'en' || stored === 'fr') return stored;

  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
};

export const useLanguageStore = create<LanguageStore>((set) => ({
  locale: safeReadLocale(),
  setLocale: (locale) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('portfolio-locale', locale);
      document.documentElement.lang = locale === 'fr' ? 'fr' : 'en';
      document.documentElement.setAttribute('data-locale', locale);
    }

    set({ locale });
  },
  toggleLocale: () =>
    set((state) => {
      const nextLocale = state.locale === 'en' ? 'fr' : 'en';

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('portfolio-locale', nextLocale);
        document.documentElement.lang = nextLocale === 'fr' ? 'fr' : 'en';
        document.documentElement.setAttribute('data-locale', nextLocale);
      }

      return { locale: nextLocale };
    }),
}));

if (typeof window !== 'undefined') {
  const initialLocale = safeReadLocale();
  document.documentElement.lang = initialLocale === 'fr' ? 'fr' : 'en';
  document.documentElement.setAttribute('data-locale', initialLocale);
}
