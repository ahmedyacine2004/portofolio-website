import { DocxReaderClient } from '@/components/about/docx-reader-client';

export default function BachelorDocxPage() {
  return (
    <DocxReaderClient
      fileName="bachelor.docx"
      breadcrumb="about > education > bachelor.docx"
      file="/documents/bachelor.docx"
    />
  );
}
