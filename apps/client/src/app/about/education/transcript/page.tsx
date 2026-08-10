import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { transcriptXml } from '@/lib/utils/transcript';
import XmlIcon from '@/assets/icons/xml.svg';

export default function TranscriptPage() {
  return (
    <CodeEditor
      fileName="transcript.xml"
      breadcrumb="about > education > transcript.xml"
      language="XML"
      content={transcriptXml}
      fileIcon={<Image src={XmlIcon} alt="XML icon" className="size-3" />}
    />
  );
}
