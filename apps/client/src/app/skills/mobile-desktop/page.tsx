'use client';

import { motion, Variants } from 'framer-motion';
import { CheckCircle2, Monitor, Smartphone, Zap } from 'lucide-react';

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
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const MOBILE_TECH = [
  {
    category: 'Mobile Development',
    icon: Smartphone,
    technologies: [
      { name: 'React Native', level: 'Intermediate', icon: 'Code2' },
      { name: 'Expo', level: 'Intermediate', icon: 'Package' },
      { name: 'PWA', level: 'Advanced', icon: 'Zap' },
      { name: 'Capacitor', level: 'Intermediate', icon: 'Layers' },
    ],
  },
  {
    category: 'Desktop Development',
    icon: Monitor,
    technologies: [
      { name: 'Electron', level: 'Intermediate', icon: 'Monitor' },
      { name: 'Tauri', level: 'Beginner', icon: 'Package' },
      { name: 'Cross-platform', level: 'Advanced', icon: 'Layers' },
      { name: 'Native Integration', level: 'Intermediate', icon: 'Code2' },
    ],
  },
];

const APPLICATIONS = [
  {
    title: 'Cross-Platform App',
    description: 'React Native application for iOS and Android',
    status: 'In Progress',
    technologies: ['React Native', 'Expo', 'Firebase'],
  },
  {
    title: 'Progressive Web App',
    description: 'Desktop-quality experience on mobile browsers',
    status: 'Production',
    technologies: ['PWA', 'Service Workers', 'Next.js'],
  },
  {
    title: 'Desktop Application',
    description: 'Cross-platform desktop app with Electron',
    status: 'Development',
    technologies: ['Electron', 'React', 'TypeScript'],
  },
];

const STATS = [
  { label: 'Mobile Apps', value: '2+' },
  { label: 'PWA Projects', value: '3+' },
  { label: 'Desktop Apps', value: '1+' },
  { label: 'Cross-Platform', value: '6+' },
];

export default function MobileDesktopPage() {
  return (
    <motion.div
      className="h-full w-full space-y-6 rounded-[8px] p-6 overflow-y-auto overflow-x-hidden bg-background text-foreground md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* HEADER */}
      <motion.div variants={cardVariants} className="space-y-2">
        <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
          Mobile & Desktop Development
        </h1>
        <p className="font-inter text-[13px] text-muted-foreground">
          Cross-platform applications for all devices
        </p>
      </motion.div>

      {/* TECHNOLOGY SECTIONS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {MOBILE_TECH.map((section) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.category}
              variants={cardVariants}
              className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-10 items-center justify-center rounded-[8px] bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                  <Icon className="size-5" />
                </div>
                <h2 className="font-inter text-[14px] font-bold text-foreground">
                  {section.category}
                </h2>
              </div>

              <div className="space-y-3">
                {section.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center justify-between rounded-[6px] bg-muted/30 p-3 border border-border/30"
                  >
                    <div>
                      <p className="font-inter text-[12px] font-bold text-foreground">
                        {tech.name}
                      </p>
                      <p
                        className={`text-[10px] font-medium ${
                          tech.level === 'Advanced'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : tech.level === 'Intermediate'
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {tech.level}
                      </p>
                    </div>
                    <CheckCircle2 className="size-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* APPLICATIONS */}
      <motion.div variants={cardVariants} className="space-y-4">
        <h2 className="font-inter text-[14px] font-bold text-foreground">Applications Built</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {APPLICATIONS.map((app, i) => (
            <div key={i} className="rounded-[8px] border border-border/40 bg-card p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-inter text-[12px] font-bold text-foreground">{app.title}</h3>
                <span
                  className={`text-[9px] font-bold px-2 py-1 rounded-[4px] ${
                    app.status === 'Production'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                      : app.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                  }`}
                >
                  {app.status}
                </span>
              </div>
              <p className="font-inter text-[11px] text-muted-foreground mb-3">{app.description}</p>
              <div className="flex flex-wrap gap-1">
                {app.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] bg-muted px-1.5 py-0.5 rounded-[3px] text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* STATS */}
      <motion.div variants={cardVariants} className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[8px] border border-border/40 bg-card p-4 shadow-sm text-center"
          >
            <p className="font-inter text-[14px] font-bold text-foreground">{stat.value}</p>
            <p className="font-inter text-[10px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* INFO BANNER */}
      <motion.div
        variants={cardVariants}
        className="rounded-[8px] border border-border/40 bg-card p-4 shadow-sm"
      >
        <div className="flex gap-3">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <Zap className="size-3.5" />
          </div>
          <div>
            <p className="font-inter text-[12px] font-bold text-foreground mb-1">
              Cross-Platform Strategy
            </p>
            <p className="font-inter text-[11px] text-muted-foreground">
              Mobile and desktop apps extend reach. Use React Native for quick development and
              maintain code sharing with the web platform.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
