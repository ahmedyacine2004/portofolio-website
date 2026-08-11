'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export interface GalleryItem {
  id: string | number;
  title: string;
  imageUrl: string;
  resolution?: string;
  device?: string;
  lastUpdated?: string;
  fileType?: string;
}

interface Carousel3DProps {
  items: GalleryItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onToggleFullscreen?: () => void;
}

export function Carousel3D({
  items,
  activeIndex,
  onSelectIndex,
  onToggleFullscreen,
}: Carousel3DProps) {
  if (!items || items.length === 0) return null;

  const handlePrev = () => {
    onSelectIndex((activeIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    onSelectIndex((activeIndex + 1) % items.length);
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center py-6">
      {/* Fullscreen Button */}
      {onToggleFullscreen && (
        <button
          onClick={onToggleFullscreen}
          className="absolute right-3 top-2 z-40 flex size-8 items-center justify-center rounded-[6px] bg-card text-muted-foreground shadow-xs transition-colors hover:bg-accent hover:text-foreground dark:shadow-black/40"
          title="Toggle Fullscreen"
          type="button"
        >
          <Maximize2 className="size-4" />
        </button>
      )}

      {/* Left Navigation Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-2 z-40 flex size-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md backdrop-blur-xs transition-transform hover:scale-105 active:scale-95 dark:shadow-black/50"
        type="button"
      >
        <ChevronLeft className="size-5" />
      </button>

      {/* 3D Stage Container */}
      <div className="relative flex h-[280px] w-full max-w-5xl items-center justify-center overflow-hidden sm:h-[340px] md:h-[400px]">
        {items.map((item, index) => {
          let offset = index - activeIndex;

          // Circular wrap-around positioning
          if (offset < -1 && activeIndex === items.length - 1 && index === 0) {
            offset = 1;
          } else if (offset > 1 && activeIndex === 0 && index === items.length - 1) {
            offset = -1;
          }

          const isActive = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;
          const isVisible = isActive || isLeft || isRight;

          if (!isVisible) return null;

          let transformStyle = '';
          let zIndex = 10;
          let opacity = 0;

          if (isActive) {
            transformStyle = 'perspective(1200px) rotateY(0deg) translateZ(0px) scale(1)';
            zIndex = 30;
            opacity = 1;
          } else if (isLeft) {
            transformStyle =
              'perspective(1200px) rotateY(24deg) translateX(-28%) translateZ(-120px) scale(0.82)';
            zIndex = 20;
            opacity = 0.65;
          } else if (isRight) {
            transformStyle =
              'perspective(1200px) rotateY(-24deg) translateX(28%) translateZ(-120px) scale(0.82)';
            zIndex = 20;
            opacity = 0.65;
          }

          return (
            <div
              key={item.id}
              onClick={() => onSelectIndex(index)}
              style={{
                transform: transformStyle,
                zIndex,
                opacity,
              }}
              className="absolute w-[80%] max-w-[680px] cursor-pointer transition-all duration-500 cubic-bezier(0.25, 1, 0.5, 1)"
            >
              <div
                className={`group relative overflow-hidden rounded-[12px] bg-card p-1 shadow-lg dark:shadow-black/50 transition-all ${
                  isActive ? 'ring-2 ring-primary/40' : ''
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-auto w-full rounded-[8px] object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-2 z-40 flex size-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md backdrop-blur-xs transition-transform hover:scale-105 active:scale-95 dark:shadow-black/50"
        type="button"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
