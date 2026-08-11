'use client';

import React from 'react';
import {
  Sparkles,
  Layers,
  CheckCircle2,
  Calendar,
  Clock,
  Building2,
  Quote,
  ArrowUpRight,
  Target,
  Lightbulb,
  Award,
} from 'lucide-react';
import type { BrandingOverviewData } from '@/data/projects/lumina-studio';

interface BrandingOverviewViewProps {
  data: BrandingOverviewData;
}

export function BrandingOverviewView({ data }: BrandingOverviewViewProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      {/* --- HERO BANNER & PROJECT META --- */}
      <div className="relative flex flex-col min-h-[180px] justify-between overflow-hidden rounded-[8px] bg-card p-6 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)] gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              <Sparkles className="size-3" />
              {data.heroBanner.badge}
            </span>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              {data.status}
            </span>
          </div>

          <div>
            <h1 className="font-inter text-3xl font-black tracking-tight">{data.projectName}</h1>
            <p className="mt-1 font-inter text-sm font-semibold text-violet-600 dark:text-violet-400">
              {data.tagline}
            </p>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed max-w-3xl">
              {data.heroBanner.description}
            </p>
          </div>
        </div>

        {/* Meta Pills */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-border/40 pt-4">
          <div className="flex items-center gap-2.5">
            <Building2 className="size-4 text-violet-600 dark:text-violet-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase text-muted-foreground">Client</span>
              <span className="text-[11px] font-extrabold">{data.client}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Layers className="size-4 text-violet-600 dark:text-violet-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase text-muted-foreground">Industry</span>
              <span className="text-[11px] font-extrabold">{data.industry}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Calendar className="size-4 text-violet-600 dark:text-violet-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase text-muted-foreground">Year</span>
              <span className="text-[11px] font-extrabold">{data.year}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Clock className="size-4 text-violet-600 dark:text-violet-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase text-muted-foreground">Duration</span>
              <span className="text-[11px] font-extrabold">{data.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- METRICS ROW --- */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {data.metrics.map((metric, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-[8px] bg-card p-4 border border-border/50 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                {metric.label}
              </span>
              {metric.trend && (
                <span className="inline-flex items-center gap-0.5 font-mono text-[9px] font-black text-emerald-500">
                  <ArrowUpRight className="size-3" />
                  {metric.trend}
                </span>
              )}
            </div>
            <div className="mt-3">
              <span className="font-inter text-2xl font-black">{metric.value}</span>
              <p className="mt-1 text-[9.5px] font-medium text-muted-foreground">
                {metric.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- EXECUTIVE SUMMARY (CHALLENGE / STRATEGY / OUTCOME) --- */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="flex flex-col gap-2 rounded-[8px] bg-card p-4 border border-border/50 shadow-sm">
          <div className="flex items-center gap-2 text-rose-500">
            <Target className="size-4" />
            <h3 className="font-inter text-xs font-bold uppercase tracking-wider">The Challenge</h3>
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            {data.executiveSummary.challenge}
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-[8px] bg-card p-4 border border-border/50 shadow-sm">
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400">
            <Lightbulb className="size-4" />
            <h3 className="font-inter text-xs font-bold uppercase tracking-wider">The Strategy</h3>
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            {data.executiveSummary.strategy}
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-[8px] bg-card p-4 border border-border/50 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-500">
            <Award className="size-4" />
            <h3 className="font-inter text-xs font-bold uppercase tracking-wider">The Outcome</h3>
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            {data.executiveSummary.outcome}
          </p>
        </div>
      </div>

      {/* --- BRAND PILLARS --- */}
      <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-sm border border-border/50">
        <div className="border-b border-border/40 pb-2.5">
          <h2 className="font-inter text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Core Brand Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.brandPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-[8px] border border-border/50 bg-background p-3.5 shadow-xs"
            >
              <div className="flex flex-col gap-2">
                <span className="w-fit rounded bg-violet-500/10 px-2 py-0.5 text-[8px] font-extrabold uppercase text-violet-600 dark:text-violet-400">
                  {pillar.tag}
                </span>
                <h4 className="font-inter text-[12px] font-extrabold">{pillar.title}</h4>
                <p className="text-[10px] leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- DELIVERABLES CHECKLIST --- */}
      <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-sm border border-border/50">
        <div className="border-b border-border/40 pb-2.5">
          <h2 className="font-inter text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Scope & Delivered Assets
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {data.deliverables.map((group, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2.5 rounded-[8px] border border-border/50 bg-background p-3.5"
            >
              <h3 className="font-inter text-[11px] font-extrabold text-foreground border-b border-border/30 pb-1.5">
                {group.category}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="flex items-start gap-2 text-[10px] text-muted-foreground"
                  >
                    <CheckCircle2 className="size-3.5 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* --- TESTIMONIAL --- */}
      {data.testimonial && (
        <div className="min-h-[120px] relative overflow-hidden rounded-[8px] bg-gradient-to-r from-violet-600/10 via-purple-600/5 to-transparent p-5 border border-violet-500/20 shadow-sm">
          <div className="flex items-start gap-3">
            <Quote className="size-8 text-violet-600 dark:text-violet-400 shrink-0 opacity-40" />
            <div className="flex flex-col gap-2">
              <p className="font-inter text-xs italic font-medium leading-relaxed text-foreground">
                {data.testimonial.quote}
              </p>
              <div>
                <span className="font-inter text-[11px] font-black text-foreground block">
                  {data.testimonial.author}
                </span>
                <span className="text-[9.5px] font-medium text-muted-foreground">
                  {data.testimonial.role} — {data.testimonial.company}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
