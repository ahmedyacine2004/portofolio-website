'use client';

import type { UIUXPrototypeData } from '@/data/projects/neobank-mobile';
import {
  CheckCircle2,
  ExternalLink,
  Eye,
  Layers,
  MousePointer,
  Play,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

interface UIUXProjectPrototypeViewProps {
  data: UIUXPrototypeData;
}

export function UIUXProjectPrototypeView({ data }: UIUXProjectPrototypeViewProps) {
  const [currentScreenId, setCurrentScreenId] = useState(data.defaultScreenId);
  const [showHotspots, setShowHotspots] = useState(true);
  const [interactionLog, setInteractionLog] = useState<string[]>([
    'Prototype initialized on iPhone 15 Pro Frame.',
  ]);

  const currentScreen = data.screens.find((s) => s.id === currentScreenId) || data.screens[0];
  const currentHotspots = currentScreen?.hotspots ?? [];

  const handleHotspotClick = (targetId: string, label: string, actionType: string) => {
    setCurrentScreenId(targetId);
    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setInteractionLog((prev) => [
      `[${timestamp}] ${actionType}: ${label} -> Navigated to "${
        data.screens.find((s) => s.id === targetId)?.name || targetId
      }"`,
      ...prev.slice(0, 8),
    ]);
  };

  const handleReset = () => {
    setCurrentScreenId(data.defaultScreenId);
    setInteractionLog((prev) => [
      `[${new Date().toLocaleTimeString()}] Reset to initial launch screen.`,
      ...prev,
    ]);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      {/* --- HERO BANNER --- */}
      <div className="relative flex min-h-[180px] items-center justify-between overflow-hidden rounded-[8px] bg-card p-5 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="z-10 flex max-w-2xl flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-[6px] bg-purple-600 text-white shadow-xs shadow-purple-500/30">
              <Play className="size-4 fill-current" />
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

        <div className="z-10 hidden sm:flex items-center gap-2">
          {data.protopieUrl && (
            <a
              href={data.protopieUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-[6px] bg-purple-600 px-3 py-2 font-inter text-[10px] font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-700 transition-colors"
            >
              <ExternalLink className="size-3" />
              Open in ProtoPie
            </a>
          )}
        </div>
      </div>

      {/* --- PROTOTYPE CONTROLS TOOLBAR --- */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
            Current Screen:
          </span>
          <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 font-inter text-[10px] font-black text-purple-600 dark:text-purple-400">
            {currentScreen.name} ({currentScreen.type})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`flex items-center gap-1.5 rounded-[6px] px-2.5 py-1 text-[9.5px] font-bold transition-all ${
              showHotspots
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-background text-muted-foreground hover:bg-accent'
            }`}
          >
            <Eye className="size-3" />
            {showHotspots ? 'Hotspots Visible' : 'Hotspots Hidden'}
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-[6px] bg-background px-2.5 py-1 text-[9.5px] font-bold text-foreground hover:bg-accent transition-colors shadow-xs"
          >
            <RefreshCw className="size-3" />
            Restart Flow
          </button>
        </div>
      </div>

      {/* --- MAIN INTERACTIVE SIMULATOR & DETAILS GRID --- */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Device Frame Simulator (7 Cols) */}
        <div className="flex flex-col items-center gap-3 rounded-[8px] bg-card p-5 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)] lg:col-span-7">
          <div className="flex w-full items-center justify-between border-b border-border pb-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              Interactive Viewport Simulator
            </span>
            <span className="font-mono text-[9px] font-medium text-muted-foreground">
              {data.deviceFrame}
            </span>
          </div>

          {/* Interactive Phone Frame Container */}
          <div className="relative mx-auto my-2 flex h-[520px] w-[290px] flex-col items-center justify-between rounded-[36px] border-[6px] border-foreground/20 bg-background p-3 shadow-2xl shadow-purple-500/10 dark:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
            {/* Speaker Notch */}
            <div className="z-30 h-4 w-28 rounded-full bg-foreground/20" />

            {/* Screen Viewport Mockup Area */}
            <div className="relative flex w-full flex-1 flex-col justify-between overflow-hidden rounded-[24px] bg-gradient-to-b from-purple-900/10 to-background p-3 my-2 border border-border/40">
              {/* Dynamic Screen Mockup Skeleton */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-16 rounded-full bg-purple-500/30" />
                  <div className="size-5 rounded-full bg-foreground/10" />
                </div>
                <div className="mt-2 text-center">
                  <span className="font-inter text-xs font-black uppercase text-purple-600 dark:text-purple-400">
                    {currentScreen.name}
                  </span>
                  <p className="mt-1 text-[8.5px] text-muted-foreground line-clamp-2">
                    {currentScreen.description}
                  </p>
                </div>
              </div>

              {/* Dynamic Screen Specific Graphics */}
              <div className="flex flex-1 flex-col items-center justify-center my-4">
                {currentScreen.type === 'Home' && (
                  <div className="flex w-full flex-col gap-2 rounded-[12px] bg-purple-600 p-3 text-white shadow-md">
                    <span className="text-[8px] font-bold uppercase opacity-80">Total Balance</span>
                    <span className="font-inter text-lg font-black">$24,850.40</span>
                    <div className="mt-2 flex justify-between text-[8px] opacity-90">
                      <span>**** 4920</span>
                      <span>08/28</span>
                    </div>
                  </div>
                )}

                {currentScreen.type === 'Transfer' && (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[9px] font-bold text-muted-foreground">
                      Sending to Alex Rivera
                    </span>
                    <span className="font-inter text-2xl font-black text-purple-600 dark:text-purple-400">
                      $150.00
                    </span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8px] font-bold text-emerald-600">
                      Zero Transfer Fee
                    </span>
                  </div>
                )}

                {currentScreen.type === 'Success' && (
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                      <CheckCircle2 className="size-6" />
                    </div>
                    <span className="font-inter text-xs font-black text-emerald-600 dark:text-emerald-400">
                      Payment Sent!
                    </span>
                    <span className="text-[8px] text-muted-foreground">
                      Transaction ID: #TXN-902418
                    </span>
                  </div>
                )}

                {(currentScreen.type === 'Analytics' || currentScreen.type === 'Cards') && (
                  <div className="flex h-24 w-full items-center justify-center rounded-[12px] border border-dashed border-purple-500/30 bg-purple-500/5 text-[9px] font-bold text-purple-600 dark:text-purple-400">
                    Interactive {currentScreen.type} Visual State
                  </div>
                )}
              </div>

              {/* Interactive Hotspots Layer */}
              {showHotspots &&
                currentHotspots.map((hs) => {
                  const position = hs.position ?? {
                    xPercentage: 20,
                    yPercentage: 20,
                    widthPercentage: 25,
                    heightPercentage: 8,
                  };

                  return (
                    <button
                      key={hs.id}
                      onClick={() => handleHotspotClick(hs.targetScreenId, hs.label, hs.actionType)}
                      style={{
                        left: `${position.xPercentage}%`,
                        top: `${position.yPercentage}%`,
                        width: `${position.widthPercentage}%`,
                        height: `${position.heightPercentage}%`,
                      }}
                      className="absolute z-40 flex items-center justify-center rounded-[6px] border border-purple-400/80 bg-purple-500/30 font-inter text-[8px] font-black text-white shadow-xs backdrop-blur-[1px] animate-pulse hover:bg-purple-600/60 transition-all"
                    >
                      <MousePointer className="mr-0.5 size-2.5" />
                      {hs.label}
                    </button>
                  );
                })}

              {/* Home Indicator Bar */}
              <div className="mx-auto h-1 w-16 rounded-full bg-foreground/20" />
            </div>

            {/* Bottom Home Button */}
            <div className="z-30 h-1 w-20 rounded-full bg-foreground/20" />
          </div>

          <p className="text-[9px] font-medium text-muted-foreground text-center">
            Click on highlighted hotspots inside the screen to trigger prototype transitions.
          </p>
        </div>

        {/* Micro-Interactions & Real-Time Event Log (5 Cols) */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {/* Micro-Interactions for Current Screen */}
          <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-purple-600 dark:text-purple-400" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                Micro-Animations & Motion Specs
              </h2>
            </div>

            <div className="space-y-2">
              {currentScreen.microInteractions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-1 rounded-[6px] bg-background/80 p-2.5 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9.5px] font-bold text-purple-600 dark:text-purple-400">
                      Trigger: {item.trigger}
                    </span>
                    <span className="font-mono text-[8px] font-extrabold text-muted-foreground">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-[9px] leading-relaxed text-muted-foreground">{item.effect}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Interaction Console Log */}
          <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-purple-600 dark:text-purple-400" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                State Transition Log
              </h2>
            </div>

            <div className="h-36 overflow-y-auto rounded-[6px] bg-black/90 p-2.5 font-mono text-[8.5px] text-emerald-400 space-y-1">
              {interactionLog.map((log, i) => (
                <div key={i} className="leading-tight opacity-90">
                  &gt; {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
