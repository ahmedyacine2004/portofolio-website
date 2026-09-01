import Image01 from '@/assets/images/avatarV2.png';
import Image02 from '@/assets/images/image02.jpg';
import Image03 from '@/assets/images/image03.jpg';
import Image04 from '@/assets/images/image04.jpg';
import Image05 from '@/assets/images/image05.jpg';
import type { StaticImageData } from 'next/image';
import { create } from 'zustand';

export type ImageMedia = {
  id: string;
  name: string;
  src: string | StaticImageData;
  size: string; // e.g. "2.4 MB"
  dimensions: string; // e.g. "1920x1080"
  type: string; // e.g. "PNG"
  alt: string;
};

type ImageViewerStore = {
  isOpen: boolean;
  currentIndex: number;
  zoomScale: number;
  isFullscreen: boolean;
  showInfo: boolean;
  images: ImageMedia[];

  openViewer: (gallery?: ImageMedia[], startIndex?: number) => void;
  closeViewer: () => void;
  setIndex: (index: number) => void;
  nextImage: () => void;
  prevImage: () => void;
  setZoomScale: (scale: number | ((prev: number) => number)) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  toggleFullscreen: () => void;
  toggleInfo: () => void;
};

// Default gallery shown in image viewer as seen in Image 3 screenshot
export const DEFAULT_GALLERY_IMAGES: ImageMedia[] = [
  {
    id: 'img-1',
    name: 'avatar.png',
    src: Image01,
    size: '2.4 MB',
    dimensions: '1920x1080',
    type: 'PNG',
    alt: 'Ahmed Yassine Abbane Avatar',
  },
  {
    id: 'img-2',
    name: 'team_meeting.jpg',
    src: Image02,
    size: '3.1 MB',
    dimensions: '2400x1600',
    type: 'JPG',
    alt: 'Team Collaboration Session',
  },
  {
    id: 'img-3',
    name: 'hackathon_group.jpg',
    src: Image03,
    size: '1.8 MB',
    dimensions: '1920x1280',
    type: 'JPG',
    alt: 'Hackathon Award Team',
  },
  {
    id: 'img-4',
    name: 'tech_workshop.jpg',
    src: Image04,
    size: '2.9 MB',
    dimensions: '2048x1365',
    type: 'JPG',
    alt: 'Workshop Discussion',
  },
  {
    id: 'img-5',
    name: 'presentation_slide.jpg',
    src: Image05,
    size: '4.5 MB',
    dimensions: '3840x2160',
    type: 'JPG',
    alt: 'Keynote Presentation',
  },
];

export const useImageViewerStore = create<ImageViewerStore>((set, get) => ({
  isOpen: false,
  currentIndex: 0,
  zoomScale: 0.62, // Default 62% matching screenshot
  isFullscreen: false,
  showInfo: false,
  images: DEFAULT_GALLERY_IMAGES,

  openViewer: (gallery, startIndex = 0) => {
    set({
      isOpen: true,
      images: gallery && gallery.length > 0 ? gallery : DEFAULT_GALLERY_IMAGES,
      currentIndex: startIndex,
      zoomScale: 0.62,
    });
  },

  closeViewer: () => set({ isOpen: false, isFullscreen: false }),

  setIndex: (index) => {
    const { images } = get();
    if (index >= 0 && index < images.length) {
      set({ currentIndex: index, zoomScale: 0.62 });
    }
  },

  nextImage: () => {
    const { currentIndex, images } = get();
    const nextIdx = (currentIndex + 1) % images.length;
    set({ currentIndex: nextIdx, zoomScale: 0.62 });
  },

  prevImage: () => {
    const { currentIndex, images } = get();
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    set({ currentIndex: prevIdx, zoomScale: 0.62 });
  },

  setZoomScale: (scale) => {
    if (typeof scale === 'function') {
      set((state) => ({ zoomScale: Math.min(Math.max(scale(state.zoomScale), 0.2), 3) }));
    } else {
      set({ zoomScale: Math.min(Math.max(scale, 0.2), 3) });
    }
  },

  zoomIn: () => {
    set((state) => ({ zoomScale: Math.min(state.zoomScale + 0.1, 3) }));
  },

  zoomOut: () => {
    set((state) => ({ zoomScale: Math.max(state.zoomScale - 0.1, 0.2) }));
  },

  resetZoom: () => set({ zoomScale: 0.62 }),

  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),

  toggleInfo: () => set((state) => ({ showInfo: !state.showInfo })),
}));
