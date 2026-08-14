import type { GalleryItem } from '@/components/3d/Carousel3D';
import { StaticImageData } from 'next/image';

// Placeholder image imports - adjust to match your actual assets
import placeholderImage from '@/assets/images/consultify.png';

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
  liveDemoUrl: 'https://portfolio-workspace.example.com',
  repositoryUrl: 'https://github.com/username/portfolio-workspace',
  imageUrl: placeholderImage.src,
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
  liveDemoUrl: 'https://portfolio-workspace.example.com',
  items: [
    {
      id: 'screen-1',
      title: 'Homepage Hero Section',
      imageUrl: placeholderImage.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '1 day ago',
      fileType: 'PNG Image',
    },
  ],
};

export const PORTFOLIO_WORKSPACE_TECH_STACK_DATA: WebProjectTechStackData = {
  projectName: 'Portfolio Workspace',
  subtitle: 'Modern Full-Stack Architecture',
  description: 'Built with latest technologies for performance and scalability',
  totalTechnologiesCount: 15,
  environmentStatus: [
    {
      id: 'frontend',
      title: 'Frontend',
      count: 5,
      tools: 'Next.js, React, TypeScript, Tailwind',
      status: 'Running',
      icon: 'Monitor',
    },
  ],
  coreStack: [
    {
      id: 'nextjs',
      name: 'Next.js',
      role: 'Framework',
      tag: 'v14',
      badgeVariant: 'core',
      icon: 'Package',
    },
  ],
  runtimeServices: [
    {
      id: 'api',
      name: 'REST API',
      status: 'Active',
      icon: 'Cpu',
    },
  ],
  buildStatus: [
    {
      id: 'build-1',
      layer: 'Frontend Build',
      status: 'Passing',
      statusVariant: 'passing',
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
  liveDemoUrl: 'https://portfolio-workspace.example.com',
  runtimeHighlights: ['Fast Load Times', 'Responsive Design', 'SEO Optimized'],
  systemOutput: ['Server running on port 3000', 'Database connected'],
  previewSession: {
    status: 'Running',
    url: 'https://portfolio-workspace.example.com',
    device: 'Desktop',
    region: 'US East',
  },
  launchArguments: ['npm run dev', 'NODE_ENV=production'],
};

export const PORTFOLIO_WORKSPACE_REPOSITORY_DATA: WebProjectRepositoryData = {
  projectName: 'Portfolio Workspace',
  badgeText: 'GITHUB REPOSITORY',
  status: 'Online',
  repositoryPath: 'username/portfolio-workspace',
  description: 'Full-stack portfolio platform with modern tech stack',
  stats: [
    { id: 'stars', label: 'Stars', value: 342, icon: 'Star' },
    { id: 'forks', label: 'Forks', value: 89, icon: 'GitFork' },
    { id: 'commits', label: 'Commits', value: 456, icon: 'GitCommit' },
  ],
  activeTab: 'Code',
  latestCommit: {
    title: 'chore: update dependencies',
    authorName: 'Ahmed',
    message: 'Updated all dependencies to latest versions',
  },
  branches: [{ name: 'main', isDefault: true }, { name: 'develop' }, { name: 'staging' }],
  moreBranchesCount: 2,
  ciStatuses: [
    { name: 'Build', status: 'Passing', variant: 'success' },
    { name: 'Tests', status: 'Passing', variant: 'success' },
  ],
  insights: {
    files: 245,
    commits: 456,
    contributors: 3,
    openIssues: 12,
    pullRequests: 5,
  },
  languages: [
    { name: 'TypeScript', percentage: 65, color: '#3178c6' },
    { name: 'CSS', percentage: 20, color: '#563d7c' },
    { name: 'JavaScript', percentage: 15, color: '#f1e05a' },
  ],
};
