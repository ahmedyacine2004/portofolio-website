'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Server,
  Globe,
  Code2,
  Clock,
  User,
  Database,
  ShieldCheck,
  HardDrive,
  Mail,
  Bot,
  Zap,
  FolderGit2,
  GraduationCap,
  MessageSquare,
  BarChart3,
  KeyRound,
  CheckCircle2,
  Cloud,
  Lock,
  Boxes,
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

// Helper function to build ultra-smooth cubic Bezier path from point array
function pointsToSmoothPath(points: number[], width = 100): string {
  if (points.length === 0) return '';
  const step = width / (points.length - 1);

  let d = `M 0 ${points[0].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const x1 = i * step;
    const y1 = points[i];
    const x2 = (i + 1) * step;
    const y2 = points[i + 1];

    const cx1 = x1 + step * 0.45;
    const cy1 = y1;
    const cx2 = x2 - step * 0.45;
    const cy2 = y2;

    d += ` C ${cx1.toFixed(1)} ${cy1.toFixed(1)}, ${cx2.toFixed(1)} ${cy2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  return d;
}

interface LiveMetricRowProps {
  label: string;
  type: 'requests' | 'latency' | 'error' | 'throughput' | 'data';
  color?: string;
  baseline?: number;
  variance?: number;
  updateInterval?: number;
}

function LiveMetricRow({
  label,
  type,
  color = '#2563eb',
  baseline = 15,
  variance = 8,
  updateInterval = 300,
}: LiveMetricRowProps) {
  const pointCount = 12;
  const isFlat = type === 'error';

  // State for points array
  const [points, setPoints] = useState<number[]>(() =>
    Array.from({ length: pointCount }, () =>
      isFlat ? baseline : Math.max(4, Math.min(26, baseline + (Math.random() - 0.5) * variance)),
    ),
  );

  // States for live numeric display
  const [displayVal, setDisplayVal] = useState<string>('0');
  const [requestCount, setRequestCount] = useState<number>(1248);
  const [gbTransferred, setGbTransferred] = useState<number>(2.42);

  // Synchronized graph and number updater
  useEffect(() => {
    const timer = setInterval(() => {
      setPoints((prev) => {
        const nextPoints = [...prev.slice(1)];
        let nextVal = baseline;

        if (type === 'error') {
          // Heartbeat spike logic
          const isSpike = Math.random() > 0.92;
          nextVal = isSpike ? 6 : 24;
          setDisplayVal(isSpike ? '0.01%' : '0.00%');
        } else if (type === 'requests') {
          const delta = (Math.random() - 0.5) * (variance * 0.8);
          nextVal = Math.max(4, Math.min(26, prev[prev.length - 1] + delta));
          setRequestCount((c) => {
            const nextC = c + (Math.random() > 0.4 ? 1 : 0);
            setDisplayVal(nextC.toLocaleString());
            return nextC;
          });
        } else if (type === 'latency') {
          const delta = (Math.random() - 0.5) * (variance * 0.8);
          nextVal = Math.max(4, Math.min(26, prev[prev.length - 1] + delta));
          // Map SVG height (26 = high ms, 4 = low ms) to latency value
          const ms = Math.round(150 + (26 - nextVal) * 3.5);
          setDisplayVal(`${ms} ms`);
        } else if (type === 'throughput') {
          const delta = (Math.random() - 0.5) * (variance * 0.8);
          nextVal = Math.max(4, Math.min(26, prev[prev.length - 1] + delta));
          // Map SVG height to req/s rate
          const reqs = Math.round(28 + (26 - nextVal) * 1.5);
          setDisplayVal(`${reqs} req/s`);
        } else if (type === 'data') {
          const delta = (Math.random() - 0.5) * (variance * 0.8);
          nextVal = Math.max(4, Math.min(26, prev[prev.length - 1] + delta));
          setGbTransferred((gb) => {
            const nextGb = gb + 0.001;
            setDisplayVal(`${nextGb.toFixed(2)} GB`);
            return nextGb;
          });
        }

        nextPoints.push(nextVal);
        return nextPoints;
      });
    }, updateInterval);

    return () => clearInterval(timer);
  }, [baseline, variance, type, updateInterval]);

  const pathD = pointsToSmoothPath(points);

  return (
    <div className="flex items-center justify-between rounded-[8px] border border-border/30 bg-muted/20 px-3 py-1.5">
      <div>
        <p className="text-[10px] text-muted-foreground">{label}</p>
        <p className="font-mono text-[13px] font-bold text-foreground">{displayVal}</p>
      </div>
      <div className="relative h-7 w-24 overflow-hidden flex items-center">
        <svg className="h-7 w-full fill-none overflow-visible" viewBox="0 0 100 30">
          <motion.path
            d={pathD}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: 1,
              d: pathD,
            }}
            transition={{
              pathLength: { duration: 0.9, ease: 'easeOut' },
              d: { duration: updateInterval / 1000, ease: 'linear' },
            }}
          />
        </svg>
      </div>
    </div>
  );
}

