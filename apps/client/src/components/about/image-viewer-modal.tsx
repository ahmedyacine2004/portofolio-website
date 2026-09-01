'use client';

import { useDownload } from '@/hooks/use-download';
import { useTheme } from '@/hooks/use-theme';
import { useImageViewerStore } from '@/stores/image-viewer.store';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Info,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  RotateCcw,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';

export function ImageViewerModal() {
  const isOpen = useImageViewerStore((s) => s.isOpen);
  const images = useImageViewerStore((s) => s.images);
  const currentIndex = useImageViewerStore((s) => s.currentIndex);
  const zoomScale = useImageViewerStore((s) => s.zoomScale);
  const isFullscreen = useImageViewerStore((s) => s.isFullscreen);
  const showInfo = useImageViewerStore((s) => s.showInfo);

  const closeViewer = useImageViewerStore((s) => s.closeViewer);
  const setIndex = useImageViewerStore((s) => s.setIndex);
  const nextImage = useImageViewerStore((s) => s.nextImage);
  const prevImage = useImageViewerStore((s) => s.prevImage);
  const zoomIn = useImageViewerStore((s) => s.zoomIn);
  const zoomOut = useImageViewerStore((s) => s.zoomOut);
  const resetZoom = useImageViewerStore((s) => s.resetZoom);
  const toggleFullscreen = useImageViewerStore((s) => s.toggleFullscreen);
  const toggleInfo = useImageViewerStore((s) => s.toggleInfo);

  const { download } = useDownload();

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const galleryRef = useRef<HTMLDivElement>(null);
  const activeImage = images[currentIndex] || images[0];

  // Keyboard navigation & ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === '+') zoomIn();
      if (e.key === '-') zoomOut();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeViewer, nextImage, prevImage, zoomIn, zoomOut]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (galleryRef.current && galleryRef.current.children[currentIndex]) {
      const activeElement = galleryRef.current.children[currentIndex] as HTMLElement;
      activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentIndex]);

  const handleDownload = useCallback(() => {
    if (!activeImage) return;

    download({
      fileName: activeImage.name,
      url: typeof activeImage.src === 'string' ? activeImage.src : activeImage.src.src,
      fileSize: activeImage.size,
      fileType: activeImage.type.toLowerCase() === 'png' ? 'png' : 'jpg',
      onError: (error) => {
        console.error('Image download failed:', error);
      },
    });
  }, [activeImage, download]);

  if (!isOpen || !activeImage) return null;

  const currentSrc = typeof activeImage.src === 'string' ? activeImage.src : activeImage.src.src;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6">
        {/* Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeViewer}
          className="absolute inset-0 bg-black/80 backdrop-blur-lg"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className={`relative flex flex-col overflow-hidden rounded-[8px] shadow-2xl ${
            isDark
              ? 'border border-white/10 bg-[#1e1e1e] text-white'
              : 'border border-border bg-white text-foreground'
          } ${
            isFullscreen ? 'h-full w-full rounded-none border-none' : 'h-[88vh] w-full max-w-5xl'
          }`}
        >
          {/* Top Navigation Bar */}
          <div
            className={`flex shrink-0 items-center justify-between border-b px-4 py-2.5 ${
              isDark ? 'border-white/10 bg-[#252526]' : 'border-border bg-muted/30'
            }`}
          >
            {/* Left: Title & File details */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="min-w-0">
                <h3
                  className={`truncate font-inter text-xs font-bold leading-tight ${isDark ? 'text-white' : 'text-foreground'}`}
                >
                  {activeImage.name}
                </h3>
                <p
                  className={`text-[9px] font-medium ${isDark ? 'text-white/60' : 'text-muted-foreground'}`}
                >
                  {activeImage.size} - {activeImage.dimensions} - {activeImage.type}
                </p>
              </div>
            </div>

            {/* Center: Zoom Bar */}
            <div
              className={`flex items-center gap-1 rounded-[8px] p-1 border ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-muted/50 border-border'
              }`}
            >
              <button
                type="button"
                onClick={zoomOut}
                className={`flex size-6 items-center justify-center rounded transition-colors ${
                  isDark
                    ? 'text-white/70 hover:bg-white/10 hover:text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                title="Zoom Out (-)"
              >
                <Minus className="size-3" />
              </button>

              <button
                type="button"
                onClick={resetZoom}
                className={`px-2 text-[10px] font-bold transition-colors hover:text-primary ${isDark ? 'text-white' : 'text-foreground'}`}
                title="Reset Zoom"
              >
                {Math.round(zoomScale * 100)}%
              </button>

              <button
                type="button"
                onClick={zoomIn}
                className={`flex size-6 items-center justify-center rounded transition-colors ${
                  isDark
                    ? 'text-white/70 hover:bg-white/10 hover:text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                title="Zoom In (+)"
              >
                <Plus className="size-3" />
              </button>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetZoom}
                className={`flex size-7 items-center justify-center rounded transition-colors ${
                  isDark
                    ? 'text-white/70 hover:bg-white/10 hover:text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                title="Fit to Screen"
              >
                <RotateCcw className="size-3.5" />
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className={`flex size-7 items-center justify-center rounded transition-colors ${
                  isDark
                    ? 'text-white/70 hover:bg-white/10 hover:text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="size-3.5" />
                ) : (
                  <Maximize2 className="size-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={toggleInfo}
                className={`flex size-7 items-center justify-center rounded transition-colors ${
                  showInfo
                    ? 'bg-primary text-primary-foreground'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
                title="Image Info"
              >
                <Info className="size-3.5" />
              </button>

              <button
                type="button"
                onClick={prevImage}
                className={`flex size-7 items-center justify-center rounded transition-colors ${
                  isDark
                    ? 'text-white/70 hover:bg-white/10 hover:text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                title="Previous Image"
              >
                <ChevronLeft className="size-4" />
              </button>

              <button
                type="button"
                onClick={nextImage}
                className={`flex size-7 items-center justify-center rounded transition-colors ${
                  isDark
                    ? 'text-white/70 hover:bg-white/10 hover:text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                title="Next Image"
              >
                <ChevronRight className="size-4" />
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className={`flex size-7 items-center justify-center rounded transition-colors ${
                  isDark
                    ? 'text-white/70 hover:bg-white/10 hover:text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                title="Download Image"
              >
                <Download className="size-3.5" />
              </button>

              <button
                type="button"
                onClick={closeViewer}
                className={`flex size-7 items-center justify-center rounded transition-colors ml-1 ${
                  isDark
                    ? 'text-white/70 hover:bg-red-500/20 hover:text-red-400'
                    : 'text-muted-foreground hover:bg-red-500/10 hover:text-red-500'
                }`}
                aria-label="Close image preview"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="relative min-h-0 flex-1 overflow-auto bg-black/40 flex items-center justify-center p-4">
            {/* Image Preview Canvas */}
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
              <motion.div
                animate={{ scale: zoomScale }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative flex max-h-full max-w-full items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <img
                  src={currentSrc}
                  alt={activeImage.alt}
                  className="h-auto max-h-[calc(100vh-220px)] w-auto max-w-[80vw] object-contain rounded-[8px] shadow-2xl"
                />
              </motion.div>

              {/* Side Navigation Overlay Buttons */}
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-md transition-all hover:bg-black/90 hover:scale-110 hover:text-white"
                title="Previous Image"
              >
                <ChevronLeft className="size-5" />
              </button>

              <button
                type="button"
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-md transition-all hover:bg-black/90 hover:scale-110 hover:text-white"
                title="Next Image"
              >
                <ChevronRight className="size-5" />
              </button>

              {/* Info Overlay Panel */}
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute right-4 top-4 z-20 w-64 rounded-[8px] border border-white/10 bg-slate-900/90 p-4 text-xs shadow-2xl backdrop-blur-md space-y-2"
                  >
                    <h4 className="font-bold text-white text-sm border-b border-white/10 pb-1">
                      File Information
                    </h4>
                    <div className="space-y-1 text-white/80">
                      <div className="flex justify-between">
                        <span className="text-white/50">Name:</span>
                        <span className="font-mono font-semibold">{activeImage.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Size:</span>
                        <span>{activeImage.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Dimensions:</span>
                        <span>{activeImage.dimensions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Format:</span>
                        <span>{activeImage.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Description:</span>
                        <span className="truncate max-w-[120px]">{activeImage.alt}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Thumbnail Strip / Gallery */}
          <div
            className={`flex shrink-0 items-center justify-between border-t px-3 py-2 ${
              isDark ? 'border-white/10 bg-[#252526]' : 'border-border bg-muted/30'
            }`}
          >
            <button
              type="button"
              onClick={prevImage}
              className={`flex size-7 shrink-0 items-center justify-center rounded border transition-colors ${
                isDark
                  ? 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  : 'border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <ChevronLeft className="size-4" />
            </button>

            {/* Thumbnail Ribbon */}
            <div
              ref={galleryRef}
              className="flex min-w-0 flex-1 items-center justify-center gap-2 overflow-x-auto px-3 scrollbar-none"
            >
              {images.map((img, idx) => {
                const isActive = idx === currentIndex;
                const thumbSrc = typeof img.src === 'string' ? img.src : img.src.src;
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setIndex(idx)}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-[8px] border-2 bg-muted transition-all ${
                      isActive
                        ? 'border-blue-500 ring-2 ring-blue-500/50 scale-105 shadow-lg'
                        : 'border-transparent opacity-60 hover:opacity-100 hover:scale-102'
                    }`}
                  >
                    <img
                      src={thumbSrc}
                      alt={img.alt}
                      className="h-full w-full rounded-[6px] object-contain p-0.5"
                    />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={nextImage}
              className={`flex size-7 shrink-0 items-center justify-center rounded border transition-colors ${
                isDark
                  ? 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  : 'border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
