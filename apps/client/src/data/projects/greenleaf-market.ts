// Re-export all types from lumina-studio to avoid duplication
export type {
  BrandGradient,
  BrandingColorPaletteData,
  BrandingGuidelinesData,
  BrandingMetric,
  BrandingMockupsData,
  BrandingOverviewData,
  BrandPillar,
  ColorContrastPair,
  ColorSwatch,
  DeliverableItem,
  GuidelineArtDirection,
  GuidelineColorPaletteRule,
  GuidelineLogoRule,
  GuidelinePrinciple,
  GuidelineTypographyRule,
  MockupCategoryFilter,
  MockupItem,
} from './lumina-studio';

import type {
  BrandingColorPaletteData,
  BrandingGuidelinesData,
  BrandingMockupsData,
  BrandingOverviewData,
} from './lumina-studio';

// --- GREENLEAF MARKET OVERVIEW DATA ---

export const GREENLEAF_MARKET_OVERVIEW_DATA: BrandingOverviewData = {
  projectName: 'GreenLeaf Market',
  tagline:
    'Community-focused organic market rebrand emphasizing fresh, local, and sustainable produce.',
  category: 'Branding & Visual Identity',
  client: 'GreenLeaf Market Network',
  industry: 'Retail / Organic & Local Produce',
  year: '2025',
  duration: '9 Weeks',
  status: 'Completed',
  heroBanner: {
    badge: 'Organic Market Rebrand',
    description:
      'GreenLeaf Market transformed its brand identity to better reflect its commitment to organic, locally-sourced products and community connection.',
  },
  metrics: [
    {
      label: 'Customer Loyalty',
      value: '+156%',
      subtext: 'Increased loyalty program signups post-rebrand',
      trend: '+156%',
    },
    {
      label: 'Foot Traffic',
      value: '+48%',
      subtext: 'Store visits increase in the first three months',
      trend: '+48%',
    },
    {
      label: 'Local Vendors',
      value: '89',
      subtext: 'New local producer partnerships created',
    },
    {
      label: 'Community Events',
      value: '24',
      subtext: 'Monthly events hosted in market locations',
    },
  ],
  executiveSummary: {
    challenge:
      'GreenLeaf Market faced competition from larger chains and needed to strengthen its community identity and emphasize its unique commitment to local, organic products.',
    strategy:
      'We created a warm, welcoming visual identity centered around the concept of community and sustainability, using natural elements and earthy tones to convey authenticity and organic values.',
    outcome:
      'The rebrand successfully positioned GreenLeaf Market as the community choice for organic, locally-sourced products, driving significant increases in customer engagement and store traffic.',
  },
  brandPillars: [
    {
      title: 'Community Connection',
      description: 'Strong ties to local farmers, producers, and neighborhood residents.',
      tag: 'Community',
    },
    {
      title: 'Organic Integrity',
      description: 'Unwavering commitment to certified organic and sustainable farming practices.',
      tag: 'Sustainability',
    },
    {
      title: 'Local First Philosophy',
      description: 'Prioritizing locally-sourced products and supporting regional suppliers.',
      tag: 'Local',
    },
  ],
  deliverables: [
    {
      category: 'Brand Strategy & Identity',
      items: [
        'Brand Positioning & Narrative',
        'Logo System with Variations',
        'Brand Promise & Values',
        'Messaging Architecture',
      ],
    },
    {
      category: 'Visual System & Tokens',
      items: [
        'Color Palette & Usage Guide',
        'Custom Typography',
        'Iconography System',
        'Illustration Style Guide',
      ],
    },
    {
      category: 'Touchpoints & Execution',
      items: [
        'Signage & Store Branding',
        'Packaging & Labels',
        'Digital Presence Guidelines',
        'Community Event Materials',
      ],
    },
  ],
  testimonial: {
    quote:
      'The rebrand captured the heart of what GreenLeaf Market stands for—community, quality, and sustainability. It has brought our stores and customers closer together.',
    author: 'Sarah Mitchell',
    role: 'Regional Manager',
    company: 'GreenLeaf Market Network',
  },
};

