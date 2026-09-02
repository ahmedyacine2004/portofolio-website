'use client';

import { useTranslation } from '@/hooks/use-translation';
import {
  useNotificationsStore,
  type NotificationCategory,
  type NotificationItem,
} from '@/stores/notifications.store';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  Bell,
  CheckCheck,
  Download,
  Mail,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function NotificationsPanel() {
  const { t } = useTranslation();
  const router = useRouter();
  const isOpen = useNotificationsStore((s) => s.isOpen);
  const activeTab = useNotificationsStore((s) => s.activeTab);
  const notifications = useNotificationsStore((s) => s.notifications);
  const setOpen = useNotificationsStore((s) => s.setOpen);
  const setActiveTab = useNotificationsStore((s) => s.setActiveTab);
  const markAsRead = useNotificationsStore((s) => s.markAsRead);
  const markAllAsRead = useNotificationsStore((s) => s.markAllAsRead);

  const panelRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        // Check if click target is header button
        const target = event.target as HTMLElement;
        if (!target.closest('[aria-label="Notifications"]')) {
          setOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setOpen]);

  if (!isOpen) return null;

  // Filter items by category
  const filteredNotifications =
    activeTab === 'All' ? notifications : notifications.filter((n) => n.category === activeTab);

  // Count unread per tab
  const getTabCount = (tab: 'All' | NotificationCategory) => {
    if (tab === 'All') return notifications.filter((n) => !n.read).length;
    return notifications.filter((n) => n.category === tab && !n.read).length;
  };

  // Group by dateGroup
  const groups: Record<string, NotificationItem[]> = {};
  filteredNotifications.forEach((n) => {
    if (!groups[n.dateGroup]) groups[n.dateGroup] = [];
    groups[n.dateGroup].push(n);
  });

  const renderNotificationIcon = (type: NotificationItem['iconType']) => {
    switch (type) {
      case 'message':
        return (
          <div className="flex size-6 items-center justify-center rounded-xs bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <MessageSquare className="size-3" />
          </div>
        );
      case 'download':
        return (
          <div className="flex size-6 items-center justify-center rounded-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Download className="size-3" />
          </div>
        );
      case 'ai':
        return (
          <div className="flex size-6 items-center justify-center rounded-xs bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Sparkles className="size-3" />
          </div>
        );
      case 'email':
        return (
          <div className="flex size-6 items-center justify-center rounded-xs bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Mail className="size-3" />
          </div>
        );
      case 'update':
        return (
          <div className="flex size-6 items-center justify-center rounded-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <RefreshCw className="size-3" />
          </div>
        );
      case 'certificate':
        return (
          <div className="flex size-6 items-center justify-center rounded-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Award className="size-3" />
          </div>
        );
      case 'deployment':
        return (
          <div className="flex size-6 items-center justify-center rounded-xs bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Zap className="size-3" />
          </div>
        );
      case 'security':
      default:
        return (
          <div className="flex size-6 items-center justify-center rounded-xs bg-slate-500/10 text-slate-600 dark:text-slate-400">
            <ShieldCheck className="size-3" />
          </div>
        );
    }
  };

  const tabs: Array<{ id: 'All' | NotificationCategory; label: string }> = [
    { id: 'All', label: t('notifications.all') },
    { id: 'Messages', label: t('notifications.messages') },
    { id: 'System', label: t('notifications.system') },
    { id: 'Updates', label: t('notifications.updates') },
  ];

  return (
    <AnimatePresence>
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="fixed inset-x-2 top-16 z-50 w-auto max-w-none overflow-hidden rounded-sm bg-background shadow-[0_0_12px_rgba(148,163,184,0.22)] dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] sm:inset-x-auto sm:top-12 sm:right-6 sm:w-full sm:max-w-[340px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <div className="flex items-center gap-2">
            <Bell className="size-3.5 text-primary" />
            <span className="text-[9px] font-bold text-foreground">{t('notifications.title')}</span>
          </div>

          <button
            type="button"
            onClick={markAllAsRead}
            title={t('notificationsPanel.markAllRead', 'Mark all as read')}
            className="flex size-7 items-center justify-center gap-1 rounded-xs text-[8px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:size-auto sm:justify-start"
          >
            <CheckCheck className="size-3" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 border-b border-border px-2 py-1.5 overflow-x-auto bg-background">
          {tabs.map((tab) => {
            const count = getTabCount(tab.id);
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 rounded-xs px-2 py-1 text-[8px] font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{tab.label}</span>
                {count > 0 && (
                  <span
                    className={`flex size-3 items-center justify-center rounded-full text-[7px] font-bold ${
                      isActive ? 'bg-primary-foreground text-primary' : 'text-primary'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Notifications List */}
        <div className="max-h-[calc(100dvh-9rem)] overflow-y-auto p-2 space-y-2 sm:max-h-[320px]">
          {filteredNotifications.length === 0 ? (
            <div className="py-6 text-center text-[9px] text-muted-foreground">
              {t('notifications.noUpdates')}
            </div>
          ) : (
            Object.entries(groups).map(([groupTitle, items]) => (
              <div key={groupTitle} className="space-y-1">
                {/* Group Title Header */}
                <div className="px-2 pt-1 text-[8px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {groupTitle === 'Today'
                    ? t('notificationsPanel.dateGroups.today', 'Today')
                    : groupTitle === 'Yesterday'
                      ? t('notificationsPanel.dateGroups.yesterday', 'Yesterday')
                      : t('notificationsPanel.dateGroups.older', 'Older')}
                </div>

                {/* Items in Group */}
                <div className="space-y-1">
                  {items.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markAsRead(n.id);

                        if (n.link) {
                          router.push(n.link);
                          setOpen(false);
                        }
                      }}
                      className={`group relative flex items-start gap-2 rounded-xs p-2 transition-all cursor-pointer ${
                        !n.read ? 'bg-primary/5 hover:bg-primary/8' : 'hover:bg-muted/40'
                      }`}
                    >
                      {/* Left icon */}
                      <div className="shrink-0 pt-0.5">{renderNotificationIcon(n.iconType)}</div>

                      {/* Content */}
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center justify-between gap-1">
                          <p className="truncate text-[9px] font-semibold text-foreground leading-snug">
                            {n.title}
                          </p>
                          <span className="text-[7px] text-muted-foreground shrink-0">
                            {n.timestamp}
                          </span>
                        </div>
                        <p className="text-[8px] text-muted-foreground leading-tight line-clamp-2">
                          {n.description}
                        </p>
                      </div>

                      {/* Unread indicator dot */}
                      {!n.read && (
                        <span className="absolute right-2 top-3 size-1 rounded-full bg-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
