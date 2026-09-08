import projectMark from '@/assets/images/travelmate-mark.svg';

import type {
  UIUXProjectOverviewData,
  UIUXPrototypeData,
  UIUXUserFlowData,
  UIUXWireframesData,
} from './insight-analytics';

export const TRAVELMATE_OVERVIEW_DATA: UIUXProjectOverviewData = {
  projectName: 'TravelMate',
  badgeText: 'UI/UX DESIGN',
  status: 'Completed',
  category: 'Travel / Trip Planning App',
  tagline: 'A more human way to turn travel inspiration into a confident plan.',
  description:
    'End-to-end product design for a trip companion that connects destination discovery, collaborative planning, bookings, and on-the-go changes in one calm workspace.',
  heroImageUrl: projectMark.src,
  metadata: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Timeline', value: '4 Months (Q1 2025)' },
    { label: 'Platform', value: 'iOS & Android' },
    { label: 'Team', value: '2 Designers, 5 Engineers, 1 PM' },
  ],
  metrics: [
    {
      label: 'Trip Plans Created',
      value: '42K+',
      change: '+64%',
      description: 'Members created a complete plan after the redesigned discovery flow.',
    },
    {
      label: 'Planning Confidence',
      value: '4.8 / 5',
      change: '+0.7',
      description: 'Members felt more confident about timing, cost, and local logistics.',
    },
    {
      label: 'Shared Itineraries',
      value: '71%',
      change: '+38%',
      description: 'Most active plans included at least one travel companion.',
    },
  ],
  problemStatement:
    'Travelers jump between inspiration boards, maps, booking sites, and chat threads. Important decisions disappear in the gaps, while uncertainty about time and cost makes planning feel heavier than the trip itself.',
  solutionStatement:
    'TravelMate gives each trip one shared source of truth: save ideas, compare options, build a realistic day-by-day plan, and keep confirmed details ready when the journey starts.',
  designProcess: [
    {
      step: '01',
      title: 'Listen & Trace',
      description: 'Interviewed solo and group travelers across the planning journey.',
    },
    {
      step: '02',
      title: 'Shape the Trip',
      description: 'Mapped the shift from inspiration to decisions, logistics, and sharing.',
    },
    {
      step: '03',
      title: 'Design for Confidence',
      description: 'Created a visual system that balances discovery energy with clarity.',
    },
    {
      step: '04',
      title: 'Validate in Motion',
      description: 'Tested planning and day-of scenarios with real travelers.',
    },
  ],
  keyFeatures: [
    {
      title: 'Contextual Discovery',
      description: 'Find places through mood, pace, budget, and real trip context.',
      icon: 'MapPin',
    },
    {
      title: 'Shared Itinerary',
      description: 'Build realistic days with travel time, opening hours, and companions.',
      icon: 'Calendar',
    },
    {
      title: 'Booking Timeline',
      description: 'Keep confirmations, deadlines, and essential trip details together.',
    },
    {
      title: 'Offline Trip View',
      description: 'Access addresses, tickets, and the next stop when connectivity is limited.',
      icon: 'Smartphone',
      icon: 'CreditCard',
    },
  ],
  colorPalette: [
    { name: 'Sky Route', hex: '#2E86C1' },
    { name: 'Sunlit Coral', hex: '#F28F6B' },
    { name: 'Trail Green', hex: '#4EAA78' },
    { name: 'Midnight Ink', hex: '#203446' },
  ],
  tools: ['Figma', 'FigJam', 'ProtoPie', 'Maze'],
};

