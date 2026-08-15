'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Clock,
  Cloud,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  FileCode2,
  Fingerprint,
  FolderGit2,
  Gauge,
  Globe,
  GraduationCap,
  HardDrive,
  KeyRound,
  Layers,
  Layers3,
  Lock,
  LucideIcon,
  MessageSquare,
  Network,
  Play,
  Radio,
  RefreshCw,
  Server,
  ServerCog,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  TrendingUp,
  Workflow,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Smooth cubic Bezier SVG path generator for sparklines
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
  color = '#10b981',
  baseline = 15,
  variance = 8,
  updateInterval = 300,
}: LiveMetricRowProps) {
  const pointCount = 12;
  const isFlat = type === 'error';

  const [points, setPoints] = useState<number[]>(() =>
    Array.from({ length: pointCount }, () =>
      isFlat ? baseline : Math.max(4, Math.min(26, baseline + (Math.random() - 0.5) * variance)),
    ),
  );

  const [displayVal, setDisplayVal] = useState<string>('0');

  useEffect(() => {
    const timer = setInterval(() => {
      setPoints((prev) => {
        const nextPoints = [...prev.slice(1)];
        let nextVal = baseline;

        if (type === 'error') {
          const isSpike = Math.random() > 0.95;
          nextVal = isSpike ? 8 : 24;
          setDisplayVal(isSpike ? '0.01%' : '0.00%');
        } else if (type === 'requests') {
          const delta = (Math.random() - 0.5) * (variance * 0.8);
          nextVal = Math.max(4, Math.min(26, prev[prev.length - 1] + delta));
          setDisplayVal((prevVal) => {
            const current = parseInt(prevVal.replace(/,/g, ''), 10) || 14820;
            const inc = Math.random() > 0.3 ? Math.floor(Math.random() * 3) + 1 : 0;
            return (current + inc).toLocaleString();
          });
        } else if (type === 'latency') {
          const delta = (Math.random() - 0.5) * (variance * 0.8);
          nextVal = Math.max(4, Math.min(26, prev[prev.length - 1] + delta));
          const ms = Math.round(18 + (26 - nextVal) * 0.8);
          setDisplayVal(`${ms} ms`);
        } else if (type === 'throughput') {
          const delta = (Math.random() - 0.5) * (variance * 0.8);
          nextVal = Math.max(4, Math.min(26, prev[prev.length - 1] + delta));
          const reqs = Math.round(120 + (26 - nextVal) * 4.2);
          setDisplayVal(`${reqs} req/s`);
        } else if (type === 'data') {
          const delta = (Math.random() - 0.5) * (variance * 0.8);
          nextVal = Math.max(4, Math.min(26, prev[prev.length - 1] + delta));
          setDisplayVal((prevVal) => {
            const current = parseFloat(prevVal.replace(' GB', '')) || 3.84;
            return `${(current + 0.002).toFixed(2)} GB`;
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
    <div className="flex items-center justify-between rounded-[8px] border border-border/30 bg-muted/20 px-3 py-2">
      <div>
        <p className="text-[10px] text-muted-foreground">{label}</p>
        <p className="font-mono text-[13px] font-bold text-foreground">{displayVal}</p>
      </div>
      <div className="relative flex h-7 w-24 items-center overflow-hidden">
        <svg className="h-7 w-full overflow-visible fill-none" viewBox="0 0 100 30">
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
              pathLength: { duration: 0.8, ease: 'easeOut' },
              d: { duration: updateInterval / 1000, ease: 'linear' },
            }}
          />
        </svg>
      </div>
    </div>
  );
}

// 5-Tier Layered Architecture Blueprint Definition
interface ArchitectureTier {
  id: string;
  tierNumber: string;
  title: string;
  subtitle: string;
  color: string;
  badge: string;
  icon: LucideIcon;
  components: {
    name: string;
    role: string;
    protocolOrTech: string;
  }[];
}

const ARCHITECTURE_TIERS: ArchitectureTier[] = [
  {
    id: 'gateway',
    tierNumber: 'Tier 01',
    title: 'Gateway & Security Perimeter',
    subtitle: 'Traffic ingress, rate limits, SSL termination, and token inspection',
    color: 'emerald',
    badge: 'Perimeter Gate',
    icon: Shield,
    components: [
      {
        name: 'Nginx Reverse Proxy',
        role: 'Load Balancing & SSL',
        protocolOrTech: 'HTTPS / TLS 1.3',
      },
      {
        name: 'Rate Limiter & Helmet',
        role: 'DDoS & Header Shield',
        protocolOrTech: 'Express RateLimit',
      },
      {
        name: 'JWT & OAuth Guard',
        role: 'Identity Verification',
        protocolOrTech: 'Passport / JWT RS256',
      },
      {
        name: 'CORS & Origin Validation',
        role: 'Cross-Origin Filter',
        protocolOrTech: 'Strict White-list',
      },
    ],
  },
  {
    id: 'api-layer',
    tierNumber: 'Tier 02',
    title: 'API & Transport Protocols',
    subtitle: 'Endpoint routing, schema validation, and protocol multiplexing',
    color: 'blue',
    badge: 'Transport Layer',
    icon: Network,
    components: [
      {
        name: 'RESTful API Router',
        role: 'Resource Handlers',
        protocolOrTech: 'JSON / OpenAPI 3.0',
      },
      {
        name: 'WebSocket Gateway',
        role: 'Bi-directional Real-Time',
        protocolOrTech: 'Socket.io / WSS',
      },
      {
        name: 'DTO Validation Pipe',
        role: 'Payload Sanitization',
        protocolOrTech: 'class-validator / Zod',
      },
      {
        name: 'Global Exception Filter',
        role: 'Standardized Error Envelopes',
        protocolOrTech: 'RFC 7807',
      },
    ],
  },
  {
    id: 'domain-logic',
    tierNumber: 'Tier 03',
    title: 'Domain & Application Services',
    subtitle: 'Business workflows, dependency injection, and event orchestration',
    color: 'purple',
    badge: 'Core Engine',
    icon: Workflow,
    components: [
      {
        name: 'NestJS Dependency Injection',
        role: 'Inversion of Control',
        protocolOrTech: 'Singleton / Scoped',
      },
      {
        name: 'Business Rule Engine',
        role: 'Transactional Logic',
        protocolOrTech: 'TypeScript Clean Code',
      },
      {
        name: 'Event Emitters & Listeners',
        role: 'Decoupled State Broadcast',
        protocolOrTech: 'EventEmitter2',
      },
      {
        name: 'Interceptor & Audit Trail',
        role: 'Execution Logging',
        protocolOrTech: 'Winston Logger',
      },
    ],
  },
  {
    id: 'persistence',
    tierNumber: 'Tier 04',
    title: 'Data Persistence & Caching',
    subtitle: 'Relational & document stores with high-throughput in-memory cache',
    color: 'amber',
    badge: 'Storage & Cache',
    icon: Database,
    components: [
      {
        name: 'MongoDB & Mongoose',
        role: 'Flexible Document Store',
        protocolOrTech: 'Atlas / Replica Sets',
      },
      {
        name: 'PostgreSQL & TypeORM',
        role: 'ACID Relational Data',
        protocolOrTech: 'Connection Pooling',
      },
      {
        name: 'Redis Cache Layer',
        role: 'Sub-millisecond Read Cache',
        protocolOrTech: 'Redis In-Memory',
      },
      {
        name: 'Database Migrations',
        role: 'Schema Versioning',
        protocolOrTech: 'Automated Scripts',
      },
    ],
  },
  {
    id: 'async-jobs',
    tierNumber: 'Tier 05',
    title: 'Messaging & Background Workers',
    subtitle: 'Asynchronous task queues, schedulers, and webhook delivery',
    color: 'rose',
    badge: 'Async Pipelines',
    icon: Zap,
    components: [
      {
        name: 'BullMQ Job Queue',
        role: 'Background Task Dispatch',
        protocolOrTech: 'Redis Backed',
      },
      {
        name: 'Cron Schedulers',
        role: 'Periodic Routine Tasks',
        protocolOrTech: 'Node-Cron Engine',
      },
      {
        name: 'Email & Notification Worker',
        role: 'Transactional Mail',
        protocolOrTech: 'Resend API',
      },
      {
        name: 'AI Worker Stream',
        role: 'Async Inference Pipelines',
        protocolOrTech: 'OpenAI API SDK',
      },
    ],
  },
];

// Backend Technology Clusters (Comprehensive Categorization)
interface TechClusterItem {
  name: string;
  role: string;
  slug?: string;
  level: 'Expert' | 'Advanced' | 'Proficient';
  icon: LucideIcon;
  tags: string[];
}

interface TechClusterCategory {
  title: string;
  description: string;
  icon: LucideIcon;
  items: TechClusterItem[];
}

const TECH_CLUSTERS: TechClusterCategory[] = [
  {
    title: 'Languages & Runtimes',
    description: 'Core runtime environments and strictly typed languages',
    icon: Cpu,
    items: [
      {
        name: 'Node.js',
        role: 'Non-blocking event loop runtime',
        slug: 'nodejs',
        level: 'Expert',
        icon: Cpu,
        tags: ['Event Loop', 'Async/Await', 'Streams', 'V8 Engine'],
      },
      {
        name: 'TypeScript',
        role: 'Static type-safety & interfaces',
        level: 'Expert',
        icon: FileCode2,
        tags: ['Generics', 'Strict Mode', 'Decorators', 'Utility Types'],
      },
      {
        name: 'Java (Spring)',
        role: 'Enterprise backend & OOP',
        slug: 'spring-boot',
        level: 'Proficient',
        icon: Boxes,
        tags: ['Spring Boot', 'JPA', 'Maven', 'JVM'],
      },
    ],
  },
  {
    title: 'Frameworks & Engines',
    description: 'Server frameworks providing modularity and enterprise structure',
    icon: ServerCog,
    items: [
      {
        name: 'NestJS',
        role: 'Enterprise architecture & DI framework',
        slug: 'nestjs',
        level: 'Expert',
        icon: Server,
        tags: ['Modules', 'Controllers', 'Guards', 'Interceptors'],
      },
      {
        name: 'Express.js',
        role: 'Minimalist routing & middleware engine',
        slug: 'express',
        level: 'Expert',
        icon: Terminal,
        tags: ['Middleware Chain', 'Fast Routing', 'Custom Handlers'],
      },
      {
        name: 'Spring Boot',
        role: 'Java enterprise service engine',
        slug: 'spring-boot',
        level: 'Proficient',
        icon: Boxes,
        tags: ['IoC Container', 'REST Controller', 'Spring Security'],
      },
    ],
  },
  {
    title: 'Databases & ORMs',
    description: 'Document and relational data models with optimized access patterns',
    icon: Database,
    items: [
      {
        name: 'MongoDB & Mongoose',
        role: 'NoSQL document database & ODM schema modeling',
        level: 'Expert',
        icon: Database,
        tags: ['Aggregation Pipeline', 'Indexes', 'Schema Validation'],
      },
      {
        name: 'PostgreSQL',
        role: 'ACID relational SQL database with complex queries',
        level: 'Advanced',
        icon: Database,
        tags: ['Transactions', 'Foreign Keys', 'Connection Pool'],
      },
      {
        name: 'Redis',
        role: 'In-memory key-value store for caching & sessions',
        level: 'Advanced',
        icon: Zap,
        tags: ['Key Expiry', 'Pub/Sub', 'Queue Backend', 'Cache Hit'],
      },
      {
        name: 'TypeORM / Prisma',
        role: 'Type-safe database abstraction & migration tooling',
        level: 'Advanced',
        icon: HardDrive,
        tags: ['Entities', 'Migrations', 'Relations', 'QueryBuilder'],
      },
    ],
  },
  {
    title: 'APIs, Protocols & Architecture',
    description: 'API design standards, streaming, and real-time transports',
    icon: Network,
    items: [
      {
        name: 'RESTful Architecture',
        role: 'Resource-oriented API design and status code contracts',
        level: 'Expert',
        icon: Globe,
        tags: ['HATEOAS', 'Idempotency', 'Clean URLs', 'JSON Schemas'],
      },
      {
        name: 'WebSockets (Socket.io)',
        role: 'Full-duplex real-time communication channels',
        level: 'Advanced',
        icon: Radio,
        tags: ['Rooms', 'Event Broadcasts', 'Heartbeats', 'Low Latency'],
      },
      {
        name: 'OpenAPI & Swagger',
        role: 'Interactive API documentation & automated contracts',
        level: 'Expert',
        icon: Code2,
        tags: ['Swagger UI', 'DTO Annotations', 'Endpoint Specs'],
      },
      {
        name: 'Microservices Design',
        role: 'Decoupled domain services and service boundaries',
        level: 'Advanced',
        icon: Layers3,
        tags: ['Service Isolation', 'Event Bus', 'API Gateway'],
      },
    ],
  },
  {
    title: 'Authentication & Security',
    description: 'Zero-trust perimeter, identity verification, and encryption',
    icon: Lock,
    items: [
      {
        name: 'JWT & Token Rotation',
        role: 'Stateless access & refresh token authentication flow',
        slug: 'jwt',
        level: 'Expert',
        icon: KeyRound,
        tags: ['RS256/HS256', 'Refresh Rotation', 'Claims Payload'],
      },
      {
        name: 'Role-Based Access (RBAC)',
        role: 'Fine-grained route & entity permission guards',
        level: 'Expert',
        icon: ShieldCheck,
        tags: ['Custom Decorators', 'Role Hierarchy', 'Permission Matrix'],
      },
      {
        name: 'Bcrypt & Data Encryption',
        role: 'Salted password hashing and sensitive data protection',
        level: 'Expert',
        icon: Fingerprint,
        tags: ['Salt Rounds', 'Hash Verification', 'Env Secrets'],
      },
      {
        name: 'Security Shield (Helmet & CORS)',
        role: 'Hardened HTTP headers, XSS, and clickjacking protection',
        level: 'Expert',
        icon: ShieldAlert,
        tags: ['Content Security', 'HSTS', 'Frameguard', 'NoSniff'],
      },
    ],
  },
  {
    title: 'DevOps, CI/CD & Testing',
    description: 'Containerization, automated deployment, and test coverage',
    icon: Terminal,
    items: [
      {
        name: 'Docker Containers',
        role: 'Multi-stage builds and isolated container environments',
        level: 'Advanced',
        icon: Boxes,
        tags: ['Dockerfile', 'Docker Compose', 'Alpine Images'],
      },
      {
        name: 'Nginx Reverse Proxy',
        role: 'High-performance web server & SSL terminator',
        level: 'Advanced',
        icon: Server,
        tags: ['Gzip Compression', 'Proxy Pass', 'Custom Headers'],
      },
      {
        name: 'Jest & Supertest',
        role: 'Unit and end-to-end integration test suites',
        level: 'Advanced',
        icon: CheckCircle2,
        tags: ['Mocking', 'API Integration', 'Code Coverage'],
      },
      {
        name: 'GitHub Actions CI/CD',
        role: 'Automated build, lint, test, and deploy pipelines',
        level: 'Advanced',
        icon: RefreshCw,
        tags: ['Workflows', 'Secrets Management', 'Zero-Downtime'],
      },
    ],
  },
];

// Interactive HTTP Request Simulation Presets
const SIMULATED_ROUTES = [
  {
    id: 'get-backend-workspace',
    method: 'GET',
    path: '/api/v1/skills/backend',
    handler: 'BackendController.getWorkspace',
    latency: '18ms',
    cache: 'HIT (Redis)',
    status: '200 OK',
    size: '14.2 KB',
    description: 'Fetches structured backend skills telemetry and architecture data',
  },
  {
    id: 'post-auth-login',
    method: 'POST',
    path: '/api/v1/auth/login',
    handler: 'AuthController.authenticate',
    latency: '46ms',
    cache: 'BYPASS',
    status: '200 OK',
    size: '1.8 KB',
    description: 'Validates credentials, bcrypt comparison, and issues signed JWT pair',
  },
  {
    id: 'get-projects',
    method: 'GET',
    path: '/api/v1/projects?category=fullstack',
    handler: 'ProjectsController.findWithFilters',
    latency: '24ms',
    cache: 'HIT (Redis)',
    status: '200 OK',
    size: '32.6 KB',
    description: 'Queries MongoDB with compound index and populates related services',
  },
  {
    id: 'post-contact-message',
    method: 'POST',
    path: '/api/v1/contact/send',
    handler: 'ContactController.enqueueNotification',
    latency: '35ms',
    cache: 'BYPASS',
    status: '201 CREATED',
    size: '0.9 KB',
    description: 'Enqueues email task in BullMQ queue and dispatches Resend webhook',
  },
];

export default function BackendSkillsPage() {
  const [selectedTier, setSelectedTier] = useState<string>('gateway');
  const [activeRouteIndex, setActiveRouteIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activePipelineStep, setActivePipelineStep] = useState<number>(5);

  const currentRoute = SIMULATED_ROUTES[activeRouteIndex];

  // Function to simulate a live request execution
  const triggerSimulation = (index: number) => {
    setActiveRouteIndex(index);
    setIsSimulating(true);
    setActivePipelineStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setActivePipelineStep(step);
      if (step >= 5) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 120);
  };

  return (
    <motion.div
      className="h-full w-full space-y-6 rounded-[8px] bg-background p-4 text-foreground md:p-8 overflow-y-auto overflow-x-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. SERVER HEADER & SYSTEM STATUS BANNER */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-4 border-b border-border/40 pb-5 lg:flex-row lg:items-center"
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-foreground md:text-[28px]">
              BACKEND WORKSPACE
            </h1>
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Production Online
            </span>
          </div>
          <p className="mt-1 max-w-2xl font-inter text-[13px] text-muted-foreground">
            Architecting robust, secure, and scalable backend ecosystems. Engineered with NestJS,
            Node.js, TypeScript, MongoDB, and Redis.
          </p>
        </div>

        {/* Server Metadata Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Cpu className="size-4 text-emerald-600 dark:text-emerald-400" />
            <div className="flex flex-col">
              <span className="font-inter text-[12px] font-bold leading-none">
                Node.js / NestJS
              </span>
              <span className="text-[10px] text-muted-foreground">Runtime Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Globe className="size-4 text-emerald-600 dark:text-emerald-400" />
            <div className="flex flex-col">
              <span className="font-inter text-[12px] font-bold leading-none">Algeria-East</span>
              <span className="text-[10px] text-muted-foreground">Primary Region</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Clock className="size-4 text-emerald-600 dark:text-emerald-400" />
            <div className="flex flex-col">
              <span className="font-inter text-[12px] font-bold leading-none">99.99%</span>
              <span className="text-[10px] text-muted-foreground">System Uptime</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Radio className="size-4 text-emerald-600 dark:text-emerald-400" />
            <div className="flex flex-col">
              <span className="font-mono text-[12px] font-bold leading-none">4000/TCP</span>
              <span className="text-[10px] text-muted-foreground">Active Listener</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. TOP TELEMETRY & LIVE REQUEST PIPELINE SIMULATOR */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* INCOMING REQUEST SIMULATOR SELECTOR */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-4"
        >
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-emerald-600 dark:text-emerald-400" />
                <h2 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
                  HTTP Request Simulator
                </h2>
              </div>
              <span className="font-mono text-[9px] text-muted-foreground">Click to dispatch</span>
            </div>

            <div className="space-y-2">
              {SIMULATED_ROUTES.map((route, idx) => {
                const isSelected = activeRouteIndex === idx;
                return (
                  <button
                    key={route.id}
                    onClick={() => triggerSimulation(idx)}
                    className={`group w-full rounded-[8px] border p-2.5 text-left transition-all ${
                      isSelected
                        ? 'border-emerald-500/50 bg-emerald-500/10 dark:bg-emerald-950/30'
                        : 'border-border/30 bg-muted/20 hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-bold ${
                          route.method === 'GET'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {route.method}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {route.latency}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[11px] font-semibold text-foreground truncate">
                      {route.path}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-1">
                      {route.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 border-t border-border/40 pt-3">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-muted-foreground">Target Controller:</span>
              <span className="font-bold text-foreground truncate max-w-[200px]">
                {currentRoute.handler}
              </span>
            </div>
          </div>
        </motion.div>

        {/* STEP-BY-STEP EXECUTION PIPELINE */}
        <motion.div
          variants={cardVariants}
          className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Workflow className="size-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
                Processing Pipeline Lifecycle
              </h2>
            </div>
            {isSimulating && (
              <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 animate-pulse">
                <RefreshCw className="size-3 animate-spin" /> Tracing Request...
              </span>
            )}
          </div>

          <div className="relative space-y-3 pl-4 before:absolute before:left-1.5 before:top-2 before:h-[88%] before:w-0.5 before:bg-emerald-500/30">
            {[
              {
                title: '01. Ingress & Rate Limiter',
                detail: 'Header parsing, DDoS shield, and origin validation',
                time: '< 1ms',
              },
              {
                title: '02. Security & Auth Guard',
                detail: 'Passport JWT verification and RBAC role permission check',
                time: '2ms',
              },
              {
                title: '03. Route Controller Match',
                detail: `${currentRoute.handler} execution context`,
                time: '1ms',
              },
              {
                title: '04. Domain Service & DTO Validation',
                detail: 'Business rules execution and sanitized payload schema',
                time: '3ms',
              },
              {
                title: '05. Persistence & Cache Read/Write',
                detail: `MongoDB Atlas Query & ${currentRoute.cache}`,
                time: '12ms',
              },
              {
                title: '06. Response Serializer & Egress',
                detail: `Serialized JSON Envelope (${currentRoute.size})`,
                time: currentRoute.latency,
              },
            ].map((step, idx) => {
              const isPastOrCurrent = activePipelineStep >= idx;
              return (
                <div key={idx} className="relative flex items-start justify-between">
                  <span
                    className={`absolute -left-[19px] top-1 size-2.5 rounded-full ring-4 ring-card transition-colors duration-200 ${
                      isPastOrCurrent
                        ? 'bg-emerald-500 dark:bg-emerald-400'
                        : 'bg-muted-foreground/30'
                    }`}
                  />
                  <div>
                    <p
                      className={`text-[12px] font-bold leading-tight ${
                        isPastOrCurrent ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-tight">{step.detail}</p>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">{step.time}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* LIVE METRICS WITH REAL-TIME SYNCHRONIZED CHARTS */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-3"
        >
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="size-4 text-emerald-600 dark:text-emerald-400" />
                <h2 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
                  Telemetry Gauges
                </h2>
              </div>
              <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400">
                1s sample
              </span>
            </div>

            <div className="space-y-2">
              <LiveMetricRow
                label="Requests Handled"
                type="requests"
                baseline={14}
                variance={10}
                updateInterval={200}
                color="#10b981"
              />
              <LiveMetricRow
                label="P99 Response Time"
                type="latency"
                baseline={18}
                variance={8}
                updateInterval={260}
                color="#10b981"
              />
              <LiveMetricRow
                label="Error Rate (5xx)"
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
                updateInterval={240}
                color="#10b981"
              />
              <LiveMetricRow
                label="Data Transferred"
                type="data"
                baseline={16}
                variance={8}
                updateInterval={300}
                color="#10b981"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-[8px] bg-emerald-500/10 p-2.5 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">
            <span>Cache Hit Ratio</span>
            <span className="font-bold">96.4% (Redis)</span>
          </div>
        </motion.div>
      </div>

      {/* 3. MULTI-LAYER BACKEND ARCHITECTURE BLUEPRINT (5 TIERS) */}
      <motion.div
        variants={cardVariants}
        className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm"
      >
        <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="font-inter text-[16px] font-black uppercase tracking-tight text-foreground md:text-[18px]">
                5-Tier Backend Architecture Blueprint
              </h2>
            </div>
            <p className="font-inter text-[12px] text-muted-foreground">
              A layered breakdown of how client requests flow through our security, routing, domain,
              persistence, and background worker tiers.
            </p>
          </div>

          {/* Tier Switcher Navigation */}
          <div className="flex flex-wrap items-center gap-1 rounded-[8px] bg-muted/30 p-1 border border-border/40">
            {ARCHITECTURE_TIERS.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`rounded-[6px] px-2.5 py-1 font-inter text-[11px] font-semibold transition-all ${
                    isSelected
                      ? 'bg-card text-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tier.tierNumber}
                </button>
              );
            })}
          </div>
        </div>

        {/* Layer Stack Presentation */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {ARCHITECTURE_TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`cursor-pointer rounded-[10px] border p-4 transition-all duration-300 ${
                  isSelected
                    ? 'border-emerald-500/60 bg-emerald-500/[0.04] shadow-md -translate-y-1'
                    : 'border-border/40 bg-muted/10 hover:bg-muted/30'
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-[6px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Icon className="size-3.5" />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      {tier.tierNumber}
                    </span>
                  </div>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[8.5px] font-medium text-muted-foreground">
                    {tier.badge}
                  </span>
                </div>

                <h3 className="font-inter text-[13px] font-bold text-foreground">{tier.title}</h3>
                <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                  {tier.subtitle}
                </p>

                <div className="mt-4 space-y-2 border-t border-border/30 pt-3">
                  {tier.components.map((comp, idx) => (
                    <div
                      key={idx}
                      className="rounded-[6px] bg-card/80 p-2 border border-border/30 text-[10.5px]"
                    >
                      <div className="flex items-center justify-between font-semibold text-foreground">
                        <span>{comp.name}</span>
                      </div>
                      <div className="mt-0.5 flex items-center justify-between text-[9.5px] text-muted-foreground">
                        <span>{comp.role}</span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400">
                          {comp.protocolOrTech}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 4. BACKEND TECHNOLOGY CLUSTERS (6 DOMAINS) */}
      <motion.div variants={cardVariants} className="space-y-4">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-inter text-[18px] font-black uppercase tracking-tight text-foreground md:text-[20px]">
              Backend Technology Clusters
            </h2>
            <p className="font-inter text-[12px] text-muted-foreground">
              Deep expertise organized by core server competencies, data engines, and DevOps
              tooling.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TECH_CLUSTERS.map((cluster) => {
            const ClusterIcon = cluster.icon;
            return (
              <div
                key={cluster.title}
                className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div>
                  <div className="mb-3 flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <ClusterIcon className="size-4" />
                    </div>
                    <div>
                      <h3 className="font-inter text-[14px] font-bold text-foreground">
                        {cluster.title}
                      </h3>
                      <p className="text-[10.5px] text-muted-foreground leading-tight">
                        {cluster.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {cluster.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={item.name}
                          className="group rounded-[8px] border border-border/30 bg-muted/20 p-3 transition-colors hover:bg-muted/40"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <ItemIcon className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span className="font-inter text-[12px] font-bold text-foreground">
                                {item.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 font-mono text-[8px] font-bold text-emerald-600 dark:text-emerald-400">
                                {item.level}
                              </span>
                              {item.slug && (
                                <Link
                                  href={`/skills/backend/${item.slug}`}
                                  className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                  title={`Open ${item.name} workspace`}
                                >
                                  <ExternalLink className="size-3" />
                                </Link>
                              )}
                            </div>
                          </div>

                          <p className="mt-1 text-[10.5px] text-muted-foreground leading-tight">
                            {item.role}
                          </p>

                          <div className="mt-2.5 flex flex-wrap gap-1">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-[4px] border border-border/40 bg-card px-1.5 py-0.5 text-[9px] font-medium text-foreground/80"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 5. ACTIVE PRODUCTION SERVICES & MICROSERVICES REGISTRY */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Active Production Endpoints */}
        <motion.div
          variants={cardVariants}
          className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="size-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
                Active Production Endpoints &amp; Microservices
              </h3>
            </div>
            <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
              8 Online Nodes
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {[
              {
                name: 'Authentication Service',
                path: '/api/v1/auth',
                desc: 'JWT auth, refresh tokens, role guards',
                latency: '42ms',
                icon: Lock,
              },
              {
                name: 'Projects Microservice',
                path: '/api/v1/projects',
                desc: 'Project catalog, tags, and media links',
                latency: '24ms',
                icon: FolderGit2,
              },
              {
                name: 'Skills Engine Service',
                path: '/api/v1/skills',
                desc: 'Skills workspace and metadata retrieval',
                latency: '18ms',
                icon: Code2,
              },
              {
                name: 'Experience & Milestones',
                path: '/api/v1/experience',
                desc: 'Timeline events and verified certificates',
                latency: '20ms',
                icon: GraduationCap,
              },
              {
                name: 'Contact & Mailer Dispatch',
                path: '/api/v1/contact',
                desc: 'BullMQ queue and Resend email worker',
                latency: '35ms',
                icon: MessageSquare,
              },
              {
                name: 'AI Assistant Stream',
                path: '/api/v1/ai',
                desc: 'Streaming OpenAI agent integrations',
                latency: '68ms',
                icon: Zap,
              },
              {
                name: 'Telemetry & Analytics',
                path: '/api/v1/analytics',
                desc: 'Real-time visitor logs and event stream',
                latency: '14ms',
                icon: Activity,
              },
              {
                name: 'Media & File Storage',
                path: '/api/v1/media',
                desc: 'Cloudinary CDN and asset transformations',
                latency: '28ms',
                icon: HardDrive,
              },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-[8px] border border-border/30 bg-muted/20 p-3 transition-colors hover:bg-muted/40"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="font-inter text-[11.5px] font-bold text-foreground">
                          {service.name}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400">
                        {service.latency}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[10px] text-emerald-700 dark:text-emerald-300">
                      {service.path}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-1">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between border-t border-border/20 pt-2 text-[9px]">
                    <span className="text-muted-foreground">Status</span>
                    <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Healthy (200 OK)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Backend Engineering Principles & Standards */}
        <motion.div
          variants={cardVariants}
          className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
              Core Engineering Standards
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'High Availability & Resilience',
                desc: 'Graceful shutdown handlers, health checks, circuit breakers, and database replica recovery.',
              },
              {
                title: 'Zero-Trust Security Perimeter',
                desc: 'Strict DTO validation, parameterized SQL/NoSQL queries, JWT rotation, and security headers.',
              },
              {
                title: 'Scalable Data Modeling',
                desc: 'Compound index strategy, connection pooling, cache-aside Redis patterns, and normalized schemas.',
              },
              {
                title: 'Clean Architecture & DI',
                desc: 'Modular boundary separation, dependency inversion, testable unit services, and single-responsibility.',
              },
            ].map((pillar, idx) => (
              <div key={idx} className="rounded-[8px] border border-border/30 bg-muted/20 p-3">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-emerald-500" />
                  <h4 className="font-inter text-[11.5px] font-bold text-foreground">
                    {pillar.title}
                  </h4>
                </div>
                <p className="mt-1 text-[10.5px] text-muted-foreground leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 6. BOTTOM EXPLORE LINK BANNER */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-4 rounded-[12px] border border-emerald-500/30 bg-emerald-500/5 p-5 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Zap className="size-5" />
          </div>
          <div>
            <h4 className="font-inter text-[13px] font-bold text-foreground">
              Explore Individual Backend Workspaces
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Deep dive into dedicated runtime telemetry and architecture details for NestJS,
              Node.js, Express, JWT, and Spring Boot.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/skills/backend/nestjs"
            className="inline-flex items-center gap-1 rounded-[6px] bg-emerald-600 px-3 py-1.5 font-inter text-[11px] font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700"
          >
            NestJS Workspace <ArrowRight className="size-3" />
          </Link>
          <Link
            href="/skills/backend/nodejs"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            Node.js Workspace
          </Link>
          <Link
            href="/skills/backend/express"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            Express.js Workspace
          </Link>
          <Link
            href="/skills/backend/jwt"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            JWT Workspace
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
