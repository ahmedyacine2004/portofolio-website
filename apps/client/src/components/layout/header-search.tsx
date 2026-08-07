'use client';

import { Search } from 'lucide-react';

export function HeaderSearch() {
  return (
    <div className="flex h-8 w-[300px] items-center rounded-sm bg-card px-2.5 shadow-sm">
      <input
        type="search"
        placeholder="Search projects, skills or commands ..."
        className="min-w-0 flex-1 bg-transparent text-[10px] text-foreground outline-none placeholder:text-foreground-disabled"
        aria-label="Search"
      />

      <Search className="size-[18px] shrink-0 text-foreground" strokeWidth={2} />
    </div>
  );
}
