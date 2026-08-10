import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { languagesYaml } from '@/lib/utils/languages';
import YamlIcon from '@/assets/icons/yaml.svg';

export default function LanguagesPage() {
  return (
    <CodeEditor
      fileName="languages.yaml"
      breadcrumb="about > personal > languages.yaml"
      language="YAML"
      content={languagesYaml}
      fileIcon={<Image src={YamlIcon} alt="YAML icon" className="size-3" />}
    />
  );
}
