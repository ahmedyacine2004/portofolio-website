'use client';

import type { FrontendWorkspaceData } from '@/data/skills/react-workspace';

import BackendBaseView from './BackendView';
import DatabasesBaseView from './DatabasesView';
import DesignBaseView from './DesignView';
import DevOpsAndToolsView from './DevOpsAndToolsView';
import FrontendBaseView from './FrontendView';

function CategoryShell({
  data,
  category,
  accent,
  label,
  children,
}: {
  data: FrontendWorkspaceData;
  category: string;
  accent: string;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="h-full w-full overflow-y-auto rounded-[8px] bg-background p-4 text-foreground md:p-8">
      <div className="mx-auto max-w-[1400px] space-y-4">
        <div className={`rounded-[12px] border border-border/60 bg-card p-3 shadow-sm ${accent}`}>
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-current opacity-80" />
            <p className="font-inter text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {category}
            </p>
          </div>
          <h1 className="mt-2 font-inter text-xl font-black uppercase tracking-tight md:text-[22px]">
            {label} WORKSPACE
          </h1>
        </div>
        {children || <FrontendBaseView data={data} />}
      </div>
    </div>
  );
}

export function FrontendView({ data }: { data: FrontendWorkspaceData }) {
  return <FrontendBaseView data={data} />;
}

export function BackendView({ data }: { data: FrontendWorkspaceData }) {
  return (
    <CategoryShell
      data={data}
      category="Backend"
      accent="text-emerald-600 dark:text-emerald-400"
      label={data.skillName}
    >
      <BackendBaseView data={data} />
    </CategoryShell>
  );
}

export function DatabasesView({ data }: { data: FrontendWorkspaceData }) {
  return (
    <CategoryShell
      data={data}
      category="Databases"
      accent="text-violet-600 dark:text-violet-400"
      label={data.skillName}
    >
      <DatabasesBaseView data={data} />
    </CategoryShell>
  );
}

export function DesignView({ data }: { data: FrontendWorkspaceData }) {
  return (
    <CategoryShell
      data={data}
      category="Design"
      accent="text-pink-600 dark:text-pink-400"
      label={data.skillName}
    >
      <DesignBaseView data={data} />
    </CategoryShell>
  );
}

export function DevOpsView({ data }: { data: FrontendWorkspaceData }) {
  return (
    <CategoryShell
      data={data}
      category="DevOps & Tools"
      accent="text-amber-600 dark:text-amber-400"
      label={data.skillName}
    >
      <DevOpsAndToolsView data={data} />
    </CategoryShell>
  );
}

export function APIsView({ data }: { data: FrontendWorkspaceData }) {
  return (
    <CategoryShell
      data={data}
      category="APIs & Services"
      accent="text-lime-600 dark:text-lime-400"
      label={data.skillName}
    />
  );
}

export function MobileDesktopView({ data }: { data: FrontendWorkspaceData }) {
  return (
    <CategoryShell
      data={data}
      category="Mobile & Desktop"
      accent="text-slate-600 dark:text-slate-400"
      label={data.skillName}
    />
  );
}

export function ToolingView({ data }: { data: FrontendWorkspaceData }) {
  return (
    <CategoryShell
      data={data}
      category="Tools & Workflow"
      accent="text-gray-700 dark:text-gray-300"
      label={data.skillName}
    >
      <DevOpsAndToolsView data={data} />
    </CategoryShell>
  );
}
