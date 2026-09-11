import portfolioGallery1 from '@/assets/images/projects/portfolio-workspace/portfolio-gallery/1.png';
import portfolioGallery2 from '@/assets/images/projects/portfolio-workspace/portfolio-gallery/2.png';
import portfolioGallery3 from '@/assets/images/projects/portfolio-workspace/portfolio-gallery/3.png';
import portfolioGallery4 from '@/assets/images/projects/portfolio-workspace/portfolio-gallery/4.png';
import portfolioGallery5 from '@/assets/images/projects/portfolio-workspace/portfolio-gallery/5.png';
import portfolioGallery6 from '@/assets/images/projects/portfolio-workspace/portfolio-gallery/6.png';
import portfolioGallery7 from '@/assets/images/projects/portfolio-workspace/portfolio-gallery/7.png';
import portfolioGallery8 from '@/assets/images/projects/portfolio-workspace/portfolio-gallery/8.png';
import portfolioGallery9 from '@/assets/images/projects/portfolio-workspace/portfolio-gallery/9.png';
import type { GalleryItem } from '@/components/3d/Carousel3D';
import { StaticImageData } from 'next/image';

export interface WebProjectDetails {
  projectName: string;
  tagline: string;
  liveDemoUrl: string;
  repositoryUrl: string;
  imageUrl?: string;
  coreObjective: string;
  targetAudience: string[];
  currentPhase: string[];
  systemModules: SystemModule[];
  architectureSnapshot: ArchitectureNode[];
  engineeringHighlights: string[];
}

export interface SystemModule {
  id: string;
  title: string;
  description: string;
  status: 'Stable' | 'In Development' | 'Planned';
  icon: string;
}

export interface ArchitectureNode {
  title: string;
  subtitle: string;
  icon: string;
}

export interface WebProjectGalleryData {
  projectName: string;
  tagline: string;
  liveDemoUrl?: string;
  screensUrl?: string;
  heroGraphicUrl?: string;
  items: GalleryItem[];
}

export interface WebProjectTechStackData {
  projectName: string;
  subtitle: string;
  description: string;
  totalTechnologiesCount: number;
  environmentStatus: EnvironmentStatusItem[];
  coreStack: CoreStackItem[];
  runtimeServices: RuntimeServiceItem[];
  buildStatus: BuildStatusItem[];
}

export interface EnvironmentStatusItem {
  id: string;
  title: string;
  count: number;
  tools: string;
  status: 'Running' | 'Synced' | 'Active';
  icon: string;
}

export interface CoreStackItem {
  id: string;
  name: string;
  role: string;
  tag: string;
  badgeVariant?: 'primary' | 'core' | 'connected';
  icon: string;
}

export interface RuntimeServiceItem {
  id: string;
  name: string;
  status: 'Available' | 'Connected' | 'Active';
  icon: string;
}

export interface BuildStatusItem {
  id: string;
  layer: string;
  status: 'Passing' | 'Connected' | 'Production';
  statusVariant?: 'passing' | 'connected' | 'production';
}

export interface WebProjectDemoData {
  projectName: string;
  badgeText: string;
  status: 'Online' | 'Offline';
  heroImageUrl?: StaticImageData | string;
  executionConfig: ExecutionConfigItem[];
  liveDemoUrl: string;
  runtimeHighlights: string[];
  systemOutput: string[];
  previewSession: PreviewSessionData;
  launchArguments: string[];
}

export interface ExecutionConfigItem {
  label: string;
  value: string;
}

export interface PreviewSessionData {
  status: 'Running' | 'Idle' | 'Offline';
  url: string;
  device: string;
  region: string;
}

export interface WebProjectRepositoryData {
  projectName: string;
  badgeText: string;
  status: 'Online' | 'Offline';
  repositoryPath: string;
  description: string;
  heroImageUrl?: StaticImageData | string;
  stats: RepositoryStat[];
  activeTab: string;
  latestCommit: {
    title: string;
    authorName: string;
    authorAvatar?: StaticImageData | string;
    message: string;
  };
  branches: BranchItem[];
  moreBranchesCount: number;
  ciStatuses: CIStatusItem[];
  insights: {
    files: number;
    commits: number;
    contributors: number;
    openIssues: number;
    pullRequests: number;
  };
  languages: LanguageBreakdownItem[];
}

export interface RepositoryStat {
  id: string;
  label: string;
  value: string | number;
  icon: string;
}

export interface BranchItem {
  name: string;
  isDefault?: boolean;
}

