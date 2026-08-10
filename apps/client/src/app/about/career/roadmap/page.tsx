import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { roadmapMmd } from '@/lib/utils/roadmap';
import MarkdownIcon from '@/assets/icons/markdown.svg';

export default function RoadmapPage() {
  return (
    <CodeEditor
      fileName="roadmap.mmd"
      breadcrumb="about > career > roadmap.mmd"
      language="Markdown"
      content={roadmapMmd}
      fileIcon={<Image src={MarkdownIcon} alt="Markdown icon" className="size-3" />}
    />
  );
}
