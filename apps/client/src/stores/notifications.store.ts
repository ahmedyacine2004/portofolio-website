import { create } from 'zustand';

import { portfolioNotifications, type PortfolioNotification } from '@/data/notifications';

export type NotificationCategory = 'Messages' | 'System' | 'Updates';

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: NotificationCategory;
  read: boolean;
  dateGroup: 'Today' | 'Yesterday' | 'Older';
  iconType:
    'message' | 'download' | 'ai' | 'email' | 'update' | 'certificate' | 'deployment' | 'security';
  link?: string;
};

type NotificationsStore = {
  isOpen: boolean;
  activeTab: 'All' | NotificationCategory;
  notifications: NotificationItem[];

  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  setActiveTab: (tab: 'All' | NotificationCategory) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'read'>) => void;
};

const STORAGE_KEY = 'portfolio-read-notifications';

const getNotificationCategory = (type: PortfolioNotification['type']): NotificationCategory => {
  switch (type) {
    case 'feature':
    case 'project':
    case 'update':
      return 'Updates';
    case 'announcement':
    case 'resume':
      return 'System';
    default:
      return 'Updates';
  }
};

const getIconType = (type: PortfolioNotification['type']): NotificationItem['iconType'] => {
  switch (type) {
    case 'project':
      return 'update';
    case 'update':
      return 'update';
    case 'announcement':
      return 'email';
    case 'feature':
      return 'ai';
    case 'resume':
      return 'certificate';
    default:
      return 'security';
  }
};

const getDateGroup = (dateIso: string): NotificationItem['dateGroup'] => {
  const differenceMs = Date.now() - new Date(dateIso).getTime();
  const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return 'Older';
};

const getTimestampLabel = (dateIso: string): string => {
  const date = new Date(dateIso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
};

const readNotificationIds = (): Set<string> => {
  if (typeof window === 'undefined') return new Set();

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return new Set();

    const parsed = JSON.parse(saved) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
};

const buildNotifications = (): NotificationItem[] =>
  portfolioNotifications.map((notification) => {
    const readSet = readNotificationIds();
    return {
      id: notification.id,
      title: notification.title,
      description: notification.message,
      timestamp: getTimestampLabel(notification.date),
      category: getNotificationCategory(notification.type),
      read: readSet.has(notification.id),
      dateGroup: getDateGroup(notification.date),
      iconType: getIconType(notification.type),
      link: notification.link,
    };
  });

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  isOpen: false,
  activeTab: 'All',
  notifications: buildNotifications(),

  setOpen: (open) => set({ isOpen: open }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setActiveTab: (tab) => set({ activeTab: tab }),

  markAsRead: (id) => {
    if (typeof window !== 'undefined') {
      const current = readNotificationIds();
      current.add(id);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...current]));
    }

    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  },

  markAllAsRead: () => {
    if (typeof window !== 'undefined') {
      const ids = (useNotificationsStore.getState().notifications ?? []).map((n) => n.id);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    }

    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  addNotification: (notification) => {
    const newNotif: NotificationItem = {
      ...notification,
      id: `notif-${Date.now()}`,
      read: false,
    };
    set((state) => ({
      notifications: [newNotif, ...state.notifications],
    }));
  },
}));