export interface CIStatusItem {
  name: string;
  status: 'Passing' | 'Failing' | 'Running' | string;
  variant?: 'success' | 'primary' | 'warning';
}

export interface LanguageBreakdownItem {
  name: string;
  percentage: number;
  color: string;
}

// --- PORTFOLIO WORKSPACE DATA ---

export const PORTFOLIO_WORKSPACE_DETAILS: WebProjectDetails = {
  projectName: 'Portfolio Workspace',
  tagline: 'Full-stack portfolio platform with Next.js, React, TypeScript, and MongoDB.',
  liveDemoUrl: '/',
  repositoryUrl: 'https://github.com/ahmedyacine2004/portofolio-website',
  imageUrl: '/branding/logo.png',
  coreObjective: 'Showcase creative work with a modern, interactive portfolio platform',
  targetAudience: ['Designers', 'Developers', 'Creative Professionals'],
  currentPhase: ['Production', 'API Complete', 'UI Polished'],
  systemModules: [
    {
      id: 'auth',
      title: 'Authentication',
      description: 'Secure JWT-based authentication system',
      status: 'Stable',
      icon: 'Shield',
    },
    {
      id: 'projects',
      title: 'Project Management',
      description: 'CRUD operations for project portfolio management',
      status: 'Stable',
      icon: 'Folder',
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Portfolio view tracking and engagement metrics',
      status: 'In Development',
      icon: 'BarChart3',
    },
    {
      id: 'admin',
      title: 'Administration',
      description: 'Content management and dashboard',
      status: 'Stable',
      icon: 'Settings',
    },
  ],
  architectureSnapshot: [
    { title: 'Frontend', subtitle: 'Next.js / React', icon: 'Smartphone' },
    { title: 'Backend', subtitle: 'Node.js / Express', icon: 'Cpu' },
    { title: 'Database', subtitle: 'MongoDB', icon: 'Database' },
    { title: 'Storage', subtitle: 'Cloud Storage', icon: 'Cloud' },
  ],
  engineeringHighlights: [
    'SSR & Static Generation',
    'Responsive Design',
    'SEO Optimized',
    'Fast Load Times',
    'Admin Dashboard',
  ],
};

export const PORTFOLIO_WORKSPACE_GALLERY_DATA: WebProjectGalleryData = {
  projectName: 'Portfolio Workspace',
  tagline: 'Explore the portfolio workspace interface and project showcase screens.',
  liveDemoUrl: '/',
  heroGraphicUrl: '/branding/logo.png',
  items: [
    {
      id: 'screen-1',
      title: 'Portfolio Homepage',
      imageUrl: portfolioGallery1.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '1 day ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-2',
      title: 'About and Profile Workspace',
      imageUrl: portfolioGallery2.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '1 day ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-3',
      title: 'Projects Dashboard',
      imageUrl: portfolioGallery3.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '2 days ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-4',
      title: 'Skills and Technology Explorer',
      imageUrl: portfolioGallery4.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '2 days ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-5',
      title: 'Experience Timeline',
      imageUrl: portfolioGallery5.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '3 days ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-6',
      title: 'Project Details Workspace',
      imageUrl: portfolioGallery6.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '3 days ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-7',
      title: 'Contact Workspace',
      imageUrl: portfolioGallery7.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '4 days ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-8',
      title: 'AI Assistant Workspace',
      imageUrl: portfolioGallery8.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '4 days ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-9',
      title: 'Settings Workspace',
      imageUrl: portfolioGallery9.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '5 days ago',
      fileType: 'PNG Image',
    },
  ],
};

