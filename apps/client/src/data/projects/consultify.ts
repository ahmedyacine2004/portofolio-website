import type { GalleryItem } from '@/components/3d/Carousel3D';

// Import local images from src/assets/images
// Adjust filenames and extensions (.png, .jpg, .webp, etc.) to match your exact assets
import consultifyImage from '@/assets/images/consultify.png';
import heroGraphicImage from '@/assets/images/consultify.png';
import consultifyHeroImg from '@/assets/images/consultify.png';
import screen1 from '@/assets/images/carousel/screen-1.png';
import screen2 from '@/assets/images/carousel/screen-2.png';
import screen3 from '@/assets/images/carousel/screen-3.png';
import screen4 from '@/assets/images/carousel/screen-4.png';
import screen5 from '@/assets/images/carousel/screen-5.png';
import screen6 from '@/assets/images/carousel/screen-6.png';
import { StaticImageData } from 'next/image';
import ahmedAvatarImg from '@/assets/images/avatar.jpg';

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

export interface WebProjectGalleryData {
  projectName: string;
  tagline: string;
  liveDemoUrl?: string;
  screensUrl?: string;
  heroGraphicUrl?: string;
  items: GalleryItem[];
}

// --- TECH STACK DATA TYPES ---

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

// --- DEMO / RUN PROJECT DATA TYPES ---

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

// --- REPOSITORY DATA TYPES ---

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

export const CONSULTIFY_DETAILS: WebProjectDetails = {
  projectName: 'CONSULTIFY',
  tagline: 'AI-powered consultation ecosystem connecting users with certified experts.',
  liveDemoUrl: 'https://demo.consultify.com',
  repositoryUrl: 'https://github.com/username/consultify',
  imageUrl: consultifyImage.src,
  coreObjective: 'Make expert knowledge universally accessible',
  targetAudience: ['Students', 'Professionals', 'Businesses'],
  currentPhase: ['MVP Development', 'Architecture Completed', 'UI System Ready'],
  systemModules: [
    {
      id: 'auth',
      title: 'Authentication',
      description: 'Secure user authentication with OAuth & JWT',
      status: 'Stable',
      icon: 'Shield',
    },
    {
      id: 'booking',
      title: 'Consultation Booking',
      description: 'Smart scheduling and calendar management',
      status: 'Stable',
      icon: 'Calendar',
    },
    {
      id: 'ai-assistant',
      title: 'AI Assistant',
      description: 'AI-powered recommendations and insights',
      status: 'In Development',
      icon: 'Zap',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Real-time alerts and communication system',
      status: 'Stable',
      icon: 'Bell',
    },
    {
      id: 'admin',
      title: 'Administration',
      description: 'Platform management and analytics dashboard',
      status: 'Stable',
      icon: 'Settings',
    },
  ],
  architectureSnapshot: [
    {
      title: 'Client',
      subtitle: 'Web / Mobile',
      icon: 'Smartphone',
    },
    {
      title: 'API Gateway',
      subtitle: 'Nginx / Express',
      icon: 'Cpu',
    },
    {
      title: 'Services',
      subtitle: 'Microservices',
      icon: 'GitFork',
    },
    {
      title: 'Database',
      subtitle: 'MongoDB',
      icon: 'Database',
    },
    {
      title: 'Storage',
      subtitle: 'Cloud Storage',
      icon: 'Cloud',
    },
  ],
  engineeringHighlights: [
    'Modular Architecture',
    'Multi-language Support',
    'AI-first Workflow',
    'Scalable Backend',
    'Docker Ready',
    'Responsive Design System',
  ],
};

export const CONSULTIFY_GALLERY_DATA: WebProjectGalleryData = {
  projectName: 'CONSULTIFY',
  tagline:
    'Explore product screenshots and UI previews showcasing the end-to-end consulting workflow experience.',
  liveDemoUrl: 'https://consultify.example.com',
  screensUrl: 'https://figma.com/@consultify-screens',
  heroGraphicUrl: heroGraphicImage.src,
  items: [
    {
      id: 'screen-1',
      title: 'Landing Page & Hero Section',
      imageUrl: screen1.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '2 days ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-2',
      title: 'Expert Discovery & Filtering',
      imageUrl: screen2.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '3 days ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-3',
      title: 'Consultant Booking Modal',
      imageUrl: screen3.src,
      resolution: '1440 × 900',
      device: 'MacBook Pro',
      lastUpdated: '5 days ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-4',
      title: 'Live Video Consultation Workspace',
      imageUrl: screen4.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '1 week ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-5',
      title: 'Analytics & Revenue Dashboard',
      imageUrl: screen5.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '2 weeks ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-6',
      title: 'Client Review & Feedback Portal',
      imageUrl: screen6.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '2 weeks ago',
      fileType: 'PNG Image',
    },
  ],
};

// --- CONSULTIFY TECH STACK DATA ---

