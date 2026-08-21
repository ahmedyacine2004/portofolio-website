'use client';

import React, { useMemo, useState } from 'react';
import {
  Box,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileCode,
  Filter,
  Grid,
  Image as ImageIcon,
  Layers,
  List,
  Maximize2,
  Palette,
  Search,
  Sparkles,
  Tag,
  X,
} from 'lucide-react';
interface VisualAssetItem {
  id: string;
  title: string;
  category: string;
  format: string;
  dimensions: string;
  fileSize: string;
  description: string;
  tags: string[];
  accentColor: string;
}

interface StandardVisualAssetsData {
  projectName: string;
  category: string;
  totalAssetCount: number;
  totalStorageSize: string;
  categories: string[];
  assets: VisualAssetItem[];
}

interface CampaignVisualAssetsData {
  projectName: string;
  category: string;
  assetCount: number;
  totalFileSize: string;
  filterCategories: string[];
  assets: Array<Omit<VisualAssetItem, 'tags' | 'accentColor'> & { resolution: string }>;
}

type GraphicDesignVisualAssetsData = StandardVisualAssetsData | CampaignVisualAssetsData;

interface GraphicDesignVisualAssetsViewProps {
  data: GraphicDesignVisualAssetsData;
}

export function GraphicDesignVisualAssetsView({ data }: GraphicDesignVisualAssetsViewProps) {
  const normalizedData: StandardVisualAssetsData =
    'totalAssetCount' in data
      ? data
      : {
          projectName: data.projectName,
          category: data.category,
          totalAssetCount: data.assetCount,
          totalStorageSize: data.totalFileSize,
          categories: data.filterCategories,
          assets: data.assets.map((asset) => ({
            ...asset,
            tags: [asset.resolution],
            accentColor: 'from-indigo-500 to-cyan-500',
          })),
        };
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeAsset, setActiveAsset] = useState<VisualAssetItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter Assets
  const filteredAssets = useMemo(() => {
    return normalizedData.assets.filter((asset) => {
      const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
      const matchesSearch =
        asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        asset.format.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [normalizedData.assets, selectedCategory, searchQuery]);

  const handleCopyLink = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      {/* --- HEADER BANNER --- */}
      <div className="relative flex min-h-[160px] items-center justify-between overflow-hidden rounded-[8px] bg-card p-5 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="z-10 flex max-w-2xl flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-[6px] bg-indigo-600 text-white shadow-xs">
              <ImageIcon className="size-4" />
            </div>
            <span className="font-inter text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {data.category}
            </span>
          </div>

          <div>
            <h1 className="font-inter text-2xl font-black tracking-tight">{data.projectName}</h1>
            <p className="text-[11px] font-medium text-muted-foreground">
              Production-ready vector files, 3D renders, templates, and digital media assets.
            </p>
          </div>
        </div>

        <div className="z-10 hidden sm:flex items-center gap-3">
          <div className="flex flex-col items-end border-r border-border/60 pr-3">
            <span className="font-inter text-base font-black text-indigo-600 dark:text-indigo-400">
              {normalizedData.totalAssetCount} Assets
            </span>
            <span className="text-[9px] font-bold text-muted-foreground">Total In Package</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-inter text-base font-black text-emerald-600 dark:text-emerald-400">
              {normalizedData.totalStorageSize}
            </span>
            <span className="text-[9px] font-bold text-muted-foreground">Archive Size</span>
          </div>
        </div>
      </div>

      {/* --- CONTROLS STRIP (SEARCH, CATEGORY TABS, VIEW SWITCHER) --- */}
      <div className="flex flex-col gap-3 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search assets by name, tag, or format (SVG, 3D, PSD)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-[6px] border border-border/60 bg-background py-1.5 pl-8 pr-3 text-[11px] font-medium placeholder:text-muted-foreground/70 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            )}
          </div>

          {/* View Switcher & Quick Actions */}
          <div className="flex items-center gap-2">
            <div className="flex rounded-[6px] border border-border/60 bg-background p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex size-7 items-center justify-center rounded-[4px] transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Grid View"
              >
                <Grid className="size-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex size-7 items-center justify-center rounded-[4px] transition-colors ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="List View"
              >
                <List className="size-3.5" />
              </button>
            </div>

            <button className="flex items-center gap-1.5 rounded-[6px] bg-indigo-600 px-3 py-1.5 text-[10px] font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors">
              <Download className="size-3" />
              <span>Download All (.ZIP)</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 pt-1">
          {(normalizedData.categories ?? []).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 rounded-full px-3 py-1 font-inter text-[9px] font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-background text-muted-foreground hover:bg-muted hover:text-foreground border border-border/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- ASSETS DISPLAY SECTION --- */}
      {filteredAssets.length === 0 ? (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[8px] bg-card p-6 text-center shadow-md">
          <Box className="size-8 text-muted-foreground/50" />
          <h3 className="mt-2 font-inter text-xs font-bold">No visual assets found</h3>
          <p className="mt-1 text-[10px] text-muted-foreground">
            Try adjusting your search filters or category selection.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 rounded-[6px] bg-indigo-600 px-3 py-1.5 text-[10px] font-bold text-white"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group flex flex-col justify-between overflow-hidden rounded-[8px] bg-card border border-border/50 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)] hover:border-indigo-500/50 transition-all"
            >
              <div>
                {/* Visual Preview Box */}
                <div
                  className={`relative flex h-32 w-full items-center justify-center bg-gradient-to-br ${asset.accentColor} p-4`}
                >
                  <div className="flex flex-col items-center justify-center gap-1.5 text-white/90 drop-shadow-md transition-transform duration-300 group-hover:scale-105">
                    <Sparkles className="size-6" />
                    <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-white/80">
                      {asset.format.split(' ')[0]}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span className="rounded-[4px] bg-black/40 backdrop-blur-md px-1.5 py-0.5 text-[7.5px] font-extrabold text-white">
                      {asset.category}
                    </span>
                  </div>

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100">
                    <button
                      onClick={() => setActiveAsset(asset)}
                      className="flex size-7 items-center justify-center rounded-full bg-white text-gray-900 shadow-md hover:bg-indigo-50 transition-colors"
                      title="Inspect Asset"
                    >
                      <Eye className="size-3.5" />
                    </button>
                    <button
                      className="flex size-7 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-colors"
                      title="Download Asset"
                    >
                      <Download className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-3">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-inter text-[11px] font-extrabold text-foreground line-clamp-1">
                      {asset.title}
                    </h3>
                  </div>

                  <p className="mt-1 text-[9.5px] leading-relaxed text-muted-foreground line-clamp-2">
                    {asset.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {asset.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-background px-1.5 py-0.5 text-[7.5px] font-semibold text-muted-foreground border border-border/40"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="flex items-center justify-between border-t border-border/40 bg-background/50 px-3 py-2 text-[8px] font-bold text-muted-foreground">
                <span className="font-mono">{asset.dimensions}</span>
                <span className="rounded bg-indigo-500/10 px-1 py-0.5 text-indigo-600 dark:text-indigo-400">
                  {asset.fileSize}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="flex flex-col gap-2 rounded-[8px] bg-card p-2 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-between gap-3 rounded-[6px] border border-border/40 bg-background p-2.5 hover:border-indigo-500/40 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-[6px] bg-gradient-to-br ${asset.accentColor} text-white shadow-xs`}
                >
                  <ImageIcon className="size-4" />
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-inter text-[11px] font-extrabold truncate">
                      {asset.title}
                    </h3>
                    <span className="rounded bg-indigo-500/10 px-1.5 py-0.5 font-mono text-[7.5px] font-bold text-indigo-600 dark:text-indigo-400">
                      {asset.format}
                    </span>
                  </div>
                  <p className="text-[9px] text-muted-foreground truncate">{asset.description}</p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-4 shrink-0 text-[9px] font-medium text-muted-foreground">
                <span className="font-mono">{asset.dimensions}</span>
                <span className="font-mono font-bold text-foreground">{asset.fileSize}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setActiveAsset(asset)}
                  className="rounded-[4px] border border-border/60 bg-card p-1.5 text-muted-foreground hover:text-foreground"
                  title="Inspect"
                >
                  <Eye className="size-3.5" />
                </button>
                <button className="flex items-center gap-1 rounded-[4px] bg-indigo-600 px-2 py-1 text-[9px] font-bold text-white hover:bg-indigo-700">
                  <Download className="size-3" />
                  <span className="hidden sm:inline">Get File</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- ASSET PREVIEW MODAL --- */}
      {activeAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-[8px] bg-card shadow-2xl border border-border">
            {/* Modal Header Preview Frame */}
            <div
              className={`relative flex h-48 w-full items-center justify-center bg-gradient-to-br ${activeAsset.accentColor} p-6 text-white`}
            >
              <button
                onClick={() => setActiveAsset(null)}
                className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                <X className="size-4" />
              </button>

              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <Sparkles className="size-10 text-white/90 drop-shadow-md" />
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-white/80">
                  {activeAsset.format}
                </span>
              </div>
            </div>

            {/* Modal Details */}
            <div className="flex flex-col gap-3 p-4">
              <div>
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[8px] font-extrabold uppercase text-indigo-600 dark:text-indigo-400">
                  {activeAsset.category}
                </span>
                <h2 className="mt-1 font-inter text-base font-black">{activeAsset.title}</h2>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  {activeAsset.description}
                </p>
              </div>

              {/* Asset Metadata Grid */}
              <div className="grid grid-cols-3 gap-2 rounded-[6px] bg-background p-2.5 text-[9px] border border-border/40">
                <div className="flex flex-col">
                  <span className="font-bold text-muted-foreground">Format</span>
                  <span className="font-mono font-black">{activeAsset.format}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-muted-foreground">Dimensions</span>
                  <span className="font-mono font-black">{activeAsset.dimensions}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-muted-foreground">File Size</span>
                  <span className="font-mono font-black">{activeAsset.fileSize}</span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleCopyLink(activeAsset.id)}
                  className="flex items-center gap-1 rounded-[6px] border border-border/60 bg-background px-3 py-1.5 text-[10px] font-bold text-foreground hover:bg-muted"
                >
                  <Copy className="size-3" />
                  <span>{copiedId === activeAsset.id ? 'Copied Link!' : 'Copy Asset Link'}</span>
                </button>
                <button className="flex items-center gap-1.5 rounded-[6px] bg-indigo-600 px-4 py-1.5 text-[10px] font-bold text-white shadow-md hover:bg-indigo-700">
                  <Download className="size-3" />
                  <span>Download Package</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
