'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Boxes,
  Check,
  CheckCircle2,
  Clock,
  Cloud,
  Code,
  Code2,
  Compass,
  Cpu,
  ExternalLink,
  Eye,
  FileCode2,
  FileText,
  Folder,
  FolderGit2,
  GitBranch,
  Globe,
  HardDrive,
  KeyRound,
  Layers,
  Layers3,
  Layout,
  Lock,
  LucideIcon,
  Monitor,
  Package,
  Play,
  Radio,
  RefreshCw,
  Rocket,
  Search,
  Server,
  ServerCog,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  Workflow,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

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

// CI/CD Simulation Pipeline Presets
interface PipelinePreset {
  id: string;
  name: string;
  trigger: string;
  target: string;
  duration: string;
  stages: {
    name: string;
    action: string;
    time: string;
    log: string;
  }[];
}

const PIPELINE_PRESETS: PipelinePreset[] = [
  {
    id: 'prod-release',
    name: 'Production Release (v2.4.0)',
    trigger: 'git push origin main (tag: v2.4.0)',
    target: 'Kubernetes Cluster (Production)',
    duration: '1m 42s',
    stages: [
      {
        name: '01. Code Ingress & Lint',
        action: 'TypeScript strict checking & ESLint rules validation',
        time: '12s',
        log: '✓ TypeScript 5.7 compiled with 0 errors. ESLint passed.',
      },
      {
        name: '02. Automated Test Matrix',
        action: 'Jest Unit & End-to-End Playwright test suites',
        time: '26s',
        log: '✓ 42 test suites passed (340 tests passed in 24.8s).',
      },
      {
        name: '03. Multi-Stage Docker Build',
        action: 'Distroless container build with BuildKit layer cache',
        time: '38s',
        log: '✓ Exported image portfolio/client:v2.4.0 (52.4MB compressed).',
      },
      {
        name: '04. Trivy CVE Security Audit',
        action: 'Container image vulnerability & secret scan',
        time: '10s',
        log: '✓ Scanned 120 packages: 0 Critical, 0 High vulnerabilities.',
      },
      {
        name: '05. K8s Rolling Rollout',
        action: 'Zero-downtime rolling update (maxSurge: 25%)',
        time: '14s',
        log: '✓ 3/3 pods updated successfully. Old ReplicaSet terminated.',
      },
      {
        name: '06. Observability & Health Check',
        action: 'Prometheus metric scraping & HTTP 200 verification',
        time: '2s',
        log: '✓ /healthz responded 200 OK (latency: 4ms). Deployment live!',
      },
    ],
  },
  {
    id: 'hotfix-k8s',
    name: 'Hotfix Pod Patch (Rolling Update)',
    trigger: 'git push origin hotfix/auth-session',
    target: 'Kubernetes Pod ReplicaSet',
    duration: '48s',
    stages: [
      {
        name: '01. Fast Lint & Validation',
        action: 'Targeted diff linting & syntax verification',
        time: '8s',
        log: '✓ Fast lint check complete on changed files.',
      },
      {
        name: '02. Regression Smoke Tests',
        action: 'Auth & session token unit verification',
        time: '12s',
        log: '✓ Smoke tests 100% green.',
      },
      {
        name: '03. Layer Cache Re-build',
        action: 'Re-using cached node_modules layer',
        time: '16s',
        log: '✓ Layer cache hit 92%. Image built in 15.2s.',
      },
      {
        name: '04. Instant Canary Deploy',
        action: 'Canary pod deployed with 10% traffic allocation',
        time: '8s',
        log: '✓ Canary healthy: 0 error rate detected.',
      },
      {
        name: '05. Full Cluster Rollout',
        action: 'Promoting canary to 100% production pods',
        time: '4s',
        log: '✓ All pods patched without dropped connections.',
      },
      {
        name: '06. Metric Stability Verified',
        action: 'Grafana latency dashboard steady at P95 < 12ms',
        time: '0s',
        log: '✓ Hotfix deployed with zero downtime.',
      },
    ],
  },
];

