import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { gitignoreContent } from '@/lib/utils/gitignore';
import GitIcon from '@/assets/icons/git.svg';

export default function GitignorePage() {
  return (
    <CodeEditor
      fileName=".gitignore"
      breadcrumb="about > .gitignore"
      language="git"
      content={gitignoreContent}
      fileIcon={<Image src={GitIcon} alt="Git icon" className="size-3" />}
    />
  );
}
