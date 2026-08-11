'use client';

import React, { useState } from 'react';
import {
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderKanban,
  Grid,
  Layers,
  Monitor,
  Sparkles,
} from 'lucide-react';
import { Carousel3D, type GalleryItem } from '../3d/Carousel3D';

export interface WebProjectGalleryData {
  projectName: string;
  tagline: string;
  liveDemoUrl?: string;
  screensUrl?: string;
  heroGraphicUrl?: string;
  items: GalleryItem[];
}

interface WebProjectGalleryViewProps {
  data: WebProjectGalleryData;
  onToggleFullscreen?: () => void;
}

export function WebProjectGalleryView({ data, onToggleFullscreen }: WebProjectGalleryViewProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  const currentItem = data.items[activeIndex] || data.items[0];

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      {/* --- HERO SECTION --- */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-[8px] bg-card p-5 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)] md:flex-row md:items-center">
        {/* Left Info */}
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-[6px] bg-primary text-primary-foreground shadow-xs shadow-gray-300 dark:shadow-none">
              <FolderKanban className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-inter text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Gallery
              </span>
              <h1 className="font-inter text-2xl font-bold tracking-tight">{data.projectName}</h1>
            </div>
          </div>

          <p className="text-[11px] leading-relaxed text-muted-foreground">{data.tagline}</p>

          <div className="mt-1 flex flex-wrap items-center gap-2.5">
            {data.liveDemoUrl && (
              <a
                href={data.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-[6px] bg-primary px-4 py-2 text-[10px] font-bold text-primary-foreground shadow-xs shadow-gray-300 transition-opacity hover:opacity-90 dark:shadow-none"
              >
                <span>Open Live Demo</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            )}
            {data.screensUrl && (
              <a
                href={data.screensUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-[6px] bg-muted px-4 py-2 text-[10px] font-bold shadow-xs shadow-gray-300 transition-colors hover:bg-accent dark:shadow-none"
              >
                <Layers className="size-3.5 text-muted-foreground" />
                <span>Browse Screens</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Hero Graphic */}
        <div className="flex h-24 w-full shrink-0 items-center justify-center overflow-hidden rounded-[6px] md:w-44">
          {data.heroGraphicUrl ? (
            <img
              src={data.heroGraphicUrl}
              alt={`${data.projectName} Graphic`}
              className="size-full object-contain drop-shadow-md dark:drop-shadow-none"
            />
          ) : (
            <div className="flex size-20 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Sparkles className="size-10" />
            </div>
          )}
        </div>
      </div>

      {/* --- 3D CAROUSEL SECTION --- */}
      <div className="rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <Carousel3D
          items={data.items}
          activeIndex={activeIndex}
          onSelectIndex={setActiveIndex}
          onToggleFullscreen={onToggleFullscreen}
        />
      </div>

      {/* --- METADATA GRID --- */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {/* Resolution */}
        <div className="flex items-center gap-3 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_4px_rgba(255,255,255,0.01)]">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Grid className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-[9px] font-medium text-muted-foreground">Resolution</span>
            <p className="truncate text-[10px] font-bold">{currentItem.resolution || '—'}</p>
          </div>
        </div>

        {/* Device */}
        <div className="flex items-center gap-3 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_4px_rgba(255,255,255,0.01)]">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Monitor className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-[9px] font-medium text-muted-foreground">Device</span>
            <p className="truncate text-[10px] font-bold">{currentItem.device || '—'}</p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-3 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_4px_rgba(255,255,255,0.01)]">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Calendar className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-[9px] font-medium text-muted-foreground">Last Updated</span>
            <p className="truncate text-[10px] font-bold">{currentItem.lastUpdated || '—'}</p>
          </div>
        </div>

        {/* File Type */}
        <div className="flex items-center gap-3 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_4px_rgba(255,255,255,0.01)]">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <FileText className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-[9px] font-medium text-muted-foreground">File Type</span>
            <p className="truncate text-[10px] font-bold">{currentItem.fileType || '—'}</p>
          </div>
        </div>
      </div>

      {/* --- THUMBNAIL RIBBON --- */}
      <div className="flex flex-col items-center gap-3 rounded-[8px] bg-card p-3 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="flex w-full items-center gap-2">
          {/* Thumb Prev */}
          <button
            onClick={() =>
              setActiveIndex((activeIndex - 1 + data.items.length) % data.items.length)
            }
            className="flex size-7 shrink-0 items-center justify-center rounded-[4px] bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            type="button"
          >
            <ChevronLeft className="size-4" />
          </button>

          {/* Thumbnail Strip */}
          <div className="grid flex-1 grid-cols-6 gap-2 overflow-hidden">
            {data.items.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative aspect-video overflow-hidden rounded-[6px] bg-background transition-all ${
                    isSelected
                      ? 'ring-2 ring-primary shadow-md shadow-gray-300 dark:shadow-[0_0_4px_rgba(255,255,255,0.03)]'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                  type="button"
                >
                  <img src={item.imageUrl} alt={item.title} className="size-full object-contain" />
                </button>
              );
            })}
          </div>

          {/* Thumb Next */}
          <button
            onClick={() => setActiveIndex((activeIndex + 1) % data.items.length)}
            className="flex size-7 shrink-0 items-center justify-center rounded-[4px] bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            type="button"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5">
            {data.items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`size-2 rounded-full transition-all ${
                  idx === activeIndex
                    ? 'w-4 bg-primary'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
                }`}
                type="button"
              />
            ))}
          </div>
          <span className="text-[9px] font-semibold text-muted-foreground">
            {activeIndex + 1}/{data.items.length}
          </span>
        </div>
      </div>
    </div>
  );
}
