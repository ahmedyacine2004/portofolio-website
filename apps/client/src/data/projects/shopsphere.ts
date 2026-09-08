import type { GalleryItem } from '@/components/3d/Carousel3D';
import { StaticImageData } from 'next/image';

import shopsphereCoffee from '@/assets/images/shopsphere/product-coffee.jpg';
import shopsphereShoe from '@/assets/images/shopsphere/product-shoe.jpg';
import shopsphereWatch from '@/assets/images/shopsphere/product-watch.jpg';
import shopsphereMark from '@/assets/images/shopsphere/shopsphere-mark.png';
import shopsphereStorefront from '@/assets/images/shopsphere/storefront.jpg';

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
  liveDemoUrl: 'https://shopsphere-store.vercel.app',
  repositoryUrl: 'https://github.com/ahmedyacine2004/shopsphere',
  imageUrl: shopsphereMark.src,
  coreObjective:
    'Make product discovery, checkout, and fulfillment feel effortless for growing retailers.',
  targetAudience: ['Online Shoppers', 'Independent Retailers', 'DTC Brands'],
  currentPhase: ['Private Beta', 'Catalog and Checkout', 'Payments Hardening'],
  systemModules: [
    {
      id: 'products',
      title: 'Product Catalog',
      description: 'Structured catalog with variants, collections, inventory, and faceted filters.',
      status: 'Stable',
      icon: 'Package',
    },
    {
      id: 'cart',
      title: 'Shopping Cart',
      description: 'Persistent cart that survives sessions and stays synchronized across devices.',
      status: 'Stable',
      icon: 'ShoppingCart',
    },
    {
      id: 'payments',
      title: 'Payment Processing',
      description: 'Checkout orchestration with payment intents, refunds, and order confirmation.',
      status: 'In Development',
      icon: 'CreditCard',
    },
    {
      id: 'recommendations',
      title: 'AI Recommendations',
      description: 'Contextual recommendations based on browsing and purchase signals.',
      status: 'In Development',
      icon: 'Sparkles',
    },
  ],
  architectureSnapshot: [
    { title: 'Frontend', subtitle: 'Next.js / React', icon: 'Smartphone' },
    { title: 'Commerce API', subtitle: 'NestJS / Node.js', icon: 'Cpu' },
    { title: 'Database', subtitle: 'PostgreSQL / Redis', icon: 'Database' },
    { title: 'Search', subtitle: 'OpenSearch', icon: 'Search' },
  ],
  engineeringHighlights: [
    'Faceted Product Search',
    'Personalized Recommendations',
    'Payment Intent Flow',
    'Inventory Reservations',
    'Mobile-first Checkout',
  ],
};

export const SHOPSPHERE_GALLERY_DATA: WebProjectGalleryData = {
  projectName: 'ShopSphere',
  tagline: 'Explore the storefront, product detail, and checkout experience behind ShopSphere.',
  liveDemoUrl: 'https://shopsphere-store.vercel.app',
  heroGraphicUrl: shopsphereMark.src,
  items: [
    {
      id: 'screen-1',
      title: 'Storefront and Product Discovery',
      imageUrl: shopsphereStorefront.src,
      resolution: '1920 × 1080',
      device: 'Desktop Browser',
      lastUpdated: '3 days ago',
      fileType: 'PNG Image',
    },
    {
      id: 'screen-2',
      title: 'Product Detail and Variants',
      imageUrl: shopsphereWatch.src,
      resolution: '1440 × 900',
      device: 'Desktop Browser',
      lastUpdated: '2 days ago',
      fileType: 'JPG Image',
    },
    {
      id: 'screen-3',
      title: 'Cart and Checkout Flow',
      imageUrl: shopsphereShoe.src,
      resolution: '1440 × 900',
      device: 'Desktop Browser',
      lastUpdated: '3 days ago',
      fileType: 'JPG Image',
    },
    {
      id: 'screen-4',
      title: 'Order Confirmation and Recommendations',
      imageUrl: shopsphereCoffee.src,
      resolution: '1440 × 900',
      device: 'Desktop Browser',
      lastUpdated: '3 days ago',
      fileType: 'JPG Image',
    },
  ],
};

