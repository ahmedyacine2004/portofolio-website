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

// --- SHOPSPHERE DATA ---

export const SHOPSPHERE_DETAILS: WebProjectDetails = {
  projectName: 'ShopSphere',
  tagline: 'E-commerce platform with advanced product discovery and AI-powered recommendations.',
  liveDemoUrl: 'https://shopsphere.example.com',
  repositoryUrl: 'https://github.com/username/shopsphere',
  imageUrl: placeholderImage.src,
  coreObjective: 'Build a scalable e-commerce platform with personalized shopping experience',
  targetAudience: ['Shoppers', 'Retailers', 'E-commerce Businesses'],
  currentPhase: ['In Development', 'MVP Features', 'Payment Integration'],
  systemModules: [
    {
      id: 'products',
      title: 'Product Catalog',
      description: 'Scalable product database with advanced filtering',
      status: 'Stable',
      icon: 'Package',
    },
    {
      id: 'cart',
      title: 'Shopping Cart',
      description: 'Persistent cart with real-time synchronization',
      status: 'Stable',
      icon: 'ShoppingCart',
    },
    {
      id: 'payments',
      title: 'Payment Processing',
      description: 'Secure payment gateway integration',
      status: 'In Development',
      icon: 'CreditCard',
    },
    {
      id: 'recommendations',
      title: 'AI Recommendations',
      description: 'Personalized product suggestions',
      status: 'In Development',
      icon: 'Sparkles',
    },
  ],
  architectureSnapshot: [
    { title: 'Frontend', subtitle: 'Next.js / React', icon: 'Smartphone' },
    { title: 'Backend', subtitle: 'Node.js / Express', icon: 'Cpu' },
    { title: 'Database', subtitle: 'MongoDB', icon: 'Database' },
    { title: 'Search', subtitle: 'Elasticsearch', icon: 'Search' },
  ],
  engineeringHighlights: [
    'Advanced Search',
    'AI Recommendations',
    'Payment Secure',
    'Inventory Management',
    'Mobile Optimized',
  ],
};

export const SHOPSPHERE_GALLERY_DATA: WebProjectGalleryData = {
  projectName: 'ShopSphere',
  tagline: 'Explore the e-commerce platform interface and shopping experience.',
  liveDemoUrl: 'https://shopsphere.example.com',
  items: [
    {
      id: 'screen-1',
      title: 'Homepage & Product Discovery',
      imageUrl: placeholderImage.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '3 days ago',
      fileType: 'PNG Image',
    },
  ],
};

export const SHOPSPHERE_TECH_STACK_DATA: WebProjectTechStackData = {
  projectName: 'ShopSphere',
  subtitle: 'E-Commerce Platform',
  description: 'Full-featured e-commerce solution with modern architecture',
  totalTechnologiesCount: 20,
  environmentStatus: [
    {
      id: 'frontend',
      title: 'Frontend',
      count: 7,
      tools: 'Next.js, React, Redux, Tailwind',
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

export const SHOPSPHERE_DEMO_DATA: WebProjectDemoData = {
  projectName: 'ShopSphere',
  badgeText: 'LIVE DEMO',
  status: 'Online',
  executionConfig: [
    { label: 'Environment', value: 'Production' },
    { label: 'Region', value: 'Multi-Region' },
  ],
  liveDemoUrl: 'https://shopsphere.example.com',
  runtimeHighlights: ['Fast Checkout', 'Product Search', 'AI Recommendations'],
  systemOutput: ['Server running on port 3000', 'Database connected', 'Search indexed'],
  previewSession: {
    status: 'Running',
    url: 'https://shopsphere.example.com',
    device: 'Desktop',
    region: 'Multi-Region',
  },
  launchArguments: ['npm run dev', 'NODE_ENV=production'],
};

export const SHOPSPHERE_REPOSITORY_DATA: WebProjectRepositoryData = {
  projectName: 'ShopSphere',
  badgeText: 'GITHUB REPOSITORY',
  status: 'Online',
  repositoryPath: 'username/shopsphere',
  description: 'E-commerce platform with AI-powered features',
  stats: [
    { id: 'stars', label: 'Stars', value: 687, icon: 'Star' },
    { id: 'forks', label: 'Forks', value: 234, icon: 'GitFork' },
    { id: 'commits', label: 'Commits', value: 892, icon: 'GitCommit' },
  ],
  activeTab: 'Code',
  latestCommit: {
    title: 'feat: add AI product recommendations',
    authorName: 'Ahmed',
    message: 'Integrated machine learning model for personalized recommendations',
  },
  branches: [
    { name: 'main', isDefault: true },
    { name: 'develop' },
    { name: 'feature/ai-recommendations' },
  ],
  moreBranchesCount: 4,
  ciStatuses: [
    { name: 'Build', status: 'Passing', variant: 'success' },
    { name: 'Tests', status: 'Passing', variant: 'success' },
  ],
  insights: {
    files: 456,
    commits: 892,
    contributors: 8,
    openIssues: 25,
    pullRequests: 12,
  },
  languages: [
    { name: 'TypeScript', percentage: 62, color: '#3178c6' },
    { name: 'CSS', percentage: 22, color: '#563d7c' },
    { name: 'JavaScript', percentage: 16, color: '#f1e05a' },
  ],
};
