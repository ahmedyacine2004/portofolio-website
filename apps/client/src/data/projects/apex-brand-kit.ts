export interface GraphicDesignPillar {
  title: string;
  description: string;
  tag: string;
}

export interface GraphicDesignMetric {
  label: string;
  value: string;
  change: string;
}

export interface BrandAssetPreview {
  id: string;
  title: string;
  category: string;
  dimensions: string;
  description: string;
  format: string;
}

export interface GraphicDesignOverviewData {
  projectName: string;
  badgeText: string;
  category: string;
  client: string;
  year: string;
  role: string;
  tools: string[];
  deliverables: string[];
  summary: string;
  challenge: string;
  solution: string;
  pillars: GraphicDesignPillar[];
  metrics: GraphicDesignMetric[];
  assetsPreview: BrandAssetPreview[];
}

// --- VISUAL ASSETS TYPES ---

export type VisualAssetCategory =
  'All' | 'Logo & Marks' | '3D & Motion' | 'Social Media' | 'Typography' | 'Patterns & Grids';

export interface VisualAssetItem {
  id: string;
  title: string;
  category: VisualAssetCategory;
  format: string; // e.g., 'SVG / AI', 'PNG / EXR', 'PSD / FIG'
  dimensions: string;
  fileSize: string;
  accentColor: string; // Tailwind gradient/color class for mock preview frame
  description: string;
  tags: string[];
  featured?: boolean;
}

export interface GraphicDesignVisualAssetsData {
  projectName: string;
  category: string;
  totalAssetCount: number;
  totalStorageSize: string;
  categories: VisualAssetCategory[];
  assets: VisualAssetItem[];
}

// --- BRAND KIT TYPES ---

export interface ColorSwatch {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  cmyk: string;
  pantone: string;
  isDarkText?: boolean;
}

export interface TypographySpecimen {
  fontName: string;
  role: string;
  weights: string[];
  usage: string;
  sampleText: string;
}

export interface LogoUsageRule {
  id: string;
  title: string;
  description: string;
  type: 'do' | 'dont';
}

export interface BrandVoiceTrait {
  trait: string;
  description: string;
  doExample: string;
  dontExample: string;
}

export interface GraphicDesignBrandKitData {
  projectName: string;
  category: string;
  version: string;
  updatedDate: string;
  downloadPdfSize: string;
  colors: ColorSwatch[];
  typography: TypographySpecimen[];
  logoRules: LogoUsageRule[];
  voiceTraits: BrandVoiceTrait[];
}

export const APEX_BRAND_KIT_OVERVIEW_DATA: GraphicDesignOverviewData = {
  projectName: 'APEX BRAND KIT',
  badgeText: 'GRAPHIC DESIGN & BRAND IDENTITY',
  category: 'Visual Identity System & Motion Brand Guidelines',
  client: 'Apex Technologies Inc.',
  year: '2025',
  role: 'Lead Graphic Designer & Brand Strategist',
  tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'After Effects', 'InDesign'],
  deliverables: [
    'Primary & Secondary Logo Suite',
    'Design System & Vector Assets',
    '3D Brand Mark & Emblem Specs',
    'Typography & Scale Guidelines',
    'Social & Marketing Campaign Templates',
  ],
  summary:
    'Apex Brand Kit is a comprehensive high-fidelity visual identity system engineered for a modern fintech & high-performance computing startup. The kit provides scalable vector assets, strict visual guidelines, and flexible promotional templates.',
  challenge:
    'Apex needed to evolve from a fragmented seed-stage startup aesthetic into an enterprise-ready brand identity capable of scaling seamlessly across digital interfaces, print collateral, dynamic video lower-thirds, and physical merchandise without losing brand recognition.',
  solution:
    'Designed a modular visual identity based on precision geometry, high-contrast typography, and dynamic gradient accents. Developed a unified design token sheet and reusable layout grid templates that reduced internal marketing asset turn-around times by 65%.',
  pillars: [
    {
      title: 'Precision Geometry',
      description:
        'Constructed around a golden-ratio grid system to ensure pristine rendering at micro-scales on mobile screens and macro-scales on billboards.',
      tag: 'Vector Precision',
    },
    {
      title: 'High-Contrast Kinetic Palette',
      description:
        'Electric Indigo and Cyber Emerald paired with deep obsidian shades ensure accessible visual hierarchy and high visibility across dark and light surfaces.',
      tag: 'Color Dynamics',
    },
    {
      title: 'Modular Layout Framework',
      description:
        'Flexible 12-column marketing templates engineered for seamless cross-platform deployment across social, web, and physical print.',
      tag: 'Scalability',
    },
  ],
  metrics: [
    { label: 'Brand Recognition Lift', value: '+74%', change: 'Post-Rebrand Survey' },
    { label: 'Production Turnaround', value: '-65%', change: 'Asset Creation Time' },
    { label: 'Design System Adoption', value: '100%', change: 'Across All Departments' },
  ],
  assetsPreview: [
    {
      id: 'asset-1',
      title: 'Primary Vector Emblem',
      category: 'Logo System',
      dimensions: 'Vector / Scalable',
      description: 'Golden-ratio aligned icon mark with embedded isometric geometric depth.',
      format: 'SVG / EPS / AI',
    },
    {
      id: 'asset-2',
      title: '3D Gloss Sheen Emblem',
      category: 'Visual Assets',
      dimensions: '3840 x 2160 px',
      description: 'High-resolution ray-traced render for launch keynotes and billboard displays.',
      format: 'PNG / EXR',
    },
    {
      id: 'asset-3',
      title: 'Social Media Kit Vol. 1',
      category: 'Marketing Templates',
      dimensions: '1080 x 1350 px',
      description: 'Modular Instagram & LinkedIn post grid system with editable smart layers.',
      format: 'PSD / FIG',
    },
    {
      id: 'asset-4',
      title: 'Executive Stationery Suite',
      category: 'Print Collateral',
      dimensions: 'A4 / US Letter Bleed',
      description: 'Letterhead, business cards, and foil-stamped presentation folder kit.',
      format: 'INDD / PDF',
    },
  ],
};

