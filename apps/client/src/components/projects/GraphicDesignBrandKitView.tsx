'use client';

import type { GraphicDesignBrandKitData } from '@/data/projects/apex-brand-kit';
import {
  BookOpen,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Palette,
  ShieldCheck,
  Type,
  Volume2,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface GraphicDesignBrandKitViewProps {
  data: GraphicDesignBrandKitData;
}

export function GraphicDesignBrandKitView({ data }: GraphicDesignBrandKitViewProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      {/* --- HEADER BANNER --- */}
      <div className="relative flex min-h-[120px] items-center justify-between overflow-hidden rounded-[8px] bg-card p-5 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="z-10 flex max-w-2xl flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-[6px] bg-indigo-600 text-white shadow-xs">
              <BookOpen className="size-4" />
            </div>
            <span className="font-inter text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {data.category}
            </span>
          </div>

          <div>
            <h1 className="font-inter text-2xl font-black tracking-tight">{data.projectName}</h1>
            <p className="text-[11px] font-medium text-muted-foreground">
              Official design tokens, typography specifications, color swatches, and logo usage
              rules.
            </p>
          </div>
        </div>

        <div className="z-10 hidden sm:flex items-center gap-3">
          <div className="flex flex-col items-end border-r border-border/60 pr-3">
            <span className="font-mono text-xs font-black text-indigo-600 dark:text-indigo-400">
              {data.version}
            </span>
            <span className="text-[9px] font-bold text-muted-foreground">
              Updated {data.updatedDate}
            </span>
          </div>
          <button className="flex items-center gap-1.5 rounded-[6px] bg-indigo-600 px-3 py-2 text-[10px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition-colors">
            <Download className="size-3" />
            <span>Brand Kit PDF ({data.downloadPdfSize})</span>
          </button>
        </div>
      </div>

      {/* --- SECTION 1: COLOR PALETTE & DESIGN TOKENS --- */}
      <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
          <div className="flex items-center gap-2">
            <Palette className="size-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
              Color Palette & Token System
            </h2>
          </div>
          <span className="text-[9px] font-bold text-muted-foreground">
            Click any swatch card to copy HEX value
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {(data.colors ?? []).map((color) => (
            <div
              key={color.hex}
              onClick={() => handleCopyHex(color.hex)}
              className="group flex flex-col justify-between overflow-hidden rounded-[8px] border border-border/50 bg-background shadow-xs hover:border-indigo-500/60 cursor-pointer transition-all"
            >
              {/* Color Visual Block */}
              <div
                className="relative flex h-24 w-full flex-col justify-between p-2.5 transition-transform group-hover:scale-[1.02]"
                style={{ backgroundColor: color.hex }}
              >
                <div className="flex justify-end">
                  <span
                    className={`flex items-center gap-1 rounded-[4px] px-1.5 py-0.5 font-mono text-[8px] font-bold shadow-xs ${
                      color.isDarkText ? 'bg-black/20 text-black' : 'bg-white/20 text-white'
                    }`}
                  >
                    {copiedHex === color.hex ? (
                      <>
                        <Check className="size-2.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="size-2.5" /> {color.hex}
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Color Details */}
              <div className="flex flex-col gap-1 p-2.5">
                <h3 className="font-inter text-[10.5px] font-extrabold">{color.name}</h3>
                <p className="text-[8.5px] font-medium text-muted-foreground line-clamp-1">
                  {color.role}
                </p>

                <div className="mt-2 grid grid-cols-2 gap-1 border-t border-border/40 pt-1.5 font-mono text-[7.5px] font-bold text-muted-foreground">
                  <div>
                    <span>RGB: </span>
                    <span className="text-foreground">{color.rgb}</span>
                  </div>
                  <div>
                    <span>PMS: </span>
                    <span className="text-foreground">{color.pantone}</span>
                  </div>
                  <div className="col-span-2">
                    <span>CMYK: </span>
                    <span className="text-foreground">{color.cmyk}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION 2: TYPOGRAPHY HIERARCHY --- */}
      <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
          <Type className="size-4 text-indigo-600 dark:text-indigo-400" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            Typography Hierarchy & Font Families
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {(data.typography ?? []).map((font) => (
            <div
              key={font.fontName}
              className="flex flex-col justify-between rounded-[8px] border border-border/50 bg-background p-3.5 shadow-xs"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[8px] font-extrabold uppercase text-indigo-600 dark:text-indigo-400">
                    {font.role}
                  </span>
                </div>

                <h3 className="font-inter text-lg font-black">{font.fontName}</h3>
                <p className="text-[9.5px] leading-relaxed text-muted-foreground">{font.usage}</p>

                {/* Font Specimen Preview */}
                <div className="mt-2 rounded-[6px] bg-card p-3 border border-border/40">
                  <span className="font-mono text-[7.5px] font-bold uppercase text-muted-foreground">
                    Live Specimen
                  </span>
                  <p className="mt-1 font-inter text-xs font-bold leading-snug tracking-tight text-foreground">
                    {font.sampleText}
                  </p>
                </div>
              </div>

              {/* Allowed Font Weights */}
              <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-border/40 pt-2">
                <span className="text-[8px] font-bold text-muted-foreground mr-1">Weights:</span>
                {font.weights.map((w) => (
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

      {/* --- SECTION 3: LOGO USAGE RULES (DO'S & DON'TS) --- */}
      <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
          <ShieldCheck className="size-4 text-indigo-600 dark:text-indigo-400" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            Logo Application & Clear Space Rules
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.logoRules.map((rule) => {
            const isDo = rule.type === 'do';
            return (
              <div
                key={rule.id}
                className={`flex flex-col justify-between rounded-[8px] border p-3 shadow-xs transition-colors ${
                  isDo
                    ? 'border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/10'
                    : 'border-rose-500/30 bg-rose-500/5 dark:bg-rose-950/10'
                }`}
              >
                <div className="flex flex-col gap-2">
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
                      {isDo ? 'DO THIS' : "DON'T DO THIS"}
                    </span>
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

      {/* --- SECTION 4: BRAND VOICE & TONE --- */}
      <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
          <Volume2 className="size-4 text-indigo-600 dark:text-indigo-400" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            Brand Voice & Communication Persona
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {data.voiceTraits.map((voice, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2.5 rounded-[8px] border border-border/50 bg-background p-3.5 shadow-xs"
            >
              <div>
                <h3 className="font-inter text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400">
                  {voice.trait}
                </h3>
                <p className="mt-0.5 text-[9.5px] text-muted-foreground leading-relaxed">
                  {voice.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-[9px]">
                <div className="rounded-[6px] bg-emerald-500/10 p-2.5 border border-emerald-500/20">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    Preferred Tone:
                  </span>
                  <p className="mt-1 font-medium text-foreground italic">{voice.doExample}</p>
                </div>

                <div className="rounded-[6px] bg-rose-500/10 p-2.5 border border-rose-500/20">
                  <span className="font-bold text-rose-600 dark:text-rose-400">Avoid Tone:</span>
                  <p className="mt-1 font-medium text-foreground italic">{voice.dontExample}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
