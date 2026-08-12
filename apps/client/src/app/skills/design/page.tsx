'use client';

import { motion, Variants } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  Briefcase,
  ChevronRight,
  Clock,
  Compass,
  FolderCheck,
  Palette,
  Send,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

const hoverCardEffect: Variants = {
  hover: {
    y: -4,
    scale: 1.015,
    transition: { duration: 0.2, ease: 'easeOut' as const },
  },
  tap: { scale: 0.98 },
};

// Brand Icons
const PhotoshopIcon = () => (
  <div className="flex size-7 items-center justify-center rounded-[6px] bg-[#001E36] font-inter text-[13px] font-black text-[#31A8FF]">
    Ps
  </div>
);

const IllustratorIcon = () => (
  <div className="flex size-7 items-center justify-center rounded-[6px] bg-[#330000] font-inter text-[13px] font-black text-[#FF9A00]">
    Ai
  </div>
);

const PremiereIcon = () => (
  <div className="flex size-7 items-center justify-center rounded-[6px] bg-[#00005B] font-inter text-[13px] font-black text-[#9999FF]">
    Pr
  </div>
);

const AfterEffectsIcon = () => (
  <div className="flex size-7 items-center justify-center rounded-[6px] bg-[#00005B] font-inter text-[13px] font-black text-[#9999FF]">
    Ae
  </div>
);

const BlenderIcon = () => (
  <div className="flex size-7 items-center justify-center rounded-[6px] bg-[#EA7600]/10 font-inter text-[13px] font-black text-[#EA7600]">
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.5 2a1 1 0 00-.8.4l-3.2 4.3-4.8.5a1 1 0 00-.5 1.7l3.6 3.4-1 4.7a1 1 0 001.5 1l4.2-2.3 4.2 2.3a1 1 0 001.5-1l-1-4.7 3.6-3.4a1 1 0 00-.5-1.7l-4.8-.5-3.2-4.3a1 1 0 00-.2-.2z" />
    </svg>
  </div>
);

