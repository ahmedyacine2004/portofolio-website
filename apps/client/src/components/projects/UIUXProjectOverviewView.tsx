'use client';

import React from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  CreditCard,
  Layers,
  Palette,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { UIUXProjectOverviewData } from '@/data/projects/neobank-mobile';

const FEATURE_ICON_MAP: Record<string, LucideIcon> = {
  TrendingUp,
  Zap,
  CreditCard,
  ShieldCheck,
  Compass,
  Palette,
};

interface UIUXProjectOverviewViewProps {
  data: UIUXProjectOverviewData;
}

export function UIUXProjectOverviewView({ data }: UIUXProjectOverviewViewProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      {/* --- HERO BANNER --- */}
      <div className="relative flex min-h-[180px] items-center justify-between overflow-hidden rounded-[8px] bg-card p-5 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="z-10 flex max-w-2xl flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-[6px] bg-purple-600 text-white shadow-xs shadow-purple-500/30">
              <Palette className="size-4" />
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
              {data.tagline}
            </p>
          </div>
        </div>

        <div className="z-10 flex items-center gap-4">
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[9px] font-bold text-emerald-600 shadow-xs dark:text-emerald-400 dark:shadow-none">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {data.status}
          </span>

          {data.heroImageUrl && (
            <div className="relative hidden h-28 w-44 items-center justify-center transition-transform hover:scale-105 sm:flex">
              <Image
                src={data.heroImageUrl}
                alt={`${data.projectName} Graphic`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 176px"
                className="object-contain drop-shadow-md dark:drop-shadow-[0_0_12px_rgba(139,92,246,0.3)]"
              />
            </div>
          )}
        </div>
      </div>

      {/* --- PROJECT METADATA BAR --- */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {data.metadata.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-0.5 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]"
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              {item.label}
            </span>
            <span className="font-inter text-[11px] font-extrabold text-foreground">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* --- PROBLEM VS SOLUTION & IMPACT METRICS --- */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Column: Executive Summary */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          {/* Problem Statement */}
          <div className="flex flex-col gap-2 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2 text-rose-500">
              <Target className="size-4 shrink-0" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider text-foreground">
                The Problem
              </h2>
            </div>
            <p className="text-[10px] font-medium leading-relaxed text-muted-foreground">
              {data.problemStatement}
            </p>
          </div>

          {/* Solution Statement */}
          <div className="flex flex-col gap-2 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <Sparkles className="size-4 shrink-0" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider text-foreground">
                The Solution
              </h2>
            </div>
            <p className="text-[10px] font-medium leading-relaxed text-muted-foreground">
              {data.solutionStatement}
            </p>
          </div>
        </div>

        {/* Right Column: Key Impact Metrics */}
        <div className="flex flex-col gap-3 lg:col-span-5">
          <div className="flex h-full flex-col justify-between gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-purple-600 dark:text-purple-400" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                Measurable Impact
              </h2>
            </div>

            <div className="space-y-3">
              {data.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[6px] bg-background/80 p-2.5 shadow-xs shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.02)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold">{metric.label}</span>
                    {metric.change && (
                      <span className="flex items-center text-[9px] font-black text-emerald-600 dark:text-emerald-400">
                        <ArrowUpRight className="size-3" />
                        {metric.change}
                      </span>
                    )}
                  </div>
                  <div className="font-inter text-lg font-black text-foreground">
                    {metric.value}
                  </div>
                  <p className="mt-0.5 text-[8.5px] text-muted-foreground">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- DESIGN PROCESS METHODOLOGY --- */}
      <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-purple-600 dark:text-purple-400" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            Design Process & Methodology
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {data.designProcess.map((item) => (
            <div
              key={item.step}
              className="flex flex-col justify-between gap-2 rounded-[6px] bg-background/80 p-3 shadow-xs shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.02)]"
            >
              <div>
                <span className="font-mono text-[10px] font-black text-purple-600 dark:text-purple-400">
                  {item.step}
                </span>
                <h3 className="mt-1 font-inter text-[10px] font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- KEY FEATURES & VISUAL SYSTEM --- */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Key Features (8 Cols) */}
        <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)] lg:col-span-8">
          <div className="flex items-center gap-2">
            <Smartphone className="size-4 text-purple-600 dark:text-purple-400" />
            <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
              Core Experience Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {data.keyFeatures.map((feature) => {
              const IconComp = FEATURE_ICON_MAP[feature.icon] || CheckCircle2;
              return (
                <div
                  key={feature.title}
                  className="flex gap-3 rounded-[6px] bg-background/80 p-3 shadow-xs shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.02)]"
                >
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <IconComp className="size-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-inter text-[10px] font-bold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Color Palette & Tools (4 Cols) */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          {/* Color Swatches */}
          <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2">
              <Palette className="size-4 text-purple-600 dark:text-purple-400" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                Visual Palette
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {data.colorPalette.map((color) => (
                <div
                  key={color.hex}
                  className="flex items-center gap-2 rounded-[6px] bg-background/80 p-2 shadow-xs shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.02)]"
                >
                  <span
                    className="size-4 rounded-full border border-border shadow-xs"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold">{color.name}</span>
                    <span className="font-mono text-[8px] text-muted-foreground">{color.hex}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Used */}
          <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <span className="font-inter text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Design & Prototyping Tools
            </span>
            <div className="flex flex-wrap gap-1.5">
              {data.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-[4px] bg-purple-500/10 px-2 py-1 text-[9px] font-extrabold text-purple-600 dark:text-purple-400"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
