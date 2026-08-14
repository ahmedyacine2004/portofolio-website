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

// --- NOVA COFFEE OVERVIEW DATA ---

export const NOVA_COFFEE_OVERVIEW_DATA: BrandingOverviewData = {
  projectName: 'Nova Coffee',
  tagline: 'Modern coffee brand rebrand with focus on sustainability and artisanal craftsmanship.',
  category: 'Branding & Visual Identity',
  client: 'Nova Coffee Co.',
  industry: 'Food & Beverage / Specialty Coffee',
  year: '2025',
  duration: '8 Weeks',
  status: 'Completed',
  heroBanner: {
    badge: 'Coffee Brand Transformation',
    description:
      'Nova Coffee underwent a complete visual identity refresh, transitioning from traditional to modern, emphasizing sustainability and artisanal values.',
  },
  metrics: [
    {
      label: 'Brand Perception Shift',
      value: '+128%',
      subtext: 'Modern perception increase among target demographic',
      trend: '+128%',
    },
    {
      label: 'Sales Growth',
      value: '+34%',
      subtext: 'Post-rebrand revenue increase in first quarter',
      trend: 'Strong',
    },
    {
      label: 'Social Media Growth',
      value: '78K',
      subtext: 'New followers across social platforms',
    },
    {
      label: 'Retail Partners',
      value: '127',
      subtext: 'New retail locations adopting the new brand',
    },
  ],
  executiveSummary: {
    challenge:
      'Nova Coffee needed to modernize its brand image to appeal to younger, eco-conscious consumers while maintaining its heritage and artisanal positioning.',
    strategy:
      'We developed a sophisticated visual identity combining natural elements with modern typography, emphasizing sustainability and craft quality through a refined color palette and contemporary design language.',
    outcome:
      'The rebrand successfully positioned Nova Coffee as a premium, modern coffee brand, resulting in significant sales growth and expanded retail distribution.',
  },
  brandPillars: [
    {
      title: 'Artisanal Craft',
      description:
        'Handcrafted, high-quality coffee roasting and preparation methods at the heart of the brand.',
      tag: 'Quality',
    },
    {
      title: 'Sustainability Focus',
      description:
        'Eco-friendly practices and ethical sourcing reflected throughout the visual identity.',
      tag: 'Environment',
    },
    {
      title: 'Modern Sophistication',
      description:
        'Contemporary design language appealing to modern, discerning coffee enthusiasts.',
      tag: 'Design',
    },
  ],
  deliverables: [
    {
      category: 'Brand Strategy & Identity',
      items: [
        'Brand Positioning & Story',
        'Logo Design & Variations',
        'Brand Voice & Messaging',
        'Visual System Guidelines',
      ],
    },
    {
      category: 'Visual System & Tokens',
      items: [
        'Color Palette & Specifications',
        'Typography System',
        'Icon & Pattern Library',
        'Photography Style Guide',
      ],
    },
    {
      category: 'Touchpoints & Execution',
      items: [
        'Packaging Design',
        'Cafe Interior Signage',
        'Digital Experience Guidelines',
        'Marketing Collateral Suite',
      ],
    },
  ],
  testimonial: {
    quote:
      'The rebrand elevated Nova Coffee from a traditional brand to a modern premium player. The visual system is cohesive, beautiful, and perfectly captures our values.',
    author: 'Marcus Chen',
    role: 'Founder & CEO',
    company: 'Nova Coffee Co.',
  },
};