export const TRAVELMATE_USER_FLOW_DATA: UIUXUserFlowData = {
  projectName: 'TravelMate',
  badgeText: 'USER FLOWS',
  category: 'Travel Planning & Booking Journeys',
  description:
    'Three connected journeys move travelers from inspiration to a shared, bookable plan.',
  totalFlowsCount: 3,
  activeFlowId: 'discover-plan',
  userFlows: [
    {
      id: 'discover-plan',
      title: 'Discover & Plan a Trip',
      persona: 'First-time Trip Planner',
      description: 'Turn a loose destination idea into a realistic first-day itinerary.',
      estimatedTime: '8 Minutes',
      avgCompletionRate: '84%',
      frictionPoint: 'Comparing options without losing the original idea.',
      steps: [
        {
          id: 'discover-1',
          stepNumber: '01',
          screenName: 'Explore Ideas',
          userAction: 'Chooses a mood, season, or trip pace',
          systemResponse: 'Surfaces destinations with reasons they fit the trip brief',
          nodeType: 'screen',
        },
        {
          id: 'discover-2',
          stepNumber: '02',
          screenName: 'Destination Shortlist',
          userAction: 'Saves and compares two destinations',
          systemResponse: 'Shows weather, travel time, cost range, and standout experiences',
          nodeType: 'action',
        },
        {
          id: 'discover-3',
          stepNumber: '03',
          screenName: 'First Day Builder',
          userAction: 'Adds a place and adjusts the day pace',
          systemResponse: 'Fits travel time and opening hours into the itinerary',
          nodeType: 'outcome',
          isKeyMilestone: true,
        },
      ],
    },
    {
      id: 'invite-companions',
      title: 'Plan with Companions',
      persona: 'Group Organizer',
      description:
        'Invite friends, collect ideas, and settle decisions without a long chat thread.',
      estimatedTime: '4 Minutes',
      avgCompletionRate: '79%',
      frictionPoint: 'Reaching agreement on activities and budget.',
      steps: [
        {
          id: 'group-1',
          stepNumber: '01',
          screenName: 'Trip Share',
          userAction: 'Invites companions with a link',
          systemResponse: 'Creates a shared trip space with roles and preferences',
          nodeType: 'screen',
        },
        {
          id: 'group-2',
          stepNumber: '02',
          screenName: 'Idea Board',
          userAction: 'Adds or votes on saved places',
          systemResponse: 'Clusters ideas by day, area, and group interest',
          nodeType: 'action',
        },
        {
          id: 'group-3',
          stepNumber: '03',
          screenName: 'Plan Confirmed',
          userAction: 'Confirms the winning activities',
          systemResponse: 'Adds selected places to the shared itinerary and notifies the group',
          nodeType: 'outcome',
          isKeyMilestone: true,
        },
      ],
    },
    {
      id: 'travel-day',
      title: 'Use the Trip Offline',
      persona: 'On-the-go Traveler',
      description:
        'Find the next stop, confirmation, and local directions when the connection is unreliable.',
      estimatedTime: '30 Seconds',
      avgCompletionRate: '93%',
      frictionPoint: 'Finding the right confirmation at the moment it matters.',
      steps: [
        {
          id: 'day-1',
          stepNumber: '01',
          screenName: 'Today Timeline',
          userAction: 'Opens the current day',
          systemResponse: 'Highlights the next stop and time buffer',
          nodeType: 'screen',
        },
        {
          id: 'day-2',
          stepNumber: '02',
          screenName: 'Booking Detail',
          userAction: 'Taps the transport or hotel card',
          systemResponse: 'Shows address, confirmation code, and offline ticket',
          nodeType: 'action',
        },
        {
          id: 'day-3',
          stepNumber: '03',
          screenName: 'Next Stop',
          userAction: 'Starts directions to the next place',
          systemResponse: 'Opens saved route guidance and marks the stop in progress',
          nodeType: 'outcome',
          isKeyMilestone: true,
        },
      ],
    },
  ],
};

