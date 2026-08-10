import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { visionTs } from '@/lib/utils/vision';
import TypescriptIcon from '@/assets/icons/typescript.svg';

export default function VisionPage() {
  return (
    <CodeEditor
      fileName="vision.ts"
      breadcrumb="about > career > vision.ts"
      language="TypeScript"
      content={visionTs}
      fileIcon={<Image src={TypescriptIcon} alt="TypeScript icon" className="size-3" />}
    />
  );
}
