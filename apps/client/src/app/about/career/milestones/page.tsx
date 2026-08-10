import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { milestonesJson } from '@/lib/utils/milestones';
import JsonIcon from '@/assets/icons/json.svg';

export default function MilestonesPage() {
  return (
    <CodeEditor
      fileName="milestones.json"
      breadcrumb="about > career > milestones.json"
      language="JSON"
      content={milestonesJson}
      fileIcon={<Image src={JsonIcon} alt="JSON icon" className="size-3" />}
    />
  );
}
