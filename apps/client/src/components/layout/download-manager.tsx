'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  Download,
  FileCode,
  FileIcon,
  FileText,
  FolderOpen,
  ImageIcon,
  Minus,
  Pause,
  X,
} from 'lucide-react';
import { useDownloadManagerStore, type DownloadItem } from '@/stores/download-manager.store';

export function DownloadManager() {
  const isOpen = useDownloadManagerStore((s) => s.isOpen);
  const isMinimized = useDownloadManagerStore((s) => s.isMinimized);
  const items = useDownloadManagerStore((s) => s.items);
  const setOpen = useDownloadManagerStore((s) => s.setOpen);
  const toggleMinimize = useDownloadManagerStore((s) => s.toggleMinimize);
  const removeDownload = useDownloadManagerStore((s) => s.removeDownload);
  const cancelDownload = useDownloadManagerStore((s) => s.cancelDownload);
  const clearCompleted = useDownloadManagerStore((s) => s.clearCompleted);

  const activeDownloads = items.filter((item) => item.status === 'downloading');

  if (!isOpen) return null;

  const renderFileIcon = (type: DownloadItem['fileType']) => {
    switch (type) {
      case 'png':
      case 'jpg':
        return <ImageIcon className="size-4 text-purple-600 dark:text-purple-400" />;
      case 'pdf':
        return <FileText className="size-4 text-purple-600 dark:text-purple-400" />;
      case 'doc':
        return <FileCode className="size-4 text-blue-600 dark:text-blue-400" />;
      default:
        return <FileIcon className="size-4 text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="fixed bottom-10 right-6 z-50 w-full max-w-[360px] overflow-hidden rounded-[8px] border border-border/80 bg-background/95 shadow-2xl backdrop-blur-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <Download className="size-3.5 text-primary" />
            <span className="text-[11px] font-bold text-foreground">Download Manager</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleMinimize}
              className="flex size-5 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={isMinimized ? 'Expand Download Manager' : 'Minimize Download Manager'}
            >
              <Minus className="size-3" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex size-5 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close Download Manager"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>

        {/* Minimized view content or Full list */}
        {!isMinimized && (
          <>
            {/* Downloads List */}
            <div className="max-h-[280px] overflow-y-auto p-2.5 space-y-2.5 divide-y divide-border/30">
              {items.length === 0 ? (
                <div className="py-6 text-center text-[10px] text-muted-foreground">
                  No downloads right now.
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="pt-2 first:pt-0 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* File icon container */}
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-800/40">
                          {renderFileIcon(item.fileType)}
                        </div>

                        {/* Title and stats */}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[10px] font-semibold text-foreground leading-snug">
                            {item.fileName}
                          </p>
                          <p className="text-[8px] font-medium text-muted-foreground">
                            {item.fileSize}{' '}
                            {item.status === 'completed' && (
                              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                • Completed
                              </span>
                            )}
                            {item.status === 'downloading' && (
                              <span className="text-primary font-medium">• {item.progress}%</span>
                            )}
                            {item.status === 'cancelled' && (
                              <span className="text-destructive font-medium">• Cancelled</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1 shrink-0">
                        {item.status === 'completed' ? (
                          <>
                            <span className="flex size-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                              <Check className="size-3" />
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (item.downloadUrl) {
                                  window.open(item.downloadUrl, '_blank');
                                }
                              }}
                              className="flex size-5 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              title="Open File"
                            >
                              <FolderOpen className="size-3" />
                            </button>
                          </>
                        ) : item.status === 'downloading' ? (
                          <>
                            <button
                              type="button"
                              onClick={() => cancelDownload(item.id)}
                              className="flex size-5 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              title="Pause"
                            >
                              <Pause className="size-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeDownload(item.id)}
                              className="flex size-5 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              title="Cancel"
                            >
                              <X className="size-3" />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => removeDownload(item.id)}
                            className="flex size-5 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            title="Remove"
                          >
                            <X className="size-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className={`h-full ${
                          item.status === 'completed'
                            ? 'bg-emerald-500'
                            : item.status === 'cancelled'
                              ? 'bg-muted-foreground/40'
                              : 'bg-primary'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-3.5 py-2 text-[9px]">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="flex size-1.5 rounded-full bg-primary animate-pulse" />
                <span>{activeDownloads.length} Active downloads</span>
              </div>

              <button
                type="button"
                onClick={clearCompleted}
                className="font-semibold text-primary transition-colors hover:underline"
              >
                Clear Completed
              </button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
