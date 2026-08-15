'use client';

import { FrontendWorkspaceData } from '@/data/skills/react-workspace';
import { motion, Variants } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Database,
  DatabaseZap,
  FileCode2,
  FileText,
  Folder,
  FolderGit2,
  Gauge,
  Globe,
  HardDrive,
  KeyRound,
  Layers,
  Layers3,
  Lock,
  LucideIcon,
  Network,
  Package,
  Radio,
  Search,
  Server,
  ServerCog,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  TableProperties,
  Terminal,
  TrendingUp,
  Workflow,
  Zap,
} from 'lucide-react';
import React, { useMemo } from 'react';

const iconMap: Record<string, LucideIcon> = {
  Calendar: Clock,
  Folder: Folder,
  Star: Zap,
  BookOpen: Database,
  Home: ServerCog,
  TrendingUp: TrendingUp,
  Lock: Lock,
  User: KeyRound,
  CalendarDays: Clock,
  CreditCard: ShieldCheck,
  Shield: ShieldCheck,
  Settings: Settings,
  FileText: FileText,
  Layout: TableProperties,
  Zap: Zap,
  AlertCircle: ShieldAlert,
  Layers: Layers3,
  Workflow: Workflow,
  Cloud: HardDrive,
  Code: Code2,
  Package: Package,
  Cpu: Cpu,
  Database: Database,
  Search: Search,
  Grid: TableProperties,
};

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
          className="text-violet-600 dark:text-violet-400"
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
    transition: {
      staggerChildren: 0.07,
    },
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

interface DatabasesViewProps {
  data: FrontendWorkspaceData;
}