export const CONSULTIFY_TECH_STACK_DATA: WebProjectTechStackData = {
  projectName: 'CONSULTIFY',
  subtitle: 'Workspace environment',
  description: 'Interactive runtime of the technologies powering the project.',
  totalTechnologiesCount: 32,
  environmentStatus: [
    {
      id: 'frontend-env',
      title: 'Frontend',
      count: 6,
      tools: 'React . TypeScript . Next.js',
      status: 'Running',
      icon: 'Code2',
    },
    {
      id: 'data-env',
      title: 'Data Layer',
      count: 3,
      tools: 'MongoDB . PostgreSQL . Redis',
      status: 'Running',
      icon: 'Database',
    },
    {
      id: 'backend-env',
      title: 'Backend',
      count: 4,
      tools: 'NestJS . Node.js . APIs',
      status: 'Running',
      icon: 'Server',
    },
    {
      id: 'ui-env',
      title: 'UI/UX',
      count: 4,
      tools: 'Figma . Illustrator . Photoshop',
      status: 'Synced',
      icon: 'Palette',
    },
  ],
  coreStack: [
    {
      id: 'react',
      name: 'React',
      role: 'Frontend Framework',
      tag: 'Primary',
      badgeVariant: 'primary',
      icon: 'Code2',
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      role: 'Type Safety',
      tag: 'Core',
      badgeVariant: 'core',
      icon: 'ShieldCheck',
    },
    {
      id: 'nestjs',
      name: 'NestJS',
      role: 'Backend Framework',
      tag: 'Core',
      badgeVariant: 'core',
      icon: 'Server',
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      role: 'Primary Database',
      tag: 'Connected',
      badgeVariant: 'connected',
      icon: 'Database',
    },
  ],
  runtimeServices: [
    {
      id: 'openai',
      name: 'OpenAI API',
      status: 'Available',
      icon: 'Sparkles',
    },
    {
      id: 'cloudinary',
      name: 'Cloudinary',
      status: 'Connected',
      icon: 'Cloud',
    },
    {
      id: 'stripe',
      name: 'Stripe',
      status: 'Connected',
      icon: 'Zap',
    },
    {
      id: 'resend',
      name: 'Resend Email',
      status: 'Connected',
      icon: 'Workflow',
    },
  ],
  buildStatus: [
    {
      id: 'build-fe',
      layer: 'Frontend Layer',
      status: 'Passing',
      statusVariant: 'passing',
    },
    {
      id: 'build-be',
      layer: 'Backend Layer',
      status: 'Passing',
      statusVariant: 'passing',
    },
    {
      id: 'build-db',
      layer: 'Database Layer',
      status: 'Connected',
      statusVariant: 'connected',
    },
    {
      id: 'build-deploy',
      layer: 'Deployment',
      status: 'Production',
      statusVariant: 'production',
    },
  ],
};

// --- CONSULTIFY DEMO DATA ---

export const CONSULTIFY_DEMO_DATA: WebProjectDemoData = {
  projectName: 'CONSULTIFY',
  badgeText: 'RUN PROJECT',
  status: 'Online',
  heroImageUrl: consultifyHeroImg,
  executionConfig: [
    { label: 'Project', value: 'CONSULTIFY' },
    { label: 'Environment', value: 'Production' },
    { label: 'Build', value: 'v1.0.0' },
    { label: 'Runtime', value: 'Ready' },
  ],
  liveDemoUrl: 'https://consultify.app',
  runtimeHighlights: [
    'Modular Architecture',
    'Multi-language Support',
    'AI-first Workflow',
    'Scalable Backend',
  ],
  systemOutput: [
    '################################',
    'ALL SYSTEMS GO.',
    'YOU CAN ENJOY CONSULTIFY RIGHT NOW',
    'EXPAND YOUR KNOWLEDGE.',
    '################################',
  ],
  previewSession: {
    status: 'Running',
    url: 'https://consultify.app',
    device: 'Desktop',
    region: 'Algeria, Tebessa, Tebessa',
  },
  launchArguments: [
    '-- mode=production',
    '-- device=desktop',
    '-- network=online',
    '-- performance=optimized',
  ],
};

// --- CONSULTIFY REPOSITORY DATA ---

export const CONSULTIFY_REPOSITORY_DATA: WebProjectRepositoryData = {
  projectName: 'CONSULTIFY',
  badgeText: 'GITHUB REPOSITORY',
  status: 'Online',
  repositoryPath: 'AhmedYassineAbbane / CONSULTIFY',
  description: 'AI-powered consultation platform connecting users with certified experts.',
  heroImageUrl: consultifyHeroImg,
  stats: [
    { id: 'stars', label: 'Stars', value: 128, icon: 'Star' },
    { id: 'forks', label: 'Forks', value: 34, icon: 'GitFork' },
    { id: 'watching', label: 'Watching', value: 18, icon: 'Eye' },
    { id: 'releases', label: 'Releases', value: 14, icon: 'Tag' },
  ],
  activeTab: 'README',
  latestCommit: {
    title: 'feat(ai): Integrate multilingual recommendation engine',
    authorName: 'Ahmed Yassine Abbane',
    authorAvatar: ahmedAvatarImg,
    message:
      'Implemented an AI-powered recommendation engine with multilingual support. Added language detection, recommendation scoring, prompt optimization, and localization middleware for English, French, and Arabic.',
  },
  branches: [
    { name: 'main', isDefault: true },
    { name: 'development' },
    { name: 'feature/ai' },
    { name: 'feature/dashboard' },
  ],
  moreBranchesCount: 12,
  ciStatuses: [
    { name: 'Build', status: 'Passing', variant: 'success' },
    { name: 'Tests', status: 'Passing', variant: 'success' },
    { name: 'Lint', status: 'Passing', variant: 'success' },
    { name: 'Deployments', status: 'Production', variant: 'primary' },
  ],
  insights: {
    files: 186,
    commits: 421,
    contributors: 5,
    openIssues: 3,
    pullRequests: 8,
  },
  languages: [
    { name: 'TypeScript', percentage: 68, color: '#8b5cf6' },
    { name: 'CSS', percentage: 17, color: '#3b82f6' },
    { name: 'JavaScript', percentage: 9, color: '#eab308' },
    { name: 'HTML', percentage: 4, color: '#f97316' },
    { name: 'Other', percentage: 2, color: '#6b7280' },
  ],
};
