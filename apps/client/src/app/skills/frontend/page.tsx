'use client';

import React from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Folder,
  Hash,
  Layers,
  LayoutGrid,
  LineChart,
  MapPin,
  TrendingUp,
} from 'lucide-react';

// Custom SVG Icons for Brands
const ReactIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-11.5 -10.23174 23 20.46348"
    className="size-6 text-[#087ea4]"
  >
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const NextJsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="size-6 text-black dark:text-white"
  >
    <path
      fill="currentColor"
      d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0zm0 241.692c-62.695 0-113.692-50.997-113.692-113.692S65.305 14.308 128 14.308s113.692 50.997 113.692 113.692-50.997 113.692-113.692 113.692z"
    />
    <path
      fill="currentColor"
      d="M206.513 189.516L115.19 69.317H86.99v117.366h23.013v-82.52l78.85 104.093c6.046-5.076 11.597-10.743 16.66-18.74zM169.01 69.317h-23.012v117.366h23.012V69.317z"
    />
  </svg>
);

const TypeScriptIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 text-[#3178c6]">
    <path
      fill="currentColor"
      d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM12.9 17.52h-2.145V8.925H7.53V7.215h8.58v1.71h-3.21v8.595zM17.655 24c-1.35 0-2.445-.255-3.285-.765v-2.01c.9.54 1.95.825 3.12.825 1.005 0 1.575-.36 1.575-.945 0-.54-.42-.825-1.635-1.23-1.89-.63-2.835-1.575-2.835-2.895 0-1.65 1.245-2.73 3.39-2.73 1.155 0 2.115.21 2.895.645v1.95a5.533 5.533 0 0 0-2.82-.72c-.93 0-1.425.33-1.425.87 0 .525.435.795 1.695 1.215 1.83.615 2.79 1.53 2.79 2.925 0 1.77-1.32 2.865-3.465 2.865z"
    />
  </svg>
);

const TailwindIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 33" className="size-6 text-[#38bdf8]">
    <path
      fill="currentColor"
      d="M27.5 0c-7.333 0-11.917 3.667-13.75 11 2.75-3.667 6.417-5.042 11-4.125 2.13.426 3.65 1.986 5.335 3.714C32.738 13.251 35.839 16.5 41.25 16.5c7.333 0 11.917-3.667 13.75-11-2.75 3.667-6.417 5.042-11 4.125-2.13-.426-3.65-1.986-5.335-3.714C35.986 3.249 32.885 0 27.5 0zM13.75 16.5c-7.333 0-11.917 3.667-13.75 11 2.75-3.667 6.417-5.042 11-4.125 2.13.426 3.65 1.986 5.335 3.714C18.988 29.751 22.089 33 27.5 33c7.333 0 11.917-3.667 13.75-11-2.75 3.667-6.417 5.042-11 4.125-2.13-.426-3.65-1.986-5.335-3.714C22.236 19.749 19.135 16.5 13.75 16.5z"
    />
  </svg>
);

const FRONTEND_TOOLS = [
  {
    title: 'React',
    subtitle: 'Component Architecture',
    projects: '12 Projects',
    level: 'Expert Level',
    icon: ReactIcon,
    iconBg: 'bg-[#087ea4]/10',
    slug: 'react',
  },
  {
    title: 'Next.js',
    subtitle: 'Full Stack Framework',
    projects: '6 Projects',
    level: 'Advanced',
    icon: NextJsIcon,
    iconBg: 'bg-zinc-200 dark:bg-zinc-800',
    slug: 'nextjs',
  },
  {
    title: 'TypeScript',
    subtitle: 'Type Safety',
    projects: '14 Projects',
    level: 'Advanced',
    icon: TypeScriptIcon,
    iconBg: 'bg-[#3178c6]/10',
    slug: 'typescript',
  },
  {
    title: 'Tailwind CSS',
    subtitle: 'Utility-first Styling',
    projects: '10 Projects',
    level: 'Advanced',
    icon: TailwindIcon,
    iconBg: 'bg-[#38bdf8]/10',
    slug: 'tailwindcss',
  },
];