// --- VISUAL ASSETS DATA ---

export const APEX_BRAND_KIT_VISUAL_ASSETS_DATA: GraphicDesignVisualAssetsData = {
  projectName: 'APEX BRAND KIT',
  category: 'Graphic Design / Visual Assets',
  totalAssetCount: 24,
  totalStorageSize: '1.42 GB',
  categories: [
    'All',
    'Logo & Marks',
    '3D & Motion',
    'Social Media',
    'Typography',
    'Patterns & Grids',
  ],
  assets: [
    {
      id: 'va-1',
      title: 'Primary Emblem - Light Background',
      category: 'Logo & Marks',
      format: 'SVG / AI / PNG',
      dimensions: 'Vector / Scalable',
      fileSize: '4.2 MB',
      accentColor: 'from-indigo-600 to-purple-600',
      description: 'Master geometric mark configured for light mode applications and print media.',
      tags: ['Primary Mark', 'Vector', 'Light Theme'],
      featured: true,
    },
    {
      id: 'va-2',
      title: 'Primary Emblem - Dark & Cyber Neon',
      category: 'Logo & Marks',
      format: 'SVG / EPS / PNG',
      dimensions: 'Vector / Scalable',
      fileSize: '3.8 MB',
      accentColor: 'from-cyan-500 to-emerald-500',
      description: 'High-contrast glowing variant designed for dark UI viewports and OLED screens.',
      tags: ['Primary Mark', 'Vector', 'Dark Theme'],
      featured: true,
    },
    {
      id: 'va-3',
      title: '3D Ray-Traced Apex Monogram',
      category: '3D & Motion',
      format: 'PNG / EXR / OBJ',
      dimensions: '3840 x 2160 px',
      fileSize: '184 MB',
      accentColor: 'from-blue-600 to-indigo-900',
      description:
        '4K ray-traced glass & titanium render for keynote intro slides and launch banners.',
      tags: ['3D Render', 'Keynote', '4K'],
      featured: true,
    },
    {
      id: 'va-4',
      title: 'Kinetic Motion Intro Loop (60fps)',
      category: '3D & Motion',
      format: 'MP4 / MOV (ProRes)',
      dimensions: '1920 x 1080 px',
      fileSize: '420 MB',
      accentColor: 'from-purple-600 to-pink-600',
      description:
        'Smooth 3-second seamless loop of the Apex logo forming from isometric vector lines.',
      tags: ['Animation', 'Motion Graphic', 'Video'],
    },
    {
      id: 'va-5',
      title: 'Social Post Template - Announcement Grid',
      category: 'Social Media',
      format: 'PSD / FIG',
      dimensions: '1080 x 1350 px',
      fileSize: '24.5 MB',
      accentColor: 'from-violet-600 to-indigo-500',
      description:
        'Modular 4-frame Instagram portrait carousel template with dynamic typography tokens.',
      tags: ['Instagram', 'Carousel', 'Figma Template'],
    },
    {
      id: 'va-6',
      title: 'LinkedIn Header Banner Collection',
      category: 'Social Media',
      format: 'PSD / PNG',
      dimensions: '1584 x 396 px',
      fileSize: '12.1 MB',
      accentColor: 'from-blue-500 to-cyan-600',
      description:
        'Set of 5 minimalist executive background headers for team member profile branding.',
      tags: ['LinkedIn', 'Header', 'Corporate'],
    },
    {
      id: 'va-7',
      title: 'Apex Display Specimen Sheet',
      category: 'Typography',
      format: 'PDF / OTF / WOFF2',
      dimensions: 'Vector / Print Ready',
      fileSize: '15.6 MB',
      accentColor: 'from-slate-700 to-slate-900',
      description: 'Custom sans-serif font family hierarchy specifications and license package.',
      tags: ['Typography', 'Font Family', 'Web Font'],
    },
    {
      id: 'va-8',
      title: 'Isometric Grid & Topo Pattern Package',
      category: 'Patterns & Grids',
      format: 'SVG / PAT / AI',
      dimensions: 'Seamless Vector',
      fileSize: '8.4 MB',
      accentColor: 'from-emerald-600 to-teal-800',
      description:
        'Seamless repeating topological line-art pattern overlay for packaging and web backdrops.',
      tags: ['Pattern', 'Vector', 'Texture'],
    },
  ],
};

