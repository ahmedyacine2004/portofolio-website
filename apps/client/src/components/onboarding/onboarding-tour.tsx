'use client';

import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';

const TOUR_STORAGE_KEY = 'portfolio-onboarding-complete';
const SPOTLIGHT_PADDING = 10;
const SPOTLIGHT_RADIUS = 6;

type TourStep = {
  target: string;
  title: string;
  description: string;
};

type SpotlightRect = {
  top: number;
  left: number;
  width: number;
  height: number;
  radius: number;
};

const TOUR_STEPS: TourStep[] = [
  {
    target: 'header-navigation',
    title: 'Move through the workspace',
    description: 'Use the compact navigation to explore each part of the portfolio.',
  },
  {
    target: 'header-search',
    title: 'Find anything quickly',
    description: 'Search projects, files, pages, and commands from one place.',
  },
  {
    target: 'sidebar-navigation',
    title: 'Your visual index',
    description: 'The sidebar keeps the main destinations close while you browse.',
  },
  {
    target: 'theme-toggle',
    title: 'Set the atmosphere',
    description: 'Switch between light and dark mode whenever the mood changes.',
  },
  {
    target: 'status-bar',
    title: 'A little system context',
    description: 'The status bar keeps your current page, time, and workspace signals in view.',
  },
];

function getVisibleTarget(target: string): HTMLElement | null {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(`[data-tour-target="${target}"]`),
  );

  return (
    elements.find((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    }) ?? null
  );
}

function measureTarget(target: string): SpotlightRect | null {
  const element = getVisibleTarget(target);
  if (!element) return null;

  const rect = element.getBoundingClientRect();
  const padding = SPOTLIGHT_PADDING;
  const verticalPadding =
    target === 'header-search' || target === 'theme-toggle' || target === 'status-bar'
      ? 4
      : target === 'sidebar-navigation'
        ? 6
        : padding;
  const horizontalPadding =
    target === 'header-search' || target === 'theme-toggle' || target === 'status-bar'
      ? 4
      : target === 'sidebar-navigation'
        ? 6
        : padding;

  return {
    top: Math.max(8, rect.top - verticalPadding),
    left: Math.max(8, rect.left - horizontalPadding),
    width: Math.min(window.innerWidth - 16, rect.width + horizontalPadding * 2),
    height: Math.min(window.innerHeight - 16, rect.height + verticalPadding * 2),
    radius: SPOTLIGHT_RADIUS,
  };
}

function getTooltipPosition(rect: SpotlightRect | null, target: string) {
  const viewportWidth = typeof window === 'undefined' ? 1024 : window.innerWidth;
  const viewportHeight = typeof window === 'undefined' ? 768 : window.innerHeight;
  const tooltipWidth = Math.min(320, viewportWidth - 32);

  if (!rect) {
    return {
      left: Math.max(16, (viewportWidth - tooltipWidth) / 2),
      top: Math.max(16, (viewportHeight - 180) / 2),
    };
  }

  if (
    target === 'sidebar-navigation' &&
    rect.left + rect.width + tooltipWidth + 18 <= viewportWidth
  ) {
    return {
      left: rect.left + rect.width + 18,
      top: Math.max(16, Math.min(rect.top + 48, viewportHeight - 196)),
    };
  }

  const left = Math.max(
    16,
    Math.min(rect.left + rect.width / 2 - tooltipWidth / 2, viewportWidth - tooltipWidth - 16),
  );
  const below = rect.top + rect.height + 18;
  const top = below + 180 <= viewportHeight ? below : Math.max(16, rect.top - 198);

  return { left, top };
}