export default function DesignWorkspaceView() {
  return (
    <motion.div
      className="font-inter h-full w-full space-y-5 rounded-[8px] p-6 overflow-y-auto overflow-x-hidden bg-background text-foreground"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* HEADER BAR */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-4 border-b border-border/40 pb-4 lg:flex-row lg:items-center"
      >
        <div className="flex items-center gap-3.5">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="flex size-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20"
          >
            <Palette className="size-6" />
          </motion.div>
          <div>
            <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-foreground">
              DESIGN WORKSPACE
            </h1>
            <p className="font-inter text-[12px] text-muted-foreground">
              Crafting visuals that communicate, engage and elevate the portfolio experience.
            </p>
          </div>
        </div>

        {/* Top Metric Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          {[
            {
              icon: Wrench,
              value: '5',
              label: 'Design Tools',
              color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10',
            },
            {
              icon: FolderCheck,
              value: '48+',
              label: 'Projects Designed',
              color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
            },
            {
              icon: Briefcase,
              value: '6+ Years',
              label: 'Experience',
              color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10',
            },
            {
              icon: Compass,
              value: 'Clarity . Purpose . Impact',
              label: 'Design Philosophy',
              color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10',
              isSmall: true,
            },
          ].map((badge, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2, scale: 1.02 }}
              className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className={`flex size-7 items-center justify-center rounded-lg ${badge.color}`}>
                <badge.icon className="size-4" />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-inter font-black leading-none ${badge.isSmall ? 'text-[12px]' : 'text-[13px]'}`}
                >
                  {badge.value}
                </span>
                <span className="font-inter text-[10px] text-muted-foreground">{badge.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* SECTION 1: DESIGN TOOLS I MASTER */}
      <motion.div variants={cardVariants} className="space-y-3">
        <h2 className="font-inter text-[13px] font-bold text-foreground">
          Design Tools <span className="text-blue-600">I master</span>
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {/* Photoshop */}
          <motion.div
            variants={hoverCardEffect}
            whileHover="hover"
            whileTap="tap"
            className="relative flex flex-col justify-between rounded-[12px] border border-border/40 border-t-2 border-t-blue-500 bg-card p-3.5 shadow-sm transition-all"
          >
            <div>
              <div className="flex items-center gap-2.5">
                <PhotoshopIcon />
                <span className="font-inter text-[13px] font-bold text-foreground">Photoshop</span>
              </div>
              <p className="font-inter mt-2 text-[10.5px] leading-tight text-muted-foreground">
                Photo Editing & Image Manipulation
              </p>
              <div className="mt-2.5">
                <span className="font-inter rounded-md bg-blue-500/10 px-2 py-0.5 text-[9.5px] font-semibold text-blue-600 dark:text-blue-400">
                  Expert
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border/30 pt-2.5">
              <span className="font-inter text-[11px] font-bold text-foreground">12 projects</span>
              <button className="font-inter flex items-center text-[10.5px] font-medium text-muted-foreground transition-colors hover:text-foreground">
                View <ChevronRight className="size-3" />
              </button>
            </div>
          </motion.div>

          {/* Illustrator */}
          <motion.div
            variants={hoverCardEffect}
            whileHover="hover"
            whileTap="tap"
            className="relative flex flex-col justify-between rounded-[12px] border border-border/40 border-t-2 border-t-amber-500 bg-card p-3.5 shadow-sm transition-all"
          >
            <div>
              <div className="flex items-center gap-2.5">
                <IllustratorIcon />
                <span className="font-inter text-[13px] font-bold text-foreground">
                  Illustrator
                </span>
              </div>
              <p className="font-inter mt-2 text-[10.5px] leading-tight text-muted-foreground">
                Vector Graphics & Illustration
              </p>
              <div className="mt-2.5">
                <span className="font-inter rounded-md bg-amber-500/10 px-2 py-0.5 text-[9.5px] font-semibold text-amber-600 dark:text-amber-400">
                  Expert
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border/30 pt-2.5">
              <span className="font-inter text-[11px] font-bold text-foreground">10 Projects</span>
              <button className="font-inter flex items-center text-[10.5px] font-medium text-muted-foreground transition-colors hover:text-foreground">
                View <ChevronRight className="size-3" />
              </button>
            </div>
          </motion.div>

          {/* Premiere Pro */}
          <motion.div
            variants={hoverCardEffect}
            whileHover="hover"
            whileTap="tap"
            className="relative flex flex-col justify-between rounded-[12px] border border-border/40 border-t-2 border-t-purple-500 bg-card p-3.5 shadow-sm transition-all"
          >
            <div>
              <div className="flex items-center gap-2.5">
                <PremiereIcon />
                <span className="font-inter text-[13px] font-bold text-foreground">
                  Premiere Pro
                </span>
              </div>
              <p className="font-inter mt-2 text-[10.5px] leading-tight text-muted-foreground">
                Motion Graphics & Visual Effects
              </p>
              <div className="mt-2.5">
                <span className="font-inter rounded-md bg-purple-500/10 px-2 py-0.5 text-[9.5px] font-semibold text-purple-600 dark:text-purple-400">
                  Advanced
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border/30 pt-2.5">
              <span className="font-inter text-[11px] font-bold text-foreground">8 Projects</span>
              <button className="font-inter flex items-center text-[10.5px] font-medium text-muted-foreground transition-colors hover:text-foreground">
                View <ChevronRight className="size-3" />
              </button>
            </div>
          </motion.div>

          {/* After Effects */}
          <motion.div
            variants={hoverCardEffect}
            whileHover="hover"
            whileTap="tap"
            className="relative flex flex-col justify-between rounded-[12px] border border-border/40 border-t-2 border-t-indigo-500 bg-card p-3.5 shadow-sm transition-all"
          >
            <div>
              <div className="flex items-center gap-2.5">
                <AfterEffectsIcon />
                <span className="font-inter text-[13px] font-bold text-foreground">
                  After Effects
                </span>
              </div>
              <p className="font-inter mt-2 text-[10.5px] leading-tight text-muted-foreground">
                Motion Graphics & Visual Effects
              </p>
              <div className="mt-2.5">
                <span className="font-inter rounded-md bg-indigo-500/10 px-2 py-0.5 text-[9.5px] font-semibold text-indigo-600 dark:text-indigo-400">
                  Advanced
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border/30 pt-2.5">
              <span className="font-inter text-[11px] font-bold text-foreground">12 projects</span>
              <button className="font-inter flex items-center text-[10.5px] font-medium text-muted-foreground transition-colors hover:text-foreground">
                View <ChevronRight className="size-3" />
              </button>
            </div>
          </motion.div>

          {/* Blender */}
          <motion.div
            variants={hoverCardEffect}
            whileHover="hover"
            whileTap="tap"
            className="relative flex flex-col justify-between rounded-[12px] border border-border/40 border-t-2 border-t-orange-500 bg-card p-3.5 shadow-sm transition-all"
          >
            <div>
              <div className="flex items-center gap-2.5">
                <BlenderIcon />
                <span className="font-inter text-[13px] font-bold text-foreground">Blender</span>
              </div>
              <p className="font-inter mt-2 text-[10.5px] leading-tight text-muted-foreground">
                3D Modeling & Animation
              </p>
              <div className="mt-2.5">
                <span className="font-inter rounded-md bg-orange-500/10 px-2 py-0.5 text-[9.5px] font-semibold text-orange-600 dark:text-orange-400">
                  Advanced
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border/30 pt-2.5">
              <span className="font-inter text-[11px] font-bold text-foreground">9 Projects</span>
              <button className="font-inter flex items-center text-[10.5px] font-medium text-muted-foreground transition-colors hover:text-foreground">
                View <ChevronRight className="size-3" />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* SECTION 2: THREE-COLUMN GRID */}
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
        {/* WHAT I DESIGN IN MY PORTFOLIO */}
        <motion.div
          variants={cardVariants}
          className="rounded-[12px] border border-border/40 bg-card p-4 shadow-sm lg:col-span-5"
        >
          <h2 className="font-inter mb-3 text-[12px] font-bold uppercase tracking-wider text-foreground">
            What I Design in My Portfolio
          </h2>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2">
            {[
              {
                title: 'UI Interfaces',
                sub: 'Clean & modern UI layouts',
                img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
              },
              {
                title: 'Brand Identity',
                sub: 'Logos, colors & visual systems',
                img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=300&q=80',
              },
              {
                title: 'Thumbnails',
                sub: 'YouTube & social media thumbnails',
                img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
              },
              {
                title: 'Illustrations',
                sub: 'Custom vector illustrations',
                img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=300&q=80',
              },
              {
                title: 'Motion Graphics',
                sub: 'Engaging motion content',
                img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=300&q=80',
              },
              {
                title: 'Video Editing',
                sub: 'Vector graphics & illustration',
                img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=300&q=80',
              },
              {
                title: '3D Visuals',
                sub: '3D models & renderings',
                img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=300&q=80',
              },
              {
                title: 'Icons & Assets',
                sub: 'Custom icons & design assets',
                img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="group flex flex-col justify-between overflow-hidden rounded-[8px] border border-border/30 bg-muted/20 p-2 transition-all hover:border-blue-500/40 hover:bg-muted/40"
              >
                <div>
                  <div className="mb-1 flex items-center gap-1.5">
                    <div className="flex size-4.5 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400">
                      <Sparkles className="size-2.5" />
                    </div>
                    <span className="font-inter text-[11px] font-bold leading-tight text-foreground">
                      {item.title}
                    </span>
                  </div>
                  <p className="font-inter line-clamp-1 text-[9px] text-muted-foreground">
                    {item.sub}
                  </p>
                </div>
                <div className="mt-2 h-16 w-full overflow-hidden rounded-[6px] bg-slate-900">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* DESIGN PROCESS TIMELINE */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-start rounded-[12px] border border-border/40 bg-card p-4 shadow-sm lg:col-span-3"
        >
          <h2 className="font-inter mb-3 text-[12px] font-bold uppercase tracking-wider text-foreground">
            Design Process
          </h2>

          <div className="relative mt-2 flex flex-col justify-start gap-4 pl-1">
            <div className="absolute bottom-2.5 left-3.5 top-2.5 w-0.5 bg-border/60" />

            {[
              { num: 1, title: 'Discover', desc: 'Understand the purpose and audience' },
              { num: 2, title: 'Plan', desc: 'Wireframes, moodboards & concepts' },
              { num: 3, title: 'Design', desc: 'Create visual compositions' },
              { num: 4, title: 'Refine', desc: 'Feedback, iteration improvements' },
              { num: 5, title: 'Deliver', desc: 'Export, optimize & implement' },
            ].map((step) => (
              <motion.div
                key={step.num}
                whileHover={{ x: 3 }}
                className="relative z-10 flex items-start gap-3 transition-transform"
              >
                <div className="font-inter flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white shadow-sm">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-inter text-[11px] font-bold leading-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="font-inter text-[9.5px] leading-snug text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* PORTFOLIO APPLICATIONS BUILT WITH REACT */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-4 shadow-sm lg:col-span-4"
        >
          <div>
            <h2 className="font-inter mb-3 text-[12px] font-bold uppercase tracking-wider text-foreground">
              Portfolio Applications Built with React
            </h2>

            <div className="space-y-2.5">
              {[
                {
                  title: 'Portfolio Redesign',
                  desc: 'Complete visual overhaul of the portfolio experience.',
                  tag: 'UI/UX Design',
                  time: '3 days ago',
                  img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=150&q=80',
                  badgeBg: 'bg-blue-600 text-white',
                },
                {
                  title: 'YouTube Thumbnail Pack',
                  desc: 'High-converting thumbnails for content strategy.',
                  tag: 'Photoshop',
                  time: '1 week ago',
                  img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
                  badgeBg: 'bg-blue-900 text-blue-200',
                },
                {
                  title: 'Personal Brand Identity',
                  desc: 'Logo, color system & brand guidelines.',
                  tag: 'Illustrator',
                  time: '2 weeks ago',
                  img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=150&q=80',
                  badgeBg: 'bg-amber-600 text-white',
                },
                {
                  title: 'Outro Animation',
                  desc: 'Animated intro for portfolio and videos.',
                  tag: 'After Effects',
                  time: '3 weeks ago',
                  img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=150&q=80',
                  badgeBg: 'bg-purple-600 text-white',
                },
                {
                  title: '3D Scene Visualizations',
                  desc: '3D renders for project showcases.',
                  tag: 'Blender',
                  time: '1 month ago',
                  img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=150&q=80',
                  badgeBg: 'bg-orange-500 text-white',
                },
              ].map((app, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 2, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                  className="flex items-center justify-between gap-2.5 rounded-[8px] border border-border/30 bg-muted/10 p-2 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={app.img}
                      alt={app.title}
                      className="size-10 shrink-0 rounded-[6px] object-cover"
                    />
                    <div>
                      <h3 className="font-inter text-[11px] font-bold leading-tight text-foreground">
                        {app.title}
                      </h3>
                      <p className="font-inter line-clamp-1 text-[9px] text-muted-foreground">
                        {app.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end">
                    <span
                      className={`font-inter rounded-md px-1.5 py-0.5 text-[8.5px] font-bold ${app.badgeBg}`}
                    >
                      {app.tag}
                    </span>
                    <span className="font-inter mt-1 text-[8px] text-muted-foreground">
                      {app.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="font-inter mt-3 flex items-center justify-center gap-1 text-[11px] font-semibold text-blue-600 transition-colors hover:text-blue-500"
          >
            View all highlights <ArrowUpRight className="size-3.5" />
          </motion.button>
        </motion.div>
      </div>

      {/* SECTION 3: BOTTOM METRICS + FEATURED WORKS PREVIEW */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* BOTTOM LEFT 4 STAT CARDS */}
        <motion.div
          variants={cardVariants}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-6"
        >
          {/* Designs Created */}
          <motion.div
            variants={hoverCardEffect}
            whileHover="hover"
            whileTap="tap"
            className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-4 shadow-sm transition-all"
          >
            <div className="flex size-8 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
              <Send className="size-4" />
            </div>
            <div className="mt-4">
              <div className="font-inter text-[24px] font-black leading-none text-foreground">
                +120
              </div>
              <p className="font-inter mt-1.5 text-[11px] font-medium text-muted-foreground">
                Designs Created
              </p>
              <p className="font-inter mt-0.5 text-[9.5px] text-muted-foreground/70">
                18% this month
              </p>
            </div>
          </motion.div>

          {/* Happy Clients */}
          <motion.div
            variants={hoverCardEffect}
            whileHover="hover"
            whileTap="tap"
            className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-4 shadow-sm transition-all"
          >
            <div className="flex size-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <Users className="size-4" />
            </div>
            <div className="mt-4">
              <div className="font-inter text-[24px] font-black leading-none text-foreground">
                36
              </div>
              <p className="font-inter mt-1.5 text-[11px] font-medium text-muted-foreground">
                Happy Clients/Collabs
              </p>
              <p className="font-inter mt-0.5 text-[9.5px] text-muted-foreground/70">
                12% this month
              </p>
            </div>
          </motion.div>

          {/* Consistency Score */}
          <motion.div
            variants={hoverCardEffect}
            whileHover="hover"
            whileTap="tap"
            className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-4 shadow-sm transition-all"
          >
            <div className="flex size-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-600">
              <Award className="size-4" />
            </div>
            <div className="mt-4">
              <div className="font-inter text-[24px] font-black leading-none text-foreground">
                98%
              </div>
              <p className="font-inter mt-1.5 text-[11px] font-medium text-muted-foreground">
                Consistency Score
              </p>
              <p className="font-inter mt-0.5 text-[9.5px] text-muted-foreground/70">
                8% this month
              </p>
            </div>
          </motion.div>

          {/* Creative Mode */}
          <motion.div
            variants={hoverCardEffect}
            whileHover="hover"
            whileTap="tap"
            className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-4 shadow-sm transition-all"
          >
            <div className="flex size-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
              <Clock className="size-4" />
            </div>
            <div className="mt-4">
              <div className="font-inter text-[24px] font-black leading-none text-foreground">
                24/7
              </div>
              <p className="font-inter mt-1.5 text-[11px] font-medium text-muted-foreground">
                Creative Mode
              </p>
              <p className="font-inter mt-0.5 text-[9.5px] text-muted-foreground/70">Always on</p>
            </div>
          </motion.div>
        </motion.div>

        {/* BOTTOM RIGHT FEATURED WORKS PREVIEW */}
        <motion.div
          variants={cardVariants}
          className="rounded-[12px] border border-border/40 bg-card p-4 shadow-sm lg:col-span-6"
        >
          <h2 className="font-inter mb-3 text-[12px] font-bold uppercase tracking-wider text-foreground">
            Featured Works Preview
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                title: 'Dashboard UI',
                tech: 'Figma . 2024',
                img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80',
              },
              {
                title: 'Mobile App Design',
                tech: 'Figma . 2024',
                img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=300&q=80',
              },
              {
                title: 'Brand Identity',
                tech: 'Illustrator . 2024',
                img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=300&q=80',
              },
              {
                title: '3D Headphone Render',
                tech: 'Blender . 2024',
                img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
              },
            ].map((work, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="group overflow-hidden rounded-[8px] border border-border/30 bg-muted/10 p-2 transition-all hover:border-blue-500/40"
              >
                <div className="h-24 w-full overflow-hidden rounded-[6px]">
                  <img
                    src={work.img}
                    alt={work.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="font-inter truncate text-[11px] font-bold leading-tight text-foreground">
                    {work.title}
                  </h3>
                  <p className="font-inter mt-0.5 text-[9px] text-muted-foreground">{work.tech}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
