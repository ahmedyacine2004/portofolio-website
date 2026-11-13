'use client';

import { ArrowUpRight, Code2, Languages, MousePointer2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { PointerEvent } from 'react';

import FacebookIcon from '@/assets/icons/facebook.svg';
import GithubIcon from '@/assets/icons/GithubIcon.svg';
import InstagramIcon from '@/assets/icons/instagram.svg';
import LinkedinIcon from '@/assets/icons/LinkedinIcon.svg';
import TiktokIcon from '@/assets/icons/Tiktok.svg';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useTranslation } from '@/hooks/use-translation';
import { useLanguageStore } from '@/stores/language.store';

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abbane-ahmed-yassine/',
    icon: LinkedinIcon,
    iconClassName: 'brightness-0 invert',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/ahmedyacine2004',
    icon: GithubIcon,
    iconClassName: 'brightness-0 invert',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/ahmed.yassine.abbane',
    icon: FacebookIcon,
    iconClassName: 'brightness-0 invert',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/iam_lhamdane/',
    icon: InstagramIcon,
    iconClassName: 'brightness-0 invert',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@iam_lhamdane',
    icon: TiktokIcon,
    iconClassName: 'mix-blend-screen',
  },
] as const;

export function ExperienceChooser() {
  const { locale, t } = useTranslation();
  const setLocale = useLanguageStore((state) => state.setLocale);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 24 });
  const glowX = useTransform(smoothX, [-0.5, 0.5], ['-4%', '4%']);
  const glowY = useTransform(smoothY, [-0.5, 0.5], ['-4%', '4%']);
  const artX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const artY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <main
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative isolate grid h-dvh grid-rows-[auto_1fr_auto] overflow-hidden bg-background px-2 py-2 text-foreground sm:px-4 sm:py-4"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
      />
      <motion.div
        aria-hidden="true"
        style={{ left: glowX, top: glowY }}
        className="pointer-events-none absolute -left-[4%] -top-[4%] -z-10 size-[20rem] rounded-full bg-primary/10 blur-[100px] sm:size-[32rem] sm:blur-[130px] lg:size-[40rem]"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: artX, y: artY }}
        className="pointer-events-none absolute right-[8%] top-[15%] -z-10 hidden size-64 rounded-full border border-primary/10 lg:block"
      >
        <div className="absolute inset-5 rounded-full border border-primary/15" />
        <div className="absolute inset-12 rounded-full border border-primary/20" />
        <motion.div
          className="absolute left-1/2 top-[-6px] size-3 rounded-full bg-primary shadow-[0_0_24px_var(--color-primary)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
          style={{ transformOrigin: '0 134px' }}
        />
      </motion.div>

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-2.5 sm:px-8 lg:px-12">
        <Link
          href="/"
          aria-label={t('experienceChooser.homeAriaLabel')}
          className="flex items-center"
        >
          <Image
            src="/branding/logo.png"
            alt="Ahmed Yassine Abbane"
            width={34}
            height={24}
            priority
            className="h-6 w-auto object-contain"
          />
        </Link>
        <span className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground-tertiary sm:flex">
          <span className="size-1.5 rounded-full bg-success" />
          Ahmed Yassine Abbane
        </span>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[10px] text-foreground-tertiary sm:inline">
            PORTFOLIO · 2026
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label={t(locale === 'en' ? 'header.switchToFrench' : 'header.switchToEnglish')}
              title={t(locale === 'en' ? 'header.switchToFrench' : 'header.switchToEnglish')}
              onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}
              className="flex size-8 items-center justify-center rounded-sm bg-primary text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/80"
            >
              <Languages className="size-[18px]" strokeWidth={1.8} />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto grid min-h-0 w-full max-w-7xl grid-rows-[auto_minmax(26.5rem,1fr)] gap-2 px-5 py-2 sm:gap-4 sm:px-8 sm:py-4 md:grid-rows-[auto_minmax(0,1fr)] md:py-4 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-1.5 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-[10px]">
            <Sparkles className="size-3" /> {t('experienceChooser.eyebrow')}
          </p>
          <h1 className="font-beni text-[clamp(2.15rem,5vw,4.25rem)] uppercase leading-[0.84] tracking-tight">
            {t('experienceChooser.titleLead')}{' '}
            <span className="text-primary">{t('experienceChooser.titleAccent')}</span>
          </h1>
          <p className="mt-2 max-w-xl text-[11px] leading-4 text-foreground-secondary sm:text-xs sm:leading-5">
            {t('experienceChooser.description')}
          </p>
        </motion.div>

        <div className="grid min-h-0 grid-rows-2 gap-2.5 self-center md:grid-cols-2 md:grid-rows-1 md:gap-4 md:h-[clamp(15rem,44vh,24rem)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-[13rem] md:min-h-0"
          >
            <Link
              href="/simple"
              className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-[8px] border border-border bg-card/70 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-card sm:p-4 lg:p-5"
            >
              <div className="absolute -right-10 -top-10 size-36 rounded-full bg-primary/10 blur-3xl transition-colors group-hover:bg-primary/20" />
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-foreground-tertiary">
                  01 <span className="text-primary">/</span> {t('experienceChooser.essentials')}
                </span>
                <ArrowUpRight className="size-4 text-foreground-tertiary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <div className="relative flex min-h-0 flex-1 items-center justify-center py-2">
                <div className="relative w-[min(78%,320px)] overflow-hidden rounded-md border border-border/80 bg-background shadow-lg transition-transform duration-500 group-hover:scale-[1.03] group-hover:-rotate-1">
                  <div className="flex h-5 items-center gap-1 border-b border-border/70 px-2">
                    <span className="size-1.5 rounded-full bg-danger/70" />
                    <span className="size-1.5 rounded-full bg-warning/70" />
                    <span className="size-1.5 rounded-full bg-success/70" />
                    <span className="ml-2 h-1 w-12 rounded-full bg-foreground/10" />
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-2.5 sm:py-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <MousePointer2 className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="h-2 w-2/3 rounded-full bg-foreground/75" />
                      <div className="mt-1.5 h-1 w-full rounded-full bg-foreground/15" />
                      <div className="mt-1 h-1 w-3/4 rounded-full bg-foreground/10" />
                    </div>
                    <div className="h-5 w-12 rounded-sm bg-primary" />
                  </div>
                </div>
                <div className="absolute right-[8%] top-1/2 rounded-full border border-border bg-background/90 p-2 text-primary shadow-md">
                  <MousePointer2 className="size-3.5" />
                </div>
              </div>
              <div className="relative flex shrink-0 items-end justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="font-beni text-2xl uppercase leading-none sm:text-3xl">
                    {t('experienceChooser.simpleTitle')}
                  </h2>
                  <p className="mt-1 text-[10px] leading-4 text-foreground-secondary sm:text-[11px]">
                    {t('experienceChooser.simpleDescription')}
                  </p>
                </div>
                <span className="mb-0.5 hidden shrink-0 font-mono text-[9px] uppercase tracking-wider text-foreground-tertiary sm:inline">
                  {t('experienceChooser.quickTour')}
                </span>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-[13rem] md:min-h-0"
          >
            <Link
              href="/studio"
              className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-[8px] border border-primary/30 bg-surface-brand/40 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-surface-brand/70 sm:p-4 lg:p-5"
            >
              <div className="absolute -bottom-16 -right-8 size-44 rounded-full bg-primary/10 blur-3xl transition-colors group-hover:bg-primary/20" />
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-foreground-tertiary">
                  02 <span className="text-primary">/</span> {t('experienceChooser.developerMode')}
                </span>
                <ArrowUpRight className="size-4 text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              <div className="relative flex min-h-0 flex-1 items-center justify-center py-2">
                <div className="w-[min(78%,320px)] overflow-hidden rounded-md border border-border/80 bg-background shadow-lg transition-transform duration-500 group-hover:scale-[1.03] group-hover:rotate-1">
                  <div className="flex h-5 items-center gap-1.5 border-b border-border/70 px-2">
                    <span className="size-1.5 rounded-full bg-danger/70" />
                    <span className="size-1.5 rounded-full bg-warning/70" />
                    <span className="size-1.5 rounded-full bg-success/70" />
                    <span className="ml-auto font-mono text-[7px] text-foreground-tertiary">
                      portfolio.tsx
                    </span>
                  </div>
                  <div className="grid grid-cols-[20px_1fr] gap-x-2 px-2.5 py-2 font-mono text-[8px] leading-[1.55] sm:py-2.5">
                    <span className="text-foreground-tertiary">01</span>
                    <span>
                      <span className="text-purple">const</span>{' '}
                      <span className="text-primary">curiosity</span> ={' '}
                      <span className="text-success">true</span>;
                    </span>
                    <span className="text-foreground-tertiary">02</span>
                    <span className="text-foreground/70">{`// ${t('experienceChooser.codeComment')}`}</span>
                    <span className="text-foreground-tertiary">03</span>
                    <span>
                      <span className="text-purple">explore</span>(
                      <span className="text-warning">&quot;everything&quot;</span>);
                    </span>
                  </div>
                </div>
                <div className="absolute right-[8%] top-1/2 rounded-full border border-primary/30 bg-background/90 p-2 text-primary shadow-md">
                  <Code2 className="size-3.5" />
                </div>
              </div>
              <div className="relative flex shrink-0 items-end justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="font-beni text-2xl uppercase leading-none sm:text-3xl">
                    {t('experienceChooser.studioTitle')}
                  </h2>
                  <p className="mt-1 text-[10px] leading-4 text-foreground-secondary sm:text-[11px]">
                    {t('experienceChooser.studioDescription')}
                  </p>
                </div>
                <span className="mb-0.5 hidden shrink-0 font-mono text-[9px] uppercase tracking-wider text-primary sm:inline">
                  {t('experienceChooser.deepDive')}
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      <footer className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-2 text-[9px] text-foreground-tertiary sm:px-8 sm:text-[10px] lg:px-12">
        <span>Ahmed Yassine Abbane · {t('experienceChooser.footerRole')}</span>
        <nav
          aria-label={t('experienceChooser.socialLinksLabel')}
          className="flex items-center gap-1.5"
        >
          {SOCIAL_LINKS.map(({ label, href, icon, iconClassName }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="flex size-7 aspect-square items-center justify-center rounded-sm border border-primary/40 bg-primary p-1.5 text-primary-foreground shadow-sm transition-colors hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Image
                src={icon}
                alt=""
                width={16}
                height={16}
                className={`size-4 ${iconClassName}`}
              />
            </a>
          ))}
        </nav>
      </footer>
    </main>
  );
}
