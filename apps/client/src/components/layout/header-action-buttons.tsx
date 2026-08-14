'use client';

import { Bell, Command, FileText, Languages, MessageCircle, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useCommandPaletteStore } from '@/stores/command-palette.store';
import { useDownloadManagerStore } from '@/stores/download-manager.store';
import { useLanguageStore } from '@/stores/language.store';
import { useNotificationsStore } from '@/stores/notifications.store';
import { useVisitorInfoStore } from '@/stores/visitor-info.store';

const actionButtonClass =
  'relative flex size-8 items-center justify-center rounded-sm bg-brand-dark text-primary-foreground transition-colors hover:bg-primary/80 cursor-pointer';

type HeaderActionButtonProps = {
  label: string;
  onClick?: () => void;
  badge?: number | boolean;
  children: React.ReactNode;
};

function HeaderActionButton({ label, onClick, badge, children }: HeaderActionButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={actionButtonClass}
    >
      {children}
      {typeof badge === 'number' && badge > 0 && (
        <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground shadow-xs">
          {badge}
        </span>
      )}
      {typeof badge === 'boolean' && badge && (
        <span className="absolute right-1 top-1 size-2 rounded-full bg-primary ring-2 ring-background" />
      )}
    </button>
  );
}

export function HeaderActionButtons() {
  const router = useRouter();
  const toggleCommandPalette = useCommandPaletteStore((s) => s.toggle);
  const toggleDownloads = useDownloadManagerStore((s) => s.toggleOpen);
  const downloadsCount = useDownloadManagerStore((s) => s.items.length);

  const toggleNotifications = useNotificationsStore((s) => s.toggleOpen);
  const unreadNotifsCount = useNotificationsStore(
    (s) => s.notifications.filter((n) => !n.read).length,
  );

  const locale = useLanguageStore((s) => s.locale);
  const setLocale = useLanguageStore((s) => s.setLocale);
  const toggleVisitorInfo = useVisitorInfoStore((s) => s.toggle);

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <HeaderActionButton label="Command Palette (⌘K)" onClick={toggleCommandPalette}>
        <Command className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>

      <HeaderActionButton
        label={locale === 'en' ? 'Switch to French' : 'Switch to English'}
        onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}
      >
        <Languages className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>

      <HeaderActionButton label="AI Assistant" onClick={() => router.push('/ai-assistant')}>
        <MessageCircle className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>

      <HeaderActionButton label="Download Manager" onClick={toggleDownloads} badge={downloadsCount}>
        <FileText className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>

      <HeaderActionButton
        label="Notifications"
        onClick={toggleNotifications}
        badge={unreadNotifsCount}
      >
        <Bell className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>

      <HeaderActionButton label="Visitor Info" onClick={toggleVisitorInfo}>
        <UserCircle className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>
    </div>
  );
}
