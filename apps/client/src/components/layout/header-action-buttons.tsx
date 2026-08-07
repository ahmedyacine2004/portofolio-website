'use client';

import { Bell, FileText, Languages, MessageCircle, UserCircle } from 'lucide-react';

const actionButtonClass =
  'flex size-8 items-center justify-center rounded-sm bg-brand-dark text-primary-foreground transition-colors hover:bg-primary/80';

type HeaderActionButtonProps = {
  label: string;
  children: React.ReactNode;
};

function HeaderActionButton({ label, children }: HeaderActionButtonProps) {
  return (
    <button type="button" aria-label={label} className={actionButtonClass}>
      {children}
    </button>
  );
}

export function HeaderActionButtons() {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <HeaderActionButton label="Language">
        <Languages className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>

      <HeaderActionButton label="Messages">
        <MessageCircle className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>

      <HeaderActionButton label="Documents">
        <FileText className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>

      <HeaderActionButton label="Notifications">
        <Bell className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>

      <HeaderActionButton label="Profile">
        <UserCircle className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>
    </div>
  );
}
