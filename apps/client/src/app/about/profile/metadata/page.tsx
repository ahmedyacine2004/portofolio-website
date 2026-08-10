import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { metadataCode } from '@/lib/utils/metadata';
import JsonIcon from '@/assets/icons/json.svg';

export default function MetadataPage() {
  return (
    <CodeEditor
      fileName="metadata.json"
      breadcrumb="about > profile > metadata.json"
      language="JSON"
      content={metadataCode}
      fileIcon={<Image src={JsonIcon} alt="JSON icon" className="size-3" />}
    />
  );
}
