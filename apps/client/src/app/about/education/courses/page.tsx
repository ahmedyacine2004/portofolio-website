import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { coursesCsv } from '@/lib/utils/courses';
import CsvIcon from '@/assets/icons/csv.svg';

export default function CoursesPage() {
  return (
    <CodeEditor
      fileName="courses.csv"
      breadcrumb="about > education > courses.csv"
      language="CSV"
      content={coursesCsv}
      fileIcon={<Image src={CsvIcon} alt="CSV icon" className="size-3" />}
    />
  );
}
