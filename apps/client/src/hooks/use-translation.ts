'use client';

import en from '@/locales/en/common.json';
import fr from '@/locales/fr/common.json';
import { useLanguageStore } from '@/stores/language.store';

type TranslationKeys = typeof en;

const translations = {
  en,
  fr,
};

/**
 * Deeply retrieves a nested value from an object using dot notation
 * @param obj - The object to retrieve from
 * @param path - The dot notation path (e.g., "navigation.home")
 * @returns The value at the path or the path itself as fallback
 */
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path; // Return the key path as fallback
    }
  }

  return result;
}

/**
 * Custom hook for translations
 * @returns Object with `t` function and current `locale`
 */
export function useTranslation() {
  const locale = useLanguageStore((s) => s.locale);

  const t = (key: string, fallback?: string): string => {
    const translationSet = translations[locale];
    const value = getNestedValue(translationSet, key);

    // If value is the key path (fallback from getNestedValue), return fallback or key
    if (typeof value !== 'string') {
      return fallback || key;
    }

    return value;
  };

  const tArray = (key: string): any[] => {
    const translationSet = translations[locale];
    const value = getNestedValue(translationSet, key);

    if (Array.isArray(value)) {
      return value;
    }

    return [];
  };

  return { t, tArray, locale };
}
