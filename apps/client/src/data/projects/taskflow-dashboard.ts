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

// --- TASKFLOW DASHBOARD DATA ---

export const TASKFLOW_DASHBOARD_DETAILS: WebProjectDetails = {
  projectName: 'TaskFlow Dashboard',
  tagline: 'Real-time project management dashboard with team collaboration features.',
  liveDemoUrl: 'https://taskflow-dashboard.example.com',
  repositoryUrl: 'https://github.com/username/taskflow-dashboard',
  imageUrl: placeholderImage.src,
  coreObjective: 'Streamline team project management with real-time collaboration',
  targetAudience: ['Teams', 'Project Managers', 'Organizations'],
  currentPhase: ['MVP Launch', 'Real-time Sync', 'UI Complete'],
  systemModules: [
    {
      id: 'tasks',
      title: 'Task Management',
      description: 'Create, assign, and track tasks in real-time',
      status: 'Stable',
      icon: 'CheckSquare',
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      description: 'Real-time updates and team communication',
      status: 'Stable',
      icon: 'Users',
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Project metrics and team performance insights',
      status: 'In Development',
      icon: 'LineChart',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Real-time alerts for task updates',
      status: 'Stable',
      icon: 'Bell',
    },
  ],
  architectureSnapshot: [
    { title: 'Frontend', subtitle: 'React / TypeScript', icon: 'Smartphone' },
    { title: 'Real-time', subtitle: 'WebSocket', icon: 'GitFork' },
    { title: 'Backend', subtitle: 'Node.js', icon: 'Cpu' },
    { title: 'Database', subtitle: 'PostgreSQL', icon: 'Database' },
  ],
  engineeringHighlights: [
    'Real-time Sync',
    'Collaborative Editing',
    'Performance Optimized',
    'Scalable Backend',
    'Mobile Ready',
  ],
};

export const TASKFLOW_DASHBOARD_GALLERY_DATA: WebProjectGalleryData = {
  projectName: 'TaskFlow Dashboard',
  tagline: 'Explore the dashboard interface and project management screens.',
  liveDemoUrl: 'https://taskflow-dashboard.example.com',
  items: [
    {
      id: 'screen-1',
      title: 'Dashboard Overview',
      imageUrl: placeholderImage.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '2 days ago',
      fileType: 'PNG Image',
    },
  ],
};

export const TASKFLOW_DASHBOARD_TECH_STACK_DATA: WebProjectTechStackData = {
  projectName: 'TaskFlow Dashboard',
  subtitle: 'Collaborative Project Management',
  description: 'Real-time collaboration with modern tech stack',
  totalTechnologiesCount: 18,
  environmentStatus: [
    {
      id: 'frontend',
      title: 'Frontend',
      count: 6,
      tools: 'React, Redux, WebSocket, Tailwind',
      status: 'Running',
      icon: 'Monitor',
    },
  ],
  coreStack: [
    {
      id: 'react',
      name: 'React',
      role: 'UI Library',
      tag: 'v18',
      badgeVariant: 'core',
      icon: 'Package',
    },
  ],
  runtimeServices: [
    {
      id: 'websocket',
      name: 'WebSocket Server',
      status: 'Active',
      icon: 'Zap',
    },
  ],
  buildStatus: [
    {
      id: 'build-1',
      layer: 'Application Build',
      status: 'Passing',
      statusVariant: 'passing',
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
  liveDemoUrl: 'https://taskflow-dashboard.example.com',
  runtimeHighlights: ['Real-time Updates', 'Collaborative Features', 'High Performance'],
  systemOutput: ['Server running on port 3000', 'WebSocket connected'],
  previewSession: {
    status: 'Running',
    url: 'https://taskflow-dashboard.example.com',
    device: 'Desktop',
    region: 'EU West',
  },
  launchArguments: ['npm start', 'NODE_ENV=production'],
};

export const TASKFLOW_DASHBOARD_REPOSITORY_DATA: WebProjectRepositoryData = {
  projectName: 'TaskFlow Dashboard',
  badgeText: 'GITHUB REPOSITORY',
  status: 'Online',
  repositoryPath: 'username/taskflow-dashboard',
  description: 'Real-time project management dashboard',
  stats: [
    { id: 'stars', label: 'Stars', value: 521, icon: 'Star' },
    { id: 'forks', label: 'Forks', value: 156, icon: 'GitFork' },
    { id: 'commits', label: 'Commits', value: 678, icon: 'GitCommit' },
  ],
  activeTab: 'Code',
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
