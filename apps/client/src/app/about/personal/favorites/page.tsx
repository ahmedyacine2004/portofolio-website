import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { favoritesToml } from '@/lib/utils/favorites';
import TomlIcon from '@/assets/icons/toml.svg';

export default function FavoritesPage() {
  return (
    <CodeEditor
      fileName="favorites.toml"
      breadcrumb="about > personal > favorites.toml"
      language="TOML"
      content={favoritesToml}
      fileIcon={<Image src={TomlIcon} alt="TOML icon" className="size-3" />}
    />
  );
}
