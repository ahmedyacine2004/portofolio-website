import Image from 'next/image';
import { CodeEditor } from '@/components/about/code-editor';
import { socialLinks } from '@/lib/utils/social-links';
import LinkIcon from '@/assets/icons/link.svg';

export default function SocialLinksPage() {
  return (
    <CodeEditor
      fileName="social.links"
      breadcrumb="about > profile > social.links"
      language="Links"
      content={socialLinks}
      fileIcon={<Image src={LinkIcon} alt="Link icon" className="size-3" />}
    />
  );
}
