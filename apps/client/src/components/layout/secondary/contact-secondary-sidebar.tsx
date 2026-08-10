'use client';

import { Mail, MessageCircle } from 'lucide-react';

export function ContactSecondarySidebar() {
  return (
    <aside className="flex h-full w-[180px] flex-col rounded-sm bg-background p-3 shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
      <div className="mb-4">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-primary">Contact</p>
        <h2 className="mt-1 text-sm font-semibold text-foreground">Lets Connect</h2>
      </div>

      <div className="flex flex-col gap-1">
        <button className="flex items-center gap-2 rounded-xs bg-muted px-2 py-2 text-[10px]">
          <Mail className="size-3.5" />
          Email Me
        </button>

        <button className="flex items-center gap-2 rounded-xs px-2 py-2 text-[10px] hover:bg-muted">
          <MessageCircle className="size-3.5" />
          Send Message
        </button>
      </div>
    </aside>
  );
}
