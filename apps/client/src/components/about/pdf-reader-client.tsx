'use client';

import dynamic from 'next/dynamic';

const PdfReader = dynamic(
  () => import('@/components/about/pdf-reader').then((module) => module.PdfReader),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[500px] items-center justify-center rounded-[8px] bg-background">
        <span className="text-[10px] text-muted-foreground">Loading PDF reader…</span>
      </div>
    ),
  },
);

type PdfReaderClientProps = {
  fileName: string;
  breadcrumb: string;
  file: string;
  language: string;
};

export function PdfReaderClient(props: PdfReaderClientProps) {
  return <PdfReader {...props} />;
}
