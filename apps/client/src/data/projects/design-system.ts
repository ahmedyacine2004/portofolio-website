import placeholderImage from '@/assets/images/neobank-mobile-hero.png';

import type {
  UIUXProjectOverviewData,
  UIUXPrototypeData,
  UIUXUserFlowData,
  UIUXWireframesData,
} from './insight-analytics';

// --- DESIGN SYSTEM OVERVIEW DATA ---

export const DESIGN_SYSTEM_OVERVIEW_DATA: UIUXProjectOverviewData = {
  projectName: 'Design System',
  badgeText: 'UI/UX DESIGN',
  status: 'Completed',
  category: 'Design System / Component Library',
  tagline:
    'Comprehensive design system and reusable component library for enterprise applications.',
  description:
    'Built a scalable design system featuring a complete component library, design tokens, and documentation for consistent user experiences across multiple products.',
  heroImageUrl: placeholderImage.src,
  metadata: [
    { label: 'Role', value: 'Design System Lead' },
    { label: 'Timeline', value: '8 Months' },
    { label: 'Platform', value: 'Web Applications' },
    { label: 'Team', value: '4 Designers, 3 Design Engineers' },
  ],
  metrics: [
    {
      label: 'Design Consistency',
      value: '98%',
      change: '+42%',
      description: 'Design consistency across all products',
    },
    {
      label: 'Development Speed',
      value: '+65%',
      change: '+65%',
      description: 'Faster development with reusable components',
    },
  ],
  problemStatement:
    'Multiple products had inconsistent design patterns and duplicated component code',
  solutionStatement:
    'Created a unified design system with documented components, tokens, and guidelines for all teams',
  designProcess: [
    { step: '01', title: 'Audit', description: 'Analyzed existing designs and components' },
    { step: '02', title: 'Define', description: 'Created design tokens and core components' },
    {
      step: '03',
      title: 'Document',
      description: 'Built comprehensive design system documentation',
    },
    { step: '04', title: 'Distribute', description: 'Shared across all teams and products' },
  ],
  keyFeatures: [
    { title: 'Component Library', description: '100+ reusable UI components', icon: 'Box' },
    { title: 'Design Tokens', description: 'Centralized design token management', icon: 'Zap' },
    {
      title: 'Documentation',
      description: 'Complete usage guidelines and best practices',
      icon: 'Book',
    },
  ],
  colorPalette: [
    { name: 'Primary', hex: '#0066CC' },
    { name: 'Secondary', hex: '#6B7280' },
    { name: 'Success', hex: '#10B981' },
  ],
  tools: ['Figma', 'Storybook', 'Tokens Studio'],
};

export const DESIGN_SYSTEM_USER_FLOW_DATA: UIUXUserFlowData = {
  projectName: 'Design System',
  badgeText: 'USER FLOWS',
  category: 'Design System Usage',
  description: 'Component discovery and usage flows',
  totalFlowsCount: 4,
  activeFlowId: 'flow-1',
  userFlows: [
    {
      id: 'flow-1',
      title: 'Find & Use Component',
      persona: 'Designer',
      description: 'Discover and implement design system components',
      estimatedTime: '3 minutes',
      avgCompletionRate: '95%',
      frictionPoint: 'Finding specific component variants',
      steps: [
        {
          id: 's1',
          stepNumber: '1',
          screenName: 'Library',
          userAction: 'Search component',
          systemResponse: 'Show variants',
        },
      ],
    },
  ],
};

export const DESIGN_SYSTEM_WIREFRAMES_DATA: UIUXWireframesData = {
  projectName: 'Design System',
  badgeText: 'WIREFRAMES',
  category: 'System Documentation',
  description: 'Design system documentation layouts',
  activeScreenId: 'screen-1',
  designSystemSpecs: {
    gridSystem: '12-column',
    typographyScale: '8px base',
    spacingUnit: '8px',
    touchTargetMin: '44px',
  },
  screens: [
    {
      id: 'screen-1',
      title: 'Component Library',
      fidelity: 'High-Fidelity',
      deviceTarget: 'Desktop (1920px)',
      description: 'Design system component library documentation',
      layoutGrid: '12 columns',
      componentsUsed: ['Search', 'Component Cards', 'Code Snippets', 'Variants Panel'],
    },
  ],
};

export const DESIGN_SYSTEM_PROTOTYPE_DATA: UIUXPrototypeData = {
  projectName: 'Design System',
  badgeText: 'PROTOTYPE',
  category: 'Design System Platform',
  description: 'Interactive design system documentation and component explorer',
  deviceFrame: 'Desktop (1920x1080)',
  defaultScreenId: 'proto-1',
  figmaEmbedUrl: 'https://www.figma.com/embed?...',
  screens: [
    {
      id: 'proto-1',
      name: 'Library',
      type: 'Documentation',
      description: 'Component library explorer',
      hotspots: [
        { id: 'h1', label: 'View Details', actionType: 'Click', targetScreenId: 'proto-2' },
      ],
    },
  ],
};
