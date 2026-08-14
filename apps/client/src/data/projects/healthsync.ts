import placeholderImage from '@/assets/images/neobank-mobile-hero.png';

// Import types from insight-analytics to avoid duplication
export type {
  ColorSwatch,
  DesignProcessStep,
  InteractiveHotspot,
  PrototypeScreen,
  UIUXKeyFeature,
  UIUXProjectMetaItem,
  UIUXProjectMetric,
  UIUXProjectOverviewData,
  UIUXPrototypeData,
  UIUXUserFlowData,
  UIUXWireframesData,
  UserFlow,
  UserFlowStep,
  WireframeScreen,
} from './insight-analytics';

import type {
  UIUXProjectOverviewData,
  UIUXPrototypeData,
  UIUXUserFlowData,
  UIUXWireframesData,
} from './insight-analytics';

// --- HEALTHSYNC OVERVIEW DATA ---

export const HEALTHSYNC_OVERVIEW_DATA: UIUXProjectOverviewData = {
  projectName: 'HealthSync',
  badgeText: 'UI/UX DESIGN',
  status: 'Completed',
  category: 'Healthcare / Wellness App Design',
  tagline: 'Comprehensive health and wellness tracking application for personal wellbeing.',
  description:
    'Full product design for a health tracking platform that integrates fitness, nutrition, sleep, and mental wellness data in one unified dashboard.',
  heroImageUrl: placeholderImage.src,
  metadata: [
    { label: 'Role', value: 'Lead Product Designer' },
    { label: 'Timeline', value: '5 Months' },
    { label: 'Platform', value: 'iOS, Android, Web' },
    { label: 'Team', value: '4 Designers, 8 Devs, 2 PMs' },
  ],
  metrics: [
    {
      label: 'Daily Active Users',
      value: '125K+',
      change: '+89%',
      description: 'Significant user growth after launch',
    },
    {
      label: 'User Satisfaction',
      value: '4.7 / 5',
      change: '+0.6',
      description: 'High satisfaction with onboarding and features',
    },
  ],
  problemStatement: 'Users struggled to track multiple health metrics across different apps',
  solutionStatement:
    'Created an integrated platform centralizing all health data with personalized insights and recommendations',
  designProcess: [
    { step: '01', title: 'Discovery', description: 'Health and wellness user research' },
    { step: '02', title: 'Design', description: 'Created intuitive tracking interfaces' },
    {
      step: '03',
      title: 'Testing',
      description: 'Conducted usability testing with health professionals',
    },
    { step: '04', title: 'Launch', description: 'Soft and full launch strategy' },
  ],
  keyFeatures: [
    {
      title: 'Health Tracking',
      description: 'Track fitness, nutrition, sleep, and mood',
      icon: 'Heart',
    },
    {
      title: 'Insights & Analytics',
      description: 'Personalized health insights and trends',
      icon: 'TrendingUp',
    },
    {
      title: 'Social Features',
      description: 'Challenge friends and share achievements',
      icon: 'Users',
    },
  ],
  colorPalette: [
    { name: 'Health Green', hex: '#10B981' },
    { name: 'Wellness Blue', hex: '#3B82F6' },
    { name: 'Energy Orange', hex: '#F59E0B' },
  ],
  tools: ['Figma', 'Framer', 'Adobe XD', 'Miro'],
};

export const HEALTHSYNC_USER_FLOW_DATA: UIUXUserFlowData = {
  projectName: 'HealthSync',
  badgeText: 'USER FLOWS',
  category: 'Health Tracking Flows',
  description: 'User flows for health tracking and wellness management',
  totalFlowsCount: 5,
  activeFlowId: 'flow-1',
  userFlows: [
    {
      id: 'flow-1',
      title: 'Setup & Onboarding',
      persona: 'New User',
      description: 'Initial setup and health profile creation',
      estimatedTime: '3 minutes',
      avgCompletionRate: '91%',
      frictionPoint: 'Multiple setup steps',
      steps: [
        {
          id: 's1',
          stepNumber: '1',
          screenName: 'Welcome',
          userAction: 'Start onboarding',
          systemResponse: 'Show setup flow',
        },
      ],
    },
  ],
};

export const HEALTHSYNC_WIREFRAMES_DATA: UIUXWireframesData = {
  projectName: 'HealthSync',
  badgeText: 'WIREFRAMES',
  category: 'Health App Wireframes',
  description: 'Wireframes for health tracking and wellness screens',
  activeScreenId: 'screen-1',
  designSystemSpecs: {
    gridSystem: '8-column (mobile) / 12-column (desktop)',
    typographyScale: '4px base',
    spacingUnit: '4px',
    touchTargetMin: '44px',
  },
  screens: [
    {
      id: 'screen-1',
      title: 'Dashboard',
      fidelity: 'High-Fidelity',
      deviceTarget: 'Mobile (375px)',
      description: 'Main health dashboard with daily tracking',
      layoutGrid: '8 columns',
      componentsUsed: ['Header', 'Health Cards', 'Activity Graph', 'Recommendations'],
    },
  ],
};

export const HEALTHSYNC_PROTOTYPE_DATA: UIUXPrototypeData = {
  projectName: 'HealthSync',
  badgeText: 'PROTOTYPE',
  category: 'Interactive Health App',
  description: 'Fully interactive health tracking prototype',
  deviceFrame: 'iPhone 14 Pro',
  defaultScreenId: 'proto-1',
  figmaEmbedUrl: 'https://www.figma.com/embed?...',
  screens: [
    {
      id: 'proto-1',
      name: 'Home',
      type: 'Dashboard',
      description: 'Main health dashboard',
      hotspots: [
        { id: 'h1', label: 'Track Workout', actionType: 'Tap', targetScreenId: 'proto-2' },
      ],
    },
  ],
};
