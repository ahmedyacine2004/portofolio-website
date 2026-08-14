import placeholderImage from '@/assets/images/neobank-mobile-hero.png';
import type { StaticImageData } from 'next/image';

// --- UI / UX PROJECT DATA TYPES ---

export interface UIUXProjectMetaItem {
  label: string;
  value: string;
}

export interface UIUXProjectMetric {
  label: string;
  value: string;
  change?: string;
  description: string;
}

export interface DesignProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface UIUXKeyFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface UIUXProjectOverviewData {
  projectName: string;
  badgeText: string;
  status: string;
  category: string;
  tagline: string;
  description: string;
  heroImageUrl?: StaticImageData | string;
  metadata: UIUXProjectMetaItem[];
  metrics: UIUXProjectMetric[];
  problemStatement: string;
  solutionStatement: string;
  designProcess: DesignProcessStep[];
  keyFeatures: UIUXKeyFeature[];
  colorPalette: ColorSwatch[];
  tools: string[];
}

export interface UserFlow {
  id: string;
  title: string;
  persona: string;
  description: string;
  estimatedTime: string;
  avgCompletionRate: string;
  frictionPoint: string;
  steps: UserFlowStep[];
}

export interface UserFlowStep {
  id: string;
  stepNumber: string;
  screenName: string;
  userAction: string;
  systemResponse: string;
}

export interface UIUXUserFlowData {
  projectName: string;
  badgeText: string;
  category: string;
  description: string;
  totalFlowsCount: number;
  activeFlowId: string;
  userFlows: UserFlow[];
}

export interface WireframeScreen {
  id: string;
  title: string;
  fidelity: 'Low-Fidelity' | 'Mid-Fidelity' | 'High-Fidelity';
  deviceTarget: string;
  description: string;
  imageUrl?: string;
  layoutGrid: string;
  componentsUsed: string[];
}

export interface UIUXWireframesData {
  projectName: string;
  badgeText: string;
  category: string;
  description: string;
  activeScreenId: string;
  designSystemSpecs: {
    gridSystem: string;
    typographyScale: string;
    spacingUnit: string;
    touchTargetMin: string;
  };
  screens: WireframeScreen[];
}

export interface PrototypeScreen {
  id: string;
  name: string;
  type: string;
  description: string;
  hotspots: InteractiveHotspot[];
}

export interface InteractiveHotspot {
  id: string;
  label: string;
  actionType: string;
  targetScreenId: string;
}

export interface UIUXPrototypeData {
  projectName: string;
  badgeText: string;
  category: string;
  description: string;
  deviceFrame: string;
  defaultScreenId: string;
  figmaEmbedUrl?: string;
  screens: PrototypeScreen[];
}

// --- INSIGHT ANALYTICS OVERVIEW DATA ---

