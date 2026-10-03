'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
} from 'motion/react';

export function ParallaxSection({ children, ...props }: HTMLMotionProps<'section'>) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 });
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [18, -18]);

  return (
    <motion.section ref={sectionRef} style={{ y }} {...props}>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

interface DetailsDialogProps {
  triggerLabel: string;
  title: string;
  children: ReactNode;
}

export function DetailsDialog({ triggerLabel, title, children }: DetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-primary transition-colors hover:text-primary-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        {triggerLabel}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}
        className="m-auto max-h-[min(85dvh,48rem)] w-[min(92vw,42rem)] overflow-y-auto rounded-2xl border border-border bg-card p-0 text-foreground shadow-2xl backdrop:bg-black/70"
      >
        <div className="p-5 sm:p-7">
          <div className="mb-5 flex items-start justify-between gap-4 border-b border-border pb-4">
            <h2 id={titleId} className="font-beni text-3xl uppercase leading-none sm:text-4xl">
              {title}
            </h2>
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              aria-label="Close details"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-lg text-foreground-secondary transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              ×
            </button>
          </div>
          <div className="space-y-4 text-sm leading-6 text-foreground-secondary">{children}</div>
        </div>
      </dialog>
    </>
  );
}
