'use client';

import { ContactScene } from '@/components/3d/ContactScene';
import { env } from '@/lib/env';
import { submitContactForm } from '@/services/web3forms.service';
import { motion } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  MessageSquare,
  PenTool,
  Send,
  User,
  X,
} from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import FacebookIcon from '@/assets/icons/facebook.svg';
import GithubIcon from '@/assets/icons/GithubIcon.svg';
import InstagramIcon from '@/assets/icons/instagram.svg';
import LinkedinIcon from '@/assets/icons/LinkedinIcon.svg';
import TiktokIcon from '@/assets/icons/Tiktok.svg';
import { useTranslation } from '@/hooks/use-translation';

const CONTACT_METHODS = [
  {
    id: 'email',
    label: 'Email',
    value: 'ahmedyassine.dev@gmail.com',
    icon: Mail,
    href: 'mailto:ahmedyacineabbane@gmail.com',
  },
  {
    id: 'linkedin',
    label: 'Linkedin',
    value: 'linkedin.com/in/abbane-ahmed-yassine',
    icon: LinkedinIcon,
    href: 'https://www.linkedin.com/in/abbane-ahmed-yassine/',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/ahmedyacine2004',
    icon: GithubIcon,
    href: 'https://github.com/ahmedyacine2004',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    value: 'facebook.com/ahmedyassineabbane',
    icon: FacebookIcon,
    href: 'https://facebook.com/ahmedyassineabbane',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: 'instagram.com/ahmedyassine2004',
    icon: InstagramIcon,
    href: 'https://instagram.com/ahmedyassine2004',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    value: 'tiktok.com/@ahmedyassine2004',
    icon: TiktokIcon,
    href: 'https://tiktok.com/@ahmedyassine2004',
  },
];