export default function DatabasesView({ data }: DatabasesViewProps) {
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

  const storageTiers = useMemo(
    () => [
      {
        tier: '01. Buffer Cache & Memory',
        detail: 'SGA / Shared Buffers & In-Memory Working Set',
        latency: '< 0.5ms',
        badge: 'RAM Tier',
        icon: Zap,
      },
      {
        tier: '02. WAL & Transaction Journal',
        detail: 'Sequential Write-Ahead Log for ACID Durability',
        latency: '1.2ms',
        badge: 'Durability',
        icon: ShieldCheck,
      },
      {
        tier: '03. Persistent B+ Tree Pages',
        detail: `${skillName} Table Spaces & Compound Index Trees`,
        latency: '3.4ms',
        badge: 'NVMe Storage',
        icon: Database,
      },
      {
        tier: '04. Replica Sets & Snapshots',
        detail: 'Read Replicas & Continuous Point-in-Time Backup',
        latency: 'Sync / Async',
        badge: 'HA & Backup',
        icon: HardDrive,
      },
    ],
    [skillName],
  );

  return (
    <motion.div
      className="w-full space-y-6 rounded-[8px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* PAGE TITLE & DATABASE CLUSTER TELEMETRY BAR */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-3 border-b border-border/40 pb-4 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-[8px] bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
            <DatabaseZap className="size-5" />
          </div>
          <div>
            <h1 className="font-inter text-xl font-black uppercase tracking-tight md:text-[22px]">
              DATABASE WORKSPACE -{skillName}-
            </h1>
            <p className="text-[12px] text-muted-foreground">
              Data architecture, schema modeling, indexing strategy, and query performance
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-violet-600 dark:text-violet-400">
            <span className="size-2 rounded-full bg-violet-500 animate-pulse" />
            ENGINE ACTIVE
          </span>
          <span className="rounded-[6px] border border-border/50 bg-card px-2.5 py-1 font-mono text-[11px] font-medium text-muted-foreground">
            99.9% Buffer Hit
          </span>
          <span className="rounded-[6px] border border-border/50 bg-card px-2.5 py-1 font-mono text-[11px] font-medium text-muted-foreground">
            0ms Replica Lag
          </span>
        </div>
      </motion.div>

      {/* TOP ROW: INTRO CARD, PROFICIENCY GAUGE, DATA MODELING PRINCIPLES */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Intro Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md md:col-span-2"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-[8px] bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400 border border-violet-500/20">
              <Database className="size-6" />
            </div>
            <div>
              <h2 className="font-inter text-[20px] font-bold text-foreground">{header.title}</h2>
              <p className="text-[11px] font-mono text-violet-600 dark:text-violet-400">
                DATA PARADIGM &amp; STORAGE ENGINE
              </p>
            </div>
          </div>
          <p className="mb-2 text-[13px] font-bold text-foreground">{header.subtitle}</p>
          <p className="mb-6 text-[12px] leading-relaxed text-muted-foreground">
            {header.description}
          </p>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {header.metrics.map((metric, i) => {
              const Icon = iconMap[metric.icon] || Database;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-[8px] border border-border/40 p-2 transition-colors hover:bg-muted/30"
                >
                  <div className="text-violet-600 dark:text-violet-400">
                    <Icon className="size-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold">{metric.value}</span>
                    <span className="text-[10px] text-muted-foreground">{metric.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Engine Proficiency / Mastery Gauge */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="flex flex-col items-center justify-center rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex w-full items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Schema Mastery</h3>
            <Activity className="size-4 text-violet-600 dark:text-violet-400" />
          </div>
          <CircularProgress percentage={proficiency} size={130} strokeWidth={10}>
            <span className="text-[24px] font-black">{proficiency}%</span>
            <span className="text-[10px] font-medium text-muted-foreground">Proficiency</span>
          </CircularProgress>
        </motion.div>

        {/* Core Database Principles */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Data Guarantees</h3>
            <ShieldCheck className="size-4 text-violet-600 dark:text-violet-400" />
          </div>
          <ul className="space-y-2.5">
            {whyILove.map((reason, i) => (
              <li key={i} className="flex items-center gap-2 text-[12px]">
                <div className="size-1.5 shrink-0 rounded-full bg-violet-500" />
                <span className="leading-snug">{reason}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* STORAGE & PERSISTENCE HIERARCHY ROW */}
      <motion.div
        variants={cardVariants}
        className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers3 className="size-4 text-violet-600 dark:text-violet-400" />
            <h3 className="font-inter text-[13px] font-bold uppercase tracking-wide">
              Data Storage &amp; Persistence Lifecycle
            </h3>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            From Buffer Cache to Disk &amp; Replica Shards
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {storageTiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-[8px] border border-border/40 bg-muted/20 p-3.5 transition-colors hover:bg-muted/40"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded bg-violet-500/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-violet-600 dark:text-violet-400">
                    {tier.badge}
                  </span>
                  <Icon className="size-3.5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="text-[11.5px] font-bold leading-tight text-foreground">
                    {tier.tier}
                  </h4>
                  <p className="mt-1 text-[10px] text-muted-foreground leading-tight">
                    {tier.detail}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border/20 pt-2 font-mono text-[9.5px]">
                  <span className="text-muted-foreground">Latency:</span>
                  <span className="font-bold text-violet-600 dark:text-violet-400">
                    {tier.latency}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* MIDDLE ROW: PRODUCTION DATA SCHEMAS, ARCHITECTURAL MODULES, IMPACT & TECH STACK */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Production Data Models */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Production Schemas</h3>
            <TableProperties className="size-4 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="flex items-start gap-3 border-b border-border/40 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-muted text-foreground/70">
                  <Database className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-start justify-between">
                    <h4 className="font-inter text-[13px] font-bold">{app.title}</h4>
                    <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />{' '}
                      {app.status}
                    </span>
                  </div>
                  <p className="mb-2 line-clamp-2 text-[11px] text-muted-foreground">
                    {app.description}
                  </p>
                  <span className="rounded bg-violet-50 px-2 py-0.5 font-mono text-[9px] font-semibold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
                    {app.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Database Modeling Capabilities (whatIBuild) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Schema Entities</h3>
            <Boxes className="size-4 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {whatIBuild.map((item, i) => {
              const Icon = iconMap[item.icon] || TableProperties;
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.04 }}
                  className="flex flex-col items-center justify-center gap-2 rounded-[8px] border border-border/40 bg-muted/20 p-3 text-center transition-colors hover:bg-muted/40"
                >
                  <Icon className="size-5 text-foreground/70" />
                  <span className="text-[10px] font-medium leading-tight">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Impact & Performance + Tech Stack */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Storage &amp; Benchmarks</h3>
            <TrendingUp className="size-4 text-violet-600 dark:text-violet-400" />
          </div>
          <ul className="mb-6 space-y-2">
            {impactAndStats.map((stat, i) => (
              <li key={i} className="flex justify-between text-[12px]">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="size-1.5 rounded-full bg-violet-500" />
                  <span>{stat.label}</span>
                </div>
                <span className="font-mono font-bold text-foreground">{stat.value}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-inter mb-4 text-[14px] font-bold">Database Ecosystem &amp; ORM</h3>
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

      {/* BOTTOM ROW: TOOLKIT GAUGES, ARCHITECTURAL INTEGRITY, TECHNICAL INDEXING DEPTH */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Database Toolkit */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Database Toolkit</h3>
            <Zap className="size-4 text-violet-600 dark:text-violet-400" />
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

        {/* Data Architecture Core Strengths */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Integrity Principles</h3>
            <Shield className="size-4 text-violet-600 dark:text-violet-400" />
          </div>
          <ul className="space-y-3">
            {coreStrengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px]">
                <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-500" />
                <span className="leading-snug text-muted-foreground">{strength}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Technical Strengths (Linear Progress Meters) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">Query &amp; Indexing Depth</h3>
            <Layers className="size-4 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="space-y-4">
            {technicalStrengths.map((tech, i) => (
              <div key={i} className="flex items-center justify-between gap-4 text-[12px]">
                <div className="flex min-w-[140px] items-center gap-2">
                  <div className="size-1.5 shrink-0 rounded-full bg-violet-500" />
                  <span className="font-medium">{tech.label}</span>
                </div>
                <span className="font-mono font-bold">{tech.percentage}%</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-violet-600 dark:bg-violet-500"
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
