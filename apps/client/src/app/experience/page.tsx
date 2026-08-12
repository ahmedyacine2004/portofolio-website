'use client';

import { ContactScene } from '@/components/3d/ContactScene';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, MessageSquare, PenTool, Send, User } from 'lucide-react';
import React, { useState } from 'react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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
    /* MAIN CONTAINER: Explicit Light Mode (bg-slate-100, text-slate-900) vs Dark Mode (dark:bg-slate-950, dark:text-white) */
    <div className="flex h-full w-full overflow-hidden bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-white p-3 sm:p-5 font-inter select-none rounded-[8px]">
      {/* INNER CARD: Pure White in Light Mode (bg-white), Dark Slate in Dark Mode (dark:bg-slate-900) */}
      <div className="flex h-full w-full gap-5 overflow-hidden rounded-[8px] bg-white dark:bg-slate-900 p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* ================= LEFT COLUMN: CONTACT FORM ================= */}
        <motion.div
          className="flex min-w-0 w-full lg:w-[58%] flex-col justify-between overflow-y-auto pr-1"
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
              className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-tight"
            >
              &#47;&#47; Let&#47;s build something amazing together
            </motion.p>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase"
            >
              CONTACT <span className="text-blue-600 dark:text-blue-500">ME</span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="max-w-[480px] text-xs font-normal leading-relaxed text-slate-600 dark:text-slate-400"
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
            className="my-3 shrink-0 flex items-center gap-3 overflow-x-auto py-1 scrollbar-none"
          >
            {CONTACT_METHODS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 min-w-[160px] h-[60px] items-center gap-3 rounded-[8px] bg-slate-50 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700/80 shadow-2xs hover:border-blue-500 dark:hover:border-blue-400 hover:bg-white dark:hover:bg-slate-800 transition-all group shrink-0"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-blue-100/80 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {item.label}
                    </h2>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate leading-tight mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </a>
              );
            })}

            {/* Scroll/More Button */}
            <button
              aria-label="More contact options"
              className="flex size-[60px] shrink-0 items-center justify-center rounded-[8px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronRight className="size-5" />
            </button>
          </motion.div>

          {/* Form Container */}
          <motion.form
            onSubmit={handleSubmit}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-1 flex-col justify-between rounded-[8px] bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 border border-slate-200 dark:border-slate-700/60 shadow-2xs space-y-3"
          >
            <h2 className="text-xs font-bold text-slate-900 dark:text-white tracking-tight uppercase">
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
                    className="w-full rounded-[8px] bg-white dark:bg-slate-900 pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all"
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
                    className="w-full rounded-[8px] bg-white dark:bg-slate-900 pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all"
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
                  className="w-full rounded-[8px] bg-white dark:bg-slate-900 pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all"
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
                  className="w-full h-full resize-none rounded-[8px] bg-white dark:bg-slate-900 pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-[8px] bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
            >
              <Send className="size-4" />
              <span>Send Message</span>
            </button>
          </motion.form>
        </motion.div>

        {/* ================= RIGHT COLUMN: 3D MODEL CANVAS ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="hidden lg:flex h-full w-[42%] flex-col overflow-hidden rounded-[8px] bg-slate-100 dark:bg-[#20152D] border border-slate-200 dark:border-slate-800 shadow-inner"
        >
          <ContactScene />
        </motion.div>
      </div>
    </div>
  );
}
