import projectMark from '@/assets/images/healthsync-mark.svg';

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

export const HEALTHSYNC_OVERVIEW_DATA: UIUXProjectOverviewData = {
  projectName: 'HealthSync',
  badgeText: 'UI/UX DESIGN',
  status: 'Completed',
  category: 'Healthcare / Wellness App Design',
  tagline: 'A calmer way to understand daily health, habits, and recovery.',
  description:
    'End-to-end product design for a privacy-first wellness companion that brings activity, sleep, nutrition, and mood into one clear daily rhythm.',
  heroImageUrl: projectMark.src,
  metadata: [
    { label: 'Role', value: 'Lead Product Designer' },
    { label: 'Timeline', value: '5 Months (Q2-Q3 2025)' },
    { label: 'Platform', value: 'iOS & Android' },
    { label: 'Team', value: '2 Designers, 5 Engineers, 1 PM' },
  ],
  metrics: [
    {
      label: 'Weekly Check-in Completion',
      value: '78%',
      change: '+31%',
      description: 'Members completed more weekly reflections after the redesign.',
    },
    {
      label: 'Onboarding Completion',
      value: '86%',
      change: '+24%',
      description: 'A shorter setup flow helped members reach their first insight.',
    },
    {
      label: 'Daily Insight Opens',
      value: '2.4x',
      change: '+52%',
      description: 'Clearer explanations made personalized insights easier to trust.',
    },
  ],
  problemStatement:
    'People were collecting health data across disconnected apps but could not tell which signals mattered together. Dense charts and judgmental reminders made the daily check-in feel like another task.',
  solutionStatement:
    'HealthSync turns raw signals into one gentle daily plan: a glanceable home view, explainable trends, flexible goals, and supportive nudges that adapt to energy and recovery.',
  designProcess: [
    {
      step: '01',
      title: 'Listen & Map',
      description: 'Interviewed members and mapped the emotional cost of daily tracking.',
    },
    {
      step: '02',
      title: 'Frame the Day',
      description: 'Designed a calm dashboard around energy, recovery, and one next step.',
    },
    {
      step: '03',
      title: 'Make It Explainable',
      description: 'Tested insight language with members and wellness coaches.',
    },
    {
      step: '04',
      title: 'Validate & Tune',
      description: 'Ran two usability rounds and refined reminders, charts, and goals.',
    },
  ],
  keyFeatures: [
    {
      title: 'Daily Health Snapshot',
      description: 'See activity, sleep, mood, and recovery in one grounded overview.',
      icon: 'Heart',
    },
    {
      title: 'Explainable Insights',
      description: 'Understand what changed and why, without medical jargon or noisy charts.',
      icon: 'TrendingUp',
    },
    {
      title: 'Flexible Health Goals',
      description: 'Set gentle targets that adapt to recovery instead of rewarding overwork.',
      icon: 'Target',
    },
    {
      title: 'Private by Design',
      description: 'Choose what to connect, what to share, and when reminders appear.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Guided Check-ins',
      description: 'Reflect in under two minutes with prompts shaped around how you feel.',
      icon: 'Users',
    },
  ],
  colorPalette: [
    { name: 'Vital Mint', hex: '#3DBB9A' },
    { name: 'Trust Blue', hex: '#4B83C4' },
    { name: 'Warm Apricot', hex: '#F2A65A' },
    { name: 'Soft Ink', hex: '#24343B' },
  ],
  tools: ['Figma', 'FigJam', 'Maze', 'Notion'],
};

