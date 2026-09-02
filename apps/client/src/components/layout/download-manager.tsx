'use client';

import { useTranslation } from '@/hooks/use-translation';
import { useDownloadManagerStore, type DownloadItem } from '@/stores/download-manager.store';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Download,
  FileCode,
  FileIcon,
  FileText,
  FolderOpen,
  ImageIcon,
  Minus,
  RotateCw,
  X,
} from 'lucide-react';

export function DownloadManager() {
  const { t } = useTranslation();
  const isOpen = useDownloadManagerStore((s) => s.isOpen);
  const isMinimized = useDownloadManagerStore((s) => s.isMinimized);
  const items = useDownloadManagerStore((s) => s.items);
  const setOpen = useDownloadManagerStore((s) => s.setOpen);
  const toggleMinimize = useDownloadManagerStore((s) => s.toggleMinimize);
  const removeDownload = useDownloadManagerStore((s) => s.removeDownload);
  const cancelDownload = useDownloadManagerStore((s) => s.cancelDownload);
  const clearCompleted = useDownloadManagerStore((s) => s.clearCompleted);
  const retryDownload = useDownloadManagerStore((s) => s.retryDownload);

  const activeDownloads = items.filter(
    (item) => item.status === 'downloading' || item.status === 'queued',
  );

  if (!isOpen) return null;

  const renderFileIcon = (type: DownloadItem['fileType']) => {
    switch (type) {
      case 'png':
      case 'jpg':
        return <ImageIcon className="size-3.5 text-purple-600 dark:text-purple-400" />;
      case 'pdf':
        return <FileText className="size-3.5 text-red-600 dark:text-red-400" />;
      case 'doc':
        return <FileCode className="size-3.5 text-blue-600 dark:text-blue-400" />;
      case 'zip':
        return <FileIcon className="size-3.5 text-orange-600 dark:text-orange-400" />;
      default:
        return <FileIcon className="size-3.5 text-slate-600 dark:text-slate-400" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="fixed inset-x-2 bottom-14 z-50 w-auto max-w-none overflow-hidden rounded-sm bg-background shadow-[0_0_12px_rgba(148,163,184,0.22)] dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] sm:inset-x-auto sm:right-6 sm:bottom-10 sm:w-full sm:max-w-[360px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <div className="flex items-center gap-2">
            <Download className="size-3.5 text-primary" />
            <span className="text-[9px] font-bold text-foreground">
              {t('downloadManager.title')}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleMinimize}
              className="flex size-7 items-center justify-center rounded-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:size-5"
              aria-label={isMinimized ? t('downloadManager.expand') : t('downloadManager.minimize')}
            >
              <Minus className="size-3" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex size-7 items-center justify-center rounded-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:size-5"
              aria-label={t('downloadManager.close')}
            >
              <X className="size-3" />
            </button>
          </div>
        </div>

        {/* Minimized view or Full list */}
        {!isMinimized && (
          <>
            {/* Downloads List */}
            <div className="max-h-[calc(100dvh-12rem)] overflow-y-auto p-2 space-y-2 sm:max-h-[280px]">
              {items.length === 0 ? (
                <div className="py-6 text-center text-[9px] text-muted-foreground">
                  {t('downloadManager.noDownloads')}
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-2 rounded-xs p-2 transition-all ${
                      item.status === 'completed' || item.status === 'failed'
                        ? 'hover:bg-muted/40'
                        : 'bg-primary/5'
                    }`}
                  >
                    {/* File icon */}
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-xs bg-background">
                      {renderFileIcon(item.fileType)}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[9px] font-semibold text-foreground leading-snug">
                        {item.fileName}
                      </p>
                      <p className="text-[8px] text-muted-foreground leading-tight">
                        {item.fileSize}
                      </p>

                      {/* Status */}
                      <div className="mt-0.5 flex items-center gap-1">
                        {item.status === 'completed' && (
                          <span className="text-[8px] font-semibold text-emerald-600 dark:text-emerald-400">
                            {t('downloadManager.completed')}
                          </span>
                        )}
                        {item.status === 'downloading' && (
                          <span className="text-[8px] font-medium text-primary">
                            {t('downloadManager.downloading')} {item.progress}%
                          </span>
                        )}
                        {item.status === 'queued' && (
                          <span className="text-[8px] font-medium text-amber-600 dark:text-amber-400">
                            {t('downloadManager.queued')}
                          </span>
                        )}
                        {item.status === 'cancelled' && (
                          <span className="text-[8px] font-medium text-destructive">
                            {t('downloadManager.cancelled')}
                          </span>
                        )}
                        {item.status === 'failed' && (
                          <span className="text-[8px] font-medium text-destructive">
                            {t('downloadManager.failed')}
                          </span>
                        )}
                      </div>

                      {/* Error message */}
                      {item.error && (
                        <p className="mt-0.5 text-[7px] text-destructive leading-tight">
                          {item.error}
                        </p>
                      )}

                      {/* Progress bar */}
                      {(item.status === 'downloading' || item.status === 'queued') && (
                        <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
                          <motion.div
                            className={`h-full ${
                              item.status === 'queued' ? 'bg-amber-500' : 'bg-primary'
                            }`}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${Math.max(item.progress, item.status === 'queued' ? 5 : 0)}%`,
                            }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex shrink-0 items-center gap-1">
                      {item.status === 'completed' && (
                        <button
                          type="button"
                          onClick={() => {
                            if (item.downloadUrl) {
                              window.open(item.downloadUrl, '_blank');
                            }
                          }}
                          className="flex size-5 items-center justify-center rounded-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          title={t('downloadManager.openFile')}
                        >
                          <FolderOpen className="size-3" />
                        </button>
                      )}
                      {item.status === 'failed' && (
                        <button
                          type="button"
                          onClick={() => retryDownload(item.id)}
                          className="flex size-5 items-center justify-center rounded-xs text-destructive transition-colors hover:bg-destructive/10"
                          title={t('downloadManager.retryDownload')}
                        >
                          <RotateCw className="size-3" />
                        </button>
                      )}
                      {item.status === 'downloading' && (
                        <button
                          type="button"
                          onClick={() => cancelDownload(item.id)}
                          className="flex size-5 items-center justify-center rounded-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          title={t('downloadManager.cancelDownload')}
                        >
                          <X className="size-3" />
                        </button>
                      )}
                      {(item.status === 'cancelled' || item.status === 'completed') && (
                        <button
                          type="button"
                          onClick={() => removeDownload(item.id)}
                          className="flex size-5 items-center justify-center rounded-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          title={t('downloadManager.removeFromList')}
                        >
                          <X className="size-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="flex items-center justify-between border-t border-border px-3 py-2 text-[8px]">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  {activeDownloads.length > 0 && (
                    <>
                      <span className="flex size-1.5 rounded-full bg-primary animate-pulse" />
                      <span>
                        {t('downloadManager.activeCount', `${activeDownloads.length} active`)}
                      </span>
                    </>
                  )}
                </div>

                {items.some((item) => item.status === 'completed') && (
                  <button
                    type="button"
                    onClick={clearCompleted}
                    className="font-semibold text-primary transition-colors hover:underline"
                  >
                    {t('downloadManager.clearCompleted')}
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