export const SHOPSPHERE_TECH_STACK_DATA: WebProjectTechStackData = {
  projectName: 'ShopSphere',
  subtitle: 'Commerce and Checkout Platform',
  description:
    'A commerce foundation for catalog management, discovery, checkout, and fulfillment.',
  totalTechnologiesCount: 19,
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
      id: 'commerce-api',
      title: 'Commerce API',
      count: 5,
      tools: 'NestJS, Node.js, REST, Prisma',
      status: 'Running',
      icon: 'Server',
    },
    {
      id: 'data-search',
      title: 'Data and Search',
      count: 4,
      tools: 'PostgreSQL, Redis, OpenSearch',
      status: 'Synced',
      icon: 'Database',
    },
    {
      id: 'payments',
      title: 'Payments',
      count: 2,
      tools: 'Stripe, Webhooks',
      status: 'Active',
      icon: 'Zap',
    },
  ],
  coreStack: [
    {
      id: 'nextjs',
      name: 'Next.js',
      role: 'Storefront framework',
      tag: 'App Router',
      badgeVariant: 'primary',
      icon: 'Code2',
    },
    {
      id: 'nestjs',
      name: 'NestJS',
      role: 'Commerce API',
      tag: 'Core',
      badgeVariant: 'core',
      icon: 'Server',
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      role: 'Order and catalog data',
      tag: 'Core',
      badgeVariant: 'connected',
      icon: 'Database',
    },
    {
      id: 'stripe',
      name: 'Stripe',
      role: 'Payment processing',
      tag: 'Connected',
      badgeVariant: 'connected',
      icon: 'CreditCard',
    },
  ],
  runtimeServices: [
    {
      id: 'search',
      name: 'OpenSearch',
      status: 'Active',
      icon: 'Search',
    },
    { id: 'redis', name: 'Redis Cache', status: 'Connected', icon: 'Zap' },
    { id: 'webhooks', name: 'Payment Webhooks', status: 'Active', icon: 'Workflow' },
  ],
  buildStatus: [
    {
      id: 'storefront-build',
      layer: 'Storefront Build',
      status: 'Passing',
      statusVariant: 'passing',
    },
    { id: 'api-build', layer: 'Commerce API', status: 'Passing', statusVariant: 'passing' },
    {
      id: 'payment-connection',
      layer: 'Payment Connection',
      status: 'Connected',
      statusVariant: 'connected',
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
  heroImageUrl: shopsphereMark,
  liveDemoUrl: 'https://shopsphere-store.vercel.app',
  runtimeHighlights: [
    'Fast checkout flow',
    'Faceted product search',
    'Personalized recommendations',
  ],
  systemOutput: [
    'ShopSphere API ready on port 3000',
    'Catalog index synchronized',
    'Payment webhooks listening',
  ],
  previewSession: {
    status: 'Running',
    url: 'https://shopsphere-store.vercel.app',
    device: 'Desktop',
    region: 'Multi-Region',
  },
  launchArguments: ['npm run dev', 'NODE_ENV=production'],
};

export const SHOPSPHERE_REPOSITORY_DATA: WebProjectRepositoryData = {
  projectName: 'ShopSphere',
  badgeText: 'GITHUB REPOSITORY',
  status: 'Online',
  repositoryPath: 'ahmedyacine2004 / shopsphere',
  description: 'Commerce storefront and checkout platform with search and recommendations.',
  stats: [
    { id: 'stars', label: 'Stars', value: 687, icon: 'Star' },
    { id: 'forks', label: 'Forks', value: 234, icon: 'GitFork' },
    { id: 'commits', label: 'Commits', value: 892, icon: 'GitCommit' },
  ],
  activeTab: 'README',
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
