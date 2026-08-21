'use client';

import { useTranslation } from '@/hooks/use-translation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Check,
  FolderKanban,
  History,
  LayoutGrid,
  Quote,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { LottiePlayer } from './lottie-player';

const getLogSteps = (t: any) => [
  { id: '01', text: t('loading.loadingEnv'), duration: '120ms' },
  { id: '02', text: t('loading.connectingDB'), duration: '120ms' },
  { id: '03', text: t('loading.initializingModules'), duration: '245ms' },
  { id: '04', text: t('loading.loadingPreferences'), duration: '312ms' },
  { id: '05', text: t('loading.fetchingData'), duration: '95ms' },
  { id: '06', text: t('loading.optimizingAssets'), duration: '428ms' },
  { id: '07', text: t('loading.waitingResponse'), duration: '20ms' },
  { id: '08', text: t('loading.finalizingExperience'), duration: '89ms' },
];

const getMetricCards = (t: any) => [
  {
    id: 'memory',
    title: t('loading.memoryUsage'),
    value: '62%',
    sublabel: t('loading.memoryValue'),
    percentage: 62,
    icon: History,
    cardClass: 'bg-surface-brand border-purple-200 dark:border-purple-900/30',
    iconClass: 'bg-purple-200/60 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400',
    barClass: 'bg-purple-dark dark:bg-purple',
    valueClass: 'text-purple-dark dark:text-purple-light',
  },
  {
    id: 'assets',
    title: t('loading.assetsLoaded'),
    value: '81%',
    sublabel: t('loading.assetsValue'),
    percentage: 81,
    icon: FolderKanban,
    cardClass: 'bg-surface-success border-green-200 dark:border-success-darkest/30',
    iconClass: 'bg-green-200/60 dark:bg-success-darkest/20 text-success-dark dark:text-success',
    barClass: 'bg-success-dark dark:bg-success',
    valueClass: 'text-success-dark dark:text-success',
  },
  {
    id: 'components',
    title: t('loading.components'),
    value: '43%',
    sublabel: t('loading.componentsValue'),
    percentage: 43,
    icon: Briefcase,
    cardClass: 'bg-background-secondary border-brand-light/30 dark:border-brand-dark/20',
    iconClass: 'bg-brand/10 dark:bg-brand-dark/20 text-brand-dark dark:text-brand-light',
    barClass: 'bg-brand dark:bg-brand-light',
    valueClass: 'text-brand-dark dark:text-brand-light',
  },
  {
    id: 'requests',
    title: t('loading.requests'),
    value: '92%',
    sublabel: t('loading.requestsValue'),
    percentage: 92,
    icon: LayoutGrid,
    cardClass: 'bg-surface-warning border-yellow-200 dark:border-warning/20',
    iconClass: 'bg-yellow-200/60 dark:bg-warning/10 text-warning-dark dark:text-warning-light',
    barClass: 'bg-warning-dark dark:bg-warning-light',
    valueClass: 'text-warning-dark dark:text-warning',
  },
];

interface LoadingPageProps {
  onSkip?: () => void;
  isAnimatedSequence?: boolean;
}

