/**
 * Download utility for managing file downloads and tracking them
 * in the Download Manager
 */

export interface DownloadOptions {
  fileName: string;
  fileSize?: string;
  fileType?: 'pdf' | 'png' | 'jpg' | 'zip' | 'doc' | 'other';
  url: string;
  onStart?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Extract file size in human-readable format
 */
function getFileSizeFromUrl(url: string): string {
  // This is a simple fallback - in a real app, you'd fetch HEAD to get Content-Length
  // For now, we'll use a reasonable default based on file type
  const ext = url.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return '2.4 MB';
    case 'docx':
      return '1.8 MB';
    case 'zip':
      return '5.2 MB';
    case 'png':
      return '3.1 MB';
    case 'jpg':
      return '2.8 MB';
    default:
      return 'Unknown';
  }
}

/**
 * Extract file type from filename/URL
 */
function getFileType(fileName: string): 'pdf' | 'png' | 'jpg' | 'zip' | 'doc' | 'other' {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return 'pdf';
    case 'png':
      return 'png';
    case 'jpg':
    case 'jpeg':
      return 'jpg';
    case 'zip':
      return 'zip';
    case 'doc':
    case 'docx':
      return 'doc';
    default:
      return 'other';
  }
}

/**
 * Trigger a browser download for a file
 */
export function triggerBrowserDownload(url: string, fileName: string): void {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Failed to trigger download:', error);
    throw new Error(`Failed to download ${fileName}`);
  }
}

/**
 * Get file metadata from a URL
 */
export function getFileMetadata(
  url: string,
  customFileName?: string,
): {
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'png' | 'jpg' | 'zip' | 'doc' | 'other';
} {
  const urlPath = new URL(url, typeof window !== 'undefined' ? window.location.origin : '')
    .pathname;
  const fileName = customFileName || urlPath.split('/').pop() || 'download';
  const fileSize = getFileSizeFromUrl(url);
  const fileType = getFileType(fileName);

  return {
    fileName,
    fileSize,
    fileType,
  };
}

/**
 * Format current time for download timestamp
 */
export function getTimestamp(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Validate if a URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url, typeof window !== 'undefined' ? window.location.origin : '');
    return true;
  } catch {
    return false;
  }
}
