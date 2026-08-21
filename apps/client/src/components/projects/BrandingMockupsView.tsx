'use client';

import {
  Box,
  Check,
  Download,
  Filter,
  FolderDown,
  Layers,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
interface BrandingMockupItem {
  id: string;
  title: string;
  category: string;
  aspectRatio: string;
  dimensions: string;
  format: string;
  description: string;
  previewGradient: string;
  downloadSize: string;
  tags: string[];
}

interface BrandingMockupsData {
  projectName: string;
  category: string;
  version: string;
  updatedDate: string;
  downloadKitSize: string;
  totalMockupsCount: number;
  categories: Array<{ id: string; label: string; count: number }>;
  items: BrandingMockupItem[];
}

interface BrandingMockupsViewProps {
  data: BrandingMockupsData;
}

export function BrandingMockupsView({ data }: BrandingMockupsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems =
    selectedCategory === 'all'
      ? data.items
      : data.items.filter((item) => item.category === selectedCategory);

  const handleCopyLink = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      {/* --- HERO BANNER --- */}
      <div className="relative flex min-h-[180px] w-full shrink-0 flex-col justify-between rounded-[8px] bg-card p-6 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-[6px] bg-violet-600 text-white shadow-xs">
                <Box className="size-4" />
              </div>
              <span className="font-inter text-[10px] font-extrabold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                {data.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end border-r border-border/60 pr-3">
                <span className="font-mono text-xs font-black text-violet-600 dark:text-violet-400">
                  {data.version}
                </span>
                <span className="text-[9px] font-bold text-muted-foreground">
                  Updated {data.updatedDate}
                </span>
              </div>
              <button className="flex items-center gap-1.5 rounded-[6px] bg-violet-600 px-3.5 py-2 text-[10.5px] font-bold text-white shadow-md shadow-violet-500/20 hover:bg-violet-700 transition-colors">
                <FolderDown className="size-3.5" />
                <span>Download Complete Kit ({data.downloadKitSize})</span>
              </button>
            </div>
          </div>

          <div>
            <h1 className="font-inter text-3xl font-black tracking-tight">
              {data.projectName} Production Mockups
            </h1>
            <p className="mt-1.5 max-w-3xl text-xs font-medium text-muted-foreground leading-relaxed">
              Photorealistic 3D render scenes, editable smart object templates, hardware showcases,
              and spatial signage mockups.
            </p>
          </div>
        </div>

        {/* Quick Spec Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/40 pt-3 text-[10px] font-extrabold text-muted-foreground">
          <span className="rounded bg-violet-500/10 px-2 py-0.5 text-violet-600 dark:text-violet-400">
            Total Templates: {data.totalMockupsCount} Assets
          </span>
          <span className="rounded bg-violet-500/10 px-2 py-0.5 text-violet-600 dark:text-violet-400">
            Formats: PSD, Figma, Blender
          </span>
          <span className="rounded bg-violet-500/10 px-2 py-0.5 text-violet-600 dark:text-violet-400">
            Resolution: Up to 8K Ultra-HD
          </span>
        </div>
      </div>

      {/* --- SECTION 1: CATEGORY FILTER TABS --- */}
      <div className="flex min-h-[50px] w-full shrink-0 items-center justify-between gap-2 rounded-[8px] bg-card p-2 border border-border/50 shadow-xs overflow-x-auto">
        <div className="flex items-center gap-1.5">
          {data.categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-[10px] font-extrabold transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-xs'
                    : 'bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[8px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[9px] font-extrabold text-muted-foreground px-2 border-l border-border/50 shrink-0">
          <Filter className="size-3 text-violet-600 dark:text-violet-400" />
          <span>Filter by asset type</span>
        </div>
      </div>

      {/* --- SECTION 2: MOCKUP ASSETS GRID --- */}
      <div className="flex min-h-[120px] w-full shrink-0 flex-col gap-3 rounded-[8px] bg-card p-4 shadow-sm border border-border/50">
        <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
          <div className="flex items-center gap-2">
            <Layers className="size-4 text-violet-600 dark:text-violet-400" />
            <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
              High-Resolution Template Gallery
            </h2>
          </div>
          <span className="text-[9px] font-bold text-muted-foreground">
            Showing {filteredItems.length} templates
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between overflow-hidden rounded-[8px] border border-border/50 bg-background shadow-xs transition-all hover:border-violet-500/40 hover:shadow-md"
            >
              {/* Preview Graphic Block */}
              <div
                className="relative flex h-44 w-full flex-col justify-between p-3.5 transition-transform duration-300 group-hover:scale-[1.01]"
                style={{ background: item.previewGradient }}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded bg-black/40 backdrop-blur-md px-2 py-0.5 text-[8px] font-extrabold uppercase text-white shadow-xs">
                    {item.category}
                  </span>
                  <span className="rounded bg-white/20 backdrop-blur-md px-2 py-0.5 font-mono text-[8px] font-black text-white">
                    {item.format}
                  </span>
                </div>

                <div className="flex items-end justify-between">
                  <div className="flex flex-col text-white">
                    <span className="font-mono text-[8px] font-bold opacity-80">
                      {item.dimensions}
                    </span>
                    <span className="font-mono text-[8px] font-bold opacity-80">
                      Ratio {item.aspectRatio}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyLink(item.id)}
                    className="flex size-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40 transition-colors"
                    title="Copy Asset Spec"
                  >
                    {copiedId === item.id ? (
                      <Check className="size-3.5 text-emerald-300" />
                    ) : (
                      <Maximize2 className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Template Info & Action */}
              <div className="flex flex-col gap-3 p-3.5">
                <div>
                  <h3 className="font-inter text-[12px] font-extrabold">{item.title}</h3>
                  <p className="mt-1 text-[9.5px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-muted px-1.5 py-0.5 font-mono text-[7.5px] font-bold text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between border-t border-border/40 pt-2.5">
                  <span className="font-mono text-[8.5px] font-bold text-muted-foreground">
                    File Size: {item.downloadSize}
                  </span>

                  <button className="flex items-center gap-1 rounded bg-violet-600/10 px-2.5 py-1 text-[9px] font-extrabold text-violet-600 hover:bg-violet-600 hover:text-white dark:text-violet-400 transition-colors">
                    <Download className="size-3" />
                    <span>Download Template</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION 3: MOCKUP USAGE DIRECTIVES --- */}
      <div className="flex min-h-[120px] w-full shrink-0 flex-col gap-3 rounded-[8px] bg-card p-4 shadow-sm border border-border/50">
        <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
          <Sparkles className="size-4 text-violet-600 dark:text-violet-400" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            Render & Smart Object Directives
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-[9.5px]">
          <div className="flex flex-col gap-1 rounded-[6px] border border-border/50 bg-background p-3">
            <span className="font-inter font-extrabold text-foreground">
              Smart Object Placement
            </span>
            <p className="text-muted-foreground leading-relaxed">
              Always double-click designated green Smart Object layers in Photoshop to place your
              vector logos or high-res layout artwork.
            </p>
          </div>

          <div className="flex flex-col gap-1 rounded-[6px] border border-border/50 bg-background p-3">
            <span className="font-inter font-extrabold text-foreground">
              Lighting & Shadow Tuning
            </span>
            <p className="text-muted-foreground leading-relaxed">
              Use dedicated &quot;Shadow Opacity&quot;adjustment groups to adapt contrast when
              applying light or dark brand artwork variants.
            </p>
          </div>

          <div className="flex flex-col gap-1 rounded-[6px] border border-border/50 bg-background p-3">
            <span className="font-inter font-extrabold text-foreground">Export Settings</span>
            <p className="text-muted-foreground leading-relaxed">
              Export high-resolution deliverables at 100% scale in sRGB color profile for digital
              web showcases or Adobe RGB for print presentation decks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
