'use client';

import { AboutTabBar } from './about-tab-bar';
import { motion } from 'framer-motion';
import { AlertTriangle, Bell, GitBranch, Maximize2, X, XCircle } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';

import databaseIcon from '@/assets/icons/database.svg';
import imageIcon from '@/assets/icons/image.svg';
import jsonIcon from '@/assets/icons/json.svg';
import linkIcon from '@/assets/icons/link.svg';
import markdownIcon from '@/assets/icons/markdown.svg';
import reactIcon from '@/assets/icons/react.svg';
import typescriptIconV2 from '@/assets/icons/typescript-1.svg';
import typescriptIcon from '@/assets/icons/typescript.svg';
import { useTheme } from '@/hooks/use-theme';
import { useImageViewerStore } from '@/stores/image-viewer.store';

type ImageEditorProps = {
  fileName: string;
  breadcrumb: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  language: string;
  fileIcon?: React.ReactNode;
};

const floatingIcons = [
  {
    src: reactIcon,
    alt: 'React',
    position: 'left-[10%] top-[8%]',
    delay: 0,
  },
  {
    src: typescriptIcon,
    alt: 'TypeScript',
    position: 'right-[9%] top-[18%]',
    delay: 0.7,
  },
  {
    src: databaseIcon,
    alt: 'Database',
    position: 'right-[8%] bottom-[20%]',
    delay: 1.4,
  },
  {
    src: typescriptIconV2,
    alt: 'TypeScript',
    position: 'left-[12%] bottom-[16%]',
    delay: 2.1,
  },
  {
    src: jsonIcon,
    alt: 'JSON',
    position: 'left-[4%] top-[40%]',
    delay: 0.4,
  },
  {
    src: imageIcon,
    alt: 'Image',
    position: 'right-[3%] top-[42%]',
    delay: 1.1,
  },
  {
    src: linkIcon,
    alt: 'Link',
    position: 'left-[27%] top-[1%]',
    delay: 1.8,
  },
  {
    src: markdownIcon,
    alt: 'Markdown',
    position: 'right-[25%] bottom-[2%]',
    delay: 2.5,
  },
];

export function ImageEditor({
  fileName,
  breadcrumb,
  imageSrc,
  imageAlt,
  language,
  fileIcon = <Image src={imageIcon} alt="Image icon" className="size-3" />,
}: ImageEditorProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const openViewer = useImageViewerStore((s) => s.openViewer);

  return (
    <div
      className={`flex h-full min-h-0 flex-col overflow-hidden rounded-[8px] border ${
        isDark ? 'border-[#333333] bg-[#1e1e1e]' : 'border-[#dfe5ee] bg-white'
      }`}
    >
      {/* Editor toolbar */}
      <AboutTabBar
        actionButton={
          <button
            type="button"
            onClick={() => openViewer()}
            className="flex h-7 items-center gap-2 rounded-[5px] bg-primary px-4 text-[8px] font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 cursor-pointer"
          >
            <span>Expand Image</span>

            <Maximize2 className="size-3" strokeWidth={2} aria-hidden="true" />
          </button>
        }
      />

      {/* Breadcrumb */}
      <div className="mx-1 flex h-9 shrink-0 items-center rounded-t-[4px] bg-[#06243a] px-2.5">
        <span className="text-[8px] font-semibold leading-none text-white">{breadcrumb}</span>
      </div>

      {/* Image area */}
      <div
        className={`relative min-h-0 flex-1 overflow-hidden ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Avatar composition */}
          <div className="relative size-[390px] shrink-0">
            {/* Floating icons */}
            {floatingIcons.map((icon, index) => (
              <motion.div
                key={`${icon.alt}-${index}`}
                className={`absolute z-20 flex size-8 items-center justify-center rounded-full shadow-md ${isDark ? 'bg-[#2d2d2d]' : 'bg-white'} ${icon.position}`}
                animate={{
                  x: [0, 6, -5, 0],
                  y: [0, -6, 5, 0],
                  rotate: [0, 8, -7, 0],
                }}
                transition={{
                  duration: 5.5 + index * 0.25,
                  delay: icon.delay,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }}
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={16}
                  height={16}
                  className="size-4 object-contain"
                />
              </motion.div>
            ))}

            {/* Circular avatar */}
            <motion.div
              className={`absolute left-1/2 top-1/2 aspect-square w-[400px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full shadow-lg ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`}
              animate={{
                rotate: [0, 2, -2, 0],
                scale: [1, 1.015, 1, 1.015, 1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="400px"
                className="object-cover"
              />
            </motion.div>

            {/* Orbit ring */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
              animate={{ rotate: 360 }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/[0.04]"
              animate={{ rotate: -360 }}
              transition={{
                duration: 38,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div
        className={`flex h-6 shrink-0 items-center justify-between rounded-b-[8px] px-3 text-[7px] ${
          isDark ? 'bg-[#252526] text-[#cccccc]' : 'bg-[#eef4fb] text-[#172033]'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <GitBranch className="size-2.5" strokeWidth={1.8} aria-hidden="true" />
            Main
          </span>

          <span className="flex items-center gap-1">
            <XCircle className="size-2.5" strokeWidth={1.8} aria-hidden="true" />0
          </span>

          <span className="flex items-center gap-1">
            <AlertTriangle className="size-2.5" strokeWidth={1.8} aria-hidden="true" />0
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span className="flex items-center gap-1">
            {fileIcon}
            {language}
          </span>
          <Bell className="size-2.5" strokeWidth={1.8} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