const METRICS = [
  { label: 'Components Built', value: '240+', icon: LayoutGrid },
  { label: 'UI Systems', value: '8', icon: Layers },
  { label: 'Production Projects', value: '12', icon: Folder },
  { label: 'Responsive Score', value: '100%', icon: Hash },
];

const CURRENT_FOCUS = [
  'Performance Optimization',
  'Accessibility',
  'Reusable Components',
  'Design Systems',
];

export default function FrontendWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto rounded-[8px] bg-background p-6 text-foreground md:p-10">
      <div className="mx-auto max-w-[1200px] space-y-10">
        {/* Header Section */}
        <header className="space-y-2">
          <h1 className="font-inter text-2xl font-black uppercase tracking-tight md:text-[28px]">
            Frontend Workspace
          </h1>
          <div className="space-y-1">
            <p className="font-inter text-[13px] font-bold text-blue-700 dark:text-blue-500">
              Frontend Development Environment
            </p>
            <p className="max-w-xl font-inter text-[12px] font-medium text-muted-foreground/80">
              Build modern, scalable and responsive user interfaces using modern frameworks,
              languages and UI libraries.
            </p>
          </div>
        </header>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {FRONTEND_TOOLS.map((tool) => (
            <div
              key={tool.title}
              className="group flex flex-col rounded-[12px] border border-border/40 bg-card p-6 shadow-sm border-t-[3px] border-t-blue-600 transition-all duration-300 ease-out transform-gpu hover:-translate-y-1.5 hover:rotate-[1.5deg] hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                {/* Icon Wrapper */}
                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-[10px] ${tool.iconBg}`}
                >
                  <tool.icon />
                </div>

                {/* Info Text */}
                <div className="flex flex-col">
                  <h2 className="font-inter text-[18px] font-bold text-foreground">{tool.title}</h2>
                  <p className="font-inter text-[12px] font-medium text-muted-foreground">
                    {tool.subtitle}
                  </p>

                  <div className="mt-4 flex flex-col gap-1.5 font-inter text-[12px] font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Folder className="size-3.5" />
                      <span>{tool.projects}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="size-3.5" />
                      <span>{tool.level}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <Link
                  href={`/skills/frontend/${tool.slug}`}
                  className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#003399] py-3 font-inter text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(0,51,153,0.3)] transition-colors hover:bg-[#002277]"
                >
                  Open Workspace <ChevronRight className="size-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section (Metrics & Focus) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Frontend Metrics */}
          <div className="flex flex-col rounded-[12px] border border-border/40 bg-card p-6 shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-[8px] bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                <LineChart className="size-4" />
              </div>
            </div>

            <h3 className="mb-4 font-inter text-[13px] font-bold text-foreground">
              Frontend Metrics
            </h3>

            <div className="flex flex-col gap-3">
              {METRICS.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="flex items-center justify-between font-inter text-[12px]"
                  >
                    <div className="flex items-center gap-2.5 font-medium text-muted-foreground">
                      <Icon className="size-3.5" />
                      <span>{metric.label}</span>
                    </div>
                    <span className="font-bold text-foreground">{metric.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Focus */}
          <div className="flex flex-col rounded-[12px] border border-border/40 bg-card p-6 shadow-sm lg:col-span-1">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-[8px] bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
                <MapPin className="size-4" />
              </div>
            </div>

            <h3 className="mb-4 font-inter text-[13px] font-bold text-foreground">Current Focus</h3>

            <ul className="flex flex-col gap-3">
              {CURRENT_FOCUS.map((focus) => (
                <li
                  key={focus}
                  className="flex items-center gap-2.5 font-inter text-[12px] font-medium text-foreground"
                >
                  <span className="size-1.5 rounded-full bg-purple-600 dark:bg-purple-500" />
                  {focus}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
