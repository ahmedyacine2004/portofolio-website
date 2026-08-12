'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, Heart, Layers, LayoutGrid, Plus, Zap } from 'lucide-react';

interface WorkspaceCategory {
  title: string;
  slug: string;
  accentClass: string;
  items: string[];
}

const WORKSPACE_CATEGORIES: WorkspaceCategory[] = [
  {
    title: 'Frontend',
    slug: 'frontend',
    accentClass: 'border-t-blue-500',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    slug: 'backend',
    accentClass: 'border-t-purple-600',
    items: ['NestJS', 'Node.js', 'Express', 'JWT'],
  },
  {
    title: 'Databases',
    slug: 'databases',
    accentClass: 'border-t-pink-600',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
  },
  {
    title: 'Design',
    slug: 'design',
    accentClass: 'border-t-rose-500',
    items: ['Figma', 'Illustrator & Photoshop', 'After Effects & Premiere Pro', 'Blender'],
  },
  {
    title: 'DevOps & Tools',
    slug: 'devops-tools',
    accentClass: 'border-t-amber-500',
    items: ['Docker & Kubernetes', 'GitHub Actions', 'Nginx', 'Vercel'],
  },
  {
    title: 'APIs & Services',
    slug: 'apis-services',
    accentClass: 'border-t-lime-500',
    items: ['OpenAI API', 'Cloudinary', 'Stripe', 'Resend'],
  },
  {
    title: 'Mobile & Desktop',
    slug: 'mobile-desktop',
    accentClass: 'border-t-slate-600',
    items: ['React Native', 'Electron', 'PWA', 'Capacitor'],
  },
  {
    title: 'Others',
    slug: 'others',
    accentClass: 'border-t-gray-800 dark:border-t-gray-200',
    items: ['Git', 'npm', 'Postman', 'Jest'],
  },
];

const SUMMARY_ITEMS = [
  { label: 'Total Technologies', value: '32', icon: Layers },
  { label: 'Primary Stack', value: 'MERN + TypeScript', icon: Cpu },
  { label: 'Current Favorite', value: 'React', icon: Heart },
  { label: 'Latest Added', value: 'OpenAI API', icon: Plus },
];

const TECH_DISTRIBUTION = [
  { label: 'Frontend', percentage: 25, colorClass: 'bg-blue-600' },
  { label: 'Backend', percentage: 25, colorClass: 'bg-purple-600' },
  { label: 'Databases', percentage: 15, colorClass: 'bg-amber-400' },
  { label: 'Design', percentage: 20, colorClass: 'bg-orange-500' },
  { label: 'DevOps & Tools', percentage: 10, colorClass: 'bg-emerald-500' },
  { label: 'Others', percentage: 5, colorClass: 'bg-stone-600' },
];

/* 3D Interactive Tilt Wrapper with Height Fill & Parallax Depth */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="h-full w-full [perspective:1000px]">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`h-full w-full ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <div className="h-full w-full overflow-y-auto rounded-[8px] border border-border/50 bg-background p-4 md:p-6 space-y-6 text-foreground shadow-sm">
      {/* Page Header */}
      <header className="space-y-1">
        <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
          Technology Workspace
        </h1>
        <div className="space-y-0.5">
          <p className="font-inter text-xs font-semibold text-blue-600 dark:text-blue-400">
            Development Environments
          </p>
          <p className="font-inter text-xs text-muted-foreground">
            Select an environment to inspect its workspace.
          </p>
        </div>
      </header>

      {/* Grid of Equal Height 3D Tilt Environment Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {WORKSPACE_CATEGORIES.map((category) => (
          <TiltCard
            key={category.slug}
            className={`flex flex-col justify-between rounded-[8px] border border-border/70 bg-card p-4 shadow-xs transition-shadow duration-300 hover:shadow-xl border-t-4 ${category.accentClass}`}
          >
            {/* Title & Items with 3D Parallax Elevation */}
            <div className="[transform:translateZ(25px)] [transform-style:preserve-3d]">
              <h2 className="font-inter text-sm font-bold text-card-foreground">
                {category.title}
              </h2>
              <ul className="mt-3 space-y-1.5 font-inter text-[11px] font-medium text-muted-foreground">
                {category.items.map((item) => (
                  <li key={item} className="leading-tight">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore Link with Subtle Parallax Depth */}
            <div className="mt-6 border-t border-border/50 pt-2.5 text-right [transform:translateZ(18px)]">
              <Link
                href={`/skills/${category.slug}`}
                className="inline-flex items-center gap-1 font-inter text-[11px] font-semibold text-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                Explore <ArrowRight className="size-3" />
              </Link>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Bottom Insights Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Workspace Summary Card */}
        <div className="rounded-[8px] border border-border/70 bg-card p-4 shadow-xs">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-[6px] bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <LayoutGrid className="size-3.5" />
            </div>
            <h3 className="font-inter text-xs font-bold text-card-foreground">Workspace Summary</h3>
          </div>

          <div className="space-y-2.5">
            {SUMMARY_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between font-inter text-[11px]"
                >
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon className="size-3" />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-bold text-card-foreground">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech Distribution Card */}
        <div className="rounded-[8px] border border-border/70 bg-card p-4 shadow-xs">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-[6px] bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <Plus className="size-3.5" />
            </div>
            <h3 className="font-inter text-xs font-bold text-card-foreground">Tech Distribution</h3>
          </div>

          <div className="space-y-2">
            {TECH_DISTRIBUTION.map((dist) => (
              <div
                key={dist.label}
                className="grid grid-cols-12 items-center font-inter text-[10.5px]"
              >
                <span className="col-span-3 font-medium text-muted-foreground truncate">
                  {dist.label}
                </span>

                <div className="col-span-7 px-2">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted/60">
                    <div
                      className={`h-full rounded-full ${dist.colorClass}`}
                      style={{ width: `${dist.percentage}%` }}
                    />
                  </div>
                </div>

                <span className="col-span-2 text-right font-bold text-card-foreground">
                  {dist.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Tip Banner */}
      <div className="flex items-center gap-3 rounded-[8px] border border-blue-100 bg-blue-50/70 p-3 font-inter text-[11px] text-blue-900 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-blue-200">
        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
          <Zap className="size-3.5 fill-current" />
        </div>
        <p className="leading-snug">
          <span className="font-bold">Tip</span> Open any environment from the sidebar to inspect
          experience, projects, architecture, best practices, and implementation details.
        </p>
      </div>
    </div>
  );
}
