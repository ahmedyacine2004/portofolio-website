import projectMark from '@/assets/icons/design-system-mark.svg';

import type {
  UIUXProjectOverviewData,
  UIUXPrototypeData,
  UIUXUserFlowData,
  UIUXWireframesData,
} from './insight-analytics';

export const DESIGN_SYSTEM_OVERVIEW_DATA: UIUXProjectOverviewData = {
  projectName: 'Design System',
  badgeText: 'UI/UX DESIGN',
  status: 'Completed',
  category: 'Design System / Component Library',
  tagline: 'A shared language for building clearer, faster, and more accessible products.',
  description:
    'Created a product-ready design system that connects tokens, accessible components, contribution rules, and documentation across a growing suite of enterprise tools.',
  heroImageUrl: projectMark.src,
  metadata: [
    { label: 'Role', value: 'Design Systems Lead' },
    { label: 'Timeline', value: '8 Months (2024)' },
    { label: 'Platform', value: 'Enterprise Web Products' },
    { label: 'Team', value: '3 Designers, 4 Design Engineers, 1 PM' },
  ],
  metrics: [
    {
      label: 'Shared Component Adoption',
      value: '86%',
      change: '+51%',
      description: 'New interface work used a documented shared component.',
    },
    {
      label: 'UI Delivery Time',
      value: '-43%',
      change: '-43%',
      description: 'Reusable patterns reduced design and implementation handoff time.',
    },
    {
      label: 'Accessibility Coverage',
      value: '94%',
      change: '+37%',
      description: 'Core components passed keyboard and contrast acceptance checks.',
    },
  ],
  problemStatement:
    'Teams solved the same interface problems in parallel. Colors drifted, component states were undocumented, and accessibility decisions arrived too late for a reliable release process.',
  solutionStatement:
    'Built a governed system where a token change can move from Figma to code, every component state is explicit, and teams can contribute without fragmenting the language.',
  designProcess: [
    {
      step: '01',
      title: 'Audit the Product',
      description: 'Mapped repeated patterns, drift, accessibility gaps, and ownership.',
    },
    {
      step: '02',
      title: 'Define the Language',
      description: 'Established semantic tokens, component anatomy, and state rules.',
    },
    {
      step: '03',
      title: 'Prove in Code',
      description: 'Built accessible components and tested them in real product flows.',
    },
    {
      step: '04',
      title: 'Adopt & Govern',
      description: 'Created contribution rituals, release notes, and migration guidance.',
    },
  ],
  keyFeatures: [
    {
      title: 'Component Library',
      description: '60+ documented components with complete interaction states.',
      icon: 'Box',
    },
    {
      title: 'Semantic Tokens',
      description: 'Theme-ready color, type, spacing, and elevation decisions.',
      icon: 'Zap',
    },
    {
      title: 'Contribution Docs',
      description: 'Usage guidance, accessibility checks, and a clear path to propose change.',
      icon: 'Book',
    },
    {
      title: 'Accessibility by Default',
      description: 'Keyboard, focus, contrast, and reduced-motion requirements built into review.',
      icon: 'ShieldCheck',
    },
  ],
  colorPalette: [
    { name: 'Action Blue', hex: '#2563B8' },
    { name: 'Neutral Slate', hex: '#526173' },
    { name: 'Signal Green', hex: '#218A68' },
    { name: 'Canvas Mist', hex: '#F4F7FA' },
  ],
  tools: ['Figma', 'Storybook', 'Tokens Studio', 'Zeroheight'],
};

