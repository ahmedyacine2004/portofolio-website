'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Boxes,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Copy,
  ExternalLink,
  Eye,
  FileCode2,
  Folder,
  FolderCheck,
  Grid,
  Heart,
  Image as ImageIcon,
  Layers,
  Layers3,
  Layout,
  LucideIcon,
  Maximize2,
  Monitor,
  MousePointerClick,
  Move,
  Palette,
  Play,
  RotateCw,
  Search,
  Sliders,
  Sparkles,
  Type,
  Video,
  Wand2,
  Wrench,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Gallery Items Across Disciplines
interface GalleryItem {
  id: string;
  title: string;
  category: 'ui' | 'branding' | 'vector' | 'motion' | '3d';
  categoryLabel: string;
  tool: string;
  toolColor: string;
  image: string;
  description: string;
  metrics: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'portfolio-v2',
    title: 'Developer Portfolio Experience UI',
    category: 'ui',
    categoryLabel: 'UI/UX Interface',
    tool: 'Figma',
    toolColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description:
      'High-density design system, responsive grids, and dark/light mode token architecture.',
    metrics: '40+ Components',
  },
  {
    id: 'crypto-dashboard',
    title: 'Fintech Analytics & Trading Dashboard',
    category: 'ui',
    categoryLabel: 'Web Application',
    tool: 'Figma',
    toolColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description:
      'Data-dense charts, candlestick widgets, transaction tables, and interactive navigation.',
    metrics: 'Interactive Prototype',
  },
  {
    id: 'brand-identity-v',
    title: 'Aura Technology Visual Identity',
    category: 'branding',
    categoryLabel: 'Brand Identity',
    tool: 'Illustrator',
    toolColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    image:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    description:
      'Geometric brandmark, typography system, color guidelines, and stationery templates.',
    metrics: 'Full Brand Kit',
  },
  {
    id: 'custom-icon-set',
    title: 'Cyber Geometric 64px Icon System',
    category: 'vector',
    categoryLabel: 'Vector Iconography',
    tool: 'Illustrator',
    toolColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    image:
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    description: 'Pixel-perfect SVG icon set with 2px consistent stroke weight on 24x24 grid.',
    metrics: '64 Vector SVGs',
  },
  {
    id: 'spatial-headphone',
    title: '3D Spatial Audio Device Rendering',
    category: '3d',
    categoryLabel: '3D Modeling & Render',
    tool: 'Blender 3D',
    toolColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description:
      'Procedural metallic shaders, studio lighting three-point setup, and 4K Cycles photorealism.',
    metrics: '4K Cycles Render',
  },
  {
    id: 'isometric-room',
    title: 'Cyberpunk Workspace 3D Scene',
    category: '3d',
    categoryLabel: '3D Scene & Lighting',
    tool: 'Blender 3D',
    toolColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    description: 'Volumetric neon emission, procedural textures, and spatial architectural assets.',
    metrics: 'Eevee Realtime',
  },
  {
    id: 'motion-kinetic',
    title: 'Kinetic Typography & Brand Motion Reel',
    category: 'motion',
    categoryLabel: 'Motion Graphics',
    tool: 'After Effects',
    toolColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    description: 'Dynamic typography animation, rhythm-synced easing curves, and glow compositing.',
    metrics: '60 FPS 4K Reel',
  },
  {
    id: 'retouch-composite',
    title: 'Cinematic Visual Poster & Retouching',
    category: 'branding',
    categoryLabel: 'Digital Composite',
    tool: 'Photoshop',
    toolColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    image:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    description:
      'Multi-layer photo compositing, color grading, frequency separation, and lighting blending.',
    metrics: 'Multi-layer PSD',
  },
];