export function OnboardingTour({ enabled }: { enabled: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [spotlight, setSpotlight] = useState<SpotlightRect | null>(null);

  const step = TOUR_STEPS[stepIndex];
  const tooltipPosition = useMemo(
    () => getTooltipPosition(spotlight, step.target),
    [spotlight, step.target],
  );

  useEffect(() => {
    const shouldResetTour = new URLSearchParams(window.location.search).get('tour') === 'reset';

    if (shouldResetTour) {
      window.localStorage.removeItem(TOUR_STORAGE_KEY);
      window.history.replaceState({}, '', window.location.pathname);
    }

    if (
      !enabled ||
      !window.matchMedia('(min-width: 1024px)').matches ||
      (!shouldResetTour && window.localStorage.getItem(TOUR_STORAGE_KEY) === 'true')
    ) {
      return;
    }

    const frame = window.requestAnimationFrame(() => setIsOpen(true));
    return () => window.cancelAnimationFrame(frame);
  }, [enabled]);

  useEffect(() => {
    if (!isOpen) return;

    const handleViewportChange = () => {
      if (!window.matchMedia('(min-width: 1024px)').matches) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleViewportChange);
    return () => window.removeEventListener('resize', handleViewportChange);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    let frame = 0;
    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => setSpotlight(measureTarget(step.target)));
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
      observer.disconnect();
    };
  }, [isOpen, step.target]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finishTour();
      if (event.key === 'ArrowRight') goToStep(stepIndex + 1);
      if (event.key === 'ArrowLeft') goToStep(stepIndex - 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, stepIndex]);

  function finishTour() {
    window.localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    setIsOpen(false);
  }

  function goToStep(nextIndex: number) {
    if (nextIndex < 0) return;
    if (nextIndex >= TOUR_STEPS.length) {
      finishTour();
      return;
    }
    setSpotlight(measureTarget(TOUR_STEPS[nextIndex].target));
    setStepIndex(nextIndex);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10050]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="onboarding-tour-title"
        >
          {spotlight && (
            <motion.div
              className="pointer-events-none absolute border border-brand/90 bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.68),0_0_28px_var(--color-brand)]"
              initial={{ ...spotlight, borderRadius: spotlight.radius }}
              animate={{ ...spotlight, borderRadius: spotlight.radius }}
              transition={{ type: 'spring', stiffness: 250, damping: 28, mass: 0.8 }}
              style={{
                borderRadius: spotlight.radius,
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.68), 0 0 28px var(--color-brand)',
              }}
              onClick={finishTour}
            >
              <motion.div
                className="absolute inset-0 rounded-[inherit] border border-foreground/20"
                animate={{ opacity: [0.35, 0.75, 0.35], scale: [1, 1.012, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          )}

          <motion.div
            className="pointer-events-auto absolute z-10 w-[min(320px,calc(100vw-32px))] rounded-[6px] border border-border/70 bg-background/95 p-4 text-foreground shadow-2xl backdrop-blur-xl"
            initial={{
              opacity: 0,
              scale: 0.97,
              left: tooltipPosition.left,
              top: tooltipPosition.top,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              left: tooltipPosition.left,
              top: tooltipPosition.top,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-light">
                  Portfolio tour
                </p>
                <h2
                  id="onboarding-tour-title"
                  className="font-beni text-[18px] leading-[1.05] tracking-normal"
                >
                  {step.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={finishTour}
                aria-label="Close tour"
                className="text-foreground-secondary transition-colors hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="mb-4 text-[11px] leading-relaxed text-foreground-secondary">
              {step.description}
            </p>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] tabular-nums text-foreground-secondary">
                {stepIndex + 1} of {TOUR_STEPS.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={finishTour}
                  className="text-[10px] text-foreground-secondary transition-colors hover:text-foreground"
                >
                  Skip tour
                </button>
                {stepIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => goToStep(stepIndex - 1)}
                    className="flex items-center gap-1 rounded-sm border border-border px-2.5 py-1.5 text-[10px] text-foreground-secondary transition-colors hover:border-foreground/30 hover:text-foreground"
                  >
                    <ArrowLeft className="size-3" /> Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => goToStep(stepIndex + 1)}
                  className="flex items-center gap-1 rounded-sm bg-brand px-3 py-1.5 text-[10px] font-semibold text-primary-foreground transition-colors hover:bg-brand-light"
                >
                  {stepIndex === TOUR_STEPS.length - 1 ? (
                    <Check className="size-3" />
                  ) : (
                    <ArrowRight className="size-3" />
                  )}
                  {stepIndex === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
