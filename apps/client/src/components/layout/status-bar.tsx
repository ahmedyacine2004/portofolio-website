/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import {
  Bolt,
  BriefcaseBusiness,
  CircleAlert,
  FolderKanban,
  Globe,
  Home,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Moon,
  Settings,
  ShieldCheck,
  Sun,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { useTheme } from '../../hooks/use-theme';

import { useTranslation } from '@/hooks/use-translation';
import { useAudioStore } from '@/stores/audio.store';
import { useLanguageStore } from '@/stores/language.store';

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
import githubIconDark from '@/assets/icons/githubdarkTheme.svg';
import nestIcon from '@/assets/icons/nestjs.svg';
import nextIcon from '@/assets/icons/nextjs.svg';
import reactIcon from '@/assets/icons/react.svg';

/*
|--------------------------------------------------------------------------
| Icon Size
|--------------------------------------------------------------------------
*/

const TECHNOLOGY_ICON_SIZE = 12;

const basePageNavigation = {
  '/': { icon: Home, translationKey: 'navigation.home' },
  '/dashboard': { icon: LayoutDashboard, translationKey: 'navigation.dashboard' },
  '/about': { icon: CircleAlert, translationKey: 'navigation.about' },
  '/projects': { icon: FolderKanban, translationKey: 'navigation.projects' },
  '/services': { icon: BriefcaseBusiness, translationKey: 'navigation.projects' },
  '/experience': { icon: ShieldCheck, translationKey: 'navigation.experience' },
  '/contact': { icon: Mail, translationKey: 'navigation.contact' },
  '/messages': { icon: MessageCircle, translationKey: 'navigation.contact' },
  '/settings': { icon: Settings, translationKey: 'navigation.settings' },
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
  const locale = useLanguageStore((s) => s.locale);
  const { t } = useTranslation();
  const time = useSyncExternalStore(subscribeToClock, getClientTime, getServerTime);
  const currentPageConfig =
    basePageNavigation[pathname as keyof typeof basePageNavigation] ?? basePageNavigation['/'];
  const CurrentIcon = currentPageConfig.icon;
  const currentPageLabel = t(currentPageConfig.translationKey);
  const { theme, setTheme } = useTheme();
  const { isPlaying, togglePlayback } = useAudioStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex h-full w-full items-center justify-between rounded-xs bg-background px-3 py-1 shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
    >
      {/* ================================================================
          LEFT SIDE
          Current page + GitHub | Technologies
          ================================================================ */}

      <div className="flex min-w-0 items-center">
        {/* Current page */}
        <div className="flex shrink-0 items-center gap-1.5 rounded-xs bg-background-secondary px-2 py-1 text-[10px] leading-none text-brand transition-colors hover:text-foreground">
          <CurrentIcon className="size-3" strokeWidth={1.8} aria-hidden="true" />

          <span>{currentPageLabel}</span>
        </div>

        {/* GitHub */}
        <Link
          href="#"
          aria-label="GitHub"
          className="ml-3 flex shrink-0 items-center gap-1.5 text-[10px] leading-none text-foreground-secondary transition-colors hover:text-foreground"
        >
          <Image
            src={mounted && theme === 'dark' ? githubIconDark : githubIcon}
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
        {t('statusBar.openToOpportunities')}
      </div>

      {/* ================================================================
          RIGHT SIDE
          ================================================================ */}

      <div className="relative flex shrink-0 items-center gap-2 text-[11px] text-foreground-secondary">
        {/* Language */}
        <div className="relative">
          <div className="flex items-center gap-1 text-[10px] leading-none text-foreground-secondary cursor-not-allowed opacity-75">
            <Globe className="size-3" strokeWidth={1.8} aria-hidden="true" />
            <span>{locale === 'en' ? 'EN' : 'FR'}</span>
          </div>
        </div>

        {/* Theme */}
        {mounted ? (
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-1.5 text-[10px] leading-none transition-colors hover:text-foreground"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? (
              <Sun className="size-3" strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <Moon className="size-3" strokeWidth={1.8} aria-hidden="true" />
            )}
            <span>{theme === 'light' ? t('statusBar.light') : t('statusBar.dark')}</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-[10px] leading-none text-foreground-secondary cursor-not-allowed opacity-75">
            <Sun className="size-3" strokeWidth={1.8} aria-hidden="true" />
            <span>{t('statusBar.light')}</span>
          </div>
        )}

        {/* Volume */}
        <button
          type="button"
          onClick={() => togglePlayback()}
          className="flex items-center gap-1.5 text-[10px] leading-none transition-colors hover:text-foreground"
          aria-label={`${isPlaying ? 'Mute' : 'Unmute'} music`}
        >
          {isPlaying ? (
            <Volume2 className="size-3" strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <VolumeX className="size-3" strokeWidth={1.8} aria-hidden="true" />
          )}
          <span>{isPlaying ? t('statusBar.soundOn') : t('statusBar.soundOff')}</span>
        </button>

        {/* Quality */}
        <span className="whitespace-nowrap text-[10px] font-medium text-foreground">
          {t('statusBar.highQuality')}
        </span>

        {/* Performance */}
        <span className="flex items-center gap-1 text-[10px] font-medium text-foreground">
          <Bolt className="size-3" strokeWidth={2} aria-hidden="true" />
          <span>{t('statusBar.performance')}</span>
        </span>

        {/* Availability */}
        <span className="flex items-center gap-1 text-[10px] font-medium text-foreground">
          <span className="size-1.5 rounded-full bg-success" />
          <span>{t('statusBar.available')}</span>
        </span>

        {/* Real Time */}
        <span className="whitespace-nowrap text-[10px] font-semibold text-foreground">
          {time} GMT+1
        </span>
      </div>
    </motion.div>
  );
}
