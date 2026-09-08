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

export type VisualAssetCategory =
  'All' | 'Logo & Marks' | '3D & Motion' | 'Social Media' | 'Typography' | 'Patterns & Grids';

export interface VisualAssetItem {
  id: string;
  title: string;
  category: VisualAssetCategory;
  format: string;
  dimensions: string;
  fileSize: string;
  description: string;
  resolution: string;
}

export interface GraphicDesignVisualAssetsData {
  projectName: string;
  badgeText: string;
  category: string;
  description: string;
  assetCount: number;
  totalFileSize: string;
  filterCategories: VisualAssetCategory[];
  assets: VisualAssetItem[];
}

export type BrandKitMockupCategory =
  'Stationery' | 'Digital Devices' | '3D & Spatial' | 'Apparel & Merch' | 'Out-of-Home';

export interface BrandKitMockupItem {
  id: string;
  title: string;
  category: BrandKitMockupCategory;
  aspectRatio: string;
  dimensions: string;
  format: string;
  description: string;
  previewGradient: string;
  downloadSize: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface BrandKitMockupFilter {
  id: string;
  label: string;
  count: number;
}

export interface GraphicDesignBrandKitData {
  projectName: string;
  badgeText: string;
  category: string;
  version: string;
  updatedDate: string;
  downloadKitSize: string;
  totalMockupsCount: number;
  categories: BrandKitMockupFilter[];
  items: BrandKitMockupItem[];
}

// --- EVENT VISUAL IDENTITY OVERVIEW DATA ---

export const EVENT_VISUAL_IDENTITY_OVERVIEW_DATA: GraphicDesignOverviewData = {
  projectName: 'Event Visual Identity',
  badgeText: 'GRAPHIC DESIGN',
  category: 'Event Branding & Visual Identity',
  client: 'Digital Summit 2025',
  year: '2025',
  role: 'Visual Identity Designer',
  tools: ['Adobe Creative Suite', 'Figma', 'Blender'],
  deliverables: [
    'Event Visual Identity',
    'Event Signage & Wayfinding',
    '30+ Collateral Designs',
    '3D Environment Graphics',
    'Digital Assets',
  ],
  summary:
    'A spatial identity system for a technology summit that connects the stage, venue, attendee journey, and live digital conversation.',
  challenge:
    'The summit needed to feel ambitious without becoming cold or generic. The identity had to guide thousands of attendees through a physical venue while staying legible on screens and social posts.',
  solution:
    'Designed a modular visual system built from luminous wayfinding lines, layered data shapes, and a warm signal color. The same geometry scaled from badges and room signs to stage graphics and live social templates.',
  pillars: [
    {
      title: 'Human Innovation',
      description: 'A contemporary language that makes technical ideas feel welcoming and useful',
      tag: 'Visual',
    },
    {
      title: 'Spatial Continuity',
      description: 'A visual route connecting entrance, stage, rooms, badges, and screens',
      tag: '3D & Space',
    },
    {
      title: 'Built for the Moment',
      description: 'Assets designed to work in print, motion, low light, and live social coverage',
      tag: 'Multi-channel',
    },
  ],
  metrics: [
    {
      label: 'Event Attendees',
      value: '5K+',
      change: '+180%',
    },
    {
      label: 'Brand Recognition',
      value: '94%',
      change: '+65%',
    },
    {
      label: 'Social Mentions',
      value: '45K+',
      change: '+320%',
    },
  ],
  assetsPreview: [
    {
      id: 'asset-1',
      title: 'Attendee Badge System',
      category: 'Stationery',
      dimensions: '200 × 300mm',
      description: 'Readable badge hierarchy with role color, access zone, and security details.',
      format: 'PDF / Print Ready',
    },
  ],
};

export const EVENT_VISUAL_IDENTITY_VISUAL_ASSETS_DATA: GraphicDesignVisualAssetsData = {
  projectName: 'Event Visual Identity',
  badgeText: 'VISUAL ASSETS',
  category: 'Event Assets',
  description: 'Complete event visual asset library',
  assetCount: 38,
  totalFileSize: '3.1 GB',
  filterCategories: [
    'All',
    'Logo & Marks',
    '3D & Motion',
    'Social Media',
    'Typography',
    'Patterns & Grids',
  ],
  assets: [
    {
      id: 'asset-1',
      title: 'Event Logo',
      category: 'Logo & Marks',
      format: 'SVG / AI',
      dimensions: '2500 × 2500px',
      fileSize: '2.1 MB',
      description: 'Main event branding logo',
      resolution: '300 DPI',
    },
  ],
};

export const EVENT_VISUAL_IDENTITY_BRAND_KIT_DATA: GraphicDesignBrandKitData = {
  projectName: 'Event Visual Identity',
  badgeText: 'BRAND KIT',
  category: 'Event Brand Kit',
  version: 'v1.0',
  updatedDate: 'Mar 2025',
  downloadKitSize: '2.4 GB',
  totalMockupsCount: 22,
  categories: [
    { id: 'stationery', label: 'Stationery', count: 6 },
    { id: 'signage', label: 'Out-of-Home', count: 8 },
    { id: '3d', label: '3D & Spatial', count: 5 },
    { id: 'digital', label: 'Digital Devices', count: 3 },
  ],
  items: [
    {
      id: 'mockup-1',
      title: 'Wayfinding Signage System',
      category: 'Out-of-Home' as BrandKitMockupCategory,
      aspectRatio: '16:9',
      dimensions: '3000 × 1500mm',
      format: 'Blender / PSD',
      description: 'Event venue wayfinding and directional signage',
      previewGradient: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
      downloadSize: '891 MB',
      tags: ['3D', 'Signage', 'Spatial'],
      isFeatured: true,
    },
  ],
};
