'use client';

import { ContactScene } from '@/components/3d/ContactScene';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, MessageSquare, PenTool, Send, User } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import GithubIcon from '@/assets/icons/GithubIcon.svg';
import LinkedinIcon from '@/assets/icons/LinkedinIcon.svg';

const CONTACT_METHODS = [
  {
    id: 'email',
    label: 'Email',
    value: 'ahmedyassine.dev@gmail.com',
    icon: Mail,
    href: 'mailto:ahmedyassine.dev@gmail.com',
  },
  {
    id: 'linkedin',
    label: 'Linkedin',
    value: 'linkedin.com/in/ahmedyassine',
    icon: LinkedinIcon,
    href: 'https://linkedin.com/in/ahmedyassine',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/ahmedyassine',
    icon: GithubIcon,
    href: 'https://github.com/ahmedyassine',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    /* MAIN CONTAINER */
    <div className="font-inter flex h-full w-full bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] p-3 sm:p-5 select-none rounded-[8px] shadow-md shadow-gray-300 dark:shadow-[0_0_10px_rgba(255,255,255,0.08)]">
      {/* INNER CARD */}
      <div className="font-inter flex h-full w-full gap-5 rounded-[8px] bg-[var(--color-bg-secondary)] p-4 sm:p-6 shadow-sm shadow-gray-300 dark:shadow-[0_0_8px_rgba(255,255,255,0.08)] overflow-hidden">
        {/* ================= LEFT COLUMN: CONTACT FORM (SCROLLABLE) ================= */}
        <motion.div
          className="flex min-w-0 w-full lg:w-[58%] flex-col justify-between overflow-y-auto p-2 space-y-4 scrollbar-none"
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
              className="font-inter text-xs font-bold text-blue-600 dark:text-blue-400 tracking-tight"
            >
              &#47;&#47; Let&#47;s build something amazing together
            </motion.p>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              className="font-inter text-3xl sm:text-4xl font-black tracking-tight text-foreground uppercase"
            >
              CONTACT <span className="font-inter text-blue-600 dark:text-blue-500">ME</span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="font-inter max-w-[480px] text-xs font-normal leading-relaxed text-muted-foreground"
            >
              I&apos;m always open to discussing new opportunities, collaborative projects, or just
              having a chat about technology.
            </motion.p>
          </section>

          {/* Social Contact Cards */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 },
            }}
            className="shrink-0 flex items-center gap-3 overflow-x-auto p-2 scrollbar-none"
          >
            {CONTACT_METHODS.map((item) => {
              const isStaticSvg = typeof item.icon === 'object' && 'src' in item.icon;
              const Icon = item.icon;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 min-w-[160px] h-[60px] items-center gap-3 rounded-[8px] bg-[var(--color-bg-primary)] p-2.5 shadow-sm shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.08)] hover:shadow-md hover:shadow-gray-300 dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.15)] transition-all group shrink-0"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
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
                    <p className="font-inter text-[10px] text-muted-foreground truncate leading-tight mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </a>
              );
            })}

            {/* Scroll/More Button */}
            <button
              aria-label="More contact options"
              className="flex size-[60px] shrink-0 items-center justify-center rounded-[8px] bg-[var(--color-bg-primary)] text-foreground shadow-sm shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.08)] hover:bg-muted transition-colors"
            >
              <ChevronRight className="size-5 text-muted-foreground" />
            </button>
          </motion.div>

          {/* Form Container */}
          <motion.form
            onSubmit={handleSubmit}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-1 flex-col justify-between rounded-[8px] bg-[var(--color-bg-primary)] p-4 sm:p-5 shadow-sm shadow-gray-300 dark:shadow-[0_0_8px_rgba(255,255,255,0.08)] space-y-3"
          >
            <h2 className="font-inter text-xs font-bold text-foreground tracking-tight uppercase">
              Send me a message
            </h2>

            <div className="space-y-3 flex-1 flex flex-col justify-center">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 size-4 text-blue-600 dark:text-blue-400 pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="font-inter w-full rounded-[8px] bg-[var(--color-bg-secondary)] pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.08)] transition-all"
                  />
                </div>

                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 size-4 text-blue-600 dark:text-blue-400 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="font-inter w-full rounded-[8px] bg-[var(--color-bg-secondary)] pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.08)] transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Subject */}
              <div className="relative flex items-center">
                <PenTool className="absolute left-3.5 size-4 text-blue-600 dark:text-blue-400 pointer-events-none" />
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="font-inter w-full rounded-[8px] bg-[var(--color-bg-secondary)] pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.08)] transition-all"
                />
              </div>

              {/* Row 3: Message Textarea */}
              <div className="relative flex-1 min-h-[100px]">
                <MessageSquare className="absolute left-3.5 top-3 size-4 text-blue-600 dark:text-blue-400 pointer-events-none" />
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="font-inter w-full h-full resize-none rounded-[8px] bg-[var(--color-bg-secondary)] pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.08)] transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="font-inter w-full rounded-[8px] bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Send className="size-4" />
              <span className="font-inter">Send Message</span>
            </button>
          </motion.form>
        </motion.div>

        {/* ================= RIGHT COLUMN: 3D MODEL CANVAS ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="hidden lg:flex h-full w-[42%] flex-col overflow-hidden rounded-[8px] bg-[var(--color-bg-primary)] shadow-sm shadow-gray-300 dark:shadow-[0_0_8px_rgba(255,255,255,0.08)]"
        >
          <ContactScene />
        </motion.div>
      </div>
    </div>
  );
}