export function LoadingPage({ onSkip, isAnimatedSequence = true }: LoadingPageProps) {
  const { t } = useTranslation();
  const logSteps = getLogSteps(t);
  const metricCards = getMetricCards(t);
  const [completedStepIndex, setCompletedStepIndex] = useState(
    isAnimatedSequence ? 0 : logSteps.length,
  );

  useEffect(() => {
    if (!isAnimatedSequence) return;

    const interval = setInterval(() => {
      setCompletedStepIndex((prev) => {
        if (prev < logSteps.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 360);

    return () => clearInterval(interval);
  }, [isAnimatedSequence]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center p-3 md:p-4 bg-background overflow-hidden">
      {/* Skip Button */}
      {onSkip && (
        <button
          type="button"
          onClick={onSkip}
          className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-xs border border-border bg-card/90 px-2 py-1 text-[10px] font-medium text-foreground-secondary transition-colors hover:bg-muted hover:text-foreground shadow-xs"
        >
          <span>{t('loading.skip')}</span>
          <ArrowRight className="size-2.5" />
        </button>
      )}

      {/* Main Centered Container */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-1.5 md:gap-2 lg:gap-3">
        {/* Lottie Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center py-0.5 md:py-1 lg:py-1"
        >
          <LottiePlayer />
        </motion.div>

        {/* System Logs + Developer Wisdom */}
        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-x-1.5 gap-y-1.5 md:gap-x-2.5 md:gap-y-2.5">
          {/* Terminal Logs Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="flex flex-col justify-center rounded-[4px] border border-border bg-card p-1 md:p-1.5 lg:rounded-xs lg:p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <div className="flex flex-col gap-0 md:gap-0.5 lg:gap-1 font-mono text-[8px] md:text-[9px] lg:text-[10px]">
              {logSteps.map((step, idx) => {
                const isDone = idx < completedStepIndex;
                const isCurrent = idx === completedStepIndex;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.08 + idx * 0.025 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[8px] lg:text-[9px] text-foreground-disabled select-none shrink-0">
                        {step.id}
                      </span>
                      {isDone ? (
                        <Check className="size-2.5 text-success shrink-0" strokeWidth={2.5} />
                      ) : isCurrent ? (
                        <div className="size-2.5 flex items-center justify-center shrink-0">
                          <span className="size-1 rounded-full bg-brand animate-ping" />
                        </div>
                      ) : (
                        <div className="size-2.5 shrink-0" />
                      )}
                      <span
                        className={`font-semibold truncate transition-colors ${
                          isDone
                            ? 'text-foreground'
                            : isCurrent
                              ? 'text-brand'
                              : 'text-foreground-disabled'
                        }`}
                      >
                        {step.text}
                      </span>
                    </div>
                    <span className="text-[8px] lg:text-[9px] text-foreground-disabled select-none shrink-0 ml-1.5">
                      {step.duration}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Developer Wisdom Card — uses brand surface */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="flex flex-col justify-between rounded-[4px] border border-brand/20 dark:border-brand-dark/20 bg-background-secondary p-1.5 md:p-2 lg:rounded-xs lg:p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          >
            <div>
              <div className="inline-flex items-center gap-1 rounded-xs bg-surface-brand px-1.5 py-0.5 text-[8px] lg:text-[9px] font-semibold text-brand-dark dark:text-brand">
                <Quote className="size-2.5" />
                <span>{t('loading.developerWisdom')}</span>
              </div>

              <blockquote className="mt-1 text-[10px] md:text-[11px] lg:mt-2 lg:text-xs font-bold text-foreground leading-snug tracking-tight">
                &ldquo;Code is like humor. When you have to explain it, it&apos;s bad.&rdquo;
              </blockquote>
            </div>

            <div className="mt-1 text-[8px] lg:mt-2 lg:text-[9px] font-medium text-foreground-tertiary">
              - Cory House
            </div>
          </motion.div>
        </div>

        {/* 4 Metric Cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="grid w-full grid-cols-2 sm:grid-cols-4 gap-x-1.5 gap-y-1 md:gap-x-2 md:gap-y-1.5"
        >
          {metricCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + idx * 0.03 }}
                className={`flex flex-col justify-between rounded-[4px] border p-1 md:p-1.5 lg:rounded-xs lg:p-2.5 shadow-xs ${card.cardClass}`}
              >
                <div>
                  <div className={`mb-1 inline-flex p-0.5 md:p-1 rounded-xs ${card.iconClass}`}>
                    <Icon className="size-2.5 md:size-3" strokeWidth={2} />
                  </div>

                  <div
                    className={`text-base md:text-lg lg:text-xl font-extrabold tracking-tight leading-none ${card.valueClass}`}
                  >
                    {card.value}
                  </div>

                  <div className="mt-0.5 text-[8px] md:text-[9px] font-medium text-foreground-tertiary">
                    {card.title}
                  </div>
                  <div className="text-[8px] md:text-[9px] font-semibold text-foreground-secondary">
                    {card.sublabel}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-1 h-0.5 md:h-1 w-full overflow-hidden rounded-full bg-foreground/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${card.percentage}%` }}
                    transition={{ duration: 0.6, delay: 0.25 + idx * 0.06, ease: 'easeOut' }}
                    className={`h-full rounded-full ${card.barClass}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
