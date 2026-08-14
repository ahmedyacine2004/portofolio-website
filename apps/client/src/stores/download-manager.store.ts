import { create } from 'zustand';

export type DownloadStatus = 'queued' | 'downloading' | 'completed' | 'failed' | 'cancelled';

export type DownloadItem = {
  id: string;
  fileName: string;
  fileSize: string; // e.g. "2.4 MB"
  progress: number; // 0 to 100
  status: DownloadStatus;
  fileType: 'pdf' | 'png' | 'jpg' | 'zip' | 'doc' | 'other';
  downloadUrl?: string;
  timestamp?: string;
  startTime?: number;
  completionTime?: number;
  error?: string;
};

type DownloadManagerStore = {
  isOpen: boolean;
  isMinimized: boolean;
  items: DownloadItem[];

  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  setMinimized: (minimized: boolean) => void;
  toggleMinimize: () => void;
  addDownload: (
    item: Omit<DownloadItem, 'id' | 'status' | 'progress' | 'timestamp' | 'startTime'> & {
      progress?: number;
      status?: DownloadStatus;
      error?: string;
    },
  ) => void;
  updateDownloadProgress: (id: string, progress: number) => void;
  completeDownload: (id: string) => void;
  failDownload: (id: string, error: string) => void;
  cancelDownload: (id: string) => void;
  removeDownload: (id: string) => void;
  clearCompleted: () => void;
  retryDownload: (id: string) => void;
};

const STORAGE_KEY = 'portfolio-downloads';
const MAX_HISTORY_ITEMS = 50;

const loadDownloadsFromStorage = (): DownloadItem[] => {
  if (typeof window === 'undefined') return [];

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved) as DownloadItem[];
    // Filter out items older than 7 days
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return parsed.filter((item) => (item.startTime || 0) > sevenDaysAgo);
  } catch (error) {
    console.error('Failed to load downloads from storage:', error);
    return [];
  }
};

const saveDownloadsToStorage = (items: DownloadItem[]): void => {
  if (typeof window === 'undefined') return;

  try {
    // Keep only completed/failed items in history, limit to recent items
    const historyItems = items.filter(
      (item) => item.status === 'completed' || item.status === 'failed',
    );
    const recentItems = historyItems.slice(0, MAX_HISTORY_ITEMS);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recentItems));
  } catch (error) {
    console.error('Failed to save downloads to storage:', error);
  }
};

export const useDownloadManagerStore = create<DownloadManagerStore>((set, get) => ({
  isOpen: false,
  isMinimized: false,
  items: loadDownloadsFromStorage(),

  setOpen: (open) => set({ isOpen: open }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setMinimized: (minimized) => set({ isMinimized: minimized }),
  toggleMinimize: () => set((state) => ({ isMinimized: !state.isMinimized })),

  addDownload: (item) => {
    const newItem: DownloadItem = {
      id: `dl-${Date.now()}`,
      fileName: item.fileName,
      fileSize: item.fileSize || 'Unknown',
      progress: item.progress ?? 0,
      status: item.status ?? 'queued',
      fileType: item.fileType || 'other',
      downloadUrl: item.downloadUrl,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      startTime: Date.now(),
      error: item.error,
    };

    set((state) => {
      const updatedItems = [newItem, ...state.items];
      saveDownloadsToStorage(updatedItems);
      return {
        isOpen: true,
        isMinimized: false,
        items: updatedItems,
      };
    });
  },

  updateDownloadProgress: (id) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, status: 'downloading' } : item,
      );
      return { items: updatedItems };
    });
  },

  completeDownload: (id) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'completed',
              progress: 100,
              completionTime: Date.now(),
            }
          : item,
      );
      saveDownloadsToStorage(updatedItems);
      return { items: updatedItems };
    });
  },

  failDownload: (id, error) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'failed',
              error,
              completionTime: Date.now(),
            }
          : item,
      );
      saveDownloadsToStorage(updatedItems);
      return { items: updatedItems };
    });
  },

  cancelDownload: (id) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'cancelled',
              completionTime: Date.now(),
            }
          : item,
      );
      saveDownloadsToStorage(updatedItems);
      return { items: updatedItems };
    });
  },

  removeDownload: (id) => {
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== id);
      saveDownloadsToStorage(updatedItems);
      return { items: updatedItems };
    });
  },

  clearCompleted: () => {
    set((state) => {
      const updatedItems = state.items.filter((item) => item.status !== 'completed');
      saveDownloadsToStorage(updatedItems);
      return { items: updatedItems };
    });
  },

  retryDownload: (id) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'queued',
              progress: 0,
              error: undefined,
            }
          : item,
      );
      return { items: updatedItems };
    });
  },
}));
