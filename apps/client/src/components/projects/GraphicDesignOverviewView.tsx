'use client';

import React from 'react';
import {
  Award,
  CheckCircle2,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Grid,
  Layers,
  Palette,
  Sparkles,
  Tag,
  Wrench,
} from 'lucide-react';
import type { GraphicDesignOverviewData } from '@/data/projects/apex-brand-kit';

interface GraphicDesignOverviewViewProps {
  data: GraphicDesignOverviewData;
}

export function GraphicDesignOverviewView({ data }: GraphicDesignOverviewViewProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      {/* --- HERO BANNER --- */}
      <div className="relative flex min-h-[200px] items-center justify-between overflow-hidden rounded-[8px] bg-card p-5 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="z-10 flex max-w-2xl flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-[6px] bg-indigo-600 text-white shadow-xs shadow-indigo-500/30">
              <Palette className="size-4 fill-current" />
            </div>
            <span className="font-inter text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {data.badgeText}
            </span>
          </div>

          <div>
            <h1 className="font-inter text-2xl font-black tracking-tight">{data.projectName}</h1>
            <p className="mt-0.5 font-inter text-[11px] font-bold text-muted-foreground">
              {data.category}
            </p>
            <p className="mt-1 text-[12px] font-medium leading-relaxed text-foreground/90">
              {data.summary}
            </p>
          </div>
        </div>

        <div className="z-10 hidden sm:flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-[6px] bg-indigo-600 px-3 py-2 font-inter text-[10px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition-colors">
            <Download className="size-3" />
            Download Brand Guidelines
          </button>
        </div>
      </div>

      {/* --- METADATA & PROJECT INFO STRIP --- */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex flex-col gap-1 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
            Client
          </span>
          <span className="font-inter text-[11px] font-extrabold">{data.client}</span>
        </div>

        <div className="flex flex-col gap-1 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
            Year & Timeline
          </span>
          <span className="font-inter text-[11px] font-extrabold">{data.year}</span>
        </div>

        <div className="flex flex-col gap-1 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
            Role
          </span>
          <span className="font-inter text-[11px] font-extrabold truncate">{data.role}</span>
        </div>

        <div className="flex flex-col gap-1 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
            Primary Tools
          </span>
          <div className="flex flex-wrap gap-1">
            {data.tools.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="rounded-full bg-indigo-500/10 px-2 py-0.5 font-inter text-[8px] font-bold text-indigo-600 dark:text-indigo-400"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Column: Case Study Core (7 Cols) */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          {/* Challenge & Solution */}
          <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                Challenge & Solution
              </h2>
            </div>

            <div className="space-y-3 text-[11px] leading-relaxed">
              <div>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  The Problem:{' '}
                </span>
                <span className="text-foreground/90">{data.challenge}</span>
              </div>
              <div className="border-t border-border/50 pt-2">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  The Outcome:{' '}
                </span>
                <span className="text-foreground/90">{data.solution}</span>
              </div>
            </div>
          </div>

          {/* Design Identity Pillars */}
          <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                Brand Identity Pillars
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {data.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between gap-2 rounded-[6px] bg-background p-3 shadow-xs border border-border/40"
                >
                  <div className="flex flex-col gap-1">
                    <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-fit font-mono text-[8px] font-bold text-indigo-600 dark:text-indigo-400 w-max">
                      {pillar.tag}
                    </span>
                    <h3 className="font-inter text-[10px] font-black">{pillar.title}</h3>
                    <p className="text-[9px] leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deliverables & Impact (5 Cols) */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {/* Deliverables Checklist */}
          <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                Design Deliverables
              </h2>
            </div>

            <div className="space-y-1.5">
              {data.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-[6px] bg-background p-2 text-[10px] font-semibold text-foreground/90 shadow-xs"
                >
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Impact Metrics */}
          <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2">
              <Award className="size-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                Project Impact
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {data.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center rounded-[6px] bg-background p-2.5 shadow-xs"
                >
                  <span className="font-inter text-base font-black text-indigo-600 dark:text-indigo-400">
                    {m.value}
                  </span>
                  <span className="mt-0.5 text-[8.5px] font-extrabold text-foreground leading-tight">
                    {m.label}
                  </span>
                  <span className="text-[7.5px] font-medium text-muted-foreground">{m.change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- BRAND ASSETS PREVIEW SECTION --- */}
      <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grid className="size-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
              Included Brand Assets
            </h2>
          </div>
          <span className="text-[9px] font-bold text-muted-foreground">
            Showing {data.assetsPreview.length} core asset packages
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.assetsPreview.map((asset) => (
            <div
              key={asset.id}
              className="flex flex-col justify-between rounded-[6px] bg-background p-3 shadow-xs border border-border/40 hover:border-indigo-500/50 transition-colors"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[7.5px] font-black uppercase text-indigo-600 dark:text-indigo-400">
                    {asset.category}
                  </span>
                  <span className="font-mono text-[8px] font-bold text-muted-foreground">
                    {asset.format}
                  </span>
                </div>

                <h3 className="font-inter text-[10.5px] font-extrabold mt-1">{asset.title}</h3>
                <p className="text-[9px] leading-relaxed text-muted-foreground line-clamp-2">
                  {asset.description}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2 text-[8px] font-medium text-muted-foreground">
                <span>{asset.dimensions}</span>
                <Eye className="size-3 text-indigo-500 hover:text-indigo-600 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
