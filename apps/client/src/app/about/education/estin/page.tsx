import { PdfReaderClient } from '@/components/about/pdf-reader-client';

export default function EstinPage() {
  return (
    <PdfReaderClient
      fileName="estin.pdf"
      breadcrumb="about > education > estin.pdf"
      file="/api/pdf/estin"
      language="PDF"
    />
  );
}
