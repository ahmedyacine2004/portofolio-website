'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Check,
  History,
  FolderKanban,
  LayoutGrid,
  Quote,
  ArrowRight,
} from 'lucide-react';
import { LottiePlayer } from './lottie-player';

const logSteps = [
  { id: '01', text: 'Loading environment variables', duration: '120ms' },
  { id: '02', text: 'Connecting to database', duration: '120ms' },
  { id: '03', text: 'Initializing core modules', duration: '245ms' },
  { id: '04', text: 'Loading user preferences', duration: '312ms' },
  { id: '05', text: 'Fetching portfolio data', duration: '95ms' },
  { id: '06', text: 'Optimizing assets', duration: '428ms' },
  { id: '07', text: 'Waiting for response', duration: '20ms' },
  { id: '08', text: 'Finalizing experience', duration: '89ms' },
];

// Colors pulled directly from variables.css semantic tokens
const metricCards = [
  {
    id: 'memory',
    title: 'Memory Usage',
    value: '62%',
    sublabel: '1.2 GB / 2 GB',
    percentage: 62,
    icon: History,
    // surface-brand: #ebdffd light / rgb(117 72 253 / 15%) dark
    cardClass: 'bg-surface-brand border-purple-200 dark:border-purple-900/30',
    iconClass: 'bg-purple-200/60 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400',
    barClass: 'bg-purple-dark dark:bg-purple',
    valueClass: 'text-purple-dark dark:text-purple-light',
  },
  {
    id: 'assets',
    title: 'Assets Loaded',
    value: '81%',
    sublabel: '324 / 400',
    percentage: 81,
    icon: FolderKanban,
    // surface-success: #eaf8ef light / rgb(36 202 116 / 14%) dark
    cardClass: 'bg-surface-success border-green-200 dark:border-success-darkest/30',
    iconClass: 'bg-green-200/60 dark:bg-success-darkest/20 text-success-dark dark:text-success',
    barClass: 'bg-success-dark dark:bg-success',
    valueClass: 'text-success-dark dark:text-success',
  },
  {
    id: 'components',
    title: 'Components',
    value: '43%',
    sublabel: '860 / 2,000',
    percentage: 43,
    icon: Briefcase,
    // brand surface: #f0f6fe light / dark secondary
    cardClass: 'bg-background-secondary border-brand-light/30 dark:border-brand-dark/20',
    iconClass: 'bg-brand/10 dark:bg-brand-dark/20 text-brand-dark dark:text-brand-light',
    barClass: 'bg-brand dark:bg-brand-light',
    valueClass: 'text-brand-dark dark:text-brand-light',
  },
  {
    id: 'requests',
    title: 'Requests',
    value: '92%',
    sublabel: '46 / 50',
    percentage: 92,
    icon: LayoutGrid,
    // surface-warning: #fef9e9 light / rgb(255 153 0 / 14%) dark
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
          <span>Skip</span>
          <ArrowRight className="size-2.5" />
        </button>
      )}

      {/* Main Centered Container */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-2.5 md:gap-3">
        {/* Lottie Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center py-1"
        >
          <LottiePlayer />
        </motion.div>

        {/* System Logs + Developer Wisdom */}
        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-2 md:gap-2.5">
          {/* Terminal Logs Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="flex flex-col justify-center rounded-xs border border-border bg-card p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <div className="flex flex-col gap-1 font-mono text-[9px] md:text-[10px]">
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
                      <span className="text-[9px] text-foreground-disabled select-none shrink-0">
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
                    <span className="text-[9px] text-foreground-disabled select-none shrink-0 ml-1.5">
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
            className="flex flex-col justify-between rounded-xs border border-brand/20 dark:border-brand-dark/20 bg-background-secondary p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          >
            <div>
              <div className="inline-flex items-center gap-1 rounded-xs bg-surface-brand px-1.5 py-0.5 text-[9px] font-semibold text-brand-dark dark:text-brand">
                <Quote className="size-2.5" />
                <span>Developer Wisdom</span>
              </div>

              <blockquote className="mt-2 text-xs font-bold text-foreground leading-snug tracking-tight">
                &ldquo;Code is like humor. When you have to explain it, it&apos;s bad.&rdquo;
              </blockquote>
            </div>

            <div className="mt-2 text-[9px] font-medium text-foreground-tertiary">- Cory House</div>
          </motion.div>
        </div>

        {/* 4 Metric Cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2"
        >
          {metricCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + idx * 0.03 }}
                className={`flex flex-col justify-between rounded-xs border p-2.5 shadow-xs ${card.cardClass}`}
              >
                <div>
                  <div className={`mb-1.5 inline-flex p-1 rounded-xs ${card.iconClass}`}>
                    <Icon className="size-3" strokeWidth={2} />
                  </div>

                  <div
                    className={`text-lg md:text-xl font-extrabold tracking-tight leading-none ${card.valueClass}`}
                  >
                    {card.value}
                  </div>

                  <div className="mt-1 text-[9px] font-medium text-foreground-tertiary">
                    {card.title}
                  </div>
                  <div className="text-[9px] font-semibold text-foreground-secondary">
                    {card.sublabel}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
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
