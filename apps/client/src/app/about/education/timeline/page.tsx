import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { timelineYaml } from '@/lib/utils/timeline';
import YamlIcon from '@/assets/icons/yaml.svg';

export default function BachelorPage() {
  return (
    <CodeEditor
      fileName="timeline.yaml"
      breadcrumb="about > education > timeline.yaml"
      language="YAML"
      content={timelineYaml}
      fileIcon={<Image src={YamlIcon} alt="YAML icon" className="size-3" />}
    />
  );
}
