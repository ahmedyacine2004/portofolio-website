'use client';

import type { WebProjectTechStackData } from '@/data/projects/consultify';
import { useTranslation } from '@/hooks/use-translation';
import {
  Activity,
  ChevronRight,
  Cloud,
  Code2,
  Cpu,
  Database,
  Layers,
  Monitor,
  Package,
  Palette,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { WebProjectPageTabs } from './WebProjectPageTabs';

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Database,
  Server,
  Palette,
  ShieldCheck,
  Sparkles,
  Cloud,
  Zap,
  Workflow,
  Cpu,
  Layers,
  Terminal,
  Monitor,
  Package,
  Search,
};

interface WebProjectTechStackViewProps {
  data: WebProjectTechStackData;
}

export function WebProjectTechStackView({ data }: WebProjectTechStackViewProps) {
  const { t } = useTranslation();
  const projectKey = data.projectName
    .split(/\s+/)
    .map((part, index) =>
      index === 0 ? part.toLowerCase() : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
    )
    .join('');
  const projectTranslationKey =
    projectKey === 'portfolioWorkspace'
      ? 'projects.portfolioWorkspace'
      : projectKey === 'taskflowDashboard'
        ? 'projects.taskflowDashboard'
        : projectKey === 'shopsphere'
          ? 'projects.shopsphere'
          : `projectsDetails.${projectKey}`;
  const getTechText = (key: string, fallback: string) =>
    t(`${projectTranslationKey}.techStack.${key}`, fallback);

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      <WebProjectPageTabs />
      {/* --- HERO / ENVIRONMENT HEADER --- */}
      <div className="flex flex-col gap-4 rounded-[8px] bg-card p-5 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        {/* Top Title Bar */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-primary">
              <Activity className="size-4" />
              <span className="font-inter text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {getTechText('subtitle', data.subtitle || 'Workspace environment')}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {getTechText('description', data.description)}
            </p>
            <h1 className="font-inter text-2xl font-bold tracking-tight">{data.projectName}</h1>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-[10px] font-semibold text-purple-600 shadow-xs shadow-gray-300 dark:text-purple-400 dark:shadow-[0_0_10px_rgba(168,85,247,0.2)]">
            <Sparkles className="size-3" />
            <span>
              {data.totalTechnologiesCount}{' '}
              {getTechText('technologiesLoaded', 'Technologies Loaded')}
            </span>
          </div>
        </div>

        {/* Environment Status Grid (2x2) */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {data.environmentStatus.map((env) => {
            const IconComp = ICON_MAP[env.icon] || Layers;
            const isSynced = env.status === 'Synced';

            return (
              <div
                key={env.id}
                className="flex min-h-18.5 w-full items-center justify-between gap-4 rounded-[8px] bg-background/80 p-3 shadow-md shadow-gray-300 transition-all hover:bg-accent/40 dark:shadow-[0_0_8px_rgba(255,255,255,0.025)]"
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-[6px] bg-purple-500/10 text-purple-600 shadow-xs shadow-gray-300 dark:text-purple-400 dark:shadow-[0_0_6px_rgba(168,85,247,0.15)]">
                    <IconComp className="size-4" />
                  </div>

                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <span className="font-inter text-4xl font-black leading-none text-foreground">
                      {env.count}
                    </span>

                    <div className="flex min-h-9.5 min-w-0 flex-col justify-center">
                      <h4 className="font-inter text-[11px] font-bold leading-none">
                        {getTechText(`environment.${env.id}.title`, env.title)}
                      </h4>
                      <span className="mt-0.5 block text-[9px] text-muted-foreground">
                        {env.tools}
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-semibold shadow-xs shadow-gray-300 dark:shadow-none ${
                    isSynced
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  <span className="size-1 rounded-full bg-current" />
                  {getTechText(`statuses.${env.status}`, env.status)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- CORE STACK SECTION --- */}
      <div className="rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="mb-3 flex items-center gap-2">
          <Database className="size-3.5 text-primary" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            {getTechText('coreStack', 'Core Stack')}
          </h2>
        </div>

        <div className="space-y-2">
          {data.coreStack.map((item) => {
            const IconComp = ICON_MAP[item.icon] || Cpu;

            let badgeStyle = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
            if (item.badgeVariant === 'primary') {
              badgeStyle = 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
            } else if (item.badgeVariant === 'core') {
              badgeStyle = 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
            }

            return (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-[6px] bg-background/80 px-3 py-2.5 shadow-xs shadow-gray-300 transition-all hover:bg-accent/50 dark:shadow-[0_0_6px_rgba(255,255,255,0.02)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-[4px] bg-muted text-foreground shadow-xs shadow-gray-300 dark:shadow-none">
                    <IconComp className="size-3.5" />
                  </div>
                  <div>
                    <h4 className="font-inter text-[10px] font-bold">{item.name}</h4>
                    <p className="text-[9px] text-muted-foreground">
                      {getTechText(`core.${item.id}.role`, item.role)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-semibold shadow-xs shadow-gray-300 dark:shadow-none ${badgeStyle}`}
                  >
                    <span className="size-1 rounded-full bg-current" />
                    {getTechText(`core.${item.id}.tag`, item.tag)}
                  </span>
                  <ChevronRight className="size-3 text-muted-foreground" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- RUNTIME SERVICES SECTION --- */}
      <div className="rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="mb-3 flex items-center gap-2">
          <Workflow className="size-3.5 text-primary" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            {getTechText('runtimeServices', 'Runtime Services')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {data.runtimeServices.map((service) => {
            const IconComp = ICON_MAP[service.icon] || Zap;
            return (
              <div
                key={service.id}
                className="flex items-center justify-between rounded-[6px] bg-background/80 p-2.5 shadow-xs shadow-gray-300 transition-all hover:bg-accent/40 dark:shadow-[0_0_6px_rgba(255,255,255,0.02)]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-[4px] bg-muted text-foreground shadow-xs shadow-gray-300 dark:shadow-none">
                    <IconComp className="size-3.5" />
                  </div>
                  <span className="font-inter text-[10px] font-bold">
                    {getTechText(`runtime.${service.id}.name`, service.name)}
                  </span>
                </div>

                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8px] font-semibold text-emerald-600 shadow-xs shadow-gray-300 dark:text-emerald-400 dark:shadow-none">
                  <span className="size-1 rounded-full bg-emerald-500" />
                  {getTechText(`statuses.${service.status}`, service.status)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- BUILD STATUS SECTION --- */}
      <div className="rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="mb-3 flex items-center gap-2">
          <Terminal className="size-3.5 text-primary" />
          <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
            {getTechText('buildStatus', 'Build status')}
          </h2>
        </div>

        <div className="space-y-2">
          {data.buildStatus.map((build) => {
            let badgeStyle = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
            if (build.statusVariant === 'production') {
              badgeStyle = 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
            }

            return (
              <div
                key={build.id}
                className="flex items-center justify-between rounded-[6px] bg-background/80 px-3 py-2 text-[10px] font-medium shadow-xs shadow-gray-300 transition-all hover:bg-accent/30 dark:shadow-[0_0_6px_rgba(255,255,255,0.02)]"
              >
                <span className="text-foreground/80">
                  {getTechText(`build.${build.id}.layer`, build.layer)}
                </span>
                <span
                  className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-semibold shadow-xs shadow-gray-300 dark:shadow-none ${badgeStyle}`}
                >
                  <span className="size-1 rounded-full bg-current" />
                  {getTechText(`statuses.${build.status}`, build.status)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
