import placeholderImage from '@/assets/images/neobank-mobile-hero.png';

import type {
  UIUXProjectOverviewData,
  UIUXPrototypeData,
  UIUXUserFlowData,
  UIUXWireframesData,
} from './insight-analytics';

// --- TRAVELMATE OVERVIEW DATA ---

export const TRAVELMATE_OVERVIEW_DATA: UIUXProjectOverviewData = {
  projectName: 'TravelMate',
  badgeText: 'UI/UX DESIGN',
  status: 'Completed',
  category: 'Travel / Trip Planning App',
  tagline: 'Intelligent travel planning and itinerary management companion.',
  description:
    'End-to-end design of a travel planning application that helps users discover destinations, plan itineraries, and manage bookings all in one place.',
  heroImageUrl: placeholderImage.src,
  metadata: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Timeline', value: '4 Months' },
    { label: 'Platform', value: 'iOS, Android' },
    { label: 'Team', value: '2 Designers, 5 Devs' },
  ],
  metrics: [
    {
      label: 'Trip Bookings',
      value: '50K+',
      change: '+156%',
      description: 'Bookings facilitated through the platform',
    },
    {
      label: 'User Reviews',
      value: '4.6 / 5',
      change: '+0.5',
      description: 'High user satisfaction rating',
    },
  ],
  problemStatement:
    'Travel planning involves using multiple apps and websites, creating fragmentation',
  solutionStatement:
    'Built an all-in-one travel platform integrating destination discovery, bookings, and itinerary management',
  designProcess: [
    {
      step: '01',
      title: 'Travel Research',
      description: 'Studied travel user behaviors and pain points',
    },
    {
      step: '02',
      title: 'Mapping',
      description: 'Created detailed user flows and information architecture',
    },
    {
      step: '03',
      title: 'Visual Design',
      description: 'Designed inspiring travel-focused interface',
    },
    { step: '04', title: 'Validation', description: 'Tested with real travelers' },
  ],
  keyFeatures: [
    {
      title: 'Destination Discovery',
      description: 'Explore places with AI-powered recommendations',
      icon: 'MapPin',
    },
    {
      title: 'Itinerary Builder',
      description: 'Create and manage detailed travel plans',
      icon: 'Calendar',
    },
    {
      title: 'Booking Integration',
      description: 'Book flights, hotels, and activities seamlessly',
      icon: 'CreditCard',
    },
  ],
  colorPalette: [
    { name: 'Adventure Blue', hex: '#0EA5E9' },
    { name: 'Sunset Orange', hex: '#FB923C' },
    { name: 'Tropical Green', hex: '#10B981' },
  ],
  tools: ['Figma', 'Protopie', 'Adobe Creative Cloud'],
};

export const TRAVELMATE_USER_FLOW_DATA: UIUXUserFlowData = {
  projectName: 'TravelMate',
  badgeText: 'USER FLOWS',
  category: 'Travel Planning Flows',
  description: 'Key journeys for trip discovery and booking',
  totalFlowsCount: 6,
  activeFlowId: 'flow-1',
  userFlows: [
    {
      id: 'flow-1',
      title: 'Discover & Book Trip',
      persona: 'Vacation Planner',
      description: 'Browse destinations and book a complete trip',
      estimatedTime: '15 minutes',
      avgCompletionRate: '78%',
      frictionPoint: 'Complex booking checkout',
      steps: [
        {
          id: 's1',
          stepNumber: '1',
          screenName: 'Explore',
          userAction: 'Browse destinations',
          systemResponse: 'Show recommendations',
        },
      ],
    },
  ],
};

export const TRAVELMATE_WIREFRAMES_DATA: UIUXWireframesData = {
  projectName: 'TravelMate',
  badgeText: 'WIREFRAMES',
  category: 'Travel App Wireframes',
  description: 'Discovery and booking interface wireframes',
  activeScreenId: 'screen-1',
  designSystemSpecs: {
    gridSystem: '8-column (mobile)',
    typographyScale: '4px base',
    spacingUnit: '4px',
    touchTargetMin: '48px',
  },
  screens: [
    {
      id: 'screen-1',
      title: 'Destination Discovery',
      fidelity: 'High-Fidelity',
      deviceTarget: 'Mobile (375px)',
      description: 'Browse and discover travel destinations',
      layoutGrid: '8 columns',
      componentsUsed: ['Search Bar', 'Destination Cards', 'Filters', 'Map View'],
    },
  ],
};

export const TRAVELMATE_PROTOTYPE_DATA: UIUXPrototypeData = {
  projectName: 'TravelMate',
  badgeText: 'PROTOTYPE',
  category: 'Interactive Travel App',
  description: 'Interactive travel planning and booking prototype',
  deviceFrame: 'iPhone 14 Pro',
  defaultScreenId: 'proto-1',
  figmaEmbedUrl: 'https://www.figma.com/embed?...',
  screens: [
    {
      id: 'proto-1',
      name: 'Explore',
      type: 'Discovery',
      description: 'Destination exploration screen',
      hotspots: [
        { id: 'h1', label: 'View Destination', actionType: 'Tap', targetScreenId: 'proto-2' },
      ],
    },
  ],
};
