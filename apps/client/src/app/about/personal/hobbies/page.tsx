import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { hobbiesMd } from '@/lib/utils/hobbies';
import MarkdownIcon from '@/assets/icons/markdown.svg';

export default function HobbiesPage() {
  return (
    <CodeEditor
      fileName="hobbies.md"
      breadcrumb="about > personal > hobbies.md"
      language="Markdown"
      content={hobbiesMd}
      fileIcon={<Image src={MarkdownIcon} alt="Markdown icon" className="size-3" />}
    />
  );
}