// Infrastructure as Code (IaC) Manifests
interface IaCManifest {
  id: string;
  title: string;
  filename: string;
  lang: string;
  desc: string;
  code: string;
}

const IAC_MANIFESTS: IaCManifest[] = [
  {
    id: 'dockerfile',
    title: 'Multi-Stage Production Dockerfile',
    filename: 'Dockerfile',
    lang: 'dockerfile',
    desc: 'Optimized 3-stage build with Alpine Linux, non-root user security, and minimal layer payload.',
    code: `# Stage 1: Dependency Resolution
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# Stage 2: Production Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN corepack enable && pnpm build

# Stage 3: Minimal Distroless Runner
FROM gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER nonroot:nonroot
EXPOSE 3000
CMD ["dist/main.js"]`,
  },
  {
    id: 'k8s-deployment',
    title: 'Kubernetes Deployment & HPA Manifest',
    filename: 'k8s-deployment.yaml',
    lang: 'yaml',
    desc: 'Production deployment with 3 replicas, rolling update strategy, liveness probes, and CPU limits.',
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio-backend-api
  labels:
    app: portfolio-backend
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: portfolio-backend
  template:
    metadata:
      labels:
        app: portfolio-backend
    spec:
      containers:
      - name: api
        image: portfolio/backend:v2.4.0
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "100m"
            memory: "128Mi"
        livenessProbe:
          httpGet:
            path: /healthz
            port: 3000
          initialDelaySeconds: 15
          periodSeconds: 10`,
  },
  {
    id: 'github-actions',
    title: 'GitHub Actions CI/CD Pipeline',
    filename: '.github/workflows/deploy.yml',
    lang: 'yaml',
    desc: 'Automated continuous integration workflow with matrix testing, Trivy CVE scanning, and deployment.',
    code: `name: CI/CD Production Pipeline
on:
  push:
    branches: [ main ]

jobs:
  validate-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install & Lint
        run: |
          pnpm install --frozen-lockfile
          pnpm lint
          pnpm test:coverage

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: registry.digitalocean.com/portfolio/app:latest

      - name: Trigger Rolling Rollout
        run: kubectl rollout restart deployment/portfolio-app`,
  },
  {
    id: 'nginx-conf',
    title: 'Nginx Reverse Proxy & SSL Config',
    filename: 'nginx.conf',
    lang: 'nginx',
    desc: 'High-performance reverse proxy with HTTP/2, Gzip compression, SSL TLSv1.3, and upstream balancing.',
    code: `upstream backend_cluster {
    least_conn;
    server 10.0.1.10:3000 max_fails=3 fail_timeout=10s;
    server 10.0.1.11:3000 max_fails=3 fail_timeout=10s;
    server 10.0.1.12:3000 max_fails=3 fail_timeout=10s;
    keepalive 32;
}

server {
    listen 443 ssl http2;
    server_name api.portfolio.dev;

    ssl_certificate /etc/letsencrypt/live/api.portfolio.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.portfolio.dev/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    gzip on;
    gzip_types application/json text/plain text/css;

    location / {
        proxy_pass http://backend_cluster;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
    }
}`,
  },
];

// DevOps & Cloud Tooling Clusters (4 Domains)
interface DevOpsToolItem {
  name: string;
  role: string;
  slug?: string;
  level: 'Expert' | 'Advanced' | 'Proficient';
  icon: LucideIcon;
  tags: string[];
}

interface DevOpsClusterCategory {
  title: string;
  description: string;
  icon: LucideIcon;
  items: DevOpsToolItem[];
}

const DEVOPS_CLUSTERS: DevOpsClusterCategory[] = [
  {
    title: 'Containerization & Orchestration',
    description: 'Immutable packaging, multi-container orchestration, and cluster scaling',
    icon: Package,
    items: [
      {
        name: 'Docker',
        role: 'Multi-stage container builds & local compose development',
        slug: 'docker',
        level: 'Expert',
        icon: Package,
        tags: ['Multi-Stage', 'Compose', 'Distroless', 'Layer Caching'],
      },
      {
        name: 'Kubernetes & Pods',
        role: 'Declarative container orchestration, ingress & service meshes',
        slug: 'docker-kubernetes',
        level: 'Advanced',
        icon: Layers,
        tags: ['Deployments', 'HPA Scaling', 'Ingress', 'Rolling Updates'],
      },
    ],
  },
  {
    title: 'CI/CD Automation & Workflows',
    description: 'Continuous integration, automated test matrices, and delivery pipelines',
    icon: Workflow,
    items: [
      {
        name: 'GitHub Actions',
        role: 'Automated CI/CD pipelines, security scanning & deployments',
        slug: 'github-actions',
        level: 'Expert',
        icon: Workflow,
        tags: ['Matrix Builds', 'Secrets Vault', 'Auto Deploy', 'CVE Scan'],
      },
      {
        name: 'Git & Version Control',
        role: 'Branching strategies, atomic commits & collaborative workflows',
        slug: 'git',
        level: 'Expert',
        icon: GitBranch,
        tags: ['Gitflow', 'Rebase', 'Submodules', 'Hooks'],
      },
    ],
  },
  {
    title: 'Cloud Infrastructure & Hosting',
    description: 'Serverless deployments, managed clusters, and edge networks',
    icon: Cloud,
    items: [
      {
        name: 'Vercel Edge Platform',
        role: 'Serverless Next.js edge deployments & instant preview URLs',
        slug: 'vercel',
        level: 'Expert',
        icon: Globe,
        tags: ['Edge CDN', 'Instant Previews', 'Serverless', 'Analytics'],
      },
      {
        name: 'Render & Railway',
        role: 'Containerized backend hosting & managed database instances',
        slug: 'render',
        level: 'Advanced',
        icon: Server,
        tags: ['Zero-Config', 'Auto Scaling', 'Postgres Addons', 'Webhooks'],
      },
    ],
  },
  {
    title: 'Web Servers, Reverse Proxy & Security',
    description: 'High-throughput ingress routing, SSL termination, and Linux ops',
    icon: ServerCog,
    items: [
      {
        name: 'Nginx',
        role: 'High-performance reverse proxy, load balancing & SSL termination',
        slug: 'nginx',
        level: 'Expert',
        icon: ServerCog,
        tags: ['Reverse Proxy', 'Load Balancing', 'HTTP/2', 'Gzip / Brotli'],
      },
      {
        name: 'Postman & API QA',
        role: 'API integration testing, automated test suites & mock servers',
        slug: 'postman',
        level: 'Expert',
        icon: Zap,
        tags: ['Collection Runner', 'Environment Vars', 'Automated QA', 'Docs'],
      },
    ],
  },
];

export default function DevOpsToolsSkillsPage() {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeStageStep, setActiveStageStep] = useState<number>(5);
  const [selectedManifestId, setSelectedManifestId] = useState<string>('dockerfile');

  const currentPreset = PIPELINE_PRESETS[selectedPresetIndex];
  const selectedManifest = useMemo(
    () => IAC_MANIFESTS.find((m) => m.id === selectedManifestId) || IAC_MANIFESTS[0],
    [selectedManifestId],
  );

  const runPipelineSimulation = (index: number) => {
    setSelectedPresetIndex(index);
    setIsSimulating(true);
    setActiveStageStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setActiveStageStep(step);
      if (step >= currentPreset.stages.length - 1) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 140);
  };

  return (
    <motion.div
      className="h-full w-full space-y-6 rounded-[8px] bg-background p-4 text-foreground md:p-8 overflow-y-auto overflow-x-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. CLOUD & DEVOPS OPERATIONS CENTER HEADER */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-4 border-b border-border/40 pb-5 lg:flex-row lg:items-center"
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-foreground md:text-[28px]">
              DEVOPS &amp; TOOLS WORKSPACE
            </h1>
            <span className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
              Cluster Active (3 Nodes)
            </span>
          </div>
          <p className="mt-1 max-w-2xl font-inter text-[13px] text-muted-foreground">
            Architecting robust CI/CD pipelines, container orchestration with Docker &amp;
            Kubernetes, zero-downtime rolling updates, and cloud infrastructure.
          </p>
        </div>

        {/* Infrastructure Metrics Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Package className="size-4 text-amber-600 dark:text-amber-400" />
            <div className="flex flex-col">
              <span className="font-inter text-[12px] font-bold leading-none">
                Docker / K8s / Actions
              </span>
              <span className="text-[10px] text-muted-foreground">Platform Tooling</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Activity className="size-4 text-amber-600 dark:text-amber-400" />
            <div className="flex flex-col">
              <span className="font-mono text-[12px] font-bold leading-none">99.99%</span>
              <span className="text-[10px] text-muted-foreground">System SLA Uptime</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Clock className="size-4 text-amber-600 dark:text-amber-400" />
            <div className="flex flex-col">
              <span className="font-mono text-[12px] font-bold leading-none">1m 42s</span>
              <span className="text-[10px] text-muted-foreground">P95 Build Time</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <ShieldCheck className="size-4 text-amber-600 dark:text-amber-400" />
            <div className="flex flex-col">
              <span className="font-inter text-[12px] font-bold leading-none">Zero Downtime</span>
              <span className="text-[10px] text-muted-foreground">Rolling Rollouts</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. INTERACTIVE CI/CD DEPLOYMENT PIPELINE SIMULATOR & CLI LOGS */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* PIPELINE PRESETS & TRIGGER CONTROLS */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-4"
        >
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-amber-600 dark:text-amber-400" />
                <h2 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
                  CI/CD Pipeline Simulator
                </h2>
              </div>
              <span className="font-mono text-[9px] text-muted-foreground">Click to trigger</span>
            </div>

            <div className="space-y-2">
              {PIPELINE_PRESETS.map((preset, idx) => {
                const isSelected = selectedPresetIndex === idx;
                return (
                  <button
                    key={preset.id}
                    onClick={() => runPipelineSimulation(idx)}
                    className={`group w-full rounded-[8px] border p-2.5 text-left transition-all ${
                      isSelected
                        ? 'border-amber-500/50 bg-amber-500/10 dark:bg-amber-950/30'
                        : 'border-border/30 bg-muted/20 hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-inter text-[11.5px] font-bold text-foreground">
                        {preset.name}
                      </span>
                      <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400">
                        {preset.duration}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground truncate">
                      {preset.trigger}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 border-t border-border/40 pt-3">
            <div className="flex items-center justify-between font-mono text-[10.5px]">
              <span className="text-muted-foreground">Target Cluster:</span>
              <span className="font-bold text-foreground truncate max-w-[190px]">
                {currentPreset.target}
              </span>
            </div>
          </div>
        </motion.div>

        {/* 6 PIPELINE EXECUTION STAGES */}
        <motion.div
          variants={cardVariants}
          className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Workflow className="size-4 text-amber-600 dark:text-amber-400" />
              <h2 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
                Deployment Execution Lifecycle
              </h2>
            </div>
            {isSimulating && (
              <span className="flex items-center gap-1 font-mono text-[10px] text-amber-600 dark:text-amber-400 animate-pulse">
                <RefreshCw className="size-3 animate-spin" /> Deploying Pods...
              </span>
            )}
          </div>

          <div className="relative space-y-3 pl-4 before:absolute before:left-1.5 before:top-2 before:h-[88%] before:w-0.5 before:bg-amber-500/30">
            {currentPreset.stages.map((stage, idx) => {
              const isPastOrCurrent = activeStageStep >= idx;
              return (
                <div key={idx} className="relative flex items-start justify-between">
                  <span
                    className={`absolute -left-[19px] top-1 size-2.5 rounded-full ring-4 ring-card transition-colors duration-200 ${
                      isPastOrCurrent ? 'bg-amber-600 dark:bg-amber-400' : 'bg-muted-foreground/30'
                    }`}
                  />
                  <div>
                    <p
                      className={`text-[12px] font-bold leading-tight ${
                        isPastOrCurrent ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {stage.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      {stage.action}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">{stage.time}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* LIVE STREAMING TERMINAL LOGS */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-3"
        >
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-amber-600 dark:text-amber-400" />
                <h2 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
                  Build Output Logs
                </h2>
              </div>
              <span className="font-mono text-[9px] text-emerald-500">STDOUT LIVE</span>
            </div>

            <div className="rounded-[8px] bg-slate-950 p-3 font-mono text-[10px] text-slate-300 border border-slate-800 space-y-2 max-h-[220px] overflow-y-auto">
              <div className="text-slate-500 text-[9px]">
                $ github-runner --job {currentPreset.id}
              </div>
              {currentPreset.stages.slice(0, activeStageStep + 1).map((s, idx) => (
                <div key={idx} className="text-emerald-400 leading-relaxed">
                  {s.log}
                </div>
              ))}
              {isSimulating && (
                <div className="text-amber-400 animate-pulse">&gt; Executing pipeline step...</div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-[8px] bg-amber-500/10 p-2.5 font-mono text-[10.5px] text-amber-700 dark:text-amber-300">
            <span>Cluster Ingress:</span>
            <span className="font-bold">Nginx HTTP/2 SSL</span>
          </div>
        </motion.div>
      </div>

      {/* 3. INFRASTRUCTURE AS CODE (IaC) & MANIFEST INSPECTOR */}
      <motion.div
        variants={cardVariants}
        className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm"
      >
        <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <FileCode2 className="size-4 text-amber-600 dark:text-amber-400" />
              <h2 className="font-inter text-[16px] font-black uppercase tracking-tight text-foreground md:text-[18px]">
                Infrastructure as Code (IaC) &amp; Manifest Inspector
              </h2>
            </div>
            <p className="font-inter text-[12px] text-muted-foreground">
              Inspect production-grade container manifests, Kubernetes deployment files, CI/CD
              pipeline configurations, and Nginx reverse proxy blocks.
            </p>
          </div>

          {/* Manifest Tabs */}
          <div className="flex flex-wrap items-center gap-1 rounded-[8px] bg-muted/30 p-1 border border-border/40">
            {IAC_MANIFESTS.map((manifest) => {
              const isSelected = selectedManifestId === manifest.id;
              return (
                <button
                  key={manifest.id}
                  onClick={() => setSelectedManifestId(manifest.id)}
                  className={`rounded-[6px] px-2.5 py-1 font-mono text-[11px] font-semibold transition-all ${
                    isSelected
                      ? 'bg-card text-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {manifest.filename}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Manifest Display */}
        <div className="relative rounded-[10px] bg-slate-950 p-4 font-mono text-[11.5px] leading-relaxed text-slate-200 border border-slate-800 overflow-x-auto">
          <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-2 text-[10px] text-slate-400">
            <span>{selectedManifest.title}</span>
            <span className="text-amber-400 uppercase">{selectedManifest.lang}</span>
          </div>
          <pre className="text-slate-100 whitespace-pre-wrap">{selectedManifest.code}</pre>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          <strong>Architecture Purpose:</strong> {selectedManifest.desc}
        </p>
      </motion.div>

      {/* 4. CLOUD INFRASTRUCTURE & NETWORK TOPOLOGY FLOW */}
      <motion.div
        variants={cardVariants}
        className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-amber-600 dark:text-amber-400" />
            <h3 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
              Production Cloud Network &amp; Ingress Topology
            </h3>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            End-to-End Traffic Path from User to Pods
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              step: '01. Edge Ingress',
              title: 'Cloudflare Edge CDN',
              desc: 'Global Anycast DNS, DDoS mitigation & edge static asset caching.',
              icon: Globe,
            },
            {
              step: '02. Reverse Proxy',
              title: 'Nginx Load Balancer',
              desc: 'SSL/TLS termination, HTTP/2 multiplexing, rate-limiting & gzip compression.',
              icon: ServerCog,
            },
            {
              step: '03. Orchestration',
              title: 'Kubernetes Pod Replicas',
              desc: 'Horizontally autoscaled Node.js & Next.js microservices with health checks.',
              icon: Package,
            },
            {
              step: '04. Data Tier',
              title: 'Managed DB Clusters',
              desc: 'PostgreSQL ACID instances, MongoDB Atlas replica sets, and Redis caching.',
              icon: HardDrive,
            },
            {
              step: '05. Observability',
              title: 'Prometheus & Sentry',
              desc: 'Live telemetry scraping, anomaly detection alerts, and error tracing.',
              icon: Activity,
            },
          ].map((topo, idx) => {
            const Icon = topo.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-[8px] border border-border/30 bg-muted/20 p-3.5"
              >
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[9.5px] font-bold text-amber-600 dark:text-amber-400">
                      {topo.step}
                    </span>
                    <Icon className="size-3.5 text-muted-foreground" />
                  </div>
                  <h4 className="font-inter text-[12px] font-bold text-foreground">{topo.title}</h4>
                  <p className="mt-1 text-[10.5px] text-muted-foreground leading-relaxed">
                    {topo.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 5. DEVOPS & INFRASTRUCTURE TECHNOLOGY CLUSTERS */}
      <motion.div variants={cardVariants} className="space-y-4">
        <div>
          <h2 className="font-inter text-[18px] font-black uppercase tracking-tight text-foreground md:text-[20px]">
            DevOps &amp; Infrastructure Technology Clusters
          </h2>
          <p className="font-inter text-[12px] text-muted-foreground">
            Deep domain expertise across containerization, CI/CD automation, cloud hosting, and
            reverse proxies.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {DEVOPS_CLUSTERS.map((cluster) => {
            const ClusterIcon = cluster.icon;
            return (
              <div
                key={cluster.title}
                className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div>
                  <div className="mb-3 flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-[8px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      <ClusterIcon className="size-4" />
                    </div>
                    <div>
                      <h3 className="font-inter text-[13px] font-bold text-foreground">
                        {cluster.title}
                      </h3>
                      <p className="text-[10px] text-muted-foreground leading-tight">
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
                              <ItemIcon className="size-3.5 text-amber-600 dark:text-amber-400" />
                              <span className="font-inter text-[12px] font-bold text-foreground">
                                {item.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="rounded bg-amber-500/10 px-1.5 py-0.2 font-mono text-[8px] font-bold text-amber-600 dark:text-amber-400">
                                {item.level}
                              </span>
                              {item.slug && (
                                <Link
                                  href={`/skills/devops-tools/${item.slug}`}
                                  className="text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
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
                                className="rounded-[4px] border border-border/40 bg-card px-1.5 py-0.5 text-[8.5px] font-medium text-foreground/80"
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

      {/* 6. BOTTOM EXPLORE LINK BANNER */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-4 rounded-[12px] border border-amber-500/30 bg-amber-500/5 p-5 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <ServerCog className="size-5" />
          </div>
          <div>
            <h4 className="font-inter text-[13px] font-bold text-foreground">
              Explore Dedicated DevOps &amp; Cloud Workspaces
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Inspect specialized CI/CD workflows, Docker configs, Nginx reverse proxy setups, and
              Vercel edge metrics.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/skills/devops-tools/docker"
            className="inline-flex items-center gap-1 rounded-[6px] bg-amber-600 px-3 py-1.5 font-inter text-[11px] font-semibold text-white shadow-xs transition-colors hover:bg-amber-700"
          >
            Docker Workspace <ArrowRight className="size-3" />
          </Link>
          <Link
            href="/skills/devops-tools/github-actions"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            GitHub Actions
          </Link>
          <Link
            href="/skills/devops-tools/nginx"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            Nginx Proxy
          </Link>
          <Link
            href="/skills/devops-tools/vercel"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            Vercel Platform
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
