// --- BRANDING OVERVIEW TYPES ---

export interface BrandingMetric {
  label: string;
  value: string;
  subtext: string;
  trend?: string;
}

export interface BrandPillar {
  title: string;
  description: string;
  tag: string;
}

export interface DeliverableItem {
  category: string;
  items: string[];
}

export interface BrandingOverviewData {
  projectName: string;
  tagline: string;
  category: string;
  client: string;
  industry: string;
  year: string;
  duration: string;
  status: 'Completed' | 'In Progress' | 'Archived';
  heroBanner: {
    badge: string;
    description: string;
  };
  metrics: BrandingMetric[];
  executiveSummary: {
    challenge: string;
    strategy: string;
    outcome: string;
  };
  brandPillars: BrandPillar[];
  deliverables: DeliverableItem[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

// --- BRANDING GUIDELINES TYPES ---

export interface GuidelinePrinciple {
  number: string;
  title: string;
  description: string;
}

export interface GuidelineLogoRule {
  id: string;
  title: string;
  description: string;
  type: 'do' | 'dont';
  spec?: string;
}

export interface GuidelineColorPaletteRule {
  name: string;
  role: string;
  hex: string;
  usageRule: string;
  isDarkText?: boolean;
}

export interface GuidelineTypographyRule {
  fontFamily: string;
  category: 'Display' | 'Body' | 'Technical / Code';
  recommendedWeights: string[];
  lineHeight: string;
  letterSpacing: string;
  bestPractices: string;
}

export interface GuidelineArtDirection {
  title: string;
  description: string;
  doText: string;
  dontText: string;
}

export interface BrandingGuidelinesData {
  projectName: string;
  category: string;
  version: string;
  updatedDate: string;
  downloadPdfSize: string;
  principles: GuidelinePrinciple[];
  logoRules: GuidelineLogoRule[];
  colorPaletteRules: GuidelineColorPaletteRule[];
  typographyRules: GuidelineTypographyRule[];
  artDirection: GuidelineArtDirection[];
}

// --- BRANDING COLOR PALETTE TYPES ---

export interface ColorSwatch {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  hsl: string;
  cmyk: string;
  pantone?: string;
  usage: string;
  isDarkText?: boolean;
}

export interface BrandGradient {
  name: string;
  role: string;
  cssGradient: string;
  stops: string[];
  usage: string;
}

export interface ColorContrastPair {
  bgName: string;
  bgHex: string;
  fgName: string;
  fgHex: string;
  ratio: string;
  wcagRating: 'AAA' | 'AA' | 'Fail';
}

export interface BrandingColorPaletteData {
  projectName: string;
  category: string;
  version: string;
  updatedDate: string;
  downloadSwatchesSize: string;
  primaryColors: ColorSwatch[];
  secondaryColors: ColorSwatch[];
  gradients: BrandGradient[];
  contrastMatrix: ColorContrastPair[];
}

// --- BRANDING MOCKUPS TYPES ---

export interface MockupItem {
  id: string;
  title: string;
  category: 'Stationery' | 'Digital Devices' | '3D & Spatial' | 'Apparel & Merch' | 'Out-of-Home';
  aspectRatio: string;
  dimensions: string;
  format: 'Figma' | 'PSD' | 'Blender';
  description: string;
  previewGradient: string;
  downloadSize: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface MockupCategoryFilter {
  id: string;
  label: string;
  count: number;
}

export interface BrandingMockupsData {
  projectName: string;
  category: string;
  version: string;
  updatedDate: string;
  downloadKitSize: string;
  totalMockupsCount: number;
  categories: MockupCategoryFilter[];
  items: MockupItem[];
}

// --- LUMINA STUDIO OVERVIEW DATA ---

export const LUMINA_STUDIO_OVERVIEW_DATA: BrandingOverviewData = {
  projectName: 'Lumina Studio',
  tagline: 'Illuminating Digital Identity Through Architecture & Modern Motion',
  category: 'Branding & Visual Identity',
  client: 'Lumina Creative Group',
  industry: 'Creative Agency & Design System Lab',
  year: '2026',
  duration: '10 Weeks',
  status: 'Completed',
  heroBanner: {
    badge: 'Comprehensive Rebrand & Identity System',
    description:
      'Lumina Studio underwent a complete visual transformation—from positioning and tone of voice to a high-contrast dynamic mark, design tokens, and modular brand guidelines.',
  },
  metrics: [
    {
      label: 'Brand Equity Increase',
      value: '+142%',
      subtext: 'Measured via post-rebrand enterprise inbound inquiry volume',
      trend: '+142%',
    },
    {
      label: 'Design System Adoption',
      value: '98.4%',
      subtext: 'Compliance across internal engineering & marketing squads',
      trend: 'Top Tier',
    },
    {
      label: 'Guidelines Usage',
      value: '12.5k',
      subtext: 'Active design token reads across digital brand portals',
    },
    {
      label: 'Deliverables Completed',
      value: '45+',
      subtext: 'Assets ranging from identity marks to motion packages',
    },
  ],
  executiveSummary: {
    challenge:
      'Lumina Studio had outgrown its legacy visual identity. The previous branding failed to convey its evolution into enterprise design engineering, resulting in positioning confusion among high-value client prospects.',
    strategy:
      'We engineered a futuristic, architectural visual system rooted in light refraction, high-contrast typography, and dynamic grid motifs that effortlessly scale from digital UIs to physical installations.',
    outcome:
      'A sleek, elevated identity system that secured Lumina Studio as a premier design partner for Tier-1 technology companies, boosting average contract value by 65%.',
  },
  brandPillars: [
    {
      title: 'Architectural Precision',
      description:
        'Every layout is anchored on structured 12-column grids with mathematical precision and balanced whitespace.',
      tag: 'Structure',
    },
    {
      title: 'Luminous Contrast',
      description:
        'High-contrast monochrome bases paired with vibrant spectral accents symbolize clarity and light.',
      tag: 'Visual Tone',
    },
    {
      title: 'Adaptive Kinetic Motion',
      description:
        'Brand assets are designed to move—utilizing fluid physics, spring physics, and modular frame transitions.',
      tag: 'Motion',
    },
    {
      title: 'Engineered Simplicity',
      description:
        'Removing non-essential ornamentation to let high-impact typography and clean mark geometry stand out.',
      tag: 'Philosophy',
    },
  ],
  deliverables: [
    {
      category: 'Brand Strategy & Identity',
      items: [
        'Brand Positioning & Narrative',
        'Tone of Voice & Messaging Architecture',
        'Primary & Secondary Emblem Marks',
        'Clear Space & Usage Specifications',
      ],
    },
    {
      category: 'Visual System & Tokens',
      items: [
        'Color Swatches (HEX, RGB, CMYK, Pantone)',
        'Typography Hierarchy & Specimen Sets',
        'Iconography & Vector Illustration System',
        'Motion & Transition Guidelines',
      ],
    },
    {
      category: 'Touchpoints & Execution',
      items: [
        'Digital Experience & Web Guidelines',
        'Social Media Kit & Content Templates',
        'Print Collateral & Executive Stationeries',
        'Physical Signage & Architectural mockups',
      ],
    },
  ],
  testimonial: {
    quote:
      'The rebrand executed for Lumina Studio completely transformed how enterprise leadership views our firm. The system is precise, adaptable, and remarkably beautiful.',
    author: 'Elena Rostova',
    role: 'Founder & Chief Design Officer',
    company: 'Lumina Creative Group',
  },
};

// --- LUMINA STUDIO GUIDELINES DATA ---

export const LUMINA_STUDIO_GUIDELINES_DATA: BrandingGuidelinesData = {
  projectName: 'Lumina Studio',
  category: 'Branding & Brand Guidelines',
  version: 'v2.4',
  updatedDate: 'Q1 2026',
  downloadPdfSize: '42.1 MB',
  principles: [
    {
      number: '01',
      title: 'Architectural Order & Precision',
      description:
        'Layouts must maintain a strict 12-column grid structure with uniform padding to reflect engineered modularity.',
    },
    {
      number: '02',
      title: 'Luminous Contrast',
      description:
        'High-contrast monochrome bases paired with glowing dynamic spectrum accents represent clarity and innovation.',
    },
    {
      number: '03',
      title: 'Adaptive Fluid Movement',
      description:
        'Every interface element and visual asset should feature spring physics motion profiles for seamless interactions.',
    },
    {
      number: '04',
      title: 'Purposeful Minimal Distortion',
      description:
        'Eliminate heavy glassmorphism, unneeded shadows, and non-functional decorative elements.',
    },
  ],
  logoRules: [
    {
      id: 'logo-rule-1',
      title: 'Maintain 100% Emblem Height Margin',
      description:
        'Ensure clear space surrounding all 4 edges of the emblem mark equal to the emblem height (X-height).',
      type: 'do',
      spec: 'Clear Space = 1.0X',
    },
    {
      id: 'logo-rule-2',
      title: 'Dark Mode Primary Lockup',
      description:
        'On dark backgrounds (#090D16), use the Titanium Monogram with Electric Indigo spectral gradient dot.',
      type: 'do',
      spec: 'Dark Surface Compatible',
    },
    {
      id: 'logo-rule-3',
      title: 'Do Not Rotate or Skew Mark',
      description:
        'Never tilt the emblem, apply 3D rotations, or distort original vector aspect ratios under any circumstance.',
      type: 'dont',
      spec: 'Forbidden Transformation',
    },
    {
      id: 'logo-rule-4',
      title: 'Do Not Enclose in Outlined Shapes',
      description:
        'Never isolate the Lumina Studio mark inside filled circles, squares, or heavy outline boxes.',
      type: 'dont',
      spec: 'Forbidden Container',
    },
  ],
  colorPaletteRules: [
    {
      name: 'Lumina Obsidian',
      role: 'Primary Surface & Canvas Background',
      hex: '#090D16',
      usageRule:
        'Default dark canvas for all digital product web surfaces, slide decks, and marketing posters.',
      isDarkText: false,
    },
    {
      name: 'Electric Violet',
      role: 'Primary Accent & Focal Interactions',
      hex: '#7C3AED',
      usageRule:
        'Reserved for high-impact CTA buttons, active state indicators, and brand hero highlights.',
      isDarkText: false,
    },
    {
      name: 'Spectral Cyan',
      role: 'Secondary Gradient Accent',
      hex: '#06B6D4',
      usageRule:
        'Used in dynamic gradient pairs alongside Electric Violet for interactive UI hover states.',
      isDarkText: true,
    },
    {
      name: 'Pure Titanium',
      role: 'High Contrast Text & Light Mode Surface',
      hex: '#F8FAFC',
      usageRule:
        'Primary text color on dark surfaces and primary canvas background for print stationery.',
      isDarkText: true,
    },
  ],
  typographyRules: [
    {
      fontFamily: 'Space Grotesk',
      category: 'Display',
      recommendedWeights: ['Bold (700)', 'SemiBold (600)'],
      lineHeight: '1.1 to 1.2',
      letterSpacing: '-0.03em',
      bestPractices:
        'Use exclusively for high-impact hero headers and section titles. Never use for paragraph body copy.',
    },
    {
      fontFamily: 'Inter',
      category: 'Body',
      recommendedWeights: ['Regular (400)', 'Medium (500)', 'SemiBold (600)'],
      lineHeight: '1.5 to 1.6',
      letterSpacing: '-0.011em',
      bestPractices:
        'Standard for all body text, UI components, documentation paragraphs, and marketing copy.',
    },
    {
      fontFamily: 'JetBrains Mono',
      category: 'Technical / Code',
      recommendedWeights: ['Regular (400)', 'Bold (700)'],
      lineHeight: '1.4',
      letterSpacing: '0.0em',
      bestPractices:
        'Use for design token keys, code blocks, numerical stats, version tags, and technical specs.',
    },
  ],
  artDirection: [
    {
      title: 'Product & Architectural Photography',
      description:
        'Photos must feature dramatic directional lighting, crisp contrast, and geometric studio environments.',
      doText: 'High contrast black and white with subtle prismatic light refractions.',
      dontText:
        'Over-saturated, warm vintage filters, fuzzy background noise, or candid snapshot styles.',
    },
    {
      title: '3D Renderings & Motion Graphics',
      description:
        'Renderings should utilize matte metallic materials, glass refraction, and linear laser vector paths.',
      doText:
        'Sleek frosted glass, sharp specular highlights, and mathematically smooth easing curves.',
      dontText: 'Playful cartoonish shapes, glossy bubble effects, or aggressive camera shakes.',
    },
  ],
};

// --- LUMINA STUDIO COLOR PALETTE DATA ---

export const LUMINA_STUDIO_COLOR_PALETTE_DATA: BrandingColorPaletteData = {
  projectName: 'Lumina Studio',
  category: 'Branding & Visual Tokens',
  version: 'v2.4',
  updatedDate: 'Q1 2026',
  downloadSwatchesSize: '8.4 MB (.ase / .json)',
  primaryColors: [
    {
      name: 'Obsidian Canvas',
      role: 'Primary Surface & Dark Background',
      hex: '#090D16',
      rgb: '9, 13, 22',
      hsl: '222°, 42%, 6%',
      cmyk: '59%, 41%, 0%, 91%',
      pantone: 'PMS 2768 C',
      usage:
        'Default background canvas for all digital UI apps, high-end dark web interfaces, and presentation slides.',
      isDarkText: false,
    },
    {
      name: 'Electric Violet',
      role: 'Primary Brand Identity & Interactive Focal',
      hex: '#7C3AED',
      rgb: '124, 58, 237',
      hsl: '262°, 83%, 58%',
      cmyk: '48%, 76%, 0%, 7%',
      pantone: 'PMS 2685 C',
      usage:
        'Primary brand accent, main CTA buttons, dynamic badge fills, and active navigation indicators.',
      isDarkText: false,
    },
    {
      name: 'Spectral Cyan',
      role: 'Secondary Gradient Highlight',
      hex: '#06B6D4',
      rgb: '6, 182, 212',
      hsl: '189°, 94%, 43%',
      cmyk: '97%, 14%, 0%, 17%',
      pantone: 'PMS 3115 C',
      usage:
        'Interactive hover highlights, secondary buttons, data visualization series A, and glow effects.',
      isDarkText: true,
    },
    {
      name: 'Pure Titanium',
      role: 'Primary Light Base & High-Contrast Text',
      hex: '#F8FAFC',
      rgb: '248, 250, 252',
      hsl: '210°, 40%, 98%',
      cmyk: '2%, 1%, 0%, 1%',
      pantone: 'PMS Cool Gray 1 C',
      usage:
        'Primary body text on dark canvases, light theme background canvas, and printed stationery.',
      isDarkText: true,
    },
  ],
  secondaryColors: [
    {
      name: 'Solar Amber',
      role: 'System Warning & Warm Accent',
      hex: '#F59E0B',
      rgb: '245, 158, 11',
      hsl: '38°, 92%, 50%',
      cmyk: '0%, 35%, 96%, 4%',
      pantone: 'PMS 137 C',
      usage:
        'Alert highlights, priority status badges, rating indicators, and subtle contrast points.',
      isDarkText: true,
    },
    {
      name: 'Prismatic Emerald',
      role: 'System Success & Positive Delta',
      hex: '#10B981',
      rgb: '16, 185, 129',
      hsl: '160°, 84%, 39%',
      cmyk: '91%, 0%, 30%, 27%',
      pantone: 'PMS 340 C',
      usage:
        'Verified badges, growth metrics, success states, and live streaming indicator lights.',
      isDarkText: true,
    },
    {
      name: 'Deep Quartz Gray',
      role: 'Muted Cards & Subtle Dividers',
      hex: '#1E293B',
      rgb: '30, 41, 59',
      hsl: '217°, 33%, 17%',
      cmyk: '49%, 31%, 0%, 77%',
      pantone: 'PMS 432 C',
      usage:
        'Card container background fill, panel borders, inactive tab backgrounds, and subtle dividers.',
      isDarkText: false,
    },
    {
      name: 'Laser Magenta',
      role: 'Creative Spark Accent',
      hex: '#EC4899',
      rgb: '236, 72, 153',
      hsl: '330°, 81%, 60%',
      cmyk: '0%, 70%, 35%, 7%',
      pantone: 'PMS 225 C',
      usage: 'Special event banners, creative showcase tags, and gradient accent endpoints.',
      isDarkText: false,
    },
  ],
  gradients: [
    {
      name: 'Lumina Hyper-Spectrum',
      role: 'Hero Backdrop & Brand Cover Media',
      cssGradient: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
      stops: ['#7C3AED', '#06B6D4'],
      usage:
        'Hero title gradients, brand showcase covers, social media avatars, and key feature overlays.',
    },
    {
      name: 'Spectral Aurora',
      role: 'Subtle Glass Container Glow',
      cssGradient: 'linear-gradient(180deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.02) 100%)',
      stops: ['rgba(124,58,237,0.15)', 'rgba(6,182,212,0.02)'],
      usage:
        'Card hover states, interactive modal backdrops, and active tab indicator ambient lighting.',
    },
    {
      name: 'Titanium Metallic Shine',
      role: 'Physical Product Render Textures',
      cssGradient: 'linear-gradient(90deg, #F8FAFC 0%, #94A3B8 50%, #F8FAFC 100%)',
      stops: ['#F8FAFC', '#94A3B8', '#F8FAFC'],
      usage: 'Hardware product renders, 3D typography highlights, and metallic badge borders.',
    },
  ],
  contrastMatrix: [
    {
      bgName: 'Obsidian Canvas (#090D16)',
      bgHex: '#090D16',
      fgName: 'Pure Titanium (#F8FAFC)',
      fgHex: '#F8FAFC',
      ratio: '18.4:1',
      wcagRating: 'AAA',
    },
    {
      bgName: 'Obsidian Canvas (#090D16)',
      bgHex: '#090D16',
      fgName: 'Spectral Cyan (#06B6D4)',
      fgHex: '#06B6D4',
      ratio: '8.1:1',
      wcagRating: 'AAA',
    },
    {
      bgName: 'Electric Violet (#7C3AED)',
      bgHex: '#7C3AED',
      fgName: 'Pure Titanium (#F8FAFC)',
      fgHex: '#F8FAFC',
      ratio: '5.2:1',
      wcagRating: 'AA',
    },
    {
      bgName: 'Obsidian Canvas (#090D16)',
      bgHex: '#090D16',
      fgName: 'Electric Violet (#7C3AED)',
      fgHex: '#7C3AED',
      ratio: '3.6:1',
      wcagRating: 'AA',
    },
  ],
};

// --- LUMINA STUDIO MOCKUPS DATA ---

export const LUMINA_STUDIO_MOCKUPS_DATA: BrandingMockupsData = {
  projectName: 'Lumina Studio',
  category: 'Branding & Production Assets',
  version: 'v2.4',
  updatedDate: 'Q1 2026',
  downloadKitSize: '1.8 GB (.zip)',
  totalMockupsCount: 12,
  categories: [
    { id: 'all', label: 'All Mockups', count: 12 },
    { id: 'Stationery', label: 'Stationery & Print', count: 3 },
    { id: 'Digital Devices', label: 'Digital Devices', count: 3 },
    { id: '3D & Spatial', label: '3D & Spatial', count: 2 },
    { id: 'Apparel & Merch', label: 'Apparel & Merch', count: 2 },
    { id: 'Out-of-Home', label: 'Out-of-Home Signage', count: 2 },
  ],
  items: [
    {
      id: 'mockup-1',
      title: 'Titanium Business Card Set',
      category: 'Stationery',
      aspectRatio: '16:9',
      dimensions: '6000 x 4000 px',
      format: 'PSD',
      description:
        'Heavily textured metallic stationery mockup featuring debossed foil stamping, spot UV effects, and dynamic directional shadows.',
      previewGradient: 'linear-gradient(135deg, #090D16 0%, #1E293B 100%)',
      downloadSize: '184 MB',
      tags: ['Spot UV', 'Foil Stamp', 'Stationery', 'Print'],
      isFeatured: true,
    },
    {
      id: 'mockup-2',
      title: 'Pro Studio Display & Workstation',
      category: 'Digital Devices',
      aspectRatio: '16:9',
      dimensions: '7680 x 4320 px (8K)',
      format: 'Figma',
      description:
        'Frameless glass display with customizable screen reflection, floating desktop UI elements, and ambient studio light controls.',
      previewGradient: 'linear-gradient(135deg, #7C3AED 0%, #090D16 100%)',
      downloadSize: '240 MB',
      tags: ['8K Render', 'UI Showcase', 'Monitor', 'Desktop'],
      isFeatured: true,
    },
    {
      id: 'mockup-3',
      title: 'Architectural Wayfinding Signage',
      category: '3D & Spatial',
      aspectRatio: '4:3',
      dimensions: '5120 x 3840 px',
      format: 'Blender',
      description:
        'Illuminated LED glass totem sign installed in an ultra-modern concrete museum lobby with ray-traced reflections.',
      previewGradient: 'linear-gradient(135deg, #06B6D4 0%, #090D16 100%)',
      downloadSize: '410 MB',
      tags: ['Ray-Tracing', '3D Scene', 'Signage', 'Spatial'],
      isFeatured: true,
    },
    {
      id: 'mockup-4',
      title: 'Mobile App Flagship Glass Deck',
      category: 'Digital Devices',
      aspectRatio: '1:1',
      dimensions: '4000 x 4000 px',
      format: 'Figma',
      description:
        'Triple isometric smartphone stack with editable screen smart objects and realistic OLED dark mode glows.',
      previewGradient: 'linear-gradient(135deg, #1E293B 0%, #7C3AED 100%)',
      downloadSize: '120 MB',
      tags: ['Mobile UI', 'Isometric', 'App Showcase'],
    },
    {
      id: 'mockup-5',
      title: 'Heavyweight Graphic Hoodie & Tote',
      category: 'Apparel & Merch',
      aspectRatio: '16:9',
      dimensions: '5000 x 3333 px',
      format: 'PSD',
      description:
        'Custom boxy-fit oversized hoodie with embroidered chest logo detail and woven brand neck tags.',
      previewGradient: 'linear-gradient(135deg, #090D16 0%, #06B6D4 100%)',
      downloadSize: '295 MB',
      tags: ['Apparel', 'Embroidery', 'Streetwear', 'Merch'],
    },
    {
      id: 'mockup-6',
      title: 'Monolithic City Billboard Stand',
      category: 'Out-of-Home',
      aspectRatio: '16:9',
      dimensions: '6000 x 3375 px',
      format: 'PSD',
      description:
        'High-impact outdoor digital billboard setup located in a modern financial center with night lighting controls.',
      previewGradient: 'linear-gradient(135deg, #10B981 0%, #090D16 100%)',
      downloadSize: '310 MB',
      tags: ['Outdoor', 'Billboard', 'Urban', 'OOH'],
    },
  ],
};
