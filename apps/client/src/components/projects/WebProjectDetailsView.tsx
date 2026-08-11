'use client';

import type { WebProjectDetails } from '@/data/projects/consultify';
import {
  ArrowUpRight,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Cpu,
  Database,
  Folder,
  GitBranch,
  GitFork,
  Grid,
  Layers,
  MapPin,
  Rocket,
  Settings,
  Shield,
  Smartphone,
  User,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import React from 'react';

const ICON_MAP: Record<string, LucideIcon> = {
  Shield,
  Calendar,
  Zap,
  Bell,
  Settings,
  Smartphone,
  Cpu,
  GitFork,
  Database,
  Cloud,
};

interface WebProjectDetailsViewProps {
  data: WebProjectDetails;
}

export function WebProjectDetailsView({ data }: WebProjectDetailsViewProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      {/* --- HERO SECTION --- */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Hero Main Card */}
        <div className="flex flex-col justify-between rounded-[8px] bg-card p-5 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)] lg:col-span-7">
          <div>
            <div className="flex items-start justify-between gap-4">
              {/* Folder Icon + Title Section */}
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-[4px] bg-primary/10 text-primary">
                  <Folder className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-inter text-[10px] font-semibold uppercase leading-none text-muted-foreground">
                    Project Identity
                  </span>
                  <h1 className="font-inter text-xl font-bold tracking-tight">
                    {data.projectName}
                  </h1>
                </div>
              </div>

              {/* Project Image - Uncropped */}
              {data.imageUrl && (
                <div className="flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-[6px]">
                  <img
                    src={data.imageUrl}
                    alt={`${data.projectName} Preview`}
                    className="size-full object-contain drop-shadow-md dark:drop-shadow-none"
                  />
                </div>
              )}
            </div>

            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">{data.tagline}</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <a
              href={data.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-[4px] bg-primary px-3 py-1.5 text-[10px] font-medium text-primary-foreground shadow-xs shadow-gray-300 transition-opacity hover:opacity-90 dark:shadow-none"
            >
              <span>Visit Live Demo</span>
              <ArrowUpRight className="size-3" />
            </a>
            <a
              href={data.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-[4px] bg-background px-3 py-1.5 text-[10px] font-medium shadow-xs shadow-gray-300 transition-all hover:bg-accent dark:shadow-none"
            >
              <GitBranch className="size-3" />
              <span>View Repository</span>
            </a>
          </div>
        </div>

        {/* Right Hero Info Cards */}
        <div className="grid grid-cols-1 gap-2 lg:col-span-5">
          {/* Core Objective & Target Audience */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_4px_rgba(255,255,255,0.01)]">
              <div className="flex size-6 items-center justify-center rounded-[4px] bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <MapPin className="size-3.5" />
              </div>
              <h3 className="font-inter mt-2 text-[10px] font-bold">Core Objective</h3>
              <p className="mt-1 text-[9px] leading-tight text-muted-foreground">
                {data.coreObjective}
              </p>
            </div>

            <div className="rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_4px_rgba(255,255,255,0.01)]">
              <div className="flex size-6 items-center justify-center rounded-[4px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <User className="size-3.5" />
              </div>
              <h3 className="font-inter mt-2 text-[10px] font-bold">Target Audience</h3>
              <ul className="mt-1 space-y-0.5 text-[9px] text-muted-foreground">
                {data.targetAudience.map((item) => (
                  <li key={item} className="flex items-center gap-1">
                    <span className="size-1 rounded-full bg-muted-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Current Phase */}
          <div className="rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_4px_rgba(255,255,255,0.01)]">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-[4px] bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Rocket className="size-3.5" />
              </div>
              <h3 className="font-inter text-[10px] font-bold">Current Phase</h3>
            </div>
            <ul className="mt-2 grid grid-cols-3 gap-1 text-[9px] text-muted-foreground">
              {data.currentPhase.map((phase) => (
                <li key={phase} className="flex items-center gap-1">
                  <span className="size-1 rounded-full bg-blue-500" />
                  <span className="truncate">{phase}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- SYSTEM MODULES SECTION --- */}
      <div className="rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="mb-3 flex items-center gap-2">
          <Grid className="size-3.5 text-primary" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            System Modules
          </h2>
        </div>

        <div className="space-y-1.5">
          {data.systemModules.map((module) => {
            const IconComponent = ICON_MAP[module.icon] || Layers;
            const isStable = module.status === 'Stable';

            return (
              <div
                key={module.id}
                className="flex items-center justify-between rounded-[4px] bg-background/60 px-3 py-2 shadow-xs shadow-gray-300 transition-colors hover:bg-accent/50 dark:shadow-none"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-[4px] bg-muted text-foreground">
                    <IconComponent className="size-3.5" />
                  </div>
                  <div>
                    <h4 className="font-inter text-[10px] font-bold">{module.title}</h4>
                    <p className="text-[9px] text-muted-foreground">{module.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[8px] font-semibold ${
                      isStable
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {module.status}
                  </span>
                  <ChevronRight className="size-3 text-muted-foreground" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- BOTTOM SECTION: ARCHITECTURE & HIGHLIGHTS --- */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Architecture Snapshot */}
        <div className="rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)] lg:col-span-7">
          <div className="mb-4 flex items-center gap-2">
            <GitFork className="size-3.5 text-primary" />
            <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
              Architecture Snapshot
            </h2>
          </div>

          <div className="flex items-center justify-between overflow-x-auto py-2">
            {data.architectureSnapshot.map((node, index) => {
              const NodeIcon = ICON_MAP[node.icon] || Layers;
              const isLast = index === data.architectureSnapshot.length - 1;

              return (
                <React.Fragment key={node.title}>
                  <div className="flex min-w-[70px] flex-col items-center text-center">
                    <div className="flex size-9 items-center justify-center rounded-[6px] bg-primary/10 text-primary">
                      <NodeIcon className="size-4" />
                    </div>
                    <span className="font-inter mt-2 text-[9px] font-bold leading-none">
                      {node.title}
                    </span>
                    <span className="mt-0.5 text-[8px] text-muted-foreground">{node.subtitle}</span>
                  </div>

                  {!isLast && <ChevronRight className="size-3 shrink-0 text-muted-foreground" />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Engineering Highlights */}
        <div className="rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)] lg:col-span-5">
          <div className="mb-3 flex items-center gap-2">
            <Grid className="size-3.5 text-primary" />
            <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
              Engineering Highlights
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {data.engineeringHighlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-center gap-1.5 rounded-[4px] bg-background/50 p-1.5 text-[9px] font-medium shadow-xs shadow-gray-300 dark:shadow-none"
              >
                <CheckCircle2 className="size-3 shrink-0 text-purple-600 dark:text-purple-400" />
                <span className="truncate">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
