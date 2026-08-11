'use client';

import type { BrandingGuidelinesData } from '@/data/projects/lumina-studio';
import {
  BookOpen,
  Check,
  CheckCircle2,
  Compass,
  Download,
  ImageIcon,
  Palette,
  ShieldCheck,
  Type,
  X,
  XCircle,
} from 'lucide-react';

interface BrandingGuidelinesViewProps {
  data: BrandingGuidelinesData;
}

export function BrandingGuidelinesView({ data }: BrandingGuidelinesViewProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      {/* --- HERO BANNER --- */}
      <div className="relative flex min-h-[180px] w-full shrink-0 flex-col justify-between rounded-[8px] bg-card p-6 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-[6px] bg-violet-600 text-white shadow-xs">
                <BookOpen className="size-4" />
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
                <Download className="size-3.5" />
                <span>Guidelines PDF ({data.downloadPdfSize})</span>
              </button>
            </div>
          </div>

          <div>
            <h1 className="font-inter text-3xl font-black tracking-tight">
              {data.projectName} Guidelines
            </h1>
            <p className="mt-1.5 max-w-3xl text-xs font-medium text-muted-foreground leading-relaxed">
              Official brand standards, architectural design rules, clear space specifications,
              visual identity tokens, and imagery directives.
            </p>
          </div>
        </div>

        {/* Quick Spec Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/40 pt-3 text-[10px] font-extrabold text-muted-foreground">
          <span className="rounded bg-violet-500/10 px-2 py-0.5 text-violet-600 dark:text-violet-400">
            Grid: 12-Column Layout
          </span>
          <span className="rounded bg-violet-500/10 px-2 py-0.5 text-violet-600 dark:text-violet-400">
            Clear Space: 1.0X Emblem
          </span>
          <span className="rounded bg-violet-500/10 px-2 py-0.5 text-violet-600 dark:text-violet-400">
            Primary Base: #090D16
          </span>
        </div>
      </div>

      {/* --- SECTION 1: CORE BRAND PRINCIPLES --- */}
      <div className="flex min-h-[120px] w-full shrink-0 flex-col gap-3 rounded-[8px] bg-card p-4 shadow-sm border border-border/50">
        <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
          <Compass className="size-4 text-violet-600 dark:text-violet-400" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            1. Core Brand Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.principles.map((item) => (
            <div
              key={item.number}
              className="flex flex-col justify-between rounded-[8px] border border-border/50 bg-background p-3.5 shadow-xs"
            >
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs font-black text-violet-600 dark:text-violet-400">
                  {item.number}
                </span>
                <h3 className="font-inter text-[11.5px] font-extrabold">{item.title}</h3>
                <p className="text-[9.5px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION 2: LOGO CLEAR SPACE & DO'S AND DON'TS --- */}
      <div className="flex min-h-[120px] w-full shrink-0 flex-col gap-3 rounded-[8px] bg-card p-4 shadow-sm border border-border/50">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-violet-600 dark:text-violet-400" />
            <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
              2. Logo Usage & Application Standards
            </h2>
          </div>
          <span className="text-[9px] font-bold text-muted-foreground">
            Strict compliance required for external publishing
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.logoRules.map((rule) => {
            const isDo = rule.type === 'do';
            return (
              <div
                key={rule.id}
                className={`flex flex-col justify-between rounded-[8px] border p-3.5 shadow-xs transition-colors ${
                  isDo
                    ? 'border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/10'
                    : 'border-rose-500/30 bg-rose-500/5 dark:bg-rose-950/10'
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {isDo ? (
                        <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="size-4 text-rose-500 shrink-0" />
                      )}
                      <span
                        className={`font-inter text-[9px] font-black uppercase tracking-wider ${
                          isDo
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {isDo ? 'APPROVED USE' : 'FORBIDDEN USE'}
                      </span>
                    </div>

                    {rule.spec && (
                      <span className="font-mono text-[7.5px] font-extrabold text-muted-foreground">
                        {rule.spec}
                      </span>
                    )}
                  </div>

                  <h3 className="font-inter text-[11px] font-extrabold">{rule.title}</h3>
                  <p className="text-[9.5px] leading-relaxed text-muted-foreground">
                    {rule.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- SECTION 3: COLOR PALETTE & SPECIFICATIONS --- */}
      <div className="flex min-h-[120px] w-full shrink-0 flex-col gap-3 rounded-[8px] bg-card p-4 shadow-sm border border-border/50">
        <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
          <Palette className="size-4 text-violet-600 dark:text-violet-400" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            3. Color System & Usage Directives
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.colorPaletteRules.map((color) => (
            <div
              key={color.hex}
              className="flex flex-col justify-between overflow-hidden rounded-[8px] border border-border/50 bg-background shadow-xs"
            >
              <div
                className="flex h-20 w-full items-end justify-between p-2.5"
                style={{ backgroundColor: color.hex }}
              >
                <span
                  className={`rounded px-1.5 py-0.5 font-mono text-[8.5px] font-extrabold shadow-xs ${
                    color.isDarkText ? 'bg-black/20 text-black' : 'bg-white/20 text-white'
                  }`}
                >
                  {color.hex}
                </span>
              </div>

              <div className="flex flex-col gap-1 p-3">
                <h3 className="font-inter text-[11px] font-extrabold">{color.name}</h3>
                <span className="text-[8.5px] font-extrabold text-violet-600 dark:text-violet-400 uppercase">
                  {color.role}
                </span>
                <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">
                  {color.usageRule}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION 4: TYPOGRAPHY SPECIFICATIONS --- */}
      <div className="flex min-h-[120px] w-full shrink-0 flex-col gap-3 rounded-[8px] bg-card p-4 shadow-sm border border-border/50">
        <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
          <Type className="size-4 text-violet-600 dark:text-violet-400" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            4. Typography Standards & Scale Rules
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {data.typographyRules.map((typo) => (
            <div
              key={typo.fontFamily}
              className="flex flex-col justify-between rounded-[8px] border border-border/50 bg-background p-3.5 shadow-xs"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-violet-500/10 px-2 py-0.5 text-[8px] font-extrabold uppercase text-violet-600 dark:text-violet-400">
                    {typo.category}
                  </span>
                  <span className="font-mono text-[8px] text-muted-foreground">
                    Tracking: {typo.letterSpacing}
                  </span>
                </div>

                <h3 className="font-inter text-lg font-black">{typo.fontFamily}</h3>

                <div className="flex items-center gap-3 font-mono text-[8.5px] text-muted-foreground border-y border-border/40 py-1.5 my-1">
                  <div>
                    <span className="font-bold text-foreground">Line Height: </span>
                    {typo.lineHeight}
                  </div>
                  <div>
                    <span className="font-bold text-foreground">Spacing: </span>
                    {typo.letterSpacing}
                  </div>
                </div>

                <p className="text-[9.5px] leading-relaxed text-muted-foreground">
                  {typo.bestPractices}
                </p>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-border/40 pt-2">
                <span className="text-[8px] font-bold text-muted-foreground mr-1">Weights:</span>
                {typo.recommendedWeights.map((w) => (
                  <span
                    key={w}
                    className="rounded bg-muted px-1.5 py-0.5 font-mono text-[7.5px] font-bold text-foreground"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION 5: ART DIRECTION & PHOTOGRAPHY --- */}
      <div className="flex min-h-[120px] w-full shrink-0 flex-col gap-3 rounded-[8px] bg-card p-4 shadow-sm border border-border/50">
        <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
          <ImageIcon className="size-4 text-violet-600 dark:text-violet-400" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            5. Art Direction & Imagery Directives
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {data.artDirection.map((art, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 rounded-[8px] border border-border/50 bg-background p-3.5 shadow-xs"
            >
              <div>
                <h3 className="font-inter text-[11.5px] font-extrabold text-foreground">
                  {art.title}
                </h3>
                <p className="mt-1 text-[9.5px] leading-relaxed text-muted-foreground">
                  {art.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-[9px]">
                <div className="rounded-[6px] bg-emerald-500/10 p-2.5 border border-emerald-500/20">
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1">
                    <Check className="size-3" /> Preferred Imagery
                  </span>
                  <p className="mt-1 font-medium text-foreground">{art.doText}</p>
                </div>

                <div className="rounded-[6px] bg-rose-500/10 p-2.5 border border-rose-500/20">
                  <span className="font-extrabold text-rose-600 dark:text-rose-400 uppercase flex items-center gap-1">
                    <X className="size-3" /> Avoid Imagery
                  </span>
                  <p className="mt-1 font-medium text-foreground">{art.dontText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
