'use client';

import { useTranslation } from '@/hooks/use-translation';
import { motion } from 'framer-motion';
import { ArrowLeft, FolderOpen, Home, Search, Zap } from 'lucide-react';
import Link from 'next/link';
import { Lottie404Player } from './lottie-404-player';

function NotFoundSuggestions() {
  const { t } = useTranslation();
  return [
    {
      id: 'suggestion-home',
      icon: Home,
      label: t('notFound.returnHome'),
    },
    {
      id: 'suggestion-back',
      icon: ArrowLeft,
      label: t('notFound.goBack'),
    },
    {
      id: 'suggestion-url',
      icon: Search,
      label: t('notFound.checkUrl'),
    },
  ];
}

export function NotFoundPage() {
  const { t } = useTranslation();
  const suggestions = NotFoundSuggestions();
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      {/* Centered card wrapper — ~60% of viewport width */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex w-full max-w-[760px] gap-3 rounded-sm bg-background
                   shadow-gray-300 dark:shadow-[0_0_12px_rgba(255,255,255,0.06)]"
        style={{ padding: '20px' }}
      >
        {/* ── Left column ── */}
        <motion.div
          className="flex min-w-0 flex-[1.1] flex-col justify-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.1 },
            },
          }}
        >
          {/* Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
            }}
          >
            <span className="inline-flex items-center gap-1 rounded-[2px] bg-surface-brand px-2 py-0.5 text-[8px] font-semibold text-primary">
              <Zap className="size-2" />
              {t('notFound.badge')}
            </span>
          </motion.div>

          {/* Big 404 text */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="font-beni text-[64px] leading-[0.85] tracking-tight text-primary mt-2 select-none"
            aria-label="404"
          >
            {t('notFound.code')}
          </motion.p>

          {/* Heading + copy */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
            }}
            className="mt-3 flex flex-col gap-1"
          >
            <h1 className="font-inter text-[15px] font-bold leading-none text-foreground">
              {t('notFound.title')}
            </h1>
            <p className="max-w-[220px] text-[8px] leading-relaxed text-foreground-secondary">
              {t('notFound.description')}
            </p>
          </motion.div>

          {/* Suggestions list */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
            }}
            className="mt-4 flex flex-col gap-1"
          >
            <p className="text-[8px] font-semibold uppercase tracking-wider text-foreground-tertiary mb-0.5">
              {t('notFound.tryOne')}
            </p>
            {suggestions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.28, delay: 0.3 + idx * 0.06 }}
                  className="flex items-center gap-2 rounded-xs bg-background px-2.5 py-1.5
                             shadow-gray-300 dark:shadow-[0_0_4px_rgba(255,255,255,0.03)]"
                >
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-xs bg-surface-brand text-primary">
                    <Icon className="size-2.5" strokeWidth={2} />
                  </span>
                  <span className="text-[8px] font-medium text-foreground-secondary">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
            }}
            className="mt-5 flex items-center gap-2"
          >
            <Link
              href="/"
              id="not-found-go-home"
              className="inline-flex items-center gap-1.5 rounded-xs bg-primary px-3 py-1.5 text-[8px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Home className="size-2.5" />
              {t('notFound.goToHome')}
            </Link>
            <Link
              href="/projects"
              id="not-found-explore-projects"
              className="inline-flex items-center gap-1.5 rounded-xs bg-background px-3 py-1.5 text-[8px] font-semibold text-foreground transition-colors hover:bg-muted
                         shadow-gray-300 dark:shadow-[0_0_4px_rgba(255,255,255,0.04)]"
            >
              <FolderOpen className="size-2.5" />
              {t('notFound.exploreProjects')}
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Right column — Lottie 404 ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          className="flex flex-1 items-center justify-center overflow-hidden rounded-xs bg-background-secondary
                     shadow-gray-300 dark:shadow-[0_0_8px_rgba(255,255,255,0.04)]"
        >
          <Lottie404Player className="w-full px-4 py-4" />
        </motion.div>
      </motion.div>
    </div>
  );
}
