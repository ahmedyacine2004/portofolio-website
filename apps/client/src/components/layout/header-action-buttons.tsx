'use client';

import { Bell, Command, FileText, Languages, MessageCircle, UserCircle } from 'lucide-react';
import { useCommandPaletteStore } from '@/stores/command-palette.store';

const actionButtonClass =
  'flex size-8 items-center justify-center rounded-sm bg-brand-dark text-primary-foreground transition-colors hover:bg-primary/80 cursor-pointer';

type HeaderActionButtonProps = {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
};

function HeaderActionButton({ label, onClick, children }: HeaderActionButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={actionButtonClass}
    >
      {children}
    </button>
  );
}

export function HeaderActionButtons() {
  const toggleCommandPalette = useCommandPaletteStore((s) => s.toggle);

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <HeaderActionButton label="Command Palette (⌘K)" onClick={toggleCommandPalette}>
        <Command className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>

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
