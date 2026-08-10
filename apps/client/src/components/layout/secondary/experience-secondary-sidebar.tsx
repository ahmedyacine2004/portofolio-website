'use client';

import { BriefcaseBusiness, CalendarDays, Building2 } from 'lucide-react';

export function ExperienceSecondarySidebar() {
  return (
    <aside className="flex h-full w-[180px] flex-col rounded-sm bg-background p-3 shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
      <div className="mb-4">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-primary">Experience</p>
        <h2 className="mt-1 text-sm font-semibold text-foreground">Career Timeline</h2>
      </div>

      <div className="flex flex-col gap-2">
        <div className="border-l-2 border-primary pl-2">
          <div className="flex items-center gap-1.5">
            <BriefcaseBusiness className="size-3.5 text-primary" />
            <p className="text-[10px] font-semibold">Current</p>
          </div>

          <p className="mt-1 text-[8px] text-foreground-secondary">Full-Stack Development</p>
        </div>

        <div className="border-l border-border pl-2">
          <div className="flex items-center gap-1.5">
            <Building2 className="size-3.5" />
            <p className="text-[10px] font-semibold">Previous</p>
          </div>

          <p className="mt-1 text-[8px] text-foreground-secondary">Development & Design</p>
        </div>

        <div className="border-l border-border pl-2">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            <p className="text-[10px] font-semibold">Timeline</p>
          </div>

          <p className="mt-1 text-[8px] text-foreground-secondary">View professional journey</p>
        </div>
      </div>
    </aside>
  );
}
