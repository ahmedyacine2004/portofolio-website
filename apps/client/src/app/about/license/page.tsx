import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { licenseContent } from '@/lib/utils/license';
import LicenseIcon from '@/assets/icons/license.svg';

export default function LicensePage() {
  return (
    <CodeEditor
      fileName="LICENSE"
      breadcrumb="about > LICENSE"
      language="plaintext"
      content={licenseContent}
      fileIcon={<Image src={LicenseIcon} alt="License icon" className="size-3" />}
    />
  );
}
