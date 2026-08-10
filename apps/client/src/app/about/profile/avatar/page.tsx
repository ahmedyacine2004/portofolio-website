import { ImageEditor } from '@/components/about/image-editor';
import Avatar from '../../../../assets/images/avatarV2.png';

export default function AvatarPage() {
  return (
    <ImageEditor
      fileName="avatar.png"
      breadcrumb="about > profile > avatar.png"
      imageSrc={Avatar}
      imageAlt="Profile avatar"
      language="PNG"
    />
  );
}
