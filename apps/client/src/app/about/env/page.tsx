import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { envExampleContent } from '@/lib/utils/env';
import EnvIcon from '@/assets/icons/env.svg';

export default function EnvExamplePage() {
  return (
    <CodeEditor
      fileName=".env.example"
      breadcrumb="about > .env.example"
      language="dotenv"
      content={envExampleContent}
      fileIcon={<Image src={EnvIcon} alt="ENV icon" className="size-3" />}
    />
  );
}