export const NOVA_COFFEE_GUIDELINES_DATA: BrandingGuidelinesData = {
  projectName: 'Nova Coffee',
  category: 'Branding & Brand Guidelines',
  version: 'v1.2',
  updatedDate: 'Q1 2025',
  downloadPdfSize: '38.5 MB',
  principles: [
    {
      number: '01',
      title: 'Artisanal Excellence',
      description:
        'Every brand touchpoint should communicate quality, craftsmanship, and attention to detail.',
    },
    {
      number: '02',
      title: 'Sustainability Values',
      description:
        'Visual elements should reflect environmental consciousness and ethical practices.',
    },
    {
      number: '03',
      title: 'Modern & Approachable',
      description:
        'Contemporary design language that feels accessible and inviting to new customers.',
    },
    {
      number: '04',
      title: 'Authentic Heritage',
      description:
        'Respect and honor the coffee roasting heritage while embracing modern innovation.',
    },
  ],
  logoRules: [
    {
      id: 'logo-rule-1',
      title: 'Clear Space Requirements',
      description:
        'Maintain clear space around the logo equal to the height of the coffee bean element.',
      type: 'do',
      spec: 'Clear Space = 1.0X',
    },
    {
      id: 'logo-rule-2',
      title: 'Minimum Size Requirement',
      description: 'Never use the logo smaller than 40px in digital applications or 25mm in print.',
      type: 'do',
      spec: 'Min Size: 40px / 25mm',
    },
    {
      id: 'logo-rule-3',
      title: 'No Color Alterations',
      description: 'Do not modify colors or apply effects like gradients to the logo mark.',
      type: 'dont',
      spec: 'Strict Color Usage',
    },
  ],
  colorPaletteRules: [
    {
      name: 'Coffee Brown',
      role: 'Primary Brand Color',
      hex: '#6F4E37',
      usageRule: 'Main color for primary brand touchpoints, packaging, and web applications.',
      isDarkText: false,
    },
    {
      name: 'Sage Green',
      role: 'Sustainability Accent',
      hex: '#6B9080',
      usageRule: 'Used to highlight eco-friendly features and sustainability initiatives.',
      isDarkText: false,
    },
    {
      name: 'Cream White',
      role: 'Primary Background',
      hex: '#F5F1E8',
      usageRule: 'Main background color for print and digital materials, creates warm feel.',
      isDarkText: true,
    },
  ],
  typographyRules: [
    {
      fontFamily: 'Playfair Display',
      category: 'Display',
      recommendedWeights: ['Bold (700)', 'SemiBold (600)'],
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
      bestPractices:
        'Use for headlines, logos, and prominent brand messaging to convey sophistication.',
    },
  ],
  artDirection: [
    {
      title: 'Coffee Photography',
      description: 'Use warm, natural lighting that highlights the coffee craftsmanship',
      doText: 'Use golden hour lighting and macro photography',
      dontText: 'Avoid harsh shadows and artificial studio lighting',
    },
  ],
};

export const NOVA_COFFEE_COLOR_PALETTE_DATA: BrandingColorPaletteData = {
  projectName: 'Nova Coffee',
  category: 'Branding & Color Palette',
  version: 'v1.0',
  updatedDate: 'Jan 2025',
  downloadSwatchesSize: '12.3 MB',
  primaryColors: [
    {
      name: 'Coffee Brown',
      role: 'Primary',
      hex: '#6F4E37',
      rgb: 'rgb(111, 78, 55)',
      hsl: 'hsl(24, 34%, 33%)',
      cmyk: '0, 30, 50, 56',
      pantone: '7531 C',
      usage: 'Primary brand color for all main touchpoints',
      isDarkText: false,
    },
  ],
  secondaryColors: [
    {
      name: 'Sage Green',
      role: 'Sustainability',
      hex: '#6B9080',
      rgb: 'rgb(107, 144, 128)',
      hsl: 'hsl(152, 15%, 49%)',
      cmyk: '26, 0, 11, 43',
      usage: 'Accent color for eco-friendly initiatives',
      isDarkText: false,
    },
  ],
  gradients: [
    {
      name: 'Warm Coffee Gradient',
      role: 'Hero Sections',
      cssGradient: 'linear-gradient(135deg, #6F4E37 0%, #8B6F47 100%)',
      stops: ['#6F4E37', '#8B6F47'],
      usage: 'Large background areas and hero sections',
    },
  ],
  contrastMatrix: [
    {
      bgName: 'Coffee Brown',
      bgHex: '#6F4E37',
      fgName: 'Cream White',
      fgHex: '#F5F1E8',
      ratio: '10.2:1',
      wcagRating: 'AAA',
    },
  ],
};

export const NOVA_COFFEE_MOCKUPS_DATA: BrandingMockupsData = {
  projectName: 'Nova Coffee',
  category: 'Branding & Mockups',
  version: 'v1.0',
  updatedDate: 'Jan 2025',
  downloadKitSize: '1.2 GB',
  totalMockupsCount: 15,
  categories: [
    { id: 'stationery', label: 'Stationery', count: 4 },
    { id: 'packaging', label: 'Packaging', count: 5 },
    { id: 'signage', label: 'Out-of-Home', count: 4 },
    { id: 'digital', label: 'Digital Devices', count: 2 },
  ],
  items: [
    {
      id: 'mockup-1',
      title: 'Coffee Bag Packaging',
      category: 'Apparel & Merch',
      aspectRatio: '1:1.5',
      dimensions: '200 × 300mm',
      format: 'Figma',
      description: 'Coffee bean packaging with new branding',
      previewGradient: 'linear-gradient(135deg, #6F4E37 0%, #8B6F47 100%)',
      downloadSize: '156 MB',
      tags: ['Packaging', 'Print', 'Coffee'],
      isFeatured: true,
    },
  ],
};
