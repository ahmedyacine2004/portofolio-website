'use client';

import {
  Bolt,
  BriefcaseBusiness,
  ChevronDown,
  CircleAlert,
  FolderKanban,
  Globe,
  Home,
  Mail,
  MessageCircle,
  Settings,
  ShieldCheck,
  Speaker,
  Sun,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

/*
|--------------------------------------------------------------------------
| Custom SVG Icons
|--------------------------------------------------------------------------
| These SVG files are imported as assets.
| Their rendered size is controlled HERE with width / height.
|--------------------------------------------------------------------------
*/

import figmaIcon from '@/assets/icons/figma.svg';
import githubIcon from '@/assets/icons/github.svg';
import nestIcon from '@/assets/icons/nestjs.svg';
import nextIcon from '@/assets/icons/nextjs.svg';
import reactIcon from '@/assets/icons/react.svg';

/*
|--------------------------------------------------------------------------
| Icon Size
|--------------------------------------------------------------------------
*/

const TECHNOLOGY_ICON_SIZE = 12;

const pageNavigation = {
  '/': { label: 'Home', icon: Home },
  '/about': { label: 'About', icon: CircleAlert },
  '/projects': { label: 'Projects', icon: FolderKanban },
  '/services': { label: 'Services', icon: BriefcaseBusiness },
  '/experience': { label: 'Experience', icon: ShieldCheck },
  '/contact': { label: 'Contact', icon: Mail },
  '/messages': { label: 'Messages', icon: MessageCircle },
  '/settings': { label: 'Settings', icon: Settings },
};

/*
|--------------------------------------------------------------------------
| Real Time
|--------------------------------------------------------------------------
*/

function getCurrentTime() {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Algiers',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
}

function subscribeToClock(callback: () => void) {
  const interval = window.setInterval(callback, 1000);

  return () => {
    window.clearInterval(interval);
  };
}

function getServerTime() {
  return '--:--';
}

function getClientTime() {
  return getCurrentTime();
}

/*
|--------------------------------------------------------------------------
| Status Bar
|--------------------------------------------------------------------------
*/

export function StatusBar() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<'EN' | 'FR'>('EN');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const time = useSyncExternalStore(subscribeToClock, getClientTime, getServerTime);
  const currentPage =
    pageNavigation[pathname as keyof typeof pageNavigation] ?? pageNavigation['/'];
  const CurrentIcon = currentPage.icon;
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-between rounded-xs bg-background px-3 py-1 shadow-xs">
      {/* ================================================================
          LEFT SIDE
          Current page + GitHub | Technologies
          ================================================================ */}

      <div className="flex min-w-0 items-center">
        {/* Current page */}
        <div className="flex shrink-0 items-center gap-1.5 rounded-xs bg-background-secondary px-2 py-1 text-[10px] leading-none text-brand transition-colors hover:text-foreground">
          <CurrentIcon className="size-3" strokeWidth={1.8} aria-hidden="true" />

          <span>{currentPage.label}</span>
        </div>

        {/* GitHub */}
        <Link
          href="#"
          aria-label="GitHub"
          className="ml-3 flex shrink-0 items-center gap-1.5 text-[10px] leading-none text-foreground-secondary transition-colors hover:text-foreground"
        >
          <Image
            src={githubIcon}
            alt=""
            width={TECHNOLOGY_ICON_SIZE}
            height={TECHNOLOGY_ICON_SIZE}
            className="size-3 object-contain"
            aria-hidden="true"
          />

          <span>GitHub</span>
        </Link>

        {/* Separator */}
        <div className="mx-4 h-3 w-px bg-border" aria-hidden="true" />

        {/* ============================================================
            TECHNOLOGIES
            ============================================================ */}

        <div className="flex items-center gap-3">
          {/* React */}
          <span className="flex shrink-0 items-center gap-1.5 text-[10px] leading-none text-foreground-secondary">
            <Image
              src={reactIcon}
              alt=""
              width={TECHNOLOGY_ICON_SIZE}
              height={TECHNOLOGY_ICON_SIZE}
              className="size-3 object-contain"
              aria-hidden="true"
            />

            <span>React</span>
          </span>

          {/* Next.js */}
          <span className="flex shrink-0 items-center gap-1.5 text-[10px] leading-none text-foreground-secondary">
            <Image
              src={nextIcon}
              alt=""
              width={TECHNOLOGY_ICON_SIZE}
              height={TECHNOLOGY_ICON_SIZE}
              className="size-3 object-contain"
              aria-hidden="true"
            />

            <span>Next.js</span>
          </span>

          {/* Figma */}
          <span className="flex shrink-0 items-center gap-1.5 text-[10px] leading-none text-foreground-secondary">
            <Image
              src={figmaIcon}
              alt=""
              width={TECHNOLOGY_ICON_SIZE}
              height={TECHNOLOGY_ICON_SIZE}
              className="size-3 object-contain"
              aria-hidden="true"
            />

            <span>Figma</span>
          </span>

          {/* NestJS */}
          <span className="flex shrink-0 items-center gap-1.5 text-[10px] leading-none text-foreground-secondary">
            <Image
              src={nestIcon}
              alt=""
              width={TECHNOLOGY_ICON_SIZE}
              height={TECHNOLOGY_ICON_SIZE}
              className="size-3 object-contain"
              aria-hidden="true"
            />

            <span>NestJS</span>
          </span>
        </div>
      </div>

      {/* ================================================================
          CENTER
          ================================================================ */}

      <div className="absolute left-1/2 hidden -translate-x-1/2 text-[10px] text-foreground-secondary md:block">
        Open to opportunities.
      </div>

      {/* ================================================================
          RIGHT SIDE
          ================================================================ */}

      <div
        className="relative flex shrink-0 items-center gap-2 text-[11px] text-foreground-secondary"
        ref={menuRef}
      >
        {/* Language */}
        <div className="relative">
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={languageMenuOpen}
            className="flex items-center gap-1 text-[10px] leading-none transition-colors hover:text-foreground"
            onClick={() => setLanguageMenuOpen((prev) => !prev)}
          >
            <Globe className="size-3" strokeWidth={1.8} aria-hidden="true" />
            <span>{language}</span>
            <ChevronDown
              className={`size-3 transition-transform ${languageMenuOpen ? 'rotate-180' : ''}`}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>

          {languageMenuOpen && (
            <div className="absolute right-0 bottom-full mb-2 w-28 rounded-sm border border-border bg-card p-2 shadow-md">
              <button
                type="button"
                onClick={() => {
                  setLanguage('EN');
                  setLanguageMenuOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-sm px-2 py-1 text-left text-[10px] transition-colors hover:bg-muted"
              >
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLanguage('FR');
                  setLanguageMenuOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-sm px-2 py-1 text-left text-[10px] transition-colors hover:bg-muted"
              >
                <span>Français</span>
              </button>
            </div>
          )}
        </div>

        {/* Theme */}
        <button
          type="button"
          className="flex items-center gap-1.5 text-[10px] leading-none transition-colors hover:text-foreground"
        >
          <Sun className="size-3" strokeWidth={1.8} aria-hidden="true" />
          <span>Light</span>
        </button>

        {/* Volume */}
        <button
          type="button"
          className="flex items-center gap-1.5 text-[10px] leading-none transition-colors hover:text-foreground"
        >
          <Speaker className="size-3" strokeWidth={1.8} aria-hidden="true" />
          <span>Sound</span>
        </button>

        {/* Quality */}
        <span className="whitespace-nowrap text-[10px] font-medium text-foreground">
          High Quality
        </span>

        {/* Performance */}
        <span className="flex items-center gap-1 text-[10px] font-medium text-foreground">
          <Bolt className="size-3" strokeWidth={2} aria-hidden="true" />
          <span>Performance</span>
        </span>

        {/* Availability */}
        <span className="flex items-center gap-1 text-[10px] font-medium text-foreground">
          <span className="size-1.5 rounded-full bg-success" />
          <span>Available</span>
        </span>

        {/* Real Time */}
        <span className="whitespace-nowrap text-[10px] font-semibold text-foreground">
          {time} GMT+1
        </span>
      </div>
    </div>
  );
}