export const HEALTHSYNC_USER_FLOW_DATA: UIUXUserFlowData = {
  projectName: 'HealthSync',
  badgeText: 'USER FLOWS',
  category: 'Information Architecture & Wellness Journeys',
  description:
    'Three key journeys help members connect their data, understand a change, and build a sustainable daily habit.',
  totalFlowsCount: 3,
  activeFlowId: 'daily-check-in',
  userFlows: [
    {
      id: 'daily-check-in',
      title: 'Daily Check-in',
      persona: 'Busy Member',
      description: "A two-minute reflection that turns today's signals into a realistic next step.",
      estimatedTime: '1.8 Minutes',
      avgCompletionRate: '86%',
      frictionPoint: 'Choosing a mood when energy feels mixed.',
      steps: [
        {
          id: 'check-in-1',
          stepNumber: '01',
          screenName: 'Today Overview',
          userAction: 'Taps the daily check-in card',
          systemResponse: 'Opens a short reflection with current recovery context',
          nodeType: 'screen',
        },
        {
          id: 'check-in-2',
          stepNumber: '02',
          screenName: 'Energy & Mood',
          userAction: 'Selects energy level and mood',
          systemResponse: 'Suggests a light, moderate, or restorative goal',
          nodeType: 'action',
        },
        {
          id: 'check-in-3',
          stepNumber: '03',
          screenName: 'Personalized Plan',
          userAction: 'Reviews and accepts the suggested focus',
          systemResponse: "Updates today's plan and schedules an optional reminder",
          nodeType: 'outcome',
          isKeyMilestone: true,
        },
      ],
    },
    {
      id: 'connect-device',
      title: 'Connect a Health Device',
      persona: 'New Member',
      description:
        'Connect one trusted source and control exactly which signals HealthSync receives.',
      estimatedTime: '2.5 Minutes',
      avgCompletionRate: '82%',
      frictionPoint: 'Understanding permissions before connecting.',
      steps: [
        {
          id: 'device-1',
          stepNumber: '01',
          screenName: 'Connect Data Source',
          userAction: 'Chooses a wearable or phone source',
          systemResponse: 'Explains supported signals and privacy controls',
          nodeType: 'screen',
        },
        {
          id: 'device-2',
          stepNumber: '02',
          screenName: 'Permission Review',
          userAction: 'Selects activity, sleep, or heart data permissions',
          systemResponse: 'Shows a plain-language preview of how each signal is used',
          nodeType: 'decision',
          decisionOptions: [
            { label: 'Allow selected signals', targetStep: '03' },
            { label: 'Skip for now', targetStep: 'Dashboard' },
          ],
        },
        {
          id: 'device-3',
          stepNumber: '03',
          screenName: 'Sync Complete',
          userAction: 'Confirms the connection',
          systemResponse: 'Imports the latest data and refreshes the daily snapshot',
          nodeType: 'outcome',
          isKeyMilestone: true,
        },
      ],
    },
    {
      id: 'understand-insight',
      title: 'Understand an Insight',
      persona: 'Returning Member',
      description: 'Explore a trend, see its contributing signals, and choose a useful response.',
      estimatedTime: '45 Seconds',
      avgCompletionRate: '91%',
      frictionPoint: 'Separating correlation from a medical diagnosis.',
      steps: [
        {
          id: 'insight-1',
          stepNumber: '01',
          screenName: 'Insight Card',
          userAction: 'Taps a change in the weekly trend',
          systemResponse: 'Opens a summary with the signals behind the change',
          nodeType: 'screen',
        },
        {
          id: 'insight-2',
          stepNumber: '02',
          screenName: 'Signal Detail',
          userAction: 'Reviews sleep, activity, and mood context',
          systemResponse: 'Explains patterns and clearly labels uncertainty',
          nodeType: 'action',
        },
        {
          id: 'insight-3',
          stepNumber: '03',
          screenName: 'Next Step',
          userAction: 'Saves a small experiment for the next week',
          systemResponse: 'Adds the experiment to the goal plan with a review date',
          nodeType: 'outcome',
          isKeyMilestone: true,
        },
      ],
    },
  ],
};

