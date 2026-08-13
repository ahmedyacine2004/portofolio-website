import { create } from 'zustand';

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

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Message',
    description: 'Your message already sent',
    timestamp: '2m ago',
    category: 'Messages',
    read: false,
    dateGroup: 'Today',
    iconType: 'message',
  },
  {
    id: 'notif-2',
    title: 'CV Downloaded',
    description: 'CV Download Completed',
    timestamp: '15m ago',
    category: 'System',
    read: false,
    dateGroup: 'Today',
    iconType: 'download',
  },
  {
    id: 'notif-3',
    title: 'AI conversation',
    description: 'AI response is ready',
    timestamp: '1h ago',
    category: 'Messages',
    read: false,
    dateGroup: 'Today',
    iconType: 'ai',
  },
  {
    id: 'notif-4',
    title: 'Email',
    description: 'You are already subscribed to our newsletter',
    timestamp: '3h ago',
    category: 'Updates',
    read: false,
    dateGroup: 'Today',
    iconType: 'email',
  },
  {
    id: 'notif-5',
    title: 'Project updated',
    description: 'CONSTRUCTIFY case study updated',
    timestamp: 'Yesterday, 8:45 PM',
    category: 'Updates',
    read: true,
    dateGroup: 'Yesterday',
    iconType: 'update',
  },
  {
    id: 'notif-6',
    title: 'New Certificate added',
    description: 'Interactive AI Certificates',
    timestamp: 'Yesterday, 3:20 PM',
    category: 'Updates',
    read: true,
    dateGroup: 'Yesterday',
    iconType: 'certificate',
  },
  {
    id: 'notif-7',
    title: 'Deployment successful',
    description: 'The portfolio was deployed successfully',
    timestamp: 'May 25, 9:15 AM',
    category: 'System',
    read: true,
    dateGroup: 'Older',
    iconType: 'deployment',
  },
  {
    id: 'notif-8',
    title: 'Security scan completed',
    description: 'No vulnerabilities found in your project',
    timestamp: 'Mar 21, 10:10 AM',
    category: 'System',
    read: true,
    dateGroup: 'Older',
    iconType: 'security',
  },
];

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  isOpen: false,
  activeTab: 'All',
  notifications: initialNotifications,

  setOpen: (open) => set({ isOpen: open }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setActiveTab: (tab) => set({ activeTab: tab }),

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  },

  markAllAsRead: () => {
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