export default function BackendView() {
  return (
    <motion.div
      className="h-full w-full space-y-5 rounded-[8px] p-6 overflow-y-auto overflow-x-hidden bg-background text-foreground"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* TOP HEADER BAR */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-4 border-b border-border/40 pb-4 lg:flex-row lg:items-center"
      >
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-foreground">
              BACK-END WORKSPACE
            </h1>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </span>
          </div>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Powering my portfolio with scalable, secure and performant backend architecture.
          </p>
        </div>

        {/* System Status Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-sm">
            <Boxes className="size-4 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col">
              <span className="text-[12px] font-bold leading-none">Production</span>
              <span className="text-[10px] text-muted-foreground">Environment</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-sm">
            <Globe className="size-4 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col">
              <span className="text-[12px] font-bold leading-none">Algeria-East</span>
              <span className="text-[10px] text-muted-foreground">Region</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-sm">
            <Code2 className="size-4 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col">
              <span className="text-[12px] font-bold leading-none">v2.4.1</span>
              <span className="text-[10px] text-muted-foreground">Version</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-sm">
            <Clock className="size-4 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col">
              <span className="text-[12px] font-bold leading-none">99.99%</span>
              <span className="text-[10px] text-muted-foreground">Uptime</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ROW 1: INCOMING REQUEST, PROCESSING PIPELINE, RESPONSE, LIVE METRICS */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* INCOMING REQUEST */}
        <motion.div
          variants={cardVariants}
          className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-3"
        >
          <h2 className="font-inter mb-4 text-[13px] font-bold tracking-wide uppercase text-foreground">
            INCOMING REQUEST
          </h2>

          <div className="mb-4 flex flex-col items-center rounded-[10px] bg-muted/30 p-4 text-center border border-border/30">
            <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <User className="size-6" />
            </div>
            <span className="text-[12px] font-mono font-bold text-foreground">
              IP: 197.45.23.11
            </span>
          </div>

          <div className="space-y-1.5 rounded-[8px] bg-blue-50/50 dark:bg-blue-950/30 p-3 font-mono text-[11px] border border-blue-100 dark:border-blue-900/40">
            <div className="font-bold text-blue-700 dark:text-blue-300">GET /skills/backend</div>
            <div className="text-muted-foreground truncate">User-Agent: Mozilla/5.0 ...</div>
            <div className="text-muted-foreground truncate">Accept: text/html, ...</div>
          </div>

          <div className="mt-4 text-center font-mono text-[11px] text-muted-foreground">
            Time: <span className="font-bold text-foreground">09:42:18 AM</span>
          </div>
        </motion.div>

        {/* PROCESSING PIPELINE */}
        <motion.div
          variants={cardVariants}
          className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-3"
        >
          <h2 className="font-inter mb-4 text-[13px] font-bold tracking-wide uppercase text-foreground">
            PROCESSING PIPELINE
          </h2>

          <div className="relative space-y-3.5 pl-4 before:absolute before:left-1.5 before:top-2 before:h-[88%] before:w-0.5 before:bg-blue-500/30">
            {[
              { title: 'Authentication Middleware', sub: 'JWT Verification' },
              { title: 'Request Validation', sub: 'Schema Validation' },
              { title: 'Route Resolution', sub: '/skills/backend - BackendController' },
              { title: 'Business Logic', sub: 'Fetching backend workspace data' },
              { title: 'Database Query', sub: 'Optimized Query Execution' },
              { title: 'Response Formatter', sub: 'Transform & Serialize' },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[19px] top-1 size-2.5 rounded-full bg-blue-600 dark:bg-blue-400 ring-4 ring-card" />
                <p className="text-[12px] font-bold leading-tight text-foreground">{step.title}</p>
                <p className="text-[10px] text-muted-foreground">{step.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RESPONSE */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-2"
        >
          <h2 className="font-inter text-[13px] font-bold tracking-wide uppercase text-foreground">
            RESPONSE
          </h2>

          <div className="my-2 flex flex-col items-center text-center">
            <CheckCircle2 className="size-12 text-emerald-500 mb-2" />
            <span className="text-[10px] text-muted-foreground uppercase font-medium">Status</span>
            <span className="text-[18px] font-black text-emerald-600 dark:text-emerald-400 leading-tight">
              200 OK
            </span>
          </div>

          <div className="space-y-1.5 border-t border-border/40 pt-3 text-center text-[11px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time</span>
              <span className="font-bold">247 ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Size</span>
              <span className="font-bold">28.4 KB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cache</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">HIT</span>
            </div>
          </div>

          <div className="mt-2 text-center font-mono text-[10px] text-muted-foreground">
            Delivered <br />
            <span className="font-bold text-foreground">09:42:18 AM</span>
          </div>
        </motion.div>

        {/* LIVE METRICS WITH SYNCHRONIZED GRAPH & NUMBERS */}
        <motion.div
          variants={cardVariants}
          className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-4"
        >
          <h2 className="font-inter mb-3 text-[13px] font-bold tracking-wide uppercase text-foreground">
            LIVE METRICS
          </h2>

          <div className="space-y-2">
            <LiveMetricRow
              label="Requests Today"
              type="requests"
              baseline={14}
              variance={10}
              updateInterval={220}
              color="#2563eb"
            />
            <LiveMetricRow
              label="Avg Response Time"
              type="latency"
              baseline={18}
              variance={8}
              updateInterval={280}
              color="#2563eb"
            />
            <LiveMetricRow
              label="Error Rate"
              type="error"
              baseline={24}
              variance={0}
              updateInterval={350}
              color="#10b981"
            />
            <LiveMetricRow
              label="Throughput"
              type="throughput"
              baseline={12}
              variance={12}
              updateInterval={250}
              color="#2563eb"
            />
            <LiveMetricRow
              label="Data Transferred"
              type="data"
              baseline={16}
              variance={9}
              updateInterval={300}
              color="#2563eb"
            />
          </div>
        </motion.div>
      </div>

      {/* ROW 2: ACTIVE SERVICES, REQUEST TIMELINE, INFRASTRUCTURE */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* ACTIVE SERVICES */}
        <motion.div
          variants={cardVariants}
          className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm"
        >
          <h2 className="font-inter mb-4 text-[13px] font-bold tracking-wide uppercase text-foreground">
            ACTIVE SERVICES
          </h2>

          <div className="space-y-2.5">
            {[
              { name: 'Portfolio API', path: '/api', icon: Server },
              { name: 'Authentication', path: '/auth', icon: Lock },
              { name: 'Projects Service', path: '/projects', icon: FolderGit2 },
              { name: 'Skills Service', path: '/skills', icon: Code2 },
              { name: 'Experience Service', path: '/experience', icon: GraduationCap },
              { name: 'Contact Service', path: '/contact', icon: MessageSquare },
              { name: 'AI Assistant', path: '/ai', icon: Bot },
              { name: 'Analytics Service', path: '/analytics', icon: BarChart3 },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-[8px] border border-border/30 bg-muted/20 px-3 py-2"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4 text-blue-600 dark:text-blue-400" />
                    <div>
                      <span className="text-[12px] font-bold text-foreground">{service.name} </span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {service.path}
                      </span>
                    </div>
                  </div>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Running
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* REQUEST TIMELINE */}
        <motion.div
          variants={cardVariants}
          className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm"
        >
          <h2 className="font-inter mb-4 text-[13px] font-bold tracking-wide uppercase text-foreground">
            REQUEST TIMELINE
          </h2>

          <div className="relative space-y-4 pl-4 before:absolute before:left-1.5 before:top-2 before:h-[90%] before:w-0.5 before:bg-blue-500/30">
            {[
              {
                title: 'Request Received',
                detail: 'GET /skills/backend',
                time: '09:42:18',
              },
              {
                title: 'Middleware Passed',
                detail: 'Auth, CORS, Helmet, RateLimit',
                time: '09:42:18',
              },
              {
                title: 'Route Resolved',
                detail: 'BackendController.getWorkspace',
                time: '09:42:18',
              },
              {
                title: 'Business Logic Executed',
                detail: 'Fetching workspace data',
                time: '09:42:18',
              },
              {
                title: 'Database Access',
                detail: 'MongoDB Query (12ms)',
                time: '09:42:19',
              },
              {
                title: 'Response Sent',
                detail: '200 OK (247ms)',
                time: '09:42:18',
              },
            ].map((step, idx) => (
              <div key={idx} className="relative flex items-start justify-between">
                <span className="absolute -left-[19px] top-1 size-2.5 rounded-full bg-blue-600 dark:bg-blue-400 ring-4 ring-card" />
                <div>
                  <p className="text-[12px] font-bold leading-tight text-foreground">
                    {step.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{step.detail}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] text-muted-foreground">{step.time}</span>
                  <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[8px] font-bold text-emerald-600 dark:text-emerald-400">
                    200 OK
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ACTIVE SERVICES (INFRASTRUCTURE) */}
        <motion.div
          variants={cardVariants}
          className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm"
        >
          <h2 className="font-inter mb-4 text-[13px] font-bold tracking-wide uppercase text-foreground">
            ACTIVE SERVICES (INFRASTRUCTURE)
          </h2>

          <div className="space-y-2.5">
            {[
              { name: 'Database Connection', provider: 'MongoDB Atlas', icon: Database },
              { name: 'Cache Layer', provider: 'Redis Cloud', icon: Zap },
              { name: 'File Storage', provider: 'Cloudinary', icon: HardDrive },
              { name: 'Email Service', provider: 'Resend', icon: Mail },
              { name: 'AI Integration', provider: 'Session Management', icon: Bot },
              { name: 'OpenAI API', provider: 'JWT + Redis', icon: ShieldCheck },
              { name: 'CDN', provider: 'Cloudflare', icon: Cloud },
            ].map((infra, idx) => {
              const Icon = infra.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-[8px] border border-border/30 bg-muted/20 px-3 py-2"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <span className="text-[12px] font-bold text-foreground">{infra.name} </span>
                      <span className="text-[10px] text-muted-foreground">{infra.provider}</span>
                    </div>
                  </div>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Healthy
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ROW 3: REGISTERED MODULES */}
      <motion.div
        variants={cardVariants}
        className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm"
      >
        <h2 className="font-inter mb-4 text-[13px] font-bold tracking-wide uppercase text-foreground">
          REGISTERED MODULES
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {[
            {
              name: 'Authentication',
              desc: 'User auth & security',
              count: '12',
              icon: KeyRound,
            },
            {
              name: 'Projects',
              desc: 'Portfolio projects',
              count: '18',
              icon: FolderGit2,
            },
            {
              name: 'Skills',
              desc: 'Skills management',
              count: '14',
              icon: Code2,
            },
            {
              name: 'Experience',
              desc: 'Work experience',
              count: '10',
              icon: GraduationCap,
            },
            {
              name: 'Certifications',
              desc: 'Certificates & badges',
              count: '8',
              icon: ShieldCheck,
            },
            {
              name: 'Contact',
              desc: 'Contact & messages',
              count: '6',
              icon: MessageSquare,
            },
            {
              name: 'AI Assistant',
              desc: 'AI chat integrations',
              count: '9',
              icon: Bot,
            },
            {
              name: 'Analytics',
              desc: 'Visitor analytics',
              count: '11',
              icon: BarChart3,
            },
          ].map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-[8px] border border-border/40 bg-muted/20 p-3 transition-colors hover:bg-muted/40"
              >
                <div>
                  <div className="mb-2 flex items-center gap-1.5">
                    <Icon className="size-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="text-[11px] font-bold text-foreground truncate">
                      {mod.name}
                    </span>
                  </div>
                  <p className="text-[9px] text-muted-foreground truncate">{mod.desc}</p>
                </div>
                <div className="mt-3 flex items-baseline justify-between border-t border-border/30 pt-2">
                  <span className="text-[16px] font-black text-foreground">{mod.count}</span>
                  <span className="text-[8px] uppercase text-muted-foreground">endpoints</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