export const HEALTHSYNC_WIREFRAMES_DATA: UIUXWireframesData = {
  projectName: 'HealthSync',
  badgeText: 'WIREFRAMES',
  category: 'Wireframing & Calm Information Hierarchy',
  description:
    'Structural blueprints for a glanceable health home, transparent insight details, and low-pressure goal setting.',
  activeScreenId: 'daily-home',
  designSystemSpecs: {
    gridSystem: '4-column mobile grid (16px margins, 12px gutter)',
    typographyScale: 'Major Third (1.250) with 16px base',
    spacingUnit: '8px baseline grid',
    touchTargetMin: '44 x 44 dp minimum interactive area',
  },
  screens: [
    {
      id: 'daily-home',
      title: 'Today Home',
      fidelity: 'Mid-Fidelity',
      deviceTarget: 'iOS / Android (390 x 844 px)',
      description:
        'A calm daily snapshot prioritizing recovery, one next step, and recent progress.',
      layoutGrid: 'Scrollable single-column stack with persistent bottom navigation',
      componentsUsed: [
        'Greeting Header',
        'Recovery Score',
        'Daily Focus Card',
        'Signal Summary',
        'Bottom Navigation',
      ],
      annotations: [
        {
          id: 'home-ann-1',
          number: 1,
          title: 'Recovery Context',
          description: 'Shows a plain-language recovery status before asking the member to act.',
          xPercentage: 50,
          yPercentage: 22,
        },
        {
          id: 'home-ann-2',
          number: 2,
          title: 'One Useful Focus',
          description: "Limits the next action to one achievable focus based on today's signals.",
          xPercentage: 50,
          yPercentage: 45,
        },
        {
          id: 'home-ann-3',
          number: 3,
          title: 'Signal Summary',
          description:
            'Lets members scan contributing signals without opening a dense analytics view.',
          xPercentage: 50,
          yPercentage: 72,
        },
      ],
    },
    {
      id: 'insight-detail',
      title: 'Insight Detail',
      fidelity: 'High-Fidelity',
      deviceTarget: 'iOS / Android (390 x 844 px)',
      description:
        'An explainable trend view connecting changes to context without presenting diagnosis.',
      layoutGrid: 'Fixed context header with vertically stacked evidence sections',
      componentsUsed: [
        'Trend Header',
        'Signal Comparison',
        'Context Chips',
        'Uncertainty Note',
        'Save Experiment CTA',
      ],
      annotations: [
        {
          id: 'insight-ann-1',
          number: 1,
          title: 'Trend Summary',
          description: 'Names the observed change and its time window before showing the chart.',
          xPercentage: 50,
          yPercentage: 20,
        },
        {
          id: 'insight-ann-2',
          number: 2,
          title: 'Contributing Signals',
          description: 'Compares sleep, activity, and mood in a readable evidence stack.',
          xPercentage: 50,
          yPercentage: 50,
        },
        {
          id: 'insight-ann-3',
          number: 3,
          title: 'Gentle Next Step',
          description: 'Offers a reversible experiment instead of an alarmist recommendation.',
          xPercentage: 50,
          yPercentage: 86,
        },
      ],
    },
    {
      id: 'goal-plan',
      title: 'Goal Plan',
      fidelity: 'Low-Fidelity',
      deviceTarget: 'iOS / Android (390 x 844 px)',
      description: 'A flexible plan builder for choosing a small, sustainable behavior change.',
      layoutGrid: 'Two-step form with sticky review action',
      componentsUsed: [
        'Goal Type Selector',
        'Flexible Target Stepper',
        'Reminder Toggle',
        'Review Summary',
      ],
      annotations: [
        {
          id: 'goal-ann-1',
          number: 1,
          title: 'Goal Type Selector',
          description: "Starts from the member's intention rather than a fixed performance metric.",
          xPercentage: 50,
          yPercentage: 25,
        },
        {
          id: 'goal-ann-2',
          number: 2,
          title: 'Flexible Target',
          description:
            'Uses a range and recovery-aware language to avoid all-or-nothing failure states.',
          xPercentage: 50,
          yPercentage: 55,
        },
        {
          id: 'goal-ann-3',
          number: 3,
          title: 'Reminder Control',
          description:
            'Makes notifications optional and easy to pause from the same planning surface.',
          xPercentage: 50,
          yPercentage: 78,
        },
      ],
    },
  ],
};

