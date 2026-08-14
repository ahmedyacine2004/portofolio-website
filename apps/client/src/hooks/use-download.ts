/**
 * Hook for managing downloads and integration with Download Manager
 */

import { getFileMetadata, triggerBrowserDownload, type DownloadOptions } from '@/lib/download';
import { useDownloadManagerStore } from '@/stores/download-manager.store';
import { useCallback } from 'react';

export function useDownload() {
  const addDownload = useDownloadManagerStore((s) => s.addDownload);
  const completeDownload = useDownloadManagerStore((s) => s.completeDownload);
  const failDownload = useDownloadManagerStore((s) => s.failDownload);

  const download = useCallback(
    async (options: DownloadOptions) => {
      const { fileName, url, fileSize, fileType, onStart, onError } = options;

      // Validate URL
      try {
        new URL(url, typeof window !== 'undefined' ? window.location.origin : '');
      } catch {
        const error = new Error(`Invalid download URL: ${url}`);
        onError?.(error);
        return;
      }

      // Get file metadata
      const metadata = getFileMetadata(url, fileName);

      // Register download with manager
      const downloadId = `dl-${Date.now()}`;
      addDownload({
        fileName: metadata.fileName,
        fileSize: fileSize || metadata.fileSize,
        fileType: fileType || metadata.fileType,
        downloadUrl: url,
        status: 'downloading',
        progress: 0,
      });

      // Callback for download start
      onStart?.();

      try {
        // Trigger browser download
        triggerBrowserDownload(url, metadata.fileName);

        // Mark as completed
        // Note: Browser doesn't provide exact completion time for same-origin downloads,
        // so we mark it as completed immediately after the download is initiated.
        // For large files, this is accurate since the browser has taken control.
        setTimeout(() => {
          completeDownload(downloadId);
        }, 500);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        failDownload(downloadId, errorMessage);
        onError?.(error instanceof Error ? error : new Error(errorMessage));
      }
    },
    [addDownload, completeDownload, failDownload],
  );

  return { download };
}
