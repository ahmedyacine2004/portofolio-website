'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useAboutTabsStore } from '@/stores/about-tabs.store';

type AboutTabBarProps = {
  actionButton?: ReactNode;
};

export function AboutTabBar({ actionButton }: AboutTabBarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { openTabs, activeHref, setActiveHref, closeTab } = useAboutTabsStore();

  useEffect(() => {
    if (pathname.startsWith('/about')) {
      setActiveHref(pathname);
    }
  }, [pathname, setActiveHref]);

  return (
    <div className="flex shrink-0 items-center justify-between gap-2 px-2">
      {/* Scrollable Tabs List */}
      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
        {openTabs.map((tab) => {
          const isActive =
            pathname === tab.href || (activeHref === tab.href && pathname === tab.href);

          return (
            <div
              key={tab.href}
              onClick={() => {
                if (!isActive) {
                  router.push(tab.href);
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  router.push(tab.href);
                }
              }}
              className={`group flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-[3px] px-2.5 transition-all select-none ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium shadow-2xs'
                  : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
              }`}
            >
              {/* File Icon */}
              <Image
                src={tab.icon}
                alt=""
                width={12}
                height={12}
                className="size-3 shrink-0 object-contain"
                aria-hidden="true"
              />

              {/* Label */}
              <span className="text-[9px] leading-none whitespace-nowrap">{tab.label}</span>

              {/* Close Button */}
              <button
                type="button"
                aria-label={`Close ${tab.label}`}
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.href, router.push);
                }}
                className={`ml-1 flex size-3.5 items-center justify-center rounded-xs transition-colors ${
                  isActive
                    ? 'text-primary hover:bg-primary/20'
                    : 'text-muted-foreground opacity-60 hover:opacity-100 hover:bg-muted-foreground/20 hover:text-foreground'
                }`}
              >
                <X className="size-2.5" strokeWidth={2.2} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Optional Page Action Button (e.g. Preview Code, Expand DOCX, Expand PDF) */}
      {actionButton && <div className="shrink-0 ml-2">{actionButton}</div>}
    </div>
  );
}
