'use client';

import { useTranslation } from '@/hooks/use-translation';
import { motion, Variants } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Atom,
  Boxes,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  FileCode2,
  Gauge,
  Globe,
  Layers,
  Layout,
  LucideIcon,
  Monitor,
  MousePointerClick,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

function getStableSparklinePoints(
  baseline: number,
  variance: number,
  pointCount: number,
  isFlat: boolean,
) {
  return Array.from({ length: pointCount }, (_, index) => {
    if (isFlat) return baseline;

    const wave = Math.sin(index * 0.85 + baseline) * (variance * 0.45);
    return Math.max(4, Math.min(26, baseline + wave));
  });
}

interface LiveMetricRowProps {
  label: string;
  type: 'fps' | 'lcp' | 'cls' | 'inp' | 'dom';
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
  const isFlat = type === 'cls';

  const [points, setPoints] = useState<number[]>(() =>
    getStableSparklinePoints(baseline, variance, pointCount, isFlat),
  );

  const [displayVal, setDisplayVal] = useState<string>('0');

  useEffect(() => {
    const timer = setInterval(() => {
      setPoints((prev) => {
        const nextPoints = [...prev.slice(1)];
        let nextVal = baseline;

        if (type === 'cls') {
          // Zero CLS guarantee
          nextVal = 26;
          setDisplayVal('0.00 (Zero Shift)');
        } else if (type === 'fps') {
          const delta = (Math.random() - 0.5) * (variance * 0.5);
          nextVal = Math.max(4, Math.min(10, 6 + delta));
          setDisplayVal('60.0 FPS');
        } else if (type === 'lcp') {
          const delta = (Math.random() - 0.5) * (variance * 0.8);
          nextVal = Math.max(4, Math.min(26, prev[prev.length - 1] + delta));
          const sec = (0.85 + (26 - nextVal) * 0.015).toFixed(2);
          setDisplayVal(`${sec} s (Fast)`);
        } else if (type === 'inp') {
          const delta = (Math.random() - 0.5) * (variance * 0.8);
          nextVal = Math.max(4, Math.min(26, prev[prev.length - 1] + delta));
          const ms = Math.round(6 + (26 - nextVal) * 0.3);
          setDisplayVal(`${ms} ms (Instant)`);
        } else if (type === 'dom') {
          const delta = (Math.random() - 0.5) * (variance * 0.8);
          nextVal = Math.max(4, Math.min(26, prev[prev.length - 1] + delta));
          const nodes = Math.round(380 + (26 - nextVal) * 3);
          setDisplayVal(`${nodes} Nodes`);
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

// 5-Tier Frontend Architecture Blueprint Definition
interface FrontendArchitectureTier {
  id: string;
  tierNumber: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: LucideIcon;
  components: {
    name: string;
    role: string;
    tech: string;
  }[];
}

const FRONTEND_ARCHITECTURE_TIERS: FrontendArchitectureTier[] = [
  {
    id: 'presentation',
    tierNumber: 'Tier 01',
    title: 'Presentation & Design System',
    subtitle: 'Atomic design tokens, utility-first CSS, and accessible themes',
    badge: 'Design System',
    icon: Layout,
    components: [
      { name: 'Tailwind CSS Engine', role: 'Zero-Runtime CSS Tokens', tech: 'Tailwind / PostCSS' },
      {
        name: 'shadcn/ui & Radix',
        role: 'Accessible Component Primitives',
        tech: 'WAI-ARIA Compliant',
      },
      {
        name: 'Theme Token Provider',
        role: 'Seamless Dark / Light Switch',
        tech: 'CSS Variables / Class',
      },
      { name: 'Typography Scale', role: 'Fluid Type & Inter Font', tech: 'next/font Google' },
    ],
  },
  {
    id: 'component-arch',
    tierNumber: 'Tier 02',
    title: 'Component & Primitives Architecture',
    subtitle: 'Compound components, polymorphic elements, and hook composition',
    badge: 'Component Tree',
    icon: Boxes,
    components: [
      {
        name: 'Atomic Component Library',
        role: 'Buttons, Inputs, Dialogs, Cards',
        tech: 'Modular React 19',
      },
      {
        name: 'Custom React Hooks',
        role: 'Encapsulated Business Behaviors',
        tech: 'useTranslation, useTheme',
      },
      {
        name: 'Polymorphic Primitives',
        role: 'Flexible Slot & AsChild Props',
        tech: 'Radix Slot Primitives',
      },
      {
        name: 'Accessible Focus Trap',
        role: 'Keyboard Navigation & Modals',
        tech: 'FocusScope / ARIA',
      },
    ],
  },
  {
    id: 'state-data',
    tierNumber: 'Tier 03',
    title: 'State Management & Data Sync',
    subtitle: 'Global client state, cached API synchronization, and optimistic UI',
    badge: 'State & Caching',
    icon: Workflow,
    components: [
      { name: 'Zustand Global Store', role: 'Lightweight Client Store', tech: 'Zero-Boilerplate' },
      {
        name: 'TanStack Query / SWR',
        role: 'Server State Invalidation & Cache',
        tech: 'Optimistic Updates',
      },
      { name: 'React Hook Form & Zod', role: 'Type-Safe Form Validation', tech: 'Schema Parsing' },
      {
        name: 'Server Actions Bridge',
        role: 'Direct RPC Function Invocations',
        tech: 'Next.js Actions',
      },
    ],
  },
  {
    id: 'rendering-app',
    tierNumber: 'Tier 04',
    title: 'Next.js App Router & Compilation',
    subtitle: 'React Server Components (RSC), static prerendering, and route streaming',
    badge: 'App Router / RSC',
    icon: Atom,
    components: [
      {
        name: 'React Server Components (RSC)',
        role: 'Zero Client-Bundle Payload',
        tech: 'Server Execution',
      },
      {
        name: 'Streaming Suspense',
        role: 'Progressive Hydration & Fallbacks',
        tech: 'React Suspense',
      },
      {
        name: 'Static Site Generation (SSG)',
        role: 'Precomputed Edge HTML',
        tech: 'Incremental ISR',
      },
      {
        name: 'Turbopack Compiler',
        role: 'High-Speed Hot Module Replacement',
        tech: 'Rust-Powered',
      },
    ],
  },
  {
    id: 'motion-physics',
    tierNumber: 'Tier 05',
    title: 'Motion Physics & Micro-Interactions',
    subtitle: '60fps hardware-accelerated animations, 3D tilt, and layout morphs',
    badge: 'Motion & UX',
    icon: Sparkles,
    components: [
      {
        name: 'Framer Motion Engine',
        role: 'Spring Physics & Layout Transitions',
        tech: 'GPU Accelerated',
      },
      {
        name: '3D Parallax Tilt Cards',
        role: 'Spatial Mouse Interactive Depth',
        tech: 'CSS 3D Transforms',
      },
      {
        name: 'Micro-Interactions',
        role: 'Haptic-Style Hover & Active Feedback',
        tech: 'Transform GPU',
      },
      {
        name: 'Reduced Motion Mode',
        role: 'Accessible Motion Accessibility',
        tech: 'prefers-reduced-motion',
      },
    ],
  },
];

// Interactive UI Event Simulation Presets
const SIMULATED_UI_EVENTS = [
  {
    id: 'page-navigation',
    action: 'Route Navigation & RSC Streaming',
    target: 'Router.push("/skills/frontend/react")',
    latency: '8ms',
    cls: '0.00',
    fps: '60 FPS',
    description: 'Instant client transition with React Suspense progressive streaming payload',
  },
  {
    id: 'theme-toggle',
    action: 'Theme Switch & Token Propagation',
    target: 'ThemeContext.setTheme("dark")',
    latency: '3ms',
    cls: '0.00',
    fps: '60 FPS',
    description: 'Instant CSS variable swap with zero layout shift or screen flashing',
  },
  {
    id: 'filter-state',
    action: 'Dynamic Filter & State Reconciliation',
    target: 'useFilterStore.setState({ category })',
    latency: '5ms',
    cls: '0.00',
    fps: '60 FPS',
    description: 'Zustand state update triggering localized Virtual DOM sub-tree diffing',
  },
  {
    id: 'form-validation',
    action: 'Form Validation & Optimistic UI',
    target: 'form.handleSubmit(onSend)',
    latency: '12ms',
    cls: '0.00',
    fps: '60 FPS',
    description: 'Zod schema validation, immediate optimistic UI update, and server action call',
  },
];

// Frontend Technology Clusters (6 Domains)
interface FrontendTechItem {
  name: string;
  role: string;
  slug?: string;
  level: 'Expert' | 'Advanced' | 'Proficient';
  icon: LucideIcon;
  tags: string[];
}

interface FrontendTechClusterCategory {
  title: string;
  description: string;
  icon: LucideIcon;
  items: FrontendTechItem[];
}

const FRONTEND_TECH_CLUSTERS: FrontendTechClusterCategory[] = [
  {
    title: 'Core Languages & Foundations',
    description: 'Strict type safety, semantic structure, and modern ECMAScript features',
    icon: Code2,
    items: [
      {
        name: 'TypeScript',
        role: 'Static type checking, interfaces & generics',
        slug: 'typescript',
        level: 'Expert',
        icon: FileCode2,
        tags: ['Generics', 'Strict Mode', 'Discriminated Unions', 'Utility Types'],
      },
      {
        name: 'HTML5 & CSS3',
        role: 'Semantic DOM structure & modern responsive CSS',
        slug: 'html-css',
        level: 'Expert',
        icon: Layout,
        tags: ['Semantic HTML', 'Flexbox / Grid', 'CSS Variables', 'A11y ARIA'],
      },
      {
        name: 'JavaScript (ESNext)',
        role: 'Modern functional paradigms & async programming',
        level: 'Expert',
        icon: Cpu,
        tags: ['Closures', 'Promises / Async', 'Modules', 'DOM APIs'],
      },
    ],
  },
  {
    title: 'Frameworks & Runtimes',
    description: 'Component architecture, server rendering, and full-stack React systems',
    icon: Atom,
    items: [
      {
        name: 'React 19',
        role: 'Declarative component architecture & custom hooks',
        slug: 'react',
        level: 'Expert',
        icon: Atom,
        tags: ['Hooks', 'Context API', 'Server Components', 'Concurrent Mode'],
      },
      {
        name: 'Next.js 15 (App Router)',
        role: 'Full-stack React framework with RSC and streaming',
        slug: 'nextjs',
        level: 'Advanced',
        icon: Globe,
        tags: ['App Router', 'RSC Streaming', 'Route Handlers', 'Turbopack'],
      },
      {
        name: 'Vite',
        role: 'Lightning fast frontend build tooling & HMR',
        level: 'Advanced',
        icon: Zap,
        tags: ['ESM Dev Server', 'Rollup Bundler', 'Fast HMR', 'Optimized Assets'],
      },
    ],
  },
  {
    title: 'Styling & Design Systems',
    description: 'Utility-first CSS, accessible primitives, and fluid token themes',
    icon: Layout,
    items: [
      {
        name: 'Tailwind CSS',
        role: 'Utility-first styling with custom design tokens',
        slug: 'tailwind-css',
        level: 'Expert',
        icon: Layout,
        tags: ['Design Tokens', 'JIT Engine', 'Dark Mode', 'Responsive Prefixes'],
      },
      {
        name: 'shadcn/ui & Radix',
        role: 'Accessible, unstyled primitives for UI design systems',
        level: 'Expert',
        icon: Boxes,
        tags: ['WAI-ARIA', 'Keyboard Navigation', 'Compound Components', 'Dialogs'],
      },
      {
        name: 'Lucide Icons',
        role: 'Clean, consistent SVG iconography system',
        level: 'Expert',
        icon: Sparkles,
        tags: ['Tree-Shakeable', 'Dynamic Sizing', 'Stroke Weights', 'SVG Primitives'],
      },
    ],
  },
  {
    title: 'State & Data Synchronization',
    description: 'Predictable client state, form validation, and query caching',
    icon: Workflow,
    items: [
      {
        name: 'Zustand',
        role: 'Minimal, hook-based global state management',
        level: 'Expert',
        icon: Workflow,
        tags: ['Store Slices', 'Middleware', 'Persist Store', 'Zero Boilerplate'],
      },
      {
        name: 'TanStack Query',
        role: 'Declarative asynchronous data fetching & caching',
        level: 'Advanced',
        icon: RefreshCw,
        tags: ['Query Caching', 'Optimistic Updates', 'Auto Refetch', 'Mutations'],
      },
      {
        name: 'React Hook Form & Zod',
        role: 'Performant, type-safe form validation engine',
        level: 'Expert',
        icon: ShieldCheck,
        tags: ['Schema Validation', 'Dirty State', 'Error Handling', 'Field Arrays'],
      },
    ],
  },
  {
    title: 'Motion Physics & Micro-Interactions',
    description: 'Hardware-accelerated animations, 3D tilt, and gestural feedback',
    icon: Sparkles,
    items: [
      {
        name: 'Framer Motion',
        role: 'Production-ready motion library for React components',
        level: 'Expert',
        icon: Sparkles,
        tags: ['Layout Animations', 'Spring Physics', 'Keyframes', 'Exit Animations'],
      },
      {
        name: '3D Interactive Tilt',
        role: 'Spatial mouse-movement depth and perspective cards',
        level: 'Advanced',
        icon: Monitor,
        tags: ['Preserve-3D', 'TranslateZ Parallax', 'Spring Damping', 'Hover Physics'],
      },
      {
        name: 'Micro-Interactions',
        role: 'Tactile hover scaling, active state feedback, and badges',
        level: 'Expert',
        icon: MousePointerClick,
        tags: ['Transform GPU', 'Scale-105', 'Pulse Indicator', 'Smooth Easing'],
      },
    ],
  },
  {
    title: 'Tooling, Quality & Testing',
    description: 'Code quality enforcement, unit testing, and web vital audits',
    icon: Terminal,
    items: [
      {
        name: 'ESLint & Prettier',
        role: 'Automated linting and deterministic code formatting',
        level: 'Expert',
        icon: Terminal,
        tags: ['TypeScript Rules', 'Husky Pre-commit', 'Lint-Staged', 'Clean Code'],
      },
      {
        name: 'Jest & React Testing Library',
        role: 'Component behavior and interaction testing suites',
        level: 'Advanced',
        icon: CheckCircle2,
        tags: ['User Events', 'Snapshot Tests', 'DOM Queries', 'Coverage'],
      },
      {
        name: 'Lighthouse & Web Vitals',
        role: 'Performance, accessibility, SEO, and best practice audits',
        level: 'Expert',
        icon: Gauge,
        tags: ['100/100 Scores', 'Zero CLS', 'Sub-second LCP', 'Fast TBT'],
      },
    ],
  },
];

export default function FrontendSkillsPage() {
  const { skillPageText } = useTranslation();
  const [selectedTier, setSelectedTier] = useState<string>('presentation');
  const [activeEventIndex, setActiveEventIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activePipelineStep, setActivePipelineStep] = useState<number>(5);

  const translatedSimulatedEvents = SIMULATED_UI_EVENTS.map((event) => ({
    ...event,
    action: skillPageText(`frontend`, `simulatedEvents.${event.id}.action`, event.action),
    target: skillPageText(`frontend`, `simulatedEvents.${event.id}.target`, event.target),
    description: skillPageText(
      `frontend`,
      `simulatedEvents.${event.id}.description`,
      event.description,
    ),
  }));

  const currentEvent = translatedSimulatedEvents[activeEventIndex] ?? translatedSimulatedEvents[0];

  const translatedPipelineSteps = [
    {
      title: skillPageText(
        'frontend',
        'pipeline.steps.route.title',
        '01. Route Ingress & RSC Streaming',
      ),
      detail: skillPageText(
        'frontend',
        'pipeline.steps.route.detail',
        'Next.js App Router streaming server component payload over HTTP',
      ),
      time: '< 3ms',
    },
    {
      title: skillPageText(
        'frontend',
        'pipeline.steps.hydration.title',
        '02. Hydration & State Initialization',
      ),
      detail: skillPageText(
        'frontend',
        'pipeline.steps.hydration.detail',
        'Zustand store hydration and React hook context binding',
      ),
      time: '2ms',
    },
    {
      title: skillPageText(
        'frontend',
        'pipeline.steps.diff.title',
        '03. Virtual DOM Diffing & Reconciliation',
      ),
      detail: skillPageText(
        'frontend',
        'pipeline.steps.diff.detail',
        'Component tree diffing with optimized useMemo/useCallback guards',
      ),
      time: '1ms',
    },
    {
      title: skillPageText(
        'frontend',
        'pipeline.steps.dom.title',
        '04. DOM Commit & Style Computation',
      ),
      detail: skillPageText(
        'frontend',
        'pipeline.steps.dom.detail',
        'Tailwind CSS utility classes evaluated without runtime overhead',
      ),
      time: '2ms',
    },
    {
      title: skillPageText(
        'frontend',
        'pipeline.steps.motion.title',
        '05. Motion & Gesture Physics',
      ),
      detail: skillPageText(
        'frontend',
        'pipeline.steps.motion.detail',
        'Framer Motion GPU hardware acceleration on transform layers',
      ),
      time: '< 1ms',
    },
    {
      title: skillPageText(
        'frontend',
        'pipeline.steps.paint.title',
        '06. 60fps Interactive UI Paint',
      ),
      detail: skillPageText(
        'frontend',
        'pipeline.steps.paint.detail',
        'Zero layout shift (CLS: 0.00) and instant user input readiness (INP: 8ms)',
      ),
      time: currentEvent.latency,
    },
  ];

  const translatedCoreWebVitals = {
    title: skillPageText('frontend', 'metrics.coreWebVitals.title', 'Core Web Vitals'),
    liveTelemetry: skillPageText('frontend', 'metrics.coreWebVitals.live', 'Live Telemetry'),
    renderFramerate: skillPageText(
      'frontend',
      'metrics.coreWebVitals.renderFramerate',
      'Render Framerate',
    ),
    largestContentfulPaint: skillPageText(
      'frontend',
      'metrics.coreWebVitals.lcp',
      'Largest Contentful Paint (LCP)',
    ),
    cls: skillPageText('frontend', 'metrics.coreWebVitals.cls', 'Cumulative Layout Shift (CLS)'),
    input: skillPageText(
      'frontend',
      'metrics.coreWebVitals.inp',
      'Interaction to Next Paint (INP)',
    ),
    domNodes: skillPageText('frontend', 'metrics.coreWebVitals.dom', 'Active Virtual DOM Nodes'),
    overallHealth: skillPageText(
      'frontend',
      'metrics.coreWebVitals.overallHealth',
      'Overall UX Health',
    ),
    overallHealthScore: skillPageText(
      'frontend',
      'metrics.coreWebVitals.overallHealthScore',
      '100 / 100 (Optimal)',
    ),
  };

  const translatedArchitectureTiers = FRONTEND_ARCHITECTURE_TIERS.map((tier) => ({
    ...tier,
    title: skillPageText(`frontend`, `architecture.tiers.${tier.id}.title`, tier.title),
    subtitle: skillPageText(`frontend`, `architecture.tiers.${tier.id}.subtitle`, tier.subtitle),
    badge: skillPageText(`frontend`, `architecture.tiers.${tier.id}.badge`, tier.badge),
    components: tier.components.map((component) => ({
      ...component,
      name: skillPageText(
        `frontend`,
        `architecture.tiers.${tier.id}.components.${component.name}.name`,
        component.name,
      ),
      role: skillPageText(
        `frontend`,
        `architecture.tiers.${tier.id}.components.${component.name}.role`,
        component.role,
      ),
      tech: skillPageText(
        `frontend`,
        `architecture.tiers.${tier.id}.components.${component.name}.tech`,
        component.tech,
      ),
    })),
  }));

  const translatedClusters = FRONTEND_TECH_CLUSTERS.map((cluster) => ({
    ...cluster,
    title: skillPageText(`frontend`, `technologyClusters.${cluster.title}.title`, cluster.title),
    description: skillPageText(
      `frontend`,
      `technologyClusters.${cluster.title}.description`,
      cluster.description,
    ),
    items: cluster.items.map((item) => ({
      ...item,
      name: skillPageText(
        `frontend`,
        `technologyClusters.${cluster.title}.items.${item.name}.name`,
        item.name,
      ),
      role: skillPageText(
        `frontend`,
        `technologyClusters.${cluster.title}.items.${item.name}.role`,
        item.role,
      ),
      tags: item.tags.map((tag) =>
        skillPageText(
          `frontend`,
          `technologyClusters.${cluster.title}.items.${item.name}.tags.${tag}`,
          tag,
        ),
      ),
    })),
  }));

  const translatedSystems = [
    {
      name: skillPageText('frontend', 'systems.react.name', 'React Workspace View'),
      path: '/skills/frontend/react',
      desc: skillPageText(
        'frontend',
        'systems.react.desc',
        'Component design, state pipelines, and hooks',
      ),
      perf: skillPageText('frontend', 'systems.react.perf', '100% Score'),
      icon: Atom,
    },
    {
      name: skillPageText('frontend', 'systems.nextjs.name', 'Next.js App Router Workspace'),
      path: '/skills/frontend/nextjs',
      desc: skillPageText(
        'frontend',
        'systems.nextjs.desc',
        'RSC streaming, static generation & route handlers',
      ),
      perf: skillPageText('frontend', 'systems.nextjs.perf', '0.8s LCP'),
      icon: Globe,
    },
    {
      name: skillPageText('frontend', 'systems.typescript.name', 'TypeScript Safe Workspace'),
      path: '/skills/frontend/typescript',
      desc: skillPageText(
        'frontend',
        'systems.typescript.desc',
        'Strict interfaces, discriminated unions & generics',
      ),
      perf: skillPageText('frontend', 'systems.typescript.perf', 'Zero Errors'),
      icon: FileCode2,
    },
    {
      name: skillPageText('frontend', 'systems.tailwind.name', 'Tailwind Design System'),
      path: '/skills/frontend/tailwind-css',
      desc: skillPageText(
        'frontend',
        'systems.tailwind.desc',
        'Utility design tokens & fluid dark/light themes',
      ),
      perf: skillPageText('frontend', 'systems.tailwind.perf', 'Zero Runtime'),
      icon: Layout,
    },
    {
      name: skillPageText('frontend', 'systems.html.name', 'Semantic HTML & CSS'),
      path: '/skills/frontend/html-css',
      desc: skillPageText(
        'frontend',
        'systems.html.desc',
        'Accessible semantic markup & fluid responsive grids',
      ),
      perf: skillPageText('frontend', 'systems.html.perf', '100% A11y'),
      icon: Layers,
    },
    {
      name: skillPageText('frontend', 'systems.tilt.name', '3D Interactive Tilt Cards'),
      path: '/skills',
      desc: skillPageText(
        'frontend',
        'systems.tilt.desc',
        'Spatial parallax depth & hover physics engine',
      ),
      perf: skillPageText('frontend', 'systems.tilt.perf', '60 FPS'),
      icon: Sparkles,
    },
    {
      name: skillPageText(
        'frontend',
        'systems.palette.name',
        'Interactive Navigation & Command Palette',
      ),
      path: '/projects',
      desc: skillPageText(
        'frontend',
        'systems.palette.desc',
        'Keyboard accessible command palette & quick search',
      ),
      perf: skillPageText('frontend', 'systems.palette.perf', '< 5ms Input'),
      icon: Terminal,
    },
    {
      name: skillPageText('frontend', 'systems.i18n.name', 'Real-Time Language Switcher'),
      path: '/contact',
      desc: skillPageText(
        'frontend',
        'systems.i18n.desc',
        'Dynamic multilingual i18n translation without reload',
      ),
      perf: skillPageText('frontend', 'systems.i18n.perf', 'Zero Shift'),
      icon: Globe,
    },
  ];

  const translatedStandards = [
    {
      title: skillPageText(
        'frontend',
        'standards.accessibility.title',
        'Strict Accessibility (WCAG 2.1 AA)',
      ),
      desc: skillPageText(
        'frontend',
        'standards.accessibility.desc',
        'Keyboard navigable focus states, ARIA labels, semantic landmark elements, and high contrast ratios.',
      ),
    },
    {
      title: skillPageText('frontend', 'standards.vitals.title', 'Core Web Vitals Optimization'),
      desc: skillPageText(
        'frontend',
        'standards.vitals.desc',
        'Sub-second LCP, zero layout shift (CLS: 0.00), responsive image optimization, and rapid INP.',
      ),
    },
    {
      title: skillPageText(
        'frontend',
        'standards.scalability.title',
        'Component Scalability & Atomic Design',
      ),
      desc: skillPageText(
        'frontend',
        'standards.scalability.desc',
        'Single responsibility components, compound patterns, custom hook decoupling, and reusability.',
      ),
    },
    {
      title: skillPageText(
        'frontend',
        'standards.typesafe.title',
        'Type-Safe Contracts & Validation',
      ),
      desc: skillPageText(
        'frontend',
        'standards.typesafe.desc',
        'Strict TypeScript props, zero any assertions, validated form schemas with Zod, and runtime sanity.',
      ),
    },
  ];

  const translatedExplore = {
    title: skillPageText('frontend', 'explore.title', 'Explore Individual Frontend Workspaces'),
    description: skillPageText(
      'frontend',
      'explore.description',
      'Deep dive into dedicated UI telemetry, rendering pipelines, and component architecture for React, Next.js, TypeScript, and Tailwind CSS.',
    ),
  };

  // Function to simulate a live UI rendering execution
  const triggerSimulation = (index: number) => {
    setActiveEventIndex(index);
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
    }, 110);
  };

  return (
    <motion.div
      className="h-full w-full space-y-6 rounded-[8px] bg-background p-4 text-foreground md:p-8 overflow-y-auto overflow-x-hidden"
      style={{ fontSize: '0.88rem', lineHeight: '1.4' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. CLIENT RUNTIME HEADER & STATUS BANNER */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-4 border-b border-border/40 pb-5 lg:flex-row lg:items-center"
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-foreground md:text-[28px]">
              {skillPageText('frontend', 'pageTitle', 'FRONTEND WORKSPACE')}
            </h1>
            <span className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-0.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
              {skillPageText('frontend', 'status', 'Client Engine Online')}
            </span>
          </div>
          <p className="mt-1 max-w-2xl font-inter text-[13px] text-muted-foreground">
            {skillPageText(
              'frontend',
              'description',
              'Crafting fluid, high-performance user interfaces with React 19, Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.',
            )}
          </p>
        </div>

        {/* Client Metadata Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Atom className="size-4 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col">
              <span className="font-inter text-[12px] font-bold leading-none">
                React 19 / Next.js 15
              </span>
              <span className="text-[10px] text-muted-foreground">
                {skillPageText('frontend', 'componentEngine', 'Component Engine')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Gauge className="size-4 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col">
              <span className="font-inter text-[12px] font-bold leading-none">100 / 100</span>
              <span className="text-[10px] text-muted-foreground">
                {skillPageText('frontend', 'lighthouseScore', 'Lighthouse Score')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Sparkles className="size-4 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col">
              <span className="font-inter text-[12px] font-bold leading-none">60 FPS</span>
              <span className="text-[10px] text-muted-foreground">
                {skillPageText('frontend', 'hardwareMotion', 'Hardware Motion')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <ShieldCheck className="size-4 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col">
              <span className="font-inter text-[12px] font-bold leading-none">WCAG 2.1 AA</span>
              <span className="text-[10px] text-muted-foreground">
                {skillPageText('frontend', 'accessibilityGrade', 'Accessibility Grade')}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. TOP TELEMETRY & LIVE UI RENDERING PIPELINE SIMULATOR */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* INTERACTIVE UI EVENT SIMULATOR */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-4"
        >
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-blue-600 dark:text-blue-400" />
                <h2 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
                  {skillPageText(
                    'frontend',
                    'metadata.uiEventRenderSimulator',
                    'UI Event & Render Simulator',
                  )}
                </h2>
              </div>
              <span className="font-mono text-[9px] text-muted-foreground">
                {skillPageText('frontend', 'metadata.clickToSimulate', 'Click to simulate')}
              </span>
            </div>

            <div className="space-y-2">
              {translatedSimulatedEvents.map((event, idx) => {
                const isSelected = activeEventIndex === idx;
                return (
                  <button
                    key={event.id}
                    onClick={() => triggerSimulation(idx)}
                    className={`group w-full rounded-[8px] border p-2.5 text-left transition-all ${
                      isSelected
                        ? 'border-blue-500/70 bg-[#0b1633] text-blue-100'
                        : 'border-border/30 bg-muted/20 hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-inter text-[11px] font-bold ${
                          isSelected ? 'text-blue-100' : 'text-foreground'
                        }`}
                      >
                        {event.action}
                      </span>
                      <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400">
                        {event.latency}
                      </span>
                    </div>
                    <p
                      className={`mt-1 truncate font-mono text-[10.5px] ${
                        isSelected ? 'text-blue-200/90' : 'text-muted-foreground'
                      }`}
                    >
                      {event.target}
                    </p>
                    <p
                      className={`mt-0.5 line-clamp-1 text-[10px] ${
                        isSelected ? 'text-blue-200/75' : 'text-muted-foreground/80'
                      }`}
                    >
                      {event.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 border-t border-border/40 pt-3">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-muted-foreground">
                {skillPageText('frontend', 'metadata.eventTarget', 'Event Target:')}
              </span>
              <span className="font-bold text-foreground truncate max-w-[200px]">
                {currentEvent.target}
              </span>
            </div>
          </div>
        </motion.div>

        {/* STEP-BY-STEP RENDERING PIPELINE */}
        <motion.div
          variants={cardVariants}
          className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Workflow className="size-4 text-blue-600 dark:text-blue-400" />
              <h2 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
                {skillPageText(
                  'frontend',
                  'metadata.renderingPipelineLifecycle',
                  'Rendering Pipeline Lifecycle',
                )}
              </h2>
            </div>
            {isSimulating && (
              <span className="flex items-center gap-1 font-mono text-[10px] text-blue-600 dark:text-blue-400 animate-pulse">
                <RefreshCw className="size-3 animate-spin" />
                {skillPageText('frontend', 'metadata.renderingFrame', 'Rendering Frame...')}
              </span>
            )}
          </div>

          <div className="relative space-y-3 pl-4 before:absolute before:left-1.5 before:top-2 before:h-[88%] before:w-0.5 before:bg-blue-500/30">
            {translatedPipelineSteps.map((step, idx) => {
              const isPastOrCurrent = activePipelineStep >= idx;
              return (
                <div key={idx} className="relative flex items-start justify-between">
                  <span
                    className={`absolute -left-[19px] top-1 size-2.5 rounded-full ring-4 ring-card transition-colors duration-200 ${
                      isPastOrCurrent ? 'bg-blue-600 dark:bg-blue-400' : 'bg-muted-foreground/30'
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

        {/* LIVE CORE WEB VITALS TELEMETRY */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-3"
        >
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="size-4 text-blue-600 dark:text-blue-400" />
                <h2 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
                  {translatedCoreWebVitals.title}
                </h2>
              </div>
              <span className="font-mono text-[9px] text-blue-600 dark:text-blue-400">
                {translatedCoreWebVitals.liveTelemetry}
              </span>
            </div>

            <div className="space-y-2">
              <LiveMetricRow
                label={translatedCoreWebVitals.renderFramerate}
                type="fps"
                baseline={6}
                variance={2}
                updateInterval={200}
                color="#2563eb"
              />
              <LiveMetricRow
                label={translatedCoreWebVitals.largestContentfulPaint}
                type="lcp"
                baseline={18}
                variance={8}
                updateInterval={260}
                color="#2563eb"
              />
              <LiveMetricRow
                label={translatedCoreWebVitals.cls}
                type="cls"
                baseline={26}
                variance={0}
                updateInterval={350}
                color="#10b981"
              />
              <LiveMetricRow
                label={translatedCoreWebVitals.input}
                type="inp"
                baseline={12}
                variance={8}
                updateInterval={240}
                color="#2563eb"
              />
              <LiveMetricRow
                label={translatedCoreWebVitals.domNodes}
                type="dom"
                baseline={16}
                variance={8}
                updateInterval={300}
                color="#2563eb"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-[8px] bg-blue-500/10 p-2.5 font-mono text-[11px] text-blue-700 dark:text-blue-300">
            <span>{translatedCoreWebVitals.overallHealth}</span>
            <span className="font-bold">{translatedCoreWebVitals.overallHealthScore}</span>
          </div>
        </motion.div>
      </div>

      {/* 3. 5-TIER FRONTEND ARCHITECTURE BLUEPRINT */}
      <motion.div
        variants={cardVariants}
        className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm"
      >
        <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-blue-600 dark:text-blue-400" />
              <h2 className="font-inter text-[16px] font-black uppercase tracking-tight text-foreground md:text-[18px]">
                {skillPageText(
                  'frontend',
                  'architecture.title',
                  '5-Tier Frontend Architecture Blueprint',
                )}
              </h2>
            </div>
            <p className="font-inter text-[12px] text-muted-foreground">
              {skillPageText(
                'frontend',
                'architecture.description',
                'A structured breakdown of how user interactions flow through our design system, component hierarchy, state stores, compilation layer, and motion physics.',
              )}
            </p>
          </div>

          {/* Tier Switcher Navigation */}
          <div className="flex flex-wrap items-center gap-1 rounded-[8px] bg-muted/30 p-1 border border-border/40">
            {FRONTEND_ARCHITECTURE_TIERS.map((tier) => {
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
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {translatedArchitectureTiers.map((tier) => {
            const isSelected = selectedTier === tier.id;
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`cursor-pointer rounded-[12px] border p-5 transition-all duration-300 ${
                  isSelected
                    ? 'border-blue-500/60 bg-blue-500/[0.04] shadow-md -translate-y-1'
                    : 'border-border/40 bg-muted/10 hover:bg-muted/30'
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-[6px] bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <Icon className="size-3.5" />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400">
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

                <div className="mt-4 space-y-3 border-t border-border/30 pt-3">
                  {tier.components.map((comp, idx) => (
                    <div
                      key={idx}
                      className="rounded-[8px] bg-card/80 p-3 border border-border/30 text-[10.5px]"
                    >
                      <div className="flex items-center justify-between font-semibold text-foreground">
                        <span>{comp.name}</span>
                      </div>
                      <div className="mt-0.5 flex items-center justify-between text-[9.5px] text-muted-foreground">
                        <span>{comp.role}</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400">
                          {comp.tech}
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

      {/* 4. FRONTEND TECHNOLOGY CLUSTERS (6 DOMAINS) */}
      <motion.div variants={cardVariants} className="space-y-4">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-inter text-[18px] font-black uppercase tracking-tight text-foreground md:text-[20px]">
              {skillPageText('frontend', 'technology.title', 'Frontend Technology Clusters')}
            </h2>
            <p className="font-inter text-[12px] text-muted-foreground">
              {skillPageText(
                'frontend',
                'technology.description',
                'Comprehensive expertise across component libraries, compilation engines, state stores, and motion frameworks.',
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {translatedClusters.map((cluster) => {
            const ClusterIcon = cluster.icon;
            return (
              <div
                key={cluster.title}
                className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div>
                  <div className="mb-3 flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-[8px] bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
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
                              <ItemIcon className="size-3.5 text-blue-600 dark:text-blue-400" />
                              <span className="font-inter text-[12px] font-bold text-foreground">
                                {item.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="rounded bg-blue-500/10 px-1.5 py-0.2 font-mono text-[8px] font-bold text-blue-600 dark:text-blue-400">
                                {item.level}
                              </span>
                              {item.slug && (
                                <Link
                                  href={`/skills/frontend/${item.slug}`}
                                  className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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

      {/* 5. ACTIVE PRODUCTION UI SHOWCASES & COMPONENT REGISTRY */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Active Production Components */}
        <motion.div
          variants={cardVariants}
          className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="size-4 text-blue-600 dark:text-blue-400" />
              <h3 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
                {skillPageText(
                  'frontend',
                  'systems.title',
                  'Active Production UI Systems & Showcases',
                )}
              </h3>
            </div>
            <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400">
              {skillPageText('frontend', 'systems.nodes', '8 Active Showcases')}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {translatedSystems.map((system, idx) => {
              const Icon = system.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-[8px] border border-border/30 bg-muted/20 p-3 transition-colors hover:bg-muted/40"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="size-3.5 text-blue-600 dark:text-blue-400" />
                        <span className="font-inter text-[11.5px] font-bold text-foreground">
                          {system.name}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-blue-600 dark:text-blue-400">
                        {system.perf}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[10px] text-blue-700 dark:text-blue-300">
                      {system.path}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-1">
                      {system.desc}
                    </p>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between border-t border-border/20 pt-2 text-[9px]">
                    <span className="text-muted-foreground">Status</span>
                    <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Production Ready
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Frontend Engineering Principles & Standards */}
        <motion.div
          variants={cardVariants}
          className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="size-4 text-blue-600 dark:text-blue-400" />
            <h3 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
              Core Engineering Standards
            </h3>
          </div>

          <div className="space-y-3">
            {translatedStandards.map((pillar, idx) => (
              <div key={idx} className="rounded-[8px] border border-border/30 bg-muted/20 p-3">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-500" />
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
        className="flex flex-col justify-between gap-4 rounded-[12px] border border-blue-500/30 bg-blue-500/5 p-5 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Zap className="size-5" />
          </div>
          <div>
            <h4 className="font-inter text-[13px] font-bold text-foreground">
              {translatedExplore.title}
            </h4>
            <p className="text-[11px] text-muted-foreground">{translatedExplore.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/skills/frontend/react"
            className="inline-flex items-center gap-1 rounded-[6px] bg-blue-600 px-3 py-1.5 font-inter text-[11px] font-semibold text-white shadow-xs transition-colors hover:bg-blue-700"
          >
            React Workspace <ArrowRight className="size-3" />
          </Link>
          <Link
            href="/skills/frontend/nextjs"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            Next.js Workspace
          </Link>
          <Link
            href="/skills/frontend/typescript"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            TypeScript Workspace
          </Link>
          <Link
            href="/skills/frontend/tailwind-css"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            Tailwind Workspace
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
