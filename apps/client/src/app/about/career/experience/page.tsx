import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { experienceDb } from '@/lib/utils/experience';
import DatabaseIcon from '@/assets/icons/database.svg';

export default function ExperiencePage() {
  return (
    <CodeEditor
      fileName="experience.db"
      breadcrumb="about > career > experience.db"
      language="TypeScript"
      content={experienceDb}
      fileIcon={<Image src={DatabaseIcon} alt="Database icon" className="size-3" />}
    />
  );
}