// --- BRAND KIT DATA ---

export const APEX_BRAND_KIT_BRAND_KIT_DATA: GraphicDesignBrandKitData = {
  projectName: 'APEX BRAND KIT',
  category: 'Graphic Design / Brand Guidelines & Style Guide',
  version: 'v3.2',
  updatedDate: 'Q1 2025',
  downloadPdfSize: '34.8 MB',
  colors: [
    {
      name: 'Apex Obsidian',
      role: 'Primary Background & Core Typography',
      hex: '#0A0D14',
      rgb: '10, 13, 20',
      cmyk: '80, 70, 60, 90',
      pantone: 'PMS Black 6 C',
      isDarkText: false,
    },
    {
      name: 'Cyber Indigo',
      role: 'Primary Brand Accent & Interactive CTAs',
      hex: '#4F46E5',
      rgb: '79, 70, 229',
      cmyk: '80, 75, 0, 0',
      pantone: 'PMS 2726 C',
      isDarkText: false,
    },
    {
      name: 'Electric Cyan',
      role: 'Secondary Gradient Accent & Highlighting',
      hex: '#06B6D4',
      rgb: '6, 182, 212',
      cmyk: '70, 0, 10, 0',
      pantone: 'PMS 305 C',
      isDarkText: true,
    },
    {
      name: 'Kinetic Emerald',
      role: 'Success Indicators & Kinetic Highlights',
      hex: '#10B981',
      rgb: '16, 185, 129',
      cmyk: '75, 0, 50, 0',
      pantone: 'PMS 3395 C',
      isDarkText: true,
    },
    {
      name: 'Titanium White',
      role: 'Light Backgrounds & High Contrast Surfaces',
      hex: '#F8FAFC',
      rgb: '248, 250, 252',
      cmyk: '0, 0, 0, 2',
      pantone: 'PMS Cool Gray 1 C',
      isDarkText: true,
    },
  ],
  typography: [
    {
      fontName: 'Space Grotesk',
      role: 'Display & Headline Font',
      weights: ['Bold (700)', 'SemiBold (600)'],
      usage: 'Used exclusively for hero titles, section headings, and high-impact poster displays.',
      sampleText: 'PRECISION COMPUTING FOR FUTURE ENTERPRISE',
    },
    {
      fontName: 'Inter',
      role: 'Primary Body & UI Font',
      weights: ['Regular (400)', 'Medium (500)', 'SemiBold (600)'],
      usage: 'Used across body copy, UI interfaces, documentation text, and print letterheads.',
      sampleText:
        'Apex delivers ultra-scalable cloud solutions built on high-performance vector architectures.',
    },
    {
      fontName: 'JetBrains Mono',
      role: 'Technical & Code Accent',
      weights: ['Regular (400)', 'Bold (700)'],
      usage:
        'Used for numerical metrics, design token labels, code snippets, and technical specifications.',
      sampleText: 'HEX: #4F46E5 | SCALE: 1.618 | GRID: 12-COL',
    },
  ],
  logoRules: [
    {
      id: 'rule-1',
      title: 'Maintain 50% Clear Space',
      description:
        'Always leave a minimum margin equal to half the height of the Apex emblem around all outer edges.',
      type: 'do',
    },
    {
      id: 'rule-2',
      title: 'High-Contrast Background Placement',
      description:
        'Use the light monogram on dark backgrounds (#0A0D14) and the dark mark on light surfaces (#F8FAFC).',
      type: 'do',
    },
    {
      id: 'rule-3',
      title: 'Do Not Distort Aspect Ratio',
      description:
        'Never stretch, skew, rotate vertically, or unproportionally scale the logo lockup.',
      type: 'dont',
    },
    {
      id: 'rule-4',
      title: 'Do Not Alter Palette Colors',
      description:
        'Never apply unapproved gradients, drop shadows, outlines, or unauthorized color combinations to the mark.',
      type: 'dont',
    },
  ],
  voiceTraits: [
    {
      trait: 'Authoritative & Precise',
      description:
        'We speak with total confidence in engineered solutions, using clear, jargon-free terminology.',
      doExample: '"Engineered to deliver sub-millisecond execution across global nodes."',
      dontExample: '"We think our fast code is super awesome and really really quick!"',
    },
    {
      trait: 'Visionary & Forward-Looking',
      description:
        'Focus on future-proof technological capabilities and transformative industry impact.',
      doExample: '"Architecting the next epoch of decentralized data networks."',
      dontExample: '"We do standard cloud hosting just like everyone else on the market."',
    },
  ],
};