export const DESIGN_SYSTEM_USER_FLOW_DATA: UIUXUserFlowData = {
  projectName: 'Design System',
  badgeText: 'USER FLOWS',
  category: 'Component Discovery & Contribution Workflows',
  description:
    'Three connected journeys help teams find, implement, and improve shared components safely.',
  totalFlowsCount: 3,
  activeFlowId: 'find-component',
  userFlows: [
    {
      id: 'find-component',
      title: 'Find & Use a Component',
      persona: 'Product Designer',
      description:
        'Find a pattern, understand its states, and bring it into a product flow with confidence.',
      estimatedTime: '4 Minutes',
      avgCompletionRate: '94%',
      frictionPoint: 'Choosing the right pattern for an unfamiliar state.',
      steps: [
        {
          id: 'component-1',
          stepNumber: '01',
          screenName: 'Component Library',
          userAction: 'Searches by component or task',
          systemResponse: 'Shows matching patterns, status, and supported states',
          nodeType: 'screen',
        },
        {
          id: 'component-2',
          stepNumber: '02',
          screenName: 'Component Detail',
          userAction: 'Reviews anatomy, behavior, and accessibility notes',
          systemResponse: 'Shows variants, do and do-not examples, and code references',
          nodeType: 'action',
        },
        {
          id: 'component-3',
          stepNumber: '03',
          screenName: 'Implementation Ready',
          userAction: 'Copies the token or code reference',
          systemResponse: 'Records usage guidance and links the component to release status',
          nodeType: 'outcome',
          isKeyMilestone: true,
        },
      ],
    },
    {
      id: 'propose-pattern',
      title: 'Propose a New Pattern',
      persona: 'Product Team',
      description: 'Turn a repeated product need into a reusable, reviewed system contribution.',
      estimatedTime: '12 Minutes',
      avgCompletionRate: '81%',
      frictionPoint: 'Knowing when a local solution should become shared.',
      steps: [
        {
          id: 'proposal-1',
          stepNumber: '01',
          screenName: 'Contribution Brief',
          userAction: 'Describes the repeated product problem',
          systemResponse: 'Prompts for users, constraints, and existing patterns',
          nodeType: 'screen',
        },
        {
          id: 'proposal-2',
          stepNumber: '02',
          screenName: 'Review Checklist',
          userAction: 'Adds states, keyboard behavior, and content rules',
          systemResponse: 'Flags missing accessibility or responsive requirements',
          nodeType: 'decision',
          decisionOptions: [
            { label: 'Ready for review', targetStep: '03' },
            { label: 'Needs more evidence', targetStep: '01' },
          ],
        },
        {
          id: 'proposal-3',
          stepNumber: '03',
          screenName: 'Contribution Published',
          userAction: 'Shares the proposal with the system team',
          systemResponse: 'Creates a review item with owner, status, and next milestone',
          nodeType: 'outcome',
          isKeyMilestone: true,
        },
      ],
    },
    {
      id: 'migrate-product',
      title: 'Migrate a Product Surface',
      persona: 'Design Engineer',
      description:
        'Move an existing screen onto shared tokens and components without losing product context.',
      estimatedTime: '18 Minutes',
      avgCompletionRate: '87%',
      frictionPoint: 'Finding visual differences introduced by token migration.',
      steps: [
        {
          id: 'migration-1',
          stepNumber: '01',
          screenName: 'Migration Map',
          userAction: 'Selects a product surface and its local styles',
          systemResponse: 'Maps local values to semantic tokens and replacement components',
          nodeType: 'screen',
        },
        {
          id: 'migration-2',
          stepNumber: '02',
          screenName: 'Visual Diff',
          userAction: 'Reviews before-and-after states',
          systemResponse: 'Highlights changed spacing, color, type, and interaction behavior',
          nodeType: 'action',
        },
        {
          id: 'migration-3',
          stepNumber: '03',
          screenName: 'Migration Complete',
          userAction: 'Confirms the surface and records exceptions',
          systemResponse: 'Updates adoption status and creates follow-up work for exceptions',
          nodeType: 'outcome',
          isKeyMilestone: true,
        },
      ],
    },
  ],
};