export const TRAVELMATE_WIREFRAMES_DATA: UIUXWireframesData = {
  projectName: 'TravelMate',
  badgeText: 'WIREFRAMES',
  category: 'Wireframing & Trip Information Architecture',
  description:
    'Structural blueprints for discovery, shared decisions, and a dependable day-of trip view.',
  activeScreenId: 'explore-home',
  designSystemSpecs: {
    gridSystem: '4-column mobile grid (16px margins, 12px gutter)',
    typographyScale: 'Major Third (1.250) with 16px base',
    spacingUnit: '8px baseline grid',
    touchTargetMin: '44 x 44 dp minimum interactive area',
  },
  screens: [
    {
      id: 'explore-home',
      title: 'Explore Home',
      fidelity: 'Mid-Fidelity',
      deviceTarget: 'iOS / Android (390 x 844 px)',
      description: 'A discovery home organized around trip mood, season, pace, and saved ideas.',
      layoutGrid: 'Scrollable single-column feed with persistent search and filter controls',
      componentsUsed: [
        'Trip Brief',
        'Destination Cards',
        'Context Filters',
        'Map Preview',
        'Bottom Navigation',
      ],
      annotations: [
        {
          id: 'explore-ann-1',
          number: 1,
          title: 'Trip Brief',
          description:
            'Captures the feeling and constraints of the trip before showing generic destinations.',
          xPercentage: 50,
          yPercentage: 20,
        },
        {
          id: 'explore-ann-2',
          number: 2,
          title: 'Reason to Go',
          description:
            'Explains why each destination matches the traveler rather than relying on an image alone.',
          xPercentage: 50,
          yPercentage: 48,
        },
        {
          id: 'explore-ann-3',
          number: 3,
          title: 'Map Preview',
          description: 'Provides geographic context without forcing a separate map-first workflow.',
          xPercentage: 50,
          yPercentage: 76,
        },
      ],
    },
    {
      id: 'shared-itinerary',
      title: 'Shared Itinerary',
      fidelity: 'High-Fidelity',
      deviceTarget: 'iOS / Android (390 x 844 px)',
      description:
        'A day-by-day plan that makes timing, travel distance, and group decisions visible.',
      layoutGrid: 'Day tabs with vertically stacked stop cards and a persistent add action',
      componentsUsed: [
        'Day Selector',
        'Stop Card',
        'Travel Buffer',
        'Companion Vote',
        'Add Place CTA',
      ],
      annotations: [
        {
          id: 'itinerary-ann-1',
          number: 1,
          title: 'Day Rhythm',
          description: 'Shows pace and empty space so travelers can spot an overfilled day.',
          xPercentage: 50,
          yPercentage: 18,
        },
        {
          id: 'itinerary-ann-2',
          number: 2,
          title: 'Travel Buffer',
          description: 'Makes movement time part of the plan instead of hidden between activities.',
          xPercentage: 50,
          yPercentage: 51,
        },
        {
          id: 'itinerary-ann-3',
          number: 3,
          title: 'Shared Decision',
          description: 'Keeps group votes attached to the place they are deciding about.',
          xPercentage: 50,
          yPercentage: 84,
        },
      ],
    },
    {
      id: 'offline-day',
      title: 'Offline Trip View',
      fidelity: 'Low-Fidelity',
      deviceTarget: 'iOS / Android (390 x 844 px)',
      description:
        'A focused day view for confirmations, addresses, and the next stop without a connection.',
      layoutGrid: 'Fixed current-stop header with vertically stacked booking details',
      componentsUsed: ['Current Stop Header', 'Offline Ticket', 'Address Row', 'Next Stop Card'],
      annotations: [
        {
          id: 'offline-ann-1',
          number: 1,
          title: 'Current Stop',
          description: 'Anchors the traveler in the present moment with time and place.',
          xPercentage: 50,
          yPercentage: 22,
        },
        {
          id: 'offline-ann-2',
          number: 2,
          title: 'Booking Proof',
          description: 'Keeps the confirmation code or ticket one tap away.',
          xPercentage: 50,
          yPercentage: 51,
        },
        {
          id: 'offline-ann-3',
          number: 3,
          title: 'Next Stop',
          description:
            'Maintains momentum by showing what comes next without reopening the full plan.',
          xPercentage: 50,
          yPercentage: 80,
        },
      ],
    },
  ],
};

