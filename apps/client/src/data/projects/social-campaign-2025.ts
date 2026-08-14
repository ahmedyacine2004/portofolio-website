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

// --- SOCIAL CAMPAIGN 2025 OVERVIEW DATA ---

export const SOCIAL_CAMPAIGN_2025_OVERVIEW_DATA: GraphicDesignOverviewData = {
  projectName: 'Social Campaign 2025',
  badgeText: 'GRAPHIC DESIGN',
  category: 'Social Media Campaign Design',
  client: 'TechBrand Inc.',
  year: '2025',
  role: 'Lead Graphic Designer',
  tools: ['Adobe Creative Suite', 'Figma', 'Cinema 4D'],
  deliverables: [
    'Campaign Visual Identity',
    '50+ Social Media Assets',
    '3D Animated Graphics',
    'Video Motion Graphics',
    'Typography System',
  ],
  summary:
    'Comprehensive social media campaign design with 50+ unique assets and 3D motion graphics.',
  challenge:
    'Create a cohesive visual identity across multiple social platforms while maintaining brand consistency',
  solution:
    'Developed a flexible design system with modular components adaptable to different platform requirements',
  pillars: [
    {
      title: 'Visual Consistency',
      description: 'Unified look and feel across all social platforms',
      tag: 'Identity',
    },
    {
      title: 'Motion & Dynamics',
      description: 'Engaging animated graphics and video content',
      tag: 'Animation',
    },
    {
      title: 'Platform Optimization',
      description: 'Tailored designs for Instagram, TikTok, LinkedIn, and more',
      tag: 'Adaptation',
    },
  ],
  metrics: [
    {
      label: 'Engagement Rate',
      value: '8.5%',
      change: '+145%',
    },
    {
      label: 'Reach',
      value: '2.3M+',
      change: '+312%',
    },
    {
      label: 'Conversion',
      value: '3.2%',
      change: '+89%',
    },
  ],
  assetsPreview: [
    {
      id: 'asset-1',
      title: 'Instagram Feed Post',
      category: 'Social Media',
      dimensions: '1080 × 1080px',
      description: 'Main feed campaign post design',
      format: 'PSD / PNG',
    },
  ],
};

export const SOCIAL_CAMPAIGN_2025_VISUAL_ASSETS_DATA: GraphicDesignVisualAssetsData = {
  projectName: 'Social Campaign 2025',
  badgeText: 'VISUAL ASSETS',
  category: 'Campaign Assets',
  description: 'Complete collection of social media campaign visual assets',
  assetCount: 52,
  totalFileSize: '2.3 GB',
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
      title: 'Campaign Logo',
      category: 'Logo & Marks',
      format: 'SVG / AI',
      dimensions: '2000 × 2000px',
      fileSize: '1.2 MB',
      description: 'Main campaign logo with variations',
      resolution: '300 DPI',
    },
  ],
};

export const SOCIAL_CAMPAIGN_2025_BRAND_KIT_DATA: GraphicDesignBrandKitData = {
  projectName: 'Social Campaign 2025',
  badgeText: 'BRAND KIT',
  category: 'Campaign Brand Kit',
  version: 'v1.0',
  updatedDate: 'Jan 2025',
  downloadKitSize: '1.8 GB',
  totalMockupsCount: 18,
  categories: [
    { id: 'stationery', label: 'Stationery', count: 4 },
    { id: 'digital', label: 'Digital Devices', count: 6 },
    { id: 'outdoor', label: 'Out-of-Home', count: 5 },
    { id: 'merch', label: 'Apparel & Merch', count: 3 },
  ],
  items: [
    {
      id: 'mockup-1',
      title: 'Social Media Kit',
      category: 'Digital Devices' as BrandKitMockupCategory,
      aspectRatio: '16:9',
      dimensions: '1920 × 1080px',
      format: 'Figma',
      description: 'Complete social media template kit',
      previewGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      downloadSize: '245 MB',
      tags: ['Social', 'Template', 'Digital'],
      isFeatured: true,
    },
  ],
};
