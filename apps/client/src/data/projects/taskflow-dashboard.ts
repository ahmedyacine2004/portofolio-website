import type { GalleryItem } from '@/components/3d/Carousel3D';
import { StaticImageData } from 'next/image';

import taskflowBoard from '@/assets/images/taskflow/board.jpg';
import taskflowCalendar from '@/assets/images/taskflow/calendar.jpg';
import taskflowDashboard from '@/assets/images/taskflow/dashboard.jpg';
import taskflowLogo from '@/assets/images/taskflow/taskflow-mark.png';
import taskflowTeam from '@/assets/images/taskflow/team.jpg';

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

// --- TASKFLOW DASHBOARD DATA ---

export const TASKFLOW_DASHBOARD_DETAILS: WebProjectDetails = {
  projectName: 'TaskFlow Dashboard',
  tagline: 'Real-time project management dashboard with team collaboration features.',
  liveDemoUrl: 'https://taskflow-dashboard.vercel.app',
  repositoryUrl: 'https://github.com/ahmedyacine2004/taskflow-dashboard',
  imageUrl: taskflowLogo.src,
  coreObjective:
    'Give distributed teams one focused workspace for planning, execution, and delivery.',
  targetAudience: ['Product Teams', 'Project Managers', 'Agencies'],
  currentPhase: ['Public Beta', 'Realtime Collaboration', 'Reporting in Progress'],
  systemModules: [
    {
      id: 'tasks',
      title: 'Task Management',
      description: 'Create, assign, prioritize, and track work from backlog to done.',
      status: 'Stable',
      icon: 'CheckSquare',
    },
    {
      id: 'collaboration',
      title: 'Team Collaboration',
      description: 'Keep comments, mentions, and activity updates attached to the work.',
      status: 'Stable',
      icon: 'Users',
    },
    {
      id: 'analytics',
      title: 'Delivery Analytics',
      description: 'Track cycle time, throughput, workload, and sprint progress.',
      status: 'In Development',
      icon: 'LineChart',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Receive focused alerts for assignments, mentions, and due dates.',
      status: 'Stable',
      icon: 'Bell',
    },
  ],
  architectureSnapshot: [
    { title: 'Frontend', subtitle: 'Next.js / TypeScript', icon: 'Smartphone' },
    { title: 'Realtime', subtitle: 'WebSocket Gateway', icon: 'GitFork' },
    { title: 'Backend', subtitle: 'NestJS / Node.js', icon: 'Cpu' },
    { title: 'Database', subtitle: 'PostgreSQL / Redis', icon: 'Database' },
  ],
  engineeringHighlights: [
    'Realtime Event Sync',
    'Role-based Workspaces',
    'Sprint Analytics',
    'Optimistic UI Updates',
    'Responsive Workflows',
  ],
};

export const TASKFLOW_DASHBOARD_GALLERY_DATA: WebProjectGalleryData = {
  projectName: 'TaskFlow Dashboard',
  tagline: 'Explore the planning, collaboration, and delivery workflows behind TaskFlow.',
  liveDemoUrl: 'https://taskflow-dashboard.vercel.app',
  heroGraphicUrl: taskflowLogo.src,
  items: [
    {
      id: 'screen-1',
      title: 'Workspace Overview',
      imageUrl: taskflowDashboard.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '2 days ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-2',
      title: 'Kanban Project Board',
      imageUrl: taskflowBoard.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '2 days ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-3',
      title: 'Team Activity and Collaboration',
      imageUrl: taskflowTeam.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '3 days ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-4',
      title: 'Sprint Calendar and Deadlines',
      imageUrl: taskflowCalendar.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '3 days ago',
      fileType: 'PNG Image',
    },
  ],
};

