import { create } from 'zustand';
import {
  ABOUT_FILES_REGISTRY,
  ABOUT_ROOT_FILE,
  findAboutFileByHref,
  type AboutFile,
} from '@/lib/utils/about-files';

type AboutTabsState = {
  openTabs: AboutFile[];
  activeHref: string;

  openTab: (file: AboutFile) => void;
  closeTab: (href: string, routerPush?: (href: string) => void) => void;
  setActiveHref: (href: string) => void;
  closeOtherTabs: (href: string) => void;
  closeAllTabs: (routerPush?: (href: string) => void) => void;
};

export const useAboutTabsStore = create<AboutTabsState>((set, get) => ({
  openTabs: [ABOUT_ROOT_FILE],
  activeHref: '/about',

  openTab: (file) => {
    set((state) => {
      const exists = state.openTabs.some((tab) => tab.href === file.href);
      const openTabs = exists ? state.openTabs : [...state.openTabs, file];

      return {
        openTabs,
        activeHref: file.href,
      };
    });
  },

  closeTab: (href, routerPush) => {
    const { openTabs, activeHref } = get();
    const index = openTabs.findIndex((tab) => tab.href === href);

    if (index === -1) return;

    const newOpenTabs = openTabs.filter((tab) => tab.href !== href);
    const wasActive = activeHref === href;

    if (newOpenTabs.length === 0) {
      // If closing last tab, open root about page
      set({
        openTabs: [ABOUT_ROOT_FILE],
        activeHref: ABOUT_ROOT_FILE.href,
      });

      if (routerPush) {
        routerPush(ABOUT_ROOT_FILE.href);
      }

      return;
    }

    if (wasActive) {
      const nextIndex = Math.min(index, newOpenTabs.length - 1);
      const nextTab = newOpenTabs[nextIndex];

      set({
        openTabs: newOpenTabs,
        activeHref: nextTab.href,
      });

      if (routerPush) {
        routerPush(nextTab.href);
      }
    } else {
      set({
        openTabs: newOpenTabs,
      });
    }
  },

  setActiveHref: (href) => {
    const { openTabs } = get();
    const exists = openTabs.some((tab) => tab.href === href);

    if (!exists) {
      const file = findAboutFileByHref(href);

      if (file) {
        set({
          openTabs: [...openTabs, file],
          activeHref: href,
        });

        return;
      }
    }

    set({ activeHref: href });
  },

  closeOtherTabs: (href) => {
    const { openTabs } = get();
    const target = openTabs.find((tab) => tab.href === href) || findAboutFileByHref(href);

    if (target) {
      set({
        openTabs: [target],
        activeHref: target.href,
      });
    }
  },

  closeAllTabs: (routerPush) => {
    set({
      openTabs: [ABOUT_ROOT_FILE],
      activeHref: ABOUT_ROOT_FILE.href,
    });

    if (routerPush) {
      routerPush(ABOUT_ROOT_FILE.href);
    }
  },
}));
