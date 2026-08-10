import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { interestsJson } from '@/lib/utils/interests';
import JsonIcon from '@/assets/icons/json.svg';

export default function InterestsPage() {
  return (
    <CodeEditor
      fileName="interests.json"
      breadcrumb="about > personal > interests.json"
      language="JSON"
      content={interestsJson}
      fileIcon={<Image src={JsonIcon} alt="JSON icon" className="size-3" />}
    />
  );
}