export const TASKFLOW_DASHBOARD_TECH_STACK_DATA: WebProjectTechStackData = {
  projectName: 'TaskFlow Dashboard',
  subtitle: 'Collaborative Delivery Platform',
  description: 'A realtime project workspace for planning, collaboration, and delivery visibility.',
  totalTechnologiesCount: 16,
  environmentStatus: [
    {
      id: 'frontend',
      title: 'Frontend',
      count: 6,
      tools: 'Next.js, React, TypeScript, Tailwind',
      status: 'Running',
      icon: 'Code2',
    },
    {
      id: 'realtime',
      title: 'Realtime Layer',
      count: 3,
      tools: 'WebSocket, Redis, Events',
      status: 'Active',
      icon: 'Zap',
    },
    {
      id: 'backend',
      title: 'Backend',
      count: 4,
      tools: 'NestJS, Node.js, PostgreSQL, Prisma',
      status: 'Running',
      icon: 'Server',
    },
  ],
  coreStack: [
    {
      id: 'nextjs',
      name: 'Next.js',
      role: 'Application framework',
      tag: 'App Router',
      badgeVariant: 'core',
      icon: 'Code2',
    },
    {
      id: 'nestjs',
      name: 'NestJS',
      role: 'Realtime API layer',
      tag: 'Core',
      badgeVariant: 'primary',
      icon: 'Server',
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      role: 'Relational data store',
      tag: 'Core',
      badgeVariant: 'connected',
      icon: 'Database',
    },
  ],
  runtimeServices: [
    {
      id: 'websocket',
      name: 'WebSocket Gateway',
      status: 'Active',
      icon: 'Zap',
    },
    { id: 'redis', name: 'Redis Pub/Sub', status: 'Connected', icon: 'Workflow' },
    { id: 'notifications', name: 'Notification Worker', status: 'Active', icon: 'Bell' },
  ],
  buildStatus: [
    {
      id: 'frontend-build',
      layer: 'Frontend Build',
      status: 'Passing',
      statusVariant: 'passing',
    },
    {
      id: 'api-build',
      layer: 'API and WebSocket Build',
      status: 'Passing',
      statusVariant: 'passing',
    },
    {
      id: 'database',
      layer: 'Database Migrations',
      status: 'Connected',
      statusVariant: 'connected',
    },
  ],
};

export const TASKFLOW_DASHBOARD_DEMO_DATA: WebProjectDemoData = {
  projectName: 'TaskFlow Dashboard',
  badgeText: 'LIVE DEMO',
  status: 'Online',
  executionConfig: [
    { label: 'Environment', value: 'Production' },
    { label: 'Region', value: 'EU West' },
  ],
  liveDemoUrl: 'https://taskflow-dashboard.vercel.app',
  heroImageUrl: taskflowLogo,
  runtimeHighlights: ['Realtime task updates', 'Collaborative workspaces', 'Sprint visibility'],
  systemOutput: ['TaskFlow API ready on port 3000', 'WebSocket gateway connected'],
  previewSession: {
    status: 'Running',
    url: 'https://taskflow-dashboard.vercel.app',
    device: 'Desktop',
    region: 'EU West',
  },
  launchArguments: ['npm start', 'NODE_ENV=production'],
};

export const TASKFLOW_DASHBOARD_REPOSITORY_DATA: WebProjectRepositoryData = {
  projectName: 'TaskFlow Dashboard',
  badgeText: 'GITHUB REPOSITORY',
  status: 'Online',
  repositoryPath: 'ahmedyacine2004 / taskflow-dashboard',
  description: 'Realtime project planning and collaboration workspace.',
  heroImageUrl: taskflowLogo,
  stats: [
    { id: 'stars', label: 'Stars', value: 521, icon: 'Star' },
    { id: 'forks', label: 'Forks', value: 156, icon: 'GitFork' },
    { id: 'commits', label: 'Commits', value: 678, icon: 'GitCommit' },
  ],
  activeTab: 'README',
  latestCommit: {
    title: 'feat: add real-time collaboration',
    authorName: 'Ahmed',
    message: 'Implemented WebSocket-based real-time updates',
  },
  branches: [{ name: 'main', isDefault: true }, { name: 'develop' }, { name: 'feature/websocket' }],
  moreBranchesCount: 3,
  ciStatuses: [
    { name: 'Build', status: 'Passing', variant: 'success' },
    { name: 'Tests', status: 'Passing', variant: 'success' },
  ],
  insights: {
    files: 312,
    commits: 678,
    contributors: 5,
    openIssues: 18,
    pullRequests: 8,
  },
  languages: [
    { name: 'TypeScript', percentage: 58, color: '#3178c6' },
    { name: 'CSS', percentage: 25, color: '#563d7c' },
    { name: 'JavaScript', percentage: 17, color: '#f1e05a' },
  ],
};