export const HEALTHSYNC_PROTOTYPE_DATA: UIUXPrototypeData = {
  projectName: 'HealthSync',
  badgeText: 'PROTOTYPE',
  category: 'High-Fidelity Wellness Interaction Design',
  description:
    'A high-fidelity prototype for the daily check-in, explainable insights, and adaptive goal-setting experience.',
  deviceFrame: 'Apple iPhone 15 (390 x 844 px)',
  defaultScreenId: 'proto-home',
  figmaEmbedUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com',
  screens: [
    {
      id: 'proto-home',
      name: 'Today Home',
      type: 'Home',
      description: 'Daily health snapshot with recovery context and a suggested focus.',
      hotspots: [
        {
          id: 'home-h1',
          label: 'Open Daily Check-in',
          actionType: 'Tap',
          targetScreenId: 'proto-check-in',
          position: { xPercentage: 10, yPercentage: 37, widthPercentage: 80, heightPercentage: 12 },
        },
        {
          id: 'home-h2',
          label: 'Open Insight',
          actionType: 'Tap',
          targetScreenId: 'proto-insight',
          position: { xPercentage: 10, yPercentage: 62, widthPercentage: 80, heightPercentage: 12 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Pull-to-refresh',
          effect: 'Soft progress shimmer while connected signals update',
          duration: '500ms',
        },
      ],
    },
    {
      id: 'proto-check-in',
      name: 'Daily Check-in',
      type: 'Analytics',
      description: "Short mood and energy reflection that shapes the member's daily focus.",
      hotspots: [
        {
          id: 'check-in-h1',
          label: 'Choose Energy',
          actionType: 'Tap',
          targetScreenId: 'proto-plan',
          position: { xPercentage: 10, yPercentage: 34, widthPercentage: 80, heightPercentage: 15 },
        },
        {
          id: 'check-in-h2',
          label: 'Back to Today',
          actionType: 'Tap',
          targetScreenId: 'proto-home',
          position: { xPercentage: 5, yPercentage: 5, widthPercentage: 18, heightPercentage: 5 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Mood Selection',
          effect: 'Color and copy shift to acknowledge the selected feeling',
          duration: '180ms',
        },
      ],
    },
    {
      id: 'proto-insight',
      name: 'Insight Detail',
      type: 'Analytics',
      description: 'Trend explanation connecting sleep, activity, and mood context.',
      hotspots: [
        {
          id: 'insight-h1',
          label: 'Try a Small Experiment',
          actionType: 'Tap',
          targetScreenId: 'proto-plan',
          position: { xPercentage: 10, yPercentage: 82, widthPercentage: 80, heightPercentage: 10 },
        },
        {
          id: 'insight-h2',
          label: 'Back to Today',
          actionType: 'Tap',
          targetScreenId: 'proto-home',
          position: { xPercentage: 5, yPercentage: 5, widthPercentage: 18, heightPercentage: 5 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Signal Select',
          effect: 'Chart emphasis transitions to the selected contributing signal',
          duration: '240ms',
        },
      ],
    },
    {
      id: 'proto-plan',
      name: 'Personalized Plan',
      type: 'Success',
      description: 'Review and save one flexible next step for the week ahead.',
      hotspots: [
        {
          id: 'plan-h1',
          label: 'Save My Focus',
          actionType: 'Tap',
          targetScreenId: 'proto-home',
          position: { xPercentage: 10, yPercentage: 82, widthPercentage: 80, heightPercentage: 10 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Plan Saved',
          effect: 'Gentle confirmation pulse and focus card update on the home screen',
          duration: '450ms',
        },
      ],
    },
  ],
};
