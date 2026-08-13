'use client';

import { useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  Bell,
  CheckCheck,
  ChevronRight,
  Download,
  Mail,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  useNotificationsStore,
  type NotificationCategory,
  type NotificationItem,
} from '@/stores/notifications.store';

export function NotificationsPanel() {
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
          <div className="flex size-7 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <MessageSquare className="size-3.5" />
          </div>
        );
      case 'download':
        return (
          <div className="flex size-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Download className="size-3.5" />
          </div>
        );
      case 'ai':
        return (
          <div className="flex size-7 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Sparkles className="size-3.5" />
          </div>
        );
      case 'email':
        return (
          <div className="flex size-7 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Mail className="size-3.5" />
          </div>
        );
      case 'update':
        return (
          <div className="flex size-7 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <RefreshCw className="size-3.5" />
          </div>
        );
      case 'certificate':
        return (
          <div className="flex size-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Award className="size-3.5" />
          </div>
        );
      case 'deployment':
        return (
          <div className="flex size-7 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Zap className="size-3.5" />
          </div>
        );
      case 'security':
      default:
        return (
          <div className="flex size-7 items-center justify-center rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-400">
            <ShieldCheck className="size-3.5" />
          </div>
        );
    }
  };

  const tabs: Array<{ id: 'All' | NotificationCategory; label: string }> = [
    { id: 'All', label: 'All' },
    { id: 'Messages', label: 'Messages' },
    { id: 'System', label: 'System' },
    { id: 'Updates', label: 'Updates' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="fixed top-12 right-6 z-50 w-full max-w-[340px] overflow-hidden rounded-[8px] border border-border/80 bg-background/95 shadow-2xl backdrop-blur-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <Bell className="size-3.5 text-primary" />
            <span className="text-[11px] font-bold text-foreground">Notifications</span>
          </div>

          <button
            type="button"
            onClick={markAllAsRead}
            className="flex items-center gap-1 text-[9px] font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <CheckCheck className="size-3" />
            <span>Mark all as read</span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 border-b border-border/40 bg-muted/20 px-2 py-1.5 overflow-x-auto">
          {tabs.map((tab) => {
            const count = getTabCount(tab.id);
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span>{tab.label}</span>
                {count > 0 && (
                  <span
                    className={`flex size-3.5 items-center justify-center rounded-full text-[8px] font-bold ${
                      isActive ? 'bg-primary-foreground text-primary' : 'bg-primary/10 text-primary'
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
        <div className="max-h-[320px] overflow-y-auto p-2 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="py-8 text-center text-[10px] text-muted-foreground">
              No notifications in this category.
            </div>
          ) : (
            Object.entries(groups).map(([groupTitle, items]) => (
              <div key={groupTitle} className="space-y-1">
                {/* Group Title Header */}
                <div className="px-2 pt-1 text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                  {groupTitle}
                </div>

                {/* Items in Group */}
                <div className="space-y-1">
                  {items.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`group relative flex items-start gap-2.5 rounded-lg p-2 transition-all cursor-pointer ${
                        !n.read ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-muted/50'
                      }`}
                    >
                      {/* Left icon */}
                      <div className="shrink-0 pt-0.5">{renderNotificationIcon(n.iconType)}</div>

                      {/* Content */}
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <p className="truncate text-[10px] font-bold text-foreground leading-snug">
                            {n.title}
                          </p>
                          <span className="text-[8px] text-muted-foreground shrink-0">
                            {n.timestamp}
                          </span>
                        </div>
                        <p className="text-[9px] text-muted-foreground leading-tight line-clamp-2">
                          {n.description}
                        </p>
                      </div>

                      {/* Unread indicator dot */}
                      {!n.read && (
                        <span className="absolute right-2 top-2.5 size-1.5 rounded-full bg-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-3.5 py-2 text-[9px] font-medium">
          <button
            type="button"
            className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>View All Notifications</span>
            <ChevronRight className="size-3" />
          </button>

          <button
            type="button"
            className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>Notification Preferences</span>
            <ChevronRight className="size-3" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