export const DESIGN_SYSTEM_WIREFRAMES_DATA: UIUXWireframesData = {
  projectName: 'Design System',
  badgeText: 'WIREFRAMES',
  category: 'System Documentation & Component Architecture',
  description: 'Structural blueprints for search, component detail, and contribution guidance.',
  activeScreenId: 'library-home',
  designSystemSpecs: {
    gridSystem: '12-column desktop grid with responsive documentation rail',
    typographyScale: 'Major Third (1.250) with 16px base',
    spacingUnit: '8px semantic spacing scale',
    touchTargetMin: '44 x 44 px minimum interactive area',
  },
  screens: [
    {
      id: 'library-home',
      title: 'Component Library',
      fidelity: 'Mid-Fidelity',
      deviceTarget: 'Responsive Web (1440 x 900 px)',
      description:
        'A searchable library that makes component status, coverage, and intent visible.',
      layoutGrid: '12-column documentation layout with persistent category rail',
      componentsUsed: [
        'Global Search',
        'Component Cards',
        'Status Badge',
        'Category Rail',
        'Release Notes',
      ],
      annotations: [
        {
          id: 'library-ann-1',
          number: 1,
          title: 'Intent Search',
          description: 'Lets teams search by interface need as well as component name.',
          xPercentage: 50,
          yPercentage: 16,
        },
        {
          id: 'library-ann-2',
          number: 2,
          title: 'Component Status',
          description: 'Makes maturity, ownership, and release status visible before adoption.',
          xPercentage: 50,
          yPercentage: 48,
        },
        {
          id: 'library-ann-3',
          number: 3,
          title: 'Usage Context',
          description: 'Connects each component to examples and product-ready guidance.',
          xPercentage: 50,
          yPercentage: 80,
        },
      ],
    },
    {
      id: 'component-detail',
      title: 'Component Detail',
      fidelity: 'High-Fidelity',
      deviceTarget: 'Responsive Web (1440 x 900 px)',
      description:
        'A component page that treats behavior, accessibility, content, and code as one specification.',
      layoutGrid: 'Sticky documentation header with two-column specification body',
      componentsUsed: [
        'Variant Switcher',
        'Props Table',
        'Accessibility Checklist',
        'Code Preview',
        'Do and Do-not Examples',
      ],
      annotations: [
        {
          id: 'detail-ann-1',
          number: 1,
          title: 'State Coverage',
          description: 'Shows default, hover, focus, disabled, loading, and error states together.',
          xPercentage: 50,
          yPercentage: 25,
        },
        {
          id: 'detail-ann-2',
          number: 2,
          title: 'Behavior Rules',
          description: 'Documents interaction and content decisions beside the visual example.',
          xPercentage: 50,
          yPercentage: 55,
        },
        {
          id: 'detail-ann-3',
          number: 3,
          title: 'Implementation Bridge',
          description: 'Gives design and engineering the same token and code reference.',
          xPercentage: 50,
          yPercentage: 84,
        },
      ],
    },
    {
      id: 'contribution-brief',
      title: 'Contribution Brief',
      fidelity: 'Low-Fidelity',
      deviceTarget: 'Responsive Web (1440 x 900 px)',
      description:
        'A guided contribution form that turns local UI solutions into reusable system evidence.',
      layoutGrid: 'Single-column brief with persistent review checklist',
      componentsUsed: [
        'Problem Brief',
        'Evidence Upload',
        'State Matrix',
        'Accessibility Checklist',
        'Review CTA',
      ],
      annotations: [
        {
          id: 'contribution-ann-1',
          number: 1,
          title: 'Product Need',
          description:
            'Starts from a repeated user or product problem instead of a visual request.',
          xPercentage: 50,
          yPercentage: 25,
        },
        {
          id: 'contribution-ann-2',
          number: 2,
          title: 'Evidence',
          description: 'Asks for real examples and frequency before accepting a new pattern.',
          xPercentage: 50,
          yPercentage: 54,
        },
        {
          id: 'contribution-ann-3',
          number: 3,
          title: 'Review Gate',
          description: 'Makes accessibility and ownership requirements part of contribution.',
          xPercentage: 50,
          yPercentage: 82,
        },
      ],
    },
  ],
};

