'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Calendar,
  Folder,
  Star,
  BookOpen,
  Home,
  TrendingUp,
  Lock,
  User,
  CalendarDays,
  CreditCard,
  Shield,
  Settings,
  FileText,
  Layout,
  Zap,
  AlertCircle,
  Atom,
  LucideIcon,
} from 'lucide-react';
import { FrontendWorkspaceData } from '@/data/skills/react-workspace';

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  Folder,
  Star,
  BookOpen,
  Home,
  TrendingUp,
  Lock,
  User,
  CalendarDays,
  CreditCard,
  Shield,
  Settings,
  FileText,
  Layout,
  Zap,
  AlertCircle,
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
          className="text-blue-600 dark:text-blue-500"
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
      staggerChildren: 0.08,
    },
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

interface FrontendViewProps {
  data: FrontendWorkspaceData;
}

export default function FrontendView({ data }: FrontendViewProps) {
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

  return (
    <motion.div
      className="w-full space-y-6 rounded-[8px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* PAGE TITLE */}
      <motion.h1
        variants={cardVariants}
        className="font-inter text-xl font-black uppercase tracking-tight md:text-[22px]"
      >
        FRONTEND WORKSPACE -{skillName}-
      </motion.h1>

      {/* TOP ROW */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Intro Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md md:col-span-2"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-[8px] bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <Atom className="size-6" />
            </div>
            <h2 className="font-inter text-[20px] font-bold">{header.title}</h2>
          </div>
          <p className="mb-2 text-[13px] font-bold text-foreground">{header.subtitle}</p>
          <p className="mb-6 text-[12px] text-muted-foreground">{header.description}</p>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {header.metrics.map((metric, i) => {
              const Icon = iconMap[metric.icon] || Folder;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-[8px] border border-border/40 p-2 transition-colors hover:bg-muted/30"
                >
                  <div className="text-blue-600 dark:text-blue-400">
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

        {/* Animated Gauge Ring - Proficiency */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="flex flex-col items-center justify-center rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <h3 className="font-inter mb-4 w-full text-left text-[14px] font-bold">Proficiency</h3>
          <CircularProgress percentage={proficiency} size={130} strokeWidth={10}>
            <span className="text-[24px] font-black">{proficiency}%</span>
            <span className="text-[10px] text-muted-foreground">Proficiency</span>
          </CircularProgress>
        </motion.div>

        {/* Why I love Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <h3 className="font-inter mb-4 text-[14px] font-bold">Why i love {header.title}</h3>
          <ul className="space-y-2.5">
            {whyILove.map((reason, i) => (
              <li key={i} className="flex items-center gap-2 text-[12px]">
                <div className="size-1.5 shrink-0 rounded-full bg-blue-500" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* MIDDLE ROW */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Applications */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <h3 className="font-inter mb-4 text-[14px] font-bold">
            Portfolio Applications Built with {header.title}
          </h3>
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="flex items-start gap-4 border-b border-border/40 pb-4 last:border-0 last:pb-0"
              >
                <div className="h-16 w-24 shrink-0 rounded-[6px] bg-muted transition-opacity hover:opacity-80" />
                <div className="flex-1">
                  <div className="mb-1 flex items-start justify-between">
                    <h4 className="font-inter text-[13px] font-bold">{app.title}</h4>
                    <span className="flex items-center gap-1 text-[10px] font-medium text-green-600 dark:text-green-400">
                      <div className="size-1.5 rounded-full bg-green-500" /> {app.status}
                    </span>
                  </div>
                  <p className="mb-2 line-clamp-2 text-[11px] text-muted-foreground">
                    {app.description}
                  </p>
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                    {app.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What I Build */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <h3 className="font-inter mb-4 text-[14px] font-bold">
            What I Build with {header.title}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {whatIBuild.map((item, i) => {
              const Icon = iconMap[item.icon] || Home;
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

        {/* Impact & Stats + Tech Stack */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <h3 className="font-inter mb-4 text-[14px] font-bold">Impact & Stats</h3>
          <ul className="mb-6 space-y-2">
            {impactAndStats.map((stat, i) => (
              <li key={i} className="flex justify-between text-[12px]">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="size-1.5 rounded-full bg-blue-500" />
                  <span>{stat.label}</span>
                </div>
                <span className="font-bold">{stat.value}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-inter mb-4 text-[14px] font-bold">
            Tech Stack Around {header.title}
          </h3>
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

      {/* BOTTOM ROW */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Toolkit */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <h3 className="font-inter mb-6 text-[14px] font-bold">My {header.title} Toolkit</h3>
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

        {/* Core Strengths */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <h3 className="font-inter mb-4 text-[14px] font-bold">Key Strengths</h3>
          <ul className="space-y-3">
            {coreStrengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px]">
                <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-500" />
                <span className="leading-snug text-muted-foreground">{strength}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Technical Strengths */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <h3 className="font-inter mb-4 text-[14px] font-bold">Key Strengths</h3>
          <div className="space-y-4">
            {technicalStrengths.map((tech, i) => (
              <div key={i} className="flex items-center justify-between gap-4 text-[12px]">
                <div className="flex min-w-[140px] items-center gap-2">
                  <div className="size-1.5 shrink-0 rounded-full bg-blue-500" />
                  <span className="font-medium">{tech.label}</span>
                </div>
                <span className="font-bold">{tech.percentage}%</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
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
