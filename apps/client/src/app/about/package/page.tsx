import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { packageJson } from '@/lib/utils/package';
import PackageIcon from '@/assets/icons/package.svg';

export default function PackageJsonPage() {
  return (
    <CodeEditor
      fileName="package.json"
      breadcrumb="about > package.json"
      language="JSON"
      content={packageJson}
      fileIcon={<Image src={PackageIcon} alt="Package icon" className="size-3" />}
    />
  );
}
