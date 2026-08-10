'use client';

import { User, Palette, Bell, Shield, SlidersHorizontal } from 'lucide-react';

export function SettingsSecondarySidebar() {
  return (
    <aside className="flex h-full w-[180px] flex-col rounded-sm bg-background p-3 shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
      <div className="mb-4">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-primary">Settings</p>
        <h2 className="mt-1 text-sm font-semibold text-foreground">Preferences</h2>
      </div>

      <nav className="flex flex-col gap-1">
        <button className="flex items-center gap-2 rounded-xs bg-muted px-2 py-2 text-left text-[10px]">
          <User className="size-3.5" />
          Profile
        </button>

        <button className="flex items-center gap-2 rounded-xs px-2 py-2 text-left text-[10px] hover:bg-muted">
          <Palette className="size-3.5" />
          Appearance
        </button>

        <button className="flex items-center gap-2 rounded-xs px-2 py-2 text-left text-[10px] hover:bg-muted">
          <Bell className="size-3.5" />
          Notifications
        </button>

        <button className="flex items-center gap-2 rounded-xs px-2 py-2 text-left text-[10px] hover:bg-muted">
          <SlidersHorizontal className="size-3.5" />
          Preferences
        </button>

        <button className="flex items-center gap-2 rounded-xs px-2 py-2 text-left text-[10px] hover:bg-muted">
          <Shield className="size-3.5" />
          Privacy
        </button>
      </nav>
    </aside>
  );
}
