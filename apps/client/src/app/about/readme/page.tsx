import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { readmeMd } from '@/lib/utils/readme';
import MarkdownIcon from '@/assets/icons/markdown.svg';

export default function ReadmePage() {
  return (
    <CodeEditor
      fileName="README.md"
      breadcrumb="about > README.md"
      language="Markdown"
      content={readmeMd}
      fileIcon={<Image src={MarkdownIcon} alt="Markdown icon" className="size-3" />}
    />
  );
}
