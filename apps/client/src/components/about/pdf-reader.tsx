'use client';

import { useDownload } from '@/hooks/use-download';
import { useTheme } from '@/hooks/use-theme';
import {
  AlertCircle,
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
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { AboutTabBar } from './about-tab-bar';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

type PdfReaderProps = {
  fileName: string;
  breadcrumb: string;
  file: string;
  language: string;
};

const MIN_ZOOM = 50;
const MAX_ZOOM = 200;
const ZOOM_STEP = 10;

export function PdfReader({ fileName, breadcrumb, file, language }: PdfReaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { download } = useDownload();

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const documentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
  }, []);

  useEffect(() => {
    let cancelled = false;
    let createdUrl: string | null = null;

    async function loadPdf() {
      setIsLoading(true);
      setLoadError(null);
      setPdfUrl(null);
      setNumPages(0);
      setCurrentPage(1);

      try {
        const response = await fetch(file, {
          cache: 'no-store',
          headers: {
            Pragma: 'no-cache',
            'Cache-Control': 'no-cache',
          },
        });

        if (!response.ok) {
          const serverErrorText = await response.text().catch(() => '');
          throw new Error(
            serverErrorText || `Unable to load PDF (${response.status} ${response.statusText})`,
          );
        }

        const buffer = await response.arrayBuffer();

        if (!buffer.byteLength) {
          throw new Error('The PDF response body is empty (0 bytes).');
        }

        if (cancelled) return;

        const blob = new Blob([buffer], { type: 'application/pdf' });
        createdUrl = URL.createObjectURL(blob);
        setPdfUrl(createdUrl);
      } catch (error) {
        if (cancelled) return;

        console.error('Failed to load PDF:', error);
        setLoadError(error instanceof Error ? error.message : 'Unable to load this PDF.');
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadPdf();

    return () => {
      cancelled = true;
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [file]);

  const handleDocumentLoad = useCallback(({ numPages: loadedPages }: { numPages: number }) => {
    setNumPages(loadedPages);
    setCurrentPage(1);
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      const nextPage = Math.min(Math.max(page, 1), numPages);
      setCurrentPage(nextPage);
    },
    [numPages],
  );

  const zoomIn = useCallback(() => {
    setZoom((value) => Math.min(value + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((value) => Math.max(value - ZOOM_STEP, MIN_ZOOM));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(100);
  }, []);

  const pageWidth = useMemo(() => {
    if (zoom === 100) return undefined;
    return Math.round(780 * (zoom / 100));
  }, [zoom]);

  const handleDownload = useCallback(() => {
    download({
      fileName: fileName,
      url: file,
      fileType: 'pdf',
      onError: (error) => {
        console.error('Download failed:', error);
      },
    });
  }, [file, fileName, download]);

  const handlePrint = useCallback(() => {
    const printWindow = window.open(file, '_blank');
    if (!printWindow) return;

    printWindow.addEventListener('load', () => {
      printWindow.focus();
      printWindow.print();
    });
  }, [file]);

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

  const secondaryText = isDark ? '#a7a7a7' : '#687386';

  const thumbnailPages = useMemo(() => {
    if (!numPages) return [];
    return Array.from({ length: numPages }, (_, i) => i + 1);
  }, [numPages]);

  return (
    <div
      ref={documentContainerRef}
      className={`flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[8px] border ${
        isDark ? 'border-[#333333] bg-[#1e1e1e]' : 'border-[#dfe5ee] bg-white'
      }`}
    >
      {/* Editor toolbar */}
      <div className="px-2 pt-2">
        <AboutTabBar
          actionButton={
            <button
              type="button"
              onClick={handleFullscreen}
              className="flex h-6 items-center gap-1 rounded-[4px] bg-primary px-2 text-[7px] font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 lg:h-7 lg:gap-2 lg:rounded-[5px] lg:px-4 lg:text-[8px]"
            >
              <span>Expand PDF</span>
              <Maximize2 className="size-3" strokeWidth={2} aria-hidden="true" />
            </button>
          }
        />
      </div>

      {/* Breadcrumb */}
      <div className="mx-1 flex h-9 shrink-0 items-center rounded-t-[4px] bg-[#06243a] px-2.5">
        <span className="text-[8px] font-semibold leading-none text-white">{breadcrumb}</span>
      </div>

      {/* PDF Controls Toolbar */}
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
            {numPages ? `${currentPage} / ${numPages}` : '— / —'}
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
            aria-label="Download PDF"
          >
            <Download className="size-3" strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className={`transition-opacity hover:opacity-70 ${
              isDark ? 'text-[#d4d4d4]' : 'text-[#172033]'
            }`}
            aria-label="Print PDF"
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

      {/* Main Content Area */}
      <div className={`min-h-0 flex-1 overflow-hidden ${isDark ? 'bg-[#1e1e1e]' : 'bg-[#f5f7fa]'}`}>
        <div className="flex h-full min-h-0">
          {/* Sidebar Thumbnails */}
          <aside
            className={`w-40 shrink-0 overflow-y-auto border-r px-3 py-4 ${
              isDark ? 'border-[#3a3a3a] bg-[#242424]' : 'border-[#e1e6ee] bg-[#f9fafc]'
            }`}
            aria-label="PDF pages"
          >
            {isLoading || !pdfUrl ? (
              <div className="flex flex-col items-center gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className={`h-36 w-28 animate-pulse rounded-[5px] ${
                      isDark ? 'bg-[#333333]' : 'bg-[#e6eaf0]'
                    }`}
                  />
                ))}
              </div>
            ) : (
              <Document file={pdfUrl} loading={null} error={null}>
                <div className="flex flex-col items-center gap-4">
                  {thumbnailPages.map((page) => (
                    <button
                      type="button"
                      key={page}
                      onClick={() => goToPage(page)}
                      className="group flex w-full flex-col items-center gap-1.5"
                      aria-label={`Go to page ${page}`}
                    >
                      <div
                        className={`overflow-hidden rounded-[5px] border transition-all ${
                          page === currentPage
                            ? 'border-[#2563eb] ring-2 ring-[#2563eb]/30 shadow-sm'
                            : isDark
                              ? 'border-[#444444] hover:border-[#666666]'
                              : 'border-[#dce2ea] hover:border-[#aeb8c8]'
                        }`}
                      >
                        <Page
                          pageNumber={page}
                          width={120}
                          canvasBackground="white"
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </div>

                      <span
                        className={`text-[9px] font-medium ${
                          page === currentPage ? 'font-semibold text-primary' : secondaryText
                        }`}
                      >
                        {String(page).padStart(2, '0')}
                      </span>
                    </button>
                  ))}
                </div>
              </Document>
            )}
          </aside>

          {/* Main Document Display */}
          <main className="min-w-0 flex-1 overflow-auto">
            <div className="flex min-h-full min-w-full items-start justify-center px-8 py-8">
              {isLoading ? (
                <div
                  className={`flex h-[520px] w-[390px] flex-col items-center justify-center rounded-[4px] border shadow-sm ${
                    isDark ? 'border-[#3a3a3a] bg-[#242424]' : 'border-[#e1e6ee] bg-white'
                  }`}
                >
                  <div className="mb-4 size-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
                  <span
                    className={`text-[9px] font-medium ${
                      isDark ? 'text-[#d4d4d4]' : 'text-[#172033]'
                    }`}
                  >
                    Loading PDF…
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
                    Unable to load PDF
                  </span>

                  <span
                    className={`mb-4 max-w-[300px] text-center text-[7px] ${
                      isDark ? 'text-[#999999]' : 'text-[#687386]'
                    }`}
                  >
                    {loadError}
                  </span>
                </div>
              ) : pdfUrl ? (
                <Document
                  file={pdfUrl}
                  onLoadSuccess={handleDocumentLoad}
                  loading={null}
                  error={
                    <div
                      className={`flex h-[360px] w-[420px] items-center justify-center rounded-[6px] border ${
                        isDark ? 'border-[#3a3a3a] bg-[#242424]' : 'border-[#e1e6ee] bg-white'
                      }`}
                    >
                      <span
                        className={`text-[8px] ${isDark ? 'text-[#cccccc]' : 'text-[#687386]'}`}
                      >
                        Unable to render this PDF.
                      </span>
                    </div>
                  }
                >
                  <div
                    className={`overflow-hidden rounded-[3px] border shadow-md ${
                      isDark ? 'border-[#444444] bg-white' : 'border-[#dce2ea] bg-white'
                    }`}
                  >
                    <Page
                      pageNumber={currentPage}
                      width={pageWidth}
                      canvasBackground="white"
                      renderTextLayer
                      renderAnnotationLayer
                      loading={
                        <div
                          className="flex items-center justify-center bg-white"
                          style={{
                            width: pageWidth ?? 780,
                            height: 1000,
                          }}
                        >
                          <div className="size-7 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
                        </div>
                      }
                    />
                  </div>
                </Document>
              ) : null}
            </div>
          </main>
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
            <AlertCircle className="size-2.5" strokeWidth={1.8} aria-hidden="true" />0
          </span>
          <span className="flex items-center gap-1">
            <AlertTriangle className="size-2.5" strokeWidth={1.8} aria-hidden="true" />0
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span>
            Pg {currentPage}
            {numPages ? ` / ${numPages}` : ''}
          </span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span className="flex items-center gap-1">
            {language}
            <Bell className="size-2.5" strokeWidth={1.8} aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
}
