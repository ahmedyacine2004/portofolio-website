'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Compass,
  Eye,
  Grid,
  Info,
  Layers,
  Layout,
  Maximize2,
  Ruler,
  Smartphone,
  Sparkles,
  Type,
  type LucideIcon,
} from 'lucide-react';
import type { UIUXWireframesData } from '@/data/projects/neobank-mobile';

interface UIUXProjectWireframesViewProps {
  data: UIUXWireframesData;
}

export function UIUXProjectWireframesView({ data }: UIUXProjectWireframesViewProps) {
  const [activeScreenId, setActiveScreenId] = useState(data.activeScreenId);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | null>(null);

  const activeScreen =
    data.screens.find((screen) => screen.id === activeScreenId) || data.screens[0];

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      {/* --- HERO BANNER --- */}
      <div className="relative flex min-h-[180px] items-center justify-between overflow-hidden rounded-[8px] bg-card p-5 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="z-10 flex max-w-2xl flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-[6px] bg-purple-600 text-white shadow-xs shadow-purple-500/30">
              <Layout className="size-4" />
            </div>
            <span className="font-inter text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              {data.badgeText}
            </span>
          </div>

          <div>
            <h1 className="font-inter text-2xl font-black tracking-tight">{data.projectName}</h1>
            <p className="mt-0.5 font-inter text-[11px] font-bold text-muted-foreground">
              {data.category}
            </p>
            <p className="mt-1 text-[12px] font-medium leading-relaxed text-foreground/90">
              {data.description}
            </p>
          </div>
        </div>

        <div className="z-10 hidden sm:flex items-center gap-3">
          <div className="flex flex-col items-end rounded-[6px] bg-background/80 px-3 py-2 text-right shadow-xs">
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              Wireframe Screens
            </span>
            <span className="font-inter text-base font-black text-purple-600 dark:text-purple-400">
              {data.screens.length} Structural Layouts
            </span>
          </div>
        </div>
      </div>

      {/* --- DESIGN SYSTEM SPECS STRIP --- */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <div className="flex items-center gap-2.5 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          <Grid className="size-4 shrink-0 text-purple-600 dark:text-purple-400" />
          <div className="flex flex-col">
            <span className="text-[8.5px] font-bold uppercase tracking-wider text-muted-foreground">
              Grid Layout
            </span>
            <span className="font-inter text-[10px] font-extrabold line-clamp-1">
              {data.designSystemSpecs.gridSystem}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          <Type className="size-4 shrink-0 text-purple-600 dark:text-purple-400" />
          <div className="flex flex-col">
            <span className="text-[8.5px] font-bold uppercase tracking-wider text-muted-foreground">
              Typography Scale
            </span>
            <span className="font-inter text-[10px] font-extrabold line-clamp-1">
              {data.designSystemSpecs.typographyScale}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          <Ruler className="size-4 shrink-0 text-purple-600 dark:text-purple-400" />
          <div className="flex flex-col">
            <span className="text-[8.5px] font-bold uppercase tracking-wider text-muted-foreground">
              Spacing Unit
            </span>
            <span className="font-inter text-[10px] font-extrabold line-clamp-1">
              {data.designSystemSpecs.spacingUnit}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          <Smartphone className="size-4 shrink-0 text-purple-600 dark:text-purple-400" />
          <div className="flex flex-col">
            <span className="text-[8.5px] font-bold uppercase tracking-wider text-muted-foreground">
              Touch Target Min
            </span>
            <span className="font-inter text-[10px] font-extrabold line-clamp-1">
              {data.designSystemSpecs.touchTargetMin}
            </span>
          </div>
        </div>
      </div>

      {/* --- SCREEN SELECTOR TABS --- */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground px-1">
          Select Wireframe Blueprint
        </span>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {data.screens.map((screen) => {
            const isActive = screen.id === activeScreenId;
            return (
              <button
                key={screen.id}
                onClick={() => {
                  setActiveScreenId(screen.id);
                  setSelectedAnnotationId(null);
                }}
                className={`flex flex-col gap-1.5 rounded-[8px] p-3 text-left transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                    : 'bg-card text-foreground hover:bg-accent/50 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider ${
                      isActive
                        ? 'bg-purple-700/80 text-white'
                        : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                    }`}
                  >
                    {screen.fidelity}
                  </span>
                  <span className="text-[8.5px] font-mono font-medium opacity-80">
                    {screen.deviceTarget}
                  </span>
                </div>
                <h3 className="font-inter text-[11px] font-black leading-tight">{screen.title}</h3>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- WIREFRAME CANVAS & ANNOTATIONS GRID --- */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Interactive Mockup Preview (7 Cols) */}
        <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)] lg:col-span-7">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Eye className="size-4 text-purple-600 dark:text-purple-400" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                {activeScreen.title} Layout View
              </h2>
            </div>
            <span className="text-[9px] font-mono text-muted-foreground">
              {activeScreen.deviceTarget}
            </span>
          </div>

          {/* Device Wireframe Mockup Canvas */}
          <div className="relative mx-auto flex h-[480px] w-[270px] flex-col items-center justify-between rounded-[28px] border-4 border-foreground/20 bg-background/95 p-3 shadow-xl shadow-purple-500/5 dark:shadow-[0_0_20px_rgba(139,92,246,0.1)]">
            {/* Phone Notch */}
            <div className="h-4 w-24 rounded-full bg-foreground/20" />

            {/* Wireframe Mockup Content Skeleton */}
            <div className="relative flex w-full flex-1 flex-col gap-2.5 py-3">
              {/* Wireframe Annotations Overlays */}
              {activeScreen.annotations.map((ann) => {
                const isSelected = ann.id === selectedAnnotationId;
                return (
                  <button
                    key={ann.id}
                    onClick={() => setSelectedAnnotationId(ann.id)}
                    style={{
                      left: `${ann.xPercentage}%`,
                      top: `${ann.yPercentage}%`,
                    }}
                    className={`absolute z-20 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono text-[10px] font-black transition-all ${
                      isSelected
                        ? 'scale-125 bg-purple-600 text-white shadow-lg shadow-purple-500/50 ring-4 ring-purple-500/30'
                        : 'bg-purple-600 text-white hover:scale-110 shadow-md shadow-purple-500/30'
                    }`}
                  >
                    {ann.number}
                  </button>
                );
              })}

              {/* Wireframe Structural Skeleton Visual */}
              <div className="flex flex-col gap-2 rounded-[12px] border border-dashed border-purple-500/30 bg-purple-500/5 p-3">
                <div className="h-2.5 w-1/3 rounded-full bg-purple-500/20" />
                <div className="h-6 w-2/3 rounded-md bg-purple-500/30" />
                <div className="h-2 w-1/2 rounded-full bg-purple-500/15" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="h-10 rounded-[8px] border border-dashed border-foreground/20 bg-card" />
                <div className="h-10 rounded-[8px] border border-dashed border-foreground/20 bg-card" />
                <div className="h-10 rounded-[8px] border border-dashed border-foreground/20 bg-card" />
              </div>

              <div className="flex-1 rounded-[12px] border border-dashed border-foreground/20 bg-card p-3 space-y-2">
                <div className="h-3 w-1/2 rounded-full bg-foreground/10" />
                <div className="h-8 rounded-md bg-foreground/5" />
                <div className="h-8 rounded-md bg-foreground/5" />
                <div className="h-8 rounded-md bg-foreground/5" />
              </div>

              <div className="h-10 rounded-[10px] bg-purple-600/30 border border-purple-500/40" />
            </div>

            {/* Bottom Indicator Bar */}
            <div className="h-1 w-20 rounded-full bg-foreground/20" />
          </div>

          <span className="text-center text-[9px] font-semibold text-muted-foreground">
            Click annotated hotspot numbers (1-3) to inspect UX design notes.
          </span>
        </div>

        {/* Annotations & Component Breakdown (5 Cols) */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {/* Layout Structure & Grid Info */}
          <div className="flex flex-col gap-2 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2">
              <Compass className="size-4 text-purple-600 dark:text-purple-400" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                Layout & Structure
              </h2>
            </div>
            <p className="text-[10px] font-medium leading-relaxed text-muted-foreground">
              {activeScreen.layoutGrid}
            </p>
          </div>

          {/* Annotations List */}
          <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2">
              <Info className="size-4 text-purple-600 dark:text-purple-400" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                UX Annotations & Spec Notes
              </h2>
            </div>

            <div className="space-y-2.5">
              {activeScreen.annotations.map((ann) => {
                const isSelected = ann.id === selectedAnnotationId;
                return (
                  <div
                    key={ann.id}
                    onClick={() => setSelectedAnnotationId(ann.id)}
                    className={`cursor-pointer rounded-[6px] p-3 transition-all ${
                      isSelected
                        ? 'bg-purple-600/10 border border-purple-500/40 shadow-xs'
                        : 'bg-background/80 hover:bg-accent/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-600 font-mono text-[9px] font-black text-white">
                        {ann.number}
                      </span>
                      <h3 className="font-inter text-[10.5px] font-bold text-foreground">
                        {ann.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-[9.5px] leading-relaxed text-muted-foreground pl-7">
                      {ann.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Components Included List */}
          <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-purple-600 dark:text-purple-400" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                Design System Components Used
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {activeScreen.componentsUsed.map((comp) => (
                <span
                  key={comp}
                  className="flex items-center gap-1 rounded-[4px] bg-purple-500/10 px-2 py-1 text-[9px] font-extrabold text-purple-600 dark:text-purple-400"
                >
                  <CheckCircle2 className="size-2.5" />
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
