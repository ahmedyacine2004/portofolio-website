'use client';

import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  CornerDownRight,
  GitBranch,
  GitCommit,
  Layers,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import type { UIUXUserFlowData, FlowNodeType } from '@/data/projects/neobank-mobile';

interface UIUXProjectUserFlowViewProps {
  data: UIUXUserFlowData;
}

const NODE_TYPE_STYLES: Record<
  FlowNodeType,
  { label: string; badgeBg: string; textCol: string; borderCol: string }
> = {
  screen: {
    label: 'UI Screen',
    badgeBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    textCol: 'text-blue-600 dark:text-blue-400',
    borderCol: 'border-blue-500/30',
  },
  action: {
    label: 'User Action',
    badgeBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    textCol: 'text-amber-600 dark:text-amber-400',
    borderCol: 'border-amber-500/30',
  },
  decision: {
    label: 'Logic Node',
    badgeBg: 'bg-purple-500/10 dark:bg-purple-500/20',
    textCol: 'text-purple-600 dark:text-purple-400',
    borderCol: 'border-purple-500/30',
  },
  outcome: {
    label: 'Final Outcome',
    badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    textCol: 'text-emerald-600 dark:text-emerald-400',
    borderCol: 'border-emerald-500/30',
  },
};

export function UIUXProjectUserFlowView({ data }: UIUXProjectUserFlowViewProps) {
  const [activeFlowId, setActiveFlowId] = useState(data.activeFlowId);

  const activeFlow = data.userFlows.find((flow) => flow.id === activeFlowId) || data.userFlows[0];

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      {/* --- HERO BANNER --- */}
      <div className="relative flex min-h-[180px] items-center justify-between overflow-hidden rounded-[8px] bg-card p-5 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="z-10 flex max-w-2xl flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-[6px] bg-purple-600 text-white shadow-xs shadow-purple-500/30">
              <Workflow className="size-4" />
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
              Total Mapped Flows
            </span>
            <span className="font-inter text-base font-black text-purple-600 dark:text-purple-400">
              {data.totalFlowsCount} Key Journeys
            </span>
          </div>
        </div>
      </div>

      {/* --- FLOW SELECTOR TABS --- */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground px-1">
          Select User Journey
        </span>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {data.userFlows.map((flow) => {
            const isActive = flow.id === activeFlowId;
            return (
              <button
                key={flow.id}
                onClick={() => setActiveFlowId(flow.id)}
                className={`flex flex-col gap-1.5 rounded-[8px] p-3 text-left transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                    : 'bg-card text-foreground hover:bg-accent/50 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] font-extrabold uppercase tracking-wider ${
                      isActive ? 'text-purple-200' : 'text-purple-600 dark:text-purple-400'
                    }`}
                  >
                    Journey
                  </span>
                  {isActive && <Sparkles className="size-3.5 text-purple-200" />}
                </div>
                <h3 className="font-inter text-[11px] font-black leading-tight">{flow.title}</h3>
                <span
                  className={`text-[9px] font-medium ${
                    isActive ? 'text-purple-100' : 'text-muted-foreground'
                  }`}
                >
                  {flow.persona}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- ACTIVE FLOW METRICS STRIP --- */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Clock className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              Avg Target Duration
            </span>
            <span className="font-inter text-sm font-black">{activeFlow.estimatedTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              Completion Rate
            </span>
            <span className="font-inter text-sm font-black text-emerald-600 dark:text-emerald-400">
              {activeFlow.avgCompletionRate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-rose-500/10 text-rose-500">
            <AlertCircle className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              Primary Friction Point
            </span>
            <span className="font-inter text-[10px] font-bold leading-tight line-clamp-1">
              {activeFlow.frictionPoint}
            </span>
          </div>
        </div>
      </div>

      {/* --- VISUAL FLOW ARCHITECTURE STEPS --- */}
      <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <GitBranch className="size-4 text-purple-600 dark:text-purple-400" />
            <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
              Step-by-step Flow Sequence
            </h2>
          </div>
          <span className="text-[9px] font-extrabold text-muted-foreground">
            {activeFlow.steps.length} Sequential Nodes
          </span>
        </div>

        <div className="relative flex flex-col gap-4 pt-2">
          {activeFlow.steps.map((step, index) => {
            const nodeStyle = NODE_TYPE_STYLES[step.nodeType];
            const isLast = index === activeFlow.steps.length - 1;

            return (
              <div key={step.id} className="relative flex gap-3 sm:gap-4">
                {/* Timeline connector line */}
                {!isLast && (
                  <div className="absolute left-[15px] top-[32px] bottom-[-20px] w-[2px] bg-border sm:left-[19px]" />
                )}

                {/* Step circle node */}
                <div
                  className={`z-10 flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[10px] sm:text-[11px] font-black ${
                    step.isKeyMilestone
                      ? 'border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : 'border-purple-600 bg-card text-purple-600 dark:text-purple-400'
                  }`}
                >
                  {step.stepNumber}
                </div>

                {/* Node details card */}
                <div className="flex-1 rounded-[8px] bg-background/80 p-3.5 shadow-xs shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.02)] border border-border/60">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider ${nodeStyle.badgeBg} ${nodeStyle.textCol}`}
                      >
                        {nodeStyle.label}
                      </span>
                      <h3 className="font-inter text-[11px] font-black text-foreground">
                        {step.screenName}
                      </h3>
                    </div>

                    {step.isKeyMilestone && (
                      <span className="flex items-center gap-1 text-[8.5px] font-black text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-3" />
                        Milestone Reached
                      </span>
                    )}
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {/* User action */}
                    <div className="flex flex-col gap-0.5 rounded-[6px] bg-card p-2.5">
                      <span className="text-[8.5px] font-bold uppercase tracking-wider text-muted-foreground">
                        User Trigger / Input
                      </span>
                      <p className="text-[10px] font-semibold text-foreground/90">
                        {step.userAction}
                      </p>
                    </div>

                    {/* System response */}
                    <div className="flex flex-col gap-0.5 rounded-[6px] bg-card p-2.5">
                      <span className="text-[8.5px] font-bold uppercase tracking-wider text-muted-foreground">
                        System Logic & Response
                      </span>
                      <p className="text-[10px] font-semibold text-foreground/90">
                        {step.systemResponse}
                      </p>
                    </div>
                  </div>

                  {/* Decision branches if applicable */}
                  {step.decisionOptions && step.decisionOptions.length > 0 && (
                    <div className="mt-2.5 flex flex-col gap-1.5 rounded-[6px] bg-purple-500/10 p-2.5 text-[9px]">
                      <span className="font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider text-[8px]">
                        Conditional Decision Branches
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {step.decisionOptions.map((opt) => (
                          <div
                            key={opt.label}
                            className="flex items-center gap-1.5 rounded-[4px] bg-background/90 px-2 py-1 text-[9px] font-bold shadow-xs"
                          >
                            <CornerDownRight className="size-3 text-purple-600 dark:text-purple-400" />
                            <span>{opt.label}</span>
                            <ArrowRight className="size-2.5 text-muted-foreground" />
                            <span className="font-mono text-purple-600 dark:text-purple-400">
                              {opt.targetStep}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