export const TRAVELMATE_PROTOTYPE_DATA: UIUXPrototypeData = {
  projectName: 'TravelMate',
  badgeText: 'PROTOTYPE',
  category: 'High-Fidelity Travel Interaction Design',
  description:
    'A high-fidelity prototype for destination discovery, shared itinerary decisions, and offline trip access.',
  deviceFrame: 'Apple iPhone 15 (390 x 844 px)',
  defaultScreenId: 'proto-explore',
  figmaEmbedUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com',
  screens: [
    {
      id: 'proto-explore',
      name: 'Explore Home',
      type: 'Home',
      description: 'Destination discovery shaped by mood, season, pace, and trip constraints.',
      hotspots: [
        {
          id: 'explore-h1',
          label: 'View Destination',
          actionType: 'Tap',
          targetScreenId: 'proto-destination',
          position: { xPercentage: 10, yPercentage: 35, widthPercentage: 80, heightPercentage: 14 },
        },
        {
          id: 'explore-h2',
          label: 'Open Trip Plan',
          actionType: 'Tap',
          targetScreenId: 'proto-itinerary',
          position: { xPercentage: 68, yPercentage: 91, widthPercentage: 24, heightPercentage: 7 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Filter Select',
          effect: 'Destination cards reorder with a soft horizontal glide',
          duration: '240ms',
        },
      ],
    },
    {
      id: 'proto-destination',
      name: 'Destination Detail',
      type: 'Analytics',
      description:
        'A destination overview balancing inspiration with weather, cost, and travel context.',
      hotspots: [
        {
          id: 'destination-h1',
          label: 'Add to Trip',
          actionType: 'Tap',
          targetScreenId: 'proto-itinerary',
          position: { xPercentage: 10, yPercentage: 82, widthPercentage: 80, heightPercentage: 10 },
        },
        {
          id: 'destination-h2',
          label: 'Back to Explore',
          actionType: 'Tap',
          targetScreenId: 'proto-explore',
          position: { xPercentage: 5, yPercentage: 5, widthPercentage: 18, heightPercentage: 5 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Save Destination',
          effect: 'Bookmark fills and a trip context toast confirms the save',
          duration: '300ms',
        },
      ],
    },
    {
      id: 'proto-itinerary',
      name: 'Shared Itinerary',
      type: 'Transfer',
      description:
        'A collaborative day plan showing stops, travel buffers, and companion decisions.',
      hotspots: [
        {
          id: 'itinerary-h1',
          label: 'Add a Stop',
          actionType: 'Tap',
          targetScreenId: 'proto-place',
          position: { xPercentage: 10, yPercentage: 75, widthPercentage: 80, heightPercentage: 9 },
        },
        {
          id: 'itinerary-h2',
          label: 'Open Trip Day',
          actionType: 'Tap',
          targetScreenId: 'proto-offline',
          position: { xPercentage: 10, yPercentage: 88, widthPercentage: 80, heightPercentage: 8 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Stop Reorder',
          effect: 'Cards settle into the day timeline with travel time recalculated',
          duration: '420ms',
        },
      ],
    },
    {
      id: 'proto-place',
      name: 'Place Detail',
      type: 'Cards',
      description:
        'A place detail view with opening hours, distance, and a group decision control.',
      hotspots: [
        {
          id: 'place-h1',
          label: 'Add to Day',
          actionType: 'Tap',
          targetScreenId: 'proto-itinerary',
          position: { xPercentage: 10, yPercentage: 82, widthPercentage: 80, heightPercentage: 10 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Companion Vote',
          effect: 'Vote count updates and the group avatar stack responds',
          duration: '260ms',
        },
      ],
    },
    {
      id: 'proto-offline',
      name: 'Offline Trip View',
      type: 'Success',
      description:
        'Current stop, booking proof, address, and next destination available without a connection.',
      hotspots: [
        {
          id: 'offline-h1',
          label: 'Back to Plan',
          actionType: 'Tap',
          targetScreenId: 'proto-itinerary',
          position: { xPercentage: 10, yPercentage: 88, widthPercentage: 80, heightPercentage: 8 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Stop Complete',
          effect: 'Current stop collapses and the next stop becomes the active focus',
          duration: '360ms',
        },
      ],
    },
  ],
};
