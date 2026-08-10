// src/components/about/docx-reader-client.tsx
'use client';

import dynamic from 'next/dynamic';

const DocxReader = dynamic(() => import('./docx-reader').then((mod) => mod.DocxReader), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <div className="size-7 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
    </div>
  ),
});

type DocxReaderClientProps = {
  fileName?: string;
  breadcrumb?: string;
  file?: string;
  language?: string;
};

export function DocxReaderClient(props: DocxReaderClientProps) {
  return <DocxReader {...props} />;
}