// Design Tokens
const COLOR_SWATCHES = [
  {
    name: 'Vibrant Magenta',
    hex: '#ec4899',
    hsl: 'hsl(330, 81%, 60%)',
    role: 'Primary Accent & Action',
  },
  {
    name: 'Electric Azure',
    hex: '#3b82f6',
    hsl: 'hsl(217, 91%, 60%)',
    role: 'Interactive Links & Focus',
  },
  {
    name: 'Cyber Emerald',
    hex: '#10b981',
    hsl: 'hsl(160, 84%, 39%)',
    role: 'Success Badges & Pulse',
  },
  { name: 'Violet Nebula', hex: '#8b5cf6', hsl: 'hsl(258, 90%, 66%)', role: 'Secondary Accents' },
  { name: 'Amber Glow', hex: '#f59e0b', hsl: 'hsl(38, 92%, 50%)', role: 'Highlights & Alerts' },
  { name: 'Deep Slate', hex: '#0f172a', hsl: 'hsl(222, 47%, 11%)', role: 'Surface Background' },
];

// Design Tools Suite
const DESIGN_TOOLS = [
  {
    name: 'Figma',
    role: 'UI/UX Design, Interactive Prototyping & Design Systems',
    slug: 'figma',
    level: 'Expert',
    icon: Palette,
    accent: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
    tags: ['Auto Layout', 'Variables', 'Component Variants', 'Prototypes'],
  },
  {
    name: 'Adobe Illustrator',
    role: 'Vector Illustration, Brand Identity & Iconography',
    slug: 'illustrator',
    level: 'Expert',
    icon: Wand2,
    accent: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    tags: ['Vector Paths', 'Logo Design', 'SVG Optimization', 'Print Systems'],
  },
  {
    name: 'Adobe Photoshop',
    role: 'Digital Compositing, Photo Manipulation & Retouching',
    slug: 'photoshop',
    level: 'Advanced',
    icon: ImageIcon,
    accent: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    tags: ['Photo Retouch', 'Layer Masks', 'Color Grading', 'Smart Objects'],
  },
  {
    name: 'After Effects & Premiere',
    role: 'Motion Graphics, Kinetic Typography & Video Editing',
    slug: 'aftereffects',
    level: 'Advanced',
    icon: Video,
    accent: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    tags: ['Motion Graphics', 'Easing Curves', 'Keyframing', 'Video Reels'],
  },
  {
    name: 'Blender 3D',
    role: '3D Modeling, Photorealistic Shading & Cycles Rendering',
    slug: 'blender',
    level: 'Advanced',
    icon: Boxes,
    accent: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
    tags: ['3D Modeling', 'Procedural Shaders', 'Cycles 4K', 'Lighting'],
  },
];

