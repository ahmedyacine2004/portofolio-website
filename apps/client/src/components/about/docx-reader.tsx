'use client';

import { AboutTabBar } from './about-tab-bar';
import Image from 'next/image';
import DocxIcon from '@/assets/icons/docx.svg';
import { useTheme } from '@/hooks/use-theme';
import {
  AlertTriangle,
  Bell,
  Download,
  GitBranch,
  Maximize2,
  Minus,
  MoreVertical,
  Plus,
  Printer,
  X,
  XCircle,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type DocxReaderProps = {
  fileName?: string;
  breadcrumb?: string;
  file?: string;
  language?: string;
  fileIcon?: React.ReactNode;
};

const MIN_ZOOM = 50;
const MAX_ZOOM = 200;
const ZOOM_STEP = 10;

export function DocxReader({
  fileName = 'bachelor.docx',
  breadcrumb = 'about > education > bachelor.docx',
  file = '/api/docx?filename=bachelor.docx',
  language = 'DOCX',
  fileIcon = <Image src={DocxIcon} alt="DOCX icon" className="size-3" />,
}: DocxReaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [docxBuffer, setDocxBuffer] = useState<ArrayBuffer | null>(null);
  const [zoom, setZoom] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const documentContainerRef = useRef<HTMLDivElement>(null);
  const docxRenderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadDocx() {
      setIsLoading(true);
      setLoadError(null);
      setDocxBuffer(null);

      try {
        const response = await fetch(file, {
          cache: 'no-store',
          headers: {
            Pragma: 'no-cache',
            'Cache-Control': 'no-cache',
          },
        });

        const contentType = response.headers.get('content-type') || '';

        // Handle HTML 404 or server error responses
        if (!response.ok || contentType.includes('text/html')) {
          if (response.status === 404) {
            throw new Error(
              `DOCX file or API endpoint not found. Verify "${fileName}" is placed in "apps/client/public/documents/".`,
            );
          }
          const rawText = await response.text().catch(() => '');
          throw new Error(
            rawText.startsWith('<!DOCTYPE') || rawText.startsWith('<html')
              ? `Route returned 404 HTML page (${response.status}). Check route path.`
              : rawText || `Request failed (${response.status} ${response.statusText})`,
          );
        }

        const buffer = await response.arrayBuffer();

        if (!buffer.byteLength) {
          throw new Error('Received an empty file buffer (0 bytes).');
        }

        if (cancelled) return;
        setDocxBuffer(buffer);
      } catch (error) {
        if (cancelled) return;
        console.error('Failed to load DOCX:', error);
        setLoadError(error instanceof Error ? error.message : 'Unable to load DOCX file.');
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadDocx();

    return () => {
      cancelled = true;
    };
  }, [file, fileName]);

  useEffect(() => {
    if (!docxBuffer || !docxRenderRef.current) return;

    const renderContainer = docxRenderRef.current;
    renderContainer.innerHTML = '';

    import('docx-preview')
      .then(({ renderAsync }) => {
        return renderAsync(docxBuffer, renderContainer, undefined, {
          className: 'docx-preview-wrapper',
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          experimental: true,
        });
      })
      .catch((error) => {
        console.error('Error rendering DOCX layout:', error);
        setLoadError('Failed to format and render DOCX content.');
      });
  }, [docxBuffer]);

  const zoomIn = useCallback(() => {
    setZoom((value) => Math.min(value + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((value) => Math.max(value - ZOOM_STEP, MIN_ZOOM));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(100);
  }, []);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = file;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, [file, fileName]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleFullscreen = useCallback(async () => {
    if (!documentContainerRef.current) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await documentContainerRef.current.requestFullscreen();
      }
    } catch (error) {
      console.error('Unable to toggle fullscreen:', error);
    }
  }, []);

  const zoomTransform = useMemo(
    () => ({
      transform: `scale(${zoom / 100})`,
      transformOrigin: 'top center',
    }),
    [zoom],
  );

  return (
    <div
      ref={documentContainerRef}
      className={`flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[8px] border ${
        isDark ? 'border-[#333333] bg-[#1e1e1e]' : 'border-[#dfe5ee] bg-white'
      }`}
    >
      {/* Editor toolbar */}
      <AboutTabBar
        actionButton={
          <button
            type="button"
            onClick={handleFullscreen}
            className="flex h-7 items-center gap-2 rounded-[5px] bg-primary px-4 text-[8px] font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            <span>Expand DOCX</span>
            <Maximize2 className="size-3" strokeWidth={2} aria-hidden="true" />
          </button>
        }
      />

      {/* Breadcrumb */}
      <div className="mx-1 flex h-9 shrink-0 items-center rounded-t-[4px] bg-[#06243a] px-2.5">
        <span className="text-[8px] font-semibold leading-none text-white">{breadcrumb}</span>
      </div>

      {/* Controls Toolbar */}
      <div
        className={`flex h-10 shrink-0 items-center justify-between border-b px-3 ${
          isDark ? 'border-[#333333] bg-[#252526]' : 'border-[#edf0f4] bg-white'
        }`}
      >
        <div className="flex items-center gap-4">
          <span
            className={`text-[8px] font-medium ${isDark ? 'text-[#d4d4d4]' : 'text-[#172033]'}`}
          >
            {fileName}
          </span>
          <span className={`text-[8px] ${isDark ? 'text-[#8f8f8f]' : 'text-[#687386]'}`}>
            Word Document
          </span>
        </div>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
          <button
            type="button"
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            className={`flex size-6 items-center justify-center rounded-[4px] transition-colors disabled:opacity-40 ${
              isDark ? 'hover:bg-[#333333]' : 'hover:bg-[#f1f3f7]'
            }`}
            aria-label="Zoom out"
          >
            <Minus className="size-3" strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={resetZoom}
            className={`min-w-[40px] rounded-[4px] px-2 py-1 text-[8px] font-medium ${
              isDark ? 'bg-[#303030] text-[#d4d4d4]' : 'bg-[#f7f8fa] text-[#172033]'
            }`}
            aria-label="Reset zoom"
          >
            {zoom}%
          </button>

          <button
            type="button"
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            className={`flex size-6 items-center justify-center rounded-[4px] transition-colors disabled:opacity-40 ${
              isDark ? 'hover:bg-[#333333]' : 'hover:bg-[#f1f3f7]'
            }`}
            aria-label="Zoom in"
          >
            <Plus className="size-3" strokeWidth={2} />
          </button>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className={`transition-opacity hover:opacity-70 ${
              isDark ? 'text-[#d4d4d4]' : 'text-[#172033]'
            }`}
            aria-label="Download DOCX"
          >
            <Download className="size-3" strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className={`transition-opacity hover:opacity-70 ${
              isDark ? 'text-[#d4d4d4]' : 'text-[#172033]'
            }`}
            aria-label="Print DOCX"
          >
            <Printer className="size-3" strokeWidth={1.8} />
          </button>

          <button
            type="button"
            className={`transition-opacity hover:opacity-70 ${
              isDark ? 'text-[#d4d4d4]' : 'text-[#172033]'
            }`}
            aria-label="More options"
          >
            <MoreVertical className="size-3" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Main Content Viewport */}
      <div className={`min-h-0 flex-1 overflow-auto ${isDark ? 'bg-[#1e1e1e]' : 'bg-[#f5f7fa]'}`}>
        <div className="flex min-h-full min-w-full items-start justify-center px-8 py-8">
          {isLoading ? (
            <div
              className={`flex h-[520px] w-[390px] flex-col items-center justify-center rounded-[4px] border shadow-sm ${
                isDark ? 'border-[#3a3a3a] bg-[#242424]' : 'border-[#e1e6ee] bg-white'
              }`}
            >
              <div className="mb-4 size-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
              <span
                className={`text-[9px] font-medium ${isDark ? 'text-[#d4d4d4]' : 'text-[#172033]'}`}
              >
                Loading DOCX…
              </span>
            </div>
          ) : loadError ? (
            <div
              className={`flex h-[360px] w-[420px] flex-col items-center justify-center rounded-[6px] border px-8 text-center shadow-sm ${
                isDark ? 'border-[#3a3a3a] bg-[#242424]' : 'border-[#e1e6ee] bg-white'
              }`}
            >
              <div className="mb-3 flex size-9 items-center justify-center rounded-full bg-red-500/10">
                <X className="size-4 text-red-500" strokeWidth={2} />
              </div>

              <span
                className={`mb-2 text-[10px] font-semibold ${
                  isDark ? 'text-[#f0f0f0]' : 'text-[#172033]'
                }`}
              >
                Unable to load DOCX
              </span>

              <span
                className={`mb-4 max-w-[320px] text-center text-[7.5px] ${
                  isDark ? 'text-[#999999]' : 'text-[#687386]'
                }`}
              >
                {loadError}
              </span>
            </div>
          ) : (
            <div style={zoomTransform} className="transition-transform duration-150">
              <div
                ref={docxRenderRef}
                className="overflow-hidden rounded-[4px] bg-white text-black shadow-md"
              />
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
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