export const PORTFOLIO_WORKSPACE_TECH_STACK_DATA: WebProjectTechStackData = {
  projectName: 'Portfolio Workspace',
  subtitle: 'Current Monorepo Architecture',
  description:
    'The stack currently powering this portfolio across its Next.js client and NestJS API.',
  totalTechnologiesCount: 18,
  environmentStatus: [
    {
      id: 'frontend-runtime',
      title: 'Frontend',
      count: 7,
      tools: 'Next.js 16 . React 19 . TypeScript . Tailwind 4',
      status: 'Running',
      icon: 'Code2',
    },
    {
      id: 'backend-runtime',
      title: 'Backend',
      count: 4,
      tools: 'NestJS 11 . Node.js . Mongoose . Swagger',
      status: 'Running',
      icon: 'Server',
    },
    {
      id: 'data-layer',
      title: 'Data Layer',
      count: 2,
      tools: 'MongoDB . Mongoose 9',
      status: 'Synced',
      icon: 'Database',
    },
    {
      id: 'interactive-ui',
      title: 'Interactive UI',
      count: 5,
      tools: 'Three.js . React Three Fiber . Motion . Recharts',
      status: 'Active',
      icon: 'Sparkles',
    },
  ],
  coreStack: [
    {
      id: 'nextjs',
      name: 'Next.js',
      role: 'App Router frontend',
      tag: 'v16.3',
      badgeVariant: 'primary',
      icon: 'Code2',
    },
    {
      id: 'react',
      name: 'React',
      role: 'UI component runtime',
      tag: 'v19.2',
      badgeVariant: 'core',
      icon: 'Layers',
    },
    {
      id: 'nestjs',
      name: 'NestJS',
      role: 'Backend application framework',
      tag: 'v11',
      badgeVariant: 'core',
      icon: 'Server',
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      role: 'Strict type system',
      tag: 'v5',
      badgeVariant: 'core',
      icon: 'ShieldCheck',
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      role: 'Utility-first styling',
      tag: 'v4',
      badgeVariant: 'connected',
      icon: 'Palette',
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      role: 'Document database',
      tag: 'Connected',
      badgeVariant: 'connected',
      icon: 'Database',
    },
  ],
  runtimeServices: [
    {
      id: 'react-query',
      name: 'TanStack Query',
      status: 'Active',
      icon: 'Workflow',
    },
    {
      id: 'zustand',
      name: 'Zustand',
      status: 'Active',
      icon: 'Zap',
    },
    {
      id: 'three',
      name: 'Three.js / R3F',
      status: 'Active',
      icon: 'Sparkles',
    },
    {
      id: 'rest-api',
      name: 'NestJS REST API',
      status: 'Connected',
      icon: 'Cpu',
    },
  ],
  buildStatus: [
    {
      id: 'client-build',
      layer: 'Next.js Client',
      status: 'Passing',
      statusVariant: 'passing',
    },
    {
      id: 'server-build',
      layer: 'NestJS Server',
      status: 'Passing',
      statusVariant: 'passing',
    },
    {
      id: 'database-connection',
      layer: 'MongoDB Connection',
      status: 'Connected',
      statusVariant: 'connected',
    },
  ],
};

export const PORTFOLIO_WORKSPACE_DEMO_DATA: WebProjectDemoData = {
  projectName: 'Portfolio Workspace',
  badgeText: 'LIVE DEMO',
  status: 'Online',
  executionConfig: [
    { label: 'Environment', value: 'Production' },
    { label: 'Region', value: 'US East' },
  ],
  liveDemoUrl: '/',
  runtimeHighlights: ['Fast Load Times', 'Responsive Design', 'SEO Optimized'],
  systemOutput: ['Server running on port 3000', 'Database connected'],
  previewSession: {
    status: 'Running',
    url: '/',
    device: 'Desktop',
    region: 'US East',
  },
  launchArguments: ['npm run dev', 'NODE_ENV=production'],
};

export const PORTFOLIO_WORKSPACE_REPOSITORY_DATA: WebProjectRepositoryData = {
  projectName: 'Portfolio Workspace',
  badgeText: 'GITHUB REPOSITORY',
  status: 'Online',
  repositoryPath: 'ahmedyacine2004 / portofolio-website',
  description: 'The source repository for the current portfolio monorepo.',
  stats: [
    { id: 'stars', label: 'Stars', value: 0, icon: 'Star' },
    { id: 'forks', label: 'Forks', value: 0, icon: 'GitFork' },
    { id: 'commits', label: 'Commits', value: 78, icon: 'GitCommit' },
  ],
  activeTab: 'README',
  latestCommit: {
    title: 'feat: update keyboard model with new binary data',
    authorName: 'Ahmed Yassine Abbane',
    message: 'Updated the keyboard model with new binary data.',
  },
  branches: [{ name: 'master', isDefault: true }],
  moreBranchesCount: 0,
  ciStatuses: [
    { name: 'Build', status: 'Passing', variant: 'success' },
    { name: 'Tests', status: 'Passing', variant: 'success' },
  ],
  insights: {
    files: 502,
    commits: 78,
    contributors: 1,
    openIssues: 0,
    pullRequests: 0,
  },
  languages: [
    { name: 'TypeScript', percentage: 98.7, color: '#3178c6' },
    { name: 'CSS', percentage: 1.2, color: '#563d7c' },
    { name: 'JavaScript', percentage: 0.1, color: '#f1e05a' },
  ],
};
