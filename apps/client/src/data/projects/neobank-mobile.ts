import neobankHeroImg from '@/assets/images/neobank-mobile-hero.png';
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

// --- USER FLOW TYPES ---

export type FlowNodeType = 'screen' | 'decision' | 'action' | 'outcome';

export interface UserFlowStep {
  id: string;
  stepNumber: string;
  screenName: string;
  userAction: string;
  systemResponse: string;
  nodeType?: FlowNodeType;
  isKeyMilestone?: boolean;
  decisionOptions?: {
    label: string;
    targetStep: string;
  }[];
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

export interface UIUXUserFlowData {
  projectName: string;
  badgeText: string;
  category: string;
  description: string;
  totalFlowsCount: number;
  activeFlowId: string;
  userFlows: UserFlow[];
}

// --- WIREFRAMES TYPES ---

export interface WireframeAnnotation {
  id: string;
  number: number;
  title: string;
  description: string;
  xPercentage: number;
  yPercentage: number;
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
  annotations: WireframeAnnotation[];
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

// --- INTERACTIVE PROTOTYPE TYPES ---

export interface InteractiveHotspot {
  id: string;
  label: string;
  actionType: 'Tap' | 'Swipe' | 'Long Press' | 'Biometric';
  targetScreenId: string;
  position: {
    xPercentage: number;
    yPercentage: number;
    widthPercentage: number;
    heightPercentage: number;
  };
}

export interface MicroInteraction {
  trigger: string;
  effect: string;
  duration: string;
}

export interface PrototypeScreen {
  id: string;
  name: string;
  type: 'Home' | 'Analytics' | 'Cards' | 'Transfer' | 'Success';
  description: string;
  hotspots: InteractiveHotspot[];
  microInteractions: MicroInteraction[];
}

export interface UIUXPrototypeData {
  projectName: string;
  badgeText: string;
  category: string;
  description: string;
  deviceFrame: string;
  defaultScreenId: string;
  figmaEmbedUrl?: string;
  protopieUrl?: string;
  screens: PrototypeScreen[];
}

// --- NEOBANK MOBILE OVERVIEW DATA ---

export const NEOBANK_MOBILE_OVERVIEW_DATA: UIUXProjectOverviewData = {
  projectName: 'NEOBANK MOBILE',
  badgeText: 'UI/UX DESIGN',
  status: 'Completed',
  category: 'Fintech / Mobile App Design',
  tagline: 'Next-generation digital banking experience engineered for Gen-Z and Millennials.',
  description:
    'End-to-end product design for a mobile-first banking app offering instant transfers, real-time spending insights, multi-currency wallets, and AI-driven budgeting tools.',
  heroImageUrl: neobankHeroImg,
  metadata: [
    { label: 'Role', value: 'Lead Product Designer' },
    { label: 'Timeline', value: '3 Months (Q1 2026)' },
    { label: 'Platform', value: 'iOS & Android (Mobile)' },
    { label: 'Team', value: '2 Designers, 4 Devs, 1 PM' },
  ],
  metrics: [
    {
      label: 'App Store Rating',
      value: '4.9 / 5',
      change: '+0.4 vs Legacy',
      description: 'Based on over 12,000 user reviews post-relaunch.',
    },
    {
      label: 'User Retention (30d)',
      value: '68%',
      change: '+22%',
      description: 'Significant boost following intuitive onboarding flow.',
    },
    {
      label: 'Avg. Transfer Time',
      value: '4.2s',
      change: '-60%',
      description: 'Redesigned quick-pay flow reduced interaction steps.',
    },
  ],
  problemStatement:
    'Traditional banking applications suffer from convoluted navigation, cluttered dashboards, and slow transaction flows. Younger demographics struggle to gain meaningful clarity over their personal finances, leading to low engagement and high churn.',
  solutionStatement:
    'NeoBank Mobile reimagines daily finance with a hyper-clean visual language, gesture-driven card controls, transparent micro-analytics, and a friction-free peer-to-peer payment architecture.',
  designProcess: [
    {
      step: '01',
      title: 'Empathize & Research',
      description:
        'Conducted 18 user interviews and competitor benchmarking to uncover financial anxiety triggers and navigation bottlenecks.',
    },
    {
      step: '02',
      title: 'Information Architecture',
      description:
        'Streamlined app hierarchy from 6 top-level tabs down to 3 core hubs: Home, Analytics, and Cards.',
    },
    {
      step: '03',
      title: 'Wireframing & Flow',
      description:
        'Created low-fidelity interactive wireframes to validate key user journeys including P2P transfer and bill splitting.',
    },
    {
      step: '04',
      title: 'Visual Identity & System',
      description:
        'Developed a high-contrast dark theme, fluid micro-interactions, and a cohesive design component library in Figma.',
    },
    {
      step: '05',
      title: 'Usability Testing',
      description:
        'Ran unmoderated usability tests with 25 participants, reaching a 94% task completion rate on first attempt.',
    },
  ],
  keyFeatures: [
    {
      title: 'Real-Time Micro Analytics',
      description:
        'Instant categorised breakdown of daily spending with interactive visual charts and monthly budget targets.',
      icon: 'TrendingUp',
    },
    {
      title: 'Instant P2P Micro-Transfers',
      description:
        'Send money via contact list or QR code with zero friction and instant biometric verification.',
      icon: 'Zap',
    },
    {
      title: 'Virtual & Physical Card Hub',
      description:
        'Freeze cards, generate single-use virtual cards for secure online shopping, and change PINs instantly.',
      icon: 'CreditCard',
    },
    {
      title: 'Smart Savings Vaults',
      description:
        'Automated spare-change roundups and scheduled automated deposits toward custom savings goals.',
      icon: 'ShieldCheck',
    },
  ],
  colorPalette: [
    { name: 'Electric Purple', hex: '#8B5CF6' },
    { name: 'Neon Emerald', hex: '#10B981' },
    { name: 'Deep Carbon', hex: '#0F172A' },
    { name: 'Pure White', hex: '#FFFFFF' },
  ],
  tools: ['Figma', 'Protopie', 'Adobe Illustrator', 'Maze', 'Miro'],
};

// --- NEOBANK MOBILE USER FLOW DATA ---

export const NEOBANK_MOBILE_USER_FLOW_DATA: UIUXUserFlowData = {
  projectName: 'NEOBANK MOBILE',
  badgeText: 'UI/UX USER FLOW',
  category: 'Information Architecture & Interaction Design',
  description:
    'Map of critical user journeys optimized for zero-friction navigation, minimal tap-depth, and clear error recovery paths.',
  totalFlowsCount: 3,
  activeFlowId: 'p2p-transfer',
  userFlows: [
    {
      id: 'p2p-transfer',
      title: 'Instant P2P Money Transfer',
      persona: 'Existing Account Holder (Gen-Z)',
      description:
        'Primary transaction path enabling users to send money to nearby contacts or handles in under 5 seconds with biometric authorization.',
      estimatedTime: '4.2 Seconds',
      avgCompletionRate: '96.8%',
      frictionPoint: 'Recipient verification during first-time transfers.',
      steps: [
        {
          id: 'step-1',
          stepNumber: '01',
          screenName: 'Dashboard Home',
          userAction: 'Taps quick action button "Send Money"',
          systemResponse: 'Opens recipient selector drawer with recent & frequent contacts',
          nodeType: 'screen',
        },
        {
          id: 'step-2',
          stepNumber: '02',
          screenName: 'Recipient Selection',
          userAction: 'Selects contact or inputs phone number / QR code',
          systemResponse: 'Queries bank registry & displays recipient account name and avatar',
          nodeType: 'action',
        },
        {
          id: 'step-3',
          stepNumber: '03',
          screenName: 'Amount Input Screen',
          userAction: 'Enters transfer amount & optional note/emoji',
          systemResponse: 'Validates available balance and calculates real-time fee ($0.00)',
          nodeType: 'screen',
        },
        {
          id: 'step-4',
          stepNumber: '04',
          screenName: 'Security Check Node',
          userAction: 'Triggers "Confirm & Pay"',
          systemResponse: 'Checks biometric availability (FaceID / Fingerprint)',
          nodeType: 'decision',
          decisionOptions: [
            { label: 'Biometric Passed', targetStep: '05' },
            { label: 'Biometric Failed / Off', targetStep: '04b (PIN Fallback)' },
          ],
        },
        {
          id: 'step-5',
          stepNumber: '05',
          screenName: 'Transfer Success Screen',
          userAction: 'Views instant receipt & auto-generated transaction summary',
          systemResponse: 'Sends push notification to sender & recipient simultaneously',
          nodeType: 'outcome',
          isKeyMilestone: true,
        },
      ],
    },
    {
      id: 'kyc-onboarding',
      title: 'Seamless KYC Onboarding',
      persona: 'New Unbanked Applicant',
      description:
        'Frictionless registration journey leveraging OCR ID scanning and liveness detection to verify identity in under 2 minutes.',
      estimatedTime: '1.8 Minutes',
      avgCompletionRate: '88.4%',
      frictionPoint: 'Document photo clarity on low-light camera environments.',
      steps: [
        {
          id: 'step-1',
          stepNumber: '01',
          screenName: 'Welcome & Phone Auth',
          userAction: 'Inputs mobile number & verifies SMS OTP code',
          systemResponse: 'Creates temporary session & loads KYC step tracker',
          nodeType: 'screen',
        },
        {
          id: 'step-2',
          stepNumber: '02',
          screenName: 'ID Scan Camera View',
          userAction: 'Captures front & back of National ID / Passport',
          systemResponse: 'Runs auto-cropping OCR to pre-fill name, DOB, and ID number',
          nodeType: 'action',
        },
        {
          id: 'step-3',
          stepNumber: '03',
          screenName: 'Liveness Selfie Check',
          userAction: 'Follows circular frame prompts (Blink & Smile)',
          systemResponse: 'Validates facial biometric match against ID document photo',
          nodeType: 'decision',
          decisionOptions: [
            { label: 'Match Confidence > 95%', targetStep: '04' },
            { label: 'Match Confidence < 95%', targetStep: 'Manual Verification Flag' },
          ],
        },
        {
          id: 'step-4',
          stepNumber: '04',
          screenName: 'Account Ready & Virtual Card Issuance',
          userAction: 'Sets 6-digit Security PIN and enables FaceID',
          systemResponse: 'Generates instant virtual card and unlocks dashboard access',
          nodeType: 'outcome',
          isKeyMilestone: true,
        },
      ],
    },
    {
      id: 'virtual-card-gen',
      title: 'Disposable Virtual Card Generation',
      persona: 'Privacy-Conscious Online Shopper',
      description:
        'On-demand single-use virtual card creation for secure online purchases with auto-expiry and custom spending limits.',
      estimatedTime: '8.0 Seconds',
      avgCompletionRate: '98.1%',
      frictionPoint: 'Understanding single-use auto-destruction policy.',
      steps: [
        {
          id: 'step-1',
          stepNumber: '01',
          screenName: 'Cards Management Hub',
          userAction: 'Swipes to "Virtual Cards" tab and taps "+ New Card"',
          systemResponse:
            'Presents card type choices: Standard Disposable vs Recurring Subscription',
          nodeType: 'screen',
        },
        {
          id: 'step-2',
          stepNumber: '02',
          screenName: 'Card Configuration',
          userAction: 'Sets nickname, spending cap, and expiry date',
          systemResponse: 'Calculates virtual token allocation and security policy',
          nodeType: 'action',
        },
        {
          id: 'step-3',
          stepNumber: '03',
          screenName: 'Biometric Confirmation',
          userAction: 'Authenticates with Face ID',
          systemResponse: 'Encrypts card details and generates dynamic CVV',
          nodeType: 'decision',
        },
        {
          id: 'step-4',
          stepNumber: '04',
          screenName: 'Active Card Display',
          userAction: 'Taps "Copy Card Number" for immediate online checkout',
          systemResponse: 'Displays animated 3D card preview with dynamic copy-to-clipboard toast',
          nodeType: 'outcome',
          isKeyMilestone: true,
        },
      ],
    },
  ],
};

// --- NEOBANK MOBILE WIREFRAMES DATA ---

export const NEOBANK_MOBILE_WIREFRAMES_DATA: UIUXWireframesData = {
  projectName: 'NEOBANK MOBILE',
  badgeText: 'UI/UX WIREFRAMES',
  category: 'Wireframing & Structural Layout Architecture',
  description:
    'Structural blueprints and ergonomic layout schematics defining element hierarchy, spatial distribution, and gesture-first component placement.',
  activeScreenId: 'home-dashboard',
  designSystemSpecs: {
    gridSystem: '4-Column Mobile Grid (16px Margin, 12px Gutter)',
    typographyScale: 'Major Third (1.200) Base 14px',
    spacingUnit: '8px Baseline Grid System',
    touchTargetMin: '44x44 dp Minimum Interactive Area',
  },
  screens: [
    {
      id: 'home-dashboard',
      title: 'Main Financial Dashboard',
      fidelity: 'Mid-Fidelity',
      deviceTarget: 'iOS / Android (393 x 852 px)',
      description:
        'Central hub displaying combined account balance, quick action bar, spend trend sparklines, and recent activity feed.',
      layoutGrid: 'Single Column Scrollable Stack with Sticky Header',
      componentsUsed: [
        'Balance Card',
        'Quick Action Matrix',
        'Sparkline Widget',
        'Transaction List Item',
        'Bottom Navigation',
      ],
      annotations: [
        {
          id: 'ann-1',
          number: 1,
          title: 'Total Balance Hero Widget',
          description:
            'High-contrast typography showing total liquidity with instant toggle for hiding visibility.',
          xPercentage: 50,
          yPercentage: 20,
        },
        {
          id: 'ann-2',
          number: 2,
          title: 'Thumb-Zone Action Bar',
          description:
            'Horizontal quick-pay, request, and top-up buttons placed in primary ergonomic sweep range.',
          xPercentage: 50,
          yPercentage: 42,
        },
        {
          id: 'ann-3',
          number: 3,
          title: 'Categorized Activity Stream',
          description:
            'Virtual infinite scroll feed featuring dynamic merchant icons and transaction state tags.',
          xPercentage: 50,
          yPercentage: 70,
        },
      ],
    },
    {
      id: 'transfer-flow',
      title: 'P2P Amount & Recipient Selection',
      fidelity: 'Mid-Fidelity',
      deviceTarget: 'iOS / Android (393 x 852 px)',
      description:
        'Focus-mode transaction interface prioritizing key numeric inputs, currency conversion badges, and contact presets.',
      layoutGrid: '2-Section Fixed Header with Custom Keypad Spacer',
      componentsUsed: [
        'Recipient Header Chip',
        'Dynamic Numpad Input',
        'Balance Checker Toast',
        'CTA Button Bar',
      ],
      annotations: [
        {
          id: 'ann-1',
          number: 1,
          title: 'Recipient Context Header',
          description:
            'Displays verified user avatar, security score, and account handle to eliminate transfer errors.',
          xPercentage: 50,
          yPercentage: 18,
        },
        {
          id: 'ann-2',
          number: 2,
          title: 'Auto-Scaling Currency Display',
          description:
            'Font size scales down dynamically from 48pt as digit count increases to prevent truncation.',
          xPercentage: 50,
          yPercentage: 38,
        },
        {
          id: 'ann-3',
          number: 3,
          title: 'Biometric Trigger Call-to-Action',
          description:
            'Sticky bottom button with integrated haptic feedback prompt and instant face ID scan loader.',
          xPercentage: 50,
          yPercentage: 88,
        },
      ],
    },
    {
      id: 'cards-hub',
      title: 'Card Management & Security Control',
      fidelity: 'Low-Fidelity',
      deviceTarget: 'iOS / Android (393 x 852 px)',
      description:
        'Carousel view for physical and disposable virtual cards with instant freeze toggles and security controls.',
      layoutGrid: 'Horizontal Paginated Carousel + Vertical Settings List',
      componentsUsed: [
        '3D Tilt Card Component',
        'Toggle Switch Cell',
        'CVV Masked Field',
        'Action List Section',
      ],
      annotations: [
        {
          id: 'ann-1',
          number: 1,
          title: 'Swipeable Card Deck',
          description:
            '3D stacked carousel with active indicator dots and real-time freeze mask state overlay.',
          xPercentage: 50,
          yPercentage: 25,
        },
        {
          id: 'ann-2',
          number: 2,
          title: 'Instant Freeze Switch',
          description:
            'Hardware-level card block switch triggering instant websocket lock state on payment gateway.',
          xPercentage: 80,
          yPercentage: 50,
        },
        {
          id: 'ann-3',
          number: 3,
          title: 'Spending Limits Control Slider',
          description:
            'Granular slider for online shopping caps, ATM withdrawal limits, and international payments.',
          xPercentage: 50,
          yPercentage: 75,
        },
      ],
    },
  ],
};

// --- NEOBANK MOBILE PROTOTYPE DATA ---

export const NEOBANK_MOBILE_PROTOTYPE_DATA: UIUXPrototypeData = {
  projectName: 'NEOBANK MOBILE',
  badgeText: 'UI/UX INTERACTIVE PROTOTYPE',
  category: 'High-Fidelity Interaction Design & Motion Graphics',
  description:
    'Fully dynamic high-fidelity prototype simulating gesture controls, micro-animations, real-time biometric feedback, and instant state transitions.',
  deviceFrame: 'Apple iPhone 15 Pro (393 x 852 px)',
  defaultScreenId: 'proto-home',
  figmaEmbedUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com',
  protopieUrl: 'https://cloud.protopie.io',
  screens: [
    {
      id: 'proto-home',
      name: 'Main Dashboard',
      type: 'Home',
      description:
        'Primary launcher displaying active card, total balance quick-toggle, spending velocity graph, and quick transfer shortcuts.',
      hotspots: [
        {
          id: 'hs-1',
          label: 'Quick Pay "Send"',
          actionType: 'Tap',
          targetScreenId: 'proto-transfer',
          position: { xPercentage: 20, yPercentage: 42, widthPercentage: 25, heightPercentage: 8 },
        },
        {
          id: 'hs-2',
          label: 'Cards Management',
          actionType: 'Tap',
          targetScreenId: 'proto-cards',
          position: { xPercentage: 50, yPercentage: 92, widthPercentage: 20, heightPercentage: 6 },
        },
        {
          id: 'hs-3',
          label: 'Analytics Tab',
          actionType: 'Tap',
          targetScreenId: 'proto-analytics',
          position: { xPercentage: 25, yPercentage: 92, widthPercentage: 20, heightPercentage: 6 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Pull-to-refresh',
          effect: 'Spring physics balance update with haptic feedback bump',
          duration: '350ms',
        },
        {
          trigger: 'Card Tap',
          effect: '3D perspective tilt with dynamic gloss sheen overlay',
          duration: '200ms',
        },
      ],
    },
    {
      id: 'proto-transfer',
      name: 'P2P Instant Transfer',
      type: 'Transfer',
      description:
        'Numeric keypad input screen featuring auto-formatting monetary digits, dynamic fee counter, and biometric confirmation modal.',
      hotspots: [
        {
          id: 'hs-4',
          label: 'Biometric Pay CTA',
          actionType: 'Biometric',
          targetScreenId: 'proto-success',
          position: { xPercentage: 10, yPercentage: 85, widthPercentage: 80, heightPercentage: 9 },
        },
        {
          id: 'hs-5',
          label: 'Back to Dashboard',
          actionType: 'Tap',
          targetScreenId: 'proto-home',
          position: { xPercentage: 5, yPercentage: 4, widthPercentage: 15, heightPercentage: 5 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Keypad Tap',
          effect: 'Subtle scale compression (0.95x) with soft keypress audio feedback',
          duration: '80ms',
        },
        {
          trigger: 'Biometric Trigger',
          effect: 'Radial FaceID scan ring expansion with success particle swirl',
          duration: '600ms',
        },
      ],
    },
    {
      id: 'proto-success',
      name: 'Transfer Confirmation',
      type: 'Success',
      description:
        'Delightful success state screen with dynamic confetti burst, digital receipt drawer, and instant PDF download trigger.',
      hotspots: [
        {
          id: 'hs-6',
          label: 'Return to Home',
          actionType: 'Tap',
          targetScreenId: 'proto-home',
          position: { xPercentage: 10, yPercentage: 88, widthPercentage: 80, heightPercentage: 8 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Screen Load',
          effect: 'Lottie checkmark animation paired with dual-stage haptic vibration',
          duration: '1200ms',
        },
      ],
    },
    {
      id: 'proto-analytics',
      name: 'Spend Analytics Hub',
      type: 'Analytics',
      description:
        'Interactive bar chart breakdown of monthly spending habits with pinch-to-zoom timeline scale.',
      hotspots: [
        {
          id: 'hs-7',
          label: 'Home Tab',
          actionType: 'Tap',
          targetScreenId: 'proto-home',
          position: { xPercentage: 5, yPercentage: 92, widthPercentage: 20, heightPercentage: 6 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Chart Bar Select',
          effect: 'Tooltip pop-over with smooth cubic-bezier height morphing',
          duration: '250ms',
        },
      ],
    },
    {
      id: 'proto-cards',
      name: 'Virtual Card Hub',
      type: 'Cards',
      description:
        'Swipeable card wallet enabling instant freeze state toggles and dynamic disposable CVV generation.',
      hotspots: [
        {
          id: 'hs-8',
          label: 'Home Tab',
          actionType: 'Tap',
          targetScreenId: 'proto-home',
          position: { xPercentage: 5, yPercentage: 92, widthPercentage: 20, heightPercentage: 6 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Card Freeze Toggle',
          effect: 'Desaturation filter blur transition over card graphics',
          duration: '300ms',
        },
      ],
    },
  ],
};