export default function DesignSkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<
    'tokens' | 'components' | 'typography'
  >('tokens');

  // Filtered gallery items
  const filteredGallery = useMemo(() => {
    if (selectedCategory === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1400);
  };

  return (
    <motion.div
      className="h-full w-full space-y-6 rounded-[8px] bg-background p-4 text-foreground md:p-8 overflow-y-auto overflow-x-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. DESIGN STUDIO HEADER */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-4 border-b border-border/40 pb-5 lg:flex-row lg:items-center"
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-foreground md:text-[28px]">
              DESIGN WORKSPACE
            </h1>
            <span className="flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-0.5 text-[11px] font-semibold text-pink-600 dark:text-pink-400">
              <span className="size-2 rounded-full bg-pink-500 animate-pulse" />
              Creative Studio Online
            </span>
          </div>
          <p className="mt-1 max-w-2xl font-inter text-[13px] text-muted-foreground">
            Crafting visual identities, high-fidelity UI/UX design systems, vector art, 3D
            renderings, and motion graphics.
          </p>
        </div>

        {/* Design Studio Metrics */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Palette className="size-4 text-pink-600 dark:text-pink-400" />
            <div className="flex flex-col">
              <span className="font-inter text-[12px] font-bold leading-none">
                Figma / Adobe / Blender
              </span>
              <span className="text-[10px] text-muted-foreground">Creative Suite</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <ImageIcon className="size-4 text-pink-600 dark:text-pink-400" />
            <div className="flex flex-col">
              <span className="font-inter text-[12px] font-bold leading-none">120+ Assets</span>
              <span className="text-[10px] text-muted-foreground">Created &amp; Delivered</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Wand2 className="size-4 text-pink-600 dark:text-pink-400" />
            <div className="flex flex-col">
              <span className="font-inter text-[12px] font-bold leading-none">100% Vector</span>
              <span className="text-[10px] text-muted-foreground">Infinite Scalability</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Sparkles className="size-4 text-pink-600 dark:text-pink-400" />
            <div className="flex flex-col">
              <span className="font-inter text-[12px] font-bold leading-none">30+ Prototypes</span>
              <span className="text-[10px] text-muted-foreground">Hi-Fi Interactions</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. VISUAL GALLERY & ARTWORK SHOWCASE (THE CORE VISUAL CENTERPIECE) */}
      <motion.div
        variants={cardVariants}
        className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm"
      >
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <ImageIcon className="size-4 text-pink-600 dark:text-pink-400" />
              <h2 className="font-inter text-[16px] font-black uppercase tracking-tight text-foreground md:text-[18px]">
                Visual Gallery &amp; Creative Artifacts
              </h2>
            </div>
            <p className="font-inter text-[12px] text-muted-foreground">
              Filter and explore design deliverables across user interfaces, brand marks, vector
              artwork, motion graphics, and 3D scenes.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-[8px] bg-muted/30 p-1 border border-border/40">
            {[
              { id: 'all', label: 'All Artifacts' },
              { id: 'ui', label: 'UI / UX' },
              { id: 'branding', label: 'Branding' },
              { id: 'vector', label: 'Vector Art' },
              { id: '3d', label: '3D Renders' },
              { id: 'motion', label: 'Motion Reels' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-[6px] px-3 py-1 text-[11px] font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredGallery.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedGalleryItem(item)}
              className="group cursor-pointer flex flex-col justify-between overflow-hidden rounded-[10px] border border-border/40 bg-muted/10 p-3 shadow-2xs transition-all hover:border-pink-500/50 hover:shadow-md"
            >
              <div>
                {/* Artwork Thumbnail with Tool Badge */}
                <div className="relative mb-3 h-44 w-full overflow-hidden rounded-[8px] bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-2.5 top-2.5 rounded-full bg-black/60 px-2.5 py-0.5 font-mono text-[9.5px] font-bold text-white backdrop-blur-md border border-white/10">
                    {item.categoryLabel}
                  </div>
                  <div className="absolute right-2.5 top-2.5 flex size-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-md">
                    <Maximize2 className="size-3.5" />
                  </div>
                </div>

                {/* Title & Metadata */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-inter text-[13px] font-bold leading-snug text-foreground">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-3 flex items-center justify-between border-t border-border/30 pt-2.5">
                <span
                  className={`rounded-[4px] border px-2 py-0.5 font-mono text-[9px] font-bold ${item.toolColor}`}
                >
                  {item.tool}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">{item.metrics}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 3. INTERACTIVE DESIGN SYSTEM & COMPONENT LABORATORY */}
      <motion.div
        variants={cardVariants}
        className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm"
      >
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Boxes className="size-4 text-pink-600 dark:text-pink-400" />
              <h2 className="font-inter text-[16px] font-black uppercase tracking-tight text-foreground md:text-[18px]">
                Interactive Design System &amp; Tokens Laboratory
              </h2>
            </div>
            <p className="font-inter text-[12px] text-muted-foreground">
              Live token playground showcasing interactive color tokens, UI component primitives,
              and responsive typography scales.
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-[8px] bg-muted/30 p-1 border border-border/40">
            <button
              onClick={() => setActiveInteractiveTab('tokens')}
              className={`rounded-[6px] px-3 py-1 text-[11px] font-semibold transition-all ${
                activeInteractiveTab === 'tokens'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Color Tokens
            </button>
            <button
              onClick={() => setActiveInteractiveTab('components')}
              className={`rounded-[6px] px-3 py-1 text-[11px] font-semibold transition-all ${
                activeInteractiveTab === 'components'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              UI Components
            </button>
            <button
              onClick={() => setActiveInteractiveTab('typography')}
              className={`rounded-[6px] px-3 py-1 text-[11px] font-semibold transition-all ${
                activeInteractiveTab === 'typography'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Typography
            </button>
          </div>
        </div>

        {/* Tab 1: Color Tokens Swatches */}
        {activeInteractiveTab === 'tokens' && (
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-6">
            {COLOR_SWATCHES.map((swatch) => (
              <div
                key={swatch.hex}
                className="flex flex-col justify-between rounded-[10px] border border-border/40 bg-muted/10 p-3.5 transition-all hover:border-border/80"
              >
                <div>
                  <div
                    className="mb-3 h-20 w-full rounded-[6px] shadow-inner"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <h4 className="font-inter text-[12px] font-bold text-foreground">
                    {swatch.name}
                  </h4>
                  <p className="text-[10px] text-muted-foreground">{swatch.role}</p>
                </div>

                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => copyToClipboard(swatch.hex)}
                    className="flex w-full items-center justify-between rounded-[6px] bg-card p-1.5 border border-border/40 font-mono text-[10px] text-foreground hover:bg-muted/40 transition-colors"
                  >
                    <span>{swatch.hex}</span>
                    {copiedHex === swatch.hex ? (
                      <Check className="size-3 text-emerald-500" />
                    ) : (
                      <Copy className="size-3 text-muted-foreground" />
                    )}
                  </button>
                  <p className="font-mono text-[9px] text-muted-foreground text-center">
                    {swatch.hsl}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Interactive UI Component Laboratory */}
        {activeInteractiveTab === 'components' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Button Primitives */}
            <div className="rounded-[10px] border border-border/40 bg-muted/10 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-inter text-[11.5px] font-bold uppercase tracking-wider text-foreground">
                  Button Component Variants
                </span>
                <span className="font-mono text-[9px] text-muted-foreground">Figma Component</span>
              </div>
              <div className="space-y-2">
                <button className="w-full rounded-[6px] bg-pink-600 px-3 py-2 text-[12px] font-semibold text-white shadow-xs hover:bg-pink-700 transition-colors">
                  Primary Pink Solid (Default)
                </button>
                <button className="w-full rounded-[6px] border border-pink-500/50 bg-pink-500/10 px-3 py-2 text-[12px] font-semibold text-pink-600 dark:text-pink-400 hover:bg-pink-500/20 transition-colors">
                  Secondary Ghost Variant
                </button>
                <button className="w-full rounded-[6px] border border-border/60 bg-card px-3 py-2 text-[12px] font-semibold text-foreground hover:bg-muted/40 transition-colors">
                  Neutral Outline Variant
                </button>
              </div>
            </div>

            {/* Badges & Chips */}
            <div className="rounded-[10px] border border-border/40 bg-muted/10 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-inter text-[11.5px] font-bold uppercase tracking-wider text-foreground">
                  Badges &amp; Status Chips
                </span>
                <span className="font-mono text-[9px] text-muted-foreground">Tokens</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="flex items-center gap-1 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 font-mono text-[10.5px] font-bold text-pink-600 dark:text-pink-400">
                  <span className="size-1.5 rounded-full bg-pink-500" /> Active Pulse
                </span>
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-[10.5px] font-bold text-blue-600 dark:text-blue-400">
                  Info Notice
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400">
                  Vector 100%
                </span>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-[10.5px] font-bold text-amber-600 dark:text-amber-400">
                  Prototyped
                </span>
                <span className="rounded-full border border-border/50 bg-card px-3 py-1 font-mono text-[10.5px] font-medium text-foreground">
                  Neutral Surface
                </span>
              </div>
            </div>

            {/* Figma Properties Inspector */}
            <div className="rounded-[10px] border border-border/40 bg-muted/10 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-inter text-[11.5px] font-bold uppercase tracking-wider text-foreground">
                  Auto Layout Spacing Grid
                </span>
                <span className="font-mono text-[9px] text-pink-600 dark:text-pink-400">
                  8pt Base
                </span>
              </div>
              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="flex items-center justify-between rounded-[4px] bg-card p-1.5 border border-border/30">
                  <span>space-xs (4px)</span>
                  <div className="h-2 w-4 rounded bg-pink-500" />
                </div>
                <div className="flex items-center justify-between rounded-[4px] bg-card p-1.5 border border-border/30">
                  <span>space-sm (8px)</span>
                  <div className="h-2 w-8 rounded bg-pink-500" />
                </div>
                <div className="flex items-center justify-between rounded-[4px] bg-card p-1.5 border border-border/30">
                  <span>space-md (16px)</span>
                  <div className="h-2 w-16 rounded bg-pink-500" />
                </div>
                <div className="flex items-center justify-between rounded-[4px] bg-card p-1.5 border border-border/30">
                  <span>space-lg (24px)</span>
                  <div className="h-2 w-24 rounded bg-pink-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Typography Scale */}
        {activeInteractiveTab === 'typography' && (
          <div className="space-y-3 rounded-[10px] border border-border/40 bg-muted/10 p-4">
            <div className="flex items-center justify-between border-b border-border/30 pb-2">
              <span className="font-inter text-[12px] font-bold uppercase tracking-wide text-foreground">
                Typography Scale &amp; Specimen (Inter Google Font)
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">Fluid Scale</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline justify-between border-b border-border/20 pb-2">
                <span className="font-inter text-2xl font-black text-foreground">
                  Display Headline 28px
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">font-black 28px</span>
              </div>
              <div className="flex items-baseline justify-between border-b border-border/20 pb-2">
                <span className="font-inter text-lg font-bold text-foreground">
                  Heading Two 18px
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">font-bold 18px</span>
              </div>
              <div className="flex items-baseline justify-between border-b border-border/20 pb-2">
                <span className="font-inter text-[13px] font-medium text-foreground">
                  Body Regular 13px: Clear and accessible readability across devices.
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  font-medium 13px
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] text-pink-600 dark:text-pink-400">
                  Monospace Code 11px: const designToken = {`{ fill: '#ec4899' }`};
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">font-mono 11px</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* 4. CREATIVE SUITE & DESIGN TOOLS TAXONOMY */}
      <motion.div variants={cardVariants} className="space-y-4">
        <div>
          <h2 className="font-inter text-[18px] font-black uppercase tracking-tight text-foreground md:text-[20px]">
            Design Tools &amp; Creative Suite
          </h2>
          <p className="font-inter text-[12px] text-muted-foreground">
            Specialized mastery across UI/UX prototyping, vector brand assets, photo compositing,
            motion reels, and 3D rendering.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {DESIGN_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.name}
                className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <div
                      className={`flex size-9 items-center justify-center rounded-[8px] border ${tool.bg} ${tool.accent}`}
                    >
                      <Icon className="size-4.5" />
                    </div>
                    <span className="rounded bg-pink-500/10 px-1.5 py-0.2 font-mono text-[8px] font-bold text-pink-600 dark:text-pink-400">
                      {tool.level}
                    </span>
                  </div>

                  <h3 className="font-inter text-[14px] font-bold text-foreground">{tool.name}</h3>
                  <p className="mt-1 text-[10.5px] text-muted-foreground leading-tight">
                    {tool.role}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[4px] border border-border/40 bg-muted/20 px-1.5 py-0.5 text-[8.5px] font-medium text-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 border-t border-border/30 pt-3">
                  <Link
                    href={`/skills/design/${tool.slug}`}
                    className="flex items-center justify-between font-inter text-[11px] font-semibold text-pink-600 dark:text-pink-400 transition-colors hover:text-pink-700"
                  >
                    <span>Open Workspace</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 5. CREATIVE METHODOLOGY & DESIGN WORKFLOW PIPELINE */}
      <motion.div
        variants={cardVariants}
        className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="size-4 text-pink-600 dark:text-pink-400" />
            <h3 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
              5-Stage Creative Design &amp; Handoff Workflow
            </h3>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            From Conceptual Discovery to Developer Handoff
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              step: '01',
              title: 'Discover & Moodboard',
              desc: 'User personas, benchmark research, moodboards & art direction.',
              icon: Search,
            },
            {
              step: '02',
              title: 'Low-Fi Wireframing',
              desc: 'Information architecture, user flow mapping, and structural layout grids.',
              icon: Layout,
            },
            {
              step: '03',
              title: 'Design System & Tokens',
              desc: 'Figma auto-layout variables, color swatches, typography & component atoms.',
              icon: Boxes,
            },
            {
              step: '04',
              title: 'Hi-Fi Prototyping',
              desc: 'Interactive smart animations, transition curves, and usability testing.',
              icon: Sparkles,
            },
            {
              step: '05',
              title: 'Dev Handoff & Specs',
              desc: 'Clean SVG asset exports, CSS token specs, and React component alignment.',
              icon: FileCode2,
            },
          ].map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-[8px] border border-border/30 bg-muted/20 p-3.5"
              >
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-pink-600 dark:text-pink-400">
                      Phase {stage.step}
                    </span>
                    <Icon className="size-3.5 text-muted-foreground" />
                  </div>
                  <h4 className="font-inter text-[12px] font-bold text-foreground">
                    {stage.title}
                  </h4>
                  <p className="mt-1 text-[10.5px] text-muted-foreground leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 6. BOTTOM EXPLORE LINK BANNER */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-4 rounded-[12px] border border-pink-500/30 bg-pink-500/5 p-5 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-pink-500/10 text-pink-600 dark:text-pink-400">
            <Palette className="size-5" />
          </div>
          <div>
            <h4 className="font-inter text-[13px] font-bold text-foreground">
              Explore Dedicated Creative Tool Workspaces
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Inspect specialized project files, design tokens, asset galleries, and metrics for
              Figma, Illustrator, Photoshop, After Effects, and Blender.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/skills/design/figma"
            className="inline-flex items-center gap-1 rounded-[6px] bg-pink-600 px-3 py-1.5 font-inter text-[11px] font-semibold text-white shadow-xs transition-colors hover:bg-pink-700"
          >
            Figma Workspace <ArrowRight className="size-3" />
          </Link>
          <Link
            href="/skills/design/illustrator"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            Illustrator
          </Link>
          <Link
            href="/skills/design/photoshop"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            Photoshop
          </Link>
          <Link
            href="/skills/design/aftereffects"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            After Effects
          </Link>
          <Link
            href="/skills/design/blender"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            Blender
          </Link>
        </div>
      </motion.div>

      {/* GALLERY LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedGalleryItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full overflow-hidden rounded-[14px] border border-border/60 bg-card p-6 shadow-2xl"
            >
              <div className="relative mb-4 h-72 w-full overflow-hidden rounded-[10px] bg-slate-950">
                <img
                  src={selectedGalleryItem.image}
                  alt={selectedGalleryItem.title}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => setSelectedGalleryItem(null)}
                  className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] font-bold text-pink-600 dark:text-pink-400 uppercase">
                    {selectedGalleryItem.categoryLabel}
                  </span>
                  <h3 className="font-inter text-[18px] font-bold text-foreground">
                    {selectedGalleryItem.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-muted-foreground">
                    {selectedGalleryItem.description}
                  </p>
                </div>

                <span
                  className={`rounded px-2.5 py-1 font-mono text-[10px] font-bold ${selectedGalleryItem.toolColor}`}
                >
                  {selectedGalleryItem.tool}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
