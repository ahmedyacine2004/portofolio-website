'use client';

import type { WebProjectRepositoryData } from '@/data/projects/consultify';
import {
  BarChart2,
  BookOpen,
  ChevronRight,
  Eye,
  GitBranch,
  GitCommit,
  GitFork,
  Layers,
  Star,
  Tag,
  User,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import GithubIcon from '@/assets/icons/github.svg';

const STAT_ICON_MAP: Record<string, LucideIcon> = {
  Star,
  GitFork,
  Eye,
  Tag,
};

interface WebProjectRepositoryViewProps {
  data: WebProjectRepositoryData;
}

export function WebProjectRepositoryView({ data }: WebProjectRepositoryViewProps) {
  const [activeTab, setActiveTab] = useState(data.activeTab);

  const tabs = [
    { id: 'README', label: 'README', icon: BookOpen },
    { id: 'Commits', label: 'Commits', icon: GitCommit },
    { id: 'Branches', label: 'Branches', icon: GitBranch },
    { id: 'Releases', label: 'Releases', icon: Tag },
    { id: 'Insights', label: 'Insights', icon: BarChart2 },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[8px] bg-background p-4 text-foreground">
      {/* --- HERO BANNER --- */}
      <div className="relative flex min-h-[180px] items-center justify-between overflow-hidden rounded-[8px] bg-card p-5 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
        <div className="z-10 flex flex-col gap-2">
          <div className="flex size-9 items-center justify-center rounded-[6px] bg-blue-600 text-white shadow-xs shadow-gray-300 dark:shadow-[0_0_8px_rgba(37,99,235,0.3)]">
            <Image src={GithubIcon} alt="GitHub" className="size-5 invert" />
          </div>
          <div>
            <span className="font-inter text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {data.badgeText}
            </span>
            <h1 className="font-inter text-2xl font-black tracking-tight">{data.projectName}</h1>
            <p className="mt-0.5 text-[10px] font-semibold text-muted-foreground">
              Repository <span className="text-foreground">{data.repositoryPath}</span>
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">{data.description}</p>
          </div>
        </div>

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

      {/* --- STATS ROW --- */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-5">
        {data.stats.map((stat) => {
          const IconComp = STAT_ICON_MAP[stat.icon] || Star;
          return (
            <div
              key={stat.id}
              className="flex items-center gap-3 rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 transition-all hover:bg-accent/40 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-purple-500/10 text-purple-600 shadow-xs shadow-gray-300 dark:text-purple-400 dark:shadow-none">
                <IconComp className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-inter text-base font-black leading-none">{stat.value}</span>
                <span className="text-[9px] text-muted-foreground leading-tight mt-0.5">
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}

        {/* User Badge Card */}
        <div className="col-span-2 hidden sm:col-span-4 lg:col-span-1 lg:flex items-center justify-center rounded-[8px] bg-card p-3 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          <div className="flex size-8 items-center justify-center rounded-full bg-accent text-foreground shadow-xs shadow-gray-300 dark:shadow-none">
            <User className="size-4" />
          </div>
        </div>
      </div>

      {/* --- NOTICE & TABS NAVIGATION --- */}
      <div className="flex flex-col gap-2">
        <div className="rounded-[6px] bg-blue-500/10 px-3 py-1.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400 shadow-xs shadow-gray-300 dark:shadow-none">
          Note : Click to preview the content [Model]
        </div>

        <div className="grid grid-cols-2 gap-1.5 rounded-[8px] bg-card p-1.5 shadow-md shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)] sm:grid-cols-5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 rounded-[6px] py-2 text-[10px] font-bold transition-all ${
                  isActive
                    ? 'bg-background text-foreground shadow-sm shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.05)]'
                    : 'text-muted-foreground hover:bg-accent/40 hover:text-foreground'
                }`}
              >
                <Icon className="size-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Column: Latest Commit */}
        <div className="lg:col-span-5 flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
          <div className="flex items-center gap-2">
            <BookOpen className="size-3.5 text-primary" />
            <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
              Latest Commits
            </h2>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-inter text-[11px] font-bold text-foreground">
              {data.latestCommit.title}
            </h3>
            <span className="text-[9px] font-semibold text-muted-foreground">Author</span>
          </div>

          <div className="flex items-center gap-2.5">
            {data.latestCommit.authorAvatar ? (
              <div className="relative size-7 overflow-hidden rounded-full border border-border shadow-xs">
                <Image
                  src={data.latestCommit.authorAvatar}
                  alt={data.latestCommit.authorName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex size-7 items-center justify-center rounded-full bg-accent text-foreground">
                <User className="size-3.5" />
              </div>
            )}
            <span className="font-inter text-[10px] font-bold">{data.latestCommit.authorName}</span>
          </div>

          <div className="mt-2 flex-1 rounded-[6px] bg-background/80 p-3 font-mono text-[9px] shadow-md shadow-gray-300 dark:shadow-[0_0_4px_rgba(255,255,255,0.01)]">
            <span className="font-bold text-muted-foreground">$ Commit Message</span>
            <p className="mt-2 font-mono leading-relaxed text-foreground/90">
              {data.latestCommit.message}
            </p>
          </div>
        </div>

        {/* Middle Column: Branches & Insights */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Branches */}
          <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2">
              <GitBranch className="size-3.5 text-primary" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                Branches
              </h2>
            </div>

            <div className="space-y-1.5">
              {data.branches.map((branch) => (
                <div
                  key={branch.name}
                  className="flex items-center justify-between rounded-[6px] bg-background/80 px-3 py-2 text-[10px] shadow-xs shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.02)]"
                >
                  <span className="font-mono font-medium">{branch.name}</span>
                  {branch.isDefault && (
                    <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[8px] font-bold text-purple-600 dark:text-purple-400">
                      Default
                    </span>
                  )}
                </div>
              ))}
            </div>

            <span className="text-[9px] font-bold text-purple-600 dark:text-purple-400">
              + {data.moreBranchesCount} more branches
            </span>
          </div>

          {/* Repository Insights */}
          <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2">
              <Layers className="size-3.5 text-primary" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                Repository Insights
              </h2>
            </div>

            <div className="space-y-2 text-[10px]">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Files</span>
                <span className="font-bold">{data.insights.files}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Commits</span>
                <span className="font-bold">{data.insights.commits}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Contributors</span>
                <span className="font-bold">{data.insights.contributors}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Open Issues</span>
                <span className="font-bold">{data.insights.openIssues}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Pull Requests</span>
                <span className="font-bold">{data.insights.pullRequests}</span>
              </div>
            </div>

            <button className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-[6px] bg-blue-600 py-2 text-[10px] font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-[0.99]">
              <span>View All Insights</span>
              <ChevronRight className="size-3" />
            </button>
          </div>
        </div>

        {/* Right Column: CI Status & Languages */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* CI Status */}
          <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2">
              <Workflow className="size-3.5 text-primary" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                Continuous Integration
              </h2>
            </div>

            <div className="space-y-2 text-[10px]">
              {data.ciStatuses.map((ci) => {
                const isProd = ci.variant === 'primary';
                return (
                  <div key={ci.name} className="flex items-center justify-between">
                    <span className="font-semibold">{ci.name}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${
                        isProd
                          ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {ci.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Languages */}
          <div className="flex flex-col gap-3 rounded-[8px] bg-card p-4 shadow-lg shadow-gray-300 dark:shadow-[0_0_6px_rgba(255,255,255,0.015)]">
            <div className="flex items-center gap-2">
              <Tag className="size-3.5 text-primary" />
              <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider">
                Languages
              </h2>
            </div>

            {/* Language Distribution Bar */}
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
              {data.languages.map((lang) => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            <div className="space-y-1.5 text-[10px]">
              {data.languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="font-medium">{lang.name}</span>
                  </div>
                  <span className="font-extrabold">{lang.percentage}%</span>
                </div>
              ))}
            </div>

            <button className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-[6px] bg-blue-600 py-2 text-[10px] font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-[0.99]">
              <span>View All Languages</span>
              <ChevronRight className="size-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
