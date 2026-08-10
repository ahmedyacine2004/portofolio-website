'use client';

import { FolderKanban, Star, Clock3, Archive } from 'lucide-react';

export function ProjectsSecondarySidebar() {
  return (
    <aside className="flex h-full w-[180px] flex-col rounded-sm bg-background p-3 shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
      <div className="mb-4">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-primary">Projects</p>
        <h2 className="mt-1 text-sm font-semibold text-foreground">Project Explorer</h2>
      </div>

      <nav className="flex flex-col gap-1">
        <button className="flex items-center gap-2 rounded-xs bg-muted px-2 py-2 text-left text-[10px] text-foreground">
          <FolderKanban className="size-3.5" />
          All Projects
        </button>

        <button className="flex items-center gap-2 rounded-xs px-2 py-2 text-left text-[10px] text-foreground-secondary hover:bg-muted">
          <Star className="size-3.5" />
          Featured
        </button>

        <button className="flex items-center gap-2 rounded-xs px-2 py-2 text-left text-[10px] text-foreground-secondary hover:bg-muted">
          <Clock3 className="size-3.5" />
          In Progress
        </button>

        <button className="flex items-center gap-2 rounded-xs px-2 py-2 text-left text-[10px] text-foreground-secondary hover:bg-muted">
          <Archive className="size-3.5" />
          Archived
        </button>
      </nav>
    </aside>
  );
}