export const DESIGN_SYSTEM_PROTOTYPE_DATA: UIUXPrototypeData = {
  projectName: 'Design System',
  badgeText: 'PROTOTYPE',
  category: 'High-Fidelity Design System Documentation',
  description:
    'A high-fidelity prototype for discovering components, reviewing states, and proposing reusable patterns.',
  deviceFrame: 'Responsive Desktop (1440 x 900 px)',
  defaultScreenId: 'proto-library',
  figmaEmbedUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com',
  screens: [
    {
      id: 'proto-library',
      name: 'Component Library',
      type: 'Home',
      description: 'Searchable component library with maturity, ownership, and usage context.',
      hotspots: [
        {
          id: 'library-h1',
          label: 'View Component Details',
          actionType: 'Tap',
          targetScreenId: 'proto-detail',
          position: { xPercentage: 10, yPercentage: 32, widthPercentage: 80, heightPercentage: 14 },
        },
        {
          id: 'library-h2',
          label: 'Open Contribution Guide',
          actionType: 'Tap',
          targetScreenId: 'proto-contribute',
          position: { xPercentage: 10, yPercentage: 72, widthPercentage: 80, heightPercentage: 10 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Search Input',
          effect: 'Component cards filter while category context remains anchored',
          duration: '220ms',
        },
      ],
    },
    {
      id: 'proto-detail',
      name: 'Component Detail',
      type: 'Analytics',
      description:
        'Component specification with variants, accessibility checks, behavior, and code references.',
      hotspots: [
        {
          id: 'detail-h1',
          label: 'Switch Component State',
          actionType: 'Tap',
          targetScreenId: 'proto-detail',
          position: { xPercentage: 10, yPercentage: 35, widthPercentage: 80, heightPercentage: 12 },
        },
        {
          id: 'detail-h2',
          label: 'Start Migration',
          actionType: 'Tap',
          targetScreenId: 'proto-migrate',
          position: { xPercentage: 10, yPercentage: 83, widthPercentage: 80, heightPercentage: 9 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Variant Select',
          effect: 'Preview and code example update together with a state transition',
          duration: '280ms',
        },
      ],
    },
    {
      id: 'proto-contribute',
      name: 'Contribution Brief',
      type: 'Cards',
      description:
        'Guided contribution form for documenting a repeated product need and its evidence.',
      hotspots: [
        {
          id: 'contribute-h1',
          label: 'Submit for Review',
          actionType: 'Tap',
          targetScreenId: 'proto-migrate',
          position: { xPercentage: 10, yPercentage: 84, widthPercentage: 80, heightPercentage: 9 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Checklist Complete',
          effect: 'Review action unlocks with a clear ownership confirmation',
          duration: '320ms',
        },
      ],
    },
    {
      id: 'proto-migrate',
      name: 'Migration Review',
      type: 'Transfer',
      description:
        'Visual diff review for moving a product surface onto shared tokens and components.',
      hotspots: [
        {
          id: 'migrate-h1',
          label: 'Approve Migration',
          actionType: 'Tap',
          targetScreenId: 'proto-success',
          position: { xPercentage: 10, yPercentage: 84, widthPercentage: 80, heightPercentage: 9 },
        },
        {
          id: 'migrate-h2',
          label: 'Back to Library',
          actionType: 'Tap',
          targetScreenId: 'proto-library',
          position: { xPercentage: 5, yPercentage: 5, widthPercentage: 20, heightPercentage: 5 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Diff Review',
          effect: 'Changed tokens highlight in the before-and-after surface preview',
          duration: '360ms',
        },
      ],
    },
    {
      id: 'proto-success',
      name: 'Migration Complete',
      type: 'Success',
      description:
        'Adoption confirmation with documented exceptions and the next governance milestone.',
      hotspots: [
        {
          id: 'success-h1',
          label: 'Return to Library',
          actionType: 'Tap',
          targetScreenId: 'proto-library',
          position: { xPercentage: 10, yPercentage: 86, widthPercentage: 80, heightPercentage: 8 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Migration Approved',
          effect: 'Adoption status updates with a calm confirmation pulse',
          duration: '450ms',
        },
      ],
    },
  ],
};