export default function ContactPage() {
  const { t } = useTranslation();
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [slideOffset, setSlideOffset] = useState(0);
  const [maxSlideOffset, setMaxSlideOffset] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateMaxOffset = () => {
      const track = carouselRef.current;
      if (!track) return;

      const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-social-card]'));
      if (cards.length === 0) return;

      const gap = 8;
      const totalWidth =
        cards.reduce((sum, card) => sum + card.offsetWidth, 0) + gap * (cards.length - 1);
      const visibleWidth = track.parentElement?.clientWidth ?? totalWidth;
      setMaxSlideOffset(Math.max(0, totalWidth - visibleWidth + 12));
    };

    updateMaxOffset();
    window.addEventListener('resize', updateMaxOffset);

    return () => window.removeEventListener('resize', updateMaxOffset);
  }, []);

  const scrollSocialCarousel = useCallback(
    (direction: 'prev' | 'next') => {
      const track = carouselRef.current;
      if (!track) return;

      const firstCard = track.querySelector<HTMLElement>('[data-social-card]');
      if (!firstCard) return;

      const step = firstCard.offsetWidth + 8;
      setSlideOffset((prevOffset) => {
        const nextOffset = direction === 'next' ? prevOffset + step : prevOffset - step;
        return Math.min(Math.max(nextOffset, 0), maxSlideOffset);
      });
    },
    [maxSlideOffset],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    // Validate name
    if (!formData.name.trim()) {
      errors.name = t('contactPage.validationErrors.nameRequired');
    } else if (formData.name.trim().length < 2) {
      errors.name = t('contactPage.validationErrors.nameMinLength');
    } else if (formData.name.length > 100) {
      errors.name = t('contactPage.validationErrors.nameMaxLength');
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = t('contactPage.validationErrors.emailRequired');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = t('contactPage.validationErrors.emailInvalid');
      }
    }

    // Validate subject
    if (!formData.subject.trim()) {
      errors.subject = t('contactPage.validationErrors.subjectRequired');
    } else if (formData.subject.trim().length < 3) {
      errors.subject = t('contactPage.validationErrors.subjectMinLength');
    } else if (formData.subject.length > 150) {
      errors.subject = t('contactPage.validationErrors.subjectMaxLength');
    }

    // Validate message
    if (!formData.message.trim()) {
      errors.message = t('contactPage.validationErrors.messageRequired');
    } else if (formData.message.trim().length < 10) {
      errors.message = t('contactPage.validationErrors.messageMinLength');
    } else if (formData.message.length > 2000) {
      errors.message = t('contactPage.validationErrors.messageMaxLength');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, t]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Clear previous messages
      setSuccessMessage(null);
      setErrorMessage(null);

      // Validate form
      if (!validateForm()) {
        setErrorMessage(t('contactPage.errorMessage'));
        return;
      }

      // Prevent duplicate submissions
      if (isLoading) {
        return;
      }

      setIsLoading(true);

      try {
        await submitContactForm(formData, env.web3FormsAccessKey, 'ahmedyacineabbane@gmail.com');

        // Success
        setSuccessMessage(t('contactPage.successMessage'));
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setValidationErrors({});

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : 'Failed to send message. Please try again.';
        setErrorMessage(errorMsg);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, isLoading, validateForm],
  );

  return (
    /* MAIN CONTAINER */
    <div className="flex h-full min-h-0 w-full bg-background text-foreground p-2 select-none rounded-sm shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
      {/* INNER CARD */}
      <div className="flex h-full min-h-0 w-full gap-2 rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
        {/* ================= LEFT COLUMN: CONTACT FORM (SCROLLABLE) ================= */}
        <motion.div
          className="flex min-w-0 w-full lg:w-[58%] flex-col justify-between overflow-y-auto p-3 space-y-4 scrollbar-none"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { staggerChildren: 0.1, duration: 0.5, ease: 'easeOut' },
            },
          }}
        >
          {/* Header Section */}
          <section className="space-y-1.5 shrink-0">
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="font-inter text-[8px] font-semibold text-primary tracking-tight"
            >
              {t('contactPage.tagline')}
            </motion.p>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              className="font-inter text-3xl sm:text-4xl font-black tracking-tight text-foreground uppercase"
            >
              {t('contactPage.heading')}
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="font-inter max-w-[480px] text-xs font-normal leading-relaxed text-muted-foreground"
            >
              {t('contactPage.description')}
            </motion.p>
          </section>

          {/* Social Contact Cards - Carousel */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 },
            }}
            className="shrink-0"
          >
            <div className="relative overflow-visible px-3 py-1">
              <button
                type="button"
                onClick={() => scrollSocialCarousel('prev')}
                aria-label="Previous social links"
                className="absolute left-0 top-1/2 z-20 flex h-[60px] w-10 -translate-y-1/2 items-center justify-center rounded-sm border border-border bg-background text-primary shadow-gray-300 transition-transform hover:scale-[1.02] dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
              >
                <ChevronLeft className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollSocialCarousel('next')}
                aria-label="Next social links"
                className="absolute right-0 top-1/2 z-20 flex h-[60px] w-10 -translate-y-1/2 items-center justify-center rounded-sm border border-border bg-background text-primary shadow-gray-300 transition-transform hover:scale-[1.02] dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
              >
                <ChevronRight className="size-4" />
              </button>

              <div className="pl-10 pr-10">
                <div
                  ref={carouselRef}
                  className="flex items-center gap-2 transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${slideOffset}px)` }}
                >
                  {CONTACT_METHODS.map((item) => {
                    const isStaticSvg = typeof item.icon === 'object' && 'src' in item.icon;
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.id}
                        data-social-card
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-[60px] min-w-[160px] shrink-0 items-center gap-3 rounded-sm bg-background p-2.5 shadow-gray-300 transition-all group hover:shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.025)]"
                      >
                        <div
                          className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-white text-primary shadow-gray-300 transition-transform group-hover:scale-105 dark:bg-[#0f172a] dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          {isStaticSvg ? (
                            <Image
                              src={item.icon}
                              alt={item.label}
                              width={16}
                              height={16}
                              className="size-4"
                            />
                          ) : (
                            <Icon className="size-4" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className="font-inter text-xs font-bold text-foreground leading-tight">
                            {item.label}
                          </h2>
                          <p className="font-inter mt-0.5 text-[10px] leading-tight text-muted-foreground truncate">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Container */}
          <motion.form
            onSubmit={handleSubmit}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-1 flex-col justify-between rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] space-y-3"
          >
            <h2 className="font-inter text-xs font-bold text-foreground tracking-tight uppercase">
              {t('contactPage.formHeading')}
            </h2>

            {/* Success Message */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2.5 rounded-sm bg-green-500/10 border border-green-500/30 p-3 text-xs text-green-700 dark:text-green-400"
              >
                <Check className="size-4 flex-shrink-0" />
                <span>{successMessage}</span>
              </motion.div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2.5 rounded-sm bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-700 dark:text-red-400"
              >
                <X className="size-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <div className="space-y-3 flex-1 flex flex-col justify-center">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 size-4 text-primary pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={t('contactPage.namePlaceholder')}
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="font-inter w-full rounded-sm bg-background pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.008)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 size-4 text-primary pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t('contactPage.emailPlaceholder')}
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="font-inter w-full rounded-sm bg-background pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.008)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Validation Errors - Row 1 */}
              {(validationErrors.name || validationErrors.email) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {validationErrors.name && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {validationErrors.name}
                    </p>
                  )}
                  {validationErrors.email && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {validationErrors.email}
                    </p>
                  )}
                </div>
              )}

              {/* Row 2: Subject */}
              <div className="relative flex items-center">
                <PenTool className="absolute left-3.5 size-4 text-primary pointer-events-none" />
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder={t('contactPage.subjectPlaceholder')}
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="font-inter w-full rounded-sm bg-background pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.008)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Validation Error - Subject */}
              {validationErrors.subject && (
                <p className="text-xs text-red-600 dark:text-red-400">{validationErrors.subject}</p>
              )}

              {/* Row 3: Message Textarea */}
              <div className="relative flex-1 min-h-[100px]">
                <MessageSquare className="absolute left-3.5 top-3 size-4 text-primary pointer-events-none" />
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={t('contactPage.messagePlaceholder')}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="font-inter w-full h-full resize-none rounded-sm bg-background pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.008)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Validation Error - Message */}
              {validationErrors.message && (
                <p className="text-xs text-red-600 dark:text-red-400">{validationErrors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="font-inter w-full rounded-sm bg-primary hover:bg-primary/90 active:scale-[0.99] text-primary-foreground py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-primary"
            >
              {isLoading ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span className="font-inter">{t('contactPage.sendingButton')}</span>
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  <span className="font-inter">{t('contactPage.sendButton')}</span>
                </>
              )}
            </button>
          </motion.form>
        </motion.div>

        {/* ================= RIGHT COLUMN: 3D MODEL CANVAS ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="hidden lg:flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-sm bg-background shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
        >
          <ContactScene />
        </motion.div>
      </div>
    </div>
  );
}