export const INSIGHT_ANALYTICS_OVERVIEW_DATA: UIUXProjectOverviewData = {
  projectName: 'Insight Analytics',
  badgeText: 'UI/UX DESIGN',
  status: 'Completed',
  category: 'Data Visualization / Dashboard Design',
  tagline: 'Advanced analytics dashboard for real-time business intelligence and insights.',
  description:
    'Design of a comprehensive analytics platform enabling teams to visualize complex data, track KPIs, and make data-driven decisions in real-time.',
  heroImageUrl: placeholderImage.src,
  metadata: [
    { label: 'Role', value: 'UX/UI Designer' },
    { label: 'Timeline', value: '4 Months' },
    { label: 'Platform', value: 'Web Dashboard' },
    { label: 'Team', value: '3 Designers, 6 Devs' },
  ],
  metrics: [
    {
      label: 'User Engagement',
      value: '+45%',
      change: '+45%',
      description: 'Increased time on platform post-redesign',
    },
    {
      label: 'Data Accuracy',
      value: '99.8%',
      change: '+8%',
      description: 'Improved data visualization accuracy',
    },
  ],
  problemStatement:
    'Existing analytics tools were too complex and difficult to navigate for average users',
  solutionStatement:
    'Designed an intuitive, visual-first dashboard with customizable widgets and real-time data updates',
  designProcess: [
    {
      step: '01',
      title: 'Research',
      description: 'Conducted user interviews and competitive analysis',
    },
    {
      step: '02',
      title: 'Wireframing',
      description: 'Created low-fidelity wireframes for dashboard layouts',
    },
    {
      step: '03',
      title: 'Prototyping',
      description: 'Built interactive prototypes with data visualizations',
    },
    { step: '04', title: 'Handoff', description: 'Delivered design system and component library' },
  ],
  keyFeatures: [
    {
      title: 'Real-time Data',
      description: 'Live updates and instant data refresh',
      icon: 'TrendingUp',
    },
    {
      title: 'Custom Dashboards',
      description: 'Drag-and-drop widget customization',
      icon: 'Layout',
    },
    { title: 'Data Export', description: 'Export reports in multiple formats', icon: 'Download' },
  ],
  colorPalette: [
    { name: 'Primary Blue', hex: '#0066CC' },
    { name: 'Success Green', hex: '#00AA00' },
    { name: 'Alert Red', hex: '#CC0000' },
  ],
  tools: ['Figma', 'FigJam', 'Adobe XD', 'Framer'],
};

export const INSIGHT_ANALYTICS_USER_FLOW_DATA: UIUXUserFlowData = {
  projectName: 'Insight Analytics',
  badgeText: 'USER FLOWS',
  category: 'Analytics Dashboard',
  description: 'Key user journeys through the analytics platform',
  totalFlowsCount: 4,
  activeFlowId: 'flow-1',
  userFlows: [
    {
      id: 'flow-1',
      title: 'Login & Dashboard Access',
      persona: 'Product Manager',
      description: 'User logs in and accesses their custom dashboard',
      estimatedTime: '2 minutes',
      avgCompletionRate: '94%',
      frictionPoint: 'Remembering complex passwords',
      steps: [
        {
          id: 's1',
          stepNumber: '1',
          screenName: 'Login',
          userAction: 'Enter credentials',
          systemResponse: 'Authenticate user',
        },
      ],
    },
  ],
};

export const INSIGHT_ANALYTICS_WIREFRAMES_DATA: UIUXWireframesData = {
  projectName: 'Insight Analytics',
  badgeText: 'WIREFRAMES',
  category: 'Dashboard Wireframes',
  description: 'Dashboard and analytics screen wireframes',
  activeScreenId: 'screen-1',
  designSystemSpecs: {
    gridSystem: '12-column',
    typographyScale: '8px base',
    spacingUnit: '8px',
    touchTargetMin: '48px',
  },
  screens: [
    {
      id: 'screen-1',
      title: 'Dashboard Home',
      fidelity: 'High-Fidelity',
      deviceTarget: 'Desktop (1920px)',
      description: 'Main analytics dashboard with KPI cards and charts',
      layoutGrid: '12 columns',
      componentsUsed: ['Header', 'Sidebar', 'KPI Cards', 'Charts', 'Tables'],
    },
  ],
};

export const INSIGHT_ANALYTICS_PROTOTYPE_DATA: UIUXPrototypeData = {
  projectName: 'Insight Analytics',
  badgeText: 'PROTOTYPE',
  category: 'Interactive Dashboard',
  description: 'Fully interactive dashboard prototype with data visualization',
  deviceFrame: 'Desktop (1920x1080)',
  defaultScreenId: 'proto-1',
  figmaEmbedUrl: 'https://www.figma.com/embed?...',
  screens: [
    {
      id: 'proto-1',
      name: 'Dashboard',
      type: 'Dashboard',
      description: 'Main dashboard view with interactive charts',
      hotspots: [
        { id: 'h1', label: 'Date Range Selector', actionType: 'Click', targetScreenId: 'proto-2' },
      ],
    },
  ],
};
