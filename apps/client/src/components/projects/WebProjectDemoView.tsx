'use client';

import type { WebProjectDemoData } from '@/data/projects/consultify';
import {
  CheckCircle2,
  ExternalLink,
  Eye,
  Laptop,
  MapPin,
  Play,
  Rocket,
  Settings,
  Terminal,
} from 'lucide-react';
import Image from 'next/image';
import { WebProjectPageTabs } from './WebProjectPageTabs';

interface WebProjectDemoViewProps {
  data: WebProjectDemoData;
}

export function WebProjectDemoView({ data }: WebProjectDemoViewProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      <WebProjectPageTabs />
      {/* --- HERO BANNER --- */}
      <div className="relative flex min-h-[140px] items-center justify-between overflow-hidden rounded-[8px] bg-card p-5 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        {/* Left Banner Title */}
        <div className="z-10 flex flex-col gap-2">
          <div className="flex size-8 items-center justify-center rounded-[6px] bg-blue-600 text-white shadow-xs shadow-gray-300 dark:shadow-[0_0_8px_rgba(37,99,235,0.3)]">
            <Rocket className="size-4" />
          </div>
          <div>
            <span className="font-inter text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {data.badgeText}
            </span>
            <h1 className="font-inter text-2xl font-black tracking-tight">{data.projectName}</h1>
          </div>
        </div>

        {/* Right Status + Graphic Visual */}
        <div className="z-10 flex items-center gap-4">
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[9px] font-bold text-emerald-600 shadow-xs shadow-gray-300 dark:text-emerald-400 dark:shadow-none">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {data.status}
          </span>

          {data.heroImageUrl && (
            <div className="relative hidden h-24 w-44 items-center justify-center opacity-90 transition-transform hover:scale-105 sm:flex">
              <Image
                src={data.heroImageUrl}
                alt={`${data.projectName} Hero Graphic`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 176px"
                className="object-contain drop-shadow-md dark:drop-shadow-[0_0_12px_rgba(168,85,247,0.25)]"
              />
            </div>
          )}
        </div>
      </div>

      {/* --- EXECUTION CONFIGURATION CARD --- */}
      <div className="flex flex-col gap-4 rounded-[8px] bg-card p-5 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="flex items-center gap-2">
          <Settings className="size-3.5 text-primary" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            Execution Configuration
          </h2>
        </div>

        {/* Key-Value Config Rows */}
        <div className="space-y-2">
          {data.executionConfig.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-[10px]">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="size-1 rounded-full bg-purple-500" />
                {item.label}
              </span>
              <span className="font-inter font-extrabold text-foreground">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Launch Button */}
        <a
          href={data.liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-[6px] bg-blue-600 py-2.5 text-[11px] font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.99]"
        >
          <Play className="size-3.5 fill-current" />
          <span>Launch Live Demo</span>
        </a>
      </div>

      {/* --- MIDDLE SECTION: RUNTIME & PREVIEW SESSION --- */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Runtime Block */}
        <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          <div className="flex items-center gap-2">
            <Play className="size-3.5 text-primary" />
            <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">Runtime</h2>
          </div>

          {/* Highlights List */}
          <div className="space-y-1.5">
            {data.runtimeHighlights.map((highlight) => (
              <div key={highlight} className="flex items-center gap-2 text-[10px] font-bold">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* System Output Console */}
          <div className="mt-2 rounded-[6px] bg-background/80 p-3 text-[9px] shadow-md shadow-gray-300 dark:shadow-[0_0_4px_rgba(255,255,255,0.01)]">
            <span className="font-mono font-bold text-muted-foreground">$ System output</span>
            <div className="mt-2 font-mono text-[9px] font-semibold leading-tight text-foreground/90 space-y-0.5">
              {data.systemOutput.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Session Block */}
        <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          <div className="flex items-center gap-2">
            <Eye className="size-3.5 text-primary" />
            <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
              Preview Session
            </h2>
          </div>

          <div className="space-y-2">
            {/* Session Status */}
            <div className="flex items-center justify-between rounded-[6px] bg-background/80 p-2.5 shadow-xs shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.02)]">
              <span className="text-[10px] font-bold">Session Status</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8px] font-semibold text-emerald-600 dark:text-emerald-400">
                {data.previewSession.status}
              </span>
            </div>

            {/* URL */}
            <div className="flex items-center justify-between rounded-[6px] bg-background/80 p-2.5 shadow-xs shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.02)]">
              <span className="text-[10px] font-bold">URL</span>
              <a
                href={data.previewSession.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[9px] text-muted-foreground transition-colors hover:text-primary"
              >
                <span>{data.previewSession.url}</span>
                <ExternalLink className="size-3" />
              </a>
            </div>

            {/* Device */}
            <div className="flex items-center justify-between rounded-[6px] bg-background/80 p-2.5 shadow-xs shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.02)]">
              <span className="text-[10px] font-bold">Device</span>
              <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                <span>{data.previewSession.device}</span>
                <Laptop className="size-3.5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>

            {/* Region */}
            <div className="flex items-center justify-between rounded-[6px] bg-background/80 p-2.5 shadow-xs shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.02)]">
              <span className="text-[10px] font-bold">Region</span>
              <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                <span>{data.previewSession.region}</span>
                <MapPin className="size-3.5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: LAUNCH ARGUMENTS --- */}
      <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="flex items-center gap-2">
          <Terminal className="size-3.5 text-primary" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            Launch arguments
          </h2>
        </div>

        <div className="rounded-[6px] bg-background/80 p-3 font-mono text-[10px] shadow-md shadow-gray-300 dark:shadow-[0_0_4px_rgba(255,255,255,0.01)]">
          <span className="font-bold text-muted-foreground">$ arguments</span>
          <div className="mt-2 space-y-0.5 text-foreground/90">
            {data.launchArguments.map((arg, idx) => (
              <div key={idx}>{arg}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
