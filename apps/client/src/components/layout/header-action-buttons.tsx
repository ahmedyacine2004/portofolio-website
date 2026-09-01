'use client';

import { Bell, Command, FileText, Languages, MessageCircle, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useTranslation } from '@/hooks/use-translation';
import { useCommandPaletteStore } from '@/stores/command-palette.store';
import { useDownloadManagerStore } from '@/stores/download-manager.store';
import { useLanguageStore } from '@/stores/language.store';
import { useNotificationsStore } from '@/stores/notifications.store';
import { useVisitorInfoStore } from '@/stores/visitor-info.store';

const getPreferenceValue = (key: string, fallback: boolean) => {
  if (typeof window === 'undefined') return fallback;

  try {
    const stored = window.localStorage.getItem('portfolio-preferences');
    if (!stored) return fallback;
    const parsed = JSON.parse(stored);
    return parsed[key] ?? fallback;
  } catch {
    return fallback;
  }
};

const actionButtonClass =
  'relative flex size-8 items-center justify-center rounded-sm bg-brand-dark text-primary-foreground transition-colors hover:bg-primary/80 cursor-pointer';

type HeaderActionButtonProps = {
  label: string;
  onClick?: () => void;
  badge?: number | boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

function HeaderActionButton({
  label,
  onClick,
  badge,
  disabled,
  children,
}: HeaderActionButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`${actionButtonClass} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
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
  const { t } = useTranslation();
  const aiAssistantEnabled = getPreferenceValue('aiAssistantEnabled', true);

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <HeaderActionButton label={t('header.commandPalette')} onClick={toggleCommandPalette}>
        <Command className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>

      <HeaderActionButton
        label={locale === 'en' ? t('header.switchToFrench') : t('header.switchToEnglish')}
        onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}
      >
        <Languages className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>

      <HeaderActionButton
        label={t('header.aiAssistant')}
        onClick={() => {
          if (!aiAssistantEnabled) return;
          router.push('/ai-assistant');
        }}
        disabled={!aiAssistantEnabled}
      >
        <MessageCircle className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>

      <HeaderActionButton
        label={t('header.downloadManager')}
        onClick={toggleDownloads}
        badge={downloadsCount}
      >
        <FileText className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>

      <HeaderActionButton
        label={t('header.notifications')}
        onClick={toggleNotifications}
        badge={unreadNotifsCount}
      >
        <Bell className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>

      <HeaderActionButton label={t('header.visitorInfo')} onClick={toggleVisitorInfo}>
        <UserCircle className="size-[18px]" strokeWidth={1.8} />
      </HeaderActionButton>
    </div>
  );
}
