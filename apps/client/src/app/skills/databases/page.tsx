/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  Database,
  Layers,
  ShieldCheck,
  User,
  FolderGit2,
  Code2,
  GraduationCap,
  Award,
  MessageSquare,
  BarChart3,
  Bot,
  Cloud,
  Boxes,
  KeyRound,
  ChevronDown,
  Terminal,
  Activity,
  Zap,
  Clock,
} from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

// Data for Recharts
const timelineData = [
  { day: 'May 9', val: 160 },
  { day: 'May 10', val: 270 },
  { day: 'May 11', val: 210 },
  { day: 'May 12', val: 512 },
  { day: 'May 13', val: 460 },
  { day: 'May 14', val: 600 },
  { day: 'May 15', val: 720 },
];

// Database Brand Icons
const MongoDbIcon = () => (
  <svg className="size-5 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C11.5 2 11 5 11 8c0 3.5 1 6.5 1 10 0-3.5 1-6.5 1-10 0-3-.5-6-1-6zm-1.8 17.5c-.8-1.8-2.2-4.1-2.2-6.5 0-2.8 1.5-5.2 3.2-7.8-.3 1.2-.2 2.8-.2 4.3 0 3.2 1 6 1 10 0 0-1.2 0-2-.5zm3.6 0c.8-1.8 2.2-4.1 2.2-6.5 0-2.8-1.5-5.2-3.2-7.8.3 1.2.2 2.8.2 4.3 0 3.2-1 6-1 10 0 0 1.2 0 2-.5z" />
  </svg>
);

const PostgresIcon = () => (
  <svg className="size-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
  </svg>
);

const MysqlIcon = () => (
  <svg className="size-5 text-sky-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 21l3.52-.92C9.28 20.66 10.6 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
  </svg>
);

const RedisIcon = () => (
  <svg className="size-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M2 7l10-5 10 5-10 5L2 7zm0 5l10 5 10-5M2 17l10 5 10-5"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const SqliteIcon = () => (
  <svg className="size-5 text-cyan-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z" />
  </svg>
);

// Animated Donut Gauge Component
function AnimatedImpactGauge({ score = 96 }: { score?: number }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex size-20 items-center justify-center">
      <svg className="size-full transform -rotate-90" viewBox="0 0 84 84">
        <circle
          cx="42"
          cy="42"
          r={radius}
          stroke="currentColor"
          strokeWidth="6.5"
          className="text-muted/20"
          fill="none"
        />
        <motion.circle
          cx="42"
          cy="42"
          r={radius}
          stroke="#2563eb"
          strokeWidth="6.5"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="font-mono text-[14px] font-black leading-none text-foreground">
          {score}
          <span className="text-[9px] font-normal text-muted-foreground">/100</span>
        </span>
      </div>
    </div>
  );
}

// Recharts Custom Tooltip Component
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-[8px] border border-border/50 bg-card px-2.5 py-1 shadow-md text-center">
        <div className="text-[9px] font-semibold text-muted-foreground">{label}</div>
        <div className="text-[10.5px] font-mono font-bold text-foreground leading-none mt-0.5">
          Requests <span className="text-blue-600">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

