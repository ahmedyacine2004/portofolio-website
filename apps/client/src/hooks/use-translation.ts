'use client';

import en from '@/locales/en/common.json';
import apexBrandKitEn from '@/locales/en/projects/apex-brand-kit.json';
import consultifyEn from '@/locales/en/projects/consultify.json';
import designSystemEn from '@/locales/en/projects/design-system.json';
import eventVisualIdentityEn from '@/locales/en/projects/event-visual-identity.json';
import graphicDesignEn from '@/locales/en/projects/graphic-design.json';
import greenleafMarketEn from '@/locales/en/projects/greenleaf-market.json';
import healthsyncEn from '@/locales/en/projects/healthsync.json';
import insightAnalyticsEn from '@/locales/en/projects/insight-analytics.json';
import learnhubLmsEn from '@/locales/en/projects/learnhub-lms.json';
import luminaStudioEn from '@/locales/en/projects/lumina-studio.json';
import neobankMobileEn from '@/locales/en/projects/neobank-mobile.json';
import novaCoffeeEn from '@/locales/en/projects/nova-coffee.json';
import portfolioWorkspaceEn from '@/locales/en/projects/portfolio-workspace.json';
import shopsphereEn from '@/locales/en/projects/shopsphere.json';
import socialCampaign2025En from '@/locales/en/projects/social-campaign-2025.json';
import taskflowDashboardEn from '@/locales/en/projects/taskflow-dashboard.json';
import travelMateEn from '@/locales/en/projects/travelmate.json';
import fr from '@/locales/fr/common.json';
import apexBrandKitFr from '@/locales/fr/projects/apex-brand-kit.json';
import consultifyFr from '@/locales/fr/projects/consultify.json';
import designSystemFr from '@/locales/fr/projects/design-system.json';
import eventVisualIdentityFr from '@/locales/fr/projects/event-visual-identity.json';
import graphicDesignFr from '@/locales/fr/projects/graphic-design.json';
import greenleafMarketFr from '@/locales/fr/projects/greenleaf-market.json';
import healthsyncFr from '@/locales/fr/projects/healthsync.json';
import insightAnalyticsFr from '@/locales/fr/projects/insight-analytics.json';
import learnhubLmsFr from '@/locales/fr/projects/learnhub-lms.json';
import luminaStudioExtraFr from '@/locales/fr/projects/lumina-studio-extra.json';
import luminaStudioFr from '@/locales/fr/projects/lumina-studio.json';
import neobankMobileFr from '@/locales/fr/projects/neobank-mobile.json';
import novaCoffeeFr from '@/locales/fr/projects/nova-coffee.json';
import portfolioWorkspaceFr from '@/locales/fr/projects/portfolio-workspace.json';
import shopsphereFr from '@/locales/fr/projects/shopsphere.json';
import socialCampaign2025Fr from '@/locales/fr/projects/social-campaign-2025.json';
import taskflowDashboardFr from '@/locales/fr/projects/taskflow-dashboard.json';
import travelMateFr from '@/locales/fr/projects/travelmate.json';
import { useLanguageStore } from '@/stores/language.store';

type TranslationKeys = typeof en;

const translations = {
  en: {
    ...en,
    projects: {
      consultify: consultifyEn,
      designSystem: designSystemEn,
      apexBrandKit: {
        ...graphicDesignEn,
        ...apexBrandKitEn,
        common: { ...graphicDesignEn.common, ...apexBrandKitEn.common },
        content: { ...graphicDesignEn.content, ...apexBrandKitEn.content },
      },
      eventVisualIdentity: {
        ...graphicDesignEn,
        ...eventVisualIdentityEn,
        common: { ...graphicDesignEn.common, ...eventVisualIdentityEn.common },
        content: { ...graphicDesignEn.content, ...eventVisualIdentityEn.content },
      },
      socialCampaign2025: {
        ...graphicDesignEn,
        ...socialCampaign2025En,
        common: { ...graphicDesignEn.common, ...socialCampaign2025En.common },
        content: { ...graphicDesignEn.content, ...socialCampaign2025En.content },
      },
      portfolioWorkspace: portfolioWorkspaceEn,
      taskflowDashboard: taskflowDashboardEn,
      shopsphere: shopsphereEn,
      neobankMobile: neobankMobileEn,
      insightAnalytics: insightAnalyticsEn,
      healthsync: healthsyncEn,
      travelMate: travelMateEn,
      learnhubLms: learnhubLmsEn,
      luminaStudio: luminaStudioEn,
      novaCoffee: novaCoffeeEn,
      greenleafMarket: greenleafMarketEn,
    },
  },
  fr: {
    ...fr,
    projects: {
      consultify: consultifyFr,
      designSystem: designSystemFr,
      apexBrandKit: {
        ...graphicDesignFr,
        ...apexBrandKitFr,
        common: { ...graphicDesignFr.common, ...apexBrandKitFr.common },
        content: { ...graphicDesignFr.content, ...apexBrandKitFr.content },
      },
      eventVisualIdentity: {
        ...graphicDesignFr,
        ...eventVisualIdentityFr,
        common: { ...graphicDesignFr.common, ...eventVisualIdentityFr.common },
        content: { ...graphicDesignFr.content, ...eventVisualIdentityFr.content },
      },
      socialCampaign2025: {
        ...graphicDesignFr,
        ...socialCampaign2025Fr,
        common: { ...graphicDesignFr.common, ...socialCampaign2025Fr.common },
        content: { ...graphicDesignFr.content, ...socialCampaign2025Fr.content },
      },
      portfolioWorkspace: portfolioWorkspaceFr,
      taskflowDashboard: taskflowDashboardFr,
      shopsphere: shopsphereFr,
      neobankMobile: neobankMobileFr,
      insightAnalytics: insightAnalyticsFr,
      healthsync: healthsyncFr,
      travelMate: travelMateFr,
      learnhubLms: learnhubLmsFr,
      luminaStudio: {
        ...luminaStudioFr,
        content: {
          ...luminaStudioFr.content,
          ...luminaStudioExtraFr,
        },
      },
      novaCoffee: novaCoffeeFr,
      greenleafMarket: greenleafMarketFr,
    },
  },
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

  for (let index = 0; index < keys.length; index += 1) {
    const remainingPath = keys.slice(index).join('.');
    if (result && typeof result === 'object' && remainingPath in result) {
      return result[remainingPath];
    }

    const key = keys[index];
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
    if (typeof value !== 'string' || value === key) {
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

  const projectText = (project: string, value: string): string =>
    t(`projects.${project}.content.${value}`, value);

  return { t, tArray, projectText, locale };
}
