import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { aboutProfileIndex } from '@/lib/utils/about-profile';
import ReactIcon from '@/assets/icons/react.svg';

export default function ProfilePage() {
  return (
    <CodeEditor
      fileName="index.tsx"
      breadcrumb="about > profile > index.tsx"
      language="ReactJs"
      content={aboutProfileIndex}
      fileIcon={<Image src={ReactIcon} alt="React icon" className="size-3" />}
    />
  );
}
