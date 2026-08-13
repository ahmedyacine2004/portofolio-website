import { create } from 'zustand';

export type DownloadItem = {
  id: string;
  fileName: string;
  fileSize: string; // e.g. "2.4 MB" or "4.1 MB / 5.5 MB"
  progress: number; // 0 to 100
  status: 'downloading' | 'completed' | 'paused' | 'cancelled';
  fileType: 'pdf' | 'png' | 'jpg' | 'zip' | 'doc' | 'other';
  downloadUrl?: string;
  timestamp?: string;
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
    item: Omit<DownloadItem, 'id' | 'status' | 'progress'> & {
      progress?: number;
      status?: DownloadItem['status'];
    },
  ) => void;
  cancelDownload: (id: string) => void;
  removeDownload: (id: string) => void;
  clearCompleted: () => void;
};

const initialDownloads: DownloadItem[] = [
  {
    id: 'dl-1',
    fileName: 'Ahmed_Yassine_Yousfi_Resume.pdf',
    fileSize: '2.4 MB',
    progress: 100,
    status: 'completed',
    fileType: 'pdf',
  },
  {
    id: 'dl-2',
    fileName: 'CONSTRUCTIFY_Case_Study.pdf',
    fileSize: '4.2 MB',
    progress: 100,
    status: 'completed',
    fileType: 'pdf',
  },
  {
    id: 'dl-3',
    fileName: 'Design_System_Guide.pdf',
    fileSize: '4.1 MB / 5.5 MB',
    progress: 75,
    status: 'downloading',
    fileType: 'pdf',
  },
  {
    id: 'dl-4',
    fileName: 'Portfolio_Cover.png',
    fileSize: '22.3 MB',
    progress: 18,
    status: 'downloading',
    fileType: 'png',
  },
];

export const useDownloadManagerStore = create<DownloadManagerStore>((set) => ({
  isOpen: false,
  isMinimized: false,
  items: initialDownloads,

  setOpen: (open) => set({ isOpen: open }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setMinimized: (minimized) => set({ isMinimized: minimized }),
  toggleMinimize: () => set((state) => ({ isMinimized: !state.isMinimized })),

  addDownload: (item) => {
    const newItem: DownloadItem = {
      id: `dl-${Date.now()}`,
      fileName: item.fileName,
      fileSize: item.fileSize,
      progress: item.progress ?? 100,
      status: item.status ?? 'completed',
      fileType: item.fileType,
      downloadUrl: item.downloadUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    set((state) => ({
      isOpen: true,
      isMinimized: false,
      items: [newItem, ...state.items],
    }));
  },

  cancelDownload: (id) => {
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, status: 'cancelled' } : item)),
    }));
  },

  removeDownload: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  clearCompleted: () => {
    set((state) => ({
      items: state.items.filter((item) => item.status !== 'completed'),
    }));
  },
}));