export const GREENLEAF_MARKET_GUIDELINES_DATA: BrandingGuidelinesData = {
  projectName: 'GreenLeaf Market',
  category: 'Branding & Brand Guidelines',
  version: 'v1.1',
  updatedDate: 'Q1 2025',
  downloadPdfSize: '35.2 MB',
  principles: [
    {
      number: '01',
      title: 'Community Centered',
      description:
        'All brand expressions should reflect the importance of community relationships and local connections.',
    },
    {
      number: '02',
      title: 'Organic Authenticity',
      description:
        'Natural, genuine, and truthful representation of products and values without greenwashing.',
    },
    {
      number: '03',
      title: 'Accessible & Warm',
      description: 'Inviting and approachable brand voice that welcomes all community members.',
    },
    {
      number: '04',
      title: 'Local Pride',
      description: 'Celebrate and showcase the farmers, producers, and artisans in our community.',
    },
  ],
  logoRules: [
    {
      id: 'logo-rule-1',
      title: 'Leaf Integration',
      description:
        'The leaf element is integral to the logo and should not be separated from the wordmark.',
      type: 'do',
      spec: 'Logo Integrity',
    },
    {
      id: 'logo-rule-2',
      title: 'Flexible Color Usage',
      description:
        'Logo can appear in full color, monochrome green, or white depending on application.',
      type: 'do',
      spec: 'Color Flexibility',
    },
    {
      id: 'logo-rule-3',
      title: 'No Stylization',
      description: 'Do not add shadows, outlines, or three-dimensional effects to the logo.',
      type: 'dont',
      spec: 'Maintain Simplicity',
    },
  ],
  colorPaletteRules: [
    {
      name: 'Market Green',
      role: 'Primary Brand Color',
      hex: '#2D5016',
      usageRule:
        'Primary color for signage, packaging, and digital branding representing organic nature.',
      isDarkText: false,
    },
    {
      name: 'Harvest Gold',
      role: 'Accent & Warmth',
      hex: '#D4A574',
      usageRule: 'Used for highlights, CTAs, and to add warmth suggesting abundant harvest.',
      isDarkText: true,
    },
    {
      name: 'Natural Cream',
      role: 'Background & Accessibility',
      hex: '#FFFAF0',
      usageRule: 'Light background for easy readability and natural aesthetic.',
      isDarkText: true,
    },
  ],
  typographyRules: [
    {
      fontFamily: 'Georgia',
      category: 'Display',
      recommendedWeights: ['Bold (700)', 'Regular (400)'],
      lineHeight: '1.3',
      letterSpacing: '0em',
      bestPractices:
        'Use for main headlines to convey established trust and reliability of the brand.',
    },
  ],
  artDirection: [
    {
      title: 'Product Photography',
      description: 'Natural, farm-fresh appearance with authentic, unpolished style',
      doText: 'Show produce in natural daylight with actual farmers and community members',
      dontText: 'Avoid overly processed, studio lighting, or artificial arrangements',
    },
  ],
};

export const GREENLEAF_MARKET_COLOR_PALETTE_DATA: BrandingColorPaletteData = {
  projectName: 'GreenLeaf Market',
  category: 'Branding & Color Palette',
  version: 'v1.0',
  updatedDate: 'Feb 2025',
  downloadSwatchesSize: '11.8 MB',
  primaryColors: [
    {
      name: 'Market Green',
      role: 'Primary',
      hex: '#2D5016',
      rgb: 'rgb(45, 80, 22)',
      hsl: 'hsl(101, 57%, 20%)',
      cmyk: '44, 0, 73, 69',
      pantone: '7735 C',
      usage: 'Primary brand color representing organic and natural values',
      isDarkText: false,
    },
  ],
  secondaryColors: [
    {
      name: 'Harvest Gold',
      role: 'Accent',
      hex: '#D4A574',
      rgb: 'rgb(212, 165, 116)',
      hsl: 'hsl(27, 53%, 64%)',
      cmyk: '0, 22, 45, 17',
      usage: 'Accent color for warmth and harvest abundance',
      isDarkText: true,
    },
  ],
  gradients: [
    {
      name: 'Growth Gradient',
      role: 'Hero & Featured Sections',
      cssGradient: 'linear-gradient(135deg, #2D5016 0%, #4A7C2C 100%)',
      stops: ['#2D5016', '#4A7C2C'],
      usage: 'Large sections representing growth and natural abundance',
    },
  ],
  contrastMatrix: [
    {
      bgName: 'Market Green',
      bgHex: '#2D5016',
      fgName: 'Harvest Gold',
      fgHex: '#D4A574',
      ratio: '5.8:1',
      wcagRating: 'AA',
    },
  ],
};

export const GREENLEAF_MARKET_MOCKUPS_DATA: BrandingMockupsData = {
  projectName: 'GreenLeaf Market',
  category: 'Branding & Mockups',
  version: 'v1.0',
  updatedDate: 'Feb 2025',
  downloadKitSize: '1.5 GB',
  totalMockupsCount: 18,
  categories: [
    { id: 'signage', label: 'Out-of-Home', count: 6 },
    { id: 'packaging', label: 'Packaging', count: 5 },
    { id: 'stationery', label: 'Stationery', count: 4 },
    { id: 'digital', label: 'Digital Devices', count: 3 },
  ],
  items: [
    {
      id: 'mockup-1',
      title: 'Market Entrance Signage',
      category: 'Out-of-Home',
      aspectRatio: '16:9',
      dimensions: '2400 × 1350mm',
      format: 'Figma',
      description: 'Large entrance signage with new branding',
      previewGradient: 'linear-gradient(135deg, #2D5016 0%, #4A7C2C 100%)',
      downloadSize: '245 MB',
      tags: ['Signage', 'Exterior', 'Branding'],
      isFeatured: true,
    },
  ],
};
