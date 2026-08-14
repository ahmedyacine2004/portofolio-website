import placeholderImage from '@/assets/images/neobank-mobile-hero.png';

import type {
  UIUXProjectOverviewData,
  UIUXPrototypeData,
  UIUXUserFlowData,
  UIUXWireframesData,
} from './insight-analytics';

// --- LEARNHUB LMS OVERVIEW DATA ---

export const LEARNHUB_LMS_OVERVIEW_DATA: UIUXProjectOverviewData = {
  projectName: 'LearnHub LMS',
  badgeText: 'UI/UX DESIGN',
  status: 'Completed',
  category: 'EdTech / Learning Management System',
  tagline: 'Modern learning management system for educators and students.',
  description:
    'Complete redesign of a learning management platform with focus on student engagement, course discovery, and seamless learning experience.',
  heroImageUrl: placeholderImage.src,
  metadata: [
    { label: 'Role', value: 'Lead Designer' },
    { label: 'Timeline', value: '6 Months' },
    { label: 'Platform', value: 'Web & Mobile' },
    { label: 'Team', value: '3 Designers, 10 Devs, 1 UXR' },
  ],
  metrics: [
    {
      label: 'Course Completion',
      value: '72%',
      change: '+28%',
      description: 'Improved completion rates post-redesign',
    },
    {
      label: 'Student Satisfaction',
      value: '4.8 / 5',
      change: '+0.9',
      description: 'Highest satisfaction among education platforms',
    },
  ],
  problemStatement: 'Traditional LMS interfaces were outdated and not engaging for modern learners',
  solutionStatement:
    'Designed a modern, interactive learning platform with improved course discovery and engagement tools',
  designProcess: [
    { step: '01', title: 'Education Research', description: 'Studied educator and student needs' },
    { step: '02', title: 'Prototyping', description: 'Rapid prototyping of core features' },
    {
      step: '03',
      title: 'User Testing',
      description: 'Conducted extensive testing with educators and students',
    },
    { step: '04', title: 'Refinement', description: 'Iterated based on feedback' },
  ],
  keyFeatures: [
    {
      title: 'Course Discovery',
      description: 'Browse and explore learning content',
      icon: 'Search',
    },
    {
      title: 'Interactive Learning',
      description: 'Engage with quizzes, assignments, and discussions',
      icon: 'MessageSquare',
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor learning progress and achievements',
      icon: 'CheckCircle',
    },
  ],
  colorPalette: [
    { name: 'Learning Purple', hex: '#A855F7' },
    { name: 'Success Green', hex: '#22C55E' },
    { name: 'Focus Blue', hex: '#06B6D4' },
  ],
  tools: ['Figma', 'Miro', 'Adobe Creative Suite'],
};

export const LEARNHUB_LMS_USER_FLOW_DATA: UIUXUserFlowData = {
  projectName: 'LearnHub LMS',
  badgeText: 'USER FLOWS',
  category: 'Learning Platform Flows',
  description: 'Student and educator learning flows',
  totalFlowsCount: 7,
  activeFlowId: 'flow-1',
  userFlows: [
    {
      id: 'flow-1',
      title: 'Enroll in Course',
      persona: 'Student',
      description: 'Browse courses and enroll in learning',
      estimatedTime: '5 minutes',
      avgCompletionRate: '89%',
      frictionPoint: 'Choosing from many courses',
      steps: [
        {
          id: 's1',
          stepNumber: '1',
          screenName: 'Catalog',
          userAction: 'Search courses',
          systemResponse: 'Show results',
        },
      ],
    },
  ],
};

export const LEARNHUB_LMS_WIREFRAMES_DATA: UIUXWireframesData = {
  projectName: 'LearnHub LMS',
  badgeText: 'WIREFRAMES',
  category: 'LMS Wireframes',
  description: 'Course and learning interface wireframes',
  activeScreenId: 'screen-1',
  designSystemSpecs: {
    gridSystem: '12-column (desktop)',
    typographyScale: '8px base',
    spacingUnit: '8px',
    touchTargetMin: '44px',
  },
  screens: [
    {
      id: 'screen-1',
      title: 'Course Dashboard',
      fidelity: 'High-Fidelity',
      deviceTarget: 'Desktop (1920px)',
      description: 'Student course dashboard and learning interface',
      layoutGrid: '12 columns',
      componentsUsed: ['Sidebar', 'Course Content', 'Discussion Panel', 'Progress Bar'],
    },
  ],
};

export const LEARNHUB_LMS_PROTOTYPE_DATA: UIUXPrototypeData = {
  projectName: 'LearnHub LMS',
  badgeText: 'PROTOTYPE',
  category: 'Interactive LMS Platform',
  description: 'Interactive learning management system prototype',
  deviceFrame: 'Desktop (1920x1080)',
  defaultScreenId: 'proto-1',
  figmaEmbedUrl: 'https://www.figma.com/embed?...',
  screens: [
    {
      id: 'proto-1',
      name: 'Dashboard',
      type: 'Learning',
      description: 'Main learning dashboard',
      hotspots: [
        { id: 'h1', label: 'Start Course', actionType: 'Click', targetScreenId: 'proto-2' },
      ],
    },
  ],
};
