'use client';

import { Code2, Palette, Server, Layers } from 'lucide-react';

export function ServicesSecondarySidebar() {
  return (
    <aside className="flex h-full w-[180px] flex-col rounded-sm bg-background p-3 shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
      <div className="mb-4">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-primary">Services</p>
        <h2 className="mt-1 text-sm font-semibold text-foreground">What I Do</h2>
      </div>

      <div className="flex flex-col gap-2">
        <div className="rounded-xs bg-muted p-2">
          <Code2 className="mb-1 size-4 text-primary" />
          <p className="text-[10px] font-semibold">Web Development</p>
          <p className="mt-1 text-[8px] text-foreground-secondary">
            Modern full-stack applications.
          </p>
        </div>

        <div className="rounded-xs bg-muted p-2">
          <Palette className="mb-1 size-4 text-primary" />
          <p className="text-[10px] font-semibold">UI / UX Design</p>
          <p className="mt-1 text-[8px] text-foreground-secondary">
            Interfaces designed for people.
          </p>
        </div>

        <div className="rounded-xs bg-muted p-2">
          <Server className="mb-1 size-4 text-primary" />
          <p className="text-[10px] font-semibold">Backend Systems</p>
          <p className="mt-1 text-[8px] text-foreground-secondary">
            APIs, databases and architecture.
          </p>
        </div>

        <div className="rounded-xs bg-muted p-2">
          <Layers className="mb-1 size-4 text-primary" />
          <p className="text-[10px] font-semibold">Brand Design</p>
          <p className="mt-1 text-[8px] text-foreground-secondary">
            Visual identities and systems.
          </p>
        </div>
      </div>
    </aside>
  );
}