// Request Timeline Chart using Recharts Library
function RequestTimelineChart() {
  return (
    <div className="w-full h-[200px] pt-1">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -24, bottom: 0 }}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />

          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fill: 'currentColor' }}
            className="text-muted-foreground/70 font-mono"
          />

          <YAxis
            ticks={[0, 250, 500, 750, 1000]}
            tickFormatter={(val) => (val === 1000 ? '1k' : val.toString())}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fill: 'currentColor' }}
            className="text-muted-foreground/70 font-mono"
          />

          <Tooltip content={<CustomChartTooltip />} />

          <Area
            type="monotone"
            dataKey="val"
            stroke="#2563eb"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#areaGradient)"
            dot={{ r: 3.5, stroke: '#2563eb', strokeWidth: 2, fill: 'var(--background)' }}
            activeDot={{ r: 5.5, stroke: '#2563eb', strokeWidth: 2.5, fill: 'var(--background)' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function DatabasesView() {
  return (
    <motion.div
      className="h-full w-full space-y-5 rounded-[8px] p-6 overflow-y-auto overflow-x-hidden bg-background text-foreground"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* HEADER BAR */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-4 border-b border-border/40 pb-4 lg:flex-row lg:items-center"
      >
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-foreground">
              DATABASES WORKSPACE
            </h1>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </span>
          </div>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Designing structured, efficient, and scalable data models to power real-world portfolio
            features.
          </p>
        </div>

        {/* System Status Cards */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-sm">
            <Boxes className="size-4 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col">
              <span className="text-[12px] font-bold leading-none">Production</span>
              <span className="text-[10px] text-muted-foreground">Environment</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-sm">
            <Layers className="size-4 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col">
              <span className="text-[12px] font-bold leading-none">Data Modeling</span>
              <span className="text-[10px] text-muted-foreground">Primary Focus</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-sm">
            <ShieldCheck className="size-4 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col">
              <span className="text-[12px] font-bold leading-none">
                Clean . Scalable . Reliable
              </span>
              <span className="text-[10px] text-muted-foreground">Philosophy</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ROW 1: TOP STAT CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        <motion.div
          variants={cardVariants}
          className="relative flex items-center justify-between overflow-hidden rounded-[12px] border border-border/40 bg-card p-4 shadow-sm lg:col-span-4"
        >
          <div className="flex items-center gap-3.5 z-10">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-[10px] bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Cloud className="size-5" />
            </div>
            <div>
              <h2 className="text-[16px] font-black tracking-tight text-foreground">
                Data Architecture
              </h2>
              <p className="text-[11px] text-muted-foreground leading-snug">
                Well-structured models driving my portfolio experience.
              </p>
            </div>
          </div>

          <div className="relative z-10 hidden xl:block">
            <div className="flex size-11 flex-col items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-700 p-2 text-white shadow-md">
              <Database className="size-5 animate-pulse" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-4 shadow-sm lg:col-span-2"
        >
          <span className="text-[11px] font-medium text-muted-foreground">
            Collections / Tables
          </span>
          <div className="my-1 text-[28px] font-black text-foreground leading-none">12</div>
          <span className="text-[11px] font-semibold text-muted-foreground">Well Designed</span>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-4 shadow-sm lg:col-span-2"
        >
          <span className="text-[11px] font-medium text-muted-foreground">Relationships</span>
          <div className="my-1 text-[28px] font-black text-foreground leading-none">28</div>
          <span className="text-[11px] font-semibold text-muted-foreground">Optimized</span>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-4 shadow-sm lg:col-span-2"
        >
          <span className="text-[11px] font-medium text-muted-foreground">Queries Written</span>
          <div className="my-1 text-[28px] font-black text-foreground leading-none">150+</div>
          <span className="text-[11px] font-semibold text-muted-foreground">
            Portfolio Oriented
          </span>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="flex flex-col items-center justify-between rounded-[12px] border border-border/40 bg-card p-3 shadow-sm lg:col-span-2"
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">
            Impact & Stats
          </span>
          <AnimatedImpactGauge score={96} />
        </motion.div>
      </div>

      {/* ROW 2: CORE DATA DOMAINS | REQUEST TIMELINE | RIGHT SIDEBAR */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-stretch">
        {/* CORE DATA DOMAINS */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-4 shadow-sm lg:col-span-4"
        >
          <h2 className="font-inter mb-2 text-[12px] font-bold tracking-wide uppercase text-foreground">
            Core Data Domains
          </h2>

          <div className="flex flex-col justify-between flex-1 gap-1.5">
            {[
              {
                title: 'Users & Identity',
                sub: 'Profiles, auth & preferences',
                count: 1,
                icon: User,
                active: true,
              },
              {
                title: 'Projects',
                sub: 'Portfolio projects & details',
                count: 1,
                icon: FolderGit2,
              },
              { title: 'Skills', sub: 'Technologies & expertise', count: 3, icon: Code2 },
              { title: 'Experience', sub: 'Work history & roles', count: 2, icon: GraduationCap },
              { title: 'Certifications', sub: 'Achievements & credentials', count: 2, icon: Award },
              {
                title: 'Contact & Messages',
                sub: 'Messages from visitors',
                count: 3,
                icon: MessageSquare,
              },
              { title: 'Analytics', sub: 'Visitor insights & stats', count: 1, icon: BarChart3 },
              { title: 'AI Assistant', sub: 'Chat history & knowledge', count: 1, icon: Bot },
            ].map((domain, idx) => {
              const Icon = domain.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between rounded-[8px] border px-2.5 py-1.5 transition-colors ${
                    domain.active
                      ? 'border-blue-500/30 bg-blue-50/40 dark:bg-blue-950/20'
                      : 'border-border/30 bg-muted/20 hover:bg-muted/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-6 items-center justify-center rounded-[6px] bg-background text-blue-600 dark:text-blue-400 border border-border/40">
                      <Icon className="size-3" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-foreground leading-tight">
                        {domain.title}
                      </p>
                      <p className="text-[9px] text-muted-foreground">{domain.sub}</p>
                    </div>
                  </div>
                  <span className="flex size-4.5 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
                    {domain.count}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* REQUEST TIMELINE */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-4 shadow-sm lg:col-span-5"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-inter text-[12px] font-bold tracking-wide uppercase text-foreground">
                REQUEST TIMELINE
              </h2>
              <button className="flex items-center gap-1 rounded-[6px] border border-border/50 bg-muted/30 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                Last 7 days <ChevronDown className="size-3" />
              </button>
            </div>

            <RequestTimelineChart />
          </div>

          {/* Timeline Metrics Bar */}
          <div className="mt-2 grid grid-cols-3 gap-2 border-t border-border/30 pt-2.5">
            <div className="flex items-center gap-2 rounded-[8px] bg-muted/20 border border-border/30 p-2">
              <Activity className="size-3.5 text-blue-600 shrink-0" />
              <div>
                <p className="text-[9px] text-muted-foreground font-medium">Total Volume</p>
                <p className="text-[11px] font-mono font-black text-foreground">2,932 reqs</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-[8px] bg-muted/20 border border-border/30 p-2">
              <Zap className="size-3.5 text-amber-500 shrink-0" />
              <div>
                <p className="text-[9px] text-muted-foreground font-medium">Peak Rate</p>
                <p className="text-[11px] font-mono font-black text-foreground">720 req/d</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-[8px] bg-muted/20 border border-border/30 p-2">
              <Clock className="size-3.5 text-emerald-500 shrink-0" />
              <div>
                <p className="text-[9px] text-muted-foreground font-medium">Avg Latency</p>
                <p className="text-[11px] font-mono font-black text-foreground">14ms</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDEBAR */}
        <div className="flex flex-col justify-between gap-3 lg:col-span-3">
          {/* Knowledge Highlights */}
          <motion.div
            variants={cardVariants}
            className="rounded-[12px] border border-border/40 bg-card p-3.5 shadow-sm"
          >
            <h2 className="font-inter mb-2 text-[11px] font-bold tracking-wide uppercase text-foreground">
              Knowledge Highlights
            </h2>

            <div className="space-y-1.5 text-[10px]">
              {[
                'Normalized & scalable data modeling',
                'Optimized queries & indexing strategies',
                'Relationships & data integrity',
                'Aggregation & advanced queries',
                'Performance tuning & caching',
                'Security & access control',
                'NoSQL & SQL hybrid approach',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[8px] font-bold text-white mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-foreground/90 font-medium leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technologies & Databases */}
          <motion.div
            variants={cardVariants}
            className="rounded-[12px] border border-border/40 bg-card p-3 shadow-sm"
          >
            <h2 className="font-inter mb-2 text-[11px] font-bold tracking-wide uppercase text-foreground">
              Technologies & Databases
            </h2>

            <div className="flex items-center justify-around rounded-[8px] bg-muted/20 border border-border/30 py-2">
              <MongoDbIcon />
              <PostgresIcon />
              <MysqlIcon />
              <RedisIcon />
              <SqliteIcon />
            </div>
          </motion.div>

          {/* Query Sample */}
          <motion.div
            variants={cardVariants}
            className="rounded-[12px] border border-border/40 bg-card p-3 shadow-sm"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <Terminal className="size-3 text-blue-600" />
              <h2 className="font-inter text-[11px] font-bold tracking-wide uppercase text-foreground">
                Query Sample
              </h2>
            </div>

            <div className="rounded-[6px] bg-slate-950 p-2 font-mono text-[9.5px] leading-tight text-blue-300 border border-slate-800">
              <pre className="text-slate-200">
                <span className="text-purple-400 font-bold">SELECT</span> p.title, p.tech,{'\n'}
                {'       '}
                <span className="text-yellow-400">COUNT</span>(*){'\n'}
                <span className="text-purple-400 font-bold">FROM</span> projects p{'\n'}
                <span className="text-purple-400 font-bold">WHERE</span> p.featured ={' '}
                <span className="text-emerald-400">true</span>
                {'\n'}
                <span className="text-purple-400 font-bold">LIMIT</span>{' '}
                <span className="text-orange-400">6</span>;
              </pre>
            </div>
            <p className="mt-1 text-[9px] text-muted-foreground font-mono">
              Purpose: Fetch featured projects
            </p>
          </motion.div>
        </div>
      </div>

      {/* ROW 3: REGISTERED MODULES */}
      <motion.div
        variants={cardVariants}
        className="rounded-[12px] border border-border/40 bg-card p-4 shadow-sm"
      >
        <h2 className="font-inter mb-3 text-[12px] font-bold tracking-wide uppercase text-foreground">
          REGISTERED MODULES
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            {
              name: 'Authentication',
              sub: 'User auth & security',
              count: '12',
              icon: KeyRound,
            },
            {
              name: 'Projects',
              sub: 'Portfolio projects',
              count: '18',
              icon: FolderGit2,
            },
            {
              name: 'Skills',
              sub: 'Skills management',
              count: '14',
              icon: Code2,
            },
            {
              name: 'Experience',
              sub: 'Work experience',
              count: '10',
              icon: GraduationCap,
            },
            {
              name: 'Certifications',
              sub: 'Certificates & badges',
              count: '8',
              icon: Award,
            },
          ].map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-[8px] border border-border/40 bg-muted/20 p-2.5 transition-colors hover:bg-muted/40"
              >
                <div>
                  <div className="mb-1 flex items-center gap-1.5">
                    <Icon className="size-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="text-[11px] font-bold text-foreground truncate">
                      {mod.name}
                    </span>
                  </div>
                  <p className="text-[9px] text-muted-foreground truncate">{mod.sub}</p>
                </div>
                <div className="mt-2 flex items-baseline justify-between border-t border-border/30 pt-1.5">
                  <span className="text-[16px] font-black text-foreground">{mod.count}</span>
                  <span className="text-[8px] uppercase text-muted-foreground">Endpoints</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
