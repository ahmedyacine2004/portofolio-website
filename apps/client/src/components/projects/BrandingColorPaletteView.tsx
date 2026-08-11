'use client';

import React, { useState } from 'react';
import {
  Palette,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  Layers,
  Sliders,
  Eye,
} from 'lucide-react';
import type { BrandingColorPaletteData } from '@/data/projects/lumina-studio';

interface BrandingColorPaletteViewProps {
  data: BrandingColorPaletteData;
}

export function BrandingColorPaletteView({ data }: BrandingColorPaletteViewProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      {/* --- HERO BANNER --- */}
      <div className="relative flex min-h-[180px] w-full shrink-0 flex-col justify-between rounded-[8px] bg-card p-6 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-[6px] bg-violet-600 text-white shadow-xs">
                <Palette className="size-4" />
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
                <span>Download Swatches ({data.downloadSwatchesSize})</span>
              </button>
            </div>
          </div>

          <div>
            <h1 className="font-inter text-3xl font-black tracking-tight">
              {data.projectName} Color System
            </h1>
            <p className="mt-1.5 max-w-3xl text-xs font-medium text-muted-foreground leading-relaxed">
              Official color tokens, chromatic values (HEX, RGB, HSL, CMYK, Pantone), dynamic
              gradient definitions, and WCAG accessibility contrast benchmarks.
            </p>
          </div>
        </div>

        {/* Quick Spec Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/40 pt-3 text-[10px] font-extrabold text-muted-foreground">
          <span className="rounded bg-violet-500/10 px-2 py-0.5 text-violet-600 dark:text-violet-400">
            Primary Canvas: #090D16
          </span>
          <span className="rounded bg-violet-500/10 px-2 py-0.5 text-violet-600 dark:text-violet-400">
            Brand Accent: #7C3AED
          </span>
          <span className="rounded bg-violet-500/10 px-2 py-0.5 text-violet-600 dark:text-violet-400">
            WCAG Standard: AA / AAA Compliant
          </span>
        </div>
      </div>

      {/* --- SECTION 1: PRIMARY BRAND PALETTE --- */}
      <div className="flex min-h-[120px] w-full shrink-0 flex-col gap-3 rounded-[8px] bg-card p-4 shadow-sm border border-border/50">
        <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
          <Layers className="size-4 text-violet-600 dark:text-violet-400" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            1. Primary Brand Chromatic System
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.primaryColors.map((color) => (
            <div
              key={color.hex}
              className="flex flex-col justify-between overflow-hidden rounded-[8px] border border-border/50 bg-background shadow-xs"
            >
              {/* Color Visual Block */}
              <div
                className="relative flex h-28 w-full flex-col justify-between p-3"
                style={{ backgroundColor: color.hex }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[8px] font-black uppercase tracking-wider ${
                      color.isDarkText ? 'bg-black/20 text-black' : 'bg-white/20 text-white'
                    }`}
                  >
                    {color.role}
                  </span>
                  <button
                    onClick={() => handleCopy(color.hex)}
                    className={`flex items-center gap-1 rounded px-2 py-1 text-[8px] font-bold backdrop-blur-md transition-colors ${
                      color.isDarkText
                        ? 'bg-black/20 text-black hover:bg-black/30'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    title="Copy HEX Code"
                  >
                    {copiedCode === color.hex ? (
                      <Check className="size-3 text-emerald-400" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                    <span>{color.hex}</span>
                  </button>
                </div>

                <div
                  className={`font-mono text-[9px] font-black ${
                    color.isDarkText ? 'text-black' : 'text-white'
                  }`}
                >
                  {color.pantone ? color.pantone : color.hex}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="flex flex-col gap-2 p-3 text-[9px]">
                <div>
                  <h3 className="font-inter text-[11px] font-extrabold">{color.name}</h3>
                  <p className="mt-0.5 text-[8.5px] leading-relaxed text-muted-foreground">
                    {color.usage}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1.5 border-t border-border/40 pt-2 font-mono text-[8px] text-muted-foreground">
                  <div>
                    <span className="font-bold text-foreground">RGB: </span>
                    {color.rgb}
                  </div>
                  <div>
                    <span className="font-bold text-foreground">HSL: </span>
                    {color.hsl}
                  </div>
                  <div>
                    <span className="font-bold text-foreground">CMYK: </span>
                    {color.cmyk}
                  </div>
                  {color.pantone && (
                    <div>
                      <span className="font-bold text-foreground">PMS: </span>
                      {color.pantone}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION 2: SECONDARY & ACCENT PALETTE --- */}
      <div className="flex min-h-[120px] w-full shrink-0 flex-col gap-3 rounded-[8px] bg-card p-4 shadow-sm border border-border/50">
        <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
          <Sliders className="size-4 text-violet-600 dark:text-violet-400" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            2. Secondary & System Functional Accents
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.secondaryColors.map((color) => (
            <div
              key={color.hex}
              className="flex flex-col justify-between overflow-hidden rounded-[8px] border border-border/50 bg-background shadow-xs"
            >
              <div
                className="flex h-20 w-full items-end justify-between p-2.5"
                style={{ backgroundColor: color.hex }}
              >
                <button
                  onClick={() => handleCopy(color.hex)}
                  className={`flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[8.5px] font-extrabold backdrop-blur-md transition-colors ${
                    color.isDarkText ? 'bg-black/20 text-black' : 'bg-white/20 text-white'
                  }`}
                >
                  {copiedCode === color.hex ? (
                    <Check className="size-3 text-emerald-400" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                  <span>{color.hex}</span>
                </button>
              </div>

              <div className="flex flex-col gap-1 p-3">
                <h3 className="font-inter text-[11px] font-extrabold">{color.name}</h3>
                <span className="text-[8.5px] font-extrabold text-violet-600 dark:text-violet-400 uppercase">
                  {color.role}
                </span>
                <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">
                  {color.usage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION 3: BRAND GRADIENTS --- */}
      <div className="flex min-h-[120px] w-full shrink-0 flex-col gap-3 rounded-[8px] bg-card p-4 shadow-sm border border-border/50">
        <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
          <Sparkles className="size-4 text-violet-600 dark:text-violet-400" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            3. Brand Gradient System
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {data.gradients.map((grad) => (
            <div
              key={grad.name}
              className="flex flex-col justify-between overflow-hidden rounded-[8px] border border-border/50 bg-background p-3.5 shadow-xs"
            >
              <div className="flex flex-col gap-3">
                {/* Gradient Preview Bar */}
                <div
                  className="h-16 w-full rounded-[6px] border border-white/10 shadow-inner"
                  style={{ background: grad.cssGradient }}
                />

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-inter text-[11.5px] font-extrabold">{grad.name}</h3>
                    <button
                      onClick={() => handleCopy(grad.cssGradient)}
                      className="flex items-center gap-1 text-[8.5px] font-extrabold text-violet-600 hover:text-violet-700 dark:text-violet-400"
                    >
                      {copiedCode === grad.cssGradient ? (
                        <>
                          <Check className="size-3 text-emerald-500" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="size-3" /> Copy CSS
                        </>
                      )}
                    </button>
                  </div>
                  <span className="text-[8.5px] font-extrabold text-muted-foreground uppercase">
                    {grad.role}
                  </span>
                  <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">
                    {grad.usage}
                  </p>
                </div>
              </div>

              {/* Color Stops */}
              <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-border/40 pt-2">
                <span className="text-[8px] font-bold text-muted-foreground mr-1">Stops:</span>
                {grad.stops.map((stop, idx) => (
                  <span
                    key={idx}
                    className="rounded bg-muted px-1.5 py-0.5 font-mono text-[7.5px] font-bold text-foreground"
                  >
                    {stop}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION 4: WCAG ACCESSIBILITY MATRIX --- */}
      <div className="flex min-h-[120px] w-full shrink-0 flex-col gap-3 rounded-[8px] bg-card p-4 shadow-sm border border-border/50">
        <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
          <Eye className="size-4 text-violet-600 dark:text-violet-400" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            4. WCAG 2.1 Accessibility & Contrast Verification
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.contrastMatrix.map((pair, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-[8px] border border-border/50 bg-background p-3.5 shadow-xs"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[8px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase">
                    WCAG {pair.wcagRating}
                  </span>
                  <span className="font-mono text-[10px] font-black text-foreground">
                    {pair.ratio}
                  </span>
                </div>

                {/* Preview Box */}
                <div
                  className="flex h-12 w-full items-center justify-center rounded-[6px] border border-border/50 px-2 text-[11px] font-bold"
                  style={{ backgroundColor: pair.bgHex, color: pair.fgHex }}
                >
                  Sample Contrast Text
                </div>

                <div className="text-[8.5px] text-muted-foreground">
                  <div>
                    <span className="font-bold text-foreground">Background: </span>
                    {pair.bgName}
                  </div>
                  <div>
                    <span className="font-bold text-foreground">Foreground: </span>
                    {pair.fgName}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
