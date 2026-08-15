'use client';

import { FrontendWorkspaceData } from '@/data/skills/react-workspace';
import { motion, Variants } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Boxes,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Copy,
  Eye,
  FileCode2,
  Folder,
  FolderCheck,
  Grid,
  Heart,
  Image as ImageIcon,
  Layers,
  Layers3,
  Layout,
  LucideIcon,
  Maximize2,
  Monitor,
  MousePointerClick,
  Move,
  Palette,
  Play,
  RotateCw,
  Shield,
  Sliders,
  Sparkles,
  TrendingUp,
  Type,
  Video,
  Wand2,
  Wrench,
  Zap,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';

function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 10,
  children,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90 transform">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-pink-600 dark:text-pink-400"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

interface DesignViewProps {
  data: FrontendWorkspaceData;
}

export default function DesignView({ data }: DesignViewProps) {
  const {
    skillName,
    header,
    proficiency,
    whyILove,
    applications,
    whatIBuild,
    impactAndStats,
    techStack,
    toolkit,
    coreStrengths,
    technicalStrengths,
  } = data;

  const [activeTab, setActiveTab] = useState<'gallery' | 'components' | 'tokens'>('gallery');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const designTokens = useMemo(
    () => [
      { name: 'Electric Pink', hex: '#ec4899', role: 'Brand Accent / Highlights' },
      { name: 'Cyber Blue', hex: '#2563eb', role: 'Primary Action / Interactive' },
      { name: 'Deep Indigo', hex: '#6366f1', role: 'Secondary Accents' },
      { name: 'Emerald Glow', hex: '#10b981', role: 'Success / Active Badges' },
      { name: 'Dark Surface', hex: '#0f172a', role: 'Background Canvas / Contrast' },
    ],
    [],
  );

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedToken(hex);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  const creativeWorkflow = useMemo(
    () => [
      {
        step: '01',
        title: 'Research & Moodboard',
        detail: 'Visual references, typography & palette curation',
      },
      {
        step: '02',
        title: 'Component Wireframing',
        detail: 'Layout grids, hierarchy & low-fidelity wireframes',
      },
      {
        step: '03',
        title: 'Design System & Tokens',
        detail: 'Auto layout, variants, and scalable style guides',
      },
      {
        step: '04',
        title: 'Hi-Fi Prototyping',
        detail: 'Micro-interactions, animation physics & testing',
      },
      {
        step: '05',
        title: 'Production Delivery',
        detail: 'SVG optimization, vector exports & design handoff',
      },
    ],
    [],
  );

  return (
    <motion.div
      className="w-full space-y-6 rounded-[8px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* PAGE TITLE & CREATIVE STUDIO HEADER */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-3 border-b border-border/40 pb-4 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-[8px] bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
            <Palette className="size-5" />
          </div>
          <div>
            <h1 className="font-inter text-xl font-black uppercase tracking-tight md:text-[22px]">
              DESIGN WORKSPACE -{skillName}-
            </h1>
            <p className="text-[12px] text-muted-foreground">
              UI/UX design systems, vector art, visual asset library, and prototype gallery
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-pink-600 dark:text-pink-400">
            <span className="size-2 rounded-full bg-pink-500 animate-pulse" />
            CREATIVE STUDIO
          </span>
          <span className="rounded-[6px] border border-border/50 bg-card px-2.5 py-1 font-mono text-[11px] font-medium text-muted-foreground">
            Auto Layout Ready
          </span>
          <span className="rounded-[6px] border border-border/50 bg-card px-2.5 py-1 font-mono text-[11px] font-medium text-muted-foreground">
            Vector Precision
          </span>
        </div>
      </motion.div>

      {/* TOP ROW: INTRO CARD, VISUAL PROFICIENCY GAUGE, CREATIVE TENETS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Intro Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md md:col-span-2"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-[8px] bg-pink-50 text-pink-600 dark:bg-pink-950/50 dark:text-pink-400 border border-pink-500/20">
              <Wand2 className="size-6" />
            </div>
            <div>
              <h2 className="font-inter text-[20px] font-bold text-foreground">{header.title}</h2>
              <p className="text-[11px] font-mono text-pink-600 dark:text-pink-400">
                CREATIVE SUITE &amp; DESIGN SYSTEM
              </p>
            </div>
          </div>
          <p className="mb-2 text-[13px] font-bold text-foreground">{header.subtitle}</p>
          <p className="mb-6 text-[12px] leading-relaxed text-muted-foreground">
            {header.description}
          </p>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {header.metrics.map((metric, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-[8px] border border-border/40 p-2 transition-colors hover:bg-muted/30"
              >
                <div className="text-pink-600 dark:text-pink-400">
                  <Palette className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold">{metric.value}</span>
                  <span className="text-[10px] text-muted-foreground">{metric.label}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Visual Mastery Gauge */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="flex flex-col items-center justify-center rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex w-full items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Visual Mastery</h3>
            <Activity className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <CircularProgress percentage={proficiency} size={130} strokeWidth={10}>
            <span className="text-[24px] font-black">{proficiency}%</span>
            <span className="text-[10px] font-medium text-muted-foreground">Mastery</span>
          </CircularProgress>
        </motion.div>

        {/* Creative Philosophy */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Design Tenets</h3>
            <Sparkles className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <ul className="space-y-2.5">
            {whyILove.map((reason, i) => (
              <li key={i} className="flex items-center gap-2 text-[12px]">
                <div className="size-1.5 shrink-0 rounded-full bg-pink-500" />
                <span className="leading-snug">{reason}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* INTERACTIVE GALLERY & ASSET SHOWCASE */}
      <motion.div
        variants={cardVariants}
        className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm"
      >
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <ImageIcon className="size-4 text-pink-600 dark:text-pink-400" />
              <h2 className="font-inter text-[16px] font-black uppercase tracking-tight text-foreground md:text-[18px]">
                {skillName} Visual Asset Gallery &amp; Design Artifacts
              </h2>
            </div>
            <p className="font-inter text-[12px] text-muted-foreground">
              Explore user interfaces, brand identities, custom vector assets, and design system
              components created with {skillName}.
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-[8px] bg-muted/30 p-1 border border-border/40">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`rounded-[6px] px-2.5 py-1 text-[11px] font-semibold transition-all ${
                activeTab === 'gallery'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Gallery Grid
            </button>
            <button
              onClick={() => setActiveTab('tokens')}
              className={`rounded-[6px] px-2.5 py-1 text-[11px] font-semibold transition-all ${
                activeTab === 'tokens'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Color Tokens
            </button>
            <button
              onClick={() => setActiveTab('components')}
              className={`rounded-[6px] px-2.5 py-1 text-[11px] font-semibold transition-all ${
                activeTab === 'components'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              UI Components
            </button>
          </div>
        </div>

        {/* Tab 1: Gallery Showcase Grid */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((app, idx) => {
              const galleryImages = [
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
              ];
              const imgUrl = galleryImages[idx % galleryImages.length];

              return (
                <motion.div
                  key={app.id}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col justify-between overflow-hidden rounded-[10px] border border-border/40 bg-muted/10 p-3.5 shadow-2xs transition-all hover:border-pink-500/40 hover:shadow-md"
                >
                  <div>
                    <div className="relative mb-3 h-40 w-full overflow-hidden rounded-[8px] bg-slate-950">
                      <img
                        src={imgUrl}
                        alt={app.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 font-mono text-[9px] font-semibold text-white backdrop-blur-md">
                        {app.badge}
                      </div>
                    </div>

                    <div className="flex items-start justify-between">
                      <h3 className="font-inter text-[13px] font-bold text-foreground">
                        {app.title}
                      </h3>
                      <span className="flex items-center gap-1 font-mono text-[9.5px] font-semibold text-pink-600 dark:text-pink-400">
                        <Sparkles className="size-2.5" /> Ready
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                      {app.description}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-border/30 pt-2.5 text-[10px] text-muted-foreground">
                    <span>Designed in {skillName}</span>
                    <span className="font-semibold text-pink-600 dark:text-pink-400 group-hover:underline">
                      Inspect Details →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Color Swatches & Tokens */}
        {activeTab === 'tokens' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {designTokens.map((token) => (
              <div
                key={token.hex}
                className="flex flex-col justify-between rounded-[10px] border border-border/40 bg-muted/10 p-3.5"
              >
                <div>
                  <div
                    className="mb-3 h-20 w-full rounded-[6px] shadow-inner"
                    style={{ backgroundColor: token.hex }}
                  />
                  <h4 className="font-inter text-[12px] font-bold text-foreground">{token.name}</h4>
                  <p className="text-[10px] text-muted-foreground">{token.role}</p>
                </div>

                <button
                  onClick={() => copyHex(token.hex)}
                  className="mt-3 flex items-center justify-between rounded-[6px] bg-card p-2 border border-border/40 font-mono text-[10.5px] text-foreground hover:bg-muted/40 transition-colors"
                >
                  <span>{token.hex}</span>
                  {copiedToken === token.hex ? (
                    <Check className="size-3 text-emerald-500" />
                  ) : (
                    <Copy className="size-3 text-muted-foreground" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Interactive UI Component Sandbox */}
        {activeTab === 'components' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-[10px] border border-border/40 bg-muted/10 p-4 space-y-3">
              <span className="font-inter text-[11px] font-bold uppercase tracking-wider text-foreground">
                Button Component Variants
              </span>
              <div className="flex flex-col gap-2">
                <button className="w-full rounded-[6px] bg-pink-600 px-3 py-2 text-[12px] font-semibold text-white shadow-xs hover:bg-pink-700 transition-colors">
                  Primary Pink Solid
                </button>
                <button className="w-full rounded-[6px] border border-pink-500/50 bg-pink-500/10 px-3 py-2 text-[12px] font-semibold text-pink-600 dark:text-pink-400 hover:bg-pink-500/20 transition-colors">
                  Secondary Ghost Variant
                </button>
                <button className="w-full rounded-[6px] border border-border/60 bg-card px-3 py-2 text-[12px] font-semibold text-foreground hover:bg-muted/40 transition-colors">
                  Neutral Outline
                </button>
              </div>
            </div>

            <div className="rounded-[10px] border border-border/40 bg-muted/10 p-4 space-y-3">
              <span className="font-inter text-[11px] font-bold uppercase tracking-wider text-foreground">
                Badge &amp; Chip Primitives
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 font-mono text-[10.5px] font-bold text-pink-600 dark:text-pink-400">
                  Active Variant
                </span>
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-[10.5px] font-bold text-blue-600 dark:text-blue-400">
                  Information Tag
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400">
                  100% Responsive
                </span>
                <span className="rounded-full border border-border/50 bg-card px-3 py-1 font-mono text-[10.5px] font-medium text-foreground">
                  Default Token
                </span>
              </div>
            </div>

            <div className="rounded-[10px] border border-border/40 bg-muted/10 p-4 space-y-3">
              <span className="font-inter text-[11px] font-bold uppercase tracking-wider text-foreground">
                Typography Scale
              </span>
              <div className="space-y-1">
                <p className="font-inter text-[18px] font-black text-foreground leading-tight">
                  Display Bold 18px
                </p>
                <p className="font-inter text-[13px] font-bold text-foreground">
                  Heading Semibold 13px
                </p>
                <p className="font-inter text-[11px] font-medium text-muted-foreground">
                  Body Regular 11px Inter
                </p>
                <p className="font-mono text-[10px] text-pink-600 dark:text-pink-400">
                  Monospace Code 10px
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* MIDDLE ROW: CREATIVE WORKFLOW & DESIGN ARTIFACTS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Creative Workflow Timeline */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Creative Workflow</h3>
            <Compass className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <div className="relative space-y-3.5 pl-4 before:absolute before:left-1.5 before:top-2 before:h-[88%] before:w-0.5 before:bg-pink-500/30">
            {creativeWorkflow.map((step) => (
              <div key={step.step} className="relative">
                <span className="absolute -left-[19px] top-1 size-2.5 rounded-full bg-pink-600 dark:bg-pink-400 ring-4 ring-card" />
                <p className="text-[12px] font-bold leading-tight text-foreground">{step.title}</p>
                <p className="text-[10px] text-muted-foreground">{step.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What I Design (whatIBuild) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Design Output</h3>
            <Boxes className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {whatIBuild.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                className="flex flex-col items-center justify-center gap-2 rounded-[8px] border border-border/40 bg-muted/20 p-3 text-center transition-colors hover:bg-muted/40"
              >
                <Palette className="size-5 text-foreground/70" />
                <span className="text-[10px] font-medium leading-tight">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact & Design Tools */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Impact &amp; Benchmarks</h3>
            <TrendingUp className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <ul className="mb-6 space-y-2">
            {impactAndStats.map((stat, i) => (
              <li key={i} className="flex justify-between text-[12px]">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="size-1.5 rounded-full bg-pink-500" />
                  <span>{stat.label}</span>
                </div>
                <span className="font-mono font-bold text-foreground">{stat.value}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-inter mb-4 text-[14px] font-bold">Toolchain &amp; Plugins</h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05 }}
                className="rounded-[4px] border border-border/50 bg-muted/30 px-2.5 py-1 text-[11px] font-medium"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* BOTTOM ROW: TOOLKIT GAUGES, CORE PRINCIPLES, TECHNICAL METRICS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Design Toolkit */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Design Toolkit</h3>
            <Zap className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <div className="flex justify-between">
            {toolkit.map((tool, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <CircularProgress percentage={tool.percentage} size={48} strokeWidth={4}>
                  <span className="text-[10px] font-bold">{tool.percentage}%</span>
                </CircularProgress>
                <span className="max-w-[60px] text-center text-[9px] leading-tight text-muted-foreground">
                  {tool.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* UI/UX Principles */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Design Principles</h3>
            <Shield className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <ul className="space-y-3">
            {coreStrengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px]">
                <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-pink-500" />
                <span className="leading-snug text-muted-foreground">{strength}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Technical Depth (Linear Meters) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Creative Execution Depth</h3>
            <Layers className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <div className="space-y-4">
            {technicalStrengths.map((tech, i) => (
              <div key={i} className="flex items-center justify-between gap-4 text-[12px]">
                <div className="flex min-w-[140px] items-center gap-2">
                  <div className="size-1.5 shrink-0 rounded-full bg-pink-500" />
                  <span className="font-medium">{tech.label}</span>
                </div>
                <span className="font-mono font-bold">{tech.percentage}%</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-pink-600 dark:bg-pink-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
