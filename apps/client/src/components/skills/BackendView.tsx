'use client';

import { FrontendWorkspaceData } from '@/data/skills/react-workspace';
import { useTranslation } from '@/hooks/use-translation';
import { motion, Variants } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  Award,
  Boxes,
  CheckCircle2,
  Clock,
  Cloud,
  Code,
  Cpu,
  Database,
  FileText,
  Folder,
  Globe,
  KeyRound,
  Layers,
  Layers3,
  Lock,
  LucideIcon,
  Package,
  Radio,
  Server,
  ServerCog,
  Settings,
  Shield,
  ShieldCheck,
  Terminal,
  TrendingUp,
  Workflow,
  Zap,
} from 'lucide-react';
import React, { useEffect, useMemo } from 'react';

const iconMap: Record<string, LucideIcon> = {
  Calendar: Clock,
  Folder: Folder,
  Star: Award,
  BookOpen: Server,
  Home: ServerCog,
  TrendingUp: TrendingUp,
  Lock: Lock,
  User: KeyRound,
  CalendarDays: Clock,
  CreditCard: ShieldCheck,
  Shield: Shield,
  Settings: Settings,
  FileText: FileText,
  Layout: Layers,
  Zap: Zap,
  AlertCircle: AlertCircle,
  Layers: Layers3,
  Workflow: Workflow,
  Cloud: Cloud,
  Code: Code,
  Package: Package,
  Cpu: Cpu,
  Database: Database,
  Terminal: Terminal,
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
          className="text-emerald-600 dark:text-emerald-400"
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

interface BackendViewProps {
  data: FrontendWorkspaceData;
  skillKey?: string;
}

export default function BackendView({ data, skillKey }: BackendViewProps) {
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

  const resolvedSkillKey =
    skillKey ||
    (skillName.toLowerCase().includes('nest')
      ? 'nestjs'
      : skillName.toLowerCase().includes('express')
        ? 'expressjs'
        : skillName.toLowerCase().includes('spring')
          ? 'spring-boot'
          : skillName.toLowerCase().includes('node')
            ? 'nodejs'
            : skillName.toLowerCase().replace(/[^a-z0-9]/g, ''));

  const { t, tArray, tObject, locale } = useTranslation();

  useEffect(() => {
    const metaTitle = t(
      `skillPages.${resolvedSkillKey}.metaTitle`,
      `${skillName} Workspace | Skills`,
    );
    if (metaTitle && typeof document !== 'undefined') {
      document.title = metaTitle;
    }
  }, [locale, resolvedSkillKey, t, skillName]);

  const translatedMetrics = tObject<Array<{ label: string; value: string }>>(
    `skillPages.${resolvedSkillKey}.header.metrics`,
    [],
  );

  const metrics = useMemo(() => {
    return header.metrics.map((metric, i) => ({
      ...metric,
      label: translatedMetrics?.[i]?.label ?? metric.label,
      value: translatedMetrics?.[i]?.value ?? metric.value,
    }));
  }, [header.metrics, translatedMetrics]);

  const translatedTenets = tArray<string>(`skillPages.${resolvedSkillKey}.designTenets.items`);
  const displayTenets = translatedTenets.length > 0 ? translatedTenets : whyILove;

  const defaultPipeline = useMemo(
    () => [
      {
        title: 'Incoming Ingestion',
        detail: 'HTTP / WebSocket Handler',
        tag: 'Gate 01',
        icon: Globe,
      },
      {
        title: 'Security & Auth',
        detail: 'JWT Guard & Rate Limiting',
        tag: 'Gate 02',
        icon: Lock,
      },
      {
        title: 'Route Controller',
        detail: `${skillName} Execution Context`,
        tag: 'Gate 03',
        icon: ServerCog,
      },
      {
        title: 'Domain & Business Logic',
        detail: 'Service Layer & State Validation',
        tag: 'Gate 04',
        icon: Workflow,
      },
      {
        title: 'Persistence & Cache',
        detail: 'Database ODM/ORM & Redis',
        tag: 'Gate 05',
        icon: Database,
      },
      {
        title: 'Serialized Response',
        detail: '200 OK JSON Payload',
        tag: 'Gate 06',
        icon: CheckCircle2,
      },
    ],
    [skillName],
  );

  const translatedStages = tObject<Array<{ tag: string; title: string; detail: string }>>(
    `skillPages.${resolvedSkillKey}.pipeline.stages`,
    [],
  );

  const pipelineSteps = useMemo(() => {
    return defaultPipeline.map((step, idx) => {
      const translated = translatedStages?.[idx];
      return {
        ...step,
        tag: translated?.tag ?? step.tag,
        title: translated?.title ?? step.title,
        detail: translated?.detail ?? step.detail,
      };
    });
  }, [defaultPipeline, translatedStages]);

  const translatedAppItems = tObject<
    Array<{ id: string; title: string; description: string; status: string; badge: string }>
  >(`skillPages.${resolvedSkillKey}.applications.items`, []);

  const displayApplications = useMemo(() => {
    return applications.map((app, idx) => {
      const matched =
        translatedAppItems?.find((item) => item.id === app.id) ?? translatedAppItems?.[idx];
      return {
        ...app,
        title: matched?.title ?? app.title,
        description: matched?.description ?? app.description,
        status: matched?.status ?? app.status,
        badge: matched?.badge ?? app.badge,
      };
    });
  }, [applications, translatedAppItems]);

  const translatedSystems = tArray<string>(`skillPages.${resolvedSkillKey}.componentSystems.items`);
  const displayWhatIBuild = useMemo(() => {
    return whatIBuild.map((item, idx) => ({
      ...item,
      label: translatedSystems?.[idx] ?? item.label,
    }));
  }, [whatIBuild, translatedSystems]);

  const translatedStats = tObject<Array<{ label: string; value: string }>>(
    `skillPages.${resolvedSkillKey}.impact.stats`,
    [],
  );

  const displayImpactAndStats = useMemo(() => {
    return impactAndStats.map((stat, idx) => {
      const matched = translatedStats?.[idx];
      return {
        ...stat,
        label: matched?.label ?? stat.label,
        value: matched?.value ?? stat.value,
      };
    });
  }, [impactAndStats, translatedStats]);

  const translatedToolkit = tObject<Array<{ label: string; percentage: number }>>(
    `skillPages.${resolvedSkillKey}.toolkit.items`,
    [],
  );

  const displayToolkit = useMemo(() => {
    return toolkit.map((item, idx) => {
      const matched = translatedToolkit?.[idx];
      return {
        ...item,
        label: matched?.label ?? item.label,
        percentage: matched?.percentage ?? item.percentage,
      };
    });
  }, [toolkit, translatedToolkit]);

  const translatedCoreStrengths = tArray<string>(
    `skillPages.${resolvedSkillKey}.architecturePrinciples.items`,
  );
  const displayCoreStrengths =
    translatedCoreStrengths.length > 0 ? translatedCoreStrengths : coreStrengths;

  const translatedTechnicalDepth = tObject<Array<{ label: string; percentage: number }>>(
    `skillPages.${resolvedSkillKey}.technicalDepth.items`,
    [],
  );

  const displayTechnicalStrengths = useMemo(() => {
    return technicalStrengths.map((tech, idx) => {
      const matched = translatedTechnicalDepth?.[idx];
      return {
        ...tech,
        label: matched?.label ?? tech.label,
        percentage: matched?.percentage ?? tech.percentage,
      };
    });
  }, [technicalStrengths, translatedTechnicalDepth]);

  return (
    <motion.div
      className="w-full space-y-6 rounded-[8px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* PAGE TITLE & SERVER TELEMETRY BAR */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-3 border-b border-border/40 pb-4 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-[8px] bg-[#0b1633] text-emerald-400 border border-emerald-900/80">
            <Server className="size-5" />
          </div>
          <div>
            <h1 className="font-inter text-xl font-black uppercase tracking-tight md:text-[22px]">
              {t(
                `skillPages.${resolvedSkillKey}.workspaceTitle`,
                `BACKEND WORKSPACE -${skillName}-`,
              )}
            </h1>
            <p className="text-[12px] text-muted-foreground">
              {t(
                `skillPages.${resolvedSkillKey}.workspaceSubtitle`,
                'Server-side runtime, architecture boundaries, and performance benchmarks',
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-900/80 bg-[#0b1633] px-3 py-1 font-mono text-[11px] font-semibold text-emerald-300">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            {t(`skillPages.${resolvedSkillKey}.clientRuntime`, 'LIVE RUNTIME')}
          </span>
          <span className="rounded-[6px] border border-border/50 bg-card px-2.5 py-1 font-mono text-[11px] font-medium text-muted-foreground">
            {t(`skillPages.${resolvedSkillKey}.lighthouseBadge`, '99.99% Uptime')}
          </span>
          <span className="rounded-[6px] border border-border/50 bg-card px-2.5 py-1 font-mono text-[11px] font-medium text-muted-foreground">
            {t(`skillPages.${resolvedSkillKey}.fpsBadge`, '< 25ms Latency')}
          </span>
        </div>
      </motion.div>

      {/* TOP ROW: INTRO CARD, PROFICIENCY GAUGE, ARCHITECTURAL PILLARS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Intro Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md md:col-span-2"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-[8px] bg-[#0b1633] text-emerald-400 border border-emerald-900/80">
              <Cpu className="size-6" />
            </div>
            <div>
              <h2 className="font-inter text-[20px] font-bold text-foreground">
                {t(`skillPages.${resolvedSkillKey}.header.title`, header.title)}
              </h2>
              <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                {t(`skillPages.${resolvedSkillKey}.header.category`, 'ARCHITECTURE & RUNTIME')}
              </p>
            </div>
          </div>
          <p className="mb-2 text-[13px] font-bold text-foreground">
            {t(`skillPages.${resolvedSkillKey}.header.subtitle`, header.subtitle)}
          </p>
          <p className="mb-6 text-[12px] leading-relaxed text-muted-foreground">
            {t(`skillPages.${resolvedSkillKey}.header.description`, header.description)}
          </p>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {metrics.map((metric, i) => {
              const Icon =
                i === 0
                  ? Clock
                  : i === 1
                    ? Folder
                    : i === 2
                      ? Award
                      : iconMap[metric.icon] || Server;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-[8px] border border-border/40 p-2 transition-colors hover:bg-white dark:hover:bg-muted/30"
                >
                  <div className="flex size-6 shrink-0 items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Icon className="size-4 shrink-0" />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-[12px] font-bold leading-tight">
                      {metric.value}
                    </span>
                    <span className="truncate text-[10px] text-muted-foreground leading-tight">
                      {metric.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Engine Proficiency Gauge */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="flex flex-col items-center justify-center rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex w-full items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">
              {t(`skillPages.${resolvedSkillKey}.mastery.title`, 'Engine Mastery')}
            </h3>
            <Activity className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <CircularProgress percentage={proficiency} size={130} strokeWidth={10}>
            <span className="text-[24px] font-black">{proficiency}%</span>
            <span className="text-[10px] font-medium text-muted-foreground">
              {t(`skillPages.${resolvedSkillKey}.mastery.label`, 'Proficiency')}
            </span>
          </CircularProgress>
        </motion.div>

        {/* Core Architectural Pillars */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">
              {t(`skillPages.${resolvedSkillKey}.designTenets.title`, 'Core Architecture')}
            </h3>
            <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <ul className="space-y-2.5">
            {displayTenets.map((reason, i) => (
              <li key={i} className="flex items-center gap-2 text-[12px]">
                <div className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span className="leading-snug">{reason}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* PIPELINE ROW: VISUAL BACKEND REQUEST-RESPONSE FLOW */}
      <motion.div
        variants={cardVariants}
        className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="size-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-inter text-[13px] font-bold uppercase tracking-wide">
              {t(
                `skillPages.${resolvedSkillKey}.pipeline.title`,
                'Runtime Execution Pipeline & Lifecycle',
              )}
            </h3>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            {t(`skillPages.${resolvedSkillKey}.pipeline.subtitle`, 'End-to-End Request Trace')}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-6">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="font-inter relative flex flex-col justify-between rounded-[8px] border border-border/40 bg-white p-3 transition-colors hover:bg-white dark:bg-muted/20 dark:hover:bg-muted/40"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {step.tag}
                  </span>
                  <Icon className="size-3.5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-inter min-h-7 text-[11px] font-bold leading-tight text-foreground">
                    {step.title}
                  </h4>
                  <p className="font-inter mt-1 text-[10px] text-muted-foreground leading-tight">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* MIDDLE ROW: PRODUCTION MICROSERVICES, ARCHITECTURAL FOCUS, IMPACT & TECH STACK */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Production Applications & Microservices */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">
              {t(`skillPages.${resolvedSkillKey}.applications.title`, 'Production Services')}
            </h3>
            <Globe className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-4">
            {displayApplications.map((app) => (
              <div
                key={app.id}
                className="flex items-start gap-3 border-b border-border/40 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-[#0b1633] text-emerald-400 border border-emerald-900/80">
                  <ServerCog className="size-5" />
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
                  <span className="rounded bg-[#0b1633] px-2 py-0.5 font-mono text-[9px] font-semibold text-emerald-300 border border-emerald-900/80">
                    {app.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What I Build (Backend Architecture Focus) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">
              {t(`skillPages.${resolvedSkillKey}.componentSystems.title`, 'Architecture Modules')}
            </h3>
            <Boxes className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {displayWhatIBuild.map((item, i) => {
              const Icon = iconMap[item.icon] || ServerCog;
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.04 }}
                  className="flex flex-col items-center justify-center gap-2 rounded-[8px] border border-border/40 bg-white p-3 text-center transition-colors hover:bg-white dark:bg-muted/20 dark:hover:bg-muted/40"
                >
                  <Icon className="size-5 text-foreground/70" />
                  <span className="text-[10px] font-medium leading-tight">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Impact & Stats + Tech Stack */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">
              {t(`skillPages.${resolvedSkillKey}.impact.title`, 'Impact & Benchmarks')}
            </h3>
            <TrendingUp className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <ul className="mb-6 space-y-2">
            {displayImpactAndStats.map((stat, i) => (
              <li key={i} className="flex justify-between text-[12px]">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="size-1.5 rounded-full bg-emerald-500" />
                  <span>{stat.label}</span>
                </div>
                <span className="font-mono font-bold text-foreground">{stat.value}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-inter mb-4 text-[14px] font-bold">
            {t(`skillPages.${resolvedSkillKey}.impact.ecosystemTitle`, 'Runtime Stack & Libraries')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05 }}
                className="rounded-[4px] border border-border/50 bg-white px-2.5 py-1 text-[11px] font-medium dark:bg-muted/30"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* BOTTOM ROW: TOOLKIT GAUGES, CORE STRENGTHS, TECHNICAL METRICS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Backend Toolkit */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">
              {t(`skillPages.${resolvedSkillKey}.toolkit.title`, 'Backend Toolkit')}
            </h3>
            <Zap className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex justify-between">
            {displayToolkit.map((tool, i) => (
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

        {/* Core Strengths */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">
              {t(
                `skillPages.${resolvedSkillKey}.architecturePrinciples.title`,
                'Architectural Principles',
              )}
            </h3>
            <Shield className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <ul className="space-y-3">
            {displayCoreStrengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px]">
                <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
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
            <h3 className="font-inter text-[14px] font-bold">
              {t(`skillPages.${resolvedSkillKey}.technicalDepth.title`, 'Technical Depth')}
            </h3>
            <Layers className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-4">
            {displayTechnicalStrengths.map((tech, i) => (
              <div key={i} className="flex items-center justify-between gap-4 text-[12px]">
                <div className="flex min-w-[140px] items-center gap-2">
                  <div className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span className="font-medium">{tech.label}</span>
                </div>
                <span className="font-mono font-bold">{tech.percentage}%</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-950">
                  <motion.div
                    className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500"
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
