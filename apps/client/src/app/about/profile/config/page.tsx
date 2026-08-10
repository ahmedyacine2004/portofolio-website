import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { aboutProfileConfig } from '@/lib/utils/config';
import TypescriptIcon from '@/assets/icons/typescript.svg';

export default function ConfigPage() {
  return (
    <CodeEditor
      fileName="config.ts"
      breadcrumb="about > profile > config.ts"
      language="Typescript"
      content={aboutProfileConfig}
      fileIcon={<Image src={TypescriptIcon} alt="TypeScript icon" className="size-3" />}
    />
  );
}
